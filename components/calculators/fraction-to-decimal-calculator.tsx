"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { Slider } from "@/components/ui/slider"

const fractionToDecimalSchema = z.object({
  numerator: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Numerator must be a valid number",
  }),
  denominator: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Denominator must be a positive number",
  }),
  precision: z.number().min(0).max(10),
})

export function FractionToDecimalCalculator() {
  const [result, setResult] = useState<{
    decimal: string
    steps: string[]
  } | null>(null)

  const form = useForm<z.infer<typeof fractionToDecimalSchema>>({
    resolver: zodResolver(fractionToDecimalSchema),
    defaultValues: {
      numerator: "",
      denominator: "",
      precision: 5,
    },
  })

  function onSubmit(values: z.infer<typeof fractionToDecimalSchema>) {
    const numerator = Number(values.numerator)
    const denominator = Number(values.denominator)
    const precision = values.precision

    // Perform the division
    const decimalValue = numerator / denominator

    // Format the decimal based on precision
    const formattedDecimal = decimalValue.toFixed(precision)

    // Generate steps
    const steps = [
      `Step 1: Divide the numerator (${numerator}) by the denominator (${denominator}).`,
      `${numerator} ÷ ${denominator} = ${decimalValue}`,
      `Step 2: Round to ${precision} decimal places.`,
      `Result: ${formattedDecimal}`,
    ]

    setResult({
      decimal: formattedDecimal,
      steps,
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
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
                      <Input placeholder="3" {...field} />
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
                      <Input placeholder="4" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="precision"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Decimal Precision: {field.value}</FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={10}
                      step={1}
                      defaultValue={[field.value]}
                      onValueChange={(vals) => field.onChange(vals[0])}
                    />
                  </FormControl>
                  <FormDescription>Select the number of decimal places (0-10).</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Convert to Decimal
            </Button>
          </form>
        </Form>
      </div>

      <div>
        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Result</CardTitle>
              <CardDescription>The fraction converted to a decimal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-4">
                  <div className="text-xl">
                    {form.getValues().numerator}/{form.getValues().denominator}
                  </div>
                  <ArrowRight className="h-6 w-6" />
                  <div className="text-xl font-bold">{result.decimal}</div>
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
