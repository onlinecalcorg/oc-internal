import { CalculatorContentLayout } from "./calculator-content-layout"
import RetirementSavingsCalculator from "@/components/calculators/retirement-savings-calculator"

export function RetirementSavingsContent({ jsonLd }: { jsonLd: Record<string, any> }) {
  const useCases = [
    {
      title: "Early Career Planning",
      description:
        "Young professionals can use the calculator to understand the power of compound interest and set up effective retirement savings habits early.",
    },
    {
      title: "Mid-Career Assessment",
      description:
        "Mid-career individuals can evaluate if they're on track for retirement and make adjustments to their savings strategy if needed.",
    },
    {
      title: "Pre-Retirement Verification",
      description:
        "Those approaching retirement can confirm they have sufficient savings and fine-tune their retirement date and withdrawal strategy.",
    },
  ]

  const faqs = [
    {
      question: "How much should I save for retirement?",
      answer:
        "Financial experts typically recommend saving 10-15% of your income for retirement, but the exact amount depends on your age, current savings, expected retirement age, and desired lifestyle in retirement.",
    },
    {
      question: "What rate of return should I expect on my investments?",
      answer:
        "Historically, a diversified portfolio has returned 7-10% annually before inflation. However, future returns may vary, and it's prudent to use more conservative estimates (5-7%) for retirement planning.",
    },
    {
      question: "How does inflation affect my retirement savings?",
      answer:
        "Inflation reduces the purchasing power of your money over time. The calculator accounts for inflation to show you the real value of your savings at retirement and helps you plan accordingly.",
    },
  ]

  const aboutContent = (
    <div className="space-y-6">
      <p>
        Planning for retirement is one of the most important financial tasks you'll undertake. Our Retirement Savings
        Calculator helps you understand how your current savings strategy will impact your financial future:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-5 rounded-lg shadow-sm">
          <h4 className="font-semibold text-lg text-blue-700 dark:text-blue-300 mb-3">Current Situation</h4>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Your age, current savings, and contribution rate
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-5 rounded-lg shadow-sm">
          <h4 className="font-semibold text-lg text-purple-700 dark:text-purple-300 mb-3">Future Projections</h4>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              Expected retirement age, investment returns, and inflation
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-5 rounded-lg shadow-sm">
          <h4 className="font-semibold text-lg text-green-700 dark:text-green-300 mb-3">Retirement Needs</h4>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              Estimated income needed in retirement based on your current income
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 p-5 rounded-lg shadow-sm">
          <h4 className="font-semibold text-lg text-yellow-700 dark:text-yellow-300 mb-3">Social Security</h4>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span>
              Optional inclusion of expected Social Security benefits
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-5 rounded-lg shadow-sm md:col-span-2">
          <h4 className="font-semibold text-lg text-red-700 dark:text-red-300 mb-3">Tax Considerations</h4>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              Current and expected retirement tax rates
            </li>
          </ul>
        </div>
      </div>

      <p>
        The calculator provides a comprehensive projection of your retirement savings, showing whether you're on track
        to meet your goals and how long your savings will last. It also offers insights into any potential savings gap
        and what adjustments might be needed.
      </p>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
        <h3 className="text-xl font-semibold mb-3">How to Use This Calculator</h3>
        <p>
          Input your current age, savings, and contribution rate, along with your retirement goals and assumptions about
          investment returns and inflation. The calculator will project your retirement savings and provide
          recommendations for achieving your financial goals.
        </p>
      </div>
    </div>
  )

  return (
    <CalculatorContentLayout
      title="Retirement Savings Calculator"
      description="Plan your financial future with our comprehensive retirement calculator"
      icon="PiggyBank"
      useCases={useCases}
      faqs={faqs}
      aboutContent={aboutContent}
      jsonLd={jsonLd}
    >
      <RetirementSavingsCalculator />
    </CalculatorContentLayout>
  )
}
