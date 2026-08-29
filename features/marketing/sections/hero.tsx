"use client";

import { motion } from "framer-motion";

import { hero } from "../content";
import { EASE } from "../motion";
import { ArrowButton } from "../components/arrow-button";
import { HeroVisual } from "../components/hero-visual";

const HEADLINE =
  "font-pixel text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-foreground select-none";

export function Hero() {
  return (
    <section
      id="top"
      className="relative w-full px-6 pt-6 pb-12 sm:px-12 lg:px-24 lg:pt-10 lg:pb-16"
    >
      {/* One real heading for assistive tech; the split lines below are decorative. */}
      <h1 className="sr-only">
        tokeIT — track, measure, and improve AI coding performance
      </h1>

      <div className="flex flex-col items-center text-center">
        <motion.p
          aria-hidden="true"
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: EASE }}
          className={`${HEADLINE} mb-2`}
        >
          {hero.lineOne}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          className="w-full max-w-2xl my-4 lg:my-6"
        >
          <HeroVisual />
        </motion.div>

        <motion.p
          aria-hidden="true"
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
          className={`${HEADLINE} mb-4`}
        >
          {hero.lineTwo}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: EASE }}
          className="text-xs lg:text-sm text-muted-foreground max-w-md mb-6 leading-relaxed font-mono"
        >
          {hero.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: EASE }}
        >
          <ArrowButton href={hero.cta.href} label={hero.cta.label} />
        </motion.div>
      </div>
    </section>
  );
}
