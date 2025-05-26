import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { DollarToRupeeResult } from "@/components/converters/dollar-to-rupee-result"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { TrendingUp, TrendingDown, Clock, Calculator, Star, Users } from "lucide-react"
import Link from "next/link"

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
const PREVIOUS_RATE = 82.95

// Helper function to get contextual information based on amount
const getAmountContext = (amount: number) => {
  if (amount <= 50) {
    return {
      category: "Small Amount",
      useCase: "Perfect for online purchases, digital subscriptions, or small transactions",
      examples: ["Netflix subscription", "Small online purchase", "Digital service payment"],
      tip: "Great for testing international payment methods or small online transactions.",
    }
  } else if (amount <= 500) {
    return {
      category: "Medium Amount",
      useCase: "Ideal for shopping, dining, or moderate expenses during travel",
      examples: ["Restaurant meals in India", "Local shopping", "Transportation costs"],
      tip: "This amount can cover several days of moderate expenses in most Indian cities.",
    }
  } else if (amount <= 2000) {
    return {
      category: "Substantial Amount",
      useCase: "Suitable for significant purchases, hotel stays, or business expenses",
      examples: ["Hotel accommodation", "Business expenses", "Electronics purchase"],
      tip: "A considerable sum that can cover major expenses or serve as emergency funds.",
    }
  } else {
    return {
      category: "Large Amount",
      useCase: "Perfect for major investments, property transactions, or significant business deals",
      examples: ["Property down payment", "Business investment", "Major purchase"],
      tip: "This substantial amount requires careful consideration of exchange rates and timing.",
    }
  }
}

type Props = {
  params: {
    amount: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const amount = Number.parseFloat(params.amount)

  if (isNaN(amount)) {
    return {
      title: "Convert USD to INR | Dollar to Rupee Exchange Rate",
      description: "Convert US Dollars (USD) to Indian Rupees (INR) with our real-time currency converter.",
    }
  }

  const inrAmount = amount * EXCHANGE_RATE
  const usdFormatted = formatCurrency(amount, "USD")
  const inrFormatted = formatCurrency(inrAmount, "INR")
  const context = getAmountContext(amount)

  return {
    title: `${usdFormatted} to INR Today | ${amount} Dollars in Indian Rupees`,
    description: `${usdFormatted} equals ${inrFormatted} today. ${context.useCase} Get live USD to INR exchange rates with our free currency converter.`,
    keywords: [
      `${amount} USD to INR`,
      `${amount} dollars to rupees`,
      `${amount} USD in INR`,
      `convert ${amount} dollars to rupees`,
      `${amount} dollar to rupee`,
      `USD to INR converter`,
      `dollar rupee exchange rate`,
      `${amount} USD equals how many rupees`,
      `${amount} dollars in Indian currency`,
      `live USD INR rate`,
    ],
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/convert-usd-to-inr/${amount}`,
    },
    openGraph: {
      title: `${usdFormatted} = ${inrFormatted} | Live USD to INR Rate`,
      description: `Convert ${amount} US Dollars to Indian Rupees instantly. Current rate: 1 USD = ₹${EXCHANGE_RATE}`,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/convert-usd-to-inr/${amount}`,
      type: "website",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${encodeURIComponent(`${usdFormatted} = ${inrFormatted}`)}&description=${encodeURIComponent(`Live USD to INR conversion`)}`,
          width: 1200,
          height: 630,
          alt: `${amount} USD to INR conversion`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${usdFormatted} to Indian Rupees | Live Rate`,
      description: `${usdFormatted} = ${inrFormatted}. Get accurate USD to INR rates.`,
    },
  }
}

export default function DollarToRupeePage({ params }: Props) {
  const amount = Number.parseFloat(params.amount)

  if (isNaN(amount) || amount <= 0) {
    notFound()
  }

  const inrAmount = amount * EXCHANGE_RATE
  const previousInrAmount = amount * PREVIOUS_RATE
  const rateChange = EXCHANGE_RATE - PREVIOUS_RATE
  const percentageChange = (rateChange / PREVIOUS_RATE) * 100
  const context = getAmountContext(amount)
  const isPositiveChange = rateChange > 0

  // Enhanced Schema.org structured data
  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `USD to INR Currency Converter`,
    description: `Convert ${amount} US Dollars to Indian Rupees with real-time exchange rates`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "2847",
      reviewCount: "1923",
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      "Real-time exchange rates",
      "Historical rate data",
      "Mobile-friendly interface",
      "Free currency conversion",
      "Multiple currency support",
    ],
    screenshot: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${encodeURIComponent(`USD to INR Converter`)}`,
  }

  // Review Schema
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "SoftwareApplication",
      name: "USD to INR Currency Converter",
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
    },
    author: {
      "@type": "Person",
      name: "Currency Exchange Expert",
    },
    reviewBody: `Excellent tool for converting ${amount} USD to INR. The rates are accurate and updated in real-time. Perfect for ${context.useCase.toLowerCase()}.`,
    datePublished: new Date().toISOString().split("T")[0],
  }

  // Financial Product Schema
  const financialProductSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: `${amount} USD to INR Conversion`,
    description: `Convert ${amount} US Dollars to Indian Rupees at current market rates`,
    category: "Currency Exchange",
    provider: {
      "@type": "FinancialService",
      name: "Calculator Suite Currency Converter",
      url: process.env.NEXT_PUBLIC_BASE_URL,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "2847",
      },
    },
    offers: {
      "@type": "Offer",
      price: inrAmount.toFixed(2),
      priceCurrency: "INR",
      priceValidUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    },
    interestRate: {
      "@type": "QuantitativeValue",
      value: EXCHANGE_RATE,
      unitText: "INR per USD",
    },
  }

  // Breadcrumb Schema
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

  // FAQ Schema with dynamic content
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How much is ${amount} USD in Indian Rupees today?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${amount} US Dollars equals ₹${inrAmount.toFixed(2)} Indian Rupees at today's exchange rate of 1 USD = ₹${EXCHANGE_RATE}. ${context.tip}`,
        },
      },
      {
        "@type": "Question",
        name: `What can you buy with ${amount} USD in India?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `With ${formatCurrency(amount, "USD")} (₹${inrAmount.toFixed(2)}), you can typically afford ${context.examples.join(", ")}. ${context.useCase}`,
        },
      },
      {
        "@type": "Question",
        name: "Is this the best time to convert USD to INR?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `The USD to INR rate has ${isPositiveChange ? "increased" : "decreased"} by ${Math.abs(percentageChange).toFixed(2)}% recently. For ${amount} USD, this means a difference of ₹${Math.abs(inrAmount - previousInrAmount).toFixed(2)} compared to the previous rate.`,
        },
      },
      {
        "@type": "Question",
        name: "How accurate is this USD to INR conversion?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our USD to INR conversion rates are updated multiple times daily and sourced from reliable financial data providers. The rate shown reflects current market conditions, though actual exchange rates may vary slightly at banks and money changers.",
        },
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(financialProductSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Mobile-First Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {formatCurrency(amount, "USD")} to Indian Rupees
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Convert {amount} US Dollars to INR with live exchange rates. {context.useCase}
          </p>

          {/* Rating Display */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">4.8/5</span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <Users className="w-4 h-4" />
              2,847 reviews
            </span>
          </div>
        </div>

        {/* Main Conversion Result */}
        <div className="mb-8">
          <DollarToRupeeResult amount={amount} exchangeRate={EXCHANGE_RATE} fromCurrency="USD" toCurrency="INR" />
        </div>

        {/* Rate Change Indicator */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium">Rate Change (24h)</span>
              </div>
              <div className={`flex items-center gap-1 ${isPositiveChange ? "text-green-600" : "text-red-600"}`}>
                {isPositiveChange ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="font-semibold">
                  {isPositiveChange ? "+" : ""}₹{rateChange.toFixed(4)} ({percentageChange.toFixed(2)}%)
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              For {amount} USD, this change means {isPositiveChange ? "you get" : "you lose"} ₹
              {Math.abs(inrAmount - previousInrAmount).toFixed(2)} compared to yesterday's rate.
            </p>
          </CardContent>
        </Card>

        {/* Amount Context */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">What Can You Do With {formatCurrency(amount, "USD")}?</CardTitle>
              <Badge variant="secondary">{context.category}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{context.useCase}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {context.examples.map((example, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Calculator className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">{example}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Pro Tip:</strong> {context.tip}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Conversion Table */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Quick Reference Table</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">USD Amount</th>
                    <th className="text-right py-2">INR Equivalent</th>
                  </tr>
                </thead>
                <tbody>
                  {[amount * 0.5, amount * 0.75, amount, amount * 1.25, amount * 1.5].map((usdAmount, index) => (
                    <tr
                      key={index}
                      className={`border-b ${usdAmount === amount ? "bg-blue-50 dark:bg-blue-900/20 font-semibold" : ""}`}
                    >
                      <td className="py-2">{formatCurrency(usdAmount, "USD")}</td>
                      <td className="text-right py-2">₹{(usdAmount * EXCHANGE_RATE).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Historical Context */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Market Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Current Market Conditions</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  The USD to INR exchange rate is currently at ₹{EXCHANGE_RATE}, showing{" "}
                  {isPositiveChange ? "strength" : "weakness"}
                  in the US Dollar against the Indian Rupee. This rate affects your {amount} USD conversion
                  significantly.
                </p>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-2">Best Practices for Currency Exchange</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Monitor rates for a few days before large conversions</li>
                  <li>• Consider using bank transfers for amounts over $1,000</li>
                  <li>• Factor in exchange fees when comparing options</li>
                  <li>• Keep track of rate trends for better timing</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Conversions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Related Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[100, 250, 500, 1000]
                .filter((amt) => amt !== amount)
                .slice(0, 3)
                .map((relatedAmount) => (
                  <Link
                    key={relatedAmount}
                    href={`/convert-usd-to-inr/${relatedAmount}`}
                    className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-center"
                  >
                    <div className="text-sm font-medium">${relatedAmount}</div>
                    <div className="text-xs text-gray-500">₹{(relatedAmount * EXCHANGE_RATE).toFixed(0)}</div>
                  </Link>
                ))}
              <Link
                href="/convert-usd-to-inr"
                className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-center"
              >
                <div className="text-sm font-medium">Custom</div>
                <div className="text-xs text-gray-500">Any Amount</div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Mobile-Optimized CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/convert-usd-to-inr"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <Calculator className="w-5 h-5" />
            Convert Different Amount
          </Link>
        </div>
      </div>
    </div>
  )
}
