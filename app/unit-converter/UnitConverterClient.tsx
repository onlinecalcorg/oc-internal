"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeftRight,
  Copy,
  Check,
  Clock,
  Ruler,
  Weight,
  Thermometer,
  FlaskRoundIcon as Flask,
  Square,
  Gauge,
  HardDrive,
  Zap,
} from "lucide-react"
import {
  unitCategories,
  convertValue,
  formatResult,
  getUnitById,
  saveRecentConversion,
  getRecentConversions,
} from "@/lib/unit-conversion"
import type { UnitCategory, RecentConversion } from "@/types/unit-converter"
import { AnimatedGradientBackground } from "@/components/ui/animated-gradient-background"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function UnitConverterClient() {
  // State for the converter
  const [category, setCategory] = useState<UnitCategory>("length")
  const [fromUnit, setFromUnit] = useState("meter")
  const [toUnit, setToUnit] = useState("foot")
  const [inputValue, setInputValue] = useState("1")
  const [result, setResult] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)
  const [recentConversions, setRecentConversions] = useState<RecentConversion[]>([])

  // Get the current category definition
  const currentCategory = unitCategories.find((cat) => cat.id === category)

  // Get the icon component for a category
  const getCategoryIcon = (categoryId: UnitCategory) => {
    const icons: Record<UnitCategory, React.ReactNode> = {
      length: <Ruler className="h-5 w-5" />,
      weight: <Weight className="h-5 w-5" />,
      temperature: <Thermometer className="h-5 w-5" />,
      volume: <Flask className="h-5 w-5" />,
      area: <Square className="h-5 w-5" />,
      speed: <Gauge className="h-5 w-5" />,
      time: <Clock className="h-5 w-5" />,
      digital: <HardDrive className="h-5 w-5" />,
      pressure: <Gauge className="h-5 w-5" />,
      energy: <Zap className="h-5 w-5" />,
    }
    return icons[categoryId]
  }

  // Load recent conversions from localStorage on component mount
  useEffect(() => {
    setRecentConversions(getRecentConversions())
  }, [])

  // Perform the conversion
  const performConversion = useCallback(() => {
    if (!currentCategory) return

    const fromUnitObj = getUnitById(category, fromUnit)
    const toUnitObj = getUnitById(category, toUnit)

    if (!fromUnitObj || !toUnitObj) return

    const numValue = Number.parseFloat(inputValue)

    if (isNaN(numValue)) {
      setResult(null)
      return
    }

    const convertedValue = convertValue(numValue, fromUnitObj, toUnitObj, category)
    setResult(convertedValue)

    // Save to recent conversions
    saveRecentConversion({
      category,
      fromUnit,
      toUnit,
      value: numValue,
      result: convertedValue,
      timestamp: Date.now(),
    })

    // Update the recent conversions state
    setRecentConversions(getRecentConversions())
  }, [category, fromUnit, toUnit, inputValue, currentCategory])

  // Perform conversion when inputs change
  useEffect(() => {
    performConversion()
  }, [category, fromUnit, toUnit, inputValue, performConversion])

  // Handle category change
  const handleCategoryChange = (newCategory: UnitCategory) => {
    setCategory(newCategory)

    // Set default units for the new category
    const categoryDef = unitCategories.find((cat) => cat.id === newCategory)
    if (categoryDef && categoryDef.units.length >= 2) {
      setFromUnit(categoryDef.units[0].id)
      setToUnit(categoryDef.units[1].id)
    }
  }

  // Swap the from and to units
  const handleSwapUnits = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
  }

  // Copy result to clipboard
  const handleCopyResult = () => {
    if (result !== null) {
      navigator.clipboard.writeText(formatResult(result))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Load a recent conversion
  const handleLoadRecentConversion = (conversion: RecentConversion) => {
    setCategory(conversion.category)
    setFromUnit(conversion.fromUnit)
    setToUnit(conversion.toUnit)
    setInputValue(conversion.value.toString())
  }

  // Format a timestamp
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
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
            <BreadcrumbLink href="/calculators">Calculators</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/unit-converter">Unit Converter</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Title */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Unit Converter</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Convert between different units of measurement with precision and ease. Updated for 2025.
        </p>
      </div>

      {/* Main Converter Card */}
      <Card className="mb-8 overflow-hidden">
        <AnimatedGradientBackground className="opacity-5" />
        <CardHeader className="pb-0">
          <CardTitle className="text-2xl">Convert Units</CardTitle>
          <CardDescription>Select a category and units to convert between</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Category Tabs */}
          <Tabs
            defaultValue="length"
            value={category}
            onValueChange={(value) => handleCategoryChange(value as UnitCategory)}
            className="mt-4"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 mb-4">
              {unitCategories.map((cat) => (
                <TabsTrigger key={cat.id} value={cat.id} className="flex items-center gap-1">
                  {getCategoryIcon(cat.id as UnitCategory)}
                  <span className="hidden md:inline">{cat.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {unitCategories.map((cat) => (
              <TabsContent key={cat.id} value={cat.id} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="input-value" className="block text-sm font-medium mb-1">
                        Value
                      </label>
                      <Input
                        id="input-value"
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Enter value"
                        className="text-lg"
                      />
                    </div>
                    <div>
                      <label htmlFor="from-unit" className="block text-sm font-medium mb-1">
                        From
                      </label>
                      <Select value={fromUnit} onValueChange={setFromUnit}>
                        <SelectTrigger id="from-unit" className="text-lg">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {cat.units.map((unit) => (
                            <SelectItem key={unit.id} value={unit.id}>
                              {unit.name} ({unit.symbol})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                      <label htmlFor="to-unit" className="block text-sm font-medium mb-1">
                        To
                      </label>
                      <Select value={toUnit} onValueChange={setToUnit}>
                        <SelectTrigger id="to-unit" className="text-lg">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {cat.units.map((unit) => (
                            <SelectItem key={unit.id} value={unit.id}>
                              {unit.name} ({unit.symbol})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Result Display */}
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">Result</div>
                      <div className="text-2xl font-bold">
                        {result !== null ? formatResult(result) : "-"}
                        {result !== null && (
                          <span className="ml-2 text-sm font-normal text-muted-foreground">
                            {getUnitById(category, toUnit)?.symbol}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyResult}
                      disabled={result === null}
                      className="flex items-center gap-1"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Popular Conversions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Popular Conversions</CardTitle>
          <CardDescription>Quick access to commonly used conversions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {currentCategory?.popularConversions.map(([from, to]) => {
              const fromUnitObj = getUnitById(category, from)
              const toUnitObj = getUnitById(category, to)

              if (!fromUnitObj || !toUnitObj) return null

              return (
                <Button
                  key={`${from}-${to}`}
                  variant="outline"
                  className="justify-start h-auto py-3 px-4"
                  onClick={() => {
                    setFromUnit(from)
                    setToUnit(to)
                  }}
                >
                  <div className="text-left">
                    <div className="font-medium">
                      {fromUnitObj.name} → {toUnitObj.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {fromUnitObj.symbol} → {toUnitObj.symbol}
                    </div>
                  </div>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Conversions */}
      {recentConversions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Conversions</CardTitle>
            <CardDescription>Your recently used conversions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentConversions.map((conversion, index) => {
                const fromUnitObj = getUnitById(conversion.category, conversion.fromUnit)
                const toUnitObj = getUnitById(conversion.category, conversion.toUnit)
                const categoryObj = unitCategories.find((cat) => cat.id === conversion.category)

                if (!fromUnitObj || !toUnitObj || !categoryObj) return null

                return (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    onClick={() => handleLoadRecentConversion(conversion)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="flex items-center gap-2 mb-2 sm:mb-0">
                      <div className="flex-shrink-0">{getCategoryIcon(conversion.category)}</div>
                      <div>
                        <div className="font-medium">
                          {conversion.value} {fromUnitObj.symbol} = {formatResult(conversion.result)} {toUnitObj.symbol}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {categoryObj.name}
                          </Badge>
                          <span>{formatTimestamp(conversion.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="self-end sm:self-auto">
                      Use
                    </Button>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
