import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Mixed Numbers Calculator - Add, subtract, multiply, and divide mixed numbers and fractions"
export const contentType = "image/png"
export const size = {
  width: 1200,
  height: 630,
}

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 48,
        background: "linear-gradient(to bottom right, #f0f9ff, #e0f2fe, #bae6fd)",
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
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            background: "#3b82f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 24,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect>
            <line x1="8" y1="2" x2="8" y2="22"></line>
            <line x1="16" y1="2" x2="16" y2="22"></line>
            <line x1="2" y1="8" x2="22" y2="8"></line>
            <line x1="2" y1="16" x2="22" y2="16"></line>
          </svg>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: "bold",
            color: "#1e3a8a",
          }}
        >
          Mixed Numbers Calculator
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 48,
          background: "white",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginRight: 24,
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 8 }}>2 3/4</div>
          <div style={{ fontSize: 24, color: "#6b7280" }}>Mixed Number</div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginLeft: 24,
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 8 }}>11/4</div>
          <div style={{ fontSize: 24, color: "#6b7280" }}>Improper Fraction</div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            background: "#dbeafe",
            padding: 16,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#1e40af",
            fontWeight: "bold",
          }}
        >
          Add
        </div>
        <div
          style={{
            background: "#dbeafe",
            padding: 16,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#1e40af",
            fontWeight: "bold",
          }}
        >
          Subtract
        </div>
        <div
          style={{
            background: "#dbeafe",
            padding: 16,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#1e40af",
            fontWeight: "bold",
          }}
        >
          Multiply
        </div>
        <div
          style={{
            background: "#dbeafe",
            padding: 16,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#1e40af",
            fontWeight: "bold",
          }}
        >
          Divide
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#1e40af",
          fontWeight: "bold",
          fontSize: 24,
        }}
      >
        calculatorsuite.com
      </div>
    </div>,
    {
      ...size,
    },
  )
}
