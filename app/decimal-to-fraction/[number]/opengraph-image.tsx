import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Image metadata
export const alt = "Decimal to Fraction Conversion"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

// Function to find the greatest common divisor (GCD)
function findGCD(a: number, b: number): number {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b) {
    const temp = b
    b = a % b
    a = temp
  }
  return a
}

// Function to convert decimal to fraction
function decimalToFraction(decimal: number): { numerator: number; denominator: number } {
  // Handle whole numbers
  if (Number.isInteger(decimal)) {
    return { numerator: decimal, denominator: 1 }
  }

  // Convert to string to analyze decimal places
  const decimalStr = decimal.toString()
  const decimalParts = decimalStr.split(".")
  const decimalPart = decimalParts[1] || ""
  const integerPart = Number.parseInt(decimalParts[0])

  // Calculate denominator based on decimal places
  const denominator = Math.pow(10, decimalPart.length)
  const numerator = integerPart * denominator + Number.parseInt(decimalPart)

  // Simplify the fraction
  const gcd = findGCD(numerator, denominator)
  return {
    numerator: numerator / gcd,
    denominator: denominator / gcd,
  }
}

// Image generation
export default async function Image({ params }: { params: { number: string } }) {
  try {
    // Parse the decimal from the URL
    const decimalStr = params.number.replace(/-as-a-fraction$/, "")
    const decimal = Number.parseFloat(decimalStr)

    if (isNaN(decimal)) {
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
          Invalid Decimal
        </div>,
        { ...size },
      )
    }

    const { numerator, denominator } = decimalToFraction(decimal)

    return new ImageResponse(
      <div
        style={{
          fontSize: 48,
          background: "linear-gradient(135deg, #4338CA, #6366F1)",
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
            fontSize: "64px",
            fontWeight: "bold",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          {decimal} as a Fraction
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "40px",
            marginTop: "20px",
            marginBottom: "40px",
          }}
        >
          <span style={{ fontSize: "72px" }}>{decimal}</span>
          <span style={{ fontSize: "72px" }}>=</span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "72px",
                textAlign: "center",
                padding: "10px 20px",
              }}
            >
              {numerator}
            </div>
            <div
              style={{
                width: "100%",
                height: "6px",
                backgroundColor: "white",
                margin: "10px 0",
              }}
            />
            <div
              style={{
                fontSize: "72px",
                textAlign: "center",
                padding: "10px 20px",
              }}
            >
              {denominator}
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: "28px",
            maxWidth: "800px",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Step-by-step conversion of decimal to fraction
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            position: "absolute",
            bottom: "30px",
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
    console.error("Error generating decimal-to-fraction OG image:", e)
    return new Response("Error generating image", { status: 500 })
  }
}
