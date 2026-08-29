"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { capture } from "../content";
import { useMounted } from "../use-mounted";
import { WindowDots } from "./primitives";

const TICK_MS = 600;
const WINDOW = 9;

const LINES = capture.terminal.lines;

const toneClass = {
  signal: "text-signal-inv",
  bright: "text-background",
  dim: "text-background/80",
} as const;

/** Appends one whole line per tick, keeps the last nine, loops forever. */
export function CaptureTerminal() {
  const mounted = useMounted();
  // Gated on mount: framer resolves this during the first client render, so reading
  // it directly would diverge from the server HTML for reduced-motion users.
  const reduced = useReducedMotion() && mounted;
  // Seeded full so the server ships a populated log instead of a bare cursor.
  const [count, setCount] = useState(LINES.length);

  useEffect(() => {
    if (reduced) return;

    const id = window.setInterval(() => {
      setCount((prev) => (prev >= LINES.length ? 1 : prev + 1));
    }, TICK_MS);

    return () => window.clearInterval(id);
  }, [reduced]);

  // Reduced motion shows the tail of the log immediately instead of animating to it.
  const shown = reduced ? LINES.length : count;
  const visible = LINES.slice(Math.max(0, shown - WINDOW), shown);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 border-b-2 border-foreground px-4 py-2">
        <WindowDots />
        <span className="ml-auto text-[10px] tracking-widest uppercase text-muted-foreground font-mono">
          {capture.terminal.title}
        </span>
      </div>
      <div className="flex-1 bg-foreground p-4 overflow-hidden scanlines">
        <div className="flex flex-col gap-1">
          {visible.map((line, i) => (
            <span
              key={`${shown}-${i}`}
              className={`block text-[10px] sm:text-xs font-mono whitespace-pre ${
                i === visible.length - 1 ? "" : "opacity-90"
              } ${toneClass[line.tone]}`}
            >
              {line.text || " "}
            </span>
          ))}
          <span className="text-xs text-signal-inv font-mono animate-blink" aria-hidden="true">
            _
          </span>
        </div>
      </div>
    </div>
  );
}
