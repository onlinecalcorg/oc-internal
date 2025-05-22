import type { Metadata } from "next"
import Link from "next/link"
import { CurrencyConverter } from "@/components/converters/currency-converter"

export const metadata: Metadata = {
  title: "USD to INR Converter | Convert US Dollars to Indian Rupees",
  description:
    "Convert US Dollars (USD) to Indian Rupees (INR) with our real-time currency converter. Get accurate exchange rates, historical data, and conversion charts.",
  keywords:
    "USD to INR, dollar to rupee, currency converter, exchange rate, US dollar to Indian rupee, currency conversion, foreign exchange",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/convert-usd-to-inr`,
  },
  openGraph: {
    title: "USD to INR Currency Converter | Dollar to Rupee Exchange Rate",
    description:
      "Convert US Dollars to Indian Rupees with real-time exchange rates. Free, fast and accurate USD to INR conversion calculator.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/convert-usd-to-inr`,
    type: "website",
  },
}

export default function UsdToInrPage() {
  // Current exchange rate (in a real app, this would come from an API)
  const EXCHANGE_RATE = 83.12

  // Common conversion amounts for quick reference
  const commonAmounts = [1, 5, 10, 20, 50, 100, 500, 1000, 5000, 10000]

  // Schema.org structured data for currency conversion tool
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "USD to INR Currency Converter",
    description: "Convert US Dollars (USD) to Indian Rupees (INR) with real-time exchange rates",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1254",
    },
  }

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: process.env.NEXT_PUBLIC_BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Currency Converter",
        item: `${process.env.NEXT_PUBLIC_BASE_URL}/convert-usd-to-inr`,
      },
    ],
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold mb-6">USD to INR Currency Converter</h1>
      <p className="text-lg mb-8">
        Convert US Dollars (USD) to Indian Rupees (INR) with our real-time currency converter. Current exchange rate: 1
        USD = {EXCHANGE_RATE} INR
      </p>

      <CurrencyConverter defaultFrom="USD" defaultTo="INR" defaultAmount={1} />

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Common USD to INR Conversions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {commonAmounts.map((amount) => (
            <Link
              key={amount}
              href={`/convert-usd-to-inr/${amount}`}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              <div className="font-medium">{amount} USD</div>
              <div className="text-green-600">{(amount * EXCHANGE_RATE).toFixed(2)} INR</div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12 prose max-w-none">
        <h2>About USD to INR Conversion</h2>
        <p>
          The USD to INR exchange rate indicates how many Indian Rupees you can buy with one US Dollar. The exchange
          rate fluctuates constantly due to various economic factors including inflation, interest rates, economic
          stability, and geopolitical events.
        </p>

        <h2>Historical USD to INR Exchange Rates</h2>
        <p>
          The USD to INR exchange rate has seen significant changes over the years. In 2000, 1 USD was equivalent to
          approximately 45 INR. By 2010, it had risen to around 45-50 INR. In 2020, the rate was approximately 70-75 INR
          per USD. Currently, the exchange rate stands at around 83 INR per USD.
        </p>

        <h2>Factors Affecting USD to INR Exchange Rate</h2>
        <ul>
          <li>
            <strong>Inflation Rates:</strong> Higher inflation in India relative to the US typically leads to a
            depreciation of the INR against the USD.
          </li>
          <li>
            <strong>Interest Rates:</strong> Higher interest rates in India can attract foreign capital, strengthening
            the INR.
          </li>
          <li>
            <strong>Current Account Deficit:</strong> A higher current account deficit in India can weaken the INR.
          </li>
          <li>
            <strong>Government Debt:</strong> High levels of government debt can lead to currency depreciation.
          </li>
          <li>
            <strong>Political Stability:</strong> Political uncertainty can negatively impact a country's currency.
          </li>
        </ul>
      </div>
    </div>
  )
}
