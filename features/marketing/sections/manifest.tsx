"use client";

import { motion } from "framer-motion";

import { manifest } from "../content";
import { EASE, VIEWPORT, VIEWPORT_NEAR, railIn } from "../motion";
import { SectionHeading, SectionRail } from "../components/primitives";
import { TopologyCanvas } from "../components/topology-canvas";
import { ScrambleText } from "../components/scramble-text";
import { TrackingSince } from "../components/live-readouts";

const OVERLAY =
  "absolute left-0 right-0 z-10 flex items-center justify-between px-4 py-2 bg-foreground/80 backdrop-blur-sm";
const OVERLAY_TEXT = "text-[10px] tracking-[0.2em] uppercase font-mono";

export function ManifestSection() {
  return (
    <section className="w-full px-6 py-20 lg:px-12">
      <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={railIn}>
        <SectionRail marker={manifest.marker} index={manifest.index} />
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-0 border-2 border-foreground">
        <motion.div
          initial={{ opacity: 0, x: -30, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-[500px] border-b-2 lg:border-b-0 lg:border-r-2 border-foreground overflow-hidden bg-foreground"
        >
          <TopologyCanvas />

          <div className={`${OVERLAY} top-0`}>
            <span className={`${OVERLAY_TEXT} text-background/75`}>{manifest.render.title}</span>
            <span className={`${OVERLAY_TEXT} text-background flex items-center gap-2`}>
              <span className="h-1.5 w-1.5 bg-signal" aria-hidden="true" />
              LIVE
            </span>
          </div>
          <div className={`${OVERLAY} bottom-0`}>
            <span className={`${OVERLAY_TEXT} text-background/75`}>{manifest.render.cam}</span>
            <span className={`${OVERLAY_TEXT} text-background/75`}>{manifest.render.res}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="flex flex-col w-full lg:w-1/2"
        >
          <div className="flex items-center justify-between px-5 py-3 border-b-2 border-foreground">
            <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
              {manifest.doc.title}
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
              {manifest.doc.version}
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-between px-5 py-6 lg:py-8">
            <div className="flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_NEAR}
                transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
              >
                <SectionHeading lead={manifest.headline.lead} accent={manifest.headline.accent} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_NEAR}
                transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
                className="flex flex-col gap-4"
              >
                {manifest.paragraphs.map((p) => (
                  <p key={p} className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
                    {p}
                  </p>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scaleX: 0.8 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
                style={{ transformOrigin: "left" }}
                className="flex flex-wrap items-center gap-3 py-3 border-t-2 border-b-2 border-foreground"
              >
                <span className="h-1.5 w-1.5 bg-signal shrink-0" aria-hidden="true" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
                  {manifest.uptimeLabel}
                </span>
                <TrackingSince since={manifest.trackingSince} />
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-0 mt-6">
              {manifest.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={VIEWPORT_NEAR}
                  transition={{ duration: 0.5, delay: 0.15 + 0.08 * i, ease: EASE }}
                  className="flex flex-col gap-1 border-2 border-foreground px-4 py-3"
                >
                  <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
                    {stat.label}
                  </span>
                  <ScrambleText
                    text={stat.value}
                    className="text-xl lg:text-2xl font-mono font-bold tracking-tight tabular-nums"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
