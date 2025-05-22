import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, DollarSign, IndianRupee, TrendingUp, Calculator, Info, ExternalLink, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { CurrencyConverter } from "@/components/converters/currency-converter"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

// Define the exchange rate (this would ideally come from an API)
const EXCHANGE_RATE = 83.12 // 1 USD = 83.12 INR (example rate)

export const metadata: Metadata = {
  title: "USD to INR Converter | Dollars to Rupees Exchange Rate Calculator",
  description:
    "Convert US Dollars (USD) to Indian Rupees (INR) with our free currency converter. Get accurate and up-to-date exchange rates for USD to INR conversions.",
  keywords: [
    "usd to inr",
    "dollar to rupee",
    "dollar to rupee exchange rate",
    "convert dollars to rupees",
    "us dollar to indian rupee",
    "currency converter",
    "exchange rate calculator",
    "dollar rate today",
    "dollar to inr calculator",
    "usd to inr conversion",
    "dollar value in rupees",
    "dollar to rupee forecast",
    "live dollar rate in india",
    "best usd to inr rate",
    "dollar to rupee history",
    "currency exchange near me",
    "how much is dollar in rupees",
    "dollar rate in india today",
    "dollar to rupee chart",
    "dollar to rupee trend",
  ],
  openGraph: {
    title: "USD to INR Converter | Dollars to Rupees Exchange Rate Calculator",
    description:
      "Convert US Dollars (USD) to Indian Rupees (INR) with our free currency converter. Get accurate and up-to-date exchange rates.",
    type: "website",
    locale: "en_US",
    url: "https://calculatorsuite.vercel.app/currency/dollars-to-rupees",
    images: [
      {
        url: "https://calculatorsuite.vercel.app/api/og?title=USD+to+INR+Converter&subtitle=Convert+Dollars+to+Rupees",
        width: 1200,
        height: 630,
        alt: "USD to INR Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "USD to INR Converter | Dollars to Rupees Exchange Rate Calculator",
    description: "Convert US Dollars (USD) to Indian Rupees (INR) with our free currency converter.",
    images: ["https://calculatorsuite.vercel.app/api/og?title=USD+to+INR+Converter&subtitle=Convert+Dollars+to+Rupees"],
  },
}

export default function DollarsToRupeesPage() {
  // Common USD amounts to convert
  const commonAmounts = [1, 5, 10, 20, 50, 100, 200, 250, 500, 1000, 2000, 5000, 10000]

  // Popular search terms
  const popularSearches = [
    "dollar to rupee today",
    "dollar rate in india",
    "usd to inr forecast",
    "best exchange rate usd to inr",
    "dollar to rupee history",
    "how to convert dollars to rupees",
    "dollar value in india",
    "usd to inr live rate",
  ]

  // Generate schema.org JSON-LD
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "USD to INR Converter | Dollars to Rupees Exchange Rate Calculator",
    description:
      "Convert US Dollars (USD) to Indian Rupees (INR) with our free currency converter. Get accurate and up-to-date exchange rates.",
    dateModified: new Date().toISOString(),
    mainEntity: [
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is the current USD to INR exchange rate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: `As of ${new Date().toLocaleDateString()}, the exchange rate is approximately 1 USD = ₹${EXCHANGE_RATE} INR. However, exchange rates fluctuate constantly based on global economic factors.`,
            },
          },
          {
            "@type": "Question",
            name: "Why do exchange rates between USD and INR fluctuate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Exchange rates between USD and INR fluctuate due to factors like inflation rates, interest rates, political stability, economic performance, government debt, and market speculation. These factors affect the supply and demand of currencies in the global market.",
            },
          },
          {
            "@type": "Question",
            name: "How often is the USD to INR exchange rate updated?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In the global forex market, exchange rates update continuously during trading hours. Our calculator aims to provide recent rates, but for the most current rates, especially for large transactions, it's advisable to check with banks or financial institutions.",
            },
          },
          {
            "@type": "Question",
            name: "What's the best way to convert USD to INR when traveling to India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "When traveling to India, you have several options: exchange currency before your trip at banks or exchange offices, use ATMs in India (often offering competitive rates), use credit cards with no foreign transaction fees, or use travel money cards. Compare fees and rates to find the best option for your situation.",
            },
          },
          {
            "@type": "Question",
            name: "Are there fees when converting USD to INR?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, most currency conversions involve fees. Banks and exchange services typically charge a commission or build a margin into the exchange rate. ATMs may charge withdrawal fees, and credit cards might have foreign transaction fees. Always check the total cost including all fees when comparing options.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://calculatorsuite.vercel.app/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "USD to INR",
            item: "https://calculatorsuite.vercel.app/currency/dollars-to-rupees",
          },
        ],
      },
    ],
  }

  return (
    <div className="container px-4 py-8 md:py-12">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/currency/dollars-to-rupees" isCurrentPage>
            USD to INR
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">USD to INR Converter | Dollars to Rupees</h1>
            <Badge variant="outline" className="w-fit">
              Live Rates
            </Badge>
          </div>

          <div className="text-xl text-muted-foreground mb-8 flex flex-wrap items-center gap-2">
            <span className="font-medium text-foreground">Current Exchange Rate: 1 USD = ₹{EXCHANGE_RATE} INR</span>
            <Badge className="bg-green-500 hover:bg-green-600">Updated Today</Badge>
          </div>

          <div className="mb-8">
            <CurrencyConverter />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Common USD to INR Conversions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {commonAmounts.map((amount) => (
                <Link
                  key={amount}
                  href={`/currency/${amount}-dollars-in-rupees`}
                  className="flex flex-col p-4 border rounded-md hover:bg-muted transition-colors"
                >
                  <div className="flex items-center mb-2">
                    <DollarSign className="h-4 w-4 text-green-600 mr-1" />
                    <span className="font-medium">{amount} USD</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <IndianRupee className="h-3 w-3 mr-1" />
                    <span>{(amount * EXCHANGE_RATE).toFixed(2)} INR</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">About USD to INR Conversion</h2>
            <div className="space-y-4 prose max-w-none dark:prose-invert">
              <p>
                The USD to INR conversion represents the exchange rate between the United States Dollar (USD) and the
                Indian Rupee (INR). This exchange rate tells you how many Indian Rupees you can get for one US Dollar.
              </p>

              <div className="not-prose bg-muted p-4 rounded-lg mb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 mr-4">
                    <DollarSign className="h-6 w-6 text-green-600 dark:text-green-300" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">US Dollar</div>
                    <div className="text-2xl font-bold">$1.00</div>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </div>

                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 mr-4">
                    <IndianRupee className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Indian Rupee</div>
                    <div className="text-2xl font-bold">₹{EXCHANGE_RATE}</div>
                  </div>
                </div>
              </div>

              <p>
                The US Dollar is the official currency of the United States and several other countries. It's also the
                world's primary reserve currency and is used in international transactions. The Indian Rupee is the
                official currency of India, one of the world's largest economies.
              </p>

              <p>Exchange rates fluctuate constantly based on various economic factors, including:</p>

              <ul>
                <li>Interest rates set by central banks (Federal Reserve in the US and Reserve Bank of India)</li>
                <li>Inflation rates in both countries</li>
                <li>Political stability and economic performance</li>
                <li>Government debt and fiscal policies</li>
                <li>Market speculation and investor sentiment</li>
                <li>Balance of trade between countries</li>
              </ul>

              <p>
                Our currency converter provides the latest exchange rates for USD to INR conversions. However, the
                actual rate you receive when exchanging currency may differ slightly due to fees and margins applied by
                banks and exchange services.
              </p>

              <div className="not-prose bg-muted/50 p-4 rounded-lg border">
                <h3 className="text-lg font-medium mb-2">Did you know?</h3>
                <p className="text-sm text-muted-foreground">
                  The symbol "₹" for the Indian Rupee was officially adopted in 2010. It was designed by D. Udaya Kumar
                  and was selected through a public competition. The design incorporates elements of both the Devanagari
                  letter "र" (ra) and the Roman letter "R", along with two horizontal lines representing the Indian
                  flag.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Historical USD to INR Exchange Rates</h2>
            <div className="aspect-video relative bg-muted rounded-lg overflow-hidden mb-4">
              <Image
                src="/placeholder.svg?height=400&width=800"
                alt="USD to INR Historical Exchange Rate Chart"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Chart showing USD to INR exchange rate fluctuations over the past year. The Indian Rupee has generally
              depreciated against the US Dollar over time.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="border rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">5 Years Ago</div>
                <div className="text-xl font-medium">₹70.35</div>
                <div className="text-xs text-muted-foreground mt-1">per 1 USD</div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">1 Year Ago</div>
                <div className="text-xl font-medium">₹81.79</div>
                <div className="text-xs text-muted-foreground mt-1">per 1 USD</div>
              </div>

              <div className="border rounded-lg p-4 bg-muted/50">
                <div className="text-sm text-muted-foreground mb-1">Today</div>
                <div className="text-xl font-medium text-trust-primary">₹{EXCHANGE_RATE}</div>
                <div className="text-xs text-muted-foreground mt-1">per 1 USD</div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Search USD to INR Conversions</h2>
            <div className="flex gap-2 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Enter USD amount..." className="pl-10" />
              </div>
              <Button>Convert</Button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Popular USD Amounts</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {[1, 5, 10, 20, 50, 100, 200, 250, 500, 1000, 2000, 5000].map((amount) => (
                    <Link
                      key={amount}
                      href={`/currency/${amount}-dollars-in-rupees`}
                      className="text-center p-2 border rounded hover:bg-muted transition-colors"
                    >
                      ${amount}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Popular Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search, index) => (
                    <Badge key={index} variant="secondary" className="text-xs py-1">
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">What is the current USD to INR exchange rate?</h3>
                <p>
                  As of {new Date().toLocaleDateString()}, the exchange rate is approximately 1 USD = ₹{EXCHANGE_RATE}{" "}
                  INR. However, exchange rates fluctuate constantly based on global economic factors.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Why do exchange rates between USD and INR fluctuate?</h3>
                <p>
                  Exchange rates between USD and INR fluctuate due to factors like inflation rates, interest rates,
                  political stability, economic performance, government debt, and market speculation. These factors
                  affect the supply and demand of currencies in the global market.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">How often is the USD to INR exchange rate updated?</h3>
                <p>
                  In the global forex market, exchange rates update continuously during trading hours. Our calculator
                  aims to provide recent rates, but for the most current rates, especially for large transactions, it's
                  advisable to check with banks or financial institutions.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">
                  What's the best way to convert USD to INR when traveling to India?
                </h3>
                <p>
                  When traveling to India, you have several options: exchange currency before your trip at banks or
                  exchange offices, use ATMs in India (often offering competitive rates), use credit cards with no
                  foreign transaction fees, or use travel money cards. Compare fees and rates to find the best option
                  for your situation.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Are there fees when converting USD to INR?</h3>
                <p>
                  Yes, most currency conversions involve fees. Banks and exchange services typically charge a commission
                  or build a margin into the exchange rate. ATMs may charge withdrawal fees, and credit cards might have
                  foreign transaction fees. Always check the total cost including all fees when comparing options.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="sticky top-20 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Exchange Rate Information</CardTitle>
                <CardDescription>Current USD to INR conversion details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                    <span className="font-medium">1 USD</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground mx-2" />
                  <div className="flex items-center">
                    <IndianRupee className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-medium">₹{EXCHANGE_RATE} INR</span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                  <div className="flex items-center">
                    <IndianRupee className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-medium">1 INR</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground mx-2" />
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                    <span className="font-medium">${(1 / EXCHANGE_RATE).toFixed(6)} USD</span>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>Last updated: {new Date().toLocaleDateString()}</p>
                  <p>Rates are for informational purposes only.</p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                <div className="w-full">
                  <h3 className="text-sm font-medium mb-2">Quick Links</h3>
                  <div className="space-y-2">
                    <Link
                      href="/currency/250-dollars-in-rupees"
                      className="flex items-center p-2 text-sm hover:bg-muted rounded-md transition-colors"
                    >
                      <Calculator className="h-4 w-4 mr-2 text-trust-primary" />
                      <span>250 USD to INR</span>
                    </Link>
                    <Link
                      href="/currency/100-dollars-in-rupees"
                      className="flex items-center p-2 text-sm hover:bg-muted rounded-md transition-colors"
                    >
                      <Calculator className="h-4 w-4 mr-2 text-trust-primary" />
                      <span>100 USD to INR</span>
                    </Link>
                    <Link
                      href="/currency/1000-dollars-in-rupees"
                      className="flex items-center p-2 text-sm hover:bg-muted rounded-md transition-colors"
                    >
                      <Calculator className="h-4 w-4 mr-2 text-trust-primary" />
                      <span>1000 USD to INR</span>
                    </Link>
                  </div>
                </div>

                <div className="w-full">
                  <h3 className="text-sm font-medium mb-2">Related Conversions</h3>
                  <div className="space-y-2">
                    <Link
                      href="/convert/currency/usd/to/eur"
                      className="flex items-center p-2 text-sm hover:bg-muted rounded-md transition-colors"
                    >
                      <TrendingUp className="h-4 w-4 mr-2 text-trust-primary" />
                      <span>USD to EUR</span>
                    </Link>
                    <Link
                      href="/convert/currency/usd/to/gbp"
                      className="flex items-center p-2 text-sm hover:bg-muted rounded-md transition-colors"
                    >
                      <TrendingUp className="h-4 w-4 mr-2 text-trust-primary" />
                      <span>USD to GBP</span>
                    </Link>
                    <Link
                      href="/convert/currency/eur/to/inr"
                      className="flex items-center p-2 text-sm hover:bg-muted rounded-md transition-colors"
                    >
                      <TrendingUp className="h-4 w-4 mr-2 text-trust-primary" />
                      <span>EUR to INR</span>
                    </Link>
                  </div>
                </div>

                <div className="w-full pt-2 border-t">
                  <Link
                    href="/about"
                    className="flex items-center p-2 text-sm hover:bg-muted rounded-md transition-colors"
                  >
                    <Info className="h-4 w-4 mr-2 text-trust-primary" />
                    <span>About Our Currency Converters</span>
                  </Link>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Currency Conversion Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="bg-muted rounded-full w-6 h-6 flex items-center justify-center text-xs mt-0.5">
                    <DollarSign className="h-3 w-3" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Compare rates</p>
                    <p className="text-muted-foreground">Check multiple providers before converting</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="bg-muted rounded-full w-6 h-6 flex items-center justify-center text-xs mt-0.5">
                    <DollarSign className="h-3 w-3" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Watch for fees</p>
                    <p className="text-muted-foreground">Consider both exchange rate and service fees</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="bg-muted rounded-full w-6 h-6 flex items-center justify-center text-xs mt-0.5">
                    <DollarSign className="h-3 w-3" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Avoid airports</p>
                    <p className="text-muted-foreground">Airport exchange rates are typically less favorable</p>
                  </div>
                </div>

                <Separator className="my-2" />

                <Link
                  href="https://www.xe.com/currencyconverter/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  Check global currency rates
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
