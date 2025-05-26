import type { Metadata } from "next"
import Link from "next/link"
import { Calculator, TrendingUp, BookOpen, Award, Users, Star, ArrowRight, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

function generateCalculatorSchema(data: {
  title: string
  description: string
  url: string
  ratingValue: number
  ratingCount: number
  reviewCount: number
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: data.title,
    description: data.description,
    url: data.url,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: data.ratingValue,
      ratingCount: data.ratingCount,
      reviewCount: data.reviewCount,
      bestRating: "5",
      worstRating: "1",
    },
  }
}

function generateBreadcrumbSchema(items: Array<{ name: string; item: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  }
}

function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export const metadata: Metadata = {
  title: "CGPA to Percentage Calculator | Convert CGPA to Percentage Online",
  description:
    "Convert CGPA to percentage instantly with our free online calculator. Get accurate results for 10-point, 4-point CGPA scales. Used by 500K+ students worldwide.",
  keywords: [
    "cgpa to percentage",
    "cgpa calculator",
    "convert cgpa to percentage",
    "cgpa to percentage formula",
    "grade point average calculator",
    "academic grade converter",
    "university grade calculator",
    "college cgpa converter",
  ],
  openGraph: {
    title: "CGPA to Percentage Calculator - Free Online Converter",
    description:
      "Convert CGPA to percentage instantly. Accurate results for all CGPA scales. Trusted by students worldwide.",
    type: "website",
    url: "https://calculatorsuite.com/cgpa-to-percentage",
  },
  twitter: {
    card: "summary_large_image",
    title: "CGPA to Percentage Calculator",
    description: "Convert CGPA to percentage instantly with our free calculator",
  },
  alternates: {
    canonical: "https://calculatorsuite.com/cgpa-to-percentage",
  },
}

const popularCGPAs = [
  { cgpa: 9.5, percentage: 90.25, grade: "A+" },
  { cgpa: 9.0, percentage: 85.5, grade: "A+" },
  { cgpa: 8.5, percentage: 80.75, grade: "A" },
  { cgpa: 8.0, percentage: 76.0, grade: "A" },
  { cgpa: 7.5, percentage: 71.25, grade: "B+" },
  { cgpa: 7.0, percentage: 66.5, grade: "B+" },
  { cgpa: 6.5, percentage: 61.75, grade: "B" },
  { cgpa: 6.0, percentage: 57.0, grade: "B" },
]

const faqs = [
  {
    question: "How do you convert CGPA to percentage?",
    answer:
      "To convert CGPA to percentage, multiply your CGPA by 9.5. For example, if your CGPA is 8.0, your percentage would be 8.0 × 9.5 = 76%. This is the most commonly used formula in Indian universities.",
  },
  {
    question: "What is the formula for CGPA to percentage conversion?",
    answer:
      "The standard formula is: Percentage = CGPA × 9.5. However, some universities use different conversion factors like 10 or 9. Always check with your institution for their specific conversion method.",
  },
  {
    question: "Is CGPA to percentage conversion accurate?",
    answer:
      "The conversion provides a close approximation. Different universities may have slightly different conversion methods, so the result should be used as a reference. For official purposes, always consult your institution.",
  },
  {
    question: "What is a good CGPA score?",
    answer:
      "A CGPA of 8.0 and above is considered excellent, 7.0-7.9 is good, 6.0-6.9 is average, and below 6.0 may need improvement. However, standards vary by institution and field of study.",
  },
  {
    question: "Can I convert 4-point CGPA to percentage?",
    answer:
      "Yes, for 4-point scale CGPA, multiply by 25 to get the percentage. For example, a 3.5 CGPA on a 4-point scale equals 87.5%. Our calculator supports both 10-point and 4-point scales.",
  },
]

const calculatorSchema = generateCalculatorSchema({
  title: "CGPA to Percentage Calculator",
  description: "Convert CGPA to percentage instantly with accurate results for all CGPA scales",
  url: "https://calculatorsuite.com/cgpa-to-percentage",
  ratingValue: 4.9,
  ratingCount: 2847,
  reviewCount: 1923,
})

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", item: "https://calculatorsuite.com" },
  { name: "Calculators", item: "https://calculatorsuite.com/calculators" },
  { name: "CGPA to Percentage", item: "https://calculatorsuite.com/cgpa-to-percentage" },
])

const faqSchema = generateFAQSchema(faqs)

export default function CGPAToPercentagePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-trust-primary/5 via-background to-trust-accent/5 py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl text-center">
              <Badge className="mb-4 bg-trust-primary/10 text-trust-primary">
                <Calculator className="mr-1 h-3 w-3" />
                Academic Calculator
              </Badge>
              <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                CGPA to Percentage Calculator
              </h1>
              <p className="mb-6 text-lg text-muted-foreground md:text-xl">
                Convert your CGPA to percentage instantly with our accurate calculator. Trusted by over 500,000 students
                worldwide for academic grade conversion.
              </p>

              {/* Trust Indicators */}
              <div className="mb-8 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">4.9/5</span>
                  <span>(2,847 reviews)</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-trust-primary" />
                  <span>500K+ students</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4 text-trust-primary" />
                  <span>100% Free</span>
                </div>
              </div>

              {/* Quick Calculator */}
              <Card className="mx-auto max-w-md">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">Quick CGPA Converter</CardTitle>
                  <CardDescription>Enter your CGPA to get instant percentage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="cgpa-input" className="text-sm font-medium">
                      Enter CGPA (0.0 - 10.0)
                    </label>
                    <input
                      id="cgpa-input"
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      placeholder="e.g., 7.38"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-center text-lg font-medium ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                  <Button className="w-full" size="lg">
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate Percentage
                  </Button>
                  <div className="rounded-lg bg-muted p-4 text-center">
                    <div className="text-sm text-muted-foreground">Percentage Result</div>
                    <div className="text-2xl font-bold text-trust-primary">---%</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Popular CGPA Conversions */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-2xl font-bold md:text-3xl">Popular CGPA to Percentage Conversions</h2>
              <p className="text-muted-foreground">Quick reference for commonly searched CGPA values</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {popularCGPAs.map((item) => (
                <Link key={item.cgpa} href={`/cgpa-to-percentage/${item.cgpa}`} className="group">
                  <Card className="h-full transition-all hover:border-trust-primary/50 hover:shadow-md">
                    <CardContent className="p-4 text-center">
                      <div className="mb-2 text-2xl font-bold text-trust-primary">{item.cgpa} CGPA</div>
                      <div className="mb-2 text-lg font-semibold">{item.percentage}%</div>
                      <Badge variant="outline" className="text-xs">
                        Grade {item.grade}
                      </Badge>
                      <div className="mt-3 flex items-center justify-center text-sm text-muted-foreground group-hover:text-trust-primary">
                        View Details
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link href="/cgpa-to-percentage/all-conversions">
                <Button variant="outline" size="lg">
                  View All CGPA Conversions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-muted/30 py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <div className="mb-8 text-center">
                <h2 className="mb-4 text-2xl font-bold md:text-3xl">How CGPA to Percentage Conversion Works</h2>
                <p className="text-muted-foreground">
                  Understanding the conversion process and different grading systems
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-trust-primary" />
                      Standard Formula (10-point scale)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg bg-trust-primary/5 p-4">
                      <div className="text-center text-lg font-mono font-semibold">Percentage = CGPA × 9.5</div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This is the most widely used formula in Indian universities and colleges. It provides a close
                      approximation of your percentage based on your CGPA.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-trust-primary" />
                      4-Point Scale Conversion
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg bg-trust-primary/5 p-4">
                      <div className="text-center text-lg font-mono font-semibold">Percentage = CGPA × 25</div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      For universities using a 4-point CGPA scale, multiply by 25 to get the percentage. This is common
                      in many international institutions.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>CGPA Grading Scale Reference</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="py-2 text-left">CGPA Range</th>
                            <th className="py-2 text-left">Percentage</th>
                            <th className="py-2 text-left">Grade</th>
                            <th className="py-2 text-left">Performance</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr>
                            <td className="py-2 font-medium">9.0 - 10.0</td>
                            <td className="py-2">85.5% - 95%</td>
                            <td className="py-2">A+</td>
                            <td className="py-2 text-green-600">Outstanding</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-medium">8.0 - 8.9</td>
                            <td className="py-2">76% - 84.5%</td>
                            <td className="py-2">A</td>
                            <td className="py-2 text-green-600">Excellent</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-medium">7.0 - 7.9</td>
                            <td className="py-2">66.5% - 75%</td>
                            <td className="py-2">B+</td>
                            <td className="py-2 text-blue-600">Very Good</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-medium">6.0 - 6.9</td>
                            <td className="py-2">57% - 65.5%</td>
                            <td className="py-2">B</td>
                            <td className="py-2 text-yellow-600">Good</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <div className="mb-8 text-center">
                <h2 className="mb-4 text-2xl font-bold md:text-3xl">Frequently Asked Questions</h2>
                <p className="text-muted-foreground">Common questions about CGPA to percentage conversion</p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-trust-primary text-white py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-4 text-2xl font-bold md:text-3xl">Need More Academic Calculators?</h2>
              <p className="mb-6 text-trust-primary-foreground/90 md:text-lg">
                Explore our comprehensive suite of educational tools and calculators
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/calculators?category=education">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Education Calculators
                  </Button>
                </Link>
                <Link href="/gpa-calculator">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-white text-white hover:bg-white/10 sm:w-auto"
                  >
                    GPA Calculator
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
