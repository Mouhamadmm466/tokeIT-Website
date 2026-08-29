import type { Transition, Variants } from "framer-motion";

/** Every transition on the page shares this curve. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const ease = (duration: number, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE,
});

/** Section header rails slide in from the left. */
export const railIn: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: ease(0.5) },
};

/** Panels resolve out of a blur — the page's default entrance. */
export const panelIn = (index = 0): Variants => ({
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: ease(0.6, 0.12 * index),
  },
});

export const riseIn = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: ease(0.5, delay) },
});

export const VIEWPORT = { once: true, margin: "-60px" } as const;
export const VIEWPORT_NEAR = { once: true, margin: "-30px" } as const;
