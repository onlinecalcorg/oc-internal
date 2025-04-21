import type { MetadataRoute } from "next"
import { generateDecimalToFractionSitemap } from "./sitemap-utils"
import { headers } from "next/headers"

// Add or update this function to generate more comprehensive sitemap entries
export function generateDecimalToFractionEntries() {
  const entries = []

  // Common fractions
  const commonDecimals = [
    0.125,
    0.25,
    0.375,
    0.5,
    0.625,
    0.75,
    0.875, // eighths
    0.1,
    0.2,
    0.3,
    0.4,
    0.5,
    0.6,
    0.7,
    0.8,
    0.9, // tenths
    0.33,
    0.67, // thirds
    0.25,
    0.5,
    0.75, // quarters
    0.2,
    0.4,
    0.6,
    0.8, // fifths
    0.16,
    0.83, // sixths
    0.143,
    0.286,
    0.429,
    0.571,
    0.714,
    0.857, // sevenths
  ]

  // Add common decimals
  for (const decimal of commonDecimals) {
    entries.push({
      url: `https://calculatorsuite.com/decimal-to-fraction/${decimal}-as-a-fraction`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })
  }

  // Add more decimals with two decimal places
  for (let i = 1; i <= 99; i++) {
    const decimal = i / 100
    if (!commonDecimals.includes(decimal)) {
      entries.push({
        url: `https://calculatorsuite.com/decimal-to-fraction/${decimal.toFixed(2)}-as-a-fraction`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      })
    }
  }

  return entries
}

export default function decimalToFractionSitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://online-calculators.com"
  const lastModified = new Date().toISOString()

  // Extract page number from the URL path
  const headersList = headers()
  const path = headersList.get("x-invoke-path") || ""
  const pageMatch = path.match(/sitemap-([0-9]+)\.xml$/)
  const page = pageMatch ? Number.parseInt(pageMatch[1], 10) : 1

  return generateDecimalToFractionSitemap(baseUrl, lastModified, page)
}
