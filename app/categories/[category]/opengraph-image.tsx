import { ImageResponse } from "next/og"
import { calculatorCategories } from "@/lib/site-config"

// Route segment config
export const runtime = "edge"

// Image metadata
export const alt = "Online Calculators 2025 - Category"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

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

// Simplified SVG icon approach
const getIconSvg = (iconName: string) => {
  switch (iconName) {
    case "dollar-sign":
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
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      )
    case "leaf":
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
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
        </svg>
      )
    case "cpu":
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
          <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
          <rect x="9" y="9" width="6" height="6"></rect>
          <line x1="9" y1="1" x2="9" y2="4"></line>
          <line x1="15" y1="1" x2="15" y2="4"></line>
          <line x1="9" y1="20" x2="9" y2="23"></line>
          <line x1="15" y1="20" x2="15" y2="23"></line>
          <line x1="20" y1="9" x2="23" y2="9"></line>
          <line x1="20" y1="14" x2="23" y2="14"></line>
          <line x1="1" y1="9" x2="4" y2="9"></line>
          <line x1="1" y1="14" x2="4" y2="14"></line>
        </svg>
      )
    case "heart":
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
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
        </svg>
      )
    case "calculator":
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

// Generate images for all calculator categories
export function generateImageMetadata({ params }: { params: { category: string } }) {
  const category = calculatorCategories.find((cat) => cat.slug === params.category)
  return [
    {
      id: "og",
      alt: category?.title ? `${category.title} - Online Calculators 2025` : "Online Calculators 2025 - Category",
      contentType: "image/png",
      size: {
        width: 1200,
        height: 630,
      },
    },
  ]
}

// Image generation
export default async function Image({ params }: { params: { category: string } }) {
  try {
    const category = calculatorCategories.find((cat) => cat.slug === params.category)

    if (!category) {
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
          Category Not Found
        </div>,
        { ...size },
      )
    }

    const gradient = getCategoryGradient(category.slug)
    const calculatorCount = category.calculators.length

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
          2025 EDITION
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
          {getIconSvg(category.icon)}
        </div>

        <div
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          {category.title}
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
          {category.description}
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
          <span style={{ fontSize: "24px" }}>{calculatorCount} Free Calculators</span>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "30px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
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
    console.error("Error generating category OG image:", e)
    return new Response("Error generating image", { status: 500 })
  }
}
