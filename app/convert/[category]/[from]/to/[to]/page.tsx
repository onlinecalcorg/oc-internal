import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { unitCategories } from "@/lib/unit-conversion"
import { siteConfig } from "@/lib/site-config"
import SpecificConverterClient from "./SpecificConverterClient"

type Props = {
  params: {
    category: string
    from: string
    to: string
  }
}

export function generateMetadata({ params }: Props): Metadata {
  const { category, from, to } = params

  // Find the category
  const categoryData = unitCategories.find((cat) => cat.id === category)
  if (!categoryData) return notFound()

  // Find the units
  const fromUnit = categoryData.units.find((unit) => unit.id === from)
  const toUnit = categoryData.units.find((unit) => unit.id === to)
  if (!fromUnit || !toUnit) return notFound()

  const title = `${fromUnit.name} to ${toUnit.name} Converter | ${categoryData.name} Conversion | 2025`
  const description = `Convert ${fromUnit.name} (${fromUnit.symbol}) to ${toUnit.name} (${toUnit.symbol}) with our free online ${categoryData.name.toLowerCase()} converter. Fast, accurate, and easy to use. Updated for 2025.`

  return {
    title,
    description,
    keywords: [
      `${fromUnit.name} to ${toUnit.name}`,
      `${fromUnit.symbol} to ${toUnit.symbol}`,
      `convert ${fromUnit.name} to ${toUnit.name}`,
      `${categoryData.name.toLowerCase()} converter`,
      `${categoryData.name.toLowerCase()} conversion calculator`,
      `online ${categoryData.name.toLowerCase()} converter`,
      `${fromUnit.name} ${toUnit.name} conversion`,
      `unit converter 2025`,
    ],
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/convert/${category}/${from}/to/${to}`,
      type: "website",
      images: [
        {
          url: `${siteConfig.url}/api/og?title=${encodeURIComponent(`${fromUnit.name} to ${toUnit.name}`)}&subtitle=${encodeURIComponent(`${categoryData.name} Converter`)}`,
          width: 1200,
          height: 630,
          alt: `${fromUnit.name} to ${toUnit.name} Converter`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        `${siteConfig.url}/api/og?title=${encodeURIComponent(`${fromUnit.name} to ${toUnit.name}`)}&subtitle=${encodeURIComponent(`${categoryData.name} Converter`)}`,
      ],
    },
  }
}

export default function SpecificConverterPage({ params }: Props) {
  const { category, from, to } = params

  // Find the category
  const categoryData = unitCategories.find((cat) => cat.id === category)
  if (!categoryData) return notFound()

  // Find the units
  const fromUnit = categoryData.units.find((unit) => unit.id === from)
  const toUnit = categoryData.units.find((unit) => unit.id === to)
  if (!fromUnit || !toUnit) return notFound()

  return <SpecificConverterClient category={category} fromUnit={from} toUnit={to} />
}
