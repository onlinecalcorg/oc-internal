"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeftRight, Copy, Check } from "lucide-react"
import { convertValue, formatResult, saveRecentConversion } from "@/lib/unit-conversion"
import type { UnitCategory, Unit } from "@/types/unit-converter"
import { AnimatedGradientBackground } from "@/components/ui/animated-gradient-background"
// Add the import for the AnimatedResult
import { AnimatedResult } from "@/components/converters/animated-result"
import { motion } from "framer-motion"

interface ConversionCalculatorProps {
  category: UnitCategory
  fromUnit: Unit
  toUnit: Unit
  initialValue?: string
}

export function ConversionCalculator({ category, fromUnit, toUnit, initialValue = "1" }: ConversionCalculatorProps) {
  const [inputValue, setInputValue] = useState(initialValue)
  const [result, setResult] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)

  // Perform the conversion
  useEffect(() => {
    const numValue = Number.parseFloat(inputValue)

    if (isNaN(numValue)) {
      setResult(null)
      return
    }

    const convertedValue = convertValue(numValue, fromUnit, toUnit, category)
    setResult(convertedValue)

    // Save to recent conversions
    saveRecentConversion({
      category,
      fromUnit: fromUnit.id,
      toUnit: toUnit.id,
      value: numValue,
      result: convertedValue,
      timestamp: Date.now(),
    })
  }, [inputValue, category, fromUnit, toUnit])

  // Swap the from and to units
  const handleSwapUnits = () => {
    window.location.href = `/convert/${category}/${toUnit.id}/to/${fromUnit.id}?value=${result !== null ? formatResult(result) : "1"}`
  }

  // Copy result to clipboard
  const handleCopyResult = () => {
    if (result !== null) {
      navigator.clipboard.writeText(formatResult(result))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="relative overflow-hidden rounded-lg p-4 sm:p-6">
      <AnimatedGradientBackground className="opacity-5" />
      <div className="grid grid-cols-1 gap-6">
        {/* From Unit Input */}
        <div className="space-y-3">
          <label htmlFor="input-value" className="block text-sm font-medium">
            {fromUnit.name} ({fromUnit.symbol})
          </label>
          <div className="relative">
            <Input
              id="input-value"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Enter ${fromUnit.name}`}
              className="text-lg pr-12 transition-all duration-200 focus:ring-2 focus:ring-primary/50"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
              {fromUnit.symbol}
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex items-center justify-center">
          <Button
            variant="outline"
            onClick={handleSwapUnits}
            aria-label="Swap units"
            className="rounded-full h-10 w-10 p-0 hover:bg-primary/10 hover:text-primary transition-all duration-200"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </Button>
        </div>

        {/* To Unit Result */}
        <div className="space-y-3">
          <label htmlFor="result" className="block text-sm font-medium">
            {toUnit.name} ({toUnit.symbol})
          </label>
          <div className="flex">
            <div className="flex-1 p-3 bg-muted/50 rounded-l-md border border-r-0 text-lg">
              <AnimatedResult value={result !== null ? formatResult(result) : null} symbol={toUnit.symbol} />
            </div>
            <Button
              variant="default"
              onClick={handleCopyResult}
              disabled={result === null}
              className="rounded-l-none transition-all duration-200"
            >
              {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
              <span className="hidden sm:inline">Copy</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Values */}
      <div className="mt-6">
        <div className="text-sm font-medium mb-2">Quick Values</div>
        <div className="flex flex-wrap gap-2">
          {[1, 10, 100, 1000].map((value, index) => (
            <motion.div
              key={value}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex-grow sm:flex-grow-0"
            >
              <Button variant="outline" size="sm" onClick={() => setInputValue(value.toString())} className="w-full">
                {value} {fromUnit.symbol}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
