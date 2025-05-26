import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "CGPA to Percentage Calculator"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        backgroundImage: "linear-gradient(135deg, #1E40AF 0%, #3B82F6 50%, #0EA5E9 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "24px",
          padding: "60px",
          margin: "40px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              backgroundColor: "#1E40AF",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "16px",
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
              <path d="m9 22 5-8 5 8" />
              <path d="m15 14-5-8-5 8" />
            </svg>
          </div>
          <div
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "#1E40AF",
            }}
          >
            CGPA to Percentage
          </div>
        </div>

        <div
          style={{
            fontSize: "24px",
            color: "#64748B",
            textAlign: "center",
            marginBottom: "32px",
            maxWidth: "600px",
          }}
        >
          Convert CGPA to percentage instantly with our free calculator
        </div>

        <div
          style={{
            display: "flex",
            gap: "32px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "24px",
              backgroundColor: "#F8FAFC",
              borderRadius: "16px",
              border: "2px solid #E2E8F0",
            }}
          >
            <div style={{ fontSize: "20px", color: "#64748B", marginBottom: "8px" }}>CGPA</div>
            <div style={{ fontSize: "36px", fontWeight: "bold", color: "#1E40AF" }}>7.38</div>
          </div>

          <div style={{ fontSize: "32px", color: "#64748B" }}>=</div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "24px",
              backgroundColor: "#F0F9FF",
              borderRadius: "16px",
              border: "2px solid #0EA5E9",
            }}
          >
            <div style={{ fontSize: "20px", color: "#64748B", marginBottom: "8px" }}>Percentage</div>
            <div style={{ fontSize: "36px", fontWeight: "bold", color: "#0EA5E9" }}>70.11%</div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "32px",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <div style={{ color: "#FCD34D", fontSize: "20px" }}>★</div>
            <span style={{ color: "#64748B", fontSize: "16px" }}>4.9/5 Rating</span>
          </div>
          <div style={{ color: "#E5E7EB", fontSize: "16px" }}>•</div>
          <div style={{ color: "#64748B", fontSize: "16px" }}>500K+ Students</div>
          <div style={{ color: "#E5E7EB", fontSize: "16px" }}>•</div>
          <div style={{ color: "#64748B", fontSize: "16px" }}>100% Free</div>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  )
}
