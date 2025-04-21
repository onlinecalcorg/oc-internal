import { OptimizedCalculatorLayout } from "./optimized-calculator-layout"
import VacationCostCalculator from "@/components/calculators/vacation-cost-calculator"

export function VacationCostContent({ jsonLd }: { jsonLd: Record<string, any> }) {
  const useCases = [
    {
      title: "Family Vacation Planning",
      description:
        "A family of four planning their annual summer vacation can use the calculator to compare costs between different destinations and accommodation types to stay within their budget.",
    },
    {
      title: "Group Trip Cost Sharing",
      description:
        "Friends planning a group trip can use the calculator to estimate total costs and determine how much each person needs to contribute.",
    },
    {
      title: "Business Travel Budgeting",
      description:
        "Business travelers can use the calculator to estimate expenses for approval requests and reimbursement planning.",
    },
  ]

  const faqs = [
    {
      question: "How accurate is the vacation cost calculator?",
      answer:
        "The vacation cost calculator provides estimates based on average costs for destinations. Actual costs may vary based on seasonality, specific accommodations, and personal spending habits.",
    },
    {
      question: "Can I save my calculation results?",
      answer:
        "Currently, the calculator doesn't offer a save feature, but you can take a screenshot or print the results page for your records.",
    },
    {
      question: "Does the calculator include travel insurance costs?",
      answer:
        "Yes, the calculator includes an option to add travel insurance costs based on typical rates for your destination and trip duration.",
    },
  ]

  const aboutContent = (
    <>
      <p className="mb-4">
        Planning a vacation involves numerous expenses that can quickly add up. Our Vacation Cost Calculator helps you
        estimate the total cost of your trip by considering all major expense categories:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li className="text-gray-700 dark:text-gray-300">
          <strong>Transportation:</strong> Includes airfare, train tickets, car rentals, or gas costs for road trips.
        </li>
        <li className="text-gray-700 dark:text-gray-300">
          <strong>Accommodation:</strong> Hotels, vacation rentals, hostels, or camping fees.
        </li>
        <li className="text-gray-700 dark:text-gray-300">
          <strong>Food and Dining:</strong> Restaurants, groceries, and other food-related expenses.
        </li>
        <li className="text-gray-700 dark:text-gray-300">
          <strong>Activities and Entertainment:</strong> Tours, attractions, events, and other entertainment costs.
        </li>
        <li className="text-gray-700 dark:text-gray-300">
          <strong>Shopping and Souvenirs:</strong> Gifts, souvenirs, and personal shopping.
        </li>
        <li className="text-gray-700 dark:text-gray-300">
          <strong>Travel Insurance:</strong> Protection for trip cancellations, medical emergencies, and lost luggage.
        </li>
        <li className="text-gray-700 dark:text-gray-300">
          <strong>Miscellaneous:</strong> Local transportation, tips, fees, and other unexpected expenses.
        </li>
      </ul>
      <p className="mb-4">
        By providing a comprehensive breakdown of these costs, our calculator helps you create a realistic budget for
        your vacation, avoid financial surprises, and make informed decisions about your travel plans.
      </p>
      <h3 className="text-xl font-semibold mt-6 mb-3">How to Use This Calculator</h3>
      <p>
        Simply input your estimated costs for each category, the number of travelers, and the duration of your trip. The
        calculator will provide you with a total cost estimate and a per-person breakdown to help you plan your budget
        effectively.
      </p>
    </>
  )

  return (
    <OptimizedCalculatorLayout
      title="Vacation Cost Calculator"
      description="Plan your trip budget with our comprehensive vacation cost calculator"
      icon="PalmTree"
      useCases={useCases}
      faqs={faqs}
      aboutContent={aboutContent}
      jsonLd={jsonLd}
    >
      <VacationCostCalculator />
    </OptimizedCalculatorLayout>
  )
}
