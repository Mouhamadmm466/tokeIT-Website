"use client";

import { motion } from "framer-motion";

import { footer } from "../content";
import { EASE } from "../motion";

export function SiteFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: EASE }}
      className="w-full border-t-2 border-foreground px-6 py-8 lg:px-12"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-mono tracking-[0.15em] uppercase font-bold">
            {footer.wordmark}
          </span>
          <span className="text-[10px] font-mono tracking-widest text-muted-foreground">
            {footer.copyright}
          </span>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-6">
          {footer.links.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 + 0.06 * i, ease: EASE }}
              className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              target={link.href.startsWith("http") ? "_blank" : undefined}
            >
              {link.label}
              {link.href.startsWith("mailto:") ? (
                <span className="sr-only"> (opens your email app)</span>
              ) : null}
              {link.href.startsWith("http") ? (
                <span className="sr-only"> (opens in a new tab)</span>
              ) : null}
            </motion.a>
          ))}
        </nav>
      </div>
    </motion.footer>
  );
}
