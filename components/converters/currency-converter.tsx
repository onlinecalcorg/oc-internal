"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { DollarSign, IndianRupee, ArrowRight, RotateCcw, Copy, Check, History, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Define the exchange rate (this would ideally come from an API)
const EXCHANGE_RATE = 83.12 // 1 USD = 83.12 INR (example rate)

interface CurrencyConverterProps {
  initialAmount?: number
  initialFromCurrency?: "USD" | "INR"
  showHistory?: boolean
  showPopularAmounts?: boolean
}

export function CurrencyConverter({
  initialAmount = 1,
  initialFromCurrency = "USD",
  showHistory = true,
  showPopularAmounts = true,
}: CurrencyConverterProps) {
  const router = useRouter()
  const pathname = usePathname()

  // State for the converter
  const [amount, setAmount] = useState<number>(initialAmount)
  const [fromCurrency, setFromCurrency] = useState<"USD" | "INR">(initialFromCurrency)
  const [result, setResult] = useState<number>(0)
  const [copied, setCopied] = useState(false)
  const [conversionHistory, setConversionHistory] = useState<
    Array<{
      amount: number
      from: string
      to: string
      result: number
      timestamp: Date
    }>
  >([])
  const [isConverting, setIsConverting] = useState(false)
  const [liveRateFluctuation, setLiveRateFluctuation] = useState(0)

  // Popular amounts for quick conversion
  const popularAmounts = [10, 50, 100, 250, 500, 1000, 5000, 10000]

  // Calculate conversion on mount and when inputs change
  useEffect(() => {
    convertCurrency()

    // Simulate live rate fluctuations
    const interval = setInterval(() => {
      const fluctuation = Math.random() * 0.1 - 0.05 // Random value between -0.05 and 0.05
      setLiveRateFluctuation(fluctuation)
    }, 5000)

    return () => clearInterval(interval)
  }, [amount, fromCurrency])

  // Load conversion history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("conversionHistory")
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory)
        // Convert string timestamps back to Date objects
        const historyWithDates = parsedHistory.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        }))
        setConversionHistory(historyWithDates)
      } catch (e) {
        console.error("Failed to parse conversion history", e)
      }
    }
  }, [])

  // Save conversion history to localStorage
  useEffect(() => {
    if (conversionHistory.length > 0) {
      localStorage.setItem("conversionHistory", JSON.stringify(conversionHistory))
    }
  }, [conversionHistory])

  const convertCurrency = () => {
    if (isNaN(amount) || amount <= 0) return

    setIsConverting(true)

    // Simulate API call delay
    setTimeout(() => {
      let calculatedResult: number

      if (fromCurrency === "USD") {
        calculatedResult = amount * (EXCHANGE_RATE + liveRateFluctuation)
      } else {
        calculatedResult = amount / (EXCHANGE_RATE + liveRateFluctuation)
      }

      setResult(calculatedResult)

      // Add to history if it's a new conversion
      const newConversion = {
        amount,
        from: fromCurrency,
        to: fromCurrency === "USD" ? "INR" : "USD",
        result: calculatedResult,
        timestamp: new Date(),
      }

      // Only add to history if it's different from the last conversion
      if (
        conversionHistory.length === 0 ||
        conversionHistory[0].amount !== newConversion.amount ||
        conversionHistory[0].from !== newConversion.from
      ) {
        setConversionHistory((prev) => [newConversion, ...prev.slice(0, 9)])
      }

      setIsConverting(false)
    }, 600)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value)
    setAmount(isNaN(value) ? 0 : value)
  }

  const handleTabChange = (value: string) => {
    setFromCurrency(value === "usd-to-inr" ? "USD" : "INR")
  }

  const copyToClipboard = () => {
    const textToCopy =
      fromCurrency === "USD" ? `${amount} USD = ${result.toFixed(2)} INR` : `${amount} INR = ${result.toFixed(2)} USD`

    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const navigateToAmount = () => {
    if (fromCurrency === "USD" && amount > 0) {
      router.push(`/currency/${amount}-dollars-in-rupees`)
    }
  }

  const clearHistory = () => {
    setConversionHistory([])
    localStorage.removeItem("conversionHistory")
  }

  const setPopularAmount = (popularAmount: number) => {
    setAmount(popularAmount)
  }

  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date)
  }

  return (
    <div className="w-full">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <Tabs
            defaultValue={fromCurrency === "USD" ? "usd-to-inr" : "inr-to-usd"}
            className="w-full"
            onValueChange={handleTabChange}
          >
            <TabsList className="grid w-full grid-cols-2 rounded-none">
              <TabsTrigger
                value="usd-to-inr"
                className="data-[state=active]:bg-green-50 dark:data-[state=active]:bg-green-950"
              >
                <div className="flex items-center gap-1.5">
                  <DollarSign className="h-4 w-4" />
                  <span>USD to INR</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="inr-to-usd"
                className="data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-950"
              >
                <div className="flex items-center gap-1.5">
                  <IndianRupee className="h-4 w-4" />
                  <span>INR to USD</span>
                </div>
              </TabsTrigger>
            </TabsList>

            <div className="p-6">
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="amount-input" className="text-sm font-medium">
                  {fromCurrency === "USD" ? "USD Amount" : "INR Amount"}
                </label>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3" />
                  <span>Live Rate</span>
                  <Badge
                    variant={liveRateFluctuation >= 0 ? "success" : "destructive"}
                    className="text-[10px] px-1 py-0 h-4"
                  >
                    {liveRateFluctuation >= 0 ? "+" : ""}
                    {liveRateFluctuation.toFixed(4)}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  {fromCurrency === "USD" ? (
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  ) : (
                    <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  )}
                  <Input
                    id="amount-input"
                    type="number"
                    value={amount || ""}
                    onChange={handleAmountChange}
                    className="pl-10"
                    placeholder="Enter amount"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t" />
                  </div>
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full border bg-background">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">
                      {fromCurrency === "USD" ? "INR Result" : "USD Result"}
                    </label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyToClipboard}>
                            {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{copied ? "Copied!" : "Copy result"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="relative">
                    {fromCurrency === "USD" ? (
                      <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    ) : (
                      <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    )}
                    <div
                      className={`w-full rounded-md border border-input bg-muted pl-10 pr-3 py-2 text-base font-medium ${isConverting ? "animate-pulse" : ""}`}
                    >
                      {isConverting ? "Converting..." : formatCurrency(result, fromCurrency === "USD" ? "INR" : "USD")}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={convertCurrency}
                    className="w-full"
                    disabled={isConverting || isNaN(amount) || amount <= 0}
                  >
                    Convert
                  </Button>

                  {fromCurrency === "USD" ? (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={navigateToAmount}
                      disabled={isNaN(amount) || amount <= 0}
                    >
                      View Details
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full" onClick={() => setAmount(0)}>
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  )}
                </div>
              </div>

              {showPopularAmounts && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium">Popular Amounts</h3>
                    <span className="text-xs text-muted-foreground">Quick Convert</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {popularAmounts.slice(0, 8).map((popularAmount) => (
                      <Button
                        key={popularAmount}
                        variant="outline"
                        size="sm"
                        className="text-xs h-8"
                        onClick={() => setPopularAmount(popularAmount)}
                      >
                        {fromCurrency === "USD" ? "$" : "₹"}
                        {popularAmount}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 pt-4 border-t">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Exchange Rate</div>
                  <div className="text-xs text-muted-foreground">Updated: {new Date().toLocaleDateString()}</div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                    <span>1 USD =</span>
                    <span className="font-medium">₹{(EXCHANGE_RATE + liveRateFluctuation).toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                    <span>1 INR =</span>
                    <span className="font-medium">${(1 / (EXCHANGE_RATE + liveRateFluctuation)).toFixed(6)}</span>
                  </div>
                </div>
              </div>

              {showHistory && conversionHistory.length > 0 && (
                <div className="mt-6 pt-4 border-t">
                  <Popover>
                    <div className="flex items-center justify-between mb-2">
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-sm">
                          <History className="h-3.5 w-3.5 mr-1.5" />
                          Conversion History
                        </Button>
                      </PopoverTrigger>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs text-muted-foreground"
                        onClick={clearHistory}
                      >
                        Clear
                      </Button>
                    </div>
                    <PopoverContent className="w-80 p-0" align="start">
                      <div className="p-2 border-b">
                        <h4 className="font-medium text-sm">Recent Conversions</h4>
                      </div>
                      <div className="max-h-[300px] overflow-y-auto">
                        {conversionHistory.map((item, index) => (
                          <div key={index} className="p-3 border-b last:border-0 hover:bg-muted/50 transition-colors">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">
                                  {item.from === "USD" ? "$" : "₹"}
                                  {item.amount.toFixed(2)} → {item.to === "USD" ? "$" : "₹"}
                                  {item.result.toFixed(2)}
                                </div>
                                <div className="text-xs text-muted-foreground">{formatTime(item.timestamp)}</div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => {
                                  setAmount(item.amount)
                                  setFromCurrency(item.from as "USD" | "INR")
                                }}
                              >
                                <RotateCcw className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
