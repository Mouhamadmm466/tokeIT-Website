"use client";

/**
 * HeroVisual — the 800x200 node graph that sits between the headline lines.
 *
 * AI tool logs enter from the left, pass through the tokeIT core, and leave as
 * measurements on the right. Orange packets run the wires on a loop.
 *
 * Every colour is a CSS custom property, so the diagram follows the `dark`
 * class with no JS. The mount gate keeps the server output stable and the
 * reduced-motion branch renders the same diagram in its settled state.
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/** Left column: the AI coding tools tokeIT reads. */
const SOURCES = ["Claude Code", "Cursor", "Codex"];
/** Right column: what tokeIT produces from them. */
const OUTPUTS = ["Tokens", "Cost", "Insight"];

const INDICES = [0, 1, 2];

const NODE_WIDTH = 80;
const NODE_HEIGHT = 26;

/** Vertical centre of the wire endpoint for row n. */
const rowY = (n: number) => 30 + 60 * n + 13;

const ARIA_LABEL =
  "Diagram: AI coding tool logs from Claude Code, Cursor, and Codex flow into the tokeIT core and out as tokens, cost, and insight.";

type NodeProps = {
  label: string;
  x: number;
  y: number;
  delay: number;
  reduced: boolean;
};

function Node({ label, x, y, delay, reduced }: NodeProps) {
  // The pill is fixed at 80px. At fontSize 10 with 0.05em tracking a monospace
  // glyph advances ~6.5px, so anything past 9 characters ("Claude Code" is 11)
  // crowds the stroke. Shrink the type rather than widen the pill.
  const fontSize = label.length > 9 ? 9 : 10;

  const body = (
    <>
      {/* rx is the one deliberate exception to the project's zero-radius rule:
          it makes a stadium pill, and SVG is out of reach of the global reset. */}
      <rect
        x={x}
        y={y}
        width={NODE_WIDTH}
        height={NODE_HEIGHT}
        rx={13}
        fill="none"
        stroke="hsl(var(--foreground))"
        strokeWidth={1.5}
      />
      <text
        x={x + NODE_WIDTH / 2}
        y={y + 17}
        textAnchor="middle"
        fill="hsl(var(--foreground))"
        fontSize={fontSize}
        fontFamily="var(--font-mono), monospace"
        fontWeight={500}
        letterSpacing="0.05em"
      >
        {label}
      </text>
    </>
  );

  if (reduced) return <g>{body}</g>;

  return (
    <motion.g
      initial={{ opacity: 0, x: x > 400 ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {body}
    </motion.g>
  );
}

export function HeroVisual() {
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);

  // Single mount gate: flips to the client render and picks up the motion
  // preference in one pass, then stays subscribed to preference changes.
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setMounted(true);
      setReduced(motionQuery.matches);
    };
    sync();
    motionQuery.addEventListener("change", sync);
    return () => motionQuery.removeEventListener("change", sync);
  }, []);

  if (!mounted) return <div className="w-full aspect-[4/1]" />;

  return (
    <div className="relative mx-auto w-full max-w-[800px]">
      <svg viewBox="0 0 800 200" className="h-auto w-full" role="img" aria-label={ARIA_LABEL}>
        {/* 1. Left wires: source pill -> core. */}
        {INDICES.map((n) =>
          reduced ? (
            <line
              key={`left-wire-${n}`}
              x1={360}
              y1={100}
              x2={140}
              y2={rowY(n)}
              stroke="hsl(var(--border))"
              strokeWidth={1}
            />
          ) : (
            <motion.line
              key={`left-wire-${n}`}
              x1={360}
              y1={100}
              x2={140}
              y2={rowY(n)}
              stroke="hsl(var(--border))"
              strokeWidth={1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 + 0.1 * n }}
            />
          ),
        )}

        {/* 2. Right wires: core -> output pill. */}
        {INDICES.map((n) =>
          reduced ? (
            <line
              key={`right-wire-${n}`}
              x1={440}
              y1={100}
              x2={660}
              y2={rowY(n)}
              stroke="hsl(var(--border))"
              strokeWidth={1}
            />
          ) : (
            <motion.line
              key={`right-wire-${n}`}
              x1={440}
              y1={100}
              x2={660}
              y2={rowY(n)}
              stroke="hsl(var(--border))"
              strokeWidth={1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 + 0.1 * n }}
            />
          ),
        )}

        {/* 3 & 4. Packets. Nothing travels when motion is suppressed. */}
        {!reduced &&
          INDICES.map((n) => (
            <motion.circle
              key={`left-packet-${n}`}
              r={3}
              fill="hsl(var(--signal))"
              initial={{ cx: 140, cy: rowY(n) }}
              animate={{ cx: [140, 360], cy: [rowY(n), 100] }}
              transition={{
                duration: 1.8,
                delay: 0.8 + 0.6 * n,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "linear",
              }}
            />
          ))}

        {!reduced &&
          INDICES.map((n) => (
            <motion.circle
              key={`right-packet-${n}`}
              r={3}
              fill="hsl(var(--signal))"
              initial={{ cx: 440, cy: 100 }}
              animate={{ cx: [440, 660], cy: [100, rowY(n)] }}
              transition={{
                duration: 1.8,
                delay: 1.2 + 0.6 * n,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "linear",
              }}
            />
          ))}

        {/* 5. Left node pills. */}
        {SOURCES.map((label, i) => (
          <Node
            key={label}
            label={label}
            x={60}
            y={30 + 60 * i}
            delay={0.1 + 0.1 * i}
            reduced={reduced}
          />
        ))}

        {/* 6. Right node pills. */}
        {OUTPUTS.map((label, i) => (
          <Node
            key={label}
            label={label}
            x={660}
            y={30 + 60 * i}
            delay={0.1 + 0.1 * i}
            reduced={reduced}
          />
        ))}

        {/* 7. Centre hub, painted last so it sits over the wires. */}
        <motion.g
          initial={reduced ? false : { opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={reduced ? { duration: 0 } : { duration: 0.4, delay: 0.1 }}
        >
          <rect
            x={364}
            y={64}
            width={72}
            height={72}
            fill="hsl(var(--muted))"
            stroke="hsl(var(--border))"
            strokeWidth={1.5}
          />
          <line x1={400} y1={82} x2={400} y2={118} stroke="hsl(var(--foreground))" strokeWidth={3} />
          <line x1={382} y1={100} x2={418} y2={100} stroke="hsl(var(--foreground))" strokeWidth={3} />
          <line x1={388} y1={88} x2={412} y2={112} stroke="hsl(var(--foreground))" strokeWidth={2} />
          <line x1={412} y1={88} x2={388} y2={112} stroke="hsl(var(--foreground))" strokeWidth={2} />
          <circle
            cx={400}
            cy={100}
            r={30}
            fill="none"
            stroke="hsl(var(--signal))"
            strokeWidth={1}
            opacity={0.6}
          >
            {!reduced && (
              <>
                <animate attributeName="r" values="30;34;30" dur="3s" repeatCount="indefinite" />
                <animate
                  attributeName="opacity"
                  values="0.6;0.2;0.6"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </>
            )}
          </circle>
        </motion.g>
      </svg>
    </div>
  );
}
