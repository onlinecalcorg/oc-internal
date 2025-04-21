import type { Metadata } from "next"
import { CarbonFootprintContent } from "@/components/calculator-pages/carbon-footprint-content"
import { generateCalculatorSchema, generateFAQSchema } from "@/lib/schema"

export const metadata: Metadata = {
  title: "Free Online Carbon Footprint Calculator 2025 | Measure Your Environmental Impact",
  description:
    "Calculate your carbon footprint with our free online calculator. Understand your environmental impact and get personalized recommendations to reduce your emissions.",
  keywords:
    "carbon footprint calculator, carbon emissions calculator, environmental impact calculator, CO2 calculator, greenhouse gas calculator, carbon footprint reduction, sustainability calculator",
  openGraph: {
    title: "Free Online Carbon Footprint Calculator 2025 | Measure Your Environmental Impact",
    description:
      "Calculate your carbon footprint with our free online calculator. Understand your environmental impact and get personalized recommendations to reduce your emissions.",
    type: "website",
    url: "https://online-calculators.com/calculators/carbon-footprint",
    images: [
      {
        url: "https://online-calculators.com/calculators/carbon-footprint/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Carbon Footprint Calculator - Measure and reduce your environmental impact",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Carbon Footprint Calculator 2025",
    description:
      "Calculate your carbon footprint and get personalized recommendations to reduce your environmental impact.",
    images: ["https://online-calculators.com/calculators/carbon-footprint/opengraph-image.png"],
  },
  alternates: {
    canonical: "/calculators/carbon-footprint",
  },
}

export default function CarbonFootprintPage() {
  // Generate JSON-LD structured data
  const calculatorJsonLd = generateCalculatorSchema({
    title: "Free Online Carbon Footprint Calculator 2025",
    description:
      "Calculate your carbon footprint and get personalized recommendations to reduce your environmental impact.",
    url: "https://online-calculators.com/calculators/carbon-footprint",
    ratingValue: 4.9,
    ratingCount: 178,
    reviewCount: 112,
  })

  // Generate FAQ schema
  const faqJsonLd = generateFAQSchema([
    {
      question: "How is my carbon footprint calculated?",
      answer:
        "The calculator estimates your carbon footprint based on your transportation choices, home energy usage, diet, and consumption patterns using standardized emission factors. We use data from reputable environmental research organizations to convert your activities into equivalent CO2 emissions.",
    },
    {
      question: "What units are used for the carbon footprint?",
      answer:
        "Carbon footprint is measured in metric tons of CO2 equivalent (tCO2e) per year, which includes all greenhouse gases converted to their CO2 warming potential. This standardized measurement allows for comparison across different activities and lifestyles.",
    },
    {
      question: "How can I reduce my carbon footprint?",
      answer:
        "The calculator provides personalized recommendations based on your inputs, such as reducing air travel, switching to renewable energy, adjusting your diet, or changing consumption habits. Small changes in multiple areas of your life can add up to significant reductions in your overall carbon footprint.",
    },
    {
      question: "How accurate is this carbon footprint calculator?",
      answer:
        "This calculator provides a good estimate of your carbon footprint based on typical emission factors. For absolute precision, a detailed life cycle assessment would be required. However, our calculator is accurate enough to identify your major sources of emissions and track improvements over time.",
    },
    {
      question: "What's the difference between direct and indirect emissions?",
      answer:
        "Direct emissions come from sources you control directly, like your car's exhaust or your home's heating system. Indirect emissions are associated with your activities but occur elsewhere, such as emissions from power plants generating your electricity or from manufacturing the products you buy.",
    },
  ])

  return (
    <main id="main-content">
      {/* Add JSON-LD to your page */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="container py-8 md:py-12">
        <CarbonFootprintContent jsonLd={calculatorJsonLd} />
      </div>
    </main>
  )
}
