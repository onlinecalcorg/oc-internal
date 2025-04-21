import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Image metadata
export const alt = "Online Calculators 2025 - Free Tools for Every Calculation Need"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

// Image generation
export default async function Image() {
  try {
    return new ImageResponse(
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 128,
          background: "linear-gradient(135deg, #1E40AF 0%, #3B82F6 50%, #0EA5E9 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          padding: "40px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 40%)",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 30,
            right: 30,
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "12px",
            padding: "8px 16px",
            fontSize: "24px",
            fontWeight: "bold",
            zIndex: 2,
          }}
        >
          2025 EDITION
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
            fontSize: "72px",
            fontWeight: "bold",
            zIndex: 2,
          }}
        >
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect
              x="2"
              y="2"
              width="20"
              height="20"
              rx="2"
              stroke="white"
              strokeWidth="2"
              fill="rgba(255,255,255,0.1)"
            />
            <path d="M8 10V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 8V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 12V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ marginLeft: "20px" }}>Online Calculators</span>
        </div>
        <div
          style={{
            fontSize: "32px",
            maxWidth: "800px",
            textAlign: "center",
            marginTop: "20px",
            zIndex: 2,
          }}
        >
          100+ Free Online Calculators for Every Need
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "12px",
            marginTop: "40px",
            maxWidth: "900px",
            zIndex: 2,
          }}
        >
          {["Finance", "Health", "Math", "Sustainability", "Technology"].map((category) => (
            <div
              key={category}
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                borderRadius: "999px",
                padding: "8px 20px",
                fontSize: "24px",
              }}
            >
              {category}
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            fontSize: "24px",
            opacity: 0.9,
            textAlign: "center",
            zIndex: 2,
          }}
        >
          online-calculators.com
        </div>
      </div>,
      // ImageResponse options
      {
        ...size,
      },
    )
  } catch (e) {
    console.error("Error generating OG image:", e)
    return new Response("Error generating image", { status: 500 })
  }
}
