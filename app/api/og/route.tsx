import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    // Get title and subtitle from query params
    const title = searchParams.get("title") || "Calculator Suite"
    const subtitle = searchParams.get("subtitle") || "Free Online Calculators"

    // Font
    const interSemiBold = await fetch(
      new URL(
        "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZFhjA.woff2",
        import.meta.url,
      ),
    ).then((res) => res.arrayBuffer())

    const interRegular = await fetch(
      new URL(
        "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZFhjA.woff2",
        import.meta.url,
      ),
    ).then((res) => res.arrayBuffer())

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8fafc",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #e2e8f0 2%, transparent 0%), radial-gradient(circle at 75px 75px, #e2e8f0 2%, transparent 0%)",
          backgroundSize: "100px 100px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderRadius: "24px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "40px 80px",
            maxWidth: "80%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="4" fill="#4f46e5" />
              <path
                d="M7 12H17M17 12L13 8M17 12L13 16"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                marginLeft: "12px",
                fontSize: "28px",
                fontWeight: "bold",
                background: "linear-gradient(90deg, #4f46e5 0%, #8b5cf6 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Calculator Suite
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1
              style={{
                fontSize: "64px",
                fontWeight: "bold",
                color: "#1e293b",
                lineHeight: 1.2,
                marginBottom: "16px",
                textAlign: "center",
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: "32px",
                color: "#64748b",
                textAlign: "center",
              }}
            >
              {subtitle}
            </p>
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: interSemiBold,
            style: "normal",
            weight: 600,
          },
          {
            name: "Inter",
            data: interRegular,
            style: "normal",
            weight: 400,
          },
        ],
      },
    )
  } catch (e) {
    console.error(e)
    return new Response("Failed to generate OG image", { status: 500 })
  }
}
