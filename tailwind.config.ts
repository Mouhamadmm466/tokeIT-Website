import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./features/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        signal: {
          DEFAULT: "hsl(var(--signal))",
          ink: "hsl(var(--signal-ink))",
          inv: "hsl(var(--signal-inv))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "var(--radius)",
        sm: "var(--radius)",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        pixel: ["var(--font-pixel)", "var(--font-mono)", "monospace"],
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        glitch: {
          "0%, 90%, 100%": { filter: "none", transform: "translate(0)" },
          "92%": { filter: "hue-rotate(90deg)", transform: "translate(-2px, 1px)" },
          "94%": { filter: "hue-rotate(-90deg)", transform: "translate(2px, -1px)" },
          "96%": { filter: "none", transform: "translate(-1px, -1px)" },
          "98%": { filter: "hue-rotate(45deg)", transform: "translate(1px, 2px)" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        marquee: "marquee 30s linear infinite",
        glitch: "glitch 5s infinite",
      },
    },
  },
  plugins: [animate],
};

export default config;
