import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MixedNumbersCalculator } from "@/components/calculators/mixed-numbers-calculator"
import { SimplifyFractionsCalculator } from "@/components/calculators/simplify-fractions-calculator"
import { DecimalToFractionCalculator } from "@/components/calculators/decimal-to-fraction-calculator"
import { FractionToDecimalCalculator } from "@/components/calculators/fraction-to-decimal-calculator"
import { BigNumberFractionsCalculator } from "@/components/calculators/big-number-fractions-calculator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home, Calculator } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Define the calculator metadata
const calculators = [
  {
    slug: "mixed-numbers",
    title: "Mixed Numbers Calculator",
    description: "Convert between mixed numbers and improper fractions with step-by-step explanations.",
    component: MixedNumbersCalculator,
    keywords: ["mixed numbers", "improper fractions", "convert mixed numbers", "fraction conversion"],
    relatedCalculators: ["simplify-fractions", "decimal-to-fraction"],
  },
  {
    slug: "simplify-fractions",
    title: "Simplify Fractions Calculator",
    description: "Reduce fractions to their simplest form using the greatest common divisor (GCD) method.",
    component: SimplifyFractionsCalculator,
    keywords: ["simplify fractions", "reduce fractions", "lowest terms", "GCD", "greatest common divisor"],
    relatedCalculators: ["mixed-numbers", "fraction-to-decimal"],
  },
  {
    slug: "decimal-to-fraction",
    title: "Decimal to Fraction Calculator",
    description: "Convert any decimal number to an equivalent fraction with detailed steps.",
    component: DecimalToFractionCalculator,
    keywords: ["decimal to fraction", "convert decimal", "decimal conversion", "fraction equivalent"],
    relatedCalculators: ["fraction-to-decimal", "simplify-fractions"],
  },
  {
    slug: "fraction-to-decimal",
    title: "Fraction to Decimal Calculator",
    description: "Convert fractions to their decimal equivalents with precision control.",
    component: FractionToDecimalCalculator,
    keywords: ["fraction to decimal", "convert fraction", "decimal equivalent", "fraction conversion"],
    relatedCalculators: ["decimal-to-fraction", "mixed-numbers"],
  },
  {
    slug: "big-number-fractions",
    title: "Big Number Fractions Calculator",
    description: "Work with extremely large numerators and denominators without losing precision.",
    component: BigNumberFractionsCalculator,
    keywords: ["big number fractions", "large fractions", "precise fractions", "fraction arithmetic"],
    relatedCalculators: ["simplify-fractions", "mixed-numbers"],
  },
]

type Props = {
  params: {
    slug: string
  }
}

export function generateMetadata({ params }: Props): Metadata {
  const calculator = calculators.find((calc) => calc.slug === params.slug)

  if (!calculator) {
    return {
      title: "Calculator Not Found",
      description: "The requested calculator could not be found.",
    }
  }

  return {
    title: `${calculator.title} | Online Calculators`,
    description: calculator.description,
    keywords: calculator.keywords,
    openGraph: {
      title: `${calculator.title} | Online Calculators`,
      description: calculator.description,
      url: `https://online-calculators.com/fractions/${params.slug}`,
      type: "website",
    },
    alternates: {
      canonical: `https://online-calculators.com/fractions/${params.slug}`,
    },
  }
}

export function generateStaticParams() {
  return calculators.map((calculator) => ({
    slug: calculator.slug,
  }))
}

export default function CalculatorPage({ params }: Props) {
  const calculator = calculators.find((calc) => calc.slug === params.slug)

  if (!calculator) {
    notFound()
  }

  const CalculatorComponent = calculator.component
  const relatedCalcs = calculator.relatedCalculators
    .map((slug) => calculators.find((calc) => calc.slug === slug))
    .filter(Boolean)

  return (
    <div className="container py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: calculator.title,
            description: calculator.description,
            applicationCategory: "EducationalApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            url: `https://online-calculators.com/fractions/${params.slug}`,
          }),
        }}
      />

      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home className="h-4 w-4 mr-1" />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/fractions">Fractions</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/fractions/${params.slug}`} className="font-medium">
              {calculator.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-2">{calculator.title}</h1>
        <p className="text-muted-foreground mb-8">{calculator.description}</p>

        <div className="bg-card border rounded-lg shadow-sm p-6 mb-8">
          <CalculatorComponent />
        </div>

        <div className="mt-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">How to Use This Calculator</h2>
            <p className="mb-4">
              This calculator is designed to be intuitive and easy to use. Simply enter your values in the input fields
              and click the calculate button to get your result. The calculator will provide step-by-step explanations
              to help you understand the process.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Why This Calculator Matters</h2>
            <p className="mb-4">
              Working with fractions can be challenging, especially when dealing with complex operations or conversions.
              This calculator simplifies the process and helps you understand the underlying mathematical principles.
            </p>
          </section>

          {relatedCalcs.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Related Calculators</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedCalcs.map((calc) => (
                  <Card key={calc?.slug} className="transition-all hover:shadow-md">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Calculator className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{calc?.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">{calc?.description}</p>
                      </div>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/fractions/${calc?.slug}`}>Try</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          <section className="bg-muted p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-3">Learn More About Fractions</h2>
            <p className="mb-4">
              Want to deepen your understanding of fractions? Check out our comprehensive guide on fractions, including
              types, operations, and real-world applications.
            </p>
            <Button asChild>
              <Link href="/fractions">Explore Fractions Guide</Link>
            </Button>
          </section>
        </div>
      </div>
    </div>
  )
}
