export type MarketingLink = {
  href: string;
  label: string;
};

export type MarketingAction = MarketingLink & {
  variant: "solid" | "outline" | "ghost";
};

export type MarketingIconLink = MarketingLink & {
  icon: "x" | "github" | "instagram";
};

export type PlaceholderSuggestion = {
  label: string;
  format: string;
  recommendation: string;
};

type MediaAsset = {
  alt: string;
  src: string;
};

export const marketingContent = {
  brand: "tokeIT",
  nav: [
    { href: "#top", label: "Home" },
    { href: "#workflow", label: "How it works" },
    { href: "#privacy", label: "Privacy" },
  ] satisfies MarketingLink[],
  headerActions: {
    contact: {
      href: "mailto:hello@tokeit.ai?subject=Talk%20to%20sales",
      label: "Talk to sales",
    } satisfies MarketingLink,
    signup: {
      href: "mailto:hello@tokeit.ai?subject=Start%20for%20free",
      label: "Start for free",
      variant: "solid",
    } satisfies MarketingAction,
  },
  hero: {
    title: "Measure AI coding spend, tokens, and efficiency across every session.",
    subtitle: "Local-first AI coding performance intelligence for developers and teams.",
    trustItems: ["Developer teams", "Open source workflows", "Engineering leaders", "Product squads"],
    primaryAction: {
      href: "mailto:hello@tokeit.ai?subject=Start%20for%20free",
      label: "Start for free",
      variant: "solid",
    } satisfies MarketingAction,
    secondaryAction: {
      href: "mailto:hello@tokeit.ai?subject=Talk%20to%20sales",
      label: "Talk to sales",
      variant: "outline",
    } satisfies MarketingAction,
    backdrop: {
      src: "/images/m.gif",
      alt: "Animated tokeIT data field background",
    } satisfies MediaAsset,
  },
  story: {
    title: "Measure AI coding cost, tokens, output, and team efficiency in one local-first product.",
    description:
      "tokeIT brings every AI coding session into one dashboard so developers and teams can see what they spent, what changed, and what to improve next.",
    primaryAction: {
      href: "mailto:hello@tokeit.ai?subject=Start%20for%20free",
      label: "Start for free",
      variant: "solid",
    } satisfies MarketingAction,
    secondaryAction: {
      href: "mailto:hello@tokeit.ai?subject=Talk%20to%20sales",
      label: "Talk to sales",
      variant: "outline",
    } satisfies MarketingAction,
    metrics: [
      { label: "tools tracked", value: "6+" },
      { label: "sessions auto-captured", value: "100%" },
      { label: "privacy-first", value: "local-by-default" },
    ],
    panelStats: [
      { label: "tokens", value: "42.8k" },
      { label: "cost", value: "$12.84" },
      { label: "efficiency", value: "82" },
    ],
    panelFooter: ["tokens", "cost", "commits", "insights"],
    videoSuggestion: {
      label: "Show the tokeIT dashboard in action",
      format: "Short screen recording",
      recommendation:
        "Use a 60-90 second desktop walkthrough showing a live session, token cost, and the coaching recommendation that makes the data useful.",
    } satisfies PlaceholderSuggestion,
  },
  providerView: {
    title: "One view across every AI tool your team already uses.",
    description:
      "tokeIT brings Claude Code, Codex CLI, Cursor, Gemini, Copilot, and others into one performance layer so developers stop jumping between fragmented logs and token counters.",
    providers: ["Claude Code", "OpenAI Codex", "Cursor", "Gemini CLI", "Copilot", "More"],
    callouts: [
      {
        title: "Unified sessions",
        body: "See every provider through the same session model, cost model, and output model.",
      },
      {
        title: "Model-level filters",
        body: "Compare Sonnet, GPT, Gemini, and custom models without leaving the same dashboard.",
      },
      {
        title: "No workflow migration",
        body: "Keep using your preferred tools. tokeIT sits underneath them rather than replacing them.",
      },
    ],
    mediaSuggestion: {
      label: "Add a unified dashboard screenshot",
      format: "16:10 desktop screenshot",
      recommendation:
        "Show the same week filtered across three providers with visible cost, tokens, commits, and a model breakdown in one frame.",
    } satisfies PlaceholderSuggestion,
  },
  showcase: {
    title: "The product layer should reveal itself as you scroll.",
    description:
      "Keep the title outside the motion. The animation itself should feel like one full product view opening layer by layer: capture, context, outcome metrics, and coaching.",
    stageSuggestion: {
      label: "Add a full product showcase screenshot",
      format: "Full-page desktop capture",
      recommendation:
        "Use one polished full dashboard screenshot here with strong hierarchy: top summary, session stream, provider filters, and outcome metrics visible at once.",
    } satisfies PlaceholderSuggestion,
    layers: [
      {
        label: "capture layer",
        title: "Sessions, providers, and token buckets appear first.",
        body: "This layer should show the raw intake the product understands automatically across tools.",
        suggestion: {
          label: "Add a session intake screenshot",
          format: "Full-page product capture",
          recommendation:
            "Show a real capture-first view with provider, model, token buckets, session timing, and project path visible in one clean screen.",
        } satisfies PlaceholderSuggestion,
      },
      {
        label: "context layer",
        title: "Then the work gets connected to time, models, and git activity.",
        body: "Show how a session becomes meaningful once project context and commit signals are attached.",
        suggestion: {
          label: "Add a context-linked analytics screenshot",
          format: "Full-page product capture",
          recommendation:
            "Show a session expanded with git activity, files changed, duration, and model context so the product feels operational, not abstract.",
        } satisfies PlaceholderSuggestion,
      },
      {
        label: "outcome layer",
        title: "Then the product makes performance legible.",
        body: "Surface cost per commit, efficiency score, retries, and tracked output in one operational frame.",
        suggestion: {
          label: "Add an outcome metrics screenshot",
          format: "Full-page product capture",
          recommendation:
            "Best version: one screen with efficiency score, cost per commit, tracked commits, and a compact trend comparison against baseline.",
        } satisfies PlaceholderSuggestion,
      },
      {
        label: "coaching layer",
        title: "Finally the product points to what to improve next.",
        body: "The last layer should feel like calm, high-signal coaching rather than another dashboard widget.",
        suggestion: {
          label: "Add a coaching and insights screenshot",
          format: "Full-page product capture",
          recommendation:
            "Show the insights feed with one expanded recommendation, estimated savings, and enough surrounding UI that it feels like a finished product page.",
        } satisfies PlaceholderSuggestion,
      },
    ],
  },
  coaching: {
    title: "Coaching, not just tracking.",
    description:
      "tokeIT should feel like a serious performance layer: specific, calm, and actionable. This is where the product stops being a dashboard and starts becoming a tool developers trust.",
    insights: [
      {
        title: "Cache hit rate dropped to 23%",
        body: "You are likely resending context each turn instead of building on prior state. Tighten prompts and reuse context windows more intentionally.",
      },
      {
        title: "Last 4 sessions on this feature had no tracked commits",
        body: "That usually means the task was not scoped cleanly enough, or the work is happening outside a measurable output loop.",
      },
      {
        title: "Prompt retry rate is 40%",
        body: "Your first instruction is not constraining enough. Better upfront context should reduce retries and lower spend.",
      },
    ],
    mediaSuggestion: {
      label: "Add an insights screen",
      format: "Desktop screenshot or short video",
      recommendation:
        "Best option: a real insights page with one expanded recommendation, an estimated savings value, and a small trend sparkline.",
    } satisfies PlaceholderSuggestion,
  },
  bridge: {
    title: "Built for individuals first. Ready for teams when the work grows.",
    description:
      "The site should make it clear that the product stays sharp for individual developers while still expanding into team visibility later.",
    solo: {
      title: "For individual developers",
      bullets: [
        "Track what each session actually cost.",
        "See whether your prompting is getting better.",
        "Compare models against your own workflow instead of generic benchmarks.",
      ],
    },
    team: {
      title: "For engineering teams",
      bullets: [
        "See where AI spend is concentrated across people and projects.",
        "Spot efficient workflows worth copying across the team.",
        "Create visibility without exposing private session content.",
      ],
    },
  },
  teamIntel: {
    title: "Team intelligence that feels operational, not performative.",
    description:
      "Leaderboards, per-project tracking, and coaching opportunities belong in one clear admin view. The product should feel like a serious engineering instrument, not gamified surveillance.",
    metrics: [
      { label: "team spend", value: "$1,284" },
      { label: "avg efficiency", value: "79" },
      { label: "projects tracked", value: "12" },
      { label: "members active", value: "8" },
    ],
    mediaSuggestion: {
      label: "Add a team analytics screenshot",
      format: "Wide admin dashboard screenshot",
      recommendation:
        "Show the leaderboard, a team trend chart, and a project breakdown in one composed admin screen. That will make the team story feel real immediately.",
    } satisfies PlaceholderSuggestion,
  },
  privacy: {
    title: "Local-first by default. Useful for teams only when people opt in.",
    description:
      "The privacy story should feel calm and confident: local storage first, sync only when enabled, private coaching kept private, and shared team analytics scoped to what managers actually need.",
    badges: ["Local-first", "Opt-in sync", "Private coaching", "Metrics-only team view"],
    rows: [
      {
        title: "Raw prompt content stays on-device",
        body: "The product is built so the sensitive layer remains local unless the user intentionally connects a sync account.",
        meta: "device local",
      },
      {
        title: "Team analytics expose performance, not private notes",
        body: "Members can compare shared metrics without exposing session content, private coaching text, or raw prompts.",
        meta: "scoped sharing",
      },
      {
        title: "Cloud sync exists for collaboration, not surveillance",
        body: "The shared layer is there to support teams and projects, not to mirror every interaction a developer has with AI.",
        meta: "opt-in only",
      },
    ],
  },
  workflow: {
    title: "Install once. Every session gets measured. Open the dashboard and get smarter.",
    description:
      "tokeIT should feel frictionless: one install, silent capture in the background, and a desktop view that turns raw sessions into useful performance feedback.",
    proof: [
      "Auto-tracking, zero friction",
      "Claude Code · Cursor · Copilot · Codex · Gemini",
      "Raw session content stays local",
    ],
    steps: [
      {
        index: "01",
        title: "Install once, it tracks everything",
        body: "Install the desktop app and the background agent starts watching the AI tool logs already written to disk. No API keys, no timers, no manual start buttons.",
        command: "tokeIT.app + background agent",
        points: ["Runs silently in the background", "Starts with Claude Code, Cursor, Copilot, Codex", "No manual start or stop"],
      },
      {
        index: "02",
        title: "Every session gets measured",
        body: "When a session ends, tokeIT captures the token breakdown, total cost, duration, git output, and an efficiency score that weighs all of it together.",
        command: "Tokens · cost · time · commits · score",
        points: ["Input / output / cache tokens", "Exact dollar cost", "Commits, lines changed, efficiency 0-100"],
      },
      {
        index: "03",
        title: "Open the dashboard, get smarter",
        body: "The desktop app shows your trends, highlights waste, and gives coaching on which habits are costing you money and what your best sessions have in common.",
        command: "Stats · trends · insights · coaching",
        points: ["Cost dashboard and token heatmap", "Insights engine for wasted sessions", "AI coaching based on your real data"],
      },
    ],
  },
  footer: {
    ctaSubtitle: "Start tracking tokens, cost, commits, and efficiency on your next project today.",
    ctaAction: {
      href: "mailto:hello@tokeit.ai?subject=Start%20for%20free",
      label: "Get started",
      variant: "solid",
    } satisfies MarketingAction,
    status: "All systems operational",
    columns: [
      {
        title: "Resources",
        links: [
          { href: "#top", label: "Home" },
          { href: "#workflow", label: "How it works" },
          { href: "mailto:hello@tokeit.ai?subject=Download%20tokeIT%20for%20macOS", label: "Download" },
        ],
      },
      {
        title: "Support",
        links: [
          { href: "mailto:hello@tokeit.ai?subject=Book%20a%20tokeIT%20team%20demo", label: "Book demo" },
          { href: "mailto:hello@tokeit.ai", label: "Contact" },
          { href: "mailto:hello@tokeit.ai?subject=Sign%20up%20for%20tokeIT", label: "Sign up" },
        ],
      },
      {
        title: "Legal",
        links: [
          { href: "#privacy", label: "Privacy Policy" },
          { href: "mailto:hello@tokeit.ai?subject=Terms%20of%20Service", label: "Terms of Service" },
          { href: "mailto:hello@tokeit.ai?subject=Subprocessors", label: "Subprocessors" },
        ],
      },
    ] satisfies ReadonlyArray<{
      title: string;
      links: MarketingLink[];
    }>,
    socialLinks: [
      { href: "https://x.com/tokeIT", label: "X", icon: "x" },
      { href: "https://github.com/tokeIT", label: "GitHub", icon: "github" },
      { href: "https://instagram.com/tokeIT", label: "Instagram", icon: "instagram" },
    ] satisfies MarketingIconLink[],
  },
} as const;
