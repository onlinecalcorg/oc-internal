import Link from "next/link"
import { Calculator, Mail, MapPin, Phone } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { calculatorCategories } from "@/lib/site-config"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { LucideIcon } from "@/components/lucide-icon"

export function Footer() {
  const currentYear = new Date().getFullYear()

  // Get popular categories for the footer
  const popularCategories = calculatorCategories.slice(0, 4)

  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calculator className="h-6 w-6 text-trust-primary" />
              <h3 className="text-lg font-semibold text-trust-primary">{siteConfig.name}</h3>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">{siteConfig.description}</p>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-trust-primary" />
              <span>123 Calculator Street, Math City, 12345</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 text-trust-primary" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 text-trust-primary" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-trust-primary transition-colors">
                {siteConfig.email}
              </a>
            </div>

            <div className="flex gap-4 pt-2">
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-trust-primary/10 hover:text-trust-primary transition-colors"
              >
                <LucideIcon name="twitter" className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-trust-primary/10 hover:text-trust-primary transition-colors"
              >
                <LucideIcon name="github" className="h-5 w-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-trust-primary/10 hover:text-trust-primary transition-colors"
              >
                <LucideIcon name="linkedin" className="h-5 w-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-trust-primary/10 hover:text-trust-primary transition-colors"
              >
                <LucideIcon name="facebook" className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-trust-primary">Popular Categories</h3>
            <ul className="space-y-3">
              {popularCategories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/calculators?category=${category.slug}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-trust-primary transition-colors"
                  >
                    <LucideIcon name={category.icon} className="h-4 w-4" />
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-trust-primary">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-trust-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-trust-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-trust-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-trust-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/fractions"
                  className="text-sm text-muted-foreground hover:text-trust-primary transition-colors"
                >
                  Fractions
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators"
                  className="text-sm text-muted-foreground hover:text-trust-primary transition-colors"
                >
                  All Calculators
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-trust-primary">Featured Calculators</h3>
            <ul className="space-y-3">
              {calculatorCategories
                .flatMap((category) =>
                  category.calculators.slice(0, 2).map((calculator) => (
                    <li key={calculator.slug}>
                      <Link
                        href={`/calculators/${calculator.slug}`}
                        className="text-sm text-muted-foreground hover:text-trust-primary transition-colors"
                      >
                        {calculator.title}
                      </Link>
                    </li>
                  )),
                )
                .slice(0, 8)}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-trust-primary">Subscribe</h3>
            <p className="text-sm text-muted-foreground">
              Get the latest calculator updates and tips delivered to your inbox.
            </p>

            <div className="space-y-2">
              <Input placeholder="Your email" className="max-w-xs" />
              <Button className="w-full max-w-xs">Subscribe</Button>
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-sm text-muted-foreground">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-trust-primary transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-trust-primary transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="text-xs text-muted-foreground hover:text-trust-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
