"use client";

import { motion } from "framer-motion";

import { ecosystem } from "../content";
import { EASE, VIEWPORT, railIn } from "../motion";
import { SectionRail } from "../components/primitives";

// Four copies: the marquee translates -50%, i.e. exactly two list-widths, so the loop
// is seamless AND two copies always exceed even a very wide viewport (no trailing gap).
const TRACK = [
  ...ecosystem.tools,
  ...ecosystem.tools,
  ...ecosystem.tools,
  ...ecosystem.tools,
];

export function EcosystemSection() {
  return (
    <section aria-labelledby="ecosystem-heading" className="w-full py-16 px-6 lg:px-12">
      <h2 id="ecosystem-heading" className="sr-only">
        Supported AI coding tools
      </h2>
      <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={railIn}>
        <SectionRail marker={ecosystem.marker} index={ecosystem.index} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="overflow-hidden border-2 border-foreground group"
      >
        <div
          className="flex animate-marquee [animation-play-state:running] group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
          style={{ width: "max-content" }}
        >
          {TRACK.map((tool, i) => (
            <div
              key={`${tool}-${i}`}
              aria-hidden={i >= ecosystem.tools.length ? "true" : undefined}
              className={`flex items-center justify-center px-8 py-4 border-r-2 border-foreground shrink-0 ${
                ecosystem.glitchAt.includes(i % ecosystem.tools.length) ? "animate-glitch" : ""
              }`}
            >
              <span className="text-sm font-mono tracking-[0.15em] uppercase whitespace-nowrap">
                {tool}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
