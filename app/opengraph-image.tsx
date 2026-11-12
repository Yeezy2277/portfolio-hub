import { ImageResponse } from "next/og";

export const alt = "Portfolio — projects";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated at build/ISR time — the social card for the hub's home page.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c0c0e",
          color: "#ecebe6",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#ff5b2e" }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 0,
              background: "#ff5b2e",
            }}
          />
          <div style={{ fontSize: 26, letterSpacing: 2, textTransform: "uppercase" }}>
            vitaliipopov.dev
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 0.95, letterSpacing: -4 }}>
            Vitalii Popov
          </div>
          <div style={{ fontSize: 30, color: "#a09f98", maxWidth: 820, lineHeight: 1.4 }}>
            Senior Frontend Engineer. Live public rebuilds of NDA work: Contentful apps, feeds, back office, real-time, 3D.
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {["React", "Next.js", "TypeScript", "Contentful", "three.js"].map((t) => (
            <div
              key={t}
              style={{
                fontSize: 24,
                color: "#ff5b2e",
                background: "transparent",
                border: "1px solid #3a3a40",
                borderRadius: 0,
                padding: "6px 22px",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
