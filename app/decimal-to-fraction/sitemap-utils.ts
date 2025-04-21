import type { MetadataRoute } from "next"

export function generateDecimalToFractionSitemap(
  baseUrl: string,
  lastModified: string,
  page = 1,
): MetadataRoute.Sitemap {
  const ITEMS_PER_PAGE = 100 // Number of URLs per sitemap page

  // Generate decimal values for sitemap
  function generateDecimalValues(): string[] {
    const decimals: string[] = []

    // Common fractions that people often search for
    const commonDecimals = [
      "0.1",
      "0.2",
      "0.25",
      "0.3",
      "0.33",
      "0.4",
      "0.5",
      "0.6",
      "0.67",
      "0.7",
      "0.75",
      "0.8",
      "0.9",
      "1.1",
      "1.25",
      "1.5",
      "1.75",
      "2.0",
      "2.5",
      "3.0",
      "3.33",
      "3.5",
      "4.0",
      "5.0",
      "10.0",
      "0.01",
      "0.05",
      "0.125",
      "0.375",
      "0.625",
      "0.875",
      "1.25",
      "1.75",
      "2.25",
      "2.75",
      "3.25",
      "3.75",
      "4.5",
      "5.5",
      "6.5",
      "7.5",
      "8.5",
      "9.5",
      "11",
      "12.5",
      "15",
      "20",
      "25",
      "50",
      "75",
      "99.99",
    ]
    decimals.push(...commonDecimals)

    // Generate a selection of decimals across the full range
    // 0.01 to 0.99 (every 0.01)
    for (let i = 1; i < 100; i++) {
      decimals.push((i / 100).toFixed(2))
    }

    // 1.00 to 9.99 (every 0.05)
    for (let i = 100; i < 1000; i += 5) {
      decimals.push((i / 100).toFixed(2))
    }

    // 10.00 to 99.99 (every 0.25)
    for (let i = 1000; i < 10000; i += 25) {
      decimals.push((i / 100).toFixed(2))
    }

    // Remove duplicates and sort
    return [...new Set(decimals)].sort((a, b) => Number.parseFloat(a) - Number.parseFloat(b))
  }

  // Generate sitemap entries for decimal-to-fraction pages
  const decimalValues = generateDecimalValues()
  const totalPages = Math.ceil(decimalValues.length / ITEMS_PER_PAGE)

  // If requested page is out of range, return empty sitemap
  if (page < 1 || page > totalPages) {
    return []
  }

  const startIndex = (page - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE

  // Generate routes for the current page
  const decimalToFractionRoutes: MetadataRoute.Sitemap = decimalValues.slice(startIndex, endIndex).map((decimal) => ({
    url: `${baseUrl}/decimal-to-fraction/${decimal.toString()}-as-a-fraction`,
    lastModified,
    changeFrequency: "yearly",
    priority: Number.parseFloat(decimal) < 1 ? 0.7 : 0.6, // Higher priority for common decimals under 1
  }))

  // Only include main page in the first sitemap
  if (page === 1) {
    return [
      // Main decimal-to-fraction page with high priority
      {
        url: `${baseUrl}/decimal-to-fraction`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.9,
      },
      ...decimalToFractionRoutes.slice(0, ITEMS_PER_PAGE - 1),
    ]
  }

  // Return only decimal-to-fraction routes for other pages
  return decimalToFractionRoutes
}
