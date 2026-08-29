/**
 * Every string on the marketing page lives here.
 * Voice rules: system output, not marketing prose. Identifiers are filenames,
 * labels are SCREAMING_SNAKE_CASE, sentences are declarative and short.
 */

export type NavLink = { href: string; label: string };

export type ProviderRow = { name: string; status: "ONLINE" | "IDLE" | "SYNCING"; value: string };

export type TerminalLine = { text: string; tone: "signal" | "dim" | "bright" };

export const nav: NavLink[] = [
  { href: "#capture", label: "Platform" },
  { href: "#coaching", label: "Insights" },
  { href: "#privacy", label: "Privacy" },
  { href: "#pricing", label: "Pricing" },
];

export const hero = {
  lineOne: "TRACK. MEASURE.",
  lineTwo: "IMPROVE.",
  body: "tokeIT is the local-first measurement layer for AI-assisted engineering. Every session priced, every commit attributed, every habit scored. Nothing leaves your machine unless you say so.",
  cta: { label: "Download for macOS", href: "mailto:hello@tokeit.dev?subject=Download%20tokeIT%20for%20macOS" },
};

export const capture = {
  marker: "// SECTION: LIVE_CAPTURE",
  index: "001",
  terminal: {
    title: "capture.sys",
    lines: [
      { text: "$ tokeit daemon --watch", tone: "bright" },
      { text: "[ok] agent attached to 5 log sources", tone: "dim" },
      { text: "[..] claude-code   ~/.claude/projects", tone: "dim" },
      { text: "[..] cursor        ~/Library/Cursor", tone: "dim" },
      { text: "[..] codex-cli     ~/.codex/sessions", tone: "dim" },
      { text: "", tone: "dim" },
      { text: "> session 8f21ac closed", tone: "signal" },
      { text: "  model      claude-opus-4", tone: "dim" },
      { text: "  tokens     in 18.2k / out 4.9k / cache 61.4k", tone: "dim" },
      { text: "  duration   00:22:41", tone: "dim" },
      { text: "  git        3 commits / +412 -87", tone: "dim" },
      { text: "  cost       $1.84", tone: "bright" },
      { text: "  efficiency 87 / 100", tone: "signal" },
      { text: "", tone: "dim" },
      { text: "[ok] written to local store. 0 bytes uploaded.", tone: "dim" },
    ] satisfies TerminalLine[],
  },
  dither: { title: "token_field.dither", meta: "320x240" },
  metrics: {
    title: "session.metrics",
    // `display` is the literal target string. Digits tumble; everything else is fixed,
    // so the rendered width never changes and the panel cannot reflow mid-animation.
    items: [
      { label: "Tokens today", display: "84.6K" },
      { label: "Spend today", display: "$12.84" },
      { label: "Efficiency score", display: "87" },
      { label: "Commits tracked", display: "214" },
    ],
  },
  providers: {
    title: "providers.status",
    rows: [
      { name: "CLAUDE-CODE", status: "ONLINE", value: "38.2K" },
      { name: "CURSOR", status: "ONLINE", value: "21.7K" },
      { name: "CODEX-CLI", status: "ONLINE", value: "14.1K" },
      { name: "COPILOT", status: "IDLE", value: "10.6K" },
    ] satisfies ProviderRow[],
    barLabel: "Cache hit rate",
    barValue: 73,
  },
};

export const manifest = {
  marker: "// SECTION: MANIFEST",
  index: "002",
  render: { title: "RENDER: token_topology.obj", cam: "CAM: -45deg / ISO", res: "RES: 2048x2048" },
  doc: { title: "MANIFEST.md", version: "v1.4.0" },
  headline: { lead: "Instrumentation for", accent: "raw AI output" },
  paragraphs: [
    "AI writes a growing share of the code your team ships, and almost none of it is measured. Spend shows up on a bill weeks late, with no session, no model, and no commit attached to it.",
    "tokeIT sits underneath the tools you already use and reconstructs the record from logs already on disk. No API keys. No proxy. No wrapper. Just the ledger you were missing.",
  ],
  uptimeLabel: "TRACKING_SINCE:",
  // TODO(tokeIT): set this to the real first-release date — the counter renders it live.
  trackingSince: "2025-01-15T00:00:00Z",
  stats: [
    { label: "TOOLS_TRACKED", value: "6+" },
    { label: "SETUP_TIME", value: "60s" },
    { label: "SESSIONS_PARSED", value: "1.2M" },
    { label: "DATA_UPLOADED", value: "0B" },
  ],
};

export const protocol = {
  marker: "// SECTION: CAPTURE_PROTOCOL",
  index: "003",
  headline: "Install once. Everything after that is automatic.",
  body: "No timers, no start buttons, no instrumenting your prompts. The agent reads what your AI tools already write to disk.",
  steps: [
    {
      id: "01",
      file: "install.sh",
      title: "Attach the agent",
      body: "Install the desktop app. A background agent discovers every AI coding tool on the machine and begins watching their session logs.",
      points: ["Zero configuration", "No API keys or proxies", "Runs silently, uses no network"],
    },
    {
      id: "02",
      file: "measure.sys",
      title: "Every session gets a record",
      body: "When a session closes, tokeIT reconstructs it: token breakdown, exact cost, wall-clock duration, git output, and a 0-100 efficiency score weighing all of it.",
      points: ["Input / output / cache split", "Cost priced per model", "Commits, diff size, retries"],
    },
    {
      id: "03",
      file: "coach.engine",
      title: "Get told what to fix",
      body: "The dashboard surfaces where spend is wasted, which habits correlate with your best sessions, and what to change on the next one.",
      points: ["Waste detection", "Model-vs-model on your own work", "Specific, dated recommendations"],
    },
  ],
};

export const coaching = {
  marker: "// SECTION: COACHING_ENGINE",
  index: "004",
  headline: { lead: "Coaching, not another", accent: "dashboard" },
  body: "Charts tell you what happened. tokeIT tells you what to do differently. Each finding is derived from your own sessions and carries an estimated cost impact.",
  insights: [
    {
      id: "INS-0431",
      severity: "HIGH",
      title: "Cache hit rate fell to 23%",
      body: "You are resending full context each turn instead of building on prior state. Reuse the window and move fixed instructions out of the loop.",
      impact: "~$41/mo",
    },
    {
      id: "INS-0429",
      severity: "MED",
      title: "4 consecutive sessions produced no commits",
      body: "Work on this feature is running long without a measurable output boundary. Sessions that end in a commit score 31 points higher on average.",
      impact: "~$18/mo",
    },
    {
      id: "INS-0424",
      severity: "HIGH",
      title: "Prompt retry rate at 40%",
      body: "First instructions are under-constrained. Sessions where the opening prompt names the target file retry 62% less often.",
      impact: "~$63/mo",
    },
  ],
};

export const privacy = {
  marker: "// SECTION: PRIVACY_MODEL",
  index: "005",
  headline: { lead: "Local by default.", accent: "Shared only on purpose." },
  body: "The sensitive layer never moves. Sync is a decision you make, not a default you discover.",
  badges: ["LOCAL_FIRST", "OPT_IN_SYNC", "METRICS_ONLY", "NO_TELEMETRY"],
  rows: [
    {
      title: "Prompt content stays on device",
      body: "Raw prompts, completions, and file contents are parsed locally and written to a local store. They are never transmitted, even with sync enabled.",
      meta: "DEVICE_LOCAL",
    },
    {
      title: "Team views expose metrics, not work",
      body: "Members compare tokens, cost, and efficiency. Nobody — including admins — can read another member's session content.",
      meta: "SCOPED_SHARE",
    },
    {
      title: "Sync is collaboration, not surveillance",
      body: "The shared layer exists so teams can find workflows worth copying. It is off until you turn it on, and revocable after.",
      meta: "OPT_IN_ONLY",
    },
  ],
};

export const pricing = {
  marker: "// SECTION: PRICING_TIERS",
  index: "006",
  headline: "Select your tier",
  body: "Every tier tracks unlimited local sessions. You are paying for history depth, coaching, and team visibility — never for capture.",
  liveLabel: "sessions parsed today:",
  tiers: [
    {
      id: "01",
      name: "SOLO",
      price: 0,
      prefix: "$",
      period: "/ forever",
      note: "Full local tracking. 30 days of history. No account required.",
      cta: "Download free",
      href: "mailto:hello@tokeit.dev?subject=Download%20tokeIT",
      featured: false,
      features: [
        { label: "Unlimited session capture", included: true },
        { label: "All supported AI tools", included: true },
        { label: "30-day history", included: true },
        { label: "Cost and token dashboard", included: true },
        { label: "AI coaching engine", included: false },
        { label: "Team analytics", included: false },
      ],
    },
    {
      id: "02",
      name: "PRO",
      price: 12,
      prefix: "$",
      period: "/ month",
      note: "Unlimited history and the full coaching engine on your own data.",
      cta: "Start building",
      href: "mailto:hello@tokeit.dev?subject=Start%20tokeIT%20Pro",
      featured: true,
      badge: "RECOMMENDED",
      features: [
        { label: "Everything in SOLO", included: true },
        { label: "Unlimited history", included: true },
        { label: "AI coaching engine", included: true },
        { label: "Model-vs-model comparison", included: true },
        { label: "Optional encrypted sync", included: true },
        { label: "Team analytics", included: false },
      ],
    },
    {
      id: "03",
      name: "TEAM",
      price: null,
      period: "",
      note: "Org-wide visibility. SSO, roles, and per-project attribution.",
      cta: "Contact sales",
      href: "mailto:hello@tokeit.dev?subject=tokeIT%20for%20teams",
      featured: false,
      features: [
        { label: "Everything in PRO", included: true },
        { label: "Team and project rollups", included: true },
        { label: "Spend attribution by repo", included: true },
        { label: "SSO and role controls", included: true },
        { label: "Self-hosted sync option", included: true },
        { label: "Priority support", included: true },
      ],
    },
  ],
  footnote: "* Metrics-only sharing. Session content is never uploaded on any tier.",
};

export const ecosystem = {
  marker: "// PARTNERS: TOOL_ECOSYSTEM",
  index: "007",
  tools: [
    "CLAUDE CODE",
    "CURSOR",
    "CODEX CLI",
    "COPILOT",
    "GEMINI CLI",
    "WINDSURF",
    "CLINE",
    "AIDER",
    "ZED",
    "CONTINUE",
  ],
  // Indices that receive the glitch treatment. Rarity is what sells it.
  glitchAt: [2, 6],
};

export const footer = {
  wordmark: "tokeIT",
  copyright: "(C) 2026 TOKEIT. ALL RIGHTS RESERVED.",
  links: [
    { href: "#privacy", label: "Privacy" },
    { href: "mailto:hello@tokeit.dev?subject=tokeIT%20enquiry", label: "Contact" },
    { href: "mailto:hello@tokeit.dev?subject=tokeIT%20support", label: "Support" },
    { href: "https://github.com/tokeIT", label: "GitHub" },
  ] satisfies NavLink[],
};

export const headerActions = {
  login: { href: "mailto:hello@tokeit.dev?subject=Log%20in", label: "Log In" },
  cta: { href: "mailto:hello@tokeit.dev?subject=Request%20a%20demo", label: "Request Demo" },
};
