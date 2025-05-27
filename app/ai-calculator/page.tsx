import { Suspense } from "react"

import AiCalculatorClient from "./AiCalculatorClient"

export default function AiCalculator() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          </div>
        }
      >
        <AiCalculatorClient />
      </Suspense>
    </div>
  )
}
