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
export default function Image({ params }: { params: { number: string } }) {
  try {
    // Parse the decimal from the URL
    const decimal = decodeURIComponent(params.number).replace(/-as-a-fraction$/, "")
    const decimalValue = Number.parseFloat(decimal)

    // Get the fraction using our custom function
    const fraction = decimalToFraction(decimalValue)
    const numerator = Math.abs(fraction.numerator)
    const denominator = fraction.denominator

    return new ImageResponse(
      <div
        style={{
          background: "linear-gradient(to bottom right, #f0f9ff, #e0f2fe)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui",
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
            padding: "40px 60px",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
            width: "90%",
            maxWidth: "900px",
          }}
        >
          <div
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#0f172a",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            Decimal to Fraction Conversion
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <span style={{ fontSize: "48px", color: "#334155" }}>{decimalValue}</span>
            <span style={{ fontSize: "48px", color: "#475569" }}>=</span>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontSize: "48px", color: "#1e293b", fontWeight: "600" }}>{numerator}</div>
              <div
                style={{
                  width: "100%",
                  height: "4px",
                  backgroundColor: "#cbd5e1",
                  margin: "5px 0",
                }}
              />
              <div style={{ fontSize: "48px", color: "#1e293b", fontWeight: "600" }}>{denominator}</div>
            </div>
          </div>

          <div
            style={{
              fontSize: "18px",
              color: "#475569",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            Learn more at calculatorsuite.com
          </div>
        </div>
      </div>,
      {
        ...size,
      },
    )
  } catch (e) {
    console.error("Error generating decimal-to-fraction OG image:", e)
    return new ImageResponse(
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui",
        }}
      >
        <div style={{ fontSize: "24px", color: "#334155" }}>Decimal to Fraction Conversion</div>
      </div>,
      {
        ...size,
      },
    )
  }
}
