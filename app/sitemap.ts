import type { MetadataRoute } from "next"
import { calculatorCategories, getAllCalculators } from "@/lib/site-config"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://online-calculators.com"
  const lastModified = new Date().toISOString()
  const currentYear = new Date().getFullYear()

  // Base routes with high priority
  const routes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/calculators`, lastModified, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/terms`, lastModified, changeFrequency: "yearly", priority: 0.4 },

    // Add fractions main page with high priority
    { url: `${baseUrl}/fractions`, lastModified, changeFrequency: "weekly", priority: 0.9 },

    // Add decimal-to-fraction main page with high priority
    { url: `${baseUrl}/decimal-to-fraction`, lastModified, changeFrequency: "weekly", priority: 0.9 },
  ]

  // Category pages with cleaner URLs
  const categoryRoutes: MetadataRoute.Sitemap = calculatorCategories.map((category) => ({
    url: `${baseUrl}/calculators/${category.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  // Individual calculator pages with specific last modified dates
  const calculatorRoutes: MetadataRoute.Sitemap = getAllCalculators().map((calculator) => ({
    url: `${baseUrl}/calculators/${calculator.slug}`,
    lastModified: `${currentYear}-01-15T00:00:00.000Z`,
    changeFrequency: "weekly",
    priority: 0.9,
  }))

  // Fraction calculator pages
  const fractionCalculatorRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/fractions/mixed-numbers`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/fractions/simplify-fractions`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/fractions/decimal-to-fraction`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/fractions/fraction-to-decimal`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/fractions/big-number-fractions`, lastModified, changeFrequency: "weekly", priority: 0.8 },
  ]

  // Blog posts for SEO
  const blogPostRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog/how-to-use-mortgage-calculator-${currentYear}`,
      lastModified: `${currentYear}-01-10T00:00:00.000Z`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/best-financial-calculators-${currentYear}`,
      lastModified: `${currentYear}-01-15T00:00:00.000Z`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/carbon-footprint-reduction-tips-${currentYear}`,
      lastModified: `${currentYear}-02-01T00:00:00.000Z`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/retirement-planning-guide-${currentYear}`,
      lastModified: `${currentYear}-02-15T00:00:00.000Z`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]

  // Add year-specific pages for SEO
  const yearSpecificRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/calculators/${currentYear}`,
      lastModified: `${currentYear}-01-01T00:00:00.000Z`,
      changeFrequency: "yearly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/financial-calculators-${currentYear}`,
      lastModified: `${currentYear}-01-01T00:00:00.000Z`,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mortgage-calculator-${currentYear}`,
      lastModified: `${currentYear}-01-01T00:00:00.000Z`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/retirement-calculator-${currentYear}`,
      lastModified: `${currentYear}-01-01T00:00:00.000Z`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ]

  return [
    ...routes,
    ...categoryRoutes,
    ...calculatorRoutes,
    ...fractionCalculatorRoutes,
    ...blogPostRoutes,
    ...yearSpecificRoutes,
  ]
}
