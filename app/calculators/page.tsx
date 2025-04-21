import type { Metadata } from "next"
import CalculatorsPageClient from "./CalculatorsPageClient"

export const metadata: Metadata = {
  title: "All Calculators | Calculator Suite 2025",
  description:
    "Browse our comprehensive suite of calculators for economic planning, sustainability, technology impact, and health assessment.",
  openGraph: {
    title: "All Calculators | Calculator Suite 2025",
    description:
      "Browse our comprehensive suite of calculators for economic planning, sustainability, technology impact, and health assessment.",
  },
}

export default function CalculatorsPage({ searchParams }: { searchParams: { category?: string } }) {
  return <CalculatorsPageClient searchParams={searchParams} />
}
