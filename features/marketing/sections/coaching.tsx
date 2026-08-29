"use client";

import { motion } from "framer-motion";

import { coaching } from "../content";
import { EASE, VIEWPORT, railIn } from "../motion";
import { SectionHeading, SectionRail } from "../components/primitives";

const SEVERITY: Record<string, string> = {
  HIGH: "bg-signal text-signal-ink",
  MED: "bg-foreground text-background",
};

export function CoachingSection() {
  return (
    <section id="coaching" className="w-full px-6 py-20 lg:px-12">
      <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={railIn}>
        <SectionRail marker={coaching.marker} index={coaching.index} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.6, ease: EASE }}
        className="flex flex-col gap-3 mb-12 max-w-2xl"
      >
        <SectionHeading lead={coaching.headline.lead} accent={coaching.headline.accent} />
        <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
          {coaching.body}
        </p>
      </motion.div>

      <div className="flex flex-col border-2 border-foreground">
        {coaching.insights.map((insight, i) => (
          <motion.article
            key={insight.id}
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.1 * i, ease: EASE }}
            className="border-b-2 border-foreground last:border-b-0"
          >
            <div className="flex items-center gap-3 border-b border-border px-5 py-2">
              <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-muted-foreground">
                {insight.id}
              </span>
              <span
                className={`text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 font-mono ${
                  SEVERITY[insight.severity] ?? "bg-muted text-foreground"
                }`}
              >
                {insight.severity}
              </span>
              <span className="ml-auto text-[10px] tracking-[0.2em] uppercase font-mono tabular-nums">
                {insight.impact}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,22rem)_1fr] gap-2 lg:gap-8 px-5 py-6">
              <h3 className="text-sm lg:text-base font-mono font-bold tracking-tight uppercase text-balance">
                {insight.title}
              </h3>
              <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                {insight.body}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
