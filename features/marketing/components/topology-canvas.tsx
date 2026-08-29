"use client";

import { useEffect, useRef } from "react";

/**
 * Isometric wireframe bar-field. A 12x12 ground plane with extruded boxes whose
 * heights come from a travelling-wave field, rendered back-to-front with the
 * painter's algorithm. Drawn on top of a `bg-foreground` panel, so the ink is
 * `--background` and the only accent is `--signal`.
 */

const GRID = 12;
/** Inset of each bar footprint inside its cell, in grid units. */
const CELL_INSET = 0.14;
/** Extra room reserved for the yaw sweep pushing corners past the axis-aligned span. */
const ISO_MARGIN = 1.22;
/** Tallest bar, expressed in the same units as half a tile width. */
const BAR_MAX_UNITS = 2.6;
const BAR_MIN_UNITS = 0.1;
/** How many of the tallest bars get the signal treatment. */
const SIGNAL_COUNT = 5;
/** Depth-cue steps: back rows are dimmer than front rows. */
const DEPTH_BANDS = 5;
const FRAME_INTERVAL = 1000 / 26;
/** Pose used for the single static frame under prefers-reduced-motion. */
const STATIC_TIME = 4.2;

const FALLBACK_BACKGROUND = "43 23% 93%";
const FALLBACK_FOREGROUND = "0 0% 4%";
const FALLBACK_SIGNAL = "20.5 90% 48%";

type Palette = {
  grid: string;
  gridEdge: string;
  occluder: string;
  signalWash: string;
  lineBands: string[];
  signalBands: string[];
};

type Cell = {
  col: number;
  row: number;
  level: number;
  depth: number;
};

function readPalette(root: HTMLElement): Palette {
  const styles = getComputedStyle(root);
  const read = (name: string, fallback: string): string => {
    const value = styles.getPropertyValue(name).trim();
    return value.length > 0 ? value : fallback;
  };

  // Custom properties are bare HSL triplets ("43 23% 93%"), so compose the function here.
  const background = read("--background", FALLBACK_BACKGROUND);
  const foreground = read("--foreground", FALLBACK_FOREGROUND);
  const signal = read("--signal", FALLBACK_SIGNAL);

  const ramp = (triplet: string, from: number, to: number): string[] =>
    Array.from({ length: DEPTH_BANDS }, (_, step) => {
      const alpha = from + ((to - from) * step) / (DEPTH_BANDS - 1);
      return `hsl(${triplet} / ${alpha.toFixed(3)})`;
    });

  return {
    grid: `hsl(${background} / 0.16)`,
    gridEdge: `hsl(${background} / 0.42)`,
    // The panel colour itself: fills bar silhouettes so nearer boxes occlude farther ones.
    occluder: `hsl(${foreground} / 0.9)`,
    signalWash: `hsl(${signal} / 0.14)`,
    lineBands: ramp(background, 0.38, 1),
    signalBands: ramp(signal, 0.62, 1),
  };
}

/**
 * Height field: three travelling plane waves plus one radial ripple from the
 * centre. Amplitudes sum to 1.1, so dividing by 1.1 lands in [-1, 1].
 */
function fieldAt(gx: number, gy: number, t: number, centre: number): number {
  const radial = Math.hypot(gx - centre, gy - centre);
  const wave =
    Math.sin(gx * 0.62 + t * 0.55) * 0.3 +
    Math.sin(gy * 0.48 - t * 0.41) * 0.26 +
    Math.sin((gx + gy) * 0.33 + t * 0.24) * 0.22 +
    Math.sin(radial * 0.8 - t * 0.47) * 0.32;
  const normalized = (wave / 1.1 + 1) / 2;
  return Math.min(1, Math.max(0, normalized));
}

export function TopologyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const containerEl = containerRef.current;
    const canvasEl = canvasRef.current;
    if (!containerEl || !canvasEl) return;

    const context = canvasEl.getContext("2d");
    if (!context) return;

    // Re-bound as non-nullable so the hoisted draw/resize helpers below keep the type.
    const container: HTMLDivElement = containerEl;
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = context;

    const root = document.documentElement;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const startedAt = performance.now();

    let palette = readPalette(root);
    let cssWidth = 0;
    let cssHeight = 0;
    let rafId = 0;
    let lastPaint = 0;
    let onScreen = true;
    let reduced = motionQuery.matches;

    // Reused per bar so the hot loop allocates nothing.
    const baseX = [0, 0, 0, 0];
    const baseY = [0, 0, 0, 0];
    const topY = [0, 0, 0, 0];

    function draw(t: number) {
      if (cssWidth <= 0 || cssHeight <= 0) return;
      ctx.clearRect(0, 0, cssWidth, cssHeight);

      const centre = GRID / 2;

      // Camera: a slow yaw sweep around the plane centre plus a gentle change in
      // elevation (tile height). Both are sub-degree per frame — ambient, not busy.
      const yaw = Math.sin(t * 0.055) * 0.2;
      const yawCos = Math.cos(yaw);
      const yawSin = Math.sin(yaw);
      const tilt = 1 + Math.sin(t * 0.037) * 0.07;

      // Fit the whole field to the box. Horizontal span is 24 * halfTileW, vertical
      // span is 24 * halfTileH plus the tallest bar.
      const spanW = GRID * 2 * ISO_MARGIN;
      const spanH = GRID * ISO_MARGIN * tilt + BAR_MAX_UNITS;
      const scale = Math.min((cssWidth * 0.92) / spanW, (cssHeight * 0.9) / spanH);

      const halfTileW = scale;
      const halfTileH = scale * 0.5 * tilt;
      const barMax = BAR_MAX_UNITS * scale;
      const barMin = BAR_MIN_UNITS * scale;
      const originX = cssWidth / 2;
      const originY = cssHeight / 2 + barMax * 0.5;

      // Grid space -> yawed camera space.
      const rotU = (gx: number, gy: number) =>
        (gx - centre) * yawCos - (gy - centre) * yawSin;
      const rotV = (gx: number, gy: number) =>
        (gx - centre) * yawSin + (gy - centre) * yawCos;
      // Camera space -> screen. Classic 2:1 isometric.
      const toX = (u: number, v: number) => originX + (u - v) * halfTileW;
      const toY = (u: number, v: number, h: number) =>
        originY + (u + v) * halfTileH - h;

      // --- ground plane -------------------------------------------------------
      ctx.strokeStyle = palette.grid;
      ctx.beginPath();
      for (let k = 0; k <= GRID; k += 1) {
        const aU = rotU(k, 0);
        const aV = rotV(k, 0);
        const bU = rotU(k, GRID);
        const bV = rotV(k, GRID);
        ctx.moveTo(toX(aU, aV), toY(aU, aV, 0));
        ctx.lineTo(toX(bU, bV), toY(bU, bV, 0));

        const cU = rotU(0, k);
        const cV = rotV(0, k);
        const dU = rotU(GRID, k);
        const dV = rotV(GRID, k);
        ctx.moveTo(toX(cU, cV), toY(cU, cV, 0));
        ctx.lineTo(toX(dU, dV), toY(dU, dV, 0));
      }
      ctx.stroke();

      ctx.strokeStyle = palette.gridEdge;
      ctx.beginPath();
      const border: Array<[number, number]> = [
        [0, 0],
        [GRID, 0],
        [GRID, GRID],
        [0, GRID],
      ];
      for (let k = 0; k < border.length; k += 1) {
        const [gx, gy] = border[k];
        const u = rotU(gx, gy);
        const v = rotV(gx, gy);
        if (k === 0) ctx.moveTo(toX(u, v), toY(u, v, 0));
        else ctx.lineTo(toX(u, v), toY(u, v, 0));
      }
      ctx.closePath();
      ctx.stroke();

      // --- depth sort ---------------------------------------------------------
      const cells: Cell[] = [];
      for (let col = 0; col < GRID; col += 1) {
        for (let row = 0; row < GRID; row += 1) {
          const cx = col + 0.5;
          const cy = row + 0.5;
          cells.push({
            col,
            row,
            level: fieldAt(cx, cy, t, centre),
            // Screen depth in isometric projection is u + v of the cell centre.
            depth: rotU(cx, cy) + rotV(cx, cy),
          });
        }
      }
      // Painter's algorithm: smallest u+v is farthest, so it paints first.
      cells.sort((a, b) => a.depth - b.depth);

      const ranked = cells.map((cell) => cell.level).sort((a, b) => b - a);
      const signalFloor = ranked[Math.min(SIGNAL_COUNT - 1, ranked.length - 1)];

      // --- bars ---------------------------------------------------------------
      for (let index = 0; index < cells.length; index += 1) {
        const cell = cells[index];
        const barHeight = barMin + cell.level * (barMax - barMin);
        const isSignal = cell.level >= signalFloor;
        const band = Math.min(
          DEPTH_BANDS - 1,
          Math.floor((index / cells.length) * DEPTH_BANDS),
        );

        // Footprint corners, counter-clockwise in grid space.
        for (let k = 0; k < 4; k += 1) {
          const gx = cell.col + (k === 1 || k === 2 ? 1 - CELL_INSET : CELL_INSET);
          const gy = cell.row + (k === 2 || k === 3 ? 1 - CELL_INSET : CELL_INSET);
          const u = rotU(gx, gy);
          const v = rotV(gx, gy);
          baseX[k] = toX(u, v);
          baseY[k] = toY(u, v, 0);
          topY[k] = baseY[k] - barHeight;
        }

        // A side face k->k+1 has signed screen area 2 * barHeight * (x[k] - x[k+1]),
        // so it faces the camera exactly when its base edge runs right-to-left.
        const visible = [
          baseX[0] > baseX[1],
          baseX[1] > baseX[2],
          baseX[2] > baseX[3],
          baseX[3] > baseX[0],
        ];

        // Fill the silhouette in the panel colour so this bar hides what is behind it.
        ctx.beginPath();
        ctx.moveTo(baseX[0], topY[0]);
        ctx.lineTo(baseX[1], topY[1]);
        ctx.lineTo(baseX[2], topY[2]);
        ctx.lineTo(baseX[3], topY[3]);
        ctx.closePath();
        for (let k = 0; k < 4; k += 1) {
          if (!visible[k]) continue;
          const n = (k + 1) % 4;
          ctx.moveTo(baseX[k], baseY[k]);
          ctx.lineTo(baseX[n], baseY[n]);
          ctx.lineTo(baseX[n], topY[n]);
          ctx.lineTo(baseX[k], topY[k]);
          ctx.closePath();
        }
        ctx.fillStyle = palette.occluder;
        ctx.fill();

        if (isSignal) {
          ctx.beginPath();
          ctx.moveTo(baseX[0], topY[0]);
          ctx.lineTo(baseX[1], topY[1]);
          ctx.lineTo(baseX[2], topY[2]);
          ctx.lineTo(baseX[3], topY[3]);
          ctx.closePath();
          ctx.fillStyle = palette.signalWash;
          ctx.fill();
        }

        // Wireframe: top face outline, plus the base edge and vertical edges of
        // every camera-facing side.
        ctx.beginPath();
        ctx.moveTo(baseX[0], topY[0]);
        ctx.lineTo(baseX[1], topY[1]);
        ctx.lineTo(baseX[2], topY[2]);
        ctx.lineTo(baseX[3], topY[3]);
        ctx.closePath();
        for (let k = 0; k < 4; k += 1) {
          if (!visible[k]) continue;
          const n = (k + 1) % 4;
          ctx.moveTo(baseX[k], baseY[k]);
          ctx.lineTo(baseX[n], baseY[n]);
          ctx.moveTo(baseX[k], baseY[k]);
          ctx.lineTo(baseX[k], topY[k]);
          ctx.moveTo(baseX[n], baseY[n]);
          ctx.lineTo(baseX[n], topY[n]);
        }
        ctx.strokeStyle = isSignal ? palette.signalBands[band] : palette.lineBands[band];
        ctx.stroke();
      }
    }

    function currentTime(): number {
      if (reduced) return STATIC_TIME;
      return (performance.now() - startedAt) / 1000;
    }

    function resize() {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width <= 0 || height <= 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cssWidth = width;
      cssHeight = height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      ctx.lineWidth = 1;
      ctx.lineJoin = "miter";
      ctx.lineCap = "butt";

      draw(currentTime());
    }

    function tick(now: number) {
      rafId = window.requestAnimationFrame(tick);
      if (now - lastPaint < FRAME_INTERVAL) return;
      lastPaint = now;
      draw((now - startedAt) / 1000);
    }

    function startLoop() {
      if (rafId !== 0 || reduced || !onScreen) return;
      lastPaint = 0;
      rafId = window.requestAnimationFrame(tick);
    }

    function stopLoop() {
      if (rafId === 0) return;
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    }

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (!entry) return;
        onScreen = entry.isIntersecting;
        if (onScreen) startLoop();
        else stopLoop();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(container);

    const themeObserver = new MutationObserver(() => {
      palette = readPalette(root);
      draw(currentTime());
    });
    themeObserver.observe(root, {
      attributes: true,
      attributeFilter: ["class", "style", "data-theme"],
    });

    const handleMotionChange = (event: MediaQueryListEvent) => {
      reduced = event.matches;
      if (reduced) {
        stopLoop();
        draw(STATIC_TIME);
      } else {
        startLoop();
      }
    };
    motionQuery.addEventListener("change", handleMotionChange);

    resize();
    startLoop();

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <div ref={containerRef} aria-hidden="true" className="absolute inset-0 h-full w-full">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
