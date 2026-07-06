import { ImageResponse } from "next/og";

export const alt = "nanopower.it — Materiali Edili Nanotecnologici";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 50% 35%, #1A2F4A 0%, #0D1F33 70%)",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 64, fontWeight: 900 }}>
          nanopower<span style={{ color: "#00A896" }}>.</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#94A3B8",
          }}
        >
          Materiali edili ad alte prestazioni
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 30,
            fontWeight: 700,
            color: "#FFD166",
            maxWidth: 900,
            textAlign: "center",
          }}
        >
          IGK2 · SuperFluid · SuperElastiK
        </div>
      </div>
    ),
    { ...size }
  );
}
