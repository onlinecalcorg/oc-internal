"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const decimalToFractionSchema = z.object({
  decimal: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Please enter a valid decimal number",
  }),
})

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

export function DecimalToFractionCalculator() {
  const [result, setResult] = useState<{
    numerator: number
    denominator: number
    steps: string[]
  } | null>(null)

  const [isCalculating, setIsCalculating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof decimalToFractionSchema>>({
    resolver: zodResolver(decimalToFractionSchema),
    defaultValues: {
      decimal: "",
    },
  })

  function onSubmit(values: z.infer<typeof decimalToFractionSchema>) {
    setError(null)
    setIsCalculating(true)

    try {
      const decimal = Number(values.decimal)
      const steps: string[] = []

      // Handle special cases
      if (decimal === 0) {
        setTimeout(() => {
          setResult({
            numerator: 0,
            denominator: 1,
            steps: ["The decimal 0 is equivalent to the fraction 0/1."],
          })
          setIsCalculating(false)
        }, 500)
        return
      }

      if (Number.isInteger(decimal)) {
        setTimeout(() => {
          setResult({
            numerator: decimal,
            denominator: 1,
            steps: [`The decimal ${decimal} is a whole number, which is equivalent to the fraction ${decimal}/1.`],
          })
          setIsCalculating(false)
        }, 500)
        return
      }

      // Convert decimal to string to analyze its structure
      const decimalStr = decimal.toString()

      // Check if it's a repeating decimal
      if (decimalStr.length > 10 || /e[+-]/.test(decimalStr)) {
        // For simplicity, we'll use a high precision approximation for very long or scientific notation decimals
        const precision = 1000000 // 6 decimal places
        let numerator = Math.round(decimal * precision)
        let denominator = precision

        // Simplify the fraction
        const gcd = findGCD(numerator, denominator)
        numerator = numerator / gcd
        denominator = denominator / gcd

        steps.push(`Step 1: Multiply the decimal by a power of 10 to get a whole number.`)
        steps.push(`${decimal} × ${precision} = ${decimal * precision}`)
        steps.push(
          `Step 2: Set up the fraction with this number as the numerator and the power of 10 as the denominator.`,
        )
        steps.push(`${decimal * precision}/${precision}`)
        steps.push(
          `Step 3: Simplify the fraction by dividing both the numerator and denominator by their greatest common divisor (${gcd}).`,
        )
        steps.push(`${numerator}/${denominator}`)

        setTimeout(() => {
          setResult({
            numerator,
            denominator,
            steps,
          })
          setIsCalculating(false)
        }, 500)
        return
      }

      // Handle finite decimal
      const decimalParts = decimalStr.split(".")
      const integerPart = Number.parseInt(decimalParts[0])
      const decimalPart = decimalParts.length > 1 ? decimalParts[1] : ""

      const denominator = Math.pow(10, decimalPart.length)
      const numerator = integerPart * denominator + Number.parseInt(decimalPart || "0")

      steps.push(`Step 1: Identify the decimal places.`)
      steps.push(`${decimal} has ${decimalPart.length} decimal places.`)
      steps.push(`Step 2: Multiply by 10^${decimalPart.length} to get a whole number.`)
      steps.push(`${decimal} × 10^${decimalPart.length} = ${numerator}`)
      steps.push(
        `Step 3: Set up the fraction with this number as the numerator and 10^${decimalPart.length} as the denominator.`,
      )
      steps.push(`${numerator}/${denominator}`)

      // Simplify the fraction
      const gcd = findGCD(numerator, denominator)
      if (gcd > 1) {
        const simplifiedNumerator = numerator / gcd
        const simplifiedDenominator = denominator / gcd

        steps.push(
          `Step 4: Simplify the fraction by dividing both the numerator and denominator by their greatest common divisor (${gcd}).`,
        )
        steps.push(`${numerator}/${denominator} = ${simplifiedNumerator}/${simplifiedDenominator}`)

        setTimeout(() => {
          setResult({
            numerator: simplifiedNumerator,
            denominator: simplifiedDenominator,
            steps,
          })
          setIsCalculating(false)
        }, 500)
      } else {
        steps.push(`Step 4: The fraction is already in its simplest form.`)

        setTimeout(() => {
          setResult({
            numerator,
            denominator,
            steps,
          })
          setIsCalculating(false)
        }, 500)
      }
    } catch (err) {
      setError("An error occurred during calculation. Please check your input.")
      setIsCalculating(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="decimal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Decimal Number</FormLabel>
                  <FormControl>
                    <Input placeholder="0.75" {...field} />
                  </FormControl>
                  <FormDescription>Enter a decimal number to convert it to a fraction.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isCalculating}>
              {isCalculating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Converting...
                </>
              ) : (
                "Convert to Fraction"
              )}
            </Button>
          </form>
        </Form>
      </div>

      <div>
        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Result</CardTitle>
              <CardDescription>The decimal converted to a fraction</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-4">
                  <div className="text-xl">{form.getValues().decimal}</div>
                  <ArrowRight className="h-6 w-6" />
                  <div className="text-xl font-bold">
                    {result.numerator}/{result.denominator}
                  </div>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Step-by-Step Solution:</h4>
                <ol className="space-y-1 text-sm">
                  {result.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
