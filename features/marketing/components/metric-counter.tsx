"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

import { useMounted } from "../use-mounted";

const STEPS = 20;
const LOCK_AT = 15;
const TICK_MS = 50;

/**
 * Slot-machine reveal: digits tumble, then lock left-to-right.
 * Non-digits ($ . % K ms) stay literal, so the rendered width never changes.
 *
 * State is seeded with the REAL value, not a zero mask, so the server HTML ships
 * correct figures for crawlers and no-JS readers. The scramble runs on scroll-in,
 * which is also the only time anyone is looking at it.
 */
function useScrambledNumber(target: string, delay: number) {
  const mounted = useMounted();
  // framer's useReducedMotion resolves during the first client render, so gating it
  // on `mounted` is what keeps server and first client render identical.
  const reduced = useReducedMotion() && mounted;

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    if (reduced || !inView) return;

    let interval = 0;
    const timeout = window.setTimeout(() => {
      let step = 0;
      interval = window.setInterval(() => {
        step += 1;
        if (step >= STEPS) {
          setDisplay(target);
          window.clearInterval(interval);
          return;
        }
        setDisplay(
          target
            .split("")
            .map((ch, i) =>
              !/[0-9]/.test(ch) || (step > LOCK_AT && i < step - LOCK_AT)
                ? ch
                : String(Math.floor(Math.random() * 10)),
            )
            .join(""),
        );
      }, TICK_MS);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [delay, inView, reduced, target]);

  return { ref, display: reduced ? target : display };
}

export function MetricCounter({
  target,
  label,
  delay = 0,
}: {
  target: string;
  label: string;
  delay?: number;
}) {
  const { ref, display } = useScrambledNumber(target, delay);

  return (
    <div className="flex flex-col gap-1">
      <span
        ref={ref}
        className="text-4xl lg:text-5xl font-mono font-bold tracking-tight tabular-nums"
      >
        {display}
      </span>
      <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">{label}</span>
    </div>
  );
}

export function PriceCounter({ target, prefix = "$" }: { target: string; prefix?: string }) {
  const { ref, display } = useScrambledNumber(target, 0);

  return (
    <span ref={ref} className="font-mono font-bold tabular-nums">
      {prefix}
      {display}
    </span>
  );
}
