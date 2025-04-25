import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { DecimalToFractionResult } from "@/components/calculator-pages/decimal-to-fraction-result"

// Function to find the greatest common divisor (GCD)
function findGCD(a: number, b: number): number {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b) {
    const temp = b
    b = a % b
    a = temp
  }
  return a
}

// Function to convert decimal to fraction
function decimalToFraction(decimal: number): {
  numerator: number
  denominator: number
  simplified: {
    numerator: number
    denominator: number
  }
  mixed?: {
    whole: number
    numerator: number
    denominator: number
  }
} {
  // Handle whole numbers
  if (Number.isInteger(decimal)) {
    return {
      numerator: decimal,
      denominator: 1,
      simplified: {
        numerator: decimal,
        denominator: 1,
      },
    }
  }

  // Convert to string to analyze decimal places
  const decimalStr = decimal.toString()
  const decimalParts = decimalStr.split(".")
  const decimalPart = decimalParts[1] || ""
  const wholeNumber = Number.parseInt(decimalParts[0])

  // Calculate denominator based on decimal places
  const decimalPlaces = decimalPart.length
  const denominator = Math.pow(10, decimalPlaces)
  const numerator = wholeNumber * denominator + Number.parseInt(decimalPart)

  // Simplify the fraction
  const gcd = findGCD(numerator, denominator)
  const simplifiedNumerator = numerator / gcd
  const simplifiedDenominator = denominator / gcd

  // Calculate mixed number if applicable
  let mixed
  if (simplifiedNumerator > simplifiedDenominator) {
    const whole = Math.floor(simplifiedNumerator / simplifiedDenominator)
    const mixedNumerator = simplifiedNumerator - whole * simplifiedDenominator
    mixed = {
      whole,
      numerator: mixedNumerator,
      denominator: simplifiedDenominator,
    }
  }

  return {
    numerator,
    denominator,
    simplified: {
      numerator: simplifiedNumerator,
      denominator: simplifiedDenominator,
    },
    mixed,
  }
}

// Generate related decimal values
function generateRelatedDecimals(decimal: number): string[] {
  const related = [decimal + 0.1, decimal - 0.1, decimal * 2, decimal / 2]
    .filter((d) => d >= 0.01 && d <= 99.99)
    .map((d) => d.toFixed(Math.min(6, (d.toString().split(".")[1] || "").length)))
    .filter((d, i, arr) => arr.indexOf(d) === i && Number.parseFloat(d) !== decimal)
    .slice(0, 4)

  return related
}

type Props = {
  params: {
    number: string
  }
}

export function generateMetadata({ params }: Props): Metadata {
  // Parse the decimal from the URL with proper validation
  const decimalStr = params?.number ? params.number.replace(/-as-a-fraction$/, "") : ""
  const decimal = Number.parseFloat(decimalStr)

  if (isNaN(decimal)) {
    return {
      title: "Invalid Decimal | Decimal to Fraction Conversion",
      description: "Convert decimals to fractions with step-by-step explanations.",
    }
  }

  const { simplified } = decimalToFraction(decimal)

  return {
    title: `${decimal} as a Fraction | ${simplified.numerator}/${simplified.denominator}`,
    description: `Convert ${decimal} to a fraction: ${decimal} = ${simplified.numerator}/${simplified.denominator}. See step-by-step explanation of how to convert ${decimal} to a fraction with our user-friendly calculator.`,
    keywords: [
      `${decimal} as a fraction`,
      `convert ${decimal} to fraction`,
      "decimal to fraction conversion",
      "fraction calculator",
      "math conversion",
      "math help",
      "fraction simplifier",
      "decimal conversion",
      "math tools",
      "educational resources",
    ],
    openGraph: {
      title: `${decimal} as a Fraction | ${simplified.numerator}/${simplified.denominator}`,
      description: `Convert ${decimal} to a fraction: ${decimal} = ${simplified.numerator}/${simplified.denominator}. See step-by-step explanation of how to convert ${decimal} to a fraction.`,
      type: "website",
      url: `https://calculatorsuite.com/decimal-to-fraction/${params.number}`,
    },
    alternates: {
      canonical: `https://calculatorsuite.com/decimal-to-fraction/${params.number}`,
    },
  }
}

export default function DecimalAsFractionPage({ params }: Props) {
  // Parse the decimal from the URL with proper validation
  const decimalStr = params?.number ? params.number.replace(/-as-a-fraction$/, "") : ""
  const decimal = Number.parseFloat(decimalStr)

  if (isNaN(decimal) || decimal < 0.01 || decimal > 99.99) {
    notFound()
  }

  // Convert decimal to fraction
  const result = decimalToFraction(decimal)

  // Generate related decimal values
  const relatedDecimals = generateRelatedDecimals(decimal)

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["MathSolver", "LearningResource"],
    name: `${decimal} as a Fraction`,
    description: `Convert ${decimal} to a fraction: ${decimal} = ${result.simplified.numerator}/${result.simplified.denominator}`,
    mathExpression: `${decimal} = ${result.simplified.numerator}/${result.simplified.denominator}`,
    url: `https://calculatorsuite.com/decimal-to-fraction/${params.number}`,
    usageInfo: "https://calculatorsuite.com/privacy",
    inLanguage: "en",
    keywords: [`${decimal} as a fraction`, "decimal to fraction", "fraction conversion"],
    potentialAction: [
      {
        "@type": "SolveMathAction",
        target: `https://calculatorsuite.com/decimal-to-fraction/solve?q={math_expression_string}`,
        "mathExpression-input": "required name=math_expression_string",
        eduQuestionType: ["Fraction Conversion"],
      },
    ],
    learningResourceType: "Math solver",
    mainEntity: {
      "@type": "HowTo",
      name: "Steps to Convert Decimal to Fraction",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          text: "Identify the number of decimal places",
          url: `https://calculatorsuite.com/decimal-to-fraction/${params.number}#step-1`,
        },
        {
          "@type": "HowToStep",
          position: 2,
          text: "Multiply by the appropriate power of 10 to eliminate the decimal point",
          url: `https://calculatorsuite.com/decimal-to-fraction/${params.number}#step-2`,
        },
        {
          "@type": "HowToStep",
          position: 3,
          text: "Write as a fraction with the power of 10 as the denominator",
          url: `https://calculatorsuite.com/decimal-to-fraction/${params.number}#step-3`,
        },
        {
          "@type": "HowToStep",
          position: 4,
          text: "Simplify by dividing both numerator and denominator by their greatest common divisor",
          url: `https://calculatorsuite.com/decimal-to-fraction/${params.number}#step-4`,
        },
      ],
    },
  }

  return (
    <div className="container py-8">
      {/* Add JSON-LD to your page */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <DecimalToFractionResult
        decimal={decimal.toString()}
        numerator={result.numerator}
        denominator={result.denominator}
        simplified={result.simplified}
        mixed={result.mixed}
        equivalentDecimals={relatedDecimals}
      />
    </div>
  )
}
