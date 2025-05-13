import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { unitCategories } from "@/lib/unit-conversion"
import { siteConfig } from "@/lib/site-config"
import { generateConverterSchema } from "@/lib/converter-schema"
import { getFAQs } from "@/lib/converter-faqs"
import { ConversionCalculator } from "@/components/converters/conversion-calculator"
import { ConversionFormula } from "@/components/converters/conversion-formula"
import { ConversionExamples } from "@/components/converters/conversion-examples"
import { RealWorldExamples } from "@/components/converters/real-world-examples"
import { ConversionFAQs } from "@/components/converters/conversion-faqs"
import { ConversionChart } from "@/components/converters/conversion-chart"
import { RelatedConversions } from "@/components/converters/related-conversions"
import { HowToConvert } from "@/components/converters/how-to-convert"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { UnitCategory } from "@/types/unit-converter"
// Add the import for ThemeSelector
import { ThemeSelector } from "@/components/converters/theme-selector"

type Props = {
  params: {
    category: string
    from: string
    to: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
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

export default function SpecificConverterPage({ params, searchParams }: Props) {
  const { category, from, to } = params
  const initialValue = searchParams.value ? String(searchParams.value) : "1"

  // Find the category
  const categoryData = unitCategories.find((cat) => cat.id === category)
  if (!categoryData) return notFound()

  // Find the units
  const fromUnit = categoryData.units.find((unit) => unit.id === from)
  const toUnit = categoryData.units.find((unit) => unit.id === to)
  if (!fromUnit || !toUnit) return notFound()

  // Get FAQs for schema
  const faqs = getFAQs(category as UnitCategory, fromUnit, toUnit)

  // Generate schema
  const { calculatorSchema, faqSchema, howToSchema, breadcrumbSchema } = generateConverterSchema({
    category: category as UnitCategory,
    fromUnit,
    toUnit,
    url: `${siteConfig.url}/convert/${category}/${from}/to/${to}`,
    faqs,
  })

  return (
    <>
      {/* Add JSON-LD to your page */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

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
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/convert/${category}/${from}/to/${to}`}>
                {fromUnit.name} to {toUnit.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Title */}
        <div className="mb-8 text-center">
          <div className="flex justify-end mb-2">
            <ThemeSelector />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            {fromUnit.name} to {toUnit.name} Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert between {fromUnit.name} ({fromUnit.symbol}) and {toUnit.name} ({toUnit.symbol}) quickly and easily.
            Updated for 2025.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Calculator */}
          <div className="lg:col-span-2 space-y-6">
            {/* Calculator Card */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-0">
                <CardTitle className="flex flex-wrap items-center gap-1 sm:gap-2">
                  <span>{fromUnit.name}</span>
                  <span className="text-muted-foreground">to</span>
                  <span>{toUnit.name}</span>
                  <span className="text-muted-foreground">Converter</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ConversionCalculator
                  category={category as UnitCategory}
                  fromUnit={fromUnit}
                  toUnit={toUnit}
                  initialValue={initialValue}
                />
              </CardContent>
            </Card>

            {/* How to Convert */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-0">
                <CardTitle>How to Convert</CardTitle>
              </CardHeader>
              <CardContent>
                <HowToConvert category={category as UnitCategory} fromUnit={fromUnit} toUnit={toUnit} />
              </CardContent>
            </Card>

            {/* Conversion Chart */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-0">
                <CardTitle>Conversion Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <ConversionChart category={category as UnitCategory} fromUnit={fromUnit} toUnit={toUnit} />
              </CardContent>
            </Card>

            {/* Common Conversions */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-0">
                <CardTitle>Common Conversions</CardTitle>
              </CardHeader>
              <CardContent>
                <ConversionExamples category={category as UnitCategory} fromUnit={fromUnit} toUnit={toUnit} />
              </CardContent>
            </Card>

            {/* Real World Examples */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-0">
                <CardTitle>Real-World Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <RealWorldExamples category={category as UnitCategory} fromUnit={fromUnit} toUnit={toUnit} />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Conversion Formula */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-0">
                <CardTitle>Conversion Formula</CardTitle>
              </CardHeader>
              <CardContent>
                <ConversionFormula category={category as UnitCategory} fromUnit={fromUnit} toUnit={toUnit} />
              </CardContent>
            </Card>

            {/* FAQs */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-0">
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <ConversionFAQs category={category as UnitCategory} fromUnit={fromUnit} toUnit={toUnit} />
              </CardContent>
            </Card>

            {/* Related Conversions */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-0">
                <CardTitle>Related Conversions</CardTitle>
              </CardHeader>
              <CardContent>
                <RelatedConversions category={category as UnitCategory} fromUnit={fromUnit} toUnit={toUnit} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
