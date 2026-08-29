import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";

import { Providers } from "./providers";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const pixelGrid = localFont({
  src: "./fonts/GeistPixel_Grid.woff2",
  display: "swap",
  weight: "500",
  variable: "--font-pixel",
});

const title = "tokeIT // AI Coding Performance Intelligence";
const description =
  "tokeIT is the local-first measurement layer for AI-assisted engineering. Tokens, cost, duration, commits, and an efficiency score for every session across Claude Code, Cursor, Codex, Copilot, and Gemini.";

export const metadata: Metadata = {
  metadataBase: new URL("https://tokeit.dev"),
  title,
  description,
  applicationName: "tokeIT",
  keywords: [
    "AI coding metrics",
    "token tracking",
    "Claude Code analytics",
    "Cursor usage tracking",
    "AI developer productivity",
    "LLM cost tracking",
  ],
  openGraph: {
    title,
    description,
    url: "https://tokeit.dev",
    siteName: "tokeIT",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1efe9" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jetbrainsMono.variable} ${pixelGrid.variable}`}
    >
      <body>
        {/* Scroll entrances ship as inline opacity:0 and are revealed by JS.
            Without JS the page would render blank, so reveal everything up front. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
