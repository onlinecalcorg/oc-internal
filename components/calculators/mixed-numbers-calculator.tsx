"use client"

import { useState, useMemo } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Fraction, MixedFraction } from "@/components/ui/fraction"
import { ArrowRight, Loader2, CheckCircle2, ArrowRightCircle, Plus, Minus, X, Divide } from "lucide-react"
import { cn } from "@/lib/utils"

// Schema for mixed number operations
const mixedNumberOperationSchema = z.object({
  wholeNumber1: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Whole number must be a valid number",
  }),
  numerator1: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Numerator must be a non-negative number",
  }),
  denominator1: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Denominator must be a positive number",
  }),
  wholeNumber2: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Whole number must be a valid number",
  }),
  numerator2: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Numerator must be a non-negative number",
  }),
  denominator2: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Denominator must be a positive number",
  }),
})

// Schema for mixed to improper conversion
const mixedToImproperSchema = z.object({
  wholeNumber: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Whole number must be a valid number",
  }),
  numerator: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Numerator must be a non-negative number",
  }),
  denominator: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Denominator must be a positive number",
  }),
})

// Schema for improper to mixed conversion
const improperToMixedSchema = z.object({
  numerator: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Numerator must be a valid number",
  }),
  denominator: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Denominator must be a positive number",
  }),
})

// Function to find the greatest common divisor (GCD)
function gcd(a: number, b: number): number {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b) {
    const t = b
    b = a % b
    a = t
  }
  return a
}

// Function to find the least common multiple (LCM)
function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b)
}

// Function to convert mixed number to improper fraction
function mixedToImproper(
  wholeNumber: number,
  numerator: number,
  denominator: number,
): { numerator: number; denominator: number } {
  const sign = wholeNumber < 0 ? -1 : 1
  const absWholeNumber = Math.abs(wholeNumber)
  const improperNumerator = sign * (absWholeNumber * denominator + numerator)
  return { numerator: improperNumerator, denominator }
}

// Function to convert improper fraction to mixed number
function improperToMixed(
  numerator: number,
  denominator: number,
): { wholeNumber: number; numerator: number; denominator: number } {
  const sign = numerator < 0 ? -1 : 1
  const absNumerator = Math.abs(numerator)
  const wholeNumber = sign * Math.floor(absNumerator / denominator)
  const remainingNumerator = absNumerator % denominator
  return { wholeNumber, numerator: remainingNumerator, denominator }
}

// Function to simplify a fraction
function simplifyFraction(numerator: number, denominator: number): { numerator: number; denominator: number } {
  const divisor = gcd(numerator, denominator)
  return { numerator: numerator / divisor, denominator: denominator / divisor }
}

// Function to add two fractions
function addFractions(
  numerator1: number,
  denominator1: number,
  numerator2: number,
  denominator2: number,
): { numerator: number; denominator: number } {
  const commonDenominator = lcm(denominator1, denominator2)
  const adjustedNumerator1 = numerator1 * (commonDenominator / denominator1)
  const adjustedNumerator2 = numerator2 * (commonDenominator / denominator2)
  const sumNumerator = adjustedNumerator1 + adjustedNumerator2
  return simplifyFraction(sumNumerator, commonDenominator)
}

// Function to subtract two fractions
function subtractFractions(
  numerator1: number,
  denominator1: number,
  numerator2: number,
  denominator2: number,
): { numerator: number; denominator: number } {
  const commonDenominator = lcm(denominator1, denominator2)
  const adjustedNumerator1 = numerator1 * (commonDenominator / denominator1)
  const adjustedNumerator2 = numerator2 * (commonDenominator / denominator2)
  const diffNumerator = adjustedNumerator1 - adjustedNumerator2
  return simplifyFraction(diffNumerator, commonDenominator)
}

// Function to multiply two fractions
function multiplyFractions(
  numerator1: number,
  denominator1: number,
  numerator2: number,
  denominator2: number,
): { numerator: number; denominator: number } {
  const resultNumerator = numerator1 * numerator2
  const resultDenominator = denominator1 * denominator2
  return simplifyFraction(resultNumerator, resultDenominator)
}

// Function to divide two fractions
function divideFractions(
  numerator1: number,
  denominator1: number,
  numerator2: number,
  denominator2: number,
): { numerator: number; denominator: number } {
  // To divide, multiply by the reciprocal
  const resultNumerator = numerator1 * denominator2
  const resultDenominator = denominator1 * numerator2
  return simplifyFraction(resultNumerator, resultDenominator)
}

export function MixedNumbersCalculator() {
  const [activeTab, setActiveTab] = useState("operations")
  const [activeOperation, setActiveOperation] = useState("add")
  const [operationResult, setOperationResult] = useState<{
    result: { wholeNumber: number; numerator: number; denominator: number }
    improperResult: { numerator: number; denominator: number }
    steps: string[]
    latexSteps: string[]
  } | null>(null)

  const [mixedToImproperResult, setMixedToImproperResult] = useState<{
    improperNumerator: number
    denominator: number
    steps: string[]
    latexSteps: string[]
  } | null>(null)

  const [improperToMixedResult, setImproperToMixedResult] = useState<{
    wholeNumber: number
    numerator: number
    denominator: number
    steps: string[]
    latexSteps: string[]
  } | null>(null)

  const [isCalculating, setIsCalculating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form for mixed number operations
  const operationForm = useForm<z.infer<typeof mixedNumberOperationSchema>>({
    resolver: zodResolver(mixedNumberOperationSchema),
    defaultValues: {
      wholeNumber1: "1",
      numerator1: "2",
      denominator1: "3",
      wholeNumber2: "2",
      numerator2: "1",
      denominator2: "4",
    },
  })

  // Form for mixed to improper conversion
  const mixedToImproperForm = useForm<z.infer<typeof mixedToImproperSchema>>({
    resolver: zodResolver(mixedToImproperSchema),
    defaultValues: {
      wholeNumber: "2",
      numerator: "3",
      denominator: "4",
    },
  })

  // Form for improper to mixed conversion
  const improperToMixedForm = useForm<z.infer<typeof improperToMixedSchema>>({
    resolver: zodResolver(improperToMixedSchema),
    defaultValues: {
      numerator: "11",
      denominator: "4",
    },
  })

  // Handle mixed number operations
  function onOperationSubmit(values: z.infer<typeof mixedNumberOperationSchema>) {
    setError(null)
    setIsCalculating(true)

    try {
      // Convert mixed numbers to improper fractions
      const improper1 = mixedToImproper(
        Number(values.wholeNumber1),
        Number(values.numerator1),
        Number(values.denominator1),
      )
      const improper2 = mixedToImproper(
        Number(values.wholeNumber2),
        Number(values.numerator2),
        Number(values.denominator2),
      )

      let resultFraction
      let operationSymbol = ""
      let operationName = ""
      let latexSteps: string[] = []

      // Perform the selected operation
      switch (activeOperation) {
        case "add":
          resultFraction = addFractions(
            improper1.numerator,
            improper1.denominator,
            improper2.numerator,
            improper2.denominator,
          )
          operationSymbol = "+"
          operationName = "Addition"
          latexSteps = [
            `\\text{Step 1: Convert mixed numbers to improper fractions}`,
            `${values.wholeNumber1}\\frac{${values.numerator1}}{${values.denominator1}} = \\frac{${improper1.numerator}}{${improper1.denominator}}`,
            `${values.wholeNumber2}\\frac{${values.numerator2}}{${values.denominator2}} = \\frac{${improper2.numerator}}{${improper2.denominator}}`,
            `\\text{Step 2: Find the least common multiple (LCM) of the denominators}`,
            `\\text{LCM of ${improper1.denominator} and ${improper2.denominator} is ${lcm(improper1.denominator, improper2.denominator)}}`,
            `\\text{Step 3: Convert fractions to equivalent fractions with the common denominator}`,
            `\\frac{${improper1.numerator}}{${improper1.denominator}} = \\frac{${improper1.numerator * (lcm(improper1.denominator, improper2.denominator) / improper1.denominator)}}{${lcm(improper1.denominator, improper2.denominator)}}`,
            `\\frac{${improper2.numerator}}{${improper2.denominator}} = \\frac{${improper2.numerator * (lcm(improper1.denominator, improper2.denominator) / improper2.denominator)}}{${lcm(improper1.denominator, improper2.denominator)}}`,
            `\\text{Step 4: Add the numerators}`,
            `\\frac{${improper1.numerator * (lcm(improper1.denominator, improper2.denominator) / improper1.denominator)}}{${lcm(improper1.denominator, improper2.denominator)}} + \\frac{${improper2.numerator * (lcm(improper1.denominator, improper2.denominator) / improper2.denominator)}}{${lcm(improper1.denominator, improper2.denominator)}} = \\frac{${improper1.numerator * (lcm(improper1.denominator, improper2.denominator) / improper1.denominator) + improper2.numerator * (lcm(improper1.denominator, improper2.denominator) / improper2.denominator)}}{${lcm(improper1.denominator, improper2.denominator)}}`,
            `\\text{Step 5: Simplify the fraction}`,
            `\\frac{${improper1.numerator * (lcm(improper1.denominator, improper2.denominator) / improper1.denominator) + improper2.numerator * (lcm(improper1.denominator, improper2.denominator) / improper2.denominator)}}{${lcm(improper1.denominator, improper2.denominator)}} = \\frac{${resultFraction.numerator}}{${resultFraction.denominator}}`,
          ]
          break
        case "subtract":
          resultFraction = subtractFractions(
            improper1.numerator,
            improper1.denominator,
            improper2.numerator,
            improper2.denominator,
          )
          operationSymbol = "-"
          operationName = "Subtraction"
          latexSteps = [
            `\\text{Step 1: Convert mixed numbers to improper fractions}`,
            `${values.wholeNumber1}\\frac{${values.numerator1}}{${values.denominator1}} = \\frac{${improper1.numerator}}{${improper1.denominator}}`,
            `${values.wholeNumber2}\\frac{${values.numerator2}}{${values.denominator2}} = \\frac{${improper2.numerator}}{${improper2.denominator}}`,
            `\\text{Step 2: Find the least common multiple (LCM) of the denominators}`,
            `\\text{LCM of ${improper1.denominator} and ${improper2.denominator} is ${lcm(improper1.denominator, improper2.denominator)}}`,
            `\\text{Step 3: Convert fractions to equivalent fractions with the common denominator}`,
            `\\frac{${improper1.numerator}}{${improper1.denominator}} = \\frac{${improper1.numerator * (lcm(improper1.denominator, improper2.denominator) / improper1.denominator)}}{${lcm(improper1.denominator, improper2.denominator)}}`,
            `\\frac{${improper2.numerator}}{${improper2.denominator}} = \\frac{${improper2.numerator * (lcm(improper1.denominator, improper2.denominator) / improper2.denominator)}}{${lcm(improper1.denominator, improper2.denominator)}}`,
            `\\text{Step 4: Subtract the numerators}`,
            `\\frac{${improper1.numerator * (lcm(improper1.denominator, improper2.denominator) / improper1.denominator)}}{${lcm(improper1.denominator, improper2.denominator)}} - \\frac{${improper2.numerator * (lcm(improper1.denominator, improper2.denominator) / improper2.denominator)}}{${lcm(improper1.denominator, improper2.denominator)}} = \\frac{${improper1.numerator * (lcm(improper1.denominator, improper2.denominator) / improper1.denominator) - improper2.numerator * (lcm(improper1.denominator, improper2.denominator) / improper2.denominator)}}{${lcm(improper1.denominator, improper2.denominator)}}`,
            `\\text{Step 5: Simplify the fraction}`,
            `\\frac{${improper1.numerator * (lcm(improper1.denominator, improper2.denominator) / improper1.denominator) - improper2.numerator * (lcm(improper1.denominator, improper2.denominator) / improper2.denominator)}}{${lcm(improper1.denominator, improper2.denominator)}} = \\frac{${resultFraction.numerator}}{${resultFraction.denominator}}`,
          ]
          break
        case "multiply":
          resultFraction = multiplyFractions(
            improper1.numerator,
            improper1.denominator,
            improper2.numerator,
            improper2.denominator,
          )
          operationSymbol = "×"
          operationName = "Multiplication"
          latexSteps = [
            `\\text{Step 1: Convert mixed numbers to improper fractions}`,
            `${values.wholeNumber1}\\frac{${values.numerator1}}{${values.denominator1}} = \\frac{${improper1.numerator}}{${improper1.denominator}}`,
            `${values.wholeNumber2}\\frac{${values.numerator2}}{${values.denominator2}} = \\frac{${improper2.numerator}}{${improper2.denominator}}`,
            `\\text{Step 2: Multiply the numerators}`,
            `\\text{Numerator: ${improper1.numerator} × ${improper2.numerator} = ${improper1.numerator * improper2.numerator}}`,
            `\\text{Step 3: Multiply the denominators}`,
            `\\text{Denominator: ${improper1.denominator} × ${improper2.denominator} = ${improper1.denominator * improper2.denominator}}`,
            `\\text{Step 4: Simplify the fraction}`,
            `\\frac{${improper1.numerator * improper2.numerator}}{${improper1.denominator * improper2.denominator}} = \\frac{${resultFraction.numerator}}{${resultFraction.denominator}}`,
          ]
          break
        case "divide":
          resultFraction = divideFractions(
            improper1.numerator,
            improper1.denominator,
            improper2.numerator,
            improper2.denominator,
          )
          operationSymbol = "÷"
          operationName = "Division"
          latexSteps = [
            `\\text{Step 1: Convert mixed numbers to improper fractions}`,
            `${values.wholeNumber1}\\frac{${values.numerator1}}{${values.denominator1}} = \\frac{${improper1.numerator}}{${improper1.denominator}}`,
            `${values.wholeNumber2}\\frac{${values.numerator2}}{${values.denominator2}} = \\frac{${improper2.numerator}}{${improper2.denominator}}`,
            `\\text{Step 2: Multiply by the reciprocal of the second fraction}`,
            `\\frac{${improper1.numerator}}{${improper1.denominator}} ÷ \\frac{${improper2.numerator}}{${improper2.denominator}} = \\frac{${improper1.numerator}}{${improper1.denominator}} × \\frac{${improper2.denominator}}{${improper2.numerator}}`,
            `\\text{Step 3: Multiply the numerators and denominators}`,
            `\\frac{${improper1.numerator}}{${improper1.denominator}} × \\frac{${improper2.denominator}}{${improper2.numerator}} = \\frac{${improper1.numerator * improper2.denominator}}{${improper1.denominator * improper2.numerator}}`,
            `\\text{Step 4: Simplify the fraction}`,
            `\\frac{${improper1.numerator * improper2.denominator}}{${improper1.denominator * improper2.numerator}} = \\frac{${resultFraction.numerator}}{${resultFraction.denominator}}`,
          ]
          break
        default:
          throw new Error("Invalid operation")
      }

      // Convert the result back to a mixed number
      const mixedResult = improperToMixed(resultFraction.numerator, resultFraction.denominator)

      // Create steps for the calculation
      const steps = [
        `Step 1: Convert mixed numbers to improper fractions.`,
        `${values.wholeNumber1} ${values.numerator1}/${values.denominator1} = ${improper1.numerator}/${improper1.denominator}`,
        `${values.wholeNumber2} ${values.numerator2}/${values.denominator2} = ${improper2.numerator}/${improper2.denominator}`,
        `Step 2: Perform the ${operationName.toLowerCase()} operation.`,
        `${improper1.numerator}/${improper1.denominator} ${operationSymbol} ${improper2.numerator}/${improper2.denominator} = ${resultFraction.numerator}/${resultFraction.denominator}`,
        `Step 3: Convert the improper fraction to a mixed number.`,
        `${resultFraction.numerator}/${resultFraction.denominator} = ${mixedResult.wholeNumber} ${mixedResult.numerator}/${mixedResult.denominator}`,
      ]

      // Simulate a calculation delay for better UX
      setTimeout(() => {
        setOperationResult({
          result: mixedResult,
          improperResult: resultFraction,
          steps,
          latexSteps,
        })
        setIsCalculating(false)
      }, 500)
    } catch (err) {
      setError("An error occurred during calculation. Please check your inputs.")
      setIsCalculating(false)
    }
  }

  function onMixedToImproperSubmit(values: z.infer<typeof mixedToImproperSchema>) {
    setError(null)
    setIsCalculating(true)

    try {
      const wholeNumber = Number(values.wholeNumber)
      const numerator = Number(values.numerator)
      const denominator = Number(values.denominator)

      const improperNumerator = wholeNumber * denominator + numerator

      const steps = [
        `Step 1: Multiply the whole number (${wholeNumber}) by the denominator (${denominator}).`,
        `${wholeNumber} × ${denominator} = ${wholeNumber * denominator}`,
        `Step 2: Add the result to the numerator (${numerator}).`,
        `${wholeNumber * denominator} + ${numerator} = ${improperNumerator}`,
        `Step 3: Keep the same denominator (${denominator}).`,
        `Step 4: The improper fraction is ${improperNumerator}/${denominator}.`,
      ]

      const latexSteps = [
        `\\text{Step 1: Multiply the whole number by the denominator}`,
        `${wholeNumber} × ${denominator} = ${wholeNumber * denominator}`,
        `\\text{Step 2: Add the result to the numerator}`,
        `${wholeNumber * denominator} + ${numerator} = ${improperNumerator}`,
        `\\text{Step 3: Keep the same denominator}`,
        `\\text{The improper fraction is } \\frac{${improperNumerator}}{${denominator}}`,
      ]

      // Simulate a calculation delay for better UX
      setTimeout(() => {
        setMixedToImproperResult({
          improperNumerator,
          denominator,
          steps,
          latexSteps,
        })
        setIsCalculating(false)
      }, 500)
    } catch (err) {
      setError("An error occurred during calculation. Please check your inputs.")
      setIsCalculating(false)
    }
  }

  function onImproperToMixedSubmit(values: z.infer<typeof improperToMixedSchema>) {
    setError(null)
    setIsCalculating(true)

    try {
      const numerator = Number(values.numerator)
      const denominator = Number(values.denominator)

      const wholeNumber = Math.floor(numerator / denominator)
      const remainingNumerator = numerator % denominator

      const steps = [
        `Step 1: Divide the numerator (${numerator}) by the denominator (${denominator}).`,
        `${numerator} ÷ ${denominator} = ${wholeNumber} with a remainder of ${remainingNumerator}`,
        `Step 2: The whole number part is ${wholeNumber}.`,
        `Step 3: The remainder (${remainingNumerator}) becomes the new numerator.`,
        `Step 4: Keep the same denominator (${denominator}).`,
        `Step 5: The mixed number is ${wholeNumber} ${remainingNumerator}/${denominator}.`,
      ]

      const latexSteps = [
        `\\text{Step 1: Divide the numerator by the denominator}`,
        `${numerator} ÷ ${denominator} = ${wholeNumber} \\text{ with a remainder of } ${remainingNumerator}`,
        `\\text{Step 2: The whole number part is } ${wholeNumber}`,
        `\\text{Step 3: The remainder becomes the new numerator}`,
        `\\text{Step 4: Keep the same denominator}`,
        `\\text{The mixed number is } ${wholeNumber}\\frac{${remainingNumerator}}{${denominator}}`,
      ]

      // Simulate a calculation delay for better UX
      setTimeout(() => {
        setImproperToMixedResult({
          wholeNumber,
          numerator: remainingNumerator,
          denominator,
          steps,
          latexSteps,
        })
        setIsCalculating(false)
      }, 500)
    } catch (err) {
      setError("An error occurred during calculation. Please check your inputs.")
      setIsCalculating(false)
    }
  }

  // Get operation icon based on active operation
  const getOperationIcon = useMemo(() => {
    switch (activeOperation) {
      case "add":
        return <Plus className="h-5 w-5" />
      case "subtract":
        return <Minus className="h-5 w-5" />
      case "multiply":
        return <X className="h-5 w-5" />
      case "divide":
        return <Divide className="h-5 w-5" />
      default:
        return <Plus className="h-5 w-5" />
    }
  }, [activeOperation])

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">What is a Mixed Number?</h2>
        <p className="text-gray-700 mb-4">
          A mixed number is a combination of a whole number and a proper fraction. For example, 2 3/4 represents 2 whole
          units plus 3/4 of a unit.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-4 rounded-md shadow-sm border border-blue-100">
            <h3 className="font-medium text-blue-700 mb-2">Mixed Number Format</h3>
            <p className="text-gray-600">
              Enter mixed numbers as <span className="font-mono bg-gray-100 px-1 rounded">2 3/4</span> (whole number,
              space, numerator/denominator)
            </p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm border border-blue-100">
            <h3 className="font-medium text-blue-700 mb-2">Improper Fraction Format</h3>
            <p className="text-gray-600">
              Enter improper fractions as <span className="font-mono bg-gray-100 px-1 rounded">11/4</span>{" "}
              (numerator/denominator)
            </p>
          </div>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value)
          setOperationResult(null)
          setMixedToImproperResult(null)
          setImproperToMixedResult(null)
          setError(null)
        }}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="operations">Mixed Number Operations</TabsTrigger>
          <TabsTrigger value="mixed-to-improper">Mixed to Improper</TabsTrigger>
          <TabsTrigger value="improper-to-mixed">Improper to Mixed</TabsTrigger>
        </TabsList>

        <TabsContent value="operations" className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Mixed Number Operations</CardTitle>
                  <CardDescription>Perform operations on mixed numbers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant={activeOperation === "add" ? "default" : "outline"}
                        onClick={() => setActiveOperation("add")}
                        className={cn(
                          "flex-1",
                          activeOperation === "add" ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-blue-50",
                        )}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                      <Button
                        variant={activeOperation === "subtract" ? "default" : "outline"}
                        onClick={() => setActiveOperation("subtract")}
                        className={cn(
                          "flex-1",
                          activeOperation === "subtract" ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-blue-50",
                        )}
                      >
                        <Minus className="h-4 w-4 mr-2" />
                        Subtract
                      </Button>
                      <Button
                        variant={activeOperation === "multiply" ? "default" : "outline"}
                        onClick={() => setActiveOperation("multiply")}
                        className={cn(
                          "flex-1",
                          activeOperation === "multiply" ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-blue-50",
                        )}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Multiply
                      </Button>
                      <Button
                        variant={activeOperation === "divide" ? "default" : "outline"}
                        onClick={() => setActiveOperation("divide")}
                        className={cn(
                          "flex-1",
                          activeOperation === "divide" ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-blue-50",
                        )}
                      >
                        <Divide className="h-4 w-4 mr-2" />
                        Divide
                      </Button>
                    </div>
                  </div>

                  <Form {...operationForm}>
                    <form onSubmit={operationForm.handleSubmit(onOperationSubmit)} className="space-y-6">
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-3 rounded-md">
                          <h3 className="font-medium text-blue-700 mb-2">First Mixed Number</h3>
                          <div className="grid grid-cols-3 gap-2">
                            <FormField
                              control={operationForm.control}
                              name="wholeNumber1"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Whole</FormLabel>
                                  <FormControl>
                                    <Input placeholder="1" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={operationForm.control}
                              name="numerator1"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Numerator</FormLabel>
                                  <FormControl>
                                    <Input placeholder="2" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={operationForm.control}
                              name="denominator1"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Denominator</FormLabel>
                                  <FormControl>
                                    <Input placeholder="3" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        <div className="flex justify-center items-center">
                          <div className="bg-blue-100 rounded-full p-2">{getOperationIcon}</div>
                        </div>

                        <div className="bg-indigo-50 p-3 rounded-md">
                          <h3 className="font-medium text-indigo-700 mb-2">Second Mixed Number</h3>
                          <div className="grid grid-cols-3 gap-2">
                            <FormField
                              control={operationForm.control}
                              name="wholeNumber2"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Whole</FormLabel>
                                  <FormControl>
                                    <Input placeholder="2" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={operationForm.control}
                              name="numerator2"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Numerator</FormLabel>
                                  <FormControl>
                                    <Input placeholder="1" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={operationForm.control}
                              name="denominator2"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Denominator</FormLabel>
                                  <FormControl>
                                    <Input placeholder="4" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </div>

                      <Button type="submit" className="w-full" disabled={isCalculating}>
                        {isCalculating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Calculating...
                          </>
                        ) : (
                          "Calculate"
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            <div>
              {operationResult && (
                <Card>
                  <CardHeader>
                    <CardTitle>Result</CardTitle>
                    <CardDescription>
                      The result of the{" "}
                      {activeOperation === "add"
                        ? "addition"
                        : activeOperation === "subtract"
                          ? "subtraction"
                          : activeOperation === "multiply"
                            ? "multiplication"
                            : "division"}{" "}
                      operation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center gap-6">
                        <div className="text-xl">
                          <MixedFraction
                            wholeNumber={operationForm.getValues().wholeNumber1}
                            numerator={operationForm.getValues().numerator1}
                            denominator={operationForm.getValues().denominator1}
                            size="xl"
                          />
                        </div>
                        <div className="text-xl">{getOperationIcon}</div>
                        <div className="text-xl">
                          <MixedFraction
                            wholeNumber={operationForm.getValues().wholeNumber2}
                            numerator={operationForm.getValues().numerator2}
                            denominator={operationForm.getValues().denominator2}
                            size="xl"
                          />
                        </div>
                        <ArrowRight className="h-6 w-6" />
                        <div className="text-xl font-bold">
                          {operationResult.result.wholeNumber === 0 && operationResult.result.numerator === 0 ? (
                            <span className="text-xl">0</span>
                          ) : operationResult.result.numerator === 0 ? (
                            <span className="text-xl">{operationResult.result.wholeNumber}</span>
                          ) : operationResult.result.wholeNumber === 0 ? (
                            <Fraction
                              numerator={operationResult.result.numerator}
                              denominator={operationResult.result.denominator}
                              size="xl"
                              color="accent"
                            />
                          ) : (
                            <MixedFraction
                              wholeNumber={operationResult.result.wholeNumber}
                              numerator={operationResult.result.numerator}
                              denominator={operationResult.result.denominator}
                              size="xl"
                              color="accent"
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
                      <h4 className="font-semibold mb-4 text-blue-800 flex items-center">
                        <CheckCircle2 className="h-5 w-5 mr-2" />
                        Step-by-Step Solution:
                      </h4>
                      <ol className="space-y-4">
                        <li className="bg-white p-3 rounded-md shadow-sm border-l-4 border-blue-500 flex items-start">
                          <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                            1
                          </span>
                          <div>
                            <p className="font-medium text-gray-800">Convert mixed numbers to improper fractions</p>
                            <div className="mt-2 text-gray-600 flex flex-col gap-1">
                              <div>
                                {operationForm.getValues().wholeNumber1} {operationForm.getValues().numerator1}/
                                {operationForm.getValues().denominator1} ={" "}
                                {Number(operationForm.getValues().wholeNumber1) *
                                  Number(operationForm.getValues().denominator1) +
                                  Number(operationForm.getValues().numerator1)}
                                /{operationForm.getValues().denominator1}
                              </div>
                              <div>
                                {operationForm.getValues().wholeNumber2} {operationForm.getValues().numerator2}/
                                {operationForm.getValues().denominator2} ={" "}
                                {Number(operationForm.getValues().wholeNumber2) *
                                  Number(operationForm.getValues().denominator2) +
                                  Number(operationForm.getValues().numerator2)}
                                /{operationForm.getValues().denominator2}
                              </div>
                            </div>
                          </div>
                        </li>

                        <li className="bg-white p-3 rounded-md shadow-sm border-l-4 border-indigo-500 flex items-start">
                          <span className="bg-indigo-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                            2
                          </span>
                          <div>
                            <p className="font-medium text-gray-800">
                              Perform the{" "}
                              {activeOperation === "add"
                                ? "addition"
                                : activeOperation === "subtract"
                                  ? "subtraction"
                                  : activeOperation === "multiply"
                                    ? "multiplication"
                                    : "division"}{" "}
                              operation
                            </p>
                            <div className="mt-2 text-gray-600">
                              {Number(operationForm.getValues().wholeNumber1) *
                                Number(operationForm.getValues().denominator1) +
                                Number(operationForm.getValues().numerator1)}
                              /{operationForm.getValues().denominator1} {getOperationIcon}{" "}
                              {Number(operationForm.getValues().wholeNumber2) *
                                Number(operationForm.getValues().denominator2) +
                                Number(operationForm.getValues().numerator2)}
                              /{operationForm.getValues().denominator2} = {operationResult.improperResult.numerator}/
                              {operationResult.improperResult.denominator}
                            </div>
                          </div>
                        </li>

                        <li className="bg-white p-3 rounded-md shadow-sm border-l-4 border-purple-500 flex items-start">
                          <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                            3
                          </span>
                          <div>
                            <p className="font-medium text-gray-800">Convert the improper fraction to a mixed number</p>
                            <div className="mt-2 text-gray-600">
                              {operationResult.improperResult.numerator}/{operationResult.improperResult.denominator} ={" "}
                              {operationResult.result.wholeNumber} {operationResult.result.numerator}/
                              {operationResult.result.denominator}
                            </div>
                          </div>
                        </li>

                        <li className="bg-white p-3 rounded-md shadow-sm border-l-4 border-green-500 flex items-start">
                          <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                            4
                          </span>
                          <div>
                            <p className="font-medium text-gray-800">Final result</p>
                            <div className="mt-2 flex items-center">
                              <MixedFraction
                                wholeNumber={operationForm.getValues().wholeNumber1}
                                numerator={operationForm.getValues().numerator1}
                                denominator={operationForm.getValues().denominator1}
                              />
                              <span className="mx-2">{getOperationIcon}</span>
                              <MixedFraction
                                wholeNumber={operationForm.getValues().wholeNumber2}
                                numerator={operationForm.getValues().numerator2}
                                denominator={operationForm.getValues().denominator2}
                              />
                              <ArrowRightCircle className="mx-3 text-green-500" />
                              {operationResult.result.wholeNumber === 0 && operationResult.result.numerator === 0 ? (
                                <span>0</span>
                              ) : operationResult.result.numerator === 0 ? (
                                <span>{operationResult.result.wholeNumber}</span>
                              ) : operationResult.result.wholeNumber === 0 ? (
                                <Fraction
                                  numerator={operationResult.result.numerator}
                                  denominator={operationResult.result.denominator}
                                  color="accent"
                                />
                              ) : (
                                <MixedFraction
                                  wholeNumber={operationResult.result.wholeNumber}
                                  numerator={operationResult.result.numerator}
                                  denominator={operationResult.result.denominator}
                                  color="accent"
                                />
                              )}
                            </div>
                          </div>
                        </li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="mixed-to-improper" className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Form {...mixedToImproperForm}>
                <form onSubmit={mixedToImproperForm.handleSubmit(onMixedToImproperSubmit)} className="space-y-6">
                  <FormField
                    control={mixedToImproperForm.control}
                    name="wholeNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Whole Number</FormLabel>
                        <FormControl>
                          <Input placeholder="2" {...field} />
                        </FormControl>
                        <FormDescription>Enter the whole number part of the mixed number.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={mixedToImproperForm.control}
                      name="numerator"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Numerator</FormLabel>
                          <FormControl>
                            <Input placeholder="3" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={mixedToImproperForm.control}
                      name="denominator"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Denominator</FormLabel>
                          <FormControl>
                            <Input placeholder="4" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isCalculating}>
                    {isCalculating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Converting...
                      </>
                    ) : (
                      "Convert to Improper Fraction"
                    )}
                  </Button>
                </form>
              </Form>
            </div>

            <div>
              {mixedToImproperResult && (
                <Card>
                  <CardHeader>
                    <CardTitle>Result</CardTitle>
                    <CardDescription>The mixed number converted to an improper fraction</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center gap-6">
                        <div className="text-xl">
                          <MixedFraction
                            wholeNumber={mixedToImproperForm.getValues().wholeNumber}
                            numerator={mixedToImproperForm.getValues().numerator}
                            denominator={mixedToImproperForm.getValues().denominator}
                            size="xl"
                          />
                        </div>
                        <ArrowRight className="h-6 w-6" />
                        <div className="text-xl font-bold">
                          <Fraction
                            numerator={mixedToImproperResult.improperNumerator}
                            denominator={mixedToImproperResult.denominator}
                            size="xl"
                            color="accent"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
                      <h4 className="font-semibold mb-4 text-blue-800 flex items-center">
                        <CheckCircle2 className="h-5 w-5 mr-2" />
                        Step-by-Step Solution:
                      </h4>
                      <ol className="space-y-4">
                        <li className="bg-white p-3 rounded-md shadow-sm border-l-4 border-blue-500 flex items-start">
                          <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                            1
                          </span>
                          <div>
                            <p className="font-medium text-gray-800">Multiply the whole number by the denominator</p>
                            <div className="mt-2 text-gray-600">
                              {mixedToImproperForm.getValues().wholeNumber} ×{" "}
                              {mixedToImproperForm.getValues().denominator} ={" "}
                              {Number(mixedToImproperForm.getValues().wholeNumber) *
                                Number(mixedToImproperForm.getValues().denominator)}
                            </div>
                          </div>
                        </li>

                        <li className="bg-white p-3 rounded-md shadow-sm border-l-4 border-indigo-500 flex items-start">
                          <span className="bg-indigo-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                            2
                          </span>
                          <div>
                            <p className="font-medium text-gray-800">Add the result to the numerator</p>
                            <div className="mt-2 text-gray-600">
                              {Number(mixedToImproperForm.getValues().wholeNumber) *
                                Number(mixedToImproperForm.getValues().denominator)}{" "}
                              + {mixedToImproperForm.getValues().numerator} = {mixedToImproperResult.improperNumerator}
                            </div>
                          </div>
                        </li>

                        <li className="bg-white p-3 rounded-md shadow-sm border-l-4 border-purple-500 flex items-start">
                          <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                            3
                          </span>
                          <div>
                            <p className="font-medium text-gray-800">Keep the same denominator</p>
                            <div className="mt-2 text-gray-600">Denominator = {mixedToImproperResult.denominator}</div>
                          </div>
                        </li>

                        <li className="bg-white p-3 rounded-md shadow-sm border-l-4 border-green-500 flex items-start">
                          <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                            4
                          </span>
                          <div>
                            <p className="font-medium text-gray-800">Final result</p>
                            <div className="mt-2 flex items-center">
                              <MixedFraction
                                wholeNumber={mixedToImproperForm.getValues().wholeNumber}
                                numerator={mixedToImproperForm.getValues().numerator}
                                denominator={mixedToImproperForm.getValues().denominator}
                              />
                              <ArrowRightCircle className="mx-3 text-green-500" />
                              <Fraction
                                numerator={mixedToImproperResult.improperNumerator}
                                denominator={mixedToImproperResult.denominator}
                                color="accent"
                              />
                            </div>
                          </div>
                        </li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="improper-to-mixed" className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Form {...improperToMixedForm}>
                <form onSubmit={improperToMixedForm.handleSubmit(onImproperToMixedSubmit)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={improperToMixedForm.control}
                      name="numerator"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Numerator</FormLabel>
                          <FormControl>
                            <Input placeholder="11" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={improperToMixedForm.control}
                      name="denominator"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Denominator</FormLabel>
                          <FormControl>
                            <Input placeholder="4" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isCalculating}>
                    {isCalculating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Converting...
                      </>
                    ) : (
                      "Convert to Mixed Number"
                    )}
                  </Button>
                </form>
              </Form>
            </div>

            <div>
              {improperToMixedResult && (
                <Card>
                  <CardHeader>
                    <CardTitle>Result</CardTitle>
                    <CardDescription>The improper fraction converted to a mixed number</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center gap-6">
                        <div className="text-xl">
                          <Fraction
                            numerator={improperToMixedForm.getValues().numerator}
                            denominator={improperToMixedForm.getValues().denominator}
                            size="xl"
                          />
                        </div>
                        <ArrowRight className="h-6 w-6" />
                        <div className="text-xl font-bold">
                          {improperToMixedResult.numerator === 0 ? (
                            <span className="text-xl">{improperToMixedResult.wholeNumber}</span>
                          ) : (
                            <MixedFraction
                              wholeNumber={improperToMixedResult.wholeNumber}
                              numerator={improperToMixedResult.numerator}
                              denominator={improperToMixedResult.denominator}
                              size="xl"
                              color="accent"
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
                      <h4 className="font-semibold mb-4 text-blue-800 flex items-center">
                        <CheckCircle2 className="h-5 w-5 mr-2" />
                        Step-by-Step Solution:
                      </h4>
                      <ol className="space-y-4">
                        <li className="bg-white p-3 rounded-md shadow-sm border-l-4 border-blue-500 flex items-start">
                          <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                            1
                          </span>
                          <div>
                            <p className="font-medium text-gray-800">Divide the numerator by the denominator</p>
                            <div className="mt-2 text-gray-600">
                              {improperToMixedForm.getValues().numerator} ÷{" "}
                              {improperToMixedForm.getValues().denominator} = {improperToMixedResult.wholeNumber} with a
                              remainder of {improperToMixedResult.numerator}
                            </div>
                          </div>
                        </li>

                        <li className="bg-white p-3 rounded-md shadow-sm border-l-4 border-indigo-500 flex items-start">
                          <span className="bg-indigo-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                            2
                          </span>
                          <div>
                            <p className="font-medium text-gray-800">The whole number part</p>
                            <div className="mt-2 text-gray-600">Whole number = {improperToMixedResult.wholeNumber}</div>
                          </div>
                        </li>

                        <li className="bg-white p-3 rounded-md shadow-sm border-l-4 border-purple-500 flex items-start">
                          <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                            3
                          </span>
                          <div>
                            <p className="font-medium text-gray-800">The remainder becomes the new numerator</p>
                            <div className="mt-2 text-gray-600">New numerator = {improperToMixedResult.numerator}</div>
                          </div>
                        </li>

                        <li className="bg-white p-3 rounded-md shadow-sm border-l-4 border-pink-500 flex items-start">
                          <span className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                            4
                          </span>
                          <div>
                            <p className="font-medium text-gray-800">Keep the same denominator</p>
                            <div className="mt-2 text-gray-600">Denominator = {improperToMixedResult.denominator}</div>
                          </div>
                        </li>

                        <li className="bg-white p-3 rounded-md shadow-sm border-l-4 border-green-500 flex items-start">
                          <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                            5
                          </span>
                          <div>
                            <p className="font-medium text-gray-800">Final result</p>
                            <div className="mt-2 flex items-center">
                              <Fraction
                                numerator={improperToMixedForm.getValues().numerator}
                                denominator={improperToMixedForm.getValues().denominator}
                              />
                              <ArrowRightCircle className="mx-3 text-green-500" />
                              {improperToMixedResult.numerator === 0 ? (
                                <span>{improperToMixedResult.wholeNumber}</span>
                              ) : (
                                <MixedFraction
                                  wholeNumber={improperToMixedResult.wholeNumber}
                                  numerator={improperToMixedResult.numerator}
                                  denominator={improperToMixedResult.denominator}
                                  color="accent"
                                />
                              )}
                            </div>
                          </div>
                        </li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">About Mixed Numbers Calculator</h2>

        <div className="prose max-w-none">
          <h3>What Can the Mixed Numbers Calculator Do?</h3>
          <p>
            This online calculator performs simple math operations on whole numbers, integers, mixed numbers, fractions,
            and improper fractions. You can add, subtract, multiply, or divide mixed numbers and get the result as a
            reduced fraction and a mixed number.
          </p>

          <h3>How to Use This Calculator</h3>
          <p>Enter mixed numbers, whole numbers, or fractions in the following formats:</p>
          <ul>
            <li>
              <strong>Mixed numbers:</strong> Enter the whole number, numerator, and denominator in the respective
              fields. For example, to enter 1 1/2 (one and one half), enter 1 as the whole number, 1 as the numerator,
              and 2 as the denominator.
            </li>
            <li>
              <strong>Whole numbers:</strong> Enter the number in the whole number field and leave the fraction part
              empty or as 0/1.
            </li>
            <li>
              <strong>Fractions:</strong> Enter 0 as the whole number and fill in the numerator and denominator fields.
            </li>
          </ul>

          <h3>Operations with Mixed Numbers</h3>

          <h4>Adding Mixed Numbers</h4>
          <p>To add mixed numbers, the calculator:</p>
          <ol>
            <li>Converts each mixed number to an improper fraction</li>
            <li>Finds a common denominator</li>
            <li>Adds the numerators</li>
            <li>Simplifies the result</li>
            <li>Converts back to a mixed number if needed</li>
          </ol>

          <h4>Subtracting Mixed Numbers</h4>
          <p>To subtract mixed numbers, the calculator:</p>
          <ol>
            <li>Converts each mixed number to an improper fraction</li>
            <li>Finds a common denominator</li>
            <li>Subtracts the numerators</li>
            <li>Simplifies the result</li>
            <li>Converts back to a mixed number if needed</li>
          </ol>

          <h4>Multiplying Mixed Numbers</h4>
          <p>To multiply mixed numbers, the calculator:</p>
          <ol>
            <li>Converts each mixed number to an improper fraction</li>
            <li>Multiplies the numerators</li>
            <li>Multiplies the denominators</li>
            <li>Simplifies the result</li>
            <li>Converts back to a mixed number if needed</li>
          </ol>

          <h4>Dividing Mixed Numbers</h4>
          <p>To divide mixed numbers, the calculator:</p>
          <ol>
            <li>Converts each mixed number to an improper fraction</li>
            <li>Multiplies the first fraction by the reciprocal of the second fraction</li>
            <li>Simplifies the result</li>
            <li>Converts back to a mixed number if needed</li>
          </ol>

          <h3>Related Calculators</h3>
          <p>
            If you need to perform operations on simple proper or improper fractions, use our Fractions Calculator. To
            simplify an individual fraction into lowest terms, try our Simplify Fractions Calculator.
          </p>
        </div>
      </div>
    </div>
  )
}
