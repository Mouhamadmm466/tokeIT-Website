"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, Menu, X } from "lucide-react";

import { headerActions, nav } from "../content";
import { EASE } from "../motion";
import { ThemeToggle } from "./theme-toggle";

const LINK =
  "text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal";

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full px-4 pt-4 lg:px-6 lg:pt-6">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        aria-label="Primary"
        className="w-full border border-foreground/20 bg-background/80 backdrop-blur-sm px-6 py-3 lg:px-8"
      >
        <div className="flex items-center justify-between">
          <a
            href="#top"
            className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
          >
            <Activity size={16} strokeWidth={1.5} aria-hidden="true" />
            <span className="text-xs font-mono tracking-[0.15em] uppercase font-bold">tokeIT</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {nav.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + 0.06 * i, ease: EASE }}
                className={LINK}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <ThemeToggle />
            <a href={headerActions.login.href} className={`hidden sm:block ${LINK}`}>
              {headerActions.login.label}
            </a>
            <motion.a
              href={headerActions.cta.href}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-foreground text-background px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-mono tracking-widest uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
            >
              {headerActions.cta.label}
            </motion.a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="md:hidden w-8 h-8 border border-foreground/40 flex items-center justify-center hover:border-foreground/70 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
            >
              {open ? (
                <X size={14} strokeWidth={1.5} aria-hidden="true" />
              ) : (
                <Menu size={14} strokeWidth={1.5} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id="mobile-nav"
              key="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col mt-3 pt-3 border-t border-foreground/20">
                {nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`py-2.5 ${LINK}`}
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href={headerActions.login.href}
                  onClick={() => setOpen(false)}
                  className={`py-2.5 sm:hidden ${LINK}`}
                >
                  {headerActions.login.label}
                </a>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
