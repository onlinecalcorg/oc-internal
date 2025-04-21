import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Fraction } from "@/components/ui/fraction"
import { ArrowRight, Calculator, ChevronRight, Home } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "Decimal to Fraction Calculator | Convert Decimals to Fractions",
  description:
    "Convert any decimal to a fraction with our easy-to-use calculator. Get step-by-step explanations and see how to convert decimals to fractions.",
  keywords: [
    "decimal to fraction",
    "convert decimal to fraction",
    "fraction calculator",
    "decimal fraction conversion",
    "how to convert decimal to fraction",
  ],
}

export default function DecimalToFractionPage() {
  // Common decimal values that people often search for
  const commonDecimals = [
    { value: 0.1, numerator: 1, denominator: 10 },
    { value: 0.25, numerator: 1, denominator: 4 },
    { value: 0.33, numerator: 1, denominator: 3 },
    { value: 0.5, numerator: 1, denominator: 2 },
    { value: 0.67, numerator: 2, denominator: 3 },
    { value: 0.75, numerator: 3, denominator: 4 },
    { value: 1.5, numerator: 3, denominator: 2 },
    { value: 2.25, numerator: 9, denominator: 4 },
    { value: 3.14, numerator: 314, denominator: 100 },
  ]

  // Browse ranges for decimal to fraction conversions
  const browseRanges = [
    { start: 0.01, end: 0.1, label: "0.01 to 0.1" },
    { start: 0.1, end: 0.5, label: "0.1 to 0.5" },
    { start: 0.5, end: 1.0, label: "0.5 to 1.0" },
    { start: 1.0, end: 5.0, label: "1.0 to 5.0" },
    { start: 5.0, end: 10.0, label: "5.0 to 10.0" },
    { start: 10.0, end: 50.0, label: "10.0 to 50.0" },
    { start: 50.0, end: 99.99, label: "50.0 to 99.99" },
  ]

  // Popular decimal values by category
  const popularDecimals = {
    simple: [
      { value: 0.1, description: "One tenth" },
      { value: 0.2, description: "One fifth" },
      { value: 0.5, description: "One half" },
      { value: 0.01, description: "One hundredth" },
      { value: 0.001, description: "One thousandth" },
    ],
    common: [
      { value: 0.25, description: "One quarter" },
      { value: 0.75, description: "Three quarters" },
      { value: 0.125, description: "One eighth" },
      { value: 0.375, description: "Three eighths" },
      { value: 0.625, description: "Five eighths" },
      { value: 0.875, description: "Seven eighths" },
    ],
    mixed: [
      { value: 1.5, description: "One and a half" },
      { value: 2.25, description: "Two and a quarter" },
      { value: 3.75, description: "Three and three quarters" },
      { value: 4.5, description: "Four and a half" },
      { value: 10.5, description: "Ten and a half" },
    ],
    repeating: [
      { value: 0.33, description: "Approximately 1/3" },
      { value: 0.67, description: "Approximately 2/3" },
      { value: 0.16, description: "Approximately 1/6" },
      { value: 0.83, description: "Approximately 5/6" },
      { value: 0.11, description: "Approximately 1/9" },
    ],
  }

  return (
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
            <BreadcrumbLink href="/decimal-to-fraction" className="font-medium">
              Decimal to Fraction
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-3">Decimal to Fraction Calculator</h1>
          <p className="text-xl text-muted-foreground">Convert any decimal number to a fraction in its simplest form</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Convert a Decimal to a Fraction</CardTitle>
              <CardDescription>Enter a decimal number to convert it to a fraction</CardDescription>
            </CardHeader>
            <CardContent>
              {/* <form
                className="space-y-4"
                action={(formData) => {
                  "use server"
                  // This would be handled by client-side JavaScript in a real implementation
                }}
              >
                <div className="space-y-2">
                  <Label htmlFor="decimal">Decimal Number</Label>
                  <div className="flex gap-2">
                    <Input
                      id="decimal"
                      name="decimal"
                      type="number"
                      step="0.01"
                      placeholder="Enter a decimal (e.g., 0.75)"
                      className="text-lg"
                    />
                    <Button type="submit">
                      <Search className="h-4 w-4 mr-2" />
                      Convert
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Enter any decimal between 0.01 and 99.99</p>
                </div>
              </form> */}

              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Quick Access</h4>
                <div className="flex flex-wrap gap-2">
                  {[0.25, 0.5, 0.75, 1.5, 2.5].map((value) => (
                    <Link
                      key={value}
                      href={`/decimal-to-fraction/${value}-as-a-fraction`}
                      className="bg-muted hover:bg-muted/80 px-3 py-1 rounded-md text-sm transition-colors"
                    >
                      {value}
                    </Link>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/decimal-to-fraction/browse?start=0.01&end=0.1&page=1">
                  <Calculator className="mr-2 h-4 w-4" />
                  Browse All Conversions
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Conversions</CardTitle>
              <CardDescription>Explore frequently used decimal to fraction conversions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {commonDecimals.map((item) => (
                  <Link
                    key={item.value}
                    href={`/decimal-to-fraction/${item.value}-as-a-fraction`}
                    className="flex flex-col items-center p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <span className="text-lg font-medium mb-1">{item.value}</span>
                    <Fraction numerator={item.numerator} denominator={item.denominator} size="sm" color="primary" />
                  </Link>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/decimal-to-fraction/browse?start=0.01&end=0.1&page=1">
                  Browse All Conversions
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Tabs defaultValue="popular" className="mb-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="popular">Popular Decimals</TabsTrigger>
            <TabsTrigger value="how-to">How To Convert</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="browse">Browse By Range</TabsTrigger>
          </TabsList>

          <TabsContent value="popular" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Popular Decimal to Fraction Conversions</CardTitle>
                <CardDescription>Click on any decimal to see its step-by-step conversion to a fraction</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="simple">
                  <TabsList className="mb-4">
                    <TabsTrigger value="simple">Simple Decimals</TabsTrigger>
                    <TabsTrigger value="common">Common Fractions</TabsTrigger>
                    <TabsTrigger value="mixed">Mixed Numbers</TabsTrigger>
                    <TabsTrigger value="repeating">Repeating Decimals</TabsTrigger>
                  </TabsList>

                  <TabsContent value="simple">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {popularDecimals.simple.map((item) => (
                        <Link
                          key={item.value}
                          href={`/decimal-to-fraction/${item.value}-as-a-fraction`}
                          className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                        >
                          <div className="font-medium text-lg mb-1">{item.value}</div>
                          <div className="text-sm text-muted-foreground">{item.description}</div>
                        </Link>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="common">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {popularDecimals.common.map((item) => (
                        <Link
                          key={item.value}
                          href={`/decimal-to-fraction/${item.value}-as-a-fraction`}
                          className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                        >
                          <div className="font-medium text-lg mb-1">{item.value}</div>
                          <div className="text-sm text-muted-foreground">{item.description}</div>
                        </Link>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="mixed">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {popularDecimals.mixed.map((item) => (
                        <Link
                          key={item.value}
                          href={`/decimal-to-fraction/${item.value}-as-a-fraction`}
                          className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                        >
                          <div className="font-medium text-lg mb-1">{item.value}</div>
                          <div className="text-sm text-muted-foreground">{item.description}</div>
                        </Link>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="repeating">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {popularDecimals.repeating.map((item) => (
                        <Link
                          key={item.value}
                          href={`/decimal-to-fraction/${item.value}-as-a-fraction`}
                          className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                        >
                          <div className="font-medium text-lg mb-1">{item.value}</div>
                          <div className="text-sm text-muted-foreground">{item.description}</div>
                        </Link>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="how-to" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>How to Convert a Decimal to a Fraction</CardTitle>
                <CardDescription>Follow these steps to convert any decimal to a fraction</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
                  <h4 className="font-semibold mb-4 text-blue-800">Step-by-Step Method:</h4>
                  <ol className="space-y-6">
                    <li className="bg-white p-4 rounded-md shadow-sm border-l-4 border-blue-500">
                      <h5 className="font-medium text-gray-800 mb-2">Step 1: Identify the decimal places</h5>
                      <p className="text-gray-600">
                        Count how many digits are to the right of the decimal point. This determines the power of 10
                        you'll use.
                      </p>
                      <div className="mt-3 bg-blue-50 p-3 rounded">
                        <span className="font-medium">Example:</span> For 0.75, there are 2 decimal places.
                      </div>
                    </li>

                    <li className="bg-white p-4 rounded-md shadow-sm border-l-4 border-indigo-500">
                      <h5 className="font-medium text-gray-800 mb-2">
                        Step 2: Multiply by the appropriate power of 10
                      </h5>
                      <p className="text-gray-600">
                        Multiply the decimal by 10 raised to the power of the number of decimal places to get a whole
                        number.
                      </p>
                      <div className="mt-3 bg-indigo-50 p-3 rounded">
                        <span className="font-medium">Example:</span> 0.75 × 10² = 0.75 × 100 = 75
                      </div>
                    </li>

                    <li className="bg-white p-4 rounded-md shadow-sm border-l-4 border-purple-500">
                      <h5 className="font-medium text-gray-800 mb-2">Step 3: Write as a fraction</h5>
                      <p className="text-gray-600">
                        Write the whole number as the numerator and the power of 10 as the denominator.
                      </p>
                      <div className="mt-3 bg-purple-50 p-3 rounded">
                        <span className="font-medium">Example:</span> 0.75 = 75/100
                      </div>
                    </li>

                    <li className="bg-white p-4 rounded-md shadow-sm border-l-4 border-green-500">
                      <h5 className="font-medium text-gray-800 mb-2">Step 4: Simplify the fraction</h5>
                      <p className="text-gray-600">
                        Divide both the numerator and denominator by their greatest common divisor (GCD).
                      </p>
                      <div className="mt-3 bg-green-50 p-3 rounded">
                        <span className="font-medium">Example:</span> The GCD of 75 and 100 is 25.
                        <br />
                        75 ÷ 25 = 3
                        <br />
                        100 ÷ 25 = 4
                        <br />
                        So 0.75 = 75/100 = 3/4
                      </div>
                    </li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Decimal to Fraction Conversion Examples</CardTitle>
                <CardDescription>See how different types of decimals convert to fractions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">Simple Decimal: 0.5</h4>
                    <div className="flex items-center gap-3 mb-3">
                      <span>0.5</span>
                      <ArrowRight className="h-4 w-4" />
                      <Fraction numerator={1} denominator={2} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      0.5 has 1 decimal place, so multiply by 10¹ = 10.
                      <br />
                      0.5 × 10 = 5, so 0.5 = 5/10 = 1/2
                    </p>
                    <Button asChild variant="link" className="mt-2 h-auto p-0">
                      <Link href="/decimal-to-fraction/0.5-as-a-fraction">
                        See full solution
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">Two Decimal Places: 0.25</h4>
                    <div className="flex items-center gap-3 mb-3">
                      <span>0.25</span>
                      <ArrowRight className="h-4 w-4" />
                      <Fraction numerator={1} denominator={4} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      0.25 has 2 decimal places, so multiply by 10² = 100.
                      <br />
                      0.25 × 100 = 25, so 0.25 = 25/100 = 1/4
                    </p>
                    <Button asChild variant="link" className="mt-2 h-auto p-0">
                      <Link href="/decimal-to-fraction/0.25-as-a-fraction">
                        See full solution
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">Mixed Number: 2.75</h4>
                    <div className="flex items-center gap-3 mb-3">
                      <span>2.75</span>
                      <ArrowRight className="h-4 w-4" />
                      <Fraction numerator={11} denominator={4} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      2.75 has 2 decimal places, so multiply by 10² = 100.
                      <br />
                      2.75 × 100 = 275, so 2.75 = 275/100 = 11/4
                    </p>
                    <Button asChild variant="link" className="mt-2 h-auto p-0">
                      <Link href="/decimal-to-fraction/2.75-as-a-fraction">
                        See full solution
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">Repeating Decimal: 0.33...</h4>
                    <div className="flex items-center gap-3 mb-3">
                      <span>0.33...</span>
                      <ArrowRight className="h-4 w-4" />
                      <Fraction numerator={1} denominator={3} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      0.33... is a repeating decimal that equals exactly 1/3.
                      <br />
                      For repeating decimals, different algebraic methods are used.
                    </p>
                    <Button asChild variant="link" className="mt-2 h-auto p-0">
                      <Link href="/decimal-to-fraction/0.33-as-a-fraction">
                        See full solution
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="browse" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Browse Decimal to Fraction Conversions</CardTitle>
                <CardDescription>Explore conversions by decimal range</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {browseRanges.map((range) => (
                    <Link
                      key={`${range.start}-${range.end}`}
                      href={`/decimal-to-fraction/browse?start=${range.start}&end=${range.end}&page=1`}
                      className="block p-6 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                    >
                      <h4 className="font-medium mb-2">{range.label}</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Browse all decimal to fraction conversions in this range
                      </p>
                      <div className="flex items-center text-primary">
                        <span>View conversions</span>
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Specific Decimal to Fraction Conversions</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {/* First row - Common decimals */}
            <Card className="bg-muted/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Common Decimals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/decimal-to-fraction/0.01-as-a-fraction" className="block hover:underline text-primary">
                  0.01 as a fraction
                </Link>
                <Link href="/decimal-to-fraction/0.1-as-a-fraction" className="block hover:underline text-primary">
                  0.1 as a fraction
                </Link>
                <Link href="/decimal-to-fraction/0.2-as-a-fraction" className="block hover:underline text-primary">
                  0.2 as a fraction
                </Link>
                <Link href="/decimal-to-fraction/0.25-as-a-fraction" className="block hover:underline text-primary">
                  0.25 as a fraction
                </Link>
                <Link href="/decimal-to-fraction/0.5-as-a-fraction" className="block hover:underline text-primary">
                  0.5 as a fraction
                </Link>
              </CardContent>
            </Card>

            {/* Second row - Mixed numbers */}
            <Card className="bg-muted/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Mixed Numbers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/decimal-to-fraction/1.5-as-a-fraction" className="block hover:underline text-primary">
                  1.5 as a fraction
                </Link>
                <Link href="/decimal-to-fraction/2.25-as-a-fraction" className="block hover:underline text-primary">
                  2.25 as a fraction
                </Link>
                <Link href="/decimal-to-fraction/3.5-as-a-fraction" className="block hover:underline text-primary">
                  3.5 as a fraction
                </Link>
                <Link href="/decimal-to-fraction/4.75-as-a-fraction" className="block hover:underline text-primary">
                  4.75 as a fraction
                </Link>
                <Link href="/decimal-to-fraction/10.5-as-a-fraction" className="block hover:underline text-primary">
                  10.5 as a fraction
                </Link>
              </CardContent>
            </Card>

            {/* Third row - Repeating decimals */}
            <Card className="bg-muted/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Repeating Decimals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/decimal-to-fraction/0.33-as-a-fraction" className="block hover:underline text-primary">
                  0.33 as a fraction
                </Link>
                <Link href="/decimal-to-fraction/0.67-as-a-fraction" className="block hover:underline text-primary">
                  0.67 as a fraction
                </Link>
                <Link href="/decimal-to-fraction/0.16-as-a-fraction" className="block hover:underline text-primary">
                  0.16 as a fraction
                </Link>
                <Link href="/decimal-to-fraction/0.83-as-a-fraction" className="block hover:underline text-primary">
                  0.83 as a fraction
                </Link>
                <Link href="/decimal-to-fraction/0.142857-as-a-fraction" className="block hover:underline text-primary">
                  0.142857 as a fraction
                </Link>
              </CardContent>
            </Card>

            {/* Fourth row - Percentages */}
            <Card className="bg-muted/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Percentages</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/decimal-to-fraction/0.05-as-a-fraction" className="block hover:underline text-primary">
                  0.05 (5%) as a fraction
                </Link>
                <Link href="/decimal-to-fraction/0.1-as-a-fraction" className="block hover:underline text-primary">
                  0.1 (10%) as a fraction
                </Link>
                <Link href="/decimal-to-fraction/0.25-as-a-fraction" className="block hover:underline text-primary">
                  0.25 (25%) as a fraction
                </Link>
                <Link href="/decimal-to-fraction/0.5-as-a-fraction" className="block hover:underline text-primary">
                  0.5 (50%) as a fraction
                </Link>
                <Link href="/decimal-to-fraction/0.75-as-a-fraction" className="block hover:underline text-primary">
                  0.75 (75%) as a fraction
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Why Convert Decimals to Fractions?</h2>
          <div className="bg-muted p-6 rounded-lg">
            <p className="mb-4">Converting decimals to fractions is useful in many situations:</p>
            <ul className="space-y-2 list-disc pl-5">
              <li>
                <span className="font-medium">Precise calculations:</span> Fractions provide exact values, avoiding
                rounding errors that can occur with decimals
              </li>
              <li>
                <span className="font-medium">Simplifying expressions:</span> Mathematical expressions are often cleaner
                and easier to work with when using fractions
              </li>
              <li>
                <span className="font-medium">Cooking and recipes:</span> Many recipes use fractions (1/4 cup, 1/2
                teaspoon) rather than decimal equivalents
              </li>
              <li>
                <span className="font-medium">Construction and woodworking:</span> Measurements are typically expressed
                in fractions of an inch
              </li>
              <li>
                <span className="font-medium">Educational purposes:</span> Understanding the relationship between
                decimals and fractions is a fundamental math skill
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Explore More Fraction Calculators</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Fraction to Decimal</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground">Convert any fraction to its decimal equivalent</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/fractions/fraction-to-decimal">Try Calculator</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Simplify Fractions</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground">Reduce fractions to their simplest form</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/fractions/simplify-fractions">Try Calculator</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Mixed Numbers</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground">Convert between mixed numbers and improper fractions</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/fractions/mixed-numbers">Try Calculator</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
