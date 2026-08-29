"use client";

import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";

import { pricing } from "../content";
import { EASE, VIEWPORT, railIn } from "../motion";
import { SectionRail } from "../components/primitives";
import { PriceCounter } from "../components/metric-counter";
import { LiveThroughput } from "../components/live-readouts";
import { ArrowButton } from "../components/arrow-button";

export function PricingSection() {
  return (
    <section id="pricing" className="w-full px-6 py-20 lg:px-12">
      <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={railIn}>
        <SectionRail marker={pricing.marker} index={pricing.index} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.6, ease: EASE }}
        className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
      >
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl lg:text-3xl font-mono font-bold tracking-tight uppercase text-balance">
            {pricing.headline}
          </h2>
          <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed max-w-md">
            {pricing.body}
          </p>
        </div>
        <LiveThroughput label={pricing.liveLabel} />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {pricing.tiers.map((tier, i) => {
          const featured = tier.featured;
          const rule = featured ? "border-background/20" : "border-foreground";
          const dim = featured ? "text-background/80" : "text-muted-foreground";

          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.12 * i, ease: EASE }}
              className={`flex flex-col h-full border-2 border-foreground ${
                featured ? "bg-foreground text-background" : "bg-background text-foreground"
              } md:border-r-0 md:last:border-r-2 border-t-0 first:border-t-2 md:border-t-2`}
            >
              <div className={`flex items-center justify-between px-5 py-3 border-b-2 ${rule}`}>
                <span className="text-[10px] tracking-[0.2em] uppercase font-mono">{tier.name}</span>
                <div className="flex items-center gap-2">
                  {tier.badge ? (
                    <span className="bg-signal text-signal-ink text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 font-mono">
                      {tier.badge}
                    </span>
                  ) : null}
                  <span className="text-[10px] tracking-[0.2em] font-mono opacity-70">{tier.id}</span>
                </div>
              </div>

              <div className="px-5 pt-6 pb-4">
                <div className="flex items-baseline gap-1">
                  {tier.price === null ? (
                    <span className="text-3xl lg:text-4xl font-mono font-bold tracking-tight">
                      CUSTOM
                    </span>
                  ) : (
                    <>
                      <span className="text-3xl lg:text-4xl">
                        <PriceCounter target={String(tier.price)} prefix={tier.prefix ?? "$"} />
                      </span>
                      <span
                        className={`text-xs font-mono tracking-widest uppercase ${
                          featured ? "text-background/75" : "text-muted-foreground"
                        }`}
                      >
                        {tier.period}
                      </span>
                    </>
                  )}
                </div>
                <p className={`text-xs font-mono mt-3 leading-relaxed ${dim}`}>{tier.note}</p>
              </div>

              <div className={`flex-1 px-5 py-4 border-t-2 ${rule}`}>
                <div className="flex flex-col gap-3">
                  {tier.features.map((feature, f) => (
                    <motion.div
                      key={feature.label}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.35,
                        delay: 0.12 * i + 0.3 + 0.04 * f,
                        ease: EASE,
                      }}
                      className="flex items-start gap-3"
                    >
                      {feature.included ? (
                        <Check
                          size={12}
                          strokeWidth={2.5}
                          className="mt-0.5 shrink-0 text-signal"
                          aria-hidden="true"
                        />
                      ) : (
                        <Minus
                          size={12}
                          strokeWidth={2}
                          className={`mt-0.5 shrink-0 ${
                            featured ? "text-background/70" : "text-muted-foreground"
                          }`}
                          aria-hidden="true"
                        />
                      )}
                      <span
                        className={`text-xs font-mono leading-relaxed ${
                          feature.included
                            ? ""
                            : `line-through ${featured ? "text-background/70" : "text-muted-foreground"}`
                        }`}
                      >
                        {feature.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="px-5 pb-5 pt-3">
                <ArrowButton
                  href={tier.href}
                  label={tier.cta}
                  variant={featured ? "inverted" : "solid"}
                  full
                  iconSize={14}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
        className="flex items-center gap-3 mt-6"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          {pricing.footnote}
        </span>
        <div className="flex-1 border-t border-border" />
      </motion.div>
    </section>
  );
}
