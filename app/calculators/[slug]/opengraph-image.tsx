import { ImageResponse } from "next/og"
import { getCalculatorBySlug } from "@/lib/site-config"

// Route segment config
export const runtime = "edge"

// Image metadata
export const alt = "Online Calculators"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

// Generate images for all calculator slugs
export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const calculator = getCalculatorBySlug(params.slug)
  return [
    {
      id: "og",
      alt: calculator?.title ? `${calculator.title} Calculator - Updated for 2025` : "Online Calculators",
      contentType: "image/png",
      size: {
        width: 1200,
        height: 630,
      },
    },
  ]
}

// Function to get gradient colors based on category
function getCategoryGradient(category: string): { from: string; to: string } {
  switch (category) {
    case "financial":
      return { from: "#047857", to: "#10B981" } // Green
    case "sustainability":
      return { from: "#0D9488", to: "#2DD4BF" } // Teal
    case "technology":
      return { from: "#4F46E5", to: "#818CF8" } // Indigo
    case "health":
      return { from: "#E11D48", to: "#FB7185" } // Rose
    case "math":
      return { from: "#7C3AED", to: "#A78BFA" } // Violet
    default:
      return { from: "#1E40AF", to: "#3B82F6" } // Blue
  }
}

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
  try {
    const calculator = getCalculatorBySlug(params.slug)

    if (!calculator) {
      return new ImageResponse(
        <div
          style={{
            fontSize: 48,
            background: "linear-gradient(to bottom, #1E40AF, #0369A1)",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          Calculator Not Found
        </div>,
        { ...size },
      )
    }

    const gradient = getCategoryGradient(calculator.category)
    const yearUpdated = calculator.yearUpdated || "2025"

    // Simplified SVG icon approach
    const getIconSvg = (iconName: string) => {
      switch (iconName) {
        case "plane":
          return (
            <svg
              width="70"
              height="70"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
            </svg>
          )
        case "piggy-bank":
          return (
            <svg
              width="70"
              height="70"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z" />
              <path d="M2 9v1c0 1.1.9 2 2 2h1" />
              <path d="M16 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
            </svg>
          )
        case "home":
          return (
            <svg
              width="70"
              height="70"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          )
        default:
          return (
            <svg
              width="70"
              height="70"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="2" />
              <path d="M8 10V16" />
              <path d="M12 8V16" />
              <path d="M16 12V16" />
            </svg>
          )
      }
    }

    return new ImageResponse(
      <div
        style={{
          fontSize: 48,
          background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          padding: "40px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)",
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
          }}
        >
          {yearUpdated} EDITION
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            borderRadius: "24px",
            background: "rgba(255, 255, 255, 0.2)",
            marginBottom: "30px",
          }}
        >
          {getIconSvg(calculator.icon)}
        </div>

        <div
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            marginBottom: "16px",
            textAlign: "center",
            maxWidth: "900px",
          }}
        >
          {calculator.title}
        </div>

        <div
          style={{
            fontSize: "28px",
            opacity: 0.9,
            textAlign: "center",
            maxWidth: "800px",
            marginBottom: "40px",
          }}
        >
          {calculator.description}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "rgba(0, 0, 0, 0.2)",
            borderRadius: "999px",
            padding: "8px 20px",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="2" />
            <path d="M8 10V16" />
            <path d="M12 8V16" />
            <path d="M16 12V16" />
          </svg>
          <span style={{ fontSize: "24px" }}>online-calculators.com</span>
        </div>
      </div>,
      // ImageResponse options
      {
        ...size,
      },
    )
  } catch (e) {
    console.error("Error generating calculator OG image:", e)
    return new Response("Error generating image", { status: 500 })
  }
}
