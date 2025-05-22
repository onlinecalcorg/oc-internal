"use client"

import { useState, useEffect } from "react"
import { Copy, Check, DollarSign, IndianRupee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface DollarToRupeeResultProps {
  amount: number
  exchangeRate: number
  fromCurrency: string
  toCurrency: string
}

export function DollarToRupeeResult({
  amount,
  exchangeRate,
  fromCurrency = "USD",
  toCurrency = "INR",
}: DollarToRupeeResultProps) {
  const [copied, setCopied] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)

  // Calculate the conversion
  const convertedAmount = (amount * exchangeRate).toFixed(2)
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: fromCurrency,
    maximumFractionDigits: 2,
  }).format(amount)

  const formattedResult = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: toCurrency,
    maximumFractionDigits: 2,
  }).format(Number.parseFloat(convertedAmount))

  // Copy result to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Trigger animation on mount
  useEffect(() => {
    setShowAnimation(true)
    const timer = setTimeout(() => setShowAnimation(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-muted rounded-lg">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 mr-4">
            <DollarSign className="h-6 w-6 text-green-600 dark:text-green-300" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">US Dollar</div>
            <div className="text-2xl font-bold">{formattedAmount}</div>
          </div>
        </div>

        <div className="flex items-center justify-center w-10 h-10 rounded-full border">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>

        <div className="flex items-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 mr-4">
            <IndianRupee className="h-6 w-6 text-blue-600 dark:text-blue-300" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Indian Rupee</div>
            <div className={`text-2xl font-bold ${showAnimation ? "animate-pulse text-trust-primary" : ""}`}>
              {formattedResult}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Card className="flex-1 p-4 border-dashed">
          <div className="text-sm text-muted-foreground mb-1">Exchange Rate</div>
          <div className="font-medium">1 USD = ₹{exchangeRate} INR</div>
        </Card>

        <Card className="flex-1 p-4 border-dashed">
          <div className="text-sm text-muted-foreground mb-1">Inverse Rate</div>
          <div className="font-medium">1 INR = ${(1 / exchangeRate).toFixed(6)} USD</div>
        </Card>
      </div>

      <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
        <div>
          <div className="text-sm text-muted-foreground">Conversion Result</div>
          <div className="font-medium">
            {amount} USD = {convertedAmount} INR
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={copyToClipboard} className="gap-1">
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

      <div className="text-xs text-muted-foreground">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>Note: Exchange rates may vary slightly at different financial institutions.</p>
      </div>
    </div>
  )
}
