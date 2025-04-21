"use client"

import { useCurrency } from "@/contexts/currency-context"
import type { Currency } from "@/lib/currency-utils"
import { cn } from "@/lib/utils"

interface CurrencyDisplayProps {
  amount: number
  baseCurrency?: Currency
  className?: string
}

export function CurrencyDisplay({ amount, baseCurrency = "USD", className }: CurrencyDisplayProps) {
  const { currency, convertAmount, formatAmount } = useCurrency()

  // Convert the amount if necessary
  const convertedAmount = baseCurrency === currency ? amount : convertAmount(amount, baseCurrency)

  // Format the amount according to the current currency
  const formattedAmount = formatAmount(convertedAmount)

  return <span className={cn("tabular-nums", className)}>{formattedAmount}</span>
}
