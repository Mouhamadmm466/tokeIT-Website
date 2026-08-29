"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Variant = "solid" | "inverted";

/**
 * The one button shape in the system: an orange square welded to a label block.
 * `gap-0` is load-bearing — the two halves must touch.
 */
export function ArrowButton({
  href,
  label,
  variant = "solid",
  full = false,
  iconSize = 16,
}: {
  href: string;
  label: string;
  variant?: Variant;
  full?: boolean;
  iconSize?: number;
}) {
  const surface =
    variant === "solid" ? "bg-foreground text-background" : "bg-background text-foreground";
  const square = iconSize >= 16 ? "w-10 h-10" : "w-9 h-9";

  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`group flex items-center gap-0 text-xs sm:text-sm font-mono tracking-wider uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal ${surface} ${
        full ? "w-full justify-center" : ""
      }`}
    >
      <span className={`flex items-center justify-center bg-signal shrink-0 ${square}`}>
        <ArrowRight
          size={iconSize}
          strokeWidth={2}
          className="text-background transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
      <span className={`px-5 py-2.5 ${full ? "flex-1 text-center" : ""}`}>{label}</span>
    </motion.a>
  );
}
