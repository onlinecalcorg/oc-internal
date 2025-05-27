import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "AI Calculator | Smart Math Assistant"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0f172a",
        backgroundImage:
          "radial-gradient(circle at 25px 25px, #1e293b 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1e293b 2%, transparent 0%)",
        backgroundSize: "100px 100px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "20px",
            backgroundColor: "#3b82f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "20px",
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
            <path d="M18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
          </svg>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            color: "white",
            marginBottom: "20px",
            lineHeight: "1.1",
          }}
        >
          AI Calculator
        </h1>
        <p
          style={{
            fontSize: "28px",
            color: "#94a3b8",
            marginBottom: "40px",
            maxWidth: "800px",
          }}
        >
          Smart Math Assistant with ChatGPT-like Interface
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "30px",
            fontSize: "20px",
            color: "#64748b",
          }}
        >
          <span>✨ AI-Powered</span>
          <span>📊 Step-by-Step Solutions</span>
          <span>🧮 All Math Topics</span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "40px",
          right: "40px",
          fontSize: "18px",
          color: "#64748b",
        }}
      >
        online-calculators.com
      </div>
    </div>,
    {
      ...size,
    },
  )
}
