import { CalculatorContentLayout } from "./calculator-content-layout"
import EVCostCalculator from "@/components/calculators/ev-cost-calculator"

export function EVCostContent({ jsonLd }: { jsonLd: Record<string, any> }) {
  const useCases = [
    {
      title: "New Vehicle Purchase Decision",
      description:
        "Consumers considering a new vehicle purchase can compare the total cost of ownership between electric and gas vehicles to make an informed financial decision.",
    },
    {
      title: "Fleet Conversion Analysis",
      description:
        "Business fleet managers can analyze the financial implications of converting their vehicle fleet from gas to electric over time.",
    },
    {
      title: "Long-term Financial Planning",
      description:
        "Financial planners can help clients understand the long-term cost implications of different vehicle choices as part of their overall financial strategy.",
    },
  ]

  const faqs = [
    {
      question: "Does the calculator account for government incentives?",
      answer:
        "Yes, the calculator includes options to add federal, state, and local incentives for electric vehicle purchases, which can significantly reduce the total cost of ownership.",
    },
    {
      question: "How are electricity costs calculated?",
      answer:
        "The calculator uses your input for local electricity rates (per kWh) and estimated annual mileage to calculate charging costs over the vehicle's lifetime.",
    },
    {
      question: "Does the calculator consider battery replacement costs?",
      answer:
        "Yes, the calculator includes an option to factor in potential battery replacement costs, though many modern EVs have warranties that cover the battery for 8-10 years or more.",
    },
  ]

  const aboutContent = (
    <div className="space-y-6">
      <p>
        Electric vehicles (EVs) often have higher upfront costs but lower operating expenses compared to traditional gas
        vehicles. Our Electric Vehicle Cost Calculator helps you understand the total cost of ownership (TCO) over the
        vehicle's lifetime:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-semibold text-primary mb-2">Purchase Price</h4>
          <p className="text-sm">The initial cost of the vehicle after incentives and rebates.</p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-semibold text-primary mb-2">Fuel/Energy Costs</h4>
          <p className="text-sm">Electricity costs for EVs versus gasoline costs for conventional vehicles.</p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-semibold text-primary mb-2">Maintenance</h4>
          <p className="text-sm">Regular service and repair costs, which are typically lower for EVs.</p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-semibold text-primary mb-2">Insurance</h4>
          <p className="text-sm">Annual insurance premiums, which may differ between EV and gas vehicles.</p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-semibold text-primary mb-2">Depreciation</h4>
          <p className="text-sm">The rate at which the vehicle loses value over time.</p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-semibold text-primary mb-2">Tax Benefits</h4>
          <p className="text-sm">Federal, state, and local incentives for EV ownership.</p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-semibold text-primary mb-2">Charging Infrastructure</h4>
          <p className="text-sm">Home charging equipment installation costs for EVs.</p>
        </div>
      </div>

      <p>
        By comparing these factors over your expected ownership period, the calculator provides a comprehensive
        financial analysis to help you determine whether an electric vehicle is the more economical choice for your
        situation.
      </p>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
        <h3 className="text-xl font-semibold mb-3">How to Use This Calculator</h3>
        <p>
          Enter details about the electric vehicle you're considering, a comparable gas vehicle, your driving habits,
          local electricity and gas prices, and available incentives. The calculator will generate a detailed cost
          comparison over your specified ownership period.
        </p>
      </div>
    </div>
  )

  return (
    <CalculatorContentLayout
      title="Electric Vehicle Cost Calculator"
      description="Compare the total cost of ownership between electric and gas vehicles"
      icon="Zap"
      useCases={useCases}
      faqs={faqs}
      aboutContent={aboutContent}
      jsonLd={jsonLd}
    >
      <EVCostCalculator />
    </CalculatorContentLayout>
  )
}
