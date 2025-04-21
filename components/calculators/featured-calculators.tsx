"use client"

import { useMemo } from "react"
import Link from "next/link"
import { getAllCalculators } from "@/lib/site-config"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LucideIcon } from "@/components/lucide-icon"

export function FeaturedCalculators() {
  // Use a static list of featured calculator slugs
  const featuredSlugs = useMemo(
    () => [
      "mortgage-calculator",
      "carbon-footprint-calculator",
      "retirement-savings-calculator",
      "decimal-to-fraction-calculator",
    ],
    [],
  )

  // Get all calculators once
  const allCalculators = useMemo(() => getAllCalculators(), [])

  // Filter to just the featured ones
  const featuredCalculators = useMemo(
    () => allCalculators.filter((calc) => featuredSlugs.includes(calc.slug)),
    [allCalculators, featuredSlugs],
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Featured Calculators</h2>
          <p className="text-muted-foreground">Our most popular and useful calculators</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/calculators?view=all">View All Calculators</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredCalculators.map((calculator) => (
          <Card key={calculator.slug} className="flex flex-col h-full overflow-hidden group">
            <CardHeader className="p-4 pb-0">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <LucideIcon name={calculator.icon} className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant="outline" className="bg-primary/5 hover:bg-primary/10">
                    Featured
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-3 flex-grow">
              <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                {calculator.title}
              </CardTitle>
              <CardDescription className="line-clamp-3">{calculator.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button asChild className="w-full">
                <Link href={`/calculators/${calculator.slug}`}>Try Calculator</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
