import { NextResponse } from "next/server"
import { calculators, calculatorCategories } from "@/lib/site-config"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")?.toLowerCase() || ""

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] })
  }

  // Search through calculators
  const calculatorResults = calculators
    .filter((calculator) => {
      return (
        calculator.title.toLowerCase().includes(query) ||
        calculator.description.toLowerCase().includes(query) ||
        calculator.keywords?.some((keyword) => keyword.toLowerCase().includes(query))
      )
    })
    .map((calculator) => ({
      type: "calculator",
      title: calculator.title,
      description: calculator.description,
      url: `/calculators/${calculator.slug}`,
      icon: calculator.icon,
    }))

  // Search through categories
  const categoryResults = calculatorCategories
    .filter((category) => {
      return category.title.toLowerCase().includes(query) || category.description.toLowerCase().includes(query)
    })
    .map((category) => ({
      type: "category",
      title: category.title,
      description: category.description,
      url: `/categories/${category.slug}`,
      icon: category.icon,
    }))

  // Search through fraction-related content
  const fractionResults = []

  if ("fraction".includes(query) || "decimal".includes(query) || "convert".includes(query)) {
    fractionResults.push({
      type: "tool",
      title: "Decimal to Fraction Converter",
      description: "Convert any decimal number to a fraction in simplest form",
      url: "/decimal-to-fraction",
      icon: "calculator",
    })

    fractionResults.push({
      type: "tool",
      title: "Fraction to Decimal Converter",
      description: "Convert any fraction to its decimal equivalent",
      url: "/fractions",
      icon: "calculator",
    })
  }

  // Combine all results
  const results = [...calculatorResults, ...categoryResults, ...fractionResults]

  // Limit to top 10 results
  const limitedResults = results.slice(0, 10)

  return NextResponse.json({ results: limitedResults })
}
