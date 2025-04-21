import type React from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getCalculatorBySlug, getCalculatorsByCategory, getAllCalculators } from "@/lib/site-config"
import { generateCalculatorSchema, generateBreadcrumbSchema } from "@/lib/schema"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "@/components/lucide-icon"

// Import calculator content components
import { VacationCostContent } from "@/components/calculator-pages/vacation-cost-content"
import { CarbonFootprintContent } from "@/components/calculator-pages/carbon-footprint-content"
import { EVCostContent } from "@/components/calculator-pages/ev-cost-content"
import { RetirementSavingsContent } from "@/components/calculator-pages/retirement-savings-content"
import { MortgageContent } from "@/components/calculator-pages/mortgage-content"
import { SolarPanelContent } from "@/components/calculator-pages/solar-panel-content"
import { FoodWasteContent } from "@/components/calculator-pages/food-waste-content"
import { MentalHealthContent } from "@/components/calculator-pages/mental-health-content"
import { ScientificCalculatorContent } from "@/components/calculator-pages/scientific-calculator-content"
import { PercentageCalculatorContent } from "@/components/calculator-pages/percentage-calculator-content"
import { BMICalculatorContent } from "@/components/calculator-pages/bmi-calculator-content"
import { NutritionCalculatorContent } from "@/components/calculator-pages/nutrition-calculator-content"
import { AIImplementationCalculatorContent } from "@/components/calculator-pages/ai-implementation-calculator-content"
import { FiveGROICalculatorContent } from "@/components/calculator-pages/5g-roi-calculator-content"

interface CalculatorPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: CalculatorPageProps): Promise<Metadata> {
  const calculator = getCalculatorBySlug(params.slug)

  if (!calculator) {
    return {
      title: "Calculator Not Found",
      description: "The requested calculator could not be found.",
    }
  }

  const currentYear = new Date().getFullYear()
  const yearUpdated = calculator.yearUpdated || "2025"

  // Use SEO-optimized title and description if available, otherwise generate them
  const title = calculator.seoTitle || `Free Online ${calculator.title} ${yearUpdated} | Calculator Suite`

  const description =
    calculator.seoDescription ||
    `Use our free online ${calculator.title.toLowerCase()} to ${calculator.description.toLowerCase()}. Updated for ${yearUpdated} with the latest data and formulas.`

  return {
    title: title,
    description: description,
    keywords: calculator.keywords || [
      `${calculator.title.toLowerCase()}`,
      "free calculator",
      "online calculator",
      `${calculator.category} calculator`,
      `${yearUpdated} calculator`,
    ],
    openGraph: {
      title: title,
      description: description,
      type: "website",
      url: `https://online-calculators.com/calculators/${calculator.slug}`,
      images: [
        {
          url: `https://online-calculators.com/calculators/${calculator.slug}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: `${calculator.title} - Free online calculator tool for ${yearUpdated}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [`https://online-calculators.com/calculators/${calculator.slug}/opengraph-image.png`],
    },
    alternates: {
      canonical: `/calculators/${calculator.slug}`,
    },
  }
}

export default function CalculatorPage({ params }: CalculatorPageProps) {
  const calculator = getCalculatorBySlug(params.slug)

  if (!calculator) {
    notFound()
  }

  const yearUpdated = calculator.yearUpdated || "2025"

  // Generate JSON-LD structured data
  const calculatorJsonLd = generateCalculatorSchema({
    title: calculator.seoTitle || `Free Online ${calculator.title} ${yearUpdated}`,
    description: calculator.seoDescription || calculator.description,
    url: `https://online-calculators.com/calculators/${calculator.slug}`,
    ratingValue: 4.9,
    ratingCount: 156,
    reviewCount: 98,
    dateModified: `${yearUpdated}-01-15T08:00:00+00:00`,
  })

  // Generate breadcrumb schema
  const breadcrumbJsonLd = generateBreadcrumbSchema([
    { name: "Home", item: "https://online-calculators.com" },
    { name: "Calculators", item: "https://online-calculators.com/calculators" },
    {
      name: calculator.category.charAt(0).toUpperCase() + calculator.category.slice(1),
      item: `https://online-calculators.com/categories/${calculator.category}`,
    },
    { name: calculator.title, item: `https://online-calculators.com/calculators/${calculator.slug}` },
  ])

  // Map of calculator slugs to their respective content components
  const calculatorComponents: Record<string, React.ReactNode> = {
    "vacation-cost": <VacationCostContent jsonLd={calculatorJsonLd} />,
    "carbon-footprint": <CarbonFootprintContent jsonLd={calculatorJsonLd} />,
    "ev-cost": <EVCostContent jsonLd={calculatorJsonLd} />,
    "retirement-savings": <RetirementSavingsContent jsonLd={calculatorJsonLd} />,
    mortgage: <MortgageContent jsonLd={calculatorJsonLd} />,
    "solar-savings": <SolarPanelContent jsonLd={calculatorJsonLd} />,
    "food-waste": <FoodWasteContent jsonLd={calculatorJsonLd} />,
    "mental-health": <MentalHealthContent jsonLd={calculatorJsonLd} />,
    scientific: <ScientificCalculatorContent jsonLd={calculatorJsonLd} />,
    percentage: <PercentageCalculatorContent jsonLd={calculatorJsonLd} />,
    bmi: <BMICalculatorContent jsonLd={calculatorJsonLd} />,
    nutrition: <NutritionCalculatorContent jsonLd={calculatorJsonLd} />,
    "ai-implementation": <AIImplementationCalculatorContent jsonLd={calculatorJsonLd} />,
    "5g-roi": <FiveGROICalculatorContent jsonLd={calculatorJsonLd} />,
  }

  // Get related calculators (from same category)
  const relatedCalculators = getCalculatorsByCategory(calculator.category)
    .filter((calc) => calc.slug !== calculator.slug)
    .slice(0, 3)

  // Get popular calculators from other categories
  const popularCalculators = getAllCalculators()
    .filter((calc) => calc.category !== calculator.category)
    .slice(0, 3)

  // Potential blog posts related to this calculator
  const relatedBlogPosts = [
    {
      title: `How to Use a ${calculator.title} in ${yearUpdated}`,
      slug: `how-to-use-${calculator.slug}`,
      excerpt: `Learn how to effectively use our ${calculator.title.toLowerCase()} to make better financial decisions in ${yearUpdated}.`,
    },
    {
      title: `${calculator.title} Tips and Tricks for ${yearUpdated}`,
      slug: `${calculator.slug}-tips-tricks-${yearUpdated}`,
      excerpt: `Discover advanced tips and tricks to get the most out of our ${calculator.title.toLowerCase()} with the latest ${yearUpdated} updates.`,
    },
    {
      title: `Understanding ${calculator.title} Results: ${yearUpdated} Guide`,
      slug: `understanding-${calculator.slug}-results-${yearUpdated}`,
      excerpt: `Learn how to interpret and apply the results from our ${calculator.title.toLowerCase()} with this comprehensive ${yearUpdated} guide.`,
    },
  ]

  return (
    <main id="main-content" className="container py-8 md:py-12">
      {/* Add JSON-LD to your page */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Breadcrumb navigation */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Calculators", href: "/calculators" },
          {
            label: calculator.category.charAt(0).toUpperCase() + calculator.category.slice(1),
            href: `/categories/${calculator.category}`,
          },
          { label: calculator.title, href: `/calculators/${calculator.slug}`, current: true },
        ]}
        className="mb-6"
      />

      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-primary/10">
            <LucideIcon name={calculator.icon} className="h-6 w-6 text-primary" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Free Online {calculator.title} {yearUpdated}
          </h1>
        </div>
        <p className="text-xl text-muted-foreground">{calculator.description}</p>
      </div>

      {/* Main calculator content */}
      <div className="grid grid-cols-1">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Calculator</CardTitle>
              <CardDescription>Use this free online tool to {calculator.description.toLowerCase()}</CardDescription>
            </CardHeader>
            <CardContent>
              {calculatorComponents[calculator.slug] || (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                  <p className="text-muted-foreground">
                    This calculator is currently under development and will be available soon.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Related Blog Posts */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedBlogPosts.map((post, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Button variant="link" asChild className="px-0">
                  <Link href={`/blog/${post.slug}`}>Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>About This Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none dark:prose-invert">
              <p>
                Our free online {calculator.title.toLowerCase()} helps you {calculator.description.toLowerCase()}. This
                tool is completely free to use and provides accurate results based on the latest {yearUpdated} data and
                formulas.
              </p>

              <h2>
                Why Use Our {calculator.title} in {yearUpdated}?
              </h2>
              <ul>
                <li>
                  <strong>Updated for {yearUpdated}:</strong> Includes the latest data, rates, and formulas
                </li>
                <li>
                  <strong>Free to Use:</strong> No hidden fees or subscriptions required
                </li>
                <li>
                  <strong>Easy to Use:</strong> Simple interface designed for users of all experience levels
                </li>
                <li>
                  <strong>Accurate Results:</strong> Calculations based on the latest data and formulas
                </li>
                <li>
                  <strong>Privacy-Focused:</strong> We don't store your calculation data
                </li>
                <li>
                  <strong>Mobile-Friendly:</strong> Use on any device, anywhere
                </li>
              </ul>

              <h2>How to Use This Calculator</h2>
              <p>
                Simply enter your information in the fields provided, and the calculator will instantly generate results
                based on your inputs. You can adjust your inputs to see how different scenarios affect the outcome.
              </p>

              <h2>Frequently Asked Questions</h2>
              <p>
                For answers to common questions about this calculator, please refer to our FAQ section above. If you
                have additional questions, feel free to <Link href="/contact">contact us</Link>.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
