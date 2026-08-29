---
name: brutalist-terminal-ui
description: Build or review UI in the brutalist-terminal aesthetic — hard 2px borders, zero radius, cream/near-black palette with one hot orange signal colour, all-monospace type with a pixel display face, and instrument-panel layouts that read like a systems console. Use when working on the tokeIT marketing site, or when a request asks for a brutalist, terminal, technical, "systems", or v0-brutalist look.
---

# Brutalist Terminal UI

A design system where the interface presents itself as **instrumentation**, not marketing.
Every panel reads like a readout on a machine someone actually operates.

The governing instinct: **the grid is visible, the edges are hard, and nothing is soft.**
When in doubt, remove the rounding, thicken the border, and set it in mono.

## Non-negotiables

These five rules produce most of the aesthetic. Violating any one breaks the illusion.

1. **Zero border radius. Everywhere.** `--radius: 0rem`, plus a global `border-radius: 0 !important`.
   A single rounded corner reads as a generic SaaS template and collapses the whole effect.
2. **Monospace for 100% of text.** `font-mono` on `<body>`. No proportional face anywhere —
   not in body copy, not in headings, not in buttons. The pixel display face is the only exception.
3. **Borders are structure, not decoration.** `border-2 border-foreground` for panels and
   panel-internal dividers. `border border-border` for hairline/table rules. Never a shadow —
   this system has **no** `box-shadow`, no gradient fills, no blur except `backdrop-blur-sm` on the nav.
4. **Exactly one accent colour**, the orange `--signal` (`#ea580c` / `hsl(20.5 90% 48%)`).
   It marks live state, the leading edge of a CTA, checkmarks, and a single word in a headline.
   Never as a background wash, never two accents.
5. **Panels share edges; they never float.** Grids use `gap-0` and cancel doubled borders with
   `border-r-2 last:border-r-0`. Cards do not sit apart with whitespace between them.

## Palette

Semantic HSL triplets consumed as `hsl(var(--token))`. Both themes ship; `darkMode: "class"`.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--background` | `43 23% 93%` | `0 0% 6%` | Page. Warm bone, never pure white. |
| `--foreground` | `0 0% 4%` | `43 23% 93%` | Text, borders, inverted panel fills. |
| `--muted-foreground` | `0 0% 40%` | `0 0% 60%` | Labels, metadata, secondary copy. |
| `--border` | `0 0% 75%` | `0 0% 25%` | Hairline rules only. |
| `--signal` | `20.5 90% 48%` | same | The one hot colour. |
| `--signal-ink` | `0 0% 4%` | same | Text/icons sitting **on** the orange. Cream on orange is only 3.1:1; near-black is 5.6:1. |
| `--signal-inv` | `20.5 90% 48%` | `20.5 90% 38%` | Orange **text** on an inverted (`bg-foreground`) panel. That panel flips with the theme, so the orange must darken in dark mode. |
| `--dot-grid` | `#c4c2b8` | `#333` | Page background dot field. |

The warm cream is load-bearing. A neutral grey background makes this look like a wireframe;
the bone tint makes it look like a printed technical document.

## Type

Two faces only:

- **`font-mono`** — JetBrains Mono. Everything.
- **`font-pixel`** — GeistPixel Grid, a bitmap display face. **Hero headline only.**
  It is the loudest element on the page; using it twice spends its impact.

Size and tracking are how hierarchy is expressed, since there is only one family:

| Role | Recipe |
|---|---|
| Hero headline | `font-pixel text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight select-none` |
| Section headline | `text-2xl lg:text-3xl font-mono font-bold tracking-tight uppercase text-balance` |
| Big metric | `text-4xl lg:text-5xl font-mono font-bold tracking-tight tabular-nums` |
| Body | `text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed` |
| Panel chrome label | `text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono` |
| Table micro-label | `text-[9px] tracking-[0.15em] uppercase text-muted-foreground` |

**Wide letter-spacing on small uppercase mono is the signature move.** `tracking-[0.2em]` at
`text-[10px]` is what makes a label read as a machine readout rather than a caption. Use it liberally.

All numerals that can change at runtime get `tabular-nums` so counters don't jitter the layout.

## Voice

Copy is written as system output, not marketing prose.

- Panel titles are **filenames or identifiers**: `terminal.sys`, `neural_scan.dither`,
  `MANIFEST.md`, `edge_nodes.status`, `inference.metrics`.
- Section markers are **comments**: `// SECTION: RAW_DATA`, `// PARTNERS: MODEL_ECOSYSTEM`.
- Labels are **SCREAMING_SNAKE_CASE**: `AVG_LATENCY`, `MODELS_DEPLOYED`, `EDGE_REGIONS`.
- Prose is declarative and short. Strip adjectives. "No abstractions. No magic." not
  "We're passionate about simplifying your workflow."
- Hero headline is **imperative verbs, each ending in a period**: `DEPLOY. SCALE.` / `ROUTE.`

## Primitives

### Section header rail
Opens every section. Establishes the numbering spine.

```tsx
<div className="flex items-center gap-4 mb-8">
  <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
    // SECTION: RAW_DATA
  </span>
  <div className="flex-1 border-t border-border" />
  <span className="inline-block h-2 w-2 bg-signal animate-blink" />
  <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">004</span>
</div>
```

### Panel + chrome bar
The core container. A `border-2` box whose first child is a titled bar divided by `border-b-2`.

```tsx
<div className="flex flex-col border-2 border-foreground">
  <div className="flex items-center justify-between border-b-2 border-foreground px-4 py-2">
    <span className="text-[10px] tracking-widest uppercase text-muted-foreground">session.metrics</span>
    <span className="inline-block h-2 w-2 bg-signal" />
  </div>
  <div className="flex-1 p-4">{/* … */}</div>
</div>
```

The right slot of the chrome bar carries **liveness**: a blinking square, a tick counter,
a resolution string, a version number. It is never empty.

Three-square window controls (`bg-signal`, `bg-foreground`, `border border-foreground`) mark a
terminal-flavoured panel specifically.

### Split-arrow button
The one button shape. An orange square holding an arrow, welded to a solid label block — `gap-0`,
no radius, the two halves touching.

```tsx
<button className="group flex items-center gap-0 bg-foreground text-background text-sm font-mono tracking-wider uppercase">
  <span className="flex items-center justify-center w-10 h-10 bg-signal">
    <ArrowRight className="h-4 w-4 text-background transition-transform group-hover:translate-x-0.5" />
  </span>
  <span className="px-5 py-2.5">Request a demo</span>
</button>
```

Inverted panels flip to `bg-background text-foreground`; the orange square stays orange.

### Inverted panel
`bg-foreground text-background` turns a panel into a terminal screen or a highlighted pricing tier.
Inside one, all internal borders and muted text switch to `background/20`, `background/60` opacities —
`border-border` and `text-muted-foreground` will not read correctly against it.

### Metric cell
```tsx
<div className="flex flex-col gap-1">
  <span className="text-4xl lg:text-5xl font-mono font-bold tracking-tight tabular-nums">4.2ms</span>
  <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Avg Latency</span>
</div>
```

## Motion

Motion is **mechanical, not organic**. Nothing eases in from below; nothing fades up on scroll.
Things blink, tick, type, and scroll at constant speed — the way instruments behave.

| Animation | Definition | Use |
|---|---|---|
| `blink` | `1s step-end infinite`, opacity 1 → 0 → 1 | Cursors, live-status squares. `step-end` is essential — a smooth fade reads as decorative. |
| `marquee` | `30s linear infinite`, `translateX(0 → -50%)` | Logo strips. Requires the item list rendered **twice** for a seamless loop. |
| `glitch` | `5s infinite`, quiet for 90% then 4 hue-rotate + translate jumps | Applied to a *few* marquee cells, not all. Rarity is what sells it. |
| count-up | `requestAnimationFrame`, ease-out, on intersection | Metrics. Render the zero-padded placeholder (`00.0K`, `$000`) in SSR HTML so layout never shifts. |
| type-on | fixed ms-per-character, sequential lines | Terminal panels. |

Everything must degrade under `prefers-reduced-motion: reduce` — collapse durations and show
final values immediately.

## Composition

Page rhythm: `w-full px-6 py-20 lg:px-12` per section, each opening with a header rail.

Vary the panel grid so the page doesn't read as a list of identical cards:

- **2×2 equal grid** — the raw-data instrument cluster
- **50/50 split** — image/visual on one side, document on the other
- **3-across** — pricing, with the middle tier inverted
- **full-bleed strip** — marquee

Nav is a bordered bar floated inside page padding (`px-4 pt-4`), `bg-background/80 backdrop-blur-sm` —
the only blur in the system. Footer is a `border-t-2` bar with wordmark left, links right.

## Review checklist

- [ ] No border-radius anywhere, including on images, inputs, and buttons
- [ ] No `box-shadow`, no gradient fill, no blur outside the nav
- [ ] Every text node is monospace; `font-pixel` used exactly once
- [ ] Orange appears only as signal — count the usages, they should be few and deliberate
- [ ] Orange is never used for small text on a light surface (3.1:1). Use `signal-ink` on the orange, `signal-inv` for orange text on inverted panels
- [ ] Every panel has a chrome bar, and every chrome bar's right slot shows liveness
- [ ] Grid children cancel doubled borders (`last:border-r-0`)
- [ ] Runtime numerals are `tabular-nums` and SSR to a zero-padded placeholder
- [ ] Inverted panels use `background/xx` opacities, never `border-border`/`text-muted-foreground`
- [ ] Both themes verified; contrast holds for muted text on cream and on near-black
- [ ] `prefers-reduced-motion` disables blink/marquee/glitch and reveals final counter values
