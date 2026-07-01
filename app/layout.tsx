import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tokeit.dev"),
  title: "tokeIT | AI Coding Performance Intelligence",
  description:
    "tokeIT is a local-first AI coding performance tracker that connects tokens, time, cost, and commits so developers and teams can build faster with less waste.",
  openGraph: {
    title: "tokeIT | AI Coding Performance Intelligence",
    description:
      "Track AI coding cost, output, and efficiency across Claude, Codex, Cursor, Gemini, and more.",
    url: "https://tokeit.dev",
    siteName: "tokeIT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "tokeIT | AI Coding Performance Intelligence",
    description:
      "Measure tokens, time, commits, and efficiency in one local-first product.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
