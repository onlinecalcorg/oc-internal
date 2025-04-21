import type { Metadata } from "next"
import { SolarPanelContent } from "@/components/calculator-pages/solar-panel-content"
import { generateCalculatorSchema, generateFAQSchema } from "@/lib/schema"

export const metadata: Metadata = {
  title: "Solar Panel Savings Calculator | Estimate Your ROI & Environmental Impact",
  description:
    "Calculate your potential savings, payback period, and environmental benefits from installing solar panels with our comprehensive solar panel calculator.",
  keywords:
    "solar panel calculator, solar savings, solar ROI, solar panel cost, renewable energy calculator, solar investment, solar panel installation",
  openGraph: {
    title: "Solar Panel Savings Calculator | Estimate Your ROI & Environmental Impact",
    description:
      "Calculate your potential savings, payback period, and environmental benefits from installing solar panels with our comprehensive solar panel calculator.",
    images: [
      {
        url: "/opengraph-image?title=Solar%20Panel%20Savings%20Calculator&description=Calculate%20your%20potential%20savings%20and%20environmental%20impact",
        width: 1200,
        height: 630,
        alt: "Solar Panel Savings Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solar Panel Savings Calculator | Estimate Your ROI & Environmental Impact",
    description:
      "Calculate your potential savings, payback period, and environmental benefits from installing solar panels with our comprehensive solar panel calculator.",
  },
}

export default function SolarPanelPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://online-calculators.com"
  const pageUrl = `${baseUrl}/calculators/solar-panel`

  const calculatorSchema = generateCalculatorSchema({
    title: "Solar Panel Savings Calculator",
    description:
      "Calculate your potential savings, payback period, and environmental benefits from installing solar panels.",
    url: pageUrl,
    ratingValue: 4.9,
    ratingCount: 156,
    reviewCount: 112,
  })

  const faqs = [
    {
      question: "How accurate are the solar savings estimates?",
      answer:
        "The calculator provides estimates based on your inputs and average solar production in your region. Actual savings may vary based on specific roof conditions, local weather patterns, and electricity rate changes.",
    },
    {
      question: "What incentives are available for solar installation?",
      answer:
        "The federal solar tax credit is currently 30% through 2032. Additional state and local incentives vary by location, and the calculator allows you to input these to provide a more accurate estimate.",
    },
    {
      question: "How long do solar panels last?",
      answer:
        "Most solar panels are warrantied for 25-30 years but can continue producing electricity for longer. The calculator accounts for gradual degradation in panel efficiency over time.",
    },
    {
      question: "What maintenance is required for solar panels?",
      answer:
        "Solar panels require minimal maintenance. Occasional cleaning to remove dust and debris is recommended, typically 1-2 times per year depending on your location.",
    },
    {
      question: "Can I install solar if I have a shaded roof?",
      answer:
        "Partial shading can reduce solar panel efficiency, but modern systems with microinverters or power optimizers can minimize this impact. Our calculator allows you to input a shading factor to provide more accurate estimates.",
    },
  ]

  const faqSchema = generateFAQSchema(faqs)

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [calculatorSchema, faqSchema],
  }

  return <SolarPanelContent jsonLd={jsonLd} />
}
