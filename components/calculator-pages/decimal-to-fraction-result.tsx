"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Fraction } from "@/components/ui/fraction"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Copy, Check, Share2, Calculator, ArrowRight, ChevronRight, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { gcd } from "@/lib/utils"

interface DecimalToFractionResultProps {
  decimal: string
  numerator: number
  denominator: number
  simplified: {
    numerator: number
    denominator: number
  }
  mixed?: {
    whole: number
    numerator: number
    denominator: number
  }
  equivalentDecimals?: string[]
}

export function DecimalToFractionResult({
  decimal,
  numerator,
  denominator,
  simplified,
  mixed,
  equivalentDecimals = [],
}: DecimalToFractionResultProps) {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<"fraction" | "steps" | "applications">("fraction")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const copyToClipboard = () => {
    const textToCopy = `${decimal} = ${numerator}/${denominator} = ${simplified.numerator}/${simplified.denominator}`
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const decimalValue = Number.parseFloat(decimal)
  const isRepeating = decimal.includes("...")
  const isTerminating = !isRepeating
  const decimalLength = decimal.replace(/[^0-9]/g, "").length - Math.floor(decimalValue).toString().length

  // Calculate the steps for converting decimal to fraction
  const steps = getConversionSteps(decimal, numerator, denominator, simplified)

  // Calculate percentage accuracy
  const fractionDecimal = numerator / denominator
  const accuracy = (1 - Math.abs((decimalValue - fractionDecimal) / decimalValue)) * 100

  // Real-world applications based on the decimal value
  const applications = getRealWorldApplications(decimalValue)

  return (
    <div className="space-y-8 mb-12">
      {/* Breadcrumb navigation */}
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/decimal-to-fraction">Decimal to Fraction</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/decimal-to-fraction/${decimal}`}>{decimal}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main result card with animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden border-2 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl md:text-3xl font-bold">{decimal} as a Fraction</CardTitle>
                <CardDescription className="text-base md:text-lg mt-1">
                  Converting decimal {decimal} to its equivalent fraction
                </CardDescription>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                      {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{copied ? "Copied!" : "Copy result"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center">
              {/* Decimal representation */}
              <motion.div
                className="text-center"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-lg font-medium text-muted-foreground mb-1">Decimal</div>
                <div className="text-3xl md:text-4xl font-bold">{decimal}</div>
                <Badge variant={isTerminating ? "outline" : "secondary"} className="mt-2">
                  {isTerminating ? "Terminating" : "Repeating"}
                </Badge>
              </motion.div>

              {/* Arrow animation */}
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                className="hidden md:block"
              >
                <ArrowRight className="h-8 w-8 text-muted-foreground" />
              </motion.div>

              {/* Fraction representation */}
              <motion.div
                className="text-center"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="text-lg font-medium text-muted-foreground mb-1">Fraction</div>
                <Fraction numerator={numerator} denominator={denominator} className="text-3xl md:text-4xl font-bold" />
              </motion.div>

              {/* Arrow animation */}
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                className="hidden md:block"
              >
                <ArrowRight className="h-8 w-8 text-muted-foreground" />
              </motion.div>

              {/* Simplified fraction */}
              <motion.div
                className="text-center"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="text-lg font-medium text-muted-foreground mb-1">Simplified</div>
                <Fraction
                  numerator={simplified.numerator}
                  denominator={simplified.denominator}
                  className="text-3xl md:text-4xl font-bold"
                />
                <Badge variant="outline" className="mt-2 bg-green-50 text-green-700 border-green-200">
                  Simplest Form
                </Badge>
              </motion.div>
            </div>

            {/* Mixed number representation if applicable */}
            {mixed && (
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="text-lg font-medium text-muted-foreground mb-1">Mixed Number</div>
                <div className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-2">
                  <span>{mixed.whole}</span>
                  <Fraction numerator={mixed.numerator} denominator={mixed.denominator} />
                </div>
              </motion.div>
            )}

            {/* Accuracy indicator */}
            <div className="mt-6 flex justify-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Info className="h-4 w-4" />
                      <span>Accuracy: {accuracy.toFixed(8)}%</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>How closely the fraction approximates the decimal value</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardContent>

          <div className="border-t px-4">
            <div className="flex overflow-x-auto scrollbar-hide">
              <Button
                variant="ghost"
                className={cn(
                  "flex-1 rounded-none border-b-2 border-transparent px-4 py-2",
                  activeTab === "fraction" && "border-primary",
                )}
                onClick={() => setActiveTab("fraction")}
              >
                Fraction Details
              </Button>
              <Button
                variant="ghost"
                className={cn(
                  "flex-1 rounded-none border-b-2 border-transparent px-4 py-2",
                  activeTab === "steps" && "border-primary",
                )}
                onClick={() => setActiveTab("steps")}
              >
                Step-by-Step
              </Button>
              <Button
                variant="ghost"
                className={cn(
                  "flex-1 rounded-none border-b-2 border-transparent px-4 py-2",
                  activeTab === "applications" && "border-primary",
                )}
                onClick={() => setActiveTab("applications")}
              >
                Real-World Uses
              </Button>
            </div>
          </div>

          <CardContent className="pt-6">
            {activeTab === "fraction" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Fraction Properties</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Type:</span>
                        <span className="font-medium">{isTerminating ? "Terminating" : "Repeating"} Decimal</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Decimal Places:</span>
                        <span className="font-medium">{decimalLength}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Reduced:</span>
                        <span className="font-medium">
                          {simplified.numerator === numerator && simplified.denominator === denominator
                            ? "Already in lowest form"
                            : "Reduced from original"}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Decimal Value:</span>
                        <span className="font-medium">
                          {(simplified.numerator / simplified.denominator).toFixed(8)}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Equivalent Forms</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Percentage:</span>
                        <span className="font-medium">{(decimalValue * 100).toFixed(4)}%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Ratio:</span>
                        <span className="font-medium">
                          {simplified.numerator} : {simplified.denominator}
                        </span>
                      </li>
                      {mixed && (
                        <li className="flex justify-between">
                          <span>Mixed Number:</span>
                          <span className="font-medium">
                            {mixed.whole} {mixed.numerator}/{mixed.denominator}
                          </span>
                        </li>
                      )}
                      <li className="flex justify-between">
                        <span>Scientific Notation:</span>
                        <span className="font-medium">{decimalValue.toExponential(4)}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {equivalentDecimals && equivalentDecimals.length > 0 && (
                  <div className="bg-muted/50 p-4 rounded-lg mt-4">
                    <h3 className="font-medium mb-2">Similar Decimal to Fraction Conversions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {equivalentDecimals.map((eq, index) => (
                        <Link
                          href={`/decimal-to-fraction/${eq}`}
                          key={index}
                          className="text-sm px-3 py-1.5 bg-background rounded border hover:bg-muted transition-colors"
                        >
                          {eq}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "steps" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-4">Converting {decimal} to a Fraction: Step-by-Step</h3>
                  <ol className="space-y-4 relative before:absolute before:left-3 before:top-2 before:h-[calc(100%-16px)] before:w-[1px] before:bg-border">
                    {steps.map((step, index) => (
                      <motion.li
                        key={index}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="pl-10 relative"
                      >
                        <span className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                          {index + 1}
                        </span>
                        <div className="space-y-1">
                          <p className="font-medium">{step.title}</p>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                          {step.math && (
                            <div className="bg-background p-2 rounded border mt-2 font-mono text-sm overflow-x-auto">
                              {step.math}
                            </div>
                          )}
                        </div>
                      </motion.li>
                    ))}
                  </ol>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Key Concepts</h3>
                  <ul className="space-y-2 text-sm list-disc pl-5">
                    <li>Terminating decimals can be written as fractions with denominators that are powers of 10.</li>
                    <li>Repeating decimals require algebraic manipulation to convert to fractions.</li>
                    <li>
                      All fractions should be simplified by dividing both numerator and denominator by their greatest
                      common divisor (GCD).
                    </li>
                    <li>Mixed numbers combine a whole number with a proper fraction.</li>
                  </ul>
                </div>
              </motion.div>
            )}

            {activeTab === "applications" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Real-World Applications</h3>
                  <ul className="space-y-3">
                    {applications.map((app, index) => (
                      <li key={index} className="flex gap-3">
                        <div className="mt-0.5 text-primary">
                          <app.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{app.title}</p>
                          <p className="text-sm text-muted-foreground">{app.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Why This Matters</h3>
                  <p className="text-sm text-muted-foreground">
                    Converting between decimals and fractions is essential in many fields including engineering,
                    finance, cooking, construction, and science. Fractions often provide more precise measurements and
                    can be easier to work with in certain calculations. Understanding this conversion helps in everyday
                    problem-solving and mathematical reasoning.
                  </p>
                </div>
              </motion.div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-4">
            <div className="text-sm text-muted-foreground">Need to convert another decimal?</div>
            <Link href="/decimal-to-fraction">
              <Button variant="outline" size="sm">
                <Calculator className="mr-2 h-4 w-4" />
                Decimal to Fraction Calculator
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Related conversions */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Related Conversions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link href="/fractions/mixed-numbers" className="block">
            <Card className="h-full hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="text-lg">Mixed Numbers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Convert between improper fractions and mixed numbers.</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/fractions/simplify-fractions" className="block">
            <Card className="h-full hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="text-lg">Simplify Fractions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Reduce fractions to their simplest form.</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/fractions/fraction-to-decimal" className="block">
            <Card className="h-full hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="text-lg">Fraction to Decimal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Convert fractions to their decimal equivalents.</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Mobile floating action button */}
      <div className="md:hidden fixed bottom-6 right-6 z-10">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" className="h-12 w-12 rounded-full shadow-lg" onClick={copyToClipboard}>
                {copied ? <Check className="h-6 w-6" /> : <Share2 className="h-6 w-6" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{copied ? "Copied!" : "Share result"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}

// Helper function to generate step-by-step solution
function getConversionSteps(
  decimal: string,
  numerator: number,
  denominator: number,
  simplified: { numerator: number; denominator: number },
) {
  const steps = []
  const decimalValue = Number.parseFloat(decimal)
  const isRepeating = decimal.includes("...")

  if (isRepeating) {
    // For repeating decimals
    const cleanDecimal = decimal.replace("...", "")
    const decimalParts = cleanDecimal.split(".")
    const integerPart = decimalParts[0]
    const repeatingPart = decimalParts[1]

    steps.push({
      title: "Identify the repeating decimal pattern",
      description: `The decimal ${decimal} has a repeating pattern of digits.`,
      math: `${decimal} = ${integerPart}.\\overline{${repeatingPart}}`,
    })

    steps.push({
      title: "Set up an algebraic equation",
      description:
        "Let x be the decimal value, then multiply by an appropriate power of 10 to align the repeating digits.",
      math: `Let\\ x = ${decimal}\n10^n \\times x = integer + x`,
    })

    steps.push({
      title: "Solve for x to find the fraction",
      description: "Subtract the equations and solve for x to get the fraction form.",
      math: `x = \\frac{numerator}{denominator} = \\frac{${numerator}}{${denominator}}`,
    })
  } else {
    // For terminating decimals
    const decimalParts = decimal.split(".")
    const decimalPlaces = decimalParts[1] ? decimalParts[1].length : 0

    steps.push({
      title: "Identify the decimal places",
      description: `The decimal ${decimal} has ${decimalPlaces} decimal places.`,
      math: `${decimal} = ${decimalParts[0]}.${decimalParts[1] || "0"}`,
    })

    steps.push({
      title: "Convert to fraction with denominator as power of 10",
      description: `Multiply by 10^${decimalPlaces} to move the decimal point.`,
      math: `${decimal} = \\frac{${decimal} \\times 10^${decimalPlaces}}{10^${decimalPlaces}} = \\frac{${numerator}}{${denominator}}`,
    })
  }

  // Add simplification step if needed
  if (simplified.numerator !== numerator || simplified.denominator !== denominator) {
    const gcdValue = gcd(numerator, denominator)
    steps.push({
      title: "Simplify the fraction",
      description: `Divide both numerator and denominator by their greatest common divisor (GCD) of ${gcdValue}.`,
      math: `\\frac{${numerator}}{${denominator}} = \\frac{${numerator} ÷ ${gcdValue}}{${denominator} ÷ ${gcdValue}} = \\frac{${simplified.numerator}}{${simplified.denominator}}`,
    })
  } else {
    steps.push({
      title: "Verify the fraction is in simplest form",
      description:
        "The fraction is already in its simplest form as the numerator and denominator have no common factors.",
      math: `\\frac{${numerator}}{${denominator}} = \\frac{${simplified.numerator}}{${simplified.denominator}}`,
    })
  }

  return steps
}

// Helper function to get real-world applications based on the decimal value
function getRealWorldApplications(decimalValue: number) {
  const applications = []

  // Common fractions and their applications
  if (Math.abs(decimalValue - 0.25) < 0.01) {
    applications.push({
      icon: Calculator,
      title: "Quarter/Fourth",
      description:
        "Used in measurements, cooking (¼ cup), time (quarter hour), and financial contexts (quarter of a dollar).",
    })
  } else if (Math.abs(decimalValue - 0.5) < 0.01) {
    applications.push({
      icon: Calculator,
      title: "Half",
      description: "Common in recipes (half cup), time measurements (half hour), and equal divisions of items.",
    })
  } else if (Math.abs(decimalValue - 0.33) < 0.01 || Math.abs(decimalValue - 0.67) < 0.01) {
    applications.push({
      icon: Calculator,
      title: "Thirds",
      description: "Used in cooking, dividing items among three people, and certain musical time signatures.",
    })
  } else if (Math.abs(decimalValue - 0.75) < 0.01) {
    applications.push({
      icon: Calculator,
      title: "Three-quarters",
      description: "Common in recipes, time (three-quarter hour), and measurements in various fields.",
    })
  }

  // General applications
  applications.push({
    icon: Calculator,
    title: "Precision Measurements",
    description: `The fraction equivalent of ${decimalValue} is useful in engineering and scientific measurements where precision is required.`,
  })

  if (decimalValue < 1) {
    applications.push({
      icon: Calculator,
      title: "Cooking and Baking",
      description: "Fractions are commonly used in recipes for ingredient measurements.",
    })
  }

  applications.push({
    icon: Calculator,
    title: "Construction and Carpentry",
    description: "Fractions are essential for precise measurements in building and woodworking.",
  })

  if (decimalValue > 0 && decimalValue < 1) {
    applications.push({
      icon: Calculator,
      title: "Financial Calculations",
      description: `This value (${(decimalValue * 100).toFixed(2)}%) could represent interest rates, discounts, or tax rates in financial contexts.`,
    })
  }

  return applications
}
