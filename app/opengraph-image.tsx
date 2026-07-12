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
          background: "#0d1117",
          color: "#e6edf3",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#4c8dff" }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 6,
              background: "#4c8dff",
            }}
          />
          <div style={{ fontSize: 26, letterSpacing: 2, textTransform: "uppercase" }}>
            Portfolio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
            Vitalii Popov
          </div>
          <div style={{ fontSize: 30, color: "#9aa7b4", maxWidth: 820, lineHeight: 1.4 }}>
            Senior Frontend Engineer — live, inspectable projects: CMS platform, real-time canvas, 3D/BIM.
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {["React", "Next.js", "TypeScript", "Contentful", "three.js"].map((t) => (
            <div
              key={t}
              style={{
                fontSize: 24,
                color: "#4c8dff",
                background: "rgba(76,141,255,0.14)",
                border: "1px solid rgba(76,141,255,0.4)",
                borderRadius: 999,
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
