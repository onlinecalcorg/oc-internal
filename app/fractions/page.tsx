import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { LucideIcon } from "@/components/lucide-icon"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"

export const metadata: Metadata = {
  title: "Fractions - Learn About Types, Operations & Applications | Online Calculators",
  description:
    "Learn about fractions, including proper, improper, and mixed fractions. Discover how to add, subtract, multiply, and divide fractions with our comprehensive guide and calculators.",
  keywords: [
    "fractions",
    "proper fractions",
    "improper fractions",
    "mixed numbers",
    "equivalent fractions",
    "fraction calculator",
    "simplify fractions",
    "decimal to fraction",
    "fraction to decimal",
    "big number fractions",
    "math fractions",
    "fraction operations",
    "fraction examples",
    "learn fractions",
  ],
  openGraph: {
    title: "Fractions - Learn About Types, Operations & Applications | Online Calculators",
    description:
      "Learn about fractions, including proper, improper, and mixed fractions. Discover how to add, subtract, multiply, and divide fractions with our comprehensive guide and calculators.",
    type: "website",
    url: "https://online-calculators.com/fractions",
    images: [
      {
        url: "https://online-calculators.com/og-fractions.png",
        width: 1200,
        height: 630,
        alt: "Fractions Guide and Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fractions - Learn About Types, Operations & Applications",
    description:
      "Learn about fractions, including proper, improper, and mixed fractions. Discover how to add, subtract, multiply, and divide fractions with our comprehensive guide and calculators.",
  },
  alternates: {
    canonical: "https://online-calculators.com/fractions",
  },
}

// Fraction calculator links with descriptions
const fractionCalculators = [
  {
    title: "Mixed Numbers Calculator",
    description: "Convert between mixed numbers and improper fractions with step-by-step explanations.",
    slug: "mixed-numbers",
    icon: "calculator",
  },
  {
    title: "Simplify Fractions Calculator",
    description: "Reduce fractions to their simplest form using the greatest common divisor (GCD) method.",
    slug: "simplify-fractions",
    icon: "minimize-2",
  },
  {
    title: "Decimal to Fraction Calculator",
    description: "Convert any decimal number to an equivalent fraction with detailed steps.",
    slug: "decimal-to-fraction",
    icon: "arrow-right",
  },
  {
    title: "Fraction to Decimal Calculator",
    description: "Convert fractions to their decimal equivalents with precision control.",
    slug: "fraction-to-decimal",
    icon: "arrow-left",
  },
  {
    title: "Big Number Fractions Calculator",
    description: "Work with extremely large numerators and denominators without losing precision.",
    slug: "big-number-fractions",
    icon: "maximize-2",
  },
]

export default function FractionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalPage",
            name: "Fractions - Learn About Types, Operations & Applications",
            description:
              "Learn about fractions, including proper, improper, and mixed fractions. Discover how to add, subtract, multiply, and divide fractions with our comprehensive guide and calculators.",
            provider: {
              "@type": "Organization",
              name: "Online Calculators",
              url: "https://online-calculators.com",
            },
            educationalLevel: "Beginner to Advanced",
            keywords:
              "fractions, proper fractions, improper fractions, mixed numbers, equivalent fractions, fraction calculator",
            about: {
              "@type": "Thing",
              name: "Fractions",
              description: "A fraction represents a part of a whole or, more generally, any number of equal parts.",
            },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: fractionCalculators.map((calc, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "SoftwareApplication",
                  name: calc.title,
                  description: calc.description,
                  url: `https://online-calculators.com/fractions/${calc.slug}`,
                  applicationCategory: "EducationalApplication",
                  operatingSystem: "Web",
                },
              })),
            },
          }),
        }}
      />

      <div className="container py-8">
        {/* Breadcrumbs */}
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
              <BreadcrumbLink href="/fractions" className="font-medium">
                Fractions
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero Section */}
        <section className="mb-16">
          <div className="flex flex-col items-center text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Understanding Fractions</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Explore the world of fractions, from basic concepts to advanced operations, with our comprehensive guide
              and specialized calculators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="mb-4">
                Fractions represent parts of a whole or, more generally, ratios of numbers. They are written as one
                number divided by another, like <span className="font-semibold">3/4</span> (three-fourths) or{" "}
                <span className="font-semibold">5/2</span> (five-halves).
              </p>
              <p className="mb-4">
                Whether you're a student learning about fractions for the first time, a teacher looking for educational
                resources, or someone who needs to work with fractions in everyday life, our comprehensive guide and
                specialized calculators will help you master this fundamental mathematical concept.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <Button asChild size="lg">
                  <Link href="#fraction-calculators">Explore Calculators</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#faq">Common Questions</Link>
                </Button>
              </div>
            </div>
            <div className="bg-muted rounded-lg p-6 flex justify-center">
              <div className="w-full max-w-md">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background rounded-lg p-4 text-center shadow-sm">
                    <div className="text-2xl font-bold mb-2">1/2</div>
                    <div className="text-sm text-muted-foreground">One Half</div>
                  </div>
                  <div className="bg-background rounded-lg p-4 text-center shadow-sm">
                    <div className="text-2xl font-bold mb-2">3/4</div>
                    <div className="text-sm text-muted-foreground">Three Quarters</div>
                  </div>
                  <div className="bg-background rounded-lg p-4 text-center shadow-sm">
                    <div className="text-2xl font-bold mb-2">5/3</div>
                    <div className="text-sm text-muted-foreground">Improper Fraction</div>
                  </div>
                  <div className="bg-background rounded-lg p-4 text-center shadow-sm">
                    <div className="text-2xl font-bold mb-2">1 2/3</div>
                    <div className="text-sm text-muted-foreground">Mixed Number</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Fractions Section */}
        <section className="mb-16" id="types-of-fractions">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Types of Fractions</h2>

          <Tabs defaultValue="proper" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="proper">Proper Fractions</TabsTrigger>
              <TabsTrigger value="improper">Improper Fractions</TabsTrigger>
              <TabsTrigger value="mixed">Mixed Numbers</TabsTrigger>
              <TabsTrigger value="equivalent">Equivalent Fractions</TabsTrigger>
            </TabsList>
            <TabsContent value="proper" className="p-6 bg-muted rounded-lg mt-4">
              <h3 className="text-xl font-semibold mb-3">Proper Fractions</h3>
              <p className="mb-4">
                A proper fraction has a numerator (top number) that is smaller than its denominator (bottom number). The
                value of a proper fraction is always less than 1.
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-6">
                <div className="bg-background rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold mb-2">1/4</div>
                  <div className="text-sm text-muted-foreground">One Quarter</div>
                </div>
                <div className="bg-background rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold mb-2">3/5</div>
                  <div className="text-sm text-muted-foreground">Three Fifths</div>
                </div>
                <div className="bg-background rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold mb-2">7/10</div>
                  <div className="text-sm text-muted-foreground">Seven Tenths</div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="improper" className="p-6 bg-muted rounded-lg mt-4">
              <h3 className="text-xl font-semibold mb-3">Improper Fractions</h3>
              <p className="mb-4">
                An improper fraction has a numerator that is greater than or equal to its denominator. The value of an
                improper fraction is always greater than or equal to 1.
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-6">
                <div className="bg-background rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold mb-2">5/3</div>
                  <div className="text-sm text-muted-foreground">Five Thirds</div>
                </div>
                <div className="bg-background rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold mb-2">7/4</div>
                  <div className="text-sm text-muted-foreground">Seven Quarters</div>
                </div>
                <div className="bg-background rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold mb-2">11/8</div>
                  <div className="text-sm text-muted-foreground">Eleven Eighths</div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="mixed" className="p-6 bg-muted rounded-lg mt-4">
              <h3 className="text-xl font-semibold mb-3">Mixed Numbers</h3>
              <p className="mb-4">
                A mixed number consists of a whole number and a proper fraction. It represents the sum of the whole
                number and the fraction.
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-6">
                <div className="bg-background rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold mb-2">1 1/2</div>
                  <div className="text-sm text-muted-foreground">One and a Half</div>
                </div>
                <div className="bg-background rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold mb-2">2 3/4</div>
                  <div className="text-sm text-muted-foreground">Two and Three Quarters</div>
                </div>
                <div className="bg-background rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold mb-2">3 1/3</div>
                  <div className="text-sm text-muted-foreground">Three and One Third</div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="equivalent" className="p-6 bg-muted rounded-lg mt-4">
              <h3 className="text-xl font-semibold mb-3">Equivalent Fractions</h3>
              <p className="mb-4">
                Equivalent fractions represent the same value but have different numerators and denominators. You can
                find equivalent fractions by multiplying or dividing both the numerator and denominator by the same
                non-zero number.
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-6">
                <div className="bg-background rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold mb-2">1/2</div>
                  <div className="text-sm text-muted-foreground">One Half</div>
                </div>
                <div className="bg-background rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold mb-2">2/4</div>
                  <div className="text-sm text-muted-foreground">Two Quarters</div>
                </div>
                <div className="bg-background rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold mb-2">3/6</div>
                  <div className="text-sm text-muted-foreground">Three Sixths</div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Fraction Operations Section */}
        <section className="mb-16" id="fraction-operations">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Working with Fractions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Addition and Subtraction</CardTitle>
                <CardDescription>To add or subtract fractions, you need a common denominator.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">When adding or subtracting fractions, follow these steps:</p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Find the least common multiple (LCM) of the denominators</li>
                  <li>Convert each fraction to an equivalent fraction with the LCM as the denominator</li>
                  <li>Add or subtract the numerators, keeping the denominator the same</li>
                  <li>Simplify the resulting fraction if possible</li>
                </ol>
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-center font-medium">Example: 1/4 + 2/3</p>
                  <p className="text-center mt-2">
                    LCM of 4 and 3 is 12
                    <br />
                    1/4 = 3/12
                    <br />
                    2/3 = 8/12
                    <br />
                    3/12 + 8/12 = 11/12
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Multiplication and Division</CardTitle>
                <CardDescription>Multiplication and division of fractions follow different rules.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Multiplication</h4>
                  <p className="mb-2">
                    To multiply fractions, multiply the numerators together and multiply the denominators together.
                  </p>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-center">(a/b) × (c/d) = (a×c)/(b×d)</p>
                    <p className="text-center mt-2">Example: 2/3 × 3/4 = 6/12 = 1/2</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Division</h4>
                  <p className="mb-2">
                    To divide fractions, multiply the first fraction by the reciprocal of the second fraction.
                  </p>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-center">(a/b) ÷ (c/d) = (a/b) × (d/c) = (a×d)/(b×c)</p>
                    <p className="text-center mt-2">Example: 2/3 ÷ 3/4 = 2/3 × 4/3 = 8/9</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why Fractions Matter Section */}
        <section className="mb-16" id="why-fractions-matter">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Why Fractions Matter</h2>

          <div className="bg-muted p-8 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <LucideIcon name="book-open" className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Education</h3>
                <p>
                  Fractions are a fundamental mathematical concept taught in schools worldwide. They form the basis for
                  understanding more advanced mathematical topics like algebra and calculus.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <LucideIcon name="utensils" className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Everyday Life</h3>
                <p>
                  From cooking recipes (1/2 cup of sugar) to time management (3/4 of an hour) to shopping discounts (1/3
                  off), fractions are used in countless everyday situations.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <LucideIcon name="briefcase" className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Professional Fields</h3>
                <p>
                  Many professions rely heavily on fractions, including engineering, architecture, finance, medicine,
                  and science. Precise measurements often involve fractional values.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Fraction Calculators Section */}
        <section className="mb-16" id="fraction-calculators">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Fraction Calculators</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our specialized calculators make working with fractions easy and educational. Each calculator provides
            step-by-step explanations to help you understand the process.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fractionCalculators.map((calculator) => (
              <Card key={calculator.slug} className="flex flex-col h-full transition-all hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <LucideIcon name={calculator.icon} className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{calculator.title}</CardTitle>
                  </div>
                  <CardDescription>{calculator.description}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-6">
                  <Button asChild className="w-full">
                    <Link href={`/fractions/${calculator.slug}`}>Try Calculator</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16" id="faq">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Frequently Asked Questions</h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is the difference between a proper and improper fraction?</AccordionTrigger>
              <AccordionContent>
                <p>
                  A proper fraction has a numerator (top number) that is smaller than its denominator (bottom number),
                  making its value less than 1. Examples include 1/2, 3/4, and 5/8.
                </p>
                <p className="mt-2">
                  An improper fraction has a numerator that is greater than or equal to its denominator, making its
                  value greater than or equal to 1. Examples include 5/3, 7/4, and 11/8. Improper fractions can be
                  converted to mixed numbers.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>How do I convert a mixed number to an improper fraction?</AccordionTrigger>
              <AccordionContent>
                <p>To convert a mixed number (like 2 3/4) to an improper fraction:</p>
                <ol className="list-decimal pl-5 mt-2 space-y-1">
                  <li>Multiply the whole number by the denominator of the fraction</li>
                  <li>Add the result to the numerator</li>
                  <li>Put this sum over the original denominator</li>
                </ol>
                <p className="mt-2">Example: 2 3/4 = ((2 × 4) + 3)/4 = 11/4</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>How do I simplify a fraction to its lowest terms?</AccordionTrigger>
              <AccordionContent>
                <p>To simplify a fraction to its lowest terms:</p>
                <ol className="list-decimal pl-5 mt-2 space-y-1">
                  <li>Find the greatest common divisor (GCD) of the numerator and denominator</li>
                  <li>Divide both the numerator and denominator by the GCD</li>
                </ol>
                <p className="mt-2">
                  Example: To simplify 8/12, find the GCD of 8 and 12, which is 4.
                  <br />8 ÷ 4 = 2 and 12 ÷ 4 = 3, so 8/12 = 2/3 in its simplest form.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Why can't you divide by zero in a fraction?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Division by zero is undefined in mathematics. In a fraction, the denominator represents the number of
                  parts into which the whole is divided. If the denominator is zero, it would mean dividing into zero
                  parts, which is mathematically impossible.
                </p>
                <p className="mt-2">
                  This is why fractions like 5/0 are undefined and not allowed in mathematical operations. However, a
                  fraction with zero in the numerator (like 0/5) is perfectly valid and equals zero.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>How do I convert a decimal to a fraction?</AccordionTrigger>
              <AccordionContent>
                <p>To convert a decimal to a fraction:</p>
                <ol className="list-decimal pl-5 mt-2 space-y-1">
                  <li>Write the decimal as a fraction with 1 in the denominator (e.g., 0.75 = 0.75/1)</li>
                  <li>Multiply both numerator and denominator by 10 for each decimal place (e.g., 0.75/1 = 75/100)</li>
                  <li>Simplify the fraction if possible (e.g., 75/100 = 3/4)</li>
                </ol>
                <p className="mt-2">
                  For repeating decimals, the process is more complex and involves algebraic methods. Our Decimal to
                  Fraction Calculator can handle these conversions automatically.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>What are real-life applications of fractions?</AccordionTrigger>
              <AccordionContent>
                <p>Fractions are used in many real-life situations:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Cooking and baking (measuring ingredients like 3/4 cup of flour)</li>
                  <li>Construction and carpentry (measurements like 5/8 inch)</li>
                  <li>Time management (quarter-hour, half-hour)</li>
                  <li>Financial calculations (interest rates, discounts)</li>
                  <li>Music (time signatures, note durations)</li>
                  <li>Sports statistics (batting averages, completion percentages)</li>
                  <li>Medicine (drug dosages)</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Call to Action */}
        <section className="bg-muted p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Master Fractions?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Explore our specialized calculators to solve fraction problems, convert between different formats, and
            deepen your understanding of this essential mathematical concept.
          </p>
          <Button asChild size="lg">
            <Link href="#fraction-calculators">Try Our Calculators</Link>
          </Button>
        </section>
      </div>
    </>
  )
}
