import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Fraction } from "@/components/ui/fraction"
import { ArrowLeft, Calculator, ChevronLeft, ChevronRight, Home } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "Browse Decimal to Fraction Conversions",
  description:
    "Browse through our comprehensive library of decimal to fraction conversions. Find any decimal value and see its equivalent fraction.",
  keywords: [
    "decimal to fraction",
    "browse decimal conversions",
    "fraction calculator",
    "decimal fraction conversion",
    "math calculator",
  ],
}

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
function decimalToFraction(decimal: number): { numerator: number; denominator: number } {
  // Handle whole numbers
  if (Number.isInteger(decimal)) {
    return { numerator: decimal, denominator: 1 }
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

  return {
    numerator: simplifiedNumerator,
    denominator: simplifiedDenominator,
  }
}

export default function BrowseDecimalToFractionPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Parse search parameters with validation
  const startParam = searchParams.start
  const endParam = searchParams.end
  const pageParam = searchParams.page

  const start = typeof startParam === "string" ? Number.parseFloat(startParam) : 0.01
  const end = typeof endParam === "string" ? Number.parseFloat(endParam) : 0.1
  const currentPage = typeof pageParam === "string" ? Number.parseInt(pageParam) : 1

  // Validate parameters
  if (
    isNaN(start) ||
    isNaN(end) ||
    isNaN(currentPage) ||
    start < 0.01 ||
    end > 99.99 ||
    start >= end ||
    currentPage < 1
  ) {
    notFound()
  }

  // Calculate items per page and total pages
  const itemsPerPage = 20
  const totalItems = Math.ceil((end - start) * 100) // Assuming 0.01 increments
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  if (currentPage > totalPages) {
    notFound()
  }

  // Generate decimal values for the current page
  const generateDecimalsForPage = (page: number): number[] => {
    const decimals: number[] = []
    const startIndex = (page - 1) * itemsPerPage

    for (let i = 0; i < itemsPerPage; i++) {
      const index = startIndex + i
      if (index >= totalItems) break

      const decimal = Math.round((start + index * 0.01) * 100) / 100
      if (decimal <= end) {
        decimals.push(decimal)
      }
    }

    return decimals
  }

  const decimals = generateDecimalsForPage(currentPage)

  // Generate pagination links
  const generatePaginationItems = () => {
    const items = []
    const maxVisiblePages = 5

    // Always show first page
    items.push(
      <PaginationItem key="first">
        <PaginationLink
          href={`/decimal-to-fraction/browse?start=${start}&end=${end}&page=1`}
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>,
    )

    // Show ellipsis if needed
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>,
      )
    }

    // Show pages around current page
    const startPage = Math.max(2, currentPage - 1)
    const endPage = Math.min(totalPages - 1, currentPage + 1)

    for (let i = startPage; i <= endPage; i++) {
      if (i === 1 || i === totalPages) continue // Skip first and last page as they're always shown
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={`/decimal-to-fraction/browse?start=${start}&end=${end}&page=${i}`}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      )
    }

    // Show ellipsis if needed
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>,
      )
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink
            href={`/decimal-to-fraction/browse?start=${start}&end=${end}&page=${totalPages}`}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      )
    }

    return items
  }

  return (
    <div className="container py-8">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home className="h-4 w-4 mr-1" />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/decimal-to-fraction">Decimal to Fraction</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/decimal-to-fraction/browse?start=${start}&end=${end}&page=${currentPage}`}
              className="font-medium"
            >
              Browse {start} to {end}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Browse Decimal to Fraction Conversions</h1>
        <p className="text-muted-foreground mb-8">
          Exploring decimals from {start} to {end} - Page {currentPage} of {totalPages}
        </p>

        <div className="flex justify-between items-center mb-6">
          <Button asChild variant="outline">
            <Link href="/decimal-to-fraction">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Calculator
            </Link>
          </Button>

          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link
                href={`/decimal-to-fraction/browse?start=${Math.max(0.01, start - 0.1)}&end=${Math.max(end - 0.1, start + 0.01)}&page=1`}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Lower Range
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link
                href={`/decimal-to-fraction/browse?start=${Math.min(99.89, end)}&end=${Math.min(99.99, end + 0.1)}&page=1`}
              >
                Higher Range
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              Decimal to Fraction Conversions: {start} to {end}
            </CardTitle>
            <CardDescription>Click on any decimal to see a detailed step-by-step conversion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {decimals.map((decimal) => {
                const { numerator, denominator } = decimalToFraction(decimal)
                return (
                  <Link
                    key={decimal}
                    href={`/decimal-to-fraction/${decimal}-as-a-fraction`}
                    className="bg-muted/50 hover:bg-muted transition-colors p-4 rounded-lg text-center"
                  >
                    <div className="text-lg font-medium mb-2">{decimal}</div>
                    <Fraction numerator={numerator} denominator={denominator} size="sm" color="primary" />
                  </Link>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center mb-8">
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    href={`/decimal-to-fraction/browse?start=${start}&end=${end}&page=${currentPage - 1}`}
                  />
                </PaginationItem>
              )}

              {generatePaginationItems()}

              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext
                    href={`/decimal-to-fraction/browse?start=${start}&end=${end}&page=${currentPage + 1}`}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>

        <div className="bg-muted p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Browse Other Decimal Ranges</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <Button asChild variant="outline" size="sm">
              <Link href="/decimal-to-fraction/browse?start=0.01&end=0.1&page=1">0.01 - 0.1</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/decimal-to-fraction/browse?start=0.1&end=0.5&page=1">0.1 - 0.5</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/decimal-to-fraction/browse?start=0.5&end=1.0&page=1">0.5 - 1.0</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/decimal-to-fraction/browse?start=1.0&end=5.0&page=1">1.0 - 5.0</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/decimal-to-fraction/browse?start=5.0&end=10.0&page=1">5.0 - 10.0</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/decimal-to-fraction/browse?start=10.0&end=50.0&page=1">10.0 - 50.0</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/decimal-to-fraction/browse?start=50.0&end=99.99&page=1">50.0 - 99.99</Link>
            </Button>
          </div>
        </div>

        <div className="flex justify-center">
          <Button asChild size="lg">
            <Link href="/decimal-to-fraction">
              <Calculator className="h-5 w-5 mr-2" />
              Back to Decimal to Fraction Calculator
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
