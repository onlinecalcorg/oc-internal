"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import {
  type Currency,
  currencySymbols,
  formatCurrency as formatCurrencyUtil,
  convertCurrency as convertCurrencyUtil,
} from "@/lib/currency-utils"

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  formatAmount: (amount: number) => string
  convertAmount: (amount: number, fromCurrency: Currency) => number
  formatCurrency: (amount: number) => string // Add this for backward compatibility
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD")

  // Load saved currency preference from localStorage on component mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem("preferredCurrency") as Currency | null
    if (savedCurrency && Object.keys(currencySymbols).includes(savedCurrency)) {
      setCurrency(savedCurrency)
    }
  }, [])

  // Save currency preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("preferredCurrency", currency)
  }, [currency])

  const formatAmount = (amount: number) => {
    return formatCurrencyUtil(amount, currency)
  }

  const convertAmount = (amount: number, fromCurrency: Currency) => {
    return convertCurrencyUtil(amount, fromCurrency, currency)
  }

  // Add formatCurrency as an alias to formatAmount for backward compatibility
  const formatCurrency = formatAmount

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatAmount,
        convertAmount,
        formatCurrency, // Add this to the context value
      }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
}
