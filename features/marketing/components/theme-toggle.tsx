"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { EASE } from "../motion";
import { useMounted } from "../use-mounted";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  // Reserve the exact footprint until the theme resolves, so nothing shifts.
  if (!mounted) {
    return <div className="w-8 h-8 border border-foreground/40" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      aria-label="Dark theme"
      aria-pressed={isDark}
      className="w-8 h-8 border border-foreground/40 flex items-center justify-center text-foreground hover:border-foreground/50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: isDark ? -90 : 90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: isDark ? 90 : -90, scale: 0.5 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="flex"
        >
          {isDark ? (
            <Moon size={14} strokeWidth={1.5} aria-hidden="true" />
          ) : (
            <Sun size={14} strokeWidth={1.5} aria-hidden="true" />
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
