import { ImageResponse } from "next/og"
import { siteConfig } from "@/lib/site-config"

export const runtime = "edge"
export const alt = "Unit Converter Tool"
export const size = {
  width: 1200,
  height: 630,
}

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 48,
        background: "linear-gradient(to bottom, #1E40AF, #0EA5E9)",
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
          marginBottom: 24,
        }}
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16" />
          <path d="M3 7h18" />
          <path d="M8 21h8" />
          <path d="M12 7v14" />
          <path d="M7 4v3" />
          <path d="M17 4v3" />
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
        Unit Converter
      </div>
      <div
        style={{
          fontSize: 32,
          opacity: 0.9,
          marginBottom: 32,
          textAlign: "center",
        }}
      >
        Convert between any units easily and accurately
      </div>
      <div
        style={{
          fontSize: 24,
          opacity: 0.7,
          textAlign: "center",
        }}
      >
        {siteConfig.name} • Updated for 2025
      </div>
    </div>,
    {
      ...size,
    },
  )
}
