import Link from "next/link"
import { DollarSign, IndianRupee, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Define the exchange rate (this would ideally come from an API)
const EXCHANGE_RATE = 83.12 // 1 USD = 83.12 INR (example rate)

export function HomepageCurrencySection() {
  // Popular USD amounts
  const popularAmounts = [100, 250, 500, 1000, 5000]

  return (
    <section className="py-12 md:py-16">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Currency Conversion</h2>
            <p className="text-muted-foreground mt-2">
              Convert between US Dollars and Indian Rupees with our free currency calculator
            </p>
          </div>
          <Link href="/currency/dollars-to-rupees">
            <Button variant="outline" className="gap-2">
              <span>View All Conversions</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>USD to INR Converter</CardTitle>
              <CardDescription>Convert US Dollars to Indian Rupees</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center p-4 bg-muted rounded-md mb-4">
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

              <div className="text-sm text-muted-foreground mb-4">
                <p>Last updated: {new Date().toLocaleDateString()}</p>
                <p>Rates are for informational purposes only.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/currency/dollars-to-rupees" className="w-full">
                <Button className="w-full">Convert USD to INR</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Conversions</CardTitle>
              <CardDescription>Quick USD to INR calculations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {popularAmounts.map((amount) => (
                <Link
                  key={amount}
                  href={`/currency/${amount}-dollars-in-rupees`}
                  className="flex justify-between items-center p-2 hover:bg-muted rounded-md transition-colors"
                >
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-green-600 mr-1" />
                    <span>{amount} USD</span>
                  </div>
                  <div className="flex items-center">
                    <IndianRupee className="h-4 w-4 text-blue-600 mr-1" />
                    <span>{(amount * EXCHANGE_RATE).toFixed(2)} INR</span>
                  </div>
                </Link>
              ))}
            </CardContent>
            <CardFooter>
              <Link href="/currency/250-dollars-in-rupees" className="w-full">
                <Button variant="outline" className="w-full">
                  View 250 USD to INR
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Currency Conversion Guide</CardTitle>
              <CardDescription>Tips for getting the best exchange rates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Exchange rates between USD and INR fluctuate based on economic factors. Our converter provides
                up-to-date rates for accurate conversions.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="bg-muted rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                    1
                  </span>
                  <span>Compare rates from multiple providers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-muted rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                    2
                  </span>
                  <span>Consider both exchange rate and fees</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-muted rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                    3
                  </span>
                  <span>Avoid airport and tourist area exchanges</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/currency/dollars-to-rupees#faq" className="w-full">
                <Button variant="outline" className="w-full">
                  Read More Tips
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
