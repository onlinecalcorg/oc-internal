import { PercentageCalculator } from "@/components/calculators/percentage-calculator"

interface PercentageCalculatorContentProps {
  jsonLd: any
}

export function PercentageCalculatorContent({ jsonLd }: PercentageCalculatorContentProps) {
  return (
    <div className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-3xl mx-auto">
        <PercentageCalculator />
      </div>

      <div className="prose max-w-none dark:prose-invert">
        <h2>Understanding Percentages</h2>
        <p>
          Percentages are a fundamental mathematical concept used to express a fraction of 100. The term "percent" comes
          from the Latin "per centum," meaning "by the hundred." Percentages are used extensively in everyday life, from
          calculating discounts and tips to understanding statistics and financial data.
        </p>

        <h3>Types of Percentage Calculations</h3>

        <h4>Basic Percentage Calculation</h4>
        <p>This involves finding a percentage of a given number. For example, to find 15% of 200:</p>
        <pre>15% of 200 = (15/100) × 200 = 30</pre>

        <h4>Finding What Percentage One Number is of Another</h4>
        <p>
          This calculation determines what percentage one value represents of another. For example, to find what
          percentage 30 is of 200:
        </p>
        <pre>30 is what % of 200? = (30/200) × 100 = 15%</pre>

        <h4>Percentage Change</h4>
        <p>
          This calculates the percentage increase or decrease from one value to another. For example, if a price changes
          from $200 to $250:
        </p>
        <pre>Percentage change = ((250 - 200) / 200) × 100 = 25% increase</pre>

        <h4>Tip Calculation</h4>
        <p>
          This helps determine the appropriate tip amount based on a bill total and desired tip percentage. For example,
          a 15% tip on a $100 bill:
        </p>
        <pre>Tip amount = $100 × 15% = $15</pre>
        <pre>Total bill with tip = $100 + $15 = $115</pre>

        <h3>Common Applications of Percentages</h3>

        <h4>Finance and Business</h4>
        <ul>
          <li>
            <strong>Discounts and Sales:</strong> Calculating sale prices after percentage discounts.
          </li>
          <li>
            <strong>Interest Rates:</strong> Computing interest on loans and investments.
          </li>
          <li>
            <strong>Tax Calculations:</strong> Determining tax amounts based on percentage rates.
          </li>
          <li>
            <strong>Profit Margins:</strong> Analyzing business performance and pricing strategies.
          </li>
        </ul>

        <h4>Education and Statistics</h4>
        <ul>
          <li>
            <strong>Grades:</strong> Expressing test scores as percentages.
          </li>
          <li>
            <strong>Data Analysis:</strong> Representing proportions of data in research and surveys.
          </li>
          <li>
            <strong>Growth Rates:</strong> Measuring changes in populations or trends over time.
          </li>
        </ul>

        <h4>Everyday Life</h4>
        <ul>
          <li>
            <strong>Tipping:</strong> Calculating appropriate gratuities at restaurants and for services.
          </li>
          <li>
            <strong>Budgeting:</strong> Allocating percentages of income to different expenses.
          </li>
          <li>
            <strong>Nutrition:</strong> Understanding nutritional information on food labels.
          </li>
          <li>
            <strong>Sales Tax:</strong> Adding tax to purchase prices.
          </li>
        </ul>

        <h3>Tips for Working with Percentages</h3>
        <ul>
          <li>Remember that 100% equals the whole amount.</li>
          <li>To convert a percentage to a decimal, divide by 100 (e.g., 15% = 0.15).</li>
          <li>To convert a decimal to a percentage, multiply by 100 (e.g., 0.15 = 15%).</li>
          <li>When calculating percentage increases, be careful to use the original value as the denominator.</li>
          <li>
            For quick mental calculations, remember that 10% is easy to calculate (just move the decimal point), and you
            can use that as a reference for other percentages.
          </li>
        </ul>

        <p>
          Our percentage calculator simplifies these calculations, allowing you to quickly and accurately perform
          various percentage operations for business, education, or personal use.
        </p>
      </div>
    </div>
  )
}
