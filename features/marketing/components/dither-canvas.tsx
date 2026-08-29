"use client";

import { useEffect, useRef } from "react";

/**
 * token_field.dither — a 320x240 1-bit instrument readout.
 *
 * A continuous "token density" field — a radial falloff from the centre plus
 * sinusoidal moire interference — is quantised to pure black/white through a
 * 2x2 Bayer ordered dither matrix, then upscaled with `image-rendering:
 * pixelated` so every logical pixel stays chunky and visible. The coarse 2x2
 * matrix is deliberate: it bands harder than a 4x4 and that coarseness is the
 * look.
 *
 * Colours are pulled live from the theme's CSS custom properties, so the field
 * flips with light/dark mode instead of baking in a palette.
 */

const WIDTH = 320;
const HEIGHT = 240;

const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT / 2;
/** sqrt(160^2 + 120^2) — the corner distance, so the radial term runs 1 -> 0. */
const CORNER_DISTANCE = 200;

/** ~10fps. A slow instrument refresh, never a smooth animation. */
const FRAME_INTERVAL_MS = 1000 / 10;
/** Field-time advanced per rendered frame (so drift is frame-rate stable). */
const TIME_STEP = 0.1;
/** The single frame drawn when the user prefers reduced motion. */
const STATIC_TIME = 0;

/**
 * 2x2 Bayer matrix, row-major:
 *   0  2
 *   3  1
 * Thresholds are value / 4 => 0.0, 0.5, 0.75, 0.25.
 */
const BAYER_THRESHOLD = Float32Array.from([0, 2, 3, 1], (value) => value / 4);

type Rgb = { r: number; g: number; b: number };

/**
 * Neutral last-resort values, used only if a custom property is missing or
 * unparseable (e.g. the very first paint before styles resolve). Deliberately
 * not brand colours — the real palette always comes from CSS.
 */
const FALLBACK_DARK: Rgb = { r: 0, g: 0, b: 0 };
const FALLBACK_LIGHT: Rgb = { r: 255, g: 255, b: 255 };

function hslToRgb(h: number, s: number, l: number): Rgb {
  const saturation = s / 100;
  const lightness = l / 100;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const sector = (((h % 360) + 360) % 360) / 60;
  const second = chroma * (1 - Math.abs((sector % 2) - 1));

  let r = 0;
  let g = 0;
  let b = 0;
  if (sector < 1) {
    r = chroma;
    g = second;
  } else if (sector < 2) {
    r = second;
    g = chroma;
  } else if (sector < 3) {
    g = chroma;
    b = second;
  } else if (sector < 4) {
    g = second;
    b = chroma;
  } else if (sector < 5) {
    r = second;
    b = chroma;
  } else {
    r = chroma;
    b = second;
  }

  const match = lightness - chroma / 2;
  return {
    r: Math.round((r + match) * 255),
    g: Math.round((g + match) * 255),
    b: Math.round((b + match) * 255),
  };
}

/**
 * The theme stores colours as bare HSL triplets ("43 23% 93%") so Tailwind can
 * splice them into `hsl(var(--x))`. We reconstruct the same `hsl(h s% l%)`
 * colour here and resolve it to RGB bytes for the pixel buffer.
 */
function parseHslTriplet(raw: string, fallback: Rgb): Rgb {
  const parts = raw.trim().replace(/[,%]/g, " ").split(/\s+/).filter(Boolean);
  if (parts.length < 3) return fallback;

  const h = Number.parseFloat(parts[0]);
  const s = Number.parseFloat(parts[1]);
  const l = Number.parseFloat(parts[2]);
  if (!Number.isFinite(h) || !Number.isFinite(s) || !Number.isFinite(l)) {
    return fallback;
  }
  return hslToRgb(h, s, l);
}

export function DitherCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Exact logical bitmap. No devicePixelRatio scaling — chunk is the point.
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    const image = ctx.createImageData(WIDTH, HEIGHT);
    const pixels = image.data;

    // ---- Static geometry -------------------------------------------------
    // Distance from centre is time-invariant; only its divisor breathes.
    const distance = new Float32Array(WIDTH * HEIGHT);
    for (let y = 0; y < HEIGHT; y++) {
      const dy = y - CENTER_Y;
      const rowOffset = y * WIDTH;
      for (let x = 0; x < WIDTH; x++) {
        const dx = x - CENTER_X;
        distance[rowOffset + x] = Math.sqrt(dx * dx + dy * dy);
      }
    }

    // sin(0.05x + phase) expands via angle addition, so the per-column trig is
    // computed once here and only the frame phase changes.
    const sinX = new Float32Array(WIDTH);
    const cosX = new Float32Array(WIDTH);
    for (let x = 0; x < WIDTH; x++) {
      sinX[x] = Math.sin(0.05 * x);
      cosX[x] = Math.cos(0.05 * x);
    }
    /** Per-frame scratch: 0.3 * sin(0.05x + t * 0.3). */
    const waveX = new Float32Array(WIDTH);

    // ---- Theme colours ---------------------------------------------------
    const dark: Rgb = { ...FALLBACK_DARK };
    const light: Rgb = { ...FALLBACK_LIGHT };

    const refreshPalette = () => {
      const style = getComputedStyle(document.documentElement);
      const background = parseHslTriplet(
        style.getPropertyValue("--background"),
        FALLBACK_LIGHT,
      );
      const foreground = parseHslTriplet(
        style.getPropertyValue("--foreground"),
        FALLBACK_DARK,
      );

      // "dark" is the unlit pixel (the panel ground), "light" is the lit one.
      dark.r = background.r;
      dark.g = background.g;
      dark.b = background.b;
      light.r = foreground.r;
      light.g = foreground.g;
      light.b = foreground.b;
    };

    // ---- Render ----------------------------------------------------------
    const render = (t: number) => {
      // Radial radius breathes a few percent — the whole blob inhales slowly.
      const invRadius = 1 / (CORNER_DISTANCE * (1 + 0.04 * Math.sin(t * 0.15)));

      const phaseX = t * 0.3;
      const sinPhaseX = Math.sin(phaseX);
      const cosPhaseX = Math.cos(phaseX);
      for (let x = 0; x < WIDTH; x++) {
        waveX[x] = (sinX[x] * cosPhaseX + cosX[x] * sinPhaseX) * 0.3;
      }

      let p = 0;
      for (let y = 0; y < HEIGHT; y++) {
        // cos(0.03y - t * 0.2)
        const waveY = Math.cos(0.03 * y - t * 0.2);
        const bayerRow = (y & 1) * 2;
        const rowOffset = y * WIDTH;

        for (let x = 0; x < WIDTH; x++) {
          // 1 - dist/200 + sin(0.05x + t*0.3) * cos(0.03y - t*0.2) * 0.3
          const field = 1 - distance[rowOffset + x] * invRadius + waveX[x] * waveY;

          if (field > BAYER_THRESHOLD[bayerRow + (x & 1)]) {
            pixels[p] = light.r;
            pixels[p + 1] = light.g;
            pixels[p + 2] = light.b;
          } else {
            pixels[p] = dark.r;
            pixels[p + 1] = dark.g;
            pixels[p + 2] = dark.b;
          }
          pixels[p + 3] = 255;
          p += 4;
        }
      }

      ctx.putImageData(image, 0, 0);
    };

    // ---- Loop, visibility, motion preference -----------------------------
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = motionQuery.matches;
    let visible = false;
    let frameId: number | null = null;
    let lastFrameAt = 0;
    let fieldTime = 0;

    const loop = (now: number) => {
      frameId = window.requestAnimationFrame(loop);
      if (now - lastFrameAt < FRAME_INTERVAL_MS) return;
      lastFrameAt = now;
      fieldTime += TIME_STEP;
      render(fieldTime);
    };

    const stop = () => {
      if (frameId === null) return;
      window.cancelAnimationFrame(frameId);
      frameId = null;
    };

    const start = () => {
      if (frameId !== null || reduced || !visible) return;
      lastFrameAt = 0;
      frameId = window.requestAnimationFrame(loop);
    };

    refreshPalette();
    render(reduced ? STATIC_TIME : fieldTime);

    const handleMotionChange = () => {
      reduced = motionQuery.matches;
      if (reduced) {
        stop();
        render(STATIC_TIME);
      } else {
        start();
      }
    };
    motionQuery.addEventListener("change", handleMotionChange);

    // Theme swaps toggle a class on <html>; repaint with the new palette.
    const themeObserver = new MutationObserver(() => {
      refreshPalette();
      if (frameId === null) render(reduced ? STATIC_TIME : fieldTime);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style", "data-theme"],
    });

    // Don't burn a full-frame pixel loop while the user reads the footer.
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (!entry) return;
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0 },
    );
    visibilityObserver.observe(canvas);

    return () => {
      stop();
      motionQuery.removeEventListener("change", handleMotionChange);
      themeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      // Scales with the panel but caps out at 480x360. Uncapped, a full-width
      // canvas drives the whole grid row ~700px tall and magnifies the dither
      // past the point where it reads as an instrument.
      className="block w-full max-w-[480px] h-auto"
      style={{ imageRendering: "pixelated" }}
    />
  );
}
