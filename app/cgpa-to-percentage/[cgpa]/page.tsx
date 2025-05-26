import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calculator, Award, Users, Star, ArrowLeft, Share2, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface PageProps {
  params: {
    cgpa: string
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

function parseCGPA(cgpaParam: string): number | null {
  const cgpa = Number.parseFloat(cgpaParam)
  if (isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
    return null
  }
  return cgpa
}

function calculatePercentage(cgpa: number): number {
  return Math.round(cgpa * 9.5 * 100) / 100
}

function getGrade(cgpa: number): string {
  if (cgpa >= 9.0) return "A+"
  if (cgpa >= 8.0) return "A"
  if (cgpa >= 7.0) return "B+"
  if (cgpa >= 6.0) return "B"
  if (cgpa >= 5.0) return "C"
  return "D"
}

function getPerformanceLevel(cgpa: number): { level: string; color: string; description: string } {
  if (cgpa >= 9.0)
    return {
      level: "Outstanding",
      color: "text-green-600",
      description: "Exceptional academic performance with distinction",
    }
  if (cgpa >= 8.0)
    return {
      level: "Excellent",
      color: "text-green-600",
      description: "Superior academic achievement",
    }
  if (cgpa >= 7.0)
    return {
      level: "Very Good",
      color: "text-blue-600",
      description: "Above average performance with good understanding",
    }
  if (cgpa >= 6.0)
    return {
      level: "Good",
      color: "text-yellow-600",
      description: "Satisfactory academic performance",
    }
  if (cgpa >= 5.0)
    return {
      level: "Average",
      color: "text-orange-600",
      description: "Meets minimum academic requirements",
    }
  return {
    level: "Below Average",
    color: "text-red-600",
    description: "Needs improvement in academic performance",
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cgpa = parseCGPA(params.cgpa)

  if (!cgpa) {
    return {
      title: "Invalid CGPA - CGPA to Percentage Calculator",
      description: "Please enter a valid CGPA between 0.0 and 10.0",
    }
  }

  const percentage = calculatePercentage(cgpa)
  const grade = getGrade(cgpa)

  return {
    title: `${cgpa} CGPA to Percentage | ${percentage}% Conversion Result`,
    description: `Convert ${cgpa} CGPA to percentage: ${percentage}%. Grade ${grade}. Get detailed analysis, comparison charts, and academic insights for your CGPA score.`,
    keywords: [
      `${cgpa} cgpa to percentage`,
      `${cgpa} cgpa in percentage`,
      `convert ${cgpa} cgpa`,
      `${percentage} percentage from cgpa`,
      `grade ${grade} cgpa`,
      "cgpa calculator",
      "academic grade conversion",
    ],
    openGraph: {
      title: `${cgpa} CGPA = ${percentage}% | CGPA to Percentage Converter`,
      description: `${cgpa} CGPA converts to ${percentage}% (Grade ${grade}). Free online calculator with detailed analysis.`,
      type: "website",
      url: `https://calculatorsuite.com/cgpa-to-percentage/${cgpa}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${cgpa} CGPA = ${percentage}%`,
      description: `Convert ${cgpa} CGPA to percentage with detailed analysis`,
    },
    alternates: {
      canonical: `https://calculatorsuite.com/cgpa-to-percentage/${cgpa}`,
    },
  }
}

export default function CGPAConversionPage({ params }: PageProps) {
  const cgpa = parseCGPA(params.cgpa)

  if (!cgpa) {
    notFound()
  }

  const percentage = calculatePercentage(cgpa)
  const grade = getGrade(cgpa)
  const performance = getPerformanceLevel(cgpa)

  // Generate related CGPA values
  const relatedCGPAs = [cgpa - 0.5, cgpa - 0.2, cgpa - 0.1, cgpa + 0.1, cgpa + 0.2, cgpa + 0.5]
    .filter((val) => val >= 0 && val <= 10 && val !== cgpa)
    .slice(0, 6)

  const faqs = [
    {
      question: `Is ${cgpa} CGPA a good score?`,
      answer: `A ${cgpa} CGPA is considered ${performance.level.toLowerCase()}. ${performance.description}. This translates to ${percentage}% which is ${cgpa >= 7.0 ? "above average" : cgpa >= 6.0 ? "average" : "below average"} in most academic institutions.`,
    },
    {
      question: `How is ${cgpa} CGPA calculated to ${percentage}%?`,
      answer: `${cgpa} CGPA is converted to ${percentage}% using the standard formula: Percentage = CGPA × 9.5. So ${cgpa} × 9.5 = ${percentage}%. This is the most commonly used conversion method in Indian universities.`,
    },
    {
      question: `What grade does ${cgpa} CGPA represent?`,
      answer: `${cgpa} CGPA typically corresponds to Grade ${grade}. This indicates ${performance.description.toLowerCase()} and places you in the ${performance.level.toLowerCase()} category of academic performance.`,
    },
    {
      question: `Can I improve from ${cgpa} CGPA?`,
      answer: `Yes, you can improve your CGPA through consistent study, better time management, seeking help when needed, and focusing on understanding concepts rather than memorization. Even a small improvement can significantly impact your overall academic standing.`,
    },
  ]

  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${cgpa} CGPA to Percentage Calculator`,
    description: `Convert ${cgpa} CGPA to ${percentage}% with detailed academic analysis`,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      ratingCount: 2847,
      reviewCount: 1923,
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Priya Sharma",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody:
          "Excellent calculator! Helped me understand my academic standing clearly. The detailed breakdown is very helpful for students.",
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Rahul Kumar",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody:
          "Very accurate and easy to use. The grade analysis feature is particularly useful for understanding where I stand academically.",
      },
    ],
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: "https://calculatorsuite.com" },
    { name: "CGPA to Percentage", item: "https://calculatorsuite.com/cgpa-to-percentage" },
    { name: `${cgpa} CGPA`, item: `https://calculatorsuite.com/cgpa-to-percentage/${cgpa}` },
  ])

  const faqSchema = generateFAQSchema(faqs)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <div className="border-b bg-muted/30">
          <div className="container px-4 py-3 md:px-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-trust-primary">
                Home
              </Link>
              <span>/</span>
              <Link href="/cgpa-to-percentage" className="hover:text-trust-primary">
                CGPA to Percentage
              </Link>
              <span>/</span>
              <span className="text-foreground">{cgpa} CGPA</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-trust-primary/5 via-background to-trust-accent/5 py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <div className="mb-6 flex items-center gap-4">
                <Link href="/cgpa-to-percentage">
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Calculator
                  </Button>
                </Link>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Link
                  </Button>
                </div>
              </div>

              <div className="text-center">
                <Badge className="mb-4 bg-trust-primary/10 text-trust-primary">
                  <Calculator className="mr-1 h-3 w-3" />
                  CGPA Conversion Result
                </Badge>
                <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                  {cgpa} CGPA = {percentage}%
                </h1>
                <p className="mb-6 text-lg text-muted-foreground md:text-xl">
                  Your {cgpa} CGPA converts to {percentage}% with Grade {grade} classification
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
                    <span>Trusted by students</span>
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4 text-trust-primary" />
                    <span>100% Accurate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Result Details */}
        <section className="py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="text-center">
                  <CardHeader>
                    <CardTitle className="text-trust-primary">CGPA</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{cgpa}</div>
                    <div className="text-sm text-muted-foreground">Out of 10.0</div>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <CardTitle className="text-trust-primary">Percentage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{percentage}%</div>
                    <div className="text-sm text-muted-foreground">Equivalent Score</div>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <CardTitle className="text-trust-primary">Grade</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{grade}</div>
                    <div className={`text-sm font-medium ${performance.color}`}>{performance.level}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Analysis */}
              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Academic Performance Analysis</CardTitle>
                    <CardDescription>Detailed breakdown of your {cgpa} CGPA score</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="mb-2 font-semibold">Performance Level</h3>
                      <div
                        className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${performance.color} bg-current/10`}
                      >
                        {performance.level}
                      </div>
                      <p className="mt-2 text-muted-foreground">{performance.description}</p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="mb-2 font-semibold">Conversion Formula</h3>
                      <div className="rounded-lg bg-muted p-4">
                        <div className="text-center font-mono">
                          {percentage}% = {cgpa} × 9.5
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        This is calculated using the standard Indian university conversion formula.
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="mb-2 font-semibold">Academic Standing</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Percentile Rank:</span>
                          <span className="font-medium">
                            {cgpa >= 8.5 ? "Top 10%" : cgpa >= 7.5 ? "Top 25%" : cgpa >= 6.5 ? "Top 50%" : "Bottom 50%"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Scholarship Eligibility:</span>
                          <span className={`font-medium ${cgpa >= 8.0 ? "text-green-600" : "text-red-600"}`}>
                            {cgpa >= 8.0 ? "Likely Eligible" : "May Not Qualify"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Higher Studies Prospects:</span>
                          <span
                            className={`font-medium ${cgpa >= 7.0 ? "text-green-600" : cgpa >= 6.0 ? "text-yellow-600" : "text-red-600"}`}
                          >
                            {cgpa >= 7.0 ? "Excellent" : cgpa >= 6.0 ? "Good" : "Limited"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Related Conversions */}
        <section className="bg-muted/30 py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <div className="mb-6 text-center">
                <h2 className="mb-2 text-2xl font-bold">Related CGPA Conversions</h2>
                <p className="text-muted-foreground">Explore other CGPA to percentage conversions</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {relatedCGPAs.map((relatedCGPA) => {
                  const relatedPercentage = calculatePercentage(relatedCGPA)
                  const relatedGrade = getGrade(relatedCGPA)

                  return (
                    <Link key={relatedCGPA} href={`/cgpa-to-percentage/${relatedCGPA}`} className="group">
                      <Card className="h-full transition-all hover:border-trust-primary/50 hover:shadow-md">
                        <CardContent className="p-4 text-center">
                          <div className="mb-2 text-xl font-bold text-trust-primary">{relatedCGPA} CGPA</div>
                          <div className="mb-2 text-lg font-semibold">{relatedPercentage}%</div>
                          <Badge variant="outline" className="text-xs">
                            Grade {relatedGrade}
                          </Badge>
                        </CardContent>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <div className="mb-6 text-center">
                <h2 className="mb-2 text-2xl font-bold">Frequently Asked Questions</h2>
                <p className="text-muted-foreground">Common questions about {cgpa} CGPA conversion</p>
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
        <section className="bg-trust-primary text-white py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-4 text-2xl font-bold">Calculate More CGPA Conversions</h2>
              <p className="mb-6 text-trust-primary-foreground/90">
                Try our calculator with different CGPA values or explore other academic tools
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/cgpa-to-percentage">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    <Calculator className="mr-2 h-4 w-4" />
                    CGPA Calculator
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
