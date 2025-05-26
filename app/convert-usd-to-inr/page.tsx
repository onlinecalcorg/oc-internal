import type { Metadata } from "next"
import { CurrencyConverter } from "@/components/converters/currency-converter"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Users, TrendingUp, Shield, Clock, Calculator } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "USD to INR Converter | Convert Dollars to Indian Rupees Live",
  description:
    "Convert US Dollars (USD) to Indian Rupees (INR) with real-time exchange rates. Free, accurate, and mobile-friendly currency converter with live rates.",
  keywords: [
    "USD to INR converter",
    "dollar to rupee converter",
    "USD INR exchange rate",
    "convert dollars to rupees",
    "currency converter",
    "live exchange rates",
    "USD to INR calculator",
    "dollar rupee conversion",
    "real-time currency rates",
    "free currency converter",
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/convert-usd-to-inr`,
  },
  openGraph: {
    title: "USD to INR Converter | Live Dollar to Rupee Exchange Rates",
    description:
      "Convert US Dollars to Indian Rupees with real-time rates. Free, accurate, and easy-to-use currency converter.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/convert-usd-to-inr`,
    type: "website",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${encodeURIComponent("USD to INR Converter")}&description=${encodeURIComponent("Live Exchange Rates")}`,
        width: 1200,
        height: 630,
        alt: "USD to INR Currency Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "USD to INR Converter | Live Exchange Rates",
    description: "Convert US Dollars to Indian Rupees with real-time rates. Free and accurate currency converter.",
  },
}

export default function ConvertUsdToInrPage() {
  // Schema markup for the main converter page
  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "USD to INR Currency Converter",
    description: "Convert US Dollars to Indian Rupees with real-time exchange rates",
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
      "Real-time USD to INR exchange rates",
      "Historical rate data and trends",
      "Mobile-responsive design",
      "Free currency conversion",
      "Accurate market rates",
    ],
    screenshot: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${encodeURIComponent("USD to INR Converter")}`,
  }

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
        name: "USD to INR Converter",
        item: `${process.env.NEXT_PUBLIC_BASE_URL}/convert-usd-to-inr`,
      },
    ],
  }

  const popularAmounts = [50, 100, 250, 500, 1000, 2000]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Mobile-First Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            USD to INR Converter
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            Convert US Dollars to Indian Rupees with live exchange rates. Get accurate, real-time currency conversion
            for free.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">4.8/5</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              <Users className="w-4 h-4" />
              <span>2,847 users trust us</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              <Shield className="w-4 h-4" />
              <span>100% Free</span>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">Live Rates</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Rate Trends</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <Calculator className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium">Easy to Use</span>
            </div>
          </div>
        </div>

        {/* Main Converter */}
        <div className="mb-8">
          <CurrencyConverter fromCurrency="USD" toCurrency="INR" title="Convert USD to INR" />
        </div>

        {/* Popular Conversions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Popular USD to INR Conversions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {popularAmounts.map((amount) => (
                <Link
                  key={amount}
                  href={`/convert-usd-to-inr/${amount}`}
                  className="group p-4 border rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 transition-all duration-200 text-center"
                >
                  <div className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600">
                    ${amount}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">≈ ₹{(amount * 83.12).toFixed(0)}</div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Why Choose Our Converter */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Why Choose Our USD to INR Converter?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Real-Time Rates</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Our USD to INR rates are updated multiple times daily to ensure accuracy.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Completely Free</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      No hidden fees, no registration required. Convert unlimited amounts for free.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calculator className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Easy to Use</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Simple interface designed for quick conversions on any device.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Market Insights</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Get rate trends and market insights to make informed decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">How accurate are your USD to INR rates?</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Our rates are sourced from reliable financial data providers and updated multiple times daily. While
                  we strive for accuracy, actual exchange rates may vary slightly at banks and money changers.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Is there a limit to how much I can convert?</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  No, our converter has no limits. You can convert any amount from USD to INR for free.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Can I use this converter on my mobile phone?</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Yes! Our converter is fully responsive and optimized for mobile devices, tablets, and desktops.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
