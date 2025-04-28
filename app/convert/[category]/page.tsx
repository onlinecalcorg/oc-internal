import type { Metadata } from "next"
import { notFound } from "next/navigation"
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

type Props = {
  params: {
    category: string
  }
}

export function generateMetadata({ params }: Props): Metadata {
  const { category } = params

  // Find the category
  const categoryData = unitCategories.find((cat) => cat.id === category)
  if (!categoryData) return notFound()

  const title = `${categoryData.name} Converter | Convert ${categoryData.name} Units | 2025`
  const description = `Free online ${categoryData.name.toLowerCase()} converter. Convert between different ${categoryData.name.toLowerCase()} units quickly and accurately. Updated for 2025.`

  return {
    title,
    description,
    keywords: [
      `${categoryData.name.toLowerCase()} converter`,
      `${categoryData.name.toLowerCase()} conversion`,
      `${categoryData.name.toLowerCase()} calculator`,
      `convert ${categoryData.name.toLowerCase()} units`,
      `${categoryData.name.toLowerCase()} conversion calculator`,
      `online ${categoryData.name.toLowerCase()} converter`,
      `${categoryData.name.toLowerCase()} unit converter 2025`,
    ],
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/convert/${category}`,
      type: "website",
      images: [
        {
          url: `${siteConfig.url}/api/og?title=${encodeURIComponent(`${categoryData.name} Converter`)}&subtitle=${encodeURIComponent("Unit Conversion Tool")}`,
          width: 1200,
          height: 630,
          alt: `${categoryData.name} Converter`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        `${siteConfig.url}/api/og?title=${encodeURIComponent(`${categoryData.name} Converter`)}&subtitle=${encodeURIComponent("Unit Conversion Tool")}`,
      ],
    },
  }
}

export default function CategoryPage({ params }: Props) {
  const { category } = params

  // Find the category
  const categoryData = unitCategories.find((cat) => cat.id === category)
  if (!categoryData) return notFound()

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
            <BreadcrumbLink href={`/convert/${category}`}>{categoryData.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Title */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-2">{categoryData.name} Converter</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Convert between different {categoryData.name.toLowerCase()} units quickly and accurately.
        </p>
      </div>

      {/* Popular Conversions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Popular {categoryData.name} Conversions</CardTitle>
          <CardDescription>Select a conversion to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categoryData.popularConversions.map(([from, to]) => {
              const fromUnit = categoryData.units.find((unit) => unit.id === from)
              const toUnit = categoryData.units.find((unit) => unit.id === to)

              if (!fromUnit || !toUnit) return null

              return (
                <Link
                  key={`${from}-${to}`}
                  href={`/convert/${category}/${from}/to/${to}`}
                  className="p-4 border rounded-md hover:bg-muted/50 transition-colors"
                >
                  <div className="font-medium">
                    {fromUnit.name} to {toUnit.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {fromUnit.symbol} to {toUnit.symbol}
                  </div>
                </Link>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* All Conversions */}
      <Card>
        <CardHeader>
          <CardTitle>All {categoryData.name} Conversions</CardTitle>
          <CardDescription>Complete list of {categoryData.name.toLowerCase()} conversions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {categoryData.units.map((fromUnit) => (
              <div key={fromUnit.id} className="mb-4">
                <h3 className="font-medium mb-2">
                  {fromUnit.name} ({fromUnit.symbol}) to:
                </h3>
                <ul className="space-y-1">
                  {categoryData.units
                    .filter((toUnit) => toUnit.id !== fromUnit.id)
                    .map((toUnit) => (
                      <li key={toUnit.id}>
                        <Link
                          href={`/convert/${category}/${fromUnit.id}/to/${toUnit.id}`}
                          className="text-primary hover:underline"
                        >
                          {toUnit.name} ({toUnit.symbol})
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
