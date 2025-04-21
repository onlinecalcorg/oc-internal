export type Currency = "USD" | "GBP" | "KWD" | "EUR" | "INR"

export const currencySymbols: Record<Currency, string> = {
  USD: "$",
  GBP: "£",
  KWD: "KD",
  EUR: "€",
  INR: "₹",
}

export const currencyNames: Record<Currency, string> = {
  USD: "US Dollar",
  GBP: "British Pound",
  KWD: "Kuwaiti Dinar",
  EUR: "Euro",
  INR: "Indian Rupee",
}

// Approximate exchange rates (as of 2023)
export const exchangeRates: Record<Currency, number> = {
  USD: 1,
  GBP: 0.79,
  KWD: 0.31,
  EUR: 0.92,
  INR: 83.12,
}

export function formatCurrency(amount: number, currency: Currency): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })

  return formatter.format(amount)
}

export function convertCurrency(amount: number, fromCurrency: Currency, toCurrency: Currency): number {
  // Convert to USD first (if not already USD)
  const amountInUSD = fromCurrency === "USD" ? amount : amount / exchangeRates[fromCurrency]

  // Then convert from USD to target currency
  return toCurrency === "USD" ? amountInUSD : amountInUSD * exchangeRates[toCurrency]
}
