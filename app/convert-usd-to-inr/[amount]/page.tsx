import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { DollarToRupeeResult } from "@/components/converters/dollar-to-rupee-result"

// Helper function to format currency
const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount)
}

// Exchange rate (in a real app, this would come from an API)
const EXCHANGE_RATE = 83.12

type Props = {
  params: {
    amount: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const amount = Number.parseFloat(params.amount)

  // Check if amount is valid
  if (isNaN(amount)) {
    return {
      title: "Convert USD to INR | Dollar to Rupee Exchange Rate",
      description:
        "Convert US Dollars (USD) to Indian Rupees (INR) with our real-time currency converter. Get accurate exchange rates and historical data.",
    }
  }

  const inrAmount = amount * EXCHANGE_RATE
  const usdFormatted = formatCurrency(amount, "USD")
  const inrFormatted = formatCurrency(inrAmount, "INR")

  return {
    title: `${usdFormatted} to INR | Convert ${amount} USD to Indian Rupees`,
    description: `${usdFormatted} equals ${inrFormatted}. Convert ${amount} US Dollars to Indian Rupees with real-time exchange rates and historical data.`,
    keywords: `${amount} USD to INR, ${amount} dollars to rupees, USD to INR conversion, dollar to rupee exchange rate, currency converter, ${usdFormatted} in rupees`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/convert-usd-to-inr/${amount}`,
    },
    openGraph: {
      title: `${usdFormatted} equals ${inrFormatted} | USD to INR Converter`,
      description: `Convert ${amount} US Dollars to Indian Rupees. Real-time exchange rate: 1 USD = ${EXCHANGE_RATE} INR.`,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/convert-usd-to-inr/${amount}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${usdFormatted} to Indian Rupees | Currency Converter`,
      description: `${usdFormatted} equals ${inrFormatted}. Get accurate USD to INR conversion rates.`,
    },
  }
}

export default function DollarToRupeePage({ params }: Props) {
  const amount = Number.parseFloat(params.amount)

  // Validate amount
  if (isNaN(amount) || amount <= 0) {
    notFound()
  }

  const inrAmount = amount * EXCHANGE_RATE

  // Schema.org structured data for currency conversion
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: `${amount} USD to INR Conversion`,
    description: `Convert ${amount} US Dollars (USD) to Indian Rupees (INR)`,
    category: "Currency Exchange",
    feesAndCommissionsSpecification: "No fees for online conversion",
    interestRate: {
      "@type": "MonetaryAmount",
      currency: "INR",
      value: EXCHANGE_RATE,
    },
    offers: {
      "@type": "Offer",
      price: inrAmount,
      priceCurrency: "INR",
    },
    provider: {
      "@type": "Organization",
      name: "Calculator Suite",
      url: process.env.NEXT_PUBLIC_BASE_URL,
    },
    additionalType: "CurrencyConversion",
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
      {
        "@type": "ListItem",
        position: 3,
        name: `${amount} USD to INR`,
        item: `${process.env.NEXT_PUBLIC_BASE_URL}/convert-usd-to-inr/${amount}`,
      },
    ],
  }

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How much is ${amount} USD in Indian Rupees?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${amount} US Dollars equals ${inrAmount.toFixed(2)} Indian Rupees at the current exchange rate of 1 USD = ${EXCHANGE_RATE} INR.`,
        },
      },
      {
        "@type": "Question",
        name: "Why do USD to INR exchange rates fluctuate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Exchange rates between USD and INR fluctuate due to factors like economic indicators, interest rates, inflation, political stability, and market sentiment. These factors affect currency supply and demand in the foreign exchange market.",
        },
      },
      {
        "@type": "Question",
        name: "How often are USD to INR exchange rates updated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our USD to INR exchange rates are updated regularly throughout the day to reflect the latest market conditions. For the most accurate rates, we recommend checking just before making any currency exchange.",
        },
      },
    ],
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <DollarToRupeeResult amount={amount} />
    </div>
  )
}
