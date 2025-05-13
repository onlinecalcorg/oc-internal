import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { UnitCategory, Unit } from "@/types/unit-converter"

interface ConversionFAQsProps {
  category: UnitCategory
  fromUnit: Unit
  toUnit: Unit
}

export function ConversionFAQs({ category, fromUnit, toUnit }: ConversionFAQsProps) {
  const faqs = getFAQs(category, fromUnit, toUnit)

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-b-0">
            <AccordionTrigger className="text-left hover:text-primary transition-colors py-4">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

function getFAQs(category: UnitCategory, fromUnit: Unit, toUnit: Unit) {
  // Common FAQs for all conversions
  const commonFaqs = [
    {
      question: `How do I convert from ${fromUnit.name} to ${toUnit.name}?`,
      answer: `To convert from ${fromUnit.name} to ${toUnit.name}, multiply the ${fromUnit.name} value by ${(
        toUnit.conversionFactor / fromUnit.conversionFactor
      ).toFixed(
        6,
      )}. Our converter tool does this calculation automatically - just enter the value in ${fromUnit.name} and get the result in ${toUnit.name}.`,
    },
    {
      question: `Why would I need to convert from ${fromUnit.name} to ${toUnit.name}?`,
      answer: `Converting between ${fromUnit.name} and ${toUnit.name} is useful for international communication, scientific work, travel, cooking with recipes from different regions, and many other everyday situations where different measurement systems are used.`,
    },
    {
      question: `Is the ${fromUnit.name} to ${toUnit.name} conversion exact?`,
      answer: `Yes, the conversion between ${fromUnit.name} and ${toUnit.name} is based on precise mathematical relationships and international standards. Our calculator provides accurate results to multiple decimal places.`,
    },
  ]

  // Category-specific FAQs
  let specificFaqs: { question: string; answer: string }[] = []

  switch (category) {
    case "length":
      specificFaqs = [
        {
          question: `Which is larger, ${fromUnit.name} or ${toUnit.name}?`,
          answer:
            fromUnit.conversionFactor > toUnit.conversionFactor
              ? `${fromUnit.name} is larger than ${toUnit.name}. One ${fromUnit.name} equals ${(
                  fromUnit.conversionFactor / toUnit.conversionFactor
                ).toFixed(6)} ${toUnit.name}.`
              : `${toUnit.name} is larger than ${fromUnit.name}. One ${toUnit.name} equals ${(
                  toUnit.conversionFactor / fromUnit.conversionFactor
                ).toFixed(6)} ${fromUnit.name}.`,
        },
        {
          question: `What are some common objects measured in ${fromUnit.name} or ${toUnit.name}?`,
          answer: `It depends on the specific units, but common objects measured in these units include furniture dimensions, room sizes, travel distances, height of people, and sizes of electronic devices.`,
        },
      ]
      break
    case "weight":
      specificFaqs = [
        {
          question: `Is ${fromUnit.name} used for the same purposes as ${toUnit.name}?`,
          answer: `While both units measure weight/mass, ${fromUnit.name} is typically used in ${
            fromUnit.id.includes("pound") || fromUnit.id.includes("ounce") || fromUnit.id.includes("stone")
              ? "imperial systems (US, UK)"
              : "metric systems (most of the world)"
          }, while ${toUnit.name} is common in ${
            toUnit.id.includes("pound") || toUnit.id.includes("ounce") || toUnit.id.includes("stone")
              ? "imperial systems (US, UK)"
              : "metric systems (most of the world)"
          }. They're used for similar purposes but in different regions or contexts.`,
        },
        {
          question: `How accurate is the ${fromUnit.name} to ${toUnit.name} conversion for cooking?`,
          answer: `For cooking purposes, our conversion is very accurate. However, when baking where precision is important, it's worth noting that volume-to-weight conversions can vary slightly depending on the ingredient. For weight-to-weight conversions like ${fromUnit.name} to ${toUnit.name}, the conversion is mathematically exact.`,
        },
      ]
      break
    case "temperature":
      specificFaqs = [
        {
          question: `At what point are ${fromUnit.name} and ${toUnit.name} equal?`,
          answer:
            (fromUnit.id === "celsius" && toUnit.id === "fahrenheit") ||
            (fromUnit.id === "fahrenheit" && toUnit.id === "celsius")
              ? `Celsius and Fahrenheit are equal at -40 degrees. So -40°C = -40°F.`
              : `There is no point where ${fromUnit.name} and ${toUnit.name} are equal due to how these scales are defined.`,
        },
        {
          question: `Which countries use ${fromUnit.name} and which use ${toUnit.name}?`,
          answer:
            fromUnit.id === "fahrenheit" || toUnit.id === "fahrenheit"
              ? `Fahrenheit is primarily used in the United States and its territories. Most other countries around the world use Celsius for temperature measurement.`
              : `Both ${fromUnit.name} and ${toUnit.name} are used in scientific contexts worldwide. For everyday temperature measurement, most countries use Celsius.`,
        },
      ]
      break
    // Add more categories as needed
    default:
      specificFaqs = []
  }

  return [...commonFaqs, ...specificFaqs]
}
