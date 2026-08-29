"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";

import { privacy } from "../content";
import { EASE, VIEWPORT, railIn } from "../motion";
import { SectionHeading, SectionRail } from "../components/primitives";

export function PrivacySection() {
  return (
    <section id="privacy" className="w-full px-6 py-20 lg:px-12">
      <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={railIn}>
        <SectionRail marker={privacy.marker} index={privacy.index} />
      </motion.div>

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col gap-3 max-w-2xl"
        >
          <SectionHeading lead={privacy.headline.lead} accent={privacy.headline.accent} />
          <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
            {privacy.body}
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-0 overflow-hidden">
          {privacy.badges.map((badge, i) => (
            <motion.span
              key={badge}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.06 * i, ease: EASE }}
              className="border-2 border-foreground -ml-0.5 -mt-0.5 px-3 py-2 text-[10px] tracking-[0.15em] uppercase font-mono"
            >
              {badge}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="flex flex-col border-2 border-foreground">
        {privacy.rows.map((row, i) => (
          <motion.div
            key={row.title}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 * i, ease: EASE }}
            className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 px-5 py-6 border-b-2 border-foreground last:border-b-0"
          >
            <Lock
              size={14}
              strokeWidth={2}
              className="shrink-0 text-muted-foreground hidden md:block"
              aria-hidden="true"
            />
            <div className="flex-1 flex flex-col gap-2">
              <h3 className="text-sm font-mono font-bold tracking-tight uppercase">{row.title}</h3>
              <p className="text-xs font-mono text-muted-foreground leading-relaxed max-w-3xl">
                {row.body}
              </p>
            </div>
            <span className="shrink-0 border border-foreground px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase font-mono self-start md:self-center">
              {row.meta}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
