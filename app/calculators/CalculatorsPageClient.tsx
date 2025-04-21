"use client"

import { useState, useEffect, useMemo } from "react"
import { calculatorCategories, getAllCalculators, type Calculator } from "@/lib/site-config"
import { CalculatorsHero } from "@/components/calculators/calculators-hero"
import { CategoryCard } from "@/components/calculators/category-card"
import { CalculatorFilters } from "@/components/calculators/calculator-filters"
import { CalculatorResults } from "@/components/calculators/calculator-results"
import { FeaturedCalculators } from "@/components/calculators/featured-calculators"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CalculatorsPageClient({ searchParams }: { searchParams: { category?: string } }) {
  const initialCategory = searchParams.category || null
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("popular")
  const [filteredCalculators, setFilteredCalculators] = useState<Calculator[]>([])
  const [activeView, setActiveView] = useState<"categories" | "all">(initialCategory ? "all" : "categories")

  // Use useMemo to prevent recalculating on every render
  const allCalculators = useMemo(() => getAllCalculators(), [])

  // Filter and sort calculators based on current state
  useEffect(() => {
    let results = [...allCalculators]

    // Apply category filter
    if (selectedCategory) {
      results = results.filter((calc) => calc.category === selectedCategory)
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      results = results.filter(
        (calc) =>
          calc.title.toLowerCase().includes(term) ||
          calc.description.toLowerCase().includes(term) ||
          calc.keywords?.some((keyword) => keyword.toLowerCase().includes(term)),
      )
    }

    // Apply sorting
    switch (sortBy) {
      case "a-z":
        results.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "z-a":
        results.sort((a, b) => b.title.localeCompare(a.title))
        break
      case "newest":
        // In a real app, you'd have a date field to sort by
        // For now, we'll just use the current order as a proxy for "newest"
        break
      case "popular":
      default:
        // In a real app, you'd have a popularity metric
        // For now, we'll just use the current order as a proxy for "popular"
        break
    }

    setFilteredCalculators(results)
  }, [selectedCategory, searchTerm, sortBy, allCalculators])

  // Handle search from hero section
  const handleHeroSearch = (term: string) => {
    setSearchTerm(term)
    setActiveView("all")
  }

  // Get the selected category object
  const selectedCategoryObj = selectedCategory
    ? calculatorCategories.find((cat) => cat.slug === selectedCategory)
    : null

  return (
    <div className="container py-8 space-y-10">
      <CalculatorsHero
        title={selectedCategoryObj ? selectedCategoryObj.title : "All Calculators"}
        description={
          selectedCategoryObj
            ? selectedCategoryObj.description
            : "Find the perfect calculator for your needs - financial planning, sustainability, technology, health assessment, and more."
        }
        onSearch={handleHeroSearch}
      />

      <Tabs value={activeView} onValueChange={(value) => setActiveView(value as "categories" | "all")}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="categories">Browse Categories</TabsTrigger>
            <TabsTrigger value="all">All Calculators</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="categories" className="space-y-10 mt-6">
          <FeaturedCalculators />

          <Separator />

          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Calculator Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {calculatorCategories.map((category) => (
                <CategoryCard
                  key={category.slug}
                  title={category.title}
                  description={category.description}
                  icon={category.icon}
                  slug={category.slug}
                  calculators={allCalculators.filter((calc) => calc.category === category.slug).slice(0, 3)}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-8 mt-6">
          <CalculatorFilters
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onSearch={setSearchTerm}
            onSort={setSortBy}
          />

          <Separator />

          <CalculatorResults calculators={filteredCalculators} searchTerm={searchTerm} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
