import MortgageCalculator from "@/components/calculators/mortgage-calculator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MortgageContentProps {
  jsonLd?: any
}

export function MortgageContent({ jsonLd }: MortgageContentProps) {
  // FAQ data for mortgage calculator
  const faqData = [
    {
      question: "How is the monthly mortgage payment calculated?",
      answer:
        "The monthly payment is calculated using the loan amount, interest rate, and loan term. It includes principal and interest payments, and optionally property taxes, insurance, and other costs.",
    },
    {
      question: "What is PMI and when is it required?",
      answer:
        "Private Mortgage Insurance (PMI) is typically required when your down payment is less than 20% of the home's value. It protects the lender if you default on the loan and adds to your monthly payment.",
    },
    {
      question: "How do extra payments affect my mortgage?",
      answer:
        "Making extra payments reduces your principal balance faster, which can significantly shorten your loan term and save you thousands in interest over the life of the loan.",
    },
    {
      question: "What's the difference between fixed-rate and adjustable-rate mortgages?",
      answer:
        "Fixed-rate mortgages maintain the same interest rate for the entire loan term, providing payment stability. Adjustable-rate mortgages (ARMs) have interest rates that can change periodically, typically offering lower initial rates but with potential for increases later.",
    },
    {
      question: "How does my credit score affect my mortgage rate?",
      answer:
        "Your credit score significantly impacts your mortgage interest rate. Higher credit scores typically qualify for lower interest rates, which can save you thousands over the life of your loan. Most lenders consider scores above 740 as excellent.",
    },
  ]

  // Use cases for mortgage calculator
  const useCasesData = [
    {
      title: "First-Time Home Buyer Planning",
      description:
        "First-time buyers can understand how different down payments, interest rates, and home prices affect their monthly payments and long-term costs.",
    },
    {
      title: "Refinancing Analysis",
      description:
        "Homeowners can compare their current mortgage with refinancing options to determine potential savings and break-even points.",
    },
    {
      title: "Extra Payment Strategy",
      description:
        "Mortgage holders can see how making extra payments can reduce their loan term and save on interest over the life of the loan.",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Render JSON-LD if provided */}
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}

      {/* Main Calculator */}
      <MortgageCalculator />

      {/* Additional Information Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Mortgage Calculator Information</CardTitle>
          <CardDescription>Learn more about using our mortgage calculator</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="how-to-use">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="how-to-use">How to Use</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
            </TabsList>
            <TabsContent value="how-to-use" className="space-y-4 mt-4">
              <h3 className="text-lg font-semibold">How to Use This Calculator</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">1. Enter Home Price</h4>
                  <p className="text-muted-foreground">
                    Input the total purchase price of the home you're considering. This is the full market value.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">2. Set Down Payment</h4>
                  <p className="text-muted-foreground">
                    Enter your down payment amount or use the slider to adjust the percentage. A higher down payment
                    typically results in lower monthly payments and may eliminate the need for PMI.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">3. Select Loan Term</h4>
                  <p className="text-muted-foreground">
                    Choose between common loan terms (15, 20, or 30 years). Shorter terms have higher monthly payments
                    but lower total interest costs.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">4. Adjust Interest Rate</h4>
                  <p className="text-muted-foreground">
                    Set the annual interest rate for your mortgage. Even small changes in interest rate can
                    significantly impact your monthly payment and total interest paid.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">5. Review Results</h4>
                  <p className="text-muted-foreground">
                    The calculator will instantly show your estimated monthly payment, total payment over the life of
                    the loan, and total interest paid. You can also view the amortization schedule to see how your loan
                    balance decreases over time.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="faq" className="space-y-4 mt-4">
              <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqData.map((item, index) => (
                  <div key={index}>
                    <h4 className="font-medium">{item.question}</h4>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="use-cases" className="space-y-4 mt-4">
              <h3 className="text-lg font-semibold">Common Use Cases</h3>
              <div className="space-y-4">
                {useCasesData.map((item, index) => (
                  <div key={index}>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Additional Educational Content */}
      <Card>
        <CardHeader>
          <CardTitle>Understanding Mortgage Calculations</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none dark:prose-invert">
          <p>
            A mortgage calculator helps you estimate your monthly home loan payments based on the purchase price, down
            payment, interest rate, and loan term. Understanding these calculations can help you make informed decisions
            about your home purchase.
          </p>

          <h3>The Mortgage Payment Formula</h3>
          <p>The monthly payment for a fixed-rate mortgage is calculated using the following formula:</p>
          <pre className="bg-muted p-2 rounded-md overflow-x-auto">M = P [ i(1 + i)^n ] / [ (1 + i)^n - 1]</pre>
          <p>Where:</p>
          <ul>
            <li>M = monthly payment</li>
            <li>P = principal (loan amount)</li>
            <li>i = monthly interest rate (annual rate divided by 12)</li>
            <li>n = number of payments (loan term in years × 12)</li>
          </ul>

          <h3>Factors That Affect Your Mortgage Payment</h3>
          <p>Several factors can significantly impact your monthly mortgage payment:</p>
          <ul>
            <li>
              <strong>Loan Amount:</strong> The purchase price minus your down payment
            </li>
            <li>
              <strong>Interest Rate:</strong> Determined by market conditions, your credit score, and loan type
            </li>
            <li>
              <strong>Loan Term:</strong> Typically 15, 20, or 30 years
            </li>
            <li>
              <strong>Down Payment:</strong> A larger down payment reduces your loan amount and may eliminate PMI
            </li>
            <li>
              <strong>Property Taxes:</strong> Annual taxes divided by 12 if included in your payment
            </li>
            <li>
              <strong>Homeowners Insurance:</strong> Annual premium divided by 12 if included in your payment
            </li>
            <li>
              <strong>Private Mortgage Insurance (PMI):</strong> Required if your down payment is less than 20%
            </li>
          </ul>

          <h3>Amortization: How Your Loan Balance Decreases Over Time</h3>
          <p>
            Amortization refers to the process of paying off your mortgage through regular payments. In the early years
            of your mortgage, a larger portion of each payment goes toward interest rather than principal. As time
            passes, this ratio shifts, with more of each payment going toward reducing the principal balance.
          </p>
          <p>
            The amortization schedule shows how each payment is divided between principal and interest, and how your
            loan balance decreases over time. Understanding this schedule can help you make informed decisions about
            extra payments or refinancing options.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
