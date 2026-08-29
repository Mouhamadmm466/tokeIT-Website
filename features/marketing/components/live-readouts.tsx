"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { useMounted } from "../use-mounted";

/** Monotonic tick counter shown in a panel's chrome bar. */
export function TickCounter({ intervalMs = 2000 }: { intervalMs?: number }) {
  const reduced = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setTick((t) => t + 1), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs, reduced]);

  return (
    <span className="text-[10px] tracking-widest text-muted-foreground font-mono tabular-nums">
        {`TICK:${String((reduced ? 128 : tick) % 10000).padStart(4, "0")}`}
    </span>
  );
}

/** Fluctuating throughput readout. Settles to a fixed value under reduced motion. */
export function LiveThroughput({ label }: { label: string }) {
  const mounted = useMounted();
  // Mount-gated: framer resolves reduced motion during the first client render.
  const reduced = useReducedMotion() && mounted;
  const [value, setValue] = useState("34.0");

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setValue((Math.random() * 50 + 10).toFixed(1));
    }, 2000);
    return () => window.clearInterval(id);
  }, [reduced]);

  const shown = value;

  return (
    <div className="flex items-center gap-2 text-[10px] tracking-widest text-muted-foreground uppercase font-mono">
      <span className="h-1.5 w-1.5 bg-signal" aria-hidden="true" />
      <span className="tabular-nums">{`${label} ${shown}k`}</span>
    </div>
  );
}

const DAY = 86_400;

/** Counts up from a fixed launch date so the number is real, not theatre. */
export function TrackingSince({ since }: { since: string }) {
  const reduced = useReducedMotion();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const start = new Date(since).getTime();
    if (!Number.isFinite(start)) return;
    const compute = () => setSeconds(Math.max(0, Math.floor((Date.now() - start) / 1000)));

    // Deferred so the first value lands in a callback, never in the effect body.
    const first = window.setTimeout(compute, 0);
    const id = reduced ? 0 : window.setInterval(compute, 1000);

    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, [reduced, since]);

  const d = Math.floor(seconds / DAY);
  const h = Math.floor((seconds % DAY) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return (
    <span className="font-mono tabular-nums">
      {`${d}d ${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`}
    </span>
  );
}
