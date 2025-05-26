import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "CGPA to Percentage Conversion Result"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

interface Props {
  params: {
    cgpa: string
  }
}

function parseCGPA(cgpaParam: string): number | null {
  const cgpa = Number.parseFloat(cgpaParam)
  if (isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
    return null
  }
  return cgpa
}

function calculatePercentage(cgpa: number): number {
  return Math.round(cgpa * 9.5 * 100) / 100
}

function getGrade(cgpa: number): string {
  if (cgpa >= 9.0) return "A+"
  if (cgpa >= 8.0) return "A"
  if (cgpa >= 7.0) return "B+"
  if (cgpa >= 6.0) return "B"
  if (cgpa >= 5.0) return "C"
  return "D"
}

export default async function Image({ params }: Props) {
  const cgpa = parseCGPA(params.cgpa)

  if (!cgpa) {
    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          fontSize: "32px",
        }}
      >
        Invalid CGPA
      </div>,
      { ...size },
    )
  }

  const percentage = calculatePercentage(cgpa)
  const grade = getGrade(cgpa)

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
            fontSize: "32px",
            color: "#64748B",
            marginBottom: "16px",
          }}
        >
          CGPA to Percentage Conversion
        </div>

        <div
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            color: "#1E40AF",
            marginBottom: "24px",
          }}
        >
          {cgpa} CGPA = {percentage}%
        </div>

        <div
          style={{
            display: "flex",
            gap: "32px",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
              backgroundColor: "#F8FAFC",
              borderRadius: "12px",
              border: "2px solid #E2E8F0",
            }}
          >
            <div style={{ fontSize: "18px", color: "#64748B", marginBottom: "4px" }}>Grade</div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#1E40AF" }}>{grade}</div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
              backgroundColor: "#F0F9FF",
              borderRadius: "12px",
              border: "2px solid #0EA5E9",
            }}
          >
            <div style={{ fontSize: "18px", color: "#64748B", marginBottom: "4px" }}>Performance</div>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#0EA5E9" }}>
              {cgpa >= 8.0 ? "Excellent" : cgpa >= 7.0 ? "Very Good" : cgpa >= 6.0 ? "Good" : "Average"}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <div style={{ color: "#FCD34D", fontSize: "20px" }}>★</div>
            <span style={{ color: "#64748B", fontSize: "16px" }}>4.9/5 Rating</span>
          </div>
          <div style={{ color: "#E5E7EB", fontSize: "16px" }}>•</div>
          <div style={{ color: "#64748B", fontSize: "16px" }}>Instant Results</div>
          <div style={{ color: "#E5E7EB", fontSize: "16px" }}>•</div>
          <div style={{ color: "#64748B", fontSize: "16px" }}>100% Accurate</div>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  )
}
