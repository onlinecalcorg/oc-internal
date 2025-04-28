import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { unitCategories } from "@/lib/unit-conversion"
import { siteConfig } from "@/lib/site-config"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Ruler, Weight, Thermometer, FlaskRoundIcon as Flask, Square, Gauge, Clock, HardDrive, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "Unit Converters | All Measurement Conversion Tools | 2025",
  description:
    "Free online unit converters for all measurement types. Convert between length, weight, temperature, volume, and more. Updated for 2025 with accurate conversion rates.",
  keywords: [
    "unit converters",
    "measurement converters",
    "online converters",
    "free conversion tools",
    "length converter",
    "weight converter",
    "temperature converter",
    "volume converter",
    "area converter",
    "speed converter",
    "unit conversion tools 2025",
  ],
  openGraph: {
    title: "Unit Converters | All Measurement Conversion Tools | 2025",
    description:
      "Free online unit converters for all measurement types. Convert between length, weight, temperature, volume, and more. Updated for 2025 with accurate conversion rates.",
    url: `${siteConfig.url}/convert`,
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/api/og?title=${encodeURIComponent("Unit Converters")}&subtitle=${encodeURIComponent("All Measurement Conversion Tools")}`,
        width: 1200,
        height: 630,
        alt: "Unit Converters",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unit Converters | All Measurement Conversion Tools | 2025",
    description:
      "Free online unit converters for all measurement types. Convert between length, weight, temperature, volume, and more. Updated for 2025 with accurate conversion rates.",
    images: [
      `${siteConfig.url}/api/og?title=${encodeURIComponent("Unit Converters")}&subtitle=${encodeURIComponent("All Measurement Conversion Tools")}`,
    ],
  },
}

export default function ConvertIndexPage() {
  // Get the icon component for a category
  const getCategoryIcon = (categoryId: string) => {
    const icons: Record<string, React.ReactNode> = {
      length: <Ruler className="h-5 w-5" />,
      weight: <Weight className="h-5 w-5" />,
      temperature: <Thermometer className="h-5 w-5" />,
      volume: <Flask className="h-5 w-5" />,
      area: <Square className="h-5 w-5" />,
      speed: <Gauge className="h-5 w-5" />,
      time: <Clock className="h-5 w-5" />,
      digital: <HardDrive className="h-5 w-5" />,
      pressure: <Gauge className="h-5 w-5" />,
      energy: <Zap className="h-5 w-5" />,
    }
    return icons[categoryId] || <Ruler className="h-5 w-5" />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/unit-converter">Unit Converter</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/convert">All Converters</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Title */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Unit Converters</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Browse all our measurement conversion tools. Select a category to find the specific converter you need.
        </p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {unitCategories.map((category) => (
          <Link key={category.id} href={`/convert/${category.id}`} className="block group">
            <Card className="h-full transition-all group-hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getCategoryIcon(category.id)}
                  {category.name} Converter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Convert between different {category.name.toLowerCase()} units
                </p>
                <div className="flex flex-wrap gap-1">
                  {category.units.slice(0, 3).map((unit) => (
                    <span key={unit.id} className="text-xs bg-muted px-2 py-1 rounded-full">
                      {unit.symbol}
                    </span>
                  ))}
                  {category.units.length > 3 && (
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">+{category.units.length - 3} more</span>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Popular Conversions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Popular Conversions</CardTitle>
          <CardDescription>Most frequently used unit conversions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {unitCategories.flatMap((category) =>
              category.popularConversions.slice(0, 2).map(([from, to]) => {
                const fromUnit = category.units.find((unit) => unit.id === from)
                const toUnit = category.units.find((unit) => unit.id === to)

                if (!fromUnit || !toUnit) return null

                return (
                  <Link
                    key={`${category.id}-${from}-${to}`}
                    href={`/convert/${category.id}/${from}/to/${to}`}
                    className="p-4 border rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 font-medium">
                      {getCategoryIcon(category.id)}
                      <span>
                        {fromUnit.name} to {toUnit.name}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {fromUnit.symbol} to {toUnit.symbol}
                    </div>
                  </Link>
                )
              }),
            )}
          </div>
        </CardContent>
      </Card>

      {/* SEO Content */}
      <Card>
        <CardHeader>
          <CardTitle>About Our Unit Converters</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <p>
            Our unit converters provide quick, accurate, and easy-to-use tools for converting between different units of
            measurement. Whether you need to convert length, weight, temperature, volume, area, speed, time, digital
            storage, pressure, or energy, we have dedicated converters for all your needs.
          </p>

          <h3>Why Use Our Unit Converters?</h3>
          <ul>
            <li>
              <strong>Accuracy:</strong> All conversions use precise conversion factors for accurate results
            </li>
            <li>
              <strong>Ease of Use:</strong> Simple, intuitive interface makes converting units quick and hassle-free
            </li>
            <li>
              <strong>Comprehensive:</strong> Support for a wide range of units across multiple measurement categories
            </li>
            <li>
              <strong>Educational:</strong> Learn about conversion formulas and relationships between different units
            </li>
            <li>
              <strong>Up-to-date:</strong> All conversion factors are regularly updated to ensure accuracy
            </li>
          </ul>

          <h3>Common Unit Conversions</h3>
          <p>Some of the most commonly used unit conversions include:</p>

          <ul>
            <li>Meters to Feet - Converting between metric and imperial length units</li>
            <li>Kilograms to Pounds - Essential for weight conversion between systems</li>
            <li>Celsius to Fahrenheit - Temperature conversion for weather and cooking</li>
            <li>Liters to Gallons - Volume conversion for cooking and fuel</li>
            <li>Square Meters to Square Feet - Area conversion for real estate and construction</li>
            <li>Kilometers per Hour to Miles per Hour - Speed conversion for travel</li>
          </ul>

          <p>
            Our unit converter tools are designed to be accessible on all devices, making it easy to perform conversions
            whether you're at home, at work, or on the go. Bookmark your most frequently used converters for quick
            access whenever you need them.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
