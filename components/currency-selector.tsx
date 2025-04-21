"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { type Currency, currencyNames, currencySymbols } from "@/lib/currency-utils"
import { useCurrency } from "@/contexts/currency-context"
import { LucideIcon } from "@/components/lucide-icon"

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <span>{currencySymbols[currency]}</span>
          <LucideIcon name="chevron-down" className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(currencyNames).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => setCurrency(code as Currency)}
            className={currency === code ? "bg-accent" : ""}
          >
            <span className="mr-2">{currencySymbols[code as Currency]}</span>
            <span>{name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
