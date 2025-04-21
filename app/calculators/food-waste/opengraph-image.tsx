import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Food Waste Reduction Calculator"
export const contentType = "image/png"
export const size = {
  width: 1200,
  height: 630,
}

export default async function OG() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        backgroundImage: "linear-gradient(to right, #f59e0b, #d97706)",
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
          margin: "40px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
          width: "90%",
          height: "80%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6.13 1L6 16a2 2 0 0 0 2 2h15" />
            <path d="M1 6.13L16 6a2 2 0 0 1 2 2v15" />
          </svg>
          <div
            style={{
              marginLeft: "16px",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#f59e0b",
            }}
          >
            Calculator Suite
          </div>
        </div>
        <div
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            color: "#1f2937",
            textAlign: "center",
            marginBottom: "20px",
            lineHeight: 1.2,
          }}
        >
          Food Waste Reduction Calculator
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "#4b5563",
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          Calculate the environmental and financial impact of your food waste and discover strategies to reduce it
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "40px",
            backgroundColor: "#fffbeb",
            borderRadius: "12px",
            padding: "16px 24px",
            border: "1px solid #fef3c7",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", marginRight: "24px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: "8px" }}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" />
            </svg>
            <span style={{ color: "#92400e", fontSize: "20px" }}>Save Money</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginRight: "24px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: "8px" }}
            >
              <path d="M12 3v19" />
              <path d="M5 8c2 0 3-1 5-1s3 1 5 1 3-1 5-1" />
              <path d="M5 19c2 0 3-1 5-1s3 1 5 1 3-1 5-1" />
            </svg>
            <span style={{ color: "#92400e", fontSize: "20px" }}>Reduce Waste</span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: "8px" }}
            >
              <path d="M2 22c1.25-1.67 2.04-3.92 2.5-6.5" />
              <path d="M4.5 15.5c1.58.94 4.5 2.5 7.5.5" />
              <path d="M12 13c3.59 0 5.5 1.5 5.5 1.5" />
              <path d="M15 13v-3" />
              <path d="M18 3c-.5 3-1 5.5-3 7" />
              <path d="M18 3c-2 0-4.5 1-6.5 3.5C9.5 9 9 11 9 13" />
            </svg>
            <span style={{ color: "#92400e", fontSize: "20px" }}>Help the Planet</span>
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  )
}
