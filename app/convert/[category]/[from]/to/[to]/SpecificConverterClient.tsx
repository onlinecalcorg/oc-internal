"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeftRight, Copy, Check } from "lucide-react"
import { unitCategories, convertValue, formatResult, getUnitById, saveRecentConversion } from "@/lib/unit-conversion"
import type { UnitCategory } from "@/types/unit-converter"
import { AnimatedGradientBackground } from "@/components/ui/animated-gradient-background"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"

interface SpecificConverterClientProps {
  category: string
  fromUnit: string
  toUnit: string
}

export default function SpecificConverterClient({ category, fromUnit, toUnit }: SpecificConverterClientProps) {
  const [inputValue, setInputValue] = useState("1")
  const [result, setResult] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)

  // Get the category and unit data
  const categoryData = unitCategories.find((cat) => cat.id === category)
  const fromUnitData = categoryData?.units.find((unit) => unit.id === fromUnit)
  const toUnitData = categoryData?.units.find((unit) => unit.id === toUnit)

  // Perform the conversion
  useEffect(() => {
    if (!categoryData || !fromUnitData || !toUnitData) return

    const numValue = Number.parseFloat(inputValue)

    if (isNaN(numValue)) {
      setResult(null)
      return
    }

    const convertedValue = convertValue(numValue, fromUnitData, toUnitData, categoryData.id as UnitCategory)
    setResult(convertedValue)

    // Save to recent conversions
    saveRecentConversion({
      category: categoryData.id as UnitCategory,
      fromUnit,
      toUnit,
      value: numValue,
      result: convertedValue,
      timestamp: Date.now(),
    })
  }, [inputValue, category, fromUnit, toUnit, categoryData, fromUnitData, toUnitData])

  // Swap the from and to units
  const handleSwapUnits = () => {
    window.location.href = `/convert/${category}/${toUnit}/to/${fromUnit}`
  }

  // Copy result to clipboard
  const handleCopyResult = () => {
    if (result !== null) {
      navigator.clipboard.writeText(formatResult(result))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!categoryData || !fromUnitData || !toUnitData) {
    return <div>Invalid conversion parameters</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/unit-converter">Unit Converter</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/convert/${category}`}>{categoryData.name}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/convert/${category}/${fromUnit}/to/${toUnit}`}>
              {fromUnitData.name} to {toUnitData.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Title */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          {fromUnitData.name} to {toUnitData.name} Converter
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Convert between {fromUnitData.name} ({fromUnitData.symbol}) and {toUnitData.name} ({toUnitData.symbol})
          quickly and easily.
        </p>
      </div>

      {/* Main Converter Card */}
      <Card className="mb-8 overflow-hidden">
        <AnimatedGradientBackground className="opacity-5" />
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <span>{fromUnitData.name}</span>
            <span className="text-muted-foreground">to</span>
            <span>{toUnitData.name}</span>
          </CardTitle>
          <CardDescription>
            Enter a value in {fromUnitData.name} ({fromUnitData.symbol}) to convert to {toUnitData.name} (
            {toUnitData.symbol})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="input-value" className="block text-sm font-medium mb-1">
                  {fromUnitData.name} ({fromUnitData.symbol})
                </label>
                <Input
                  id="input-value"
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={`Enter ${fromUnitData.name}`}
                  className="text-lg"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-center h-10">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSwapUnits}
                  aria-label="Swap units"
                  className="rounded-full"
                >
                  <ArrowLeftRight className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <label htmlFor="result" className="block text-sm font-medium mb-1">
                  {toUnitData.name} ({toUnitData.symbol})
                </label>
                <div className="flex">
                  <div className="flex-1 p-3 bg-muted rounded-l-md border border-r-0 text-lg">
                    {result !== null ? formatResult(result) : "-"}
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleCopyResult}
                    disabled={result === null}
                    className="rounded-l-none"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Formula Display */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h3 className="font-medium mb-2">Conversion Formula</h3>
            {category === "temperature" ? (
              <div className="text-sm">
                {fromUnit === "celsius" && toUnit === "fahrenheit" && <p>°F = (°C × 9/5) + 32</p>}
                {fromUnit === "fahrenheit" && toUnit === "celsius" && <p>°C = (°F - 32) × 5/9</p>}
                {fromUnit === "celsius" && toUnit === "kelvin" && <p>K = °C + 273.15</p>}
                {fromUnit === "kelvin" && toUnit === "celsius" && <p>°C = K - 273.15</p>}
                {fromUnit === "fahrenheit" && toUnit === "kelvin" && <p>K = (°F - 32) × 5/9 + 273.15</p>}
                {fromUnit === "kelvin" && toUnit === "fahrenheit" && <p>°F = (K - 273.15) × 9/5 + 32</p>}
              </div>
            ) : (
              <div className="text-sm">
                <p>
                  1 {fromUnitData.name} = {(toUnitData.conversionFactor / fromUnitData.conversionFactor).toFixed(6)}{" "}
                  {toUnitData.name}
                </p>
                <p className="mt-1">
                  To convert from {fromUnitData.name} to {toUnitData.name}, multiply by{" "}
                  {(toUnitData.conversionFactor / fromUnitData.conversionFactor).toFixed(6)}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>
            About {fromUnitData.name} to {toUnitData.name} Conversion
          </CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <p>
            This converter provides a quick and accurate way to convert from {fromUnitData.name} ({fromUnitData.symbol})
            to {toUnitData.name} ({toUnitData.symbol}). Whether you're working on a project, studying, or just curious
            about the conversion, our tool makes it easy.
          </p>

          <h3>
            How to Convert from {fromUnitData.name} to {toUnitData.name}
          </h3>
          <ol>
            <li>Enter the value in {fromUnitData.name} in the input field</li>
            <li>The equivalent value in {toUnitData.name} is automatically calculated</li>
            <li>Use the copy button to copy the result to your clipboard</li>
          </ol>

          <h3>
            Common {fromUnitData.name} to {toUnitData.name} Conversions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 not-prose">
            {[1, 5, 10, 20, 50, 100].map((value) => {
              const fromUnitObj = getUnitById(category as UnitCategory, fromUnit)
              const toUnitObj = getUnitById(category as UnitCategory, toUnit)

              if (!fromUnitObj || !toUnitObj) return null

              const convertedValue = convertValue(value, fromUnitObj, toUnitObj, category as UnitCategory)

              return (
                <div key={value} className="p-3 border rounded-md text-center">
                  <div className="font-medium">
                    {value} {fromUnitObj.symbol} =
                  </div>
                  <div>
                    {formatResult(convertedValue)} {toUnitObj.symbol}
                  </div>
                </div>
              )
            })}
          </div>

          <h3>Other Useful Converters</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 not-prose">
            {categoryData.popularConversions
              .filter(([from, to]) => from !== fromUnit || to !== toUnit)
              .slice(0, 4)
              .map(([from, to]) => {
                const fromUnitObj = getUnitById(category as UnitCategory, from)
                const toUnitObj = getUnitById(category as UnitCategory, to)

                if (!fromUnitObj || !toUnitObj) return null

                return (
                  <Link
                    key={`${from}-${to}`}
                    href={`/convert/${category}/${from}/to/${to}`}
                    className="p-3 border rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <div className="font-medium">
                      {fromUnitObj.name} to {toUnitObj.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {fromUnitObj.symbol} to {toUnitObj.symbol}
                    </div>
                  </Link>
                )
              })}
          </div>

          <div className="mt-6">
            <Link href="/unit-converter" className="text-primary hover:underline">
              Back to Unit Converter
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
