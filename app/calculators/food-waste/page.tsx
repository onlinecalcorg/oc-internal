import type { Metadata } from "next"
import { FoodWasteContent } from "@/components/calculator-pages/food-waste-content"
import { generateCalculatorSchema, generateFAQSchema } from "@/lib/schema"

export const metadata: Metadata = {
  title: "Food Waste Reduction Calculator | Calculate Your Environmental & Financial Impact",
  description:
    "Calculate the environmental and financial impact of your household food waste and discover personalized strategies to reduce waste, save money, and help the planet.",
  keywords:
    "food waste calculator, reduce food waste, food waste impact, environmental impact, food waste cost, sustainability calculator",
  openGraph: {
    title: "Food Waste Reduction Calculator | Calculate Your Environmental & Financial Impact",
    description:
      "Calculate the environmental and financial impact of your household food waste and discover personalized strategies to reduce waste, save money, and help the planet.",
    images: [
      {
        url: "/opengraph-image?title=Food%20Waste%20Reduction%20Calculator&description=Calculate%20the%20environmental%20and%20financial%20impact%20of%20your%20food%20waste",
        width: 1200,
        height: 630,
        alt: "Food Waste Reduction Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Food Waste Reduction Calculator | Calculate Your Environmental & Financial Impact",
    description:
      "Calculate the environmental and financial impact of your household food waste and discover personalized strategies to reduce waste, save money, and help the planet.",
  },
}

export default function FoodWastePage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://online-calculators.com"
  const pageUrl = `${baseUrl}/calculators/food-waste`

  const calculatorSchema = generateCalculatorSchema({
    title: "Food Waste Reduction Calculator",
    description:
      "Calculate the environmental and financial impact of your household food waste and discover personalized strategies to reduce waste.",
    url: pageUrl,
    ratingValue: 4.9,
    ratingCount: 142,
    reviewCount: 98,
  })

  const faqs = [
    {
      question: "How is the environmental impact of food waste calculated?",
      answer:
        "The calculator estimates CO2 emissions, water usage, and land use based on average values per kilogram of food waste, adjusted for your household size and waste percentage.",
    },
    {
      question: "What are the most effective ways to reduce food waste?",
      answer:
        "The most effective strategies include meal planning, proper food storage, understanding food date labels, and using leftovers creatively. The calculator provides personalized recommendations based on your current habits.",
    },
    {
      question: "How much money can I save by reducing food waste?",
      answer:
        "The average American family of four throws away approximately $1,600 worth of food each year. Your potential savings are calculated based on your food budget and waste reduction goals.",
    },
    {
      question: "What types of food are most commonly wasted?",
      answer:
        "Fresh produce (fruits and vegetables), dairy products, bread, and prepared meals are among the most commonly wasted food items.",
    },
    {
      question: "How does food waste contribute to climate change?",
      answer:
        "When food decomposes in landfills, it produces methane, a greenhouse gas 25 times more potent than carbon dioxide. Additionally, wasted food represents wasted resources used in production.",
    },
  ]

  const faqSchema = generateFAQSchema(faqs)

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [calculatorSchema, faqSchema],
  }

  return <FoodWasteContent jsonLd={jsonLd} />
}
