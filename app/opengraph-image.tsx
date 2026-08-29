import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

export const alt = "tokeIT — track, measure, and improve AI coding performance";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Palette mirrors the light theme in globals.css. Satori cannot read CSS variables.
const BG = "#f1efe9";
const FG = "#0a0a0a";
const MUTED = "#666666";
const SIGNAL = "#ea580c";

const label = {
  fontSize: 20,
  letterSpacing: 4,
  textTransform: "uppercase" as const,
  color: MUTED,
};

async function font(file: string) {
  return readFile(path.join(process.cwd(), "node_modules/@fontsource/jetbrains-mono/files", file));
}

export default async function OpengraphImage() {
  const [regular, bold] = await Promise.all([
    font("jetbrains-mono-latin-400-normal.woff"),
    font("jetbrains-mono-latin-700-normal.woff"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: BG,
          color: FG,
          fontFamily: "JetBrains Mono",
          padding: 48,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            border: `4px solid ${FG}`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: `4px solid ${FG}`,
              padding: "18px 32px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 16, height: 16, background: SIGNAL }} />
              <div style={{ ...label, color: FG, fontWeight: 700 }}>tokeIT</div>
            </div>
            <div style={label}>{"// AI CODING PERFORMANCE"}</div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "center",
              padding: "0 48px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 92,
                fontWeight: 700,
                letterSpacing: -3,
                lineHeight: 1.05,
              }}
            >
              TRACK. MEASURE.
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 92,
                fontWeight: 700,
                letterSpacing: -3,
                lineHeight: 1.05,
                color: SIGNAL,
              }}
            >
              IMPROVE.
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 28,
                fontSize: 24,
                color: MUTED,
                lineHeight: 1.5,
                maxWidth: 860,
              }}
            >
              The local-first measurement layer for AI-assisted engineering. Tokens, cost, commits,
              and an efficiency score for every session.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: `4px solid ${FG}`,
              padding: "18px 32px",
            }}
          >
            <div style={label}>CLAUDE CODE · CURSOR · CODEX · COPILOT · GEMINI</div>
            <div style={{ ...label, color: FG }}>tokeit.dev</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "JetBrains Mono", data: regular, weight: 400, style: "normal" },
        { name: "JetBrains Mono", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
