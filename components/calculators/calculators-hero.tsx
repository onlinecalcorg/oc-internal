"use client"

import type React from "react"

import { AnimatedGradientBackground } from "@/components/ui/animated-gradient-background"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LucideIcon } from "@/components/lucide-icon"
import { calculatorCategories } from "@/lib/site-config"
import Link from "next/link"

interface CalculatorsHeroProps {
  title: string
  description: string
  showSearch?: boolean
  onSearch?: (term: string) => void
}

export function CalculatorsHero({ title, description, showSearch = true, onSearch }: CalculatorsHeroProps) {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const searchTerm = formData.get("search") as string
    if (onSearch) onSearch(searchTerm)
  }

  return (
    <AnimatedGradientBackground className="rounded-xl overflow-hidden">
      <div className="px-6 py-12 md:px-12 md:py-16 lg:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">{title}</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">{description}</p>

          {showSearch && (
            <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8">
              <div className="relative">
                <LucideIcon
                  name="search"
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
                />
                <Input
                  name="search"
                  placeholder="Search calculators..."
                  className="pl-10 h-12 bg-background/80 backdrop-blur-sm"
                />
                <Button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 h-10">
                  Search
                </Button>
              </div>
            </form>
          )}

          <div className="flex flex-wrap justify-center gap-2">
            {calculatorCategories.map((category) => (
              <Link key={category.slug} href={`/calculators?category=${category.slug}`}>
                <Badge
                  variant="outline"
                  className="px-3 py-1 text-sm bg-background/80 backdrop-blur-sm hover:bg-trust-primary/10 transition-colors"
                >
                  <LucideIcon name={category.icon} className="h-3.5 w-3.5 mr-1.5" />
                  {category.title}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AnimatedGradientBackground>
  )
}
