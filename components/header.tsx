"use client"

import Link from "next/link"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LucideIcon } from "@/components/lucide-icon"
import { CurrencySelector } from "@/components/currency-selector"
import { CalculatorLogo } from "@/components/calculator-logo"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-4 flex items-center space-x-2">
            <CalculatorLogo className="h-6 w-6 text-trust-primary" />
            <span className="hidden font-bold sm:inline-block">Online Calculators</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/calculators" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Calculators
            </Link>
            <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">
              About
            </Link>
            <Link href="/contact" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Contact
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-2">
          {/* Mobile Search Toggle */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <LucideIcon name="search" className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Desktop Search */}
          <div className="hidden md:block w-full flex-1 md:w-auto md:flex-none">
            <form action="/search">
              <div className="relative">
                <LucideIcon name="search" className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search..." className="w-[200px] pl-8" name="q" />
              </div>
            </form>
          </div>

          {/* Currency Selector - Hidden on smallest screens */}
          <div className="hidden sm:block">
            <CurrencySelector />
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Desktop Calculator Button */}
          <Button variant="default" size="sm" className="hidden md:flex" asChild>
            <Link href="/calculators">
              <LucideIcon name="calculator" className="mr-2 h-4 w-4" />
              Calculators
            </Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <LucideIcon name="menu" className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <div className="flex flex-col gap-6 py-6">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-bold"
                  onClick={() => document.body.click()} // Close sheet
                >
                  <CalculatorLogo className="h-6 w-6 text-trust-primary" />
                  <span>Online Calculators</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  <Link
                    href="/calculators"
                    className="flex items-center gap-2 text-foreground/80 hover:text-foreground"
                    onClick={() => document.body.click()} // Close sheet
                  >
                    <LucideIcon name="calculator" className="h-5 w-5" />
                    Calculators
                  </Link>
                  <Link
                    href="/about"
                    className="flex items-center gap-2 text-foreground/80 hover:text-foreground"
                    onClick={() => document.body.click()} // Close sheet
                  >
                    <LucideIcon name="info" className="h-5 w-5" />
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="flex items-center gap-2 text-foreground/80 hover:text-foreground"
                    onClick={() => document.body.click()} // Close sheet
                  >
                    <LucideIcon name="mail" className="h-5 w-5" />
                    Contact
                  </Link>
                </nav>
                <div className="sm:hidden">
                  <CurrencySelector />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Search - Expandable */}
      {isSearchOpen && (
        <div className="border-t border-border py-2 px-4 md:hidden">
          <form action="/search" className="relative">
            <LucideIcon name="search" className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search calculators..." className="w-full pl-8 pr-8" name="q" autoFocus />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0"
              onClick={() => setIsSearchOpen(false)}
            >
              <LucideIcon name="x" className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </form>
        </div>
      )}
    </header>
  )
}
