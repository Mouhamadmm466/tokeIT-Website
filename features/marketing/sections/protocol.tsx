"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { protocol } from "../content";
import { EASE, VIEWPORT, railIn } from "../motion";
import { SectionRail } from "../components/primitives";

export function ProtocolSection() {
  return (
    <section className="w-full px-6 py-20 lg:px-12">
      <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={railIn}>
        <SectionRail marker={protocol.marker} index={protocol.index} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.6, ease: EASE }}
        className="flex flex-col gap-3 mb-12 max-w-2xl"
      >
        <h2 className="text-2xl lg:text-3xl font-mono font-bold tracking-tight uppercase text-balance">
          {protocol.headline}
        </h2>
        <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
          {protocol.body}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {protocol.steps.map((step, i) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.12 * i, ease: EASE }}
            className="flex flex-col border-2 border-foreground md:border-r-0 md:last:border-r-2 border-t-0 first:border-t-2 md:border-t-2"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b-2 border-foreground">
              <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-muted-foreground">
                {step.file}
              </span>
              <span className="text-[10px] tracking-[0.2em] font-mono opacity-70">{step.id}</span>
            </div>

            <div className="flex flex-col gap-4 px-5 py-6 flex-1">
              <h3 className="text-base lg:text-lg font-mono font-bold tracking-tight uppercase text-balance">
                {step.title}
              </h3>
              <p className="text-xs font-mono text-muted-foreground leading-relaxed">{step.body}</p>

              <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-border">
                {step.points.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <Check
                      size={12}
                      strokeWidth={2.5}
                      className="mt-0.5 shrink-0 text-signal"
                      aria-hidden="true"
                    />
                    <span className="text-xs font-mono leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
