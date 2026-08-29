import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const bold = await readFile(
    path.join(
      process.cwd(),
      "node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff",
    ),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#ea580c",
          fontFamily: "JetBrains Mono",
          fontSize: 24,
          fontWeight: 700,
        }}
      >
        t
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "JetBrains Mono", data: bold, weight: 700, style: "normal" }],
    },
  );
}
