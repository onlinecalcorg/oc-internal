import { Suspense } from "react"
import { LucideIcon } from "@/components/lucide-icon"
import Link from "next/link"
import { getAllCalculators, calculatorCategories } from "@/lib/site-config"

export const metadata = {
  title: "Search Results | Online Calculators",
  description:
    "Find the calculator or tool you need with our search feature - financial, sustainability, technology, health, and math calculators",
}

interface SearchPageProps {
  searchParams: { q?: string }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""

  // Get all calculators using the function from site-config
  const allCalculators = getAllCalculators()

  // Function to search through calculators
  const searchCalculators = (query: string) => {
    if (!query) return []

    return allCalculators.filter((calculator) => {
      return (
        calculator.title.toLowerCase().includes(query.toLowerCase()) ||
        calculator.description.toLowerCase().includes(query.toLowerCase()) ||
        calculator.keywords?.some((keyword) => keyword.toLowerCase().includes(query.toLowerCase()))
      )
    })
  }

  // Function to search through categories
  const searchCategories = (query: string) => {
    if (!query) return []

    return calculatorCategories.filter((category) => {
      return (
        category.title.toLowerCase().includes(query.toLowerCase()) ||
        category.description.toLowerCase().includes(query.toLowerCase())
      )
    })
  }

  // Get search results
  const calculatorResults = searchCalculators(query)
  const categoryResults = searchCategories(query)

  // Check for fraction-related searches
  const fractionResults = []

  if (
    query.toLowerCase().includes("fraction") ||
    query.toLowerCase().includes("decimal") ||
    query.toLowerCase().includes("convert")
  ) {
    fractionResults.push({
      title: "Decimal to Fraction Converter",
      description: "Convert any decimal number to a fraction in simplest form",
      slug: "decimal-to-fraction",
      icon: "calculator",
      url: "/decimal-to-fraction",
    })

    fractionResults.push({
      title: "Fraction to Decimal Converter",
      description: "Convert any fraction to its decimal equivalent",
      slug: "fractions",
      icon: "calculator",
      url: "/fractions",
    })
  }

  const hasResults = calculatorResults.length > 0 || categoryResults.length > 0 || fractionResults.length > 0

  return (
    <div className="container py-12">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Search Results</h1>
        <p className="text-xl text-muted-foreground">
          {query ? `Results for "${query}"` : "Enter a search term to find calculators and tools"}
        </p>
      </div>

      <Suspense fallback={<div>Loading search results...</div>}>
        {!query && (
          <div className="text-center py-12 bg-muted rounded-lg">
            <p className="text-lg">Enter a search term to find calculators and tools</p>
          </div>
        )}

        {query && !hasResults && (
          <div className="text-center py-12 bg-muted rounded-lg">
            <h2 className="text-xl font-semibold mb-2">No results found</h2>
            <p className="text-muted-foreground">
              We couldn't find any calculators or tools matching your search term. Try a different search term or browse
              our categories.
            </p>
            <div className="mt-6">
              <Link href="/calculators" className="text-primary hover:underline">
                Browse all calculators
              </Link>
            </div>
          </div>
        )}

        {calculatorResults.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Calculators</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {calculatorResults.map((calculator) => (
                <Link
                  key={calculator.slug}
                  href={`/calculators/${calculator.slug}`}
                  className="block border rounded-lg p-4 hover:border-primary transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <LucideIcon name={calculator.icon} className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">{calculator.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{calculator.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {categoryResults.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Categories</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categoryResults.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="block border rounded-lg p-4 hover:border-primary transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <LucideIcon name={category.icon} className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">{category.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {fractionResults.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Conversion Tools</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {fractionResults.map((tool, index) => (
                <Link
                  key={index}
                  href={tool.url}
                  className="block border rounded-lg p-4 hover:border-primary transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <LucideIcon name={tool.icon} className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">{tool.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Suspense>
    </div>
  )
}
