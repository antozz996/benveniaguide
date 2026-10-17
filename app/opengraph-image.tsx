import { ImageResponse } from "next/og";

export const alt =
  "Benvenia Guide — la Guest Guide digitale per la tua struttura ricettiva";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

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
          background: "#152f2b",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 28,
              background: "#20443e",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                width: 56,
                height: 52,
                background: "#f8f5ee",
                borderTopLeftRadius: 28,
                borderTopRightRadius: 28,
                display: "flex",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 36,
                width: 24,
                height: 36,
                background: "#20443e",
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                display: "flex",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 8,
                left: 44,
                width: 8,
                height: 8,
                borderRadius: 4,
                background: "#b98563",
                display: "flex",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 44,
              fontWeight: 700,
              color: "#f8f5ee",
              letterSpacing: -1,
            }}
          >
            Benvenia&nbsp;
            <span style={{ color: "#b98563" }}>Guide</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 900,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 600,
              color: "#b98563",
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Guest Guide digitale
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#f8f5ee",
              letterSpacing: -1.5,
            }}
          >
            L&apos;accoglienza migliore continua oltre il check-in.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "rgba(248,245,238,0.65)",
          }}
        >
          <div style={{ display: "flex" }}>
            B&amp;B · Case vacanza · Boutique hotel · Property manager
          </div>
          <div style={{ display: "flex", color: "#f8f5ee" }}>
            www.benveniaguide.it
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
