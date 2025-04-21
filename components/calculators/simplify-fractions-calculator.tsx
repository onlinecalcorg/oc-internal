"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Fraction } from "@/components/ui/fraction"
import { ArrowRight, Loader2, CheckCircle2, ArrowRightCircle, DivideIcon } from "lucide-react"

const simplifyFractionSchema = z.object({
  numerator: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Numerator must be a valid number",
  }),
  denominator: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Denominator must be a positive number",
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

export function SimplifyFractionsCalculator() {
  const [result, setResult] = useState<{
    simplifiedNumerator: number
    simplifiedDenominator: number
    gcd: number
    steps: string[]
    gcdSteps?: string[]
  } | null>(null)

  const [isCalculating, setIsCalculating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof simplifyFractionSchema>>({
    resolver: zodResolver(simplifyFractionSchema),
    defaultValues: {
      numerator: "",
      denominator: "",
    },
  })

  function onSubmit(values: z.infer<typeof simplifyFractionSchema>) {
    setError(null)
    setIsCalculating(true)

    try {
      const numerator = Number(values.numerator)
      const denominator = Number(values.denominator)

      if (denominator === 0) {
        setError("Denominator cannot be zero.")
        setIsCalculating(false)
        return
      }

      const gcd = findGCD(numerator, denominator)
      const simplifiedNumerator = numerator / gcd
      const simplifiedDenominator = denominator / gcd

      const steps = [`Step 1: Find the greatest common divisor (GCD) of ${numerator} and ${denominator}.`]

      // Add intermediate steps for GCD calculation if the numbers are not too large
      const gcdSteps: string[] = []
      if (Math.max(numerator, denominator) < 100) {
        let a = Math.abs(numerator)
        let b = Math.abs(denominator)

        while (b) {
          gcdSteps.push(`${a} ÷ ${b} = ${Math.floor(a / b)} remainder ${a % b}`)
          const temp = b
          b = a % b
          a = temp
        }
      }

      steps.push(`The GCD is ${gcd}.`)
      steps.push(`Step 2: Divide both the numerator and denominator by the GCD.`)
      steps.push(`Numerator: ${numerator} ÷ ${gcd} = ${simplifiedNumerator}`)
      steps.push(`Denominator: ${denominator} ÷ ${gcd} = ${simplifiedDenominator}`)
      steps.push(`Step 3: The simplified fraction is ${simplifiedNumerator}/${simplifiedDenominator}.`)

      // Simulate a calculation delay for better UX
      setTimeout(() => {
        setResult({
          simplifiedNumerator,
          simplifiedDenominator,
          gcd,
          steps,
          gcdSteps: gcdSteps.length > 0 ? gcdSteps : undefined,
        })
        setIsCalculating(false)
      }, 500)
    } catch (err) {
      setError("An error occurred during calculation. Please check your inputs.")
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
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="numerator"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numerator</FormLabel>
                    <FormControl>
                      <Input placeholder="24" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="denominator"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Denominator</FormLabel>
                    <FormControl>
                      <Input placeholder="36" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormDescription>Enter a fraction to simplify it to its lowest terms.</FormDescription>

            <Button type="submit" className="w-full" disabled={isCalculating}>
              {isCalculating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Simplifying...
                </>
              ) : (
                "Simplify Fraction"
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
              <CardDescription>The fraction simplified to its lowest terms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-6">
                  <div className="text-xl">
                    <Fraction
                      numerator={form.getValues().numerator}
                      denominator={form.getValues().denominator}
                      size="xl"
                    />
                  </div>
                  <ArrowRight className="h-6 w-6" />
                  <div className="text-xl font-bold">
                    <Fraction
                      numerator={result.simplifiedNumerator}
                      denominator={result.simplifiedDenominator}
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
                      <p className="font-medium text-gray-800">Find the greatest common divisor (GCD)</p>
                      {result.gcdSteps && result.gcdSteps.length > 0 ? (
                        <div className="mt-2 text-gray-600 space-y-1">
                          <p className="text-sm font-medium text-blue-700">Using the Euclidean algorithm:</p>
                          {result.gcdSteps.map((step, index) => (
                            <div key={index} className="pl-2 border-l-2 border-blue-200">
                              {step}
                            </div>
                          ))}
                          <p className="font-medium mt-2">GCD = {result.gcd}</p>
                        </div>
                      ) : (
                        <div className="mt-2 text-gray-600">
                          The GCD of {form.getValues().numerator} and {form.getValues().denominator} is {result.gcd}.
                        </div>
                      )}
                    </div>
                  </li>

                  <li className="bg-white p-3 rounded-md shadow-sm border-l-4 border-indigo-500 flex items-start">
                    <span className="bg-indigo-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="font-medium text-gray-800">Divide both numerator and denominator by the GCD</p>
                      <div className="mt-2 text-gray-600 grid grid-cols-2 gap-4">
                        <div>
                          <p>Numerator:</p>
                          <div className="flex items-center mt-1">
                            {form.getValues().numerator} <DivideIcon className="h-4 w-4 mx-1" /> {result.gcd} ={" "}
                            {result.simplifiedNumerator}
                          </div>
                        </div>
                        <div>
                          <p>Denominator:</p>
                          <div className="flex items-center mt-1">
                            {form.getValues().denominator} <DivideIcon className="h-4 w-4 mx-1" /> {result.gcd} ={" "}
                            {result.simplifiedDenominator}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className="bg-white p-3 rounded-md shadow-sm border-l-4 border-green-500 flex items-start">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="font-medium text-gray-800">Final result</p>
                      <div className="mt-2 flex items-center">
                        <Fraction numerator={form.getValues().numerator} denominator={form.getValues().denominator} />
                        <ArrowRightCircle className="mx-3 text-green-500" />
                        <Fraction
                          numerator={result.simplifiedNumerator}
                          denominator={result.simplifiedDenominator}
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
  )
}
