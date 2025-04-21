import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Carbon Footprint Calculator - Measure and reduce your environmental impact"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 48,
        background: "linear-gradient(to bottom right, #065f46, #064e3b)",
        color: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 48,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.2)",
          marginBottom: 24,
        }}
      >
        {/* Simple leaf icon */}
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      </div>
      <div
        style={{
          fontSize: 64,
          fontWeight: "bold",
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        Carbon Footprint Calculator
      </div>
      <div
        style={{
          fontSize: 32,
          opacity: 0.8,
          marginBottom: 32,
          textAlign: "center",
        }}
      >
        Measure and reduce your environmental impact
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        {["Transportation", "Home Energy", "Diet", "Consumption"].map((category, i) => (
          <div
            key={i}
            style={{
              padding: "8px 16px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: 9999,
              fontSize: 24,
            }}
          >
            {category}
          </div>
        ))}
      </div>
    </div>,
    {
      ...size,
    },
  )
}
