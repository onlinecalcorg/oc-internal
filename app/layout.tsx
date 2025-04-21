import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { siteConfig } from "@/lib/site-config"
import { CurrencyProvider } from "@/contexts/currency-context"
import { SkipToContent } from "@/components/skip-to-content"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Online Calculators 2025 | Free Online Calculators for Every Need",
    template: `%s | Online Calculators 2025`,
  },
  description:
    "Access 100+ free online calculators for finance, health, math, sustainability & technology. Updated for 2025 with the latest formulas and data for accurate results.",
  keywords: [
    "online calculators 2025",
    "free calculator tools",
    "financial calculators",
    "mortgage calculator 2025",
    "retirement calculator",
    "carbon footprint calculator",
    "health calculators",
    "BMI calculator",
    "fraction calculator",
    "percentage calculator",
    "AI cost calculator",
    "EV savings calculator",
    "solar panel calculator",
    "decimal to fraction converter",
    "best online calculators",
    "accurate calculation tools",
  ],
  authors: [
    {
      name: "Online Calculators",
      url: siteConfig.url,
    },
  ],
  creator: "Online Calculators",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: "Online Calculators 2025 | 100+ Free Online Calculators",
    description:
      "Access 100+ free online calculators for finance, health, math, sustainability & technology. Updated for 2025 with the latest formulas and data for accurate results.",
    siteName: "Online Calculators 2025",
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Online Calculators 2025 - Free Online Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Calculators 2025 | 100+ Free Online Calculators",
    description:
      "Access 100+ free online calculators for finance, health, math, sustainability & technology. Updated for 2025 with the latest formulas.",
    images: [`${siteConfig.url}/og-image.png`],
    creator: "@onlinecalculators",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "icon",
      type: "image/svg+xml",
      url: "/favicon.svg",
    },
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "en-US": `${siteConfig.url}/en-us`,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CurrencyProvider>
            <div className="flex min-h-screen flex-col">
              <SkipToContent />
              <Header />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
