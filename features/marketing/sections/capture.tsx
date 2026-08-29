"use client";

import { motion } from "framer-motion";

import { capture } from "../content";
import { EASE, VIEWPORT, railIn } from "../motion";
import { PanelChrome, SectionRail } from "../components/primitives";
import { CaptureTerminal } from "../components/terminal";
import { DitherCanvas } from "../components/dither-canvas";
import { MetricCounter } from "../components/metric-counter";
import { TickCounter } from "../components/live-readouts";

// Border classes per cell, chosen so no divider ever doubles at any breakpoint.
const CELL_BORDERS = [
  "border-b-2 md:border-r-2",
  "border-b-2",
  "border-b-2 md:border-b-0 md:border-r-2",
  "",
];

function Cell({ index, children }: { index: number; children: React.ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 * index, ease: EASE } },
      }}
      className={`border-foreground min-h-[280px] ${CELL_BORDERS[index]}`}
    >
      {children}
    </motion.div>
  );
}

export function CaptureSection() {
  const { metrics, providers, dither } = capture;

  return (
    <section id="capture" aria-labelledby="capture-heading" className="w-full px-6 py-20 lg:px-12">
      <h2 id="capture-heading" className="sr-only">
        Live capture across every AI coding tool
      </h2>
      <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={railIn}>
        <SectionRail marker={capture.marker} index={capture.index} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 md:grid-cols-2 border-2 border-foreground"
      >
        <Cell index={0}>
          <CaptureTerminal />
        </Cell>

        <Cell index={1}>
          <div className="flex flex-col h-full">
            <PanelChrome
              title={dither.title}
              right={
                <span className="text-[10px] tracking-widest text-muted-foreground font-mono">
                  {dither.meta}
                </span>
              }
            />
            <div className="flex-1 flex items-center justify-center p-4 bg-background overflow-hidden">
              <DitherCanvas />
            </div>
          </div>
        </Cell>

        <Cell index={2}>
          <div className="flex flex-col h-full">
            <PanelChrome
              title={metrics.title}
              right={<span className="inline-block h-2 w-2 bg-signal" aria-hidden="true" />}
            />
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 p-6 content-center">
              {metrics.items.map((item, i) => (
                <MetricCounter
                  key={item.label}
                  target={item.display}
                  label={item.label}
                  delay={500 + 300 * i}
                />
              ))}
            </div>
          </div>
        </Cell>

        <Cell index={3}>
          <div className="flex flex-col h-full">
            <PanelChrome title={providers.title} right={<TickCounter />} />
            <div className="flex-1 flex flex-col p-4">
              <div className="grid grid-cols-3 gap-2 border-b border-border pb-2 mb-2">
                <span className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground">
                  Tool
                </span>
                <span className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground">
                  Status
                </span>
                <span className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground text-right">
                  Tokens
                </span>
              </div>

              {providers.rows.map((row) => (
                <div
                  key={row.name}
                  className="grid grid-cols-3 gap-2 py-2 border-b border-border last:border-none"
                >
                  <span className="text-xs font-mono">{row.name}</span>
                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 shrink-0 ${
                        row.status === "ONLINE" ? "bg-signal" : "bg-muted-foreground"
                      }`}
                    />
                    <span className="text-xs font-mono text-muted-foreground">{row.status}</span>
                  </div>
                  <span className="text-xs font-mono text-right tabular-nums">{row.value}</span>
                </div>
              ))}

              <div className="mt-auto pt-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground">
                    {providers.barLabel}
                  </span>
                  <span className="text-[9px] font-mono tabular-nums">{providers.barValue}%</span>
                </div>
                <div className="h-2 w-full border border-foreground">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${providers.barValue}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                    className="h-full bg-foreground"
                  />
                </div>
              </div>
            </div>
          </div>
        </Cell>
      </motion.div>
    </section>
  );
}
