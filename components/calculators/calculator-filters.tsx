"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LucideIcon } from "@/components/lucide-icon"
import { calculatorCategories } from "@/lib/site-config"
import { useState } from "react"

interface CalculatorFiltersProps {
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
  onSearch: (term: string) => void
  onSort: (sortBy: string) => void
}

export function CalculatorFilters({ selectedCategory, onCategoryChange, onSearch, onSort }: CalculatorFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Filter Calculators</h2>
          <p className="text-sm text-muted-foreground">Find the perfect calculator for your needs</p>
        </div>

        <div className="flex items-center gap-2">
          <Label htmlFor="sort" className="text-sm whitespace-nowrap">
            Sort by:
          </Label>
          <select
            id="sort"
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            onChange={(e) => onSort(e.target.value)}
            defaultValue="popular"
          >
            <option value="popular">Most Popular</option>
            <option value="newest">Newest</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <LucideIcon
            name="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
          />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search calculators..."
            className="pl-9"
          />
        </div>
        <Button type="submit">Search</Button>
      </form>

      <div className="space-y-2">
        <Label className="text-sm">Categories:</Label>
        <Tabs
          defaultValue={selectedCategory || "all"}
          className="w-full"
          onValueChange={(value) => onCategoryChange(value === "all" ? null : value)}
        >
          <TabsList className="w-full h-auto flex flex-wrap justify-start gap-2 bg-transparent">
            <TabsTrigger value="all" className="data-[state=active]:bg-trust-primary data-[state=active]:text-white">
              All Categories
            </TabsTrigger>

            {calculatorCategories.map((category) => (
              <TabsTrigger
                key={category.slug}
                value={category.slug}
                className="data-[state=active]:bg-trust-primary data-[state=active]:text-white"
              >
                <LucideIcon name={category.icon} className="h-3.5 w-3.5 mr-1.5" />
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}
