import type { Metadata } from "next"
import Link from "next/link"
import { Calculator, ArrowLeft, Search, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export const metadata: Metadata = {
  title: "All CGPA to Percentage Conversions | Complete Reference Table",
  description:
    "Complete reference table of CGPA to percentage conversions. Find any CGPA value from 0.0 to 10.0 with accurate percentage equivalents and grade classifications.",
  keywords: [
    "cgpa to percentage table",
    "all cgpa conversions",
    "cgpa reference chart",
    "complete cgpa list",
    "grade conversion table",
    "academic grade reference",
  ],
  openGraph: {
    title: "Complete CGPA to Percentage Conversion Table",
    description: "Find any CGPA to percentage conversion with our comprehensive reference table",
    type: "website",
    url: "https://calculatorsuite.com/cgpa-to-percentage/all-conversions",
  },
  alternates: {
    canonical: "https://calculatorsuite.com/cgpa-to-percentage/all-conversions",
  },
}

function calculatePercentage(cgpa: number): number {
  return Math.round(cgpa * 9.5 * 100) / 100
}

function getGrade(cgpa: number): string {
  if (cgpa >= 9.0) return "A+"
  if (cgpa >= 8.0) return "A"
  if (cgpa >= 7.0) return "B+"
  if (cgpa >= 6.0) return "B"
  if (cgpa >= 5.0) return "C"
  return "D"
}

function getPerformanceLevel(cgpa: number): { level: string; color: string } {
  if (cgpa >= 9.0) return { level: "Outstanding", color: "text-green-600" }
  if (cgpa >= 8.0) return { level: "Excellent", color: "text-green-600" }
  if (cgpa >= 7.0) return { level: "Very Good", color: "text-blue-600" }
  if (cgpa >= 6.0) return { level: "Good", color: "text-yellow-600" }
  if (cgpa >= 5.0) return { level: "Average", color: "text-orange-600" }
  return { level: "Below Average", color: "text-red-600" }
}

// Generate CGPA values from 0.0 to 10.0 in increments of 0.1
function generateCGPAList(): Array<{
  cgpa: number
  percentage: number
  grade: string
  performance: { level: string; color: string }
}> {
  const cgpaList = []
  for (let i = 0; i <= 100; i++) {
    const cgpa = Math.round((i / 10) * 100) / 100
    cgpaList.push({
      cgpa,
      percentage: calculatePercentage(cgpa),
      grade: getGrade(cgpa),
      performance: getPerformanceLevel(cgpa),
    })
  }
  return cgpaList.reverse() // Show highest CGPA first
}

export default function AllCGPAConversionsPage() {
  const cgpaList = generateCGPAList()

  // Popular CGPA ranges
  const popularRanges = [
    { min: 9.0, max: 10.0, label: "Outstanding (9.0-10.0)", count: 11 },
    { min: 8.0, max: 8.9, label: "Excellent (8.0-8.9)", count: 10 },
    { min: 7.0, max: 7.9, label: "Very Good (7.0-7.9)", count: 10 },
    { min: 6.0, max: 6.9, label: "Good (6.0-6.9)", count: 10 },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="border-b bg-muted/30">
        <div className="container px-4 py-3 md:px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-trust-primary">
              Home
            </Link>
            <span>/</span>
            <Link href="/cgpa-to-percentage" className="hover:text-trust-primary">
              CGPA to Percentage
            </Link>
            <span>/</span>
            <span className="text-foreground">All Conversions</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-trust-primary/5 via-background to-trust-accent/5 py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6">
              <Link href="/cgpa-to-percentage">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Calculator
                </Button>
              </Link>
            </div>

            <div className="text-center">
              <Badge className="mb-4 bg-trust-primary/10 text-trust-primary">
                <Calculator className="mr-1 h-3 w-3" />
                Complete Reference
              </Badge>
              <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                All CGPA to Percentage Conversions
              </h1>
              <p className="mb-6 text-lg text-muted-foreground md:text-xl">
                Complete reference table with all CGPA values from 0.0 to 10.0 and their percentage equivalents
              </p>

              {/* Search Box */}
              <div className="mx-auto max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input type="search" placeholder="Search CGPA (e.g., 7.38)" className="pl-10" id="cgpa-search" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-6 border-b">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 text-center">
              <h2 className="text-lg font-semibold">Quick Navigation by Grade Range</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {popularRanges.map((range) => (
                <Card key={range.label} className="text-center">
                  <CardContent className="p-4">
                    <div className="text-sm font-medium text-trust-primary">{range.label}</div>
                    <div className="text-xs text-muted-foreground">{range.count} values</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conversion Table */}
      <section className="py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 text-center">
              <h2 className="mb-2 text-2xl font-bold">Complete CGPA Conversion Table</h2>
              <p className="text-muted-foreground">Click on any CGPA value to view detailed analysis and insights</p>
            </div>

            {/* Table Header */}
            <div className="mb-4 hidden md:block">
              <div className="grid grid-cols-4 gap-4 rounded-lg bg-muted p-4 font-semibold">
                <div>CGPA</div>
                <div>Percentage</div>
                <div>Grade</div>
                <div>Performance Level</div>
              </div>
            </div>

            {/* Conversion Grid */}
            <div className="space-y-2">
              {cgpaList.map((item) => (
                <Link key={item.cgpa} href={`/cgpa-to-percentage/${item.cgpa}`} className="group block">
                  <Card className="transition-all hover:border-trust-primary/50 hover:shadow-md">
                    <CardContent className="p-4">
                      {/* Mobile Layout */}
                      <div className="md:hidden">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-lg font-bold text-trust-primary">{item.cgpa} CGPA</div>
                            <div className="text-sm text-muted-foreground">
                              {item.percentage}% • Grade {item.grade}
                            </div>
                          </div>
                          <div className={`text-sm font-medium ${item.performance.color}`}>
                            {item.performance.level}
                          </div>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden md:grid md:grid-cols-4 md:gap-4 md:items-center">
                        <div className="text-lg font-bold text-trust-primary">{item.cgpa}</div>
                        <div className="text-lg font-semibold">{item.percentage}%</div>
                        <div>
                          <Badge variant="outline">Grade {item.grade}</Badge>
                        </div>
                        <div className={`font-medium ${item.performance.color}`}>{item.performance.level}</div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Load More Button (for future pagination) */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Showing all CGPA values from 0.0 to 10.0 • {cgpaList.length} total conversions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Formula Section */}
      <section className="bg-muted/30 py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h2 className="mb-4 text-2xl font-bold">Conversion Formula</h2>
              <div className="mx-auto max-w-md rounded-lg bg-trust-primary/5 p-6">
                <div className="text-xl font-mono font-semibold">Percentage = CGPA × 9.5</div>
              </div>
              <p className="mt-4 text-muted-foreground">
                This is the standard formula used by most Indian universities and educational institutions
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-trust-primary" />
                    Grade Scale Reference
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>9.0 - 10.0 CGPA</span>
                      <Badge className="bg-green-100 text-green-800">A+ Grade</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>8.0 - 8.9 CGPA</span>
                      <Badge className="bg-green-100 text-green-800">A Grade</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>7.0 - 7.9 CGPA</span>
                      <Badge className="bg-blue-100 text-blue-800">B+ Grade</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>6.0 - 6.9 CGPA</span>
                      <Badge className="bg-yellow-100 text-yellow-800">B Grade</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Usage Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Use the search box to quickly find specific CGPA values</li>
                    <li>• Click on any CGPA for detailed analysis and insights</li>
                    <li>• Bookmark frequently used conversions for quick access</li>
                    <li>• All calculations are based on the standard 9.5 multiplier</li>
                    <li>• Results are rounded to two decimal places for accuracy</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-trust-primary text-white py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-2xl font-bold">Need a Quick Calculation?</h2>
            <p className="mb-6 text-trust-primary-foreground/90">
              Use our interactive calculator for instant CGPA to percentage conversion
            </p>
            <Link href="/cgpa-to-percentage">
              <Button variant="secondary" size="lg">
                <Calculator className="mr-2 h-4 w-4" />
                Use CGPA Calculator
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
