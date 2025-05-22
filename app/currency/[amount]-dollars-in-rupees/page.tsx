import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowRight, DollarSign, IndianRupee, TrendingUp, Info, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { DollarToRupeeResult } from "@/components/converters/dollar-to-rupee-result"
import { CurrencyConverter } from "@/components/converters/currency-converter"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Define the exchange rate (this would ideally come from an API)
const EXCHANGE_RATE = 83.12 // 1 USD = 83.12 INR (example rate)

interface PageProps {
  params: {
    amount: string
  }
}

export function generateMetadata({ params }: PageProps): Metadata {
  // If params.amount is undefined, provide default metadata
  if (!params.amount) {
    return {
      title: "Dollars to Rupees Converter | Currency Exchange Calculator",
      description:
        "Convert US Dollars (USD) to Indian Rupees (INR) with our free currency converter. Get accurate and up-to-date exchange rates.",
    }
  }

  // Parse the amount from the URL
  const amount = Number.parseFloat(params.amount.replace(/-/g, "."))

  // Calculate the conversion
  const inrAmount = (amount * EXCHANGE_RATE).toFixed(2)

  return {
    title: `${amount} USD to INR | ${amount} Dollars in Rupees (₹${inrAmount})`,
    description: `Convert ${amount} US Dollars to Indian Rupees. ${amount} USD equals ₹${inrAmount} INR based on today's exchange rate. Free currency calculator with live rates.`,
    keywords: [
      `${amount} dollars in rupees`,
      `${amount} usd to inr`,
      `convert ${amount} dollars to rupees`,
      `${amount} usd in indian currency`,
      "dollar to rupee exchange rate",
      "usd to inr calculator",
      "currency converter",
      "exchange rate calculator",
      "us dollar to indian rupee",
      "foreign currency exchange",
      "best usd to inr rate",
      "live dollar rate in india",
      "currency exchange near me",
      "how much is dollar in rupees",
      "dollar rate today",
    ],
    openGraph: {
      title: `${amount} USD to INR | ${amount} Dollars in Rupees`,
      description: `${amount} US Dollars = ₹${inrAmount} Indian Rupees. Live exchange rate calculator and currency conversion guide.`,
      type: "website",
      locale: "en_US",
      url: `https://calculatorsuite.vercel.app/currency/${amount}-dollars-in-rupees`,
      images: [
        {
          url: `https://calculatorsuite.vercel.app/api/og?title=${amount}+USD+to+INR&subtitle=${amount}+Dollars+%3D+%E2%82%B9${inrAmount}+Rupees`,
          width: 1200,
          height: 630,
          alt: `${amount} USD to INR conversion`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${amount} USD to INR | ${amount} Dollars in Rupees`,
      description: `${amount} US Dollars = ₹${inrAmount} Indian Rupees. Live exchange rate calculator.`,
      images: [
        `https://calculatorsuite.vercel.app/api/og?title=${amount}+USD+to+INR&subtitle=${amount}+Dollars+%3D+%E2%82%B9${inrAmount}+Rupees`,
      ],
    },
  }
}

export default function DollarToRupeePage({ params }: PageProps) {
  // If params.amount is undefined, redirect to the list page
  if (!params.amount) {
    return notFound()
  }

  // Parse the amount from the URL
  const amount = Number.parseFloat(params.amount.replace(/-/g, "."))

  // If amount is not a valid number, redirect to the list page
  if (isNaN(amount)) {
    return notFound()
  }

  // Calculate the conversion
  const inrAmount = (amount * EXCHANGE_RATE).toFixed(2)

  // Generate schema.org JSON-LD
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${amount} USD to INR | ${amount} Dollars in Rupees`,
    description: `Convert ${amount} US Dollars to Indian Rupees. ${amount} USD equals ₹${inrAmount} INR based on today's exchange rate.`,
    dateModified: new Date().toISOString(),
    mainEntity: [
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `How much is ${amount} USD in Indian Rupees?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${amount} US Dollars equals ₹${inrAmount} Indian Rupees at the current exchange rate of 1 USD = ₹${EXCHANGE_RATE}.`,
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
            name: "What's the best way to convert USD to INR when traveling to India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "When traveling to India, you have several options: exchange currency before your trip at banks or exchange offices, use ATMs in India (often offering competitive rates), use credit cards with no foreign transaction fees, or use travel money cards. Compare fees and rates to find the best option for your situation.",
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
          {
            "@type": "ListItem",
            position: 3,
            name: `${amount} USD to INR`,
            item: `https://calculatorsuite.vercel.app/currency/${amount}-dollars-in-rupees`,
          },
        ],
      },
    ],
  }

  // Related conversions
  const relatedAmounts = [50, 100, 200, 500, 1000].filter((a) => a !== amount)

  // Common questions about this specific amount
  const specificQuestions = [
    {
      question: `How much is ${amount} USD in Indian Rupees?`,
      answer: `As of today, ${amount} US Dollars equals ₹${inrAmount} Indian Rupees based on the current exchange rate of 1 USD = ₹${EXCHANGE_RATE}. This conversion uses the latest market rates, but actual rates at banks or money changers may vary slightly due to fees and margins.`,
    },
    {
      question: `Is ${amount} USD a lot of money in India?`,
      answer: `${amount} USD (approximately ₹${inrAmount}) in India can have different purchasing power depending on the context. In major cities like Mumbai or Delhi, it might cover ${
        amount < 50
          ? "a nice meal for two at a casual restaurant"
          : amount < 200
            ? "a few days of budget accommodation or several meals at mid-range restaurants"
            : amount < 1000
              ? "a week of comfortable accommodation or a few days at a nice hotel"
              : "several weeks of comfortable living including accommodation, food, and local transportation"
      }. In smaller towns or rural areas, the same amount would go much further.`,
    },
    {
      question: `How has the value of ${amount} USD to INR changed over time?`,
      answer: `The value of ${amount} USD in Indian Rupees has changed significantly over the years due to fluctuating exchange rates. Five years ago, ${amount} USD would have been worth approximately ₹${(amount * 70).toFixed(2)}, and ten years ago around ₹${(amount * 60).toFixed(2)}. This demonstrates the general trend of the Indian Rupee depreciating against the US Dollar over time, influenced by factors like inflation differentials, interest rates, and economic growth patterns between the two countries.`,
    },
  ]

  return (
    <div className="container px-4 py-8 md:py-12">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/currency/dollars-to-rupees">USD to INR</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/currency/${amount}-dollars-in-rupees`} isCurrentPage>
            {amount} USD to INR
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {amount} USD to INR | {amount} Dollars in Rupees
            </h1>
            <Badge variant="outline" className="w-fit">
              Updated Today
            </Badge>
          </div>

          <div className="text-xl text-muted-foreground mb-8 flex flex-wrap items-center gap-2">
            <span className="font-medium text-foreground">
              {amount} US Dollars = ₹{inrAmount} Indian Rupees
            </span>
            <span className="text-sm">(1 USD = ₹{EXCHANGE_RATE})</span>
          </div>

          <Card className="mb-8">
            <CardHeader className="pb-3">
              <CardTitle>Conversion Result</CardTitle>
              <CardDescription>Based on the exchange rate of 1 USD = ₹{EXCHANGE_RATE}</CardDescription>
            </CardHeader>
            <CardContent>
              <DollarToRupeeResult amount={amount} exchangeRate={EXCHANGE_RATE} fromCurrency="USD" toCurrency="INR" />
            </CardContent>
          </Card>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">About This Conversion</h2>
            <div className="prose max-w-none dark:prose-invert">
              <p>
                This page provides the conversion of {amount} US Dollars (USD) to Indian Rupees (INR) using the current
                exchange rate. The US Dollar is the official currency of the United States and several other countries,
                while the Indian Rupee is the official currency of India.
              </p>

              <p>
                With {amount} USD, you can get approximately ₹{inrAmount} INR. This amount in Indian Rupees could be
                used for:
              </p>

              <ul>
                {amount < 50 && (
                  <>
                    <li>A casual dining experience for two at a mid-range restaurant in India</li>
                    <li>A one-way taxi ride from the airport to the city center in major Indian cities</li>
                    <li>Several days of local transportation via auto-rickshaws or buses</li>
                  </>
                )}

                {amount >= 50 && amount < 200 && (
                  <>
                    <li>A night's stay at a decent budget hotel in most Indian cities</li>
                    <li>A nice dinner for two at a good restaurant in a metropolitan area</li>
                    <li>A day trip with a local guide to nearby attractions</li>
                  </>
                )}

                {amount >= 200 && amount < 1000 && (
                  <>
                    <li>Several nights at a mid-range hotel in major Indian cities</li>
                    <li>A domestic flight ticket between major Indian cities</li>
                    <li>A week's worth of meals and local transportation for a budget traveler</li>
                  </>
                )}

                {amount >= 1000 && (
                  <>
                    <li>A week or more at a good hotel in most Indian cities</li>
                    <li>A high-end smartphone or electronic device</li>
                    <li>A comprehensive tour package covering multiple destinations in India</li>
                  </>
                )}
              </ul>

              <p>
                Exchange rates fluctuate constantly based on global economic factors. The rate used for this conversion
                (1 USD = ₹{EXCHANGE_RATE}) is for informational purposes and may not reflect the exact rate offered by
                banks or money transfer services.
              </p>

              <p>
                For the most accurate and up-to-date rates, especially for large transactions, it's advisable to check
                with financial institutions or currency exchange services.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">How to Convert USD to INR</h2>
            <div className="space-y-4">
              <p>To convert US Dollars to Indian Rupees, multiply the USD amount by the current exchange rate:</p>

              <div className="bg-muted p-4 rounded-md font-mono text-center mb-4 overflow-x-auto">
                <span className="text-green-600">{amount} USD</span> ×{" "}
                <span className="text-blue-600">{EXCHANGE_RATE}</span> ={" "}
                <span className="text-trust-primary">₹{inrAmount} INR</span>
              </div>

              <p>
                This calculation gives you the equivalent amount in Indian Rupees based on the current exchange rate.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Physical Exchange</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="bg-muted rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                          1
                        </span>
                        <span>Visit a bank or currency exchange service</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-muted rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                          2
                        </span>
                        <span>Present your USD and identification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-muted rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                          3
                        </span>
                        <span>Receive INR at their offered exchange rate</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-muted rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                          4
                        </span>
                        <span>Pay any applicable service fees</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Digital Transfer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="bg-muted rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                          1
                        </span>
                        <span>Use an online money transfer service</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-muted rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                          2
                        </span>
                        <span>Enter the amount and recipient details</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-muted rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                          3
                        </span>
                        <span>Review the exchange rate and fees</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-muted rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                          4
                        </span>
                        <span>Complete the transaction securely</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Historical USD to INR Exchange Rate</h2>
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
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Related Conversions</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {relatedAmounts.map((relatedAmount) => (
                <Link
                  key={relatedAmount}
                  href={`/currency/${relatedAmount}-dollars-in-rupees`}
                  className="flex items-center p-3 border rounded-md hover:bg-muted transition-colors"
                >
                  <div className="mr-2 flex-shrink-0">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium">{relatedAmount} USD</div>
                    <div className="text-sm text-muted-foreground">₹{(relatedAmount * EXCHANGE_RATE).toFixed(2)}</div>
                  </div>
                </Link>
              ))}
              <Link
                href="/currency/dollars-to-rupees"
                className="flex items-center p-3 border rounded-md hover:bg-muted transition-colors"
              >
                <div className="mr-2 flex-shrink-0">
                  <ArrowRight className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">More Conversions</div>
                  <div className="text-sm text-muted-foreground">View all USD to INR</div>
                </div>
              </Link>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {specificQuestions.map((faq, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Are there fees when converting USD to INR?</h3>
                <p>
                  Yes, most currency conversions involve fees. Banks and exchange services typically charge a commission
                  or build a margin into the exchange rate. ATMs may charge withdrawal fees, and credit cards might have
                  foreign transaction fees. Always check the total cost including all fees when comparing options.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">How can I get the best USD to INR exchange rate?</h3>
                <p>
                  To get the best exchange rate: compare rates from multiple providers (banks, exchange offices, online
                  services), avoid exchanging at airports or tourist areas where rates are typically less favorable,
                  consider using credit cards with no foreign transaction fees for purchases, and plan ahead to take
                  advantage of favorable rate movements.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Popular USD to INR Searches</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[1, 5, 10, 20, 50, 100, 200, 250, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000].map(
                (searchAmount) => (
                  <Link
                    key={searchAmount}
                    href={`/currency/${searchAmount}-dollars-in-rupees`}
                    className="text-sm p-2 border rounded hover:bg-muted transition-colors flex items-center justify-between"
                  >
                    <span>${searchAmount}</span>
                    <span className="text-muted-foreground">₹{(searchAmount * EXCHANGE_RATE).toFixed(0)}</span>
                  </Link>
                ),
              )}
            </div>
          </div>

          <div className="rounded-lg border p-4 bg-muted/50">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h3 className="font-medium mb-1">Disclaimer</h3>
                <p className="text-sm text-muted-foreground">
                  The exchange rates on this page are for informational purposes only. Actual rates may vary based on
                  various factors including transaction fees, time of day, and transaction amount. Always verify current
                  rates before making financial decisions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="sticky top-20 space-y-6">
            <CurrencyConverter initialAmount={amount} initialFromCurrency="USD" />

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Travel Tips for India</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="bg-muted rounded-full w-6 h-6 flex items-center justify-center text-xs mt-0.5">
                    <IndianRupee className="h-3 w-3" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Carry some cash</p>
                    <p className="text-muted-foreground">Small shops and rural areas may not accept cards</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="bg-muted rounded-full w-6 h-6 flex items-center justify-center text-xs mt-0.5">
                    <IndianRupee className="h-3 w-3" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Inform your bank</p>
                    <p className="text-muted-foreground">Notify your bank before using cards in India</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="bg-muted rounded-full w-6 h-6 flex items-center justify-center text-xs mt-0.5">
                    <IndianRupee className="h-3 w-3" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Use ATMs wisely</p>
                    <p className="text-muted-foreground">Stick to ATMs at banks for better security</p>
                  </div>
                </div>

                <Separator className="my-2" />

                <div className="text-sm">
                  <p className="font-medium">What can {amount} USD buy in India?</p>
                  <ul className="text-muted-foreground mt-1 space-y-1">
                    {amount < 50 && (
                      <>
                        <li>• Several street food meals</li>
                        <li>• A day of local transportation</li>
                        <li>• Basic souvenirs and handicrafts</li>
                      </>
                    )}

                    {amount >= 50 && amount < 200 && (
                      <>
                        <li>• A night at a budget hotel</li>
                        <li>• A meal for two at a nice restaurant</li>
                        <li>• Entry to several tourist attractions</li>
                      </>
                    )}

                    {amount >= 200 && amount < 1000 && (
                      <>
                        <li>• Several nights at a mid-range hotel</li>
                        <li>• A domestic flight ticket</li>
                        <li>• A quality handmade textile or artwork</li>
                      </>
                    )}

                    {amount >= 1000 && (
                      <>
                        <li>• A week at a good hotel</li>
                        <li>• A premium smartphone</li>
                        <li>• A multi-city tour package</li>
                      </>
                    )}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href="https://www.incredibleindia.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  Learn more about traveling to India
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Related Conversions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
