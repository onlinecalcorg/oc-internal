import type React from "react"
import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: {
    default: "Fractions | Online Calculators",
    template: `%s | Fractions | ${siteConfig.name}`,
  },
  description: "Learn about fractions and use our specialized calculators for various fraction operations.",
}

export default function FractionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="flex min-h-screen flex-col">{children}</div>
}
