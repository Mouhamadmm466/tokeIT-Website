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
      href: "mailto:hello@tokeit.ai?subject=Contact%20tokeIT",
      label: "Contact",
    } satisfies MarketingLink,
    signup: {
      href: "mailto:hello@tokeit.ai?subject=Sign%20up%20for%20tokeIT",
      label: "Sign up <>",
      variant: "solid",
    } satisfies MarketingAction,
  },
  hero: {
    eyebrow: "Local-first AI coding performance intelligence",
    title: "See what your AI workflow is actually producing.",
    description:
      "tokeIT tracks tokens, cost, time, commits, and efficiency across Claude, Codex, Cursor, Gemini, and more, so you can build faster with less waste.",
    primaryAction: {
      href: "mailto:hello@tokeit.ai?subject=Download%20tokeIT%20for%20macOS",
      label: "Download for macOS",
      variant: "solid",
    } satisfies MarketingAction,
    secondaryAction: {
      href: "mailto:hello@tokeit.ai?subject=Book%20a%20tokeIT%20team%20demo",
      label: "Book demo",
      variant: "outline",
    } satisfies MarketingAction,
    proofPoints: [
      "Runs silently in the background",
      "Raw prompt content stays on-device",
      "Built for CLI-native workflows",
    ],
    backdrop: {
      src: "/images/m.gif",
      alt: "Animated tokeIT data field background",
    } satisfies MediaAsset,
    orbitCards: [
      {
        title: "Cost per commit, in context",
        media: {
          src: "/images/_ (1).webp",
          alt: "tokeIT analytics detail view",
        },
      },
      {
        title: "Behavioral insights that tell you what to fix",
        media: {
          src: "/images/_.gif",
          alt: "Animated tokeIT insight preview",
        },
      },
    ],
    spotlight: {
      title: "Desktop intelligence layer",
      status: "Live session sync",
      media: {
        src: "/images/Chaos Theory.webp",
        alt: "tokeIT desktop app dashboard mockup",
      },
      metrics: [
        {
          label: "Efficiency score",
          value: "82",
          footnote: "vs personal baseline",
          counterValue: 82,
        },
        {
          label: "Cost per commit",
          value: "$0.14",
          footnote: "14% lower this week",
        },
      ],
      terminalLines: [
        "toke watch --install",
        "toke review --week",
        "toke insights",
        "toke goal set cost_per_commit 0.05",
      ],
    },
  },
  ribbon: [
    {
      label: "Unified view",
      value: "Claude, Codex, Cursor, Gemini, and more",
    },
    {
      label: "Outcome-aware",
      value: "Commits, files changed, lines added, lines removed",
    },
    {
      label: "Signature metric",
      value: "Efficiency Score plus cost per commit",
    },
  ],
  product: {
    eyebrow: "Built around output, not just usage",
    title:
      "Measure where your AI workflow is helping, and where it is quietly leaking money and momentum.",
    cards: [
      {
        title: "Performance intelligence",
        description:
          "Connect time, tokens, model choice, and spend to what actually shipped so each session has operational meaning.",
        tone: "dark",
        media: {
          src: "/images/_.jpeg",
          alt: "tokeIT dashboard analytics overview",
        },
      },
      {
        title: "Coaching with context",
        description:
          "Surface patterns like retry-heavy prompting, weak cache reuse, or sessions with no tracked output, then explain what to do next.",
        tone: "light",
        media: {
          src: "/images/_ (2).webp",
          alt: "tokeIT coaching and trend analysis screen",
        },
      },
      {
        title: "One view across providers",
        description:
          "Compare Claude, Codex, Cursor, and Gemini in the same workflow and learn which tools are actually efficient for your kind of work.",
        tone: "sand",
        media: {
          src: "/images/_.gif",
          alt: "Animated tokeIT cross-provider comparison view",
        },
      },
    ],
  },
  workflow: {
    eyebrow: "Install once. Measure everything.",
    title: "Zero-friction tracking for developers who live in the terminal.",
    steps: [
      {
        index: "01",
        title: "Watch sessions automatically",
        description:
          "toke watch --install runs as a background daemon and detects active AI-tool usage without manual start or stop rituals.",
      },
      {
        index: "02",
        title: "Link effort to outcomes",
        description:
          "Session windows are connected to git activity, commit volume, and lines changed so usage gets tied to delivery.",
      },
      {
        index: "03",
        title: "Turn patterns into action",
        description:
          "Personalized insights show where cost is concentrated, which models are outperforming, and where your workflow is stalling.",
      },
    ],
    stack: {
      primary: {
        src: "/images/_ (3).webp",
        alt: "tokeIT workflow summary view",
      },
      secondary: {
        src: "/images/_.webp",
        alt: "tokeIT local-first insight screen",
      },
    },
  },
  score: {
    eyebrow: "Your signature metric",
    title: "Efficiency Score makes AI performance legible at a glance.",
    description:
      "Every session is judged against your own history, not a global benchmark. That means the score rewards real improvement instead of pretending every developer works the same way.",
    pillars: [
      {
        label: "Token efficiency",
        value: "Output / input ratio",
      },
      {
        label: "Time efficiency",
        value: "Tokens per minute",
      },
      {
        label: "Completion quality",
        value: "Cost per commit vs baseline",
      },
    ],
    media: {
      src: "/images/_ (4).webp",
      alt: "tokeIT efficiency and leaderboard view",
    },
  },
  teams: {
    eyebrow: "Built for teams when you are ready",
    title:
      "Give engineering leads visibility into AI spend, output, and coaching opportunities.",
    description:
      "Team views keep private session content private, while exposing the shared performance layer that helps managers spot inefficient workflows, compare projects, and see where AI investment is paying off.",
    points: [
      {
        title: "Team-wide spend and efficiency",
        description:
          "Understand where AI budget is concentrated and how performance is trending.",
      },
      {
        title: "Per-project visibility",
        description:
          "Track AI effort by project or feature instead of only by individual developer.",
      },
      {
        title: "Measured accountability",
        description:
          "Leaderboards create visibility without exposing prompt content or session notes.",
      },
    ],
    media: {
      primary: {
        src: "/images/_ (1).webp",
        alt: "tokeIT team leaderboard preview",
      },
      secondary: {
        src: "/images/m.gif",
        alt: "Animated tokeIT team motion background",
      },
    },
  },
  privacy: {
    eyebrow: "Privacy-first by default",
    title: "Local-first storage, opt-in sync, no raw prompt content leaving the device.",
    description:
      "tokeIT stores session intelligence locally and only syncs when a user chooses to connect an account for team features. The individual coaching layer stays personal; the shared metrics layer stays useful.",
    media: {
      src: "/images/_.webp",
      alt: "tokeIT privacy and local sync interface",
    },
  },
  cta: {
    eyebrow: "Move from token counts to operational clarity",
    title:
      "Install the desktop app, keep the CLI in your workflow, and make AI performance measurable.",
    primaryAction: {
      href: "mailto:hello@tokeit.ai?subject=Sign%20up%20for%20tokeIT",
      label: "Sign up",
      variant: "solid",
    } satisfies MarketingAction,
    secondaryAction: {
      href: "mailto:hello@tokeit.ai?subject=Book%20a%20tokeIT%20team%20demo",
      label: "Book a team demo",
      variant: "outline",
    } satisfies MarketingAction,
  },
  footer: {
    eyebrow: "Local-first AI coding performance intelligence",
    title: "Built for developers who want clarity around how AI actually performs.",
    note: "Local-first AI coding performance intelligence for developers and teams.",
    ctaTitle: "Measure AI that helps while you build, not after.",
    ctaSubtitle: "Start tracking tokens, cost, commits, and efficiency on your next project today.",
    ctaAction: {
      href: "mailto:hello@tokeit.ai?subject=Download%20tokeIT%20for%20macOS",
      label: "Download for Mac",
      variant: "solid",
    } satisfies MarketingAction,
    status: "All systems operational",
    subprocessorText: "List of subprocessors.",
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
    metaLinks: [
      { href: "#privacy", label: "Privacy" },
      { href: "mailto:hello@tokeit.ai", label: "Contact" },
      { href: "mailto:hello@tokeit.ai?subject=Sign%20up%20for%20tokeIT", label: "Sign up" },
    ] satisfies MarketingLink[],
    socialLinks: [
      { href: "https://x.com/tokeIT", label: "X", icon: "x" },
      { href: "https://github.com/tokeIT", label: "GitHub", icon: "github" },
      { href: "https://instagram.com/tokeIT", label: "Instagram", icon: "instagram" },
    ] satisfies MarketingIconLink[],
  },
} as const;
