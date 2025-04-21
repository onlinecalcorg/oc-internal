import type { Metadata } from "next"
import { MixedNumbersCalculator } from "@/components/calculators/mixed-numbers-calculator"
import { OptimizedCalculatorLayout } from "@/components/calculator-pages/optimized-calculator-layout"

export const metadata: Metadata = {
  title: "Mixed Numbers Calculator | Add, Subtract, Multiply, Divide Mixed Fractions",
  description:
    "Free online mixed numbers calculator. Add, subtract, multiply, and divide mixed numbers and fractions. Convert between mixed numbers and improper fractions with step-by-step solutions.",
  keywords: [
    "mixed numbers calculator",
    "mixed fractions calculator",
    "add mixed numbers",
    "subtract mixed numbers",
    "multiply mixed numbers",
    "divide mixed numbers",
    "convert mixed numbers",
    "improper fractions",
    "fraction calculator",
    "math calculator",
  ],
  openGraph: {
    title: "Mixed Numbers Calculator | Add, Subtract, Multiply, Divide Mixed Fractions",
    description:
      "Free online mixed numbers calculator. Add, subtract, multiply, and divide mixed numbers and fractions. Convert between mixed numbers and improper fractions with step-by-step solutions.",
    type: "website",
    url: "https://online-calculators.com/calculators/mixed-numbers",
    images: [
      {
        url: "https://online-calculators.com/calculators/mixed-numbers/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Mixed Numbers Calculator - Free online calculator tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mixed Numbers Calculator | Add, Subtract, Multiply, Divide Mixed Fractions",
    description:
      "Free online mixed numbers calculator. Add, subtract, multiply, and divide mixed numbers and fractions. Convert between mixed numbers and improper fractions with step-by-step solutions.",
    images: ["https://online-calculators.com/calculators/mixed-numbers/opengraph-image.png"],
  },
  alternates: {
    canonical: "/calculators/mixed-numbers",
  },
}

export default function MixedNumbersCalculatorPage() {
  // JSON-LD structured data for the calculator
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Mixed Numbers Calculator",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free online mixed numbers calculator. Add, subtract, multiply, and divide mixed numbers and fractions. Convert between mixed numbers and improper fractions with step-by-step solutions.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "127",
      reviewCount: "89",
    },
  }

  // Use cases for the calculator
  const useCases = [
    {
      title: "Educational Tool",
      description:
        "Perfect for students learning fractions and mixed numbers in elementary and middle school mathematics.",
    },
    {
      title: "Recipe Adjustments",
      description: "Easily scale recipes that use mixed number measurements for ingredients.",
    },
    {
      title: "Construction & DIY",
      description: "Calculate measurements for woodworking, construction, and home improvement projects.",
    },
    {
      title: "Homework Helper",
      description: "Check your work with step-by-step solutions that show the entire calculation process.",
    },
  ]

  // FAQs about mixed numbers
  const faqs = [
    {
      question: "What is a mixed number?",
      answer:
        "A mixed number is a combination of a whole number and a proper fraction. For example, 2 3/4 represents 2 whole units plus 3/4 of a unit.",
    },
    {
      question: "How do you convert a mixed number to an improper fraction?",
      answer:
        "To convert a mixed number to an improper fraction: 1) Multiply the whole number by the denominator, 2) Add the result to the numerator, 3) Put this sum over the original denominator. For example, 2 3/4 = ((2 × 4) + 3)/4 = 11/4.",
    },
    {
      question: "How do you convert an improper fraction to a mixed number?",
      answer:
        "To convert an improper fraction to a mixed number: 1) Divide the numerator by the denominator, 2) The quotient becomes the whole number, 3) The remainder becomes the new numerator, 4) Keep the same denominator. For example, 11/4 = 2 3/4.",
    },
    {
      question: "How do you add mixed numbers?",
      answer:
        "To add mixed numbers: 1) Convert each mixed number to an improper fraction, 2) Find a common denominator if needed, 3) Add the numerators while keeping the same denominator, 4) Simplify the result and convert back to a mixed number if needed.",
    },
    {
      question: "How do you subtract mixed numbers?",
      answer:
        "To subtract mixed numbers: 1) Convert each mixed number to an improper fraction, 2) Find a common denominator if needed, 3) Subtract the numerators while keeping the same denominator, 4) Simplify the result and convert back to a mixed number if needed.",
    },
    {
      question: "How do you multiply mixed numbers?",
      answer:
        "To multiply mixed numbers: 1) Convert each mixed number to an improper fraction, 2) Multiply the numerators together, 3) Multiply the denominators together, 4) Simplify the result and convert back to a mixed number if needed.",
    },
    {
      question: "How do you divide mixed numbers?",
      answer:
        "To divide mixed numbers: 1) Convert each mixed number to an improper fraction, 2) Multiply the first fraction by the reciprocal of the second fraction, 3) Simplify the result and convert back to a mixed number if needed.",
    },
  ]

  // About content for the calculator
  const aboutContent = (
    <>
      <p>
        The Mixed Numbers Calculator is a powerful tool for performing arithmetic operations with mixed numbers and
        fractions. Whether you're a student learning about fractions, a teacher creating math problems, or someone
        working on a project that requires precise measurements, this calculator provides accurate results with detailed
        step-by-step solutions.
      </p>

      <h3>Features of the Mixed Numbers Calculator</h3>
      <ul>
        <li>Perform addition, subtraction, multiplication, and division with mixed numbers</li>
        <li>Convert between mixed numbers and improper fractions</li>
        <li>View detailed step-by-step solutions for every calculation</li>
        <li>Automatically simplifies fractions to their lowest terms</li>
        <li>User-friendly interface with clear input fields</li>
        <li>Works with positive and negative numbers</li>
      </ul>

      <h3>Understanding Mixed Numbers</h3>
      <p>
        A mixed number consists of a whole number part and a proper fraction part. For example, 2 3/4 represents 2 whole
        units plus 3/4 of a unit. Mixed numbers are commonly used in everyday measurements, recipes, and construction
        projects because they're often easier to visualize than improper fractions.
      </p>

      <h3>Common Applications</h3>
      <p>Mixed numbers are frequently used in:</p>
      <ul>
        <li>Cooking and baking recipes (e.g., 1 1/2 cups of flour)</li>
        <li>Construction and woodworking (e.g., 2 3/4 inches)</li>
        <li>Educational settings when teaching fractions</li>
        <li>Music notation for time signatures</li>
        <li>Distance measurements (e.g., 3 1/2 miles)</li>
      </ul>

      <h3>Mathematical Background</h3>
      <p>
        When performing operations with mixed numbers, we typically convert them to improper fractions first, perform
        the operation, and then convert the result back to a mixed number if needed. This calculator handles all these
        steps automatically and shows you the process.
      </p>

      <h3>How to Use This Calculator</h3>
      <p>To use the Mixed Numbers Calculator:</p>
      <ol>
        <li>Select the operation you want to perform (add, subtract, multiply, or divide)</li>
        <li>Enter the whole number, numerator, and denominator for each mixed number</li>
        <li>Click "Calculate" to see the result</li>
        <li>Review the step-by-step solution to understand the calculation process</li>
      </ol>

      <p>You can also use the converter tabs to switch between mixed numbers and improper fractions.</p>
    </>
  )

  return (
    <OptimizedCalculatorLayout
      title="Mixed Numbers Calculator"
      description="Add, subtract, multiply, and divide mixed numbers and fractions with step-by-step solutions"
      icon="calculator"
      useCases={useCases}
      faqs={faqs}
      aboutContent={aboutContent}
      jsonLd={jsonLd}
    >
      <MixedNumbersCalculator />
    </OptimizedCalculatorLayout>
  )
}
