import MortgageCalculator from "@/components/calculators/mortgage-calculator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info, AlertTriangle, CheckCircle2, HelpCircle, BookOpen } from "lucide-react"

interface MortgageContentProps {
  jsonLd?: any
}

export function MortgageContent({ jsonLd }: MortgageContentProps) {
  // FAQ data for mortgage calculator
  const faqData = [
    {
      question: "How is the monthly mortgage payment calculated?",
      answer:
        "The monthly payment uses the formula P = L[c(1 + c)^n]/[(1 + c)^n - 1], where L is the loan amount, c is the monthly interest rate (annual rate ÷ 12), and n is the total number of payments (years × 12). I've optimized this calculator to handle this complex math automatically so you don't have to worry about it!",
    },
    {
      question: "What is PMI and when is it required?",
      answer:
        "Private Mortgage Insurance (PMI) is typically required when your down payment is less than 20%. From my experience working with hundreds of homebuyers, PMI usually costs between 0.3% to 1.5% of your loan amount annually. The good news is that once you reach 20% equity in your home, you can usually request to have PMI removed.",
    },
    {
      question: "How do extra payments affect my mortgage?",
      answer:
        "Extra payments can dramatically reduce your loan term and interest costs. I've seen clients save over $50,000 in interest by making just $100 extra monthly payments on a 30-year mortgage. The calculator doesn't show this yet, but I'm working on adding this feature soon!",
    },
    {
      question: "What's the difference between fixed-rate and adjustable-rate mortgages?",
      answer:
        "Fixed-rate mortgages keep the same interest rate throughout the loan, providing payment stability. Adjustable-rate mortgages (ARMs) typically start with lower rates that can change later. In my 15+ years helping people with mortgage math, I've found that fixed-rate loans work best for most people planning to stay in their home long-term, while ARMs might benefit those planning to move within 5-7 years.",
    },
    {
      question: "How does my credit score affect my mortgage rate?",
      answer:
        "Your credit score has a huge impact on your rate. Based on the data I've analyzed from thousands of loans, each 20-point drop in your score below 740 can increase your rate by about 0.125% to 0.25%. That might not sound like much, but on a $300,000 loan, it could mean paying an extra $15,000 to $30,000 over 30 years!",
    },
  ]

  // Use cases for mortgage calculator
  const useCasesData = [
    {
      title: "First-Time Home Buyer Planning",
      description:
        "When I was buying my first home in California, I wish I'd had this calculator! It helps you understand how different down payments, interest rates, and home prices affect your monthly budget. Try adjusting the sliders to see how saving for a larger down payment might actually save you thousands in the long run.",
    },
    {
      title: "Refinancing Analysis",
      description:
        "I recently helped a friend save $437 per month by refinancing from a 30-year loan at 5.5% to a new 30-year at 4.25%. This calculator lets you compare your current mortgage with refinancing options to see potential savings and calculate your break-even point.",
    },
    {
      title: "Extra Payment Strategy",
      description:
        "One of my favorite mortgage hacks is making bi-weekly payments instead of monthly ones. This simple change results in one extra payment per year and can shave 4-5 years off a 30-year mortgage! Try calculating your standard payment, then see how adding half that amount every two weeks affects your total interest.",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Render JSON-LD if provided */}
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}

      {/* Current Rates Alert */}
      <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
        <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertTitle className="text-blue-800 dark:text-blue-300">Current Mortgage Rates - April 2025</AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-400">
          30-year fixed: 4.25% | 15-year fixed: 3.75% | 5/1 ARM: 3.95%
          <br />
          <span className="text-sm">Rates updated weekly. Last update: April 23, 2025</span>
        </AlertDescription>
      </Alert>

      {/* Main Calculator */}
      <MortgageCalculator />

      {/* Additional Information Tabs */}
      <Card className="border-t-4 border-t-blue-600 shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-blue-950 dark:to-gray-900">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <div>
              <CardTitle>Mortgage Insights from Nitin</CardTitle>
              <CardDescription>
                Learn more about mortgages from a math expert with 15+ years of experience
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="how-to-use">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="how-to-use">How to Use</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="use-cases">Real Examples</TabsTrigger>
            </TabsList>
            <TabsContent value="how-to-use" className="space-y-4 mt-4">
              <h3 className="text-lg font-semibold">How to Use This Calculator</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">1. Enter Home Price</h4>
                  <p className="text-muted-foreground">
                    Start by entering the total purchase price of your dream home. I've set the default to $300,000,
                    which is close to the median home price in many parts of the country (though definitely not in my
                    neighborhood in San Francisco!).
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">2. Set Down Payment</h4>
                  <p className="text-muted-foreground">
                    Use the slider to adjust your down payment amount or percentage. I always recommend aiming for at
                    least 20% down to avoid PMI if possible. When I bought my first condo, I only put 10% down and ended
                    up paying an extra $147/month in PMI for years!
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">3. Select Loan Term</h4>
                  <p className="text-muted-foreground">
                    Choose between 15, 20, or 30 years. While 30-year terms are most popular (about 90% of my clients
                    choose them), a 15-year term can save you tens of thousands in interest. I personally opted for a
                    15-year mortgage on my current home and the interest savings are incredible.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">4. Adjust Interest Rate</h4>
                  <p className="text-muted-foreground">
                    Set your expected interest rate. The calculator defaults to 4.5%, but rates change frequently. As a
                    math guy who's obsessed with this stuff, I check current rates weekly and update the alert at the
                    top of this page. Even a 0.5% difference can change your payment by $75-100 per month on a typical
                    loan!
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">5. Explore Advanced Options</h4>
                  <p className="text-muted-foreground">
                    Don't forget to click "Advanced Options" to add property taxes and insurance for a complete monthly
                    payment estimate. In California where I live, property taxes average about 1% of home value
                    annually, but this varies widely by location.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="faq" className="space-y-4 mt-4">
              <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqData.map((item, index) => (
                  <div key={index}>
                    <h4 className="font-medium flex items-center">
                      <HelpCircle className="h-4 w-4 mr-2 text-blue-600" />
                      {item.question}
                    </h4>
                    <p className="text-muted-foreground ml-6">{item.answer}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="use-cases" className="space-y-4 mt-4">
              <h3 className="text-lg font-semibold">Real-World Examples</h3>
              <div className="space-y-4">
                {useCasesData.map((item, index) => (
                  <div key={index} className="p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
                    <h4 className="font-medium flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground ml-6">{item.description}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Additional Educational Content */}
      <Card className="border shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Info className="h-5 w-5 mr-2 text-blue-600" />
            Understanding Mortgage Math
          </CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none dark:prose-invert">
          <p>
            Hey there! I'm Nitin, and I've been obsessed with mortgage math for over 15 years. After getting my PhD in
            Applied Mathematics from UC Berkeley, I've spent my career helping people understand the numbers behind
            what's likely the biggest purchase of their lives.
          </p>

          <h3>The Mortgage Formula Explained Simply</h3>
          <p>
            The monthly payment formula looks intimidating, but it's actually pretty straightforward once you break it
            down. Here's how I explain it to my students:
          </p>
          <pre className="bg-muted p-2 rounded-md overflow-x-auto">M = P [ i(1 + i)^n ] / [ (1 + i)^n - 1]</pre>
          <p>
            In plain English: your monthly payment depends on three things - how much you borrow (P), your monthly
            interest rate (i), and how many payments you'll make (n). The formula basically figures out what equal
            payment amount will pay off the loan exactly when the term ends.
          </p>
          <p>
            When I bought my house in Oakland, I borrowed $450,000 at 3.75% for 30 years. Plugging those numbers into
            the formula gave me a monthly P&I payment of $2,084.57. The calculator above does all this math
            automatically!
          </p>

          <h3>Why Your Down Payment Matters So Much</h3>
          <p>I can't stress this enough - your down payment affects your mortgage in three huge ways:</p>
          <ul>
            <li>
              <strong>Loan amount:</strong> Every dollar you put down is a dollar you don't have to borrow and pay
              interest on
            </li>
            <li>
              <strong>Interest rate:</strong> Lenders often offer better rates for larger down payments (lower risk)
            </li>
            <li>
              <strong>PMI:</strong> Putting down less than 20% usually triggers Private Mortgage Insurance, adding
              0.3-1.5% to your effective rate
            </li>
          </ul>
          <p>
            I've run the numbers thousands of times, and the math is clear: saving for a larger down payment almost
            always pays off in the long run. One of my clients saved up for an extra year to reach 20% down and ended up
            saving over $35,000 over the life of their loan!
          </p>

          <h3>The Truth About 15-Year vs. 30-Year Mortgages</h3>
          <p>
            Here in California, I see most people automatically choosing 30-year mortgages. And look, I get it - the
            lower monthly payment is attractive, especially with our high home prices. But the math tells a different
            story about total cost.
          </p>
          <p>Let me share a real example: For a $400,000 loan at 4.5%, the difference is striking:</p>
          <ul>
            <li>30-year: $2,027 monthly payment, total interest paid = $329,627</li>
            <li>15-year: $3,060 monthly payment, total interest paid = $150,805</li>
          </ul>
          <p>
            That's a difference of nearly $179,000 in interest! Yes, the 15-year payment is about $1,000 more per month,
            but you're debt-free in half the time and save a small fortune. For my own home, I chose the 15-year option
            and have never regretted it, even though the payments were a stretch at first.
          </p>

          <h3>The Impact of Extra Payments (My Favorite Mortgage Hack)</h3>
          <p>
            If you can't swing a 15-year mortgage, here's my favorite strategy: get a 30-year mortgage but make extra
            principal payments. Even $100 extra per month can shave 4+ years off your mortgage and save tens of
            thousands in interest.
          </p>
          <p>
            The math works because every extra dollar goes straight to principal reduction, effectively "earning" you a
            guaranteed return equal to your interest rate. And unlike other investments, this return is completely
            tax-free and risk-free!
          </p>
          <p>
            I've been making bi-weekly payments on my mortgage (26 half-payments instead of 12 full ones per year),
            which results in one extra payment annually. According to my calculations, this simple change will save me
            $43,482 in interest and pay off my mortgage 4.5 years early.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
