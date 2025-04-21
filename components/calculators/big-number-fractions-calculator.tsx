"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// We'll use a simple implementation for big number operations
// In a real app, you might want to use a library like big.js or bignumber.js
class BigFraction {
  numerator: string
  denominator: string

  constructor(numerator: string, denominator: string) {
    this.numerator = numerator
    this.denominator = denominator
  }

  // Find GCD of two big numbers represented as strings
  static gcd(a: string, b: string): string {
    // Convert to BigInt for accurate calculations with large numbers
    let aBig = BigInt(a)
    let bBig = BigInt(b)

    while (bBig !== 0n) {
      const temp = bBig
      bBig = aBig % bBig
      aBig = temp
    }

    return aBig.toString()
  }

  // Simplify the fraction
  simplify(): { numerator: string; denominator: string; gcd: string } {
    const gcd = BigFraction.gcd(this.numerator, this.denominator)

    // Convert to BigInt for accurate calculations with large numbers
    const numeratorBig = BigInt(this.numerator)
    const denominatorBig = BigInt(this.denominator)
    const gcdBig = BigInt(gcd)

    const simplifiedNumerator = (numeratorBig / gcdBig).toString()
    const simplifiedDenominator = (denominatorBig / gcdBig).toString()

    return {
      numerator: simplifiedNumerator,
      denominator: simplifiedDenominator,
      gcd,
    }
  }

  // Add two fractions
  static add(a: BigFraction, b: BigFraction): BigFraction {
    // Convert to BigInt for accurate calculations with large numbers
    const aNumerator = BigInt(a.numerator)
    const aDenominator = BigInt(a.denominator)
    const bNumerator = BigInt(b.numerator)
    const bDenominator = BigInt(b.denominator)

    // Find common denominator
    const commonDenominator = aDenominator * bDenominator

    // Calculate new numerator
    const newNumerator = aNumerator * bDenominator + bNumerator * aDenominator

    return new BigFraction(newNumerator.toString(), commonDenominator.toString())
  }

  // Subtract two fractions
  static subtract(a: BigFraction, b: BigFraction): BigFraction {
    // Convert to BigInt for accurate calculations with large numbers
    const aNumerator = BigInt(a.numerator)
    const aDenominator = BigInt(a.denominator)
    const bNumerator = BigInt(b.numerator)
    const bDenominator = BigInt(b.denominator)

    // Find common denominator
    const commonDenominator = aDenominator * bDenominator

    // Calculate new numerator
    const newNumerator = aNumerator * bDenominator - bNumerator * aDenominator

    return new BigFraction(newNumerator.toString(), commonDenominator.toString())
  }

  // Multiply two fractions
  static multiply(a: BigFraction, b: BigFraction): BigFraction {
    // Convert to BigInt for accurate calculations with large numbers
    const aNumerator = BigInt(a.numerator)
    const aDenominator = BigInt(a.denominator)
    const bNumerator = BigInt(b.numerator)
    const bDenominator = BigInt(b.denominator)

    // Multiply numerators and denominators
    const newNumerator = aNumerator * bNumerator
    const newDenominator = aDenominator * bDenominator

    return new BigFraction(newNumerator.toString(), newDenominator.toString())
  }

  // Divide two fractions
  static divide(a: BigFraction, b: BigFraction): BigFraction {
    // Convert to BigInt for accurate calculations with large numbers
    const aNumerator = BigInt(a.numerator)
    const aDenominator = BigInt(a.denominator)
    const bNumerator = BigInt(b.numerator)
    const bDenominator = BigInt(b.denominator)

    // Multiply by the reciprocal
    const newNumerator = aNumerator * bDenominator
    const newDenominator = aDenominator * bNumerator

    return new BigFraction(newNumerator.toString(), newDenominator.toString())
  }
}

const bigFractionSchema = z.object({
  numerator1: z.string().min(1, "Numerator is required"),
  denominator1: z.string().min(1, "Denominator is required"),
  numerator2: z.string().min(1, "Numerator is required"),
  denominator2: z.string().min(1, "Denominator is required"),
})

export function BigNumberFractionsCalculator() {
  const [activeTab, setActiveTab] = useState("simplify")
  const [result, setResult] = useState<{
    operation: string
    resultNumerator: string
    resultDenominator: string
    steps: string[]
  } | null>(null)

  const form = useForm<z.infer<typeof bigFractionSchema>>({
    resolver: zodResolver(bigFractionSchema),
    defaultValues: {
      numerator1: "",
      denominator1: "",
      numerator2: "",
      denominator2: "",
    },
  })

  function onSubmit(values: z.infer<typeof bigFractionSchema>) {
    const fraction1 = new BigFraction(values.numerator1, values.denominator1)
    const fraction2 = new BigFraction(values.numerator2, values.denominator2)

    let resultFraction: BigFraction
    let operation: string
    let steps: string[] = []

    switch (activeTab) {
      case "simplify":
        const simplified1 = fraction1.simplify()
        const simplified2 = fraction2.simplify()

        steps = [
          `Simplifying ${values.numerator1}/${values.denominator1}:`,
          `Find the GCD: ${simplified1.gcd}`,
          `Divide numerator and denominator by the GCD:`,
          `${values.numerator1} ÷ ${simplified1.gcd} = ${simplified1.numerator}`,
          `${values.denominator1} ÷ ${simplified1.gcd} = ${simplified1.denominator}`,
          `Simplified fraction: ${simplified1.numerator}/${simplified1.denominator}`,
          ``,
          `Simplifying ${values.numerator2}/${values.denominator2}:`,
          `Find the GCD: ${simplified2.gcd}`,
          `Divide numerator and denominator by the GCD:`,
          `${values.numerator2} ÷ ${simplified2.gcd} = ${simplified2.numerator}`,
          `${values.denominator2} ÷ ${simplified2.gcd} = ${simplified2.denominator}`,
          `Simplified fraction: ${simplified2.numerator}/${simplified2.denominator}`,
        ]

        setResult({
          operation: "Simplify",
          resultNumerator: `${simplified1.numerator} and ${simplified2.numerator}`,
          resultDenominator: `${simplified1.denominator} and ${simplified2.denominator}`,
          steps,
        })
        return

      case "add":
        resultFraction = BigFraction.add(fraction1, fraction2)
        operation = "Addition"
        steps = [
          `Step 1: Find a common denominator.`,
          `Common denominator = ${values.denominator1} × ${values.denominator2} = ${resultFraction.denominator}`,
          `Step 2: Convert fractions to equivalent fractions with the common denominator.`,
          `${values.numerator1}/${values.denominator1} = (${values.numerator1} × ${values.denominator2})/(${values.denominator1} × ${values.denominator2})`,
          `${values.numerator2}/${values.denominator2} = (${values.numerator2} × ${values.denominator1})/(${values.denominator2} × ${values.denominator1})`,
          `Step 3: Add the numerators.`,
          `(${values.numerator1} × ${values.denominator2}) + (${values.numerator2} × ${values.denominator1}) = ${resultFraction.numerator}`,
          `Step 4: Keep the common denominator.`,
          `Result: ${resultFraction.numerator}/${resultFraction.denominator}`,
        ]
        break

      case "subtract":
        resultFraction = BigFraction.subtract(fraction1, fraction2)
        operation = "Subtraction"
        steps = [
          `Step 1: Find a common denominator.`,
          `Common denominator = ${values.denominator1} × ${values.denominator2} = ${resultFraction.denominator}`,
          `Step 2: Convert fractions to equivalent fractions with the common denominator.`,
          `${values.numerator1}/${values.denominator1} = (${values.numerator1} × ${values.denominator2})/(${values.denominator1} × ${values.denominator2})`,
          `${values.numerator2}/${values.denominator2} = (${values.numerator2} × ${values.denominator1})/(${values.denominator2} × ${values.denominator1})`,
          `Step 3: Subtract the numerators.`,
          `(${values.numerator1} × ${values.denominator2}) - (${values.numerator2} × ${values.denominator1}) = ${resultFraction.numerator}`,
          `Step 4: Keep the common denominator.`,
          `Result: ${resultFraction.numerator}/${resultFraction.denominator}`,
        ]
        break

      case "multiply":
        resultFraction = BigFraction.multiply(fraction1, fraction2)
        operation = "Multiplication"
        steps = [
          `Step 1: Multiply the numerators.`,
          `${values.numerator1} × ${values.numerator2} = ${resultFraction.numerator}`,
          `Step 2: Multiply the denominators.`,
          `${values.denominator1} × ${values.denominator2} = ${resultFraction.denominator}`,
          `Step 3: The result is ${resultFraction.numerator}/${resultFraction.denominator}`,
        ]
        break

      case "divide":
        resultFraction = BigFraction.divide(fraction1, fraction2)
        operation = "Division"
        steps = [
          `Step 1: Multiply the first fraction by the reciprocal of the second fraction.`,
          `(${values.numerator1}/${values.denominator1}) ÷ (${values.numerator2}/${values.denominator2}) = (${values.numerator1}/${values.denominator1}) × (${values.denominator2}/${values.numerator2})`,
          `Step 2: Multiply the numerators.`,
          `${values.numerator1} × ${values.denominator2} = ${resultFraction.numerator}`,
          `Step 3: Multiply the denominators.`,
          `${values.denominator1} × ${values.numerator2} = ${resultFraction.denominator}`,
          `Step 4: The result is ${resultFraction.numerator}/${resultFraction.denominator}`,
        ]
        break

      default:
        return
    }

    // Simplify the result if it's not the simplify operation
    if (activeTab !== "simplify") {
      const simplified = resultFraction.simplify()

      if (simplified.gcd !== "1") {
        steps.push(
          `Step 5: Simplify the result by dividing both numerator and denominator by their GCD (${simplified.gcd}).`,
        )
        steps.push(`${resultFraction.numerator} ÷ ${simplified.gcd} = ${simplified.numerator}`)
        steps.push(`${resultFraction.denominator} ÷ ${simplified.gcd} = ${simplified.denominator}`)
        steps.push(`Simplified result: ${simplified.numerator}/${simplified.denominator}`)

        resultFraction = new BigFraction(simplified.numerator, simplified.denominator)
      } else {
        steps.push(`Step 5: The fraction is already in its simplest form.`)
      }
    }

    setResult({
      operation,
      resultNumerator: resultFraction.numerator,
      resultDenominator: resultFraction.denominator,
      steps,
    })
  }

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="simplify">Simplify</TabsTrigger>
          <TabsTrigger value="add">Add</TabsTrigger>
          <TabsTrigger value="subtract">Subtract</TabsTrigger>
          <TabsTrigger value="multiply">Multiply</TabsTrigger>
          <TabsTrigger value="divide">Divide</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">First Fraction</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      control={form.control}
                      name="numerator1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Numerator</FormLabel>
                          <FormControl>
                            <Input placeholder="123456789012345" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="denominator1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Denominator</FormLabel>
                          <FormControl>
                            <Input placeholder="987654321098765" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Second Fraction</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      control={form.control}
                      name="numerator2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Numerator</FormLabel>
                          <FormControl>
                            <Input placeholder="987654321098765" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="denominator2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Denominator</FormLabel>
                          <FormControl>
                            <Input placeholder="123456789012345" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <FormDescription>
                This calculator can handle extremely large numbers without losing precision.
              </FormDescription>

              <Button type="submit" className="w-full">
                Calculate
              </Button>
            </form>
          </Form>

          {result && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>{result.operation} Result</CardTitle>
                <CardDescription>The result of the {result.operation.toLowerCase()} operation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-xl font-bold">
                    {activeTab === "simplify" ? (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-lg font-normal mb-2">First Fraction:</p>
                          <p>
                            {result.resultNumerator.split(" and ")[0]}/{result.resultDenominator.split(" and ")[0]}
                          </p>
                        </div>
                        <div>
                          <p className="text-lg font-normal mb-2">Second Fraction:</p>
                          <p>
                            {result.resultNumerator.split(" and ")[1]}/{result.resultDenominator.split(" and ")[1]}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        {result.resultNumerator}/{result.resultDenominator}
                      </div>
                    )}
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
        </TabsContent>
      </Tabs>
    </div>
  )
}
