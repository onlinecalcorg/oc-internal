import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Fraction } from "@/components/ui/fraction"
import { ArrowRight, Calculator, ChevronLeft, ChevronRight, DivideIcon, Home } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Props = {
  params: {
    number: string
  }
}

// Function to find the greatest common divisor (GCD)
function findGCD(a: number, b: number): number {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b) {
    const temp = b
    b = a % b
    a = temp
  }
  return a
}

// Function to convert decimal to fraction
function decimalToFraction(decimal: number): {
  numerator: number
  denominator: number
  steps: string[]
  gcd: number
  decimalPlaces: number
  wholeNumber: number
  decimalPart: string
  originalDecimal: number
} {
  const steps: string[] = []
  const originalDecimal = decimal

  // Handle whole numbers
  if (Number.isInteger(decimal)) {
    return {
      numerator: decimal,
      denominator: 1,
      steps: [`${decimal} is a whole number, which equals ${decimal}/1 as a fraction.`],
      gcd: 1,
      decimalPlaces: 0,
      wholeNumber: decimal,
      decimalPart: "0",
      originalDecimal,
    }
  }

  // Convert to string to analyze decimal places
  const decimalStr = decimal.toString()
  const decimalParts = decimalStr.split(".")
  const decimalPart = decimalParts[1] || ""
  const wholeNumber = Number.parseInt(decimalParts[0])

  // Calculate denominator based on decimal places
  const decimalPlaces = decimalPart.length
  const denominator = Math.pow(10, decimalPlaces)
  const numerator = wholeNumber * denominator + Number.parseInt(decimalPart)

  steps.push(`Step 1: Identify the decimal places.`)
  steps.push(`${decimal} has ${decimalPlaces} decimal places.`)
  steps.push(`Step 2: Multiply by 10^${decimalPlaces} to get a whole number.`)
  steps.push(`${decimal} × 10^${decimalPlaces} = ${numerator}`)
  steps.push(
    `Step 3: Set up the fraction with this number as the numerator and 10^${decimalPlaces} as the denominator.`,
  )
  steps.push(`${numerator}/${denominator}`)

  // Simplify the fraction
  const gcd = findGCD(numerator, denominator)
  const simplifiedNumerator = numerator / gcd
  const simplifiedDenominator = denominator / gcd

  if (gcd > 1) {
    steps.push(
      `Step 4: Simplify the fraction by dividing both the numerator and denominator by their greatest common divisor (${gcd}).`,
    )
    steps.push(`${numerator}/${denominator} = ${simplifiedNumerator}/${simplifiedDenominator}`)
  } else {
    steps.push(`Step 4: The fraction is already in its simplest form.`)
  }

  return {
    numerator: simplifiedNumerator,
    denominator: simplifiedDenominator,
    steps,
    gcd,
    decimalPlaces,
    wholeNumber,
    decimalPart,
    originalDecimal,
  }
}

// Function to get real-world examples for a specific decimal
function getRealWorldExamples(decimal: number): string[] {
  const examples = []

  // Examples based on decimal ranges
  if (decimal < 0.1) {
    examples.push(`${decimal} represents ${decimal * 100}% of a whole, which is a very small portion.`)
    examples.push(`In finance, ${decimal} could represent a ${decimal * 100}% interest rate or fee.`)
  } else if (decimal < 0.25) {
    examples.push(`${decimal} is less than a quarter (0.25) of a whole unit.`)
    examples.push(`In cooking, ${decimal} cups might be used for small amounts of ingredients.`)
  } else if (decimal === 0.25) {
    examples.push(`${decimal} represents exactly one quarter or 25% of a whole.`)
    examples.push(`In time measurement, ${decimal} hours equals 15 minutes.`)
  } else if (decimal < 0.5) {
    examples.push(`${decimal} is between a quarter and a half of a whole unit.`)
    examples.push(`In sports statistics, ${decimal} might represent a success rate or completion percentage.`)
  } else if (decimal === 0.5) {
    examples.push(`${decimal} represents exactly one half or 50% of a whole.`)
    examples.push(`In measurements, ${decimal} meters is half a meter or 50 centimeters.`)
  } else if (decimal < 0.75) {
    examples.push(`${decimal} is between a half and three-quarters of a whole unit.`)
    examples.push(`In probability, ${decimal} represents a ${decimal * 100}% chance of an event occurring.`)
  } else if (decimal === 0.75) {
    examples.push(`${decimal} represents exactly three quarters or 75% of a whole.`)
    examples.push(`In time measurement, ${decimal} hours equals 45 minutes.`)
  } else if (decimal < 1) {
    examples.push(`${decimal} is more than three-quarters but less than a whole unit.`)
    examples.push(`In academic grading, ${decimal * 100}% might represent a high score on an assessment.`)
  } else if (Number.isInteger(decimal)) {
    examples.push(`${decimal} represents ${decimal} complete units.`)
    examples.push(`In counting, ${decimal} is a whole number with no fractional part.`)
  } else {
    // For mixed numbers (greater than 1 with a decimal part)
    const wholePart = Math.floor(decimal)
    const decimalPart = decimal - wholePart
    examples.push(`${decimal} represents ${wholePart} whole units plus ${decimalPart} of another unit.`)
    examples.push(
      `In measurements, ${decimal} meters equals ${wholePart} meter${wholePart !== 1 ? "s" : ""} and ${decimalPart * 100} centimeters.`,
    )
  }

  return examples
}

// Function to generate educational content about the specific fraction
function generateEducationalContent(result: ReturnType<typeof decimalToFraction>): string {
  const { numerator, denominator, originalDecimal } = result

  // Generate content based on the fraction properties
  if (denominator === 1) {
    return `The decimal ${originalDecimal} converts to the whole number ${numerator}. This is a special case where the fraction has a denominator of 1, meaning it represents an exact number of whole units with no fractional part.`
  }

  if (denominator === 2) {
    return `The decimal ${originalDecimal} converts to ${numerator}/${denominator}, which is ${numerator % 2 === 0 ? "an even" : "an odd"} number of halves. Halves are one of the most fundamental fractions used in everyday measurements, cooking, and mathematics.`
  }

  if (denominator === 4) {
    return `The decimal ${originalDecimal} converts to ${numerator}/${denominator}, which represents ${numerator} quarters. Quarters are commonly used in time (15-minute intervals), currency (quarter dollars), and measurements.`
  }

  if (denominator === 5) {
    return `The decimal ${originalDecimal} converts to ${numerator}/${denominator}, which represents ${numerator} fifths. Fractions with denominator 5 are related to our decimal system and often appear in percentage calculations (each fifth is 20%).`
  }

  if (denominator === 10 || denominator === 100 || denominator === 1000) {
    const place = denominator === 10 ? "tenths" : denominator === 100 ? "hundredths" : "thousandths"
    return `The decimal ${originalDecimal} converts to ${numerator}/${denominator}, which represents ${numerator} ${place}. This fraction directly relates to our decimal system, where each decimal place represents a power of 10.`
  }

  if (isPrime(denominator)) {
    return `The decimal ${originalDecimal} converts to ${numerator}/${denominator}. The denominator ${denominator} is a prime number, which means this fraction cannot be simplified further. Prime denominators often result from converting recurring decimals to fractions.`
  }

  return `The decimal ${originalDecimal} converts to ${numerator}/${denominator} in its simplest form. This fraction represents ${numerator} parts out of ${denominator} equal parts of a whole. Understanding how to convert between decimals and fractions is essential for precise calculations in mathematics, science, and everyday applications.`
}

// Helper function to check if a number is prime
function isPrime(num: number): boolean {
  if (num <= 1) return false
  if (num <= 3) return true
  if (num % 2 === 0 || num % 3 === 0) return false

  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false
  }

  return true
}

export function generateMetadata({ params }: Props): Metadata {
  // Parse the decimal from the URL with proper validation
  const decimalStr = params?.number ? params.number.replace(/-as-a-fraction$/, "") : ""
  const decimal = Number.parseFloat(decimalStr)

  if (isNaN(decimal)) {
    return {
      title: "Invalid Decimal | Decimal to Fraction Conversion",
      description: "Convert decimals to fractions with step-by-step explanations.",
    }
  }

  const { numerator, denominator } = decimalToFraction(decimal)

  return {
    title: `${decimal} as a Fraction | ${numerator}/${denominator}`,
    description: `Convert ${decimal} to a fraction: ${decimal} = ${numerator}/${denominator}. See step-by-step explanation of how to convert ${decimal} to a fraction.`,
    keywords: [
      `${decimal} as a fraction`,
      `convert ${decimal} to fraction`,
      "decimal to fraction conversion",
      "fraction calculator",
      "math conversion",
    ],
    openGraph: {
      title: `${decimal} as a Fraction | ${numerator}/${denominator}`,
      description: `Convert ${decimal} to a fraction: ${decimal} = ${numerator}/${denominator}. See step-by-step explanation of how to convert ${decimal} to a fraction.`,
      type: "website",
      url: `https://online-calculators.com/decimal-to-fraction/${params.number}`,
    },
    alternates: {
      canonical: `https://online-calculators.com/decimal-to-fraction/${params.number}`,
    },
  }
}

export default function DecimalAsFractionPage({ params }: Props) {
  // Remove debug console.log

  // Parse the decimal from the URL with proper validation
  const decimalStr = params?.number ? params.number.replace(/-as-a-fraction$/, "") : ""
  const decimal = Number.parseFloat(decimalStr)

  if (isNaN(decimal) || decimal < 0.01 || decimal > 99.99) {
    notFound()
  }

  // Rest of the component remains the same
  const result = decimalToFraction(decimal)
  const realWorldExamples = getRealWorldExamples(decimal)
  const educationalContent = generateEducationalContent(result)

  // Generate previous and next decimal values (with 2 decimal places)
  const prevDecimal = Math.max(0.01, Math.round((decimal - 0.01) * 100) / 100)
  const nextDecimal = Math.min(99.99, Math.round((decimal + 0.01) * 100) / 100)

  // Generate related decimals
  const relatedDecimals = [decimal * 2, decimal / 2, decimal + 1, decimal - 1]
    .filter((d) => d >= 0.01 && d <= 99.99)
    .map((d) => Math.round(d * 100) / 100)
    .filter((d, i, arr) => arr.indexOf(d) === i && d !== decimal)
    .slice(0, 4)

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["MathSolver", "LearningResource"],
    name: `${decimal} as a Fraction`,
    description: `Convert ${decimal} to a fraction: ${decimal} = ${result.numerator}/${result.denominator}`,
    mathExpression: `${decimal} = ${result.numerator}/${result.denominator}`,
    url: `https://online-calculators.com/decimal-to-fraction/${params.number}`,
    usageInfo: "https://online-calculators.com/privacy",
    inLanguage: "en",
    keywords: [`${decimal} as a fraction`, "decimal to fraction", "fraction conversion"],
    potentialAction: [
      {
        "@type": "SolveMathAction",
        target: `https://online-calculators.com/decimal-to-fraction/solve?q={math_expression_string}`,
        "mathExpression-input": "required name=math_expression_string",
        eduQuestionType: ["Fraction Conversion"],
      },
    ],
    learningResourceType: "Math solver",
    mainEntity: {
      "@type": "HowTo",
      name: "Steps to Convert Decimal to Fraction",
      step: result.steps.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        text: step,
        url: `https://online-calculators.com/decimal-to-fraction/${params.number}#step-${index + 1}`,
      })),
    },
  }

  return (
    <div className="container py-8">
      {/* Add JSON-LD to your page */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

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
            <BreadcrumbLink href="/decimal-to-fraction">Decimal to Fraction</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/decimal-to-fraction/${params.number}`} className="font-medium">
              {decimal} as a Fraction
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-2">{decimal} as a Fraction</h1>
        <p className="text-muted-foreground mb-8">
          Step-by-step explanation of how to convert {decimal} to a fraction.
        </p>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card className="calculator-result-card">
            <CardHeader>
              <CardTitle className="text-primary">Result</CardTitle>
              <CardDescription>The decimal converted to a fraction</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-4">
                  <div className="text-xl">{decimal}</div>
                  <ArrowRight className="h-6 w-6" />
                  <div className="text-xl font-bold">
                    <Fraction numerator={result.numerator} denominator={result.denominator} size="xl" color="accent" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
                <h4 className="font-semibold mb-4 text-blue-800">Step-by-Step Solution:</h4>
                <ol className="space-y-4">
                  <li className="bg-white p-3 rounded-md shadow-sm border-l-4 border-blue-500 flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="font-medium text-gray-800">Identify the decimal places</p>
                      <div className="mt-2 text-gray-600">
                        {decimal} has {result.decimalPlaces} decimal places.
                      </div>
                    </div>
                  </li>

                  <li className="bg-white p-3 rounded-md shadow-sm border-l-4 border-indigo-500 flex items-start">
                    <span className="bg-indigo-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="font-medium text-gray-800">Multiply by the appropriate power of 10</p>
                      <div className="mt-2 text-gray-600">
                        {decimal} × 10<sup>{result.decimalPlaces}</sup> ={" "}
                        {result.wholeNumber * Math.pow(10, result.decimalPlaces) + Number.parseInt(result.decimalPart)}
                      </div>
                    </div>
                  </li>

                  <li className="bg-white p-3 rounded-md shadow-sm border-l-4 border-purple-500 flex items-start">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="font-medium text-gray-800">Write as a fraction</p>
                      <div className="mt-2 text-gray-600">
                        <Fraction
                          numerator={
                            result.wholeNumber * Math.pow(10, result.decimalPlaces) +
                            Number.parseInt(result.decimalPart)
                          }
                          denominator={Math.pow(10, result.decimalPlaces)}
                        />
                      </div>
                    </div>
                  </li>

                  {result.gcd > 1 && (
                    <li className="bg-white p-3 rounded-md shadow-sm border-l-4 border-green-500 flex items-start">
                      <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                        4
                      </span>
                      <div>
                        <p className="font-medium text-gray-800">Simplify the fraction</p>
                        <div className="mt-2 text-gray-600">
                          <p>
                            Find the greatest common divisor (GCD) of{" "}
                            {result.wholeNumber * Math.pow(10, result.decimalPlaces) +
                              Number.parseInt(result.decimalPart)}{" "}
                            and {Math.pow(10, result.decimalPlaces)}
                          </p>
                          <p className="mt-1">GCD = {result.gcd}</p>
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            <div>
                              <p>Numerator:</p>
                              <div className="flex items-center mt-1">
                                {result.wholeNumber * Math.pow(10, result.decimalPlaces) +
                                  Number.parseInt(result.decimalPart)}{" "}
                                <DivideIcon className="h-4 w-4 mx-1" /> {result.gcd} = {result.numerator}
                              </div>
                            </div>
                            <div>
                              <p>Denominator:</p>
                              <div className="flex items-center mt-1">
                                {Math.pow(10, result.decimalPlaces)} <DivideIcon className="h-4 w-4 mx-1" />{" "}
                                {result.gcd} = {result.denominator}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  )}

                  <li className="bg-white p-3 rounded-md shadow-sm border-l-4 border-pink-500 flex items-start">
                    <span className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                      {result.gcd > 1 ? 5 : 4}
                    </span>
                    <div>
                      <p className="font-medium text-gray-800">Final result</p>
                      <div className="mt-2 text-gray-600">
                        <p>The decimal {decimal} as a fraction is:</p>
                        <div className="flex justify-center mt-2">
                          <Fraction
                            numerator={result.numerator}
                            denominator={result.denominator}
                            size="lg"
                            color="accent"
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Decimal Properties</CardTitle>
                <CardDescription>Information about this decimal number</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Decimal Value:</span>
                  <span className="font-medium">{decimal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Fraction Form:</span>
                  <span className="font-medium">
                    {result.numerator}/{result.denominator}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Decimal Places:</span>
                  <span className="font-medium">{result.decimalPlaces}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Whole Number Part:</span>
                  <span className="font-medium">{result.wholeNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Decimal Part:</span>
                  <span className="font-medium">0.{result.decimalPart}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Simplified By:</span>
                  <span className="font-medium">{result.gcd > 1 ? `GCD of ${result.gcd}` : "Already simplified"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Percentage:</span>
                  <span className="font-medium">{(decimal * 100).toFixed(2)}%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Navigation</CardTitle>
                <CardDescription>Explore other decimal to fraction conversions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button asChild variant="outline" className="flex justify-between items-center">
                    <Link href={`/decimal-to-fraction/${prevDecimal}-as-a-fraction`}>
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      <span>{prevDecimal}</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="flex justify-between items-center">
                    <Link href={`/decimal-to-fraction/${nextDecimal}-as-a-fraction`}>
                      <span>{nextDecimal}</span>
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>

                <div className="pt-4">
                  <Button asChild className="w-full">
                    <Link href="/decimal-to-fraction">
                      <Calculator className="h-4 w-4 mr-2" />
                      Try Another Conversion
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="examples" className="mb-10">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="examples">Real-World Examples</TabsTrigger>
            <TabsTrigger value="related">Related Conversions</TabsTrigger>
            <TabsTrigger value="learn">Learn More</TabsTrigger>
          </TabsList>
          <TabsContent value="examples" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Real-World Examples of {decimal}</CardTitle>
                <CardDescription>Practical applications of this decimal value</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {realWorldExamples.map((example, index) => (
                    <li key={index} className="bg-muted/50 p-4 rounded-lg">
                      {example}
                    </li>
                  ))}
                  <li className="bg-muted/50 p-4 rounded-lg">
                    In decimal form, {decimal} can be used directly in calculations, while its fraction form{" "}
                    {result.numerator}/{result.denominator} is often more precise for certain mathematical operations.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="related" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Related Decimal Conversions</CardTitle>
                <CardDescription>Explore these related decimal values</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {relatedDecimals.map((d) => (
                    <Link
                      key={d}
                      href={`/decimal-to-fraction/${d}-as-a-fraction`}
                      className="block p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors text-center"
                    >
                      <div className="font-medium mb-2">{d}</div>
                      <div className="text-sm text-muted-foreground">
                        {(() => {
                          const { numerator, denominator } = decimalToFraction(d)
                          return `${numerator}/${denominator}`
                        })()}
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Browse by Range</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <Button asChild variant="outline" size="sm">
                      <Link href="/decimal-to-fraction/browse?start=0.01&end=0.1&page=1">0.01 - 0.1</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/decimal-to-fraction/browse?start=0.1&end=0.5&page=1">0.1 - 0.5</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/decimal-to-fraction/browse?start=0.5&end=1.0&page=1">0.5 - 1.0</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/decimal-to-fraction/browse?start=1.0&end=5.0&page=1">1.0 - 5.0</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/decimal-to-fraction/browse?start=5.0&end=10.0&page=1">5.0 - 10.0</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/decimal-to-fraction/browse?start=10.0&end=50.0&page=1">10.0 - 50.0</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="learn" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Understanding {decimal} as a Fraction</CardTitle>
                <CardDescription>Educational insights about this specific conversion</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{educationalContent}</p>

                <div className="bg-muted/50 p-4 rounded-lg mt-4">
                  <h4 className="font-medium mb-2">Mathematical Properties</h4>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>
                      <span className="font-medium">Decimal Expansion:</span> {decimal} has a terminating decimal
                      expansion with {result.decimalPlaces} decimal places.
                    </li>
                    <li>
                      <span className="font-medium">Fraction Type:</span>{" "}
                      {result.denominator === 1
                        ? "Whole number"
                        : result.wholeNumber > 0
                          ? "Mixed number (can be written as a mixed fraction)"
                          : "Proper fraction (numerator smaller than denominator)"}
                    </li>
                    <li>
                      <span className="font-medium">Simplification:</span>{" "}
                      {result.gcd > 1
                        ? `This fraction was simplified by dividing both numerator and denominator by ${result.gcd}`
                        : "This fraction is already in its simplest form"}
                    </li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium mb-2">Converting Between Decimals and Fractions</h4>
                  <p className="mb-4">Converting decimals to fractions involves these key steps:</p>
                  <ol className="space-y-2 list-decimal pl-5">
                    <li>Identify the number of decimal places</li>
                    <li>Multiply by the appropriate power of 10 to eliminate the decimal point</li>
                    <li>Write as a fraction with the power of 10 as the denominator</li>
                    <li>Simplify by dividing both numerator and denominator by their greatest common divisor</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/decimal-to-fraction">
              <Calculator className="h-5 w-5 mr-2" />
              Back to Decimal to Fraction Calculator
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
