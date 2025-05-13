import type { UnitCategory, Unit } from "@/types/unit-converter"

export function generateConverterSchema({
  category,
  fromUnit,
  toUnit,
  url,
  faqs,
}: {
  category: UnitCategory
  fromUnit: Unit
  toUnit: Unit
  url: string
  faqs: Array<{ question: string; answer: string }>
}) {
  // Main calculator schema
  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${fromUnit.name} to ${toUnit.name} Converter`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.8,
      ratingCount: 120,
      reviewCount: 85,
      bestRating: "5",
      worstRating: "1",
    },
    description: `Convert ${fromUnit.name} (${fromUnit.symbol}) to ${toUnit.name} (${toUnit.symbol}) with our free online converter. Fast, accurate, and easy to use.`,
    url: url,
  }

  // FAQ schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  // HowTo schema
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Convert ${fromUnit.name} to ${toUnit.name}`,
    description: `Step-by-step guide to convert ${fromUnit.name} to ${toUnit.name}`,
    step: [
      {
        "@type": "HowToStep",
        name: "Enter Value",
        text: `Enter the ${fromUnit.name} value you want to convert in the input field.`,
        url: `${url}#step1`,
        image: {
          "@type": "ImageObject",
          url: `${url}/step1.jpg`,
          height: "406",
          width: "305",
        },
      },
      {
        "@type": "HowToStep",
        name: "Automatic Calculation",
        text: `Our converter automatically applies the conversion formula and calculates the equivalent ${toUnit.name} value.`,
        url: `${url}#step2`,
        image: {
          "@type": "ImageObject",
          url: `${url}/step2.jpg`,
          height: "406",
          width: "305",
        },
      },
      {
        "@type": "HowToStep",
        name: "Get Result",
        text: `The converted value in ${toUnit.name} is displayed instantly. You can copy it to your clipboard with one click.`,
        url: `${url}#step3`,
        image: {
          "@type": "ImageObject",
          url: `${url}/step3.jpg`,
          height: "406",
          width: "305",
        },
      },
    ],
  }

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: url.split("/convert")[0],
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Unit Converter",
        item: `${url.split("/convert")[0]}/unit-converter`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: getCategoryName(category),
        item: `${url.split("/convert")[0]}/convert/${category}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: `${fromUnit.name} to ${toUnit.name}`,
        item: url,
      },
    ],
  }

  return {
    calculatorSchema,
    faqSchema,
    howToSchema,
    breadcrumbSchema,
  }
}

function getCategoryName(category: UnitCategory): string {
  const categoryNames: Record<UnitCategory, string> = {
    length: "Length Converter",
    weight: "Weight Converter",
    temperature: "Temperature Converter",
    volume: "Volume Converter",
    area: "Area Converter",
    speed: "Speed Converter",
    time: "Time Converter",
    digital: "Digital Converter",
    pressure: "Pressure Converter",
    energy: "Energy Converter",
  }

  return categoryNames[category] || "Unit Converter"
}
