import type { Metadata } from "next"
import UnitConverterClient from "./UnitConverterClient"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Unit Converter | Convert Measurements Easily | 2025",
  description:
    "Free online unit converter tool. Convert between length, weight, temperature, volume, time, and more. Updated for 2025 with accurate conversion rates.",
  keywords: [
    "unit converter",
    "measurement converter",
    "metric to imperial",
    "kg to lbs",
    "cm to inches",
    "celsius to fahrenheit",
    "online converter",
    "free unit converter",
    "conversion calculator",
    "unit conversion tool 2025",
  ],
  openGraph: {
    title: "Unit Converter | Convert Measurements Easily | 2025",
    description:
      "Free online unit converter tool. Convert between length, weight, temperature, volume, time, and more. Updated for 2025 with accurate conversion rates.",
    url: `${siteConfig.url}/unit-converter`,
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/unit-converter-og.png`,
        width: 1200,
        height: 630,
        alt: "Unit Converter Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unit Converter | Convert Measurements Easily | 2025",
    description:
      "Free online unit converter tool. Convert between length, weight, temperature, volume, time, and more. Updated for 2025 with accurate conversion rates.",
    images: [`${siteConfig.url}/unit-converter-og.png`],
  },
}

export default function UnitConverterPage() {
  return <UnitConverterClient />
}
