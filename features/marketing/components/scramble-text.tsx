"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_./:";

/**
 * Decodes a value character-by-character when it scrolls into view.
 * Renders the true text on the server so the value is correct without JS.
 */
export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const reduced = useReducedMotion();
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (!inView || reduced) return;

    let revealed = 0;
    const id = window.setInterval(() => {
      revealed += 0.5;
      if (revealed >= text.length) {
        setOut(text);
        window.clearInterval(id);
        return;
      }
      setOut(
        text
          .split("")
          .map((ch, i) =>
            ch === " " ? " " : i < revealed ? ch : CHARS[Math.floor(Math.random() * CHARS.length)],
          )
          .join(""),
      );
    }, 30);

    return () => window.clearInterval(id);
  }, [inView, reduced, text]);

  return (
    <span ref={ref} className={className}>
      {out}
    </span>
  );
}
