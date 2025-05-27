import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Search, Shield, Award, Clock, Smartphone, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { calculatorCategories, getAllCalculators } from "@/lib/site-config"
import { LucideIcon } from "@/components/lucide-icon"
import { AnimatedGradientBackground } from "@/components/ui/animated-gradient-background"

export default function HomePage() {
  // Get all calculators
  const allCalculators = getAllCalculators()

  // Featured calculators
  const featuredCalculators = [
    {
      title: "Mortgage Calculator",
      description: "Plan your home purchase with our comprehensive mortgage calculator",
      icon: "home",
      slug: "mortgage",
      category: "financial",
      badge: "Popular",
    },
    {
      title: "Carbon Footprint",
      description: "Measure your environmental impact and find ways to reduce it",
      icon: "footprints",
      slug: "carbon-footprint",
      category: "sustainability",
      badge: "Trending",
    },
    {
      title: "Retirement Savings",
      description: "Plan for your future with our detailed retirement calculator",
      icon: "piggy-bank",
      slug: "retirement-savings",
      category: "financial",
    },
    {
      title: "BMI Calculator",
      description: "Check your Body Mass Index and understand what it means for your health",
      icon: "activity",
      slug: "bmi",
      category: "health",
    },
  ]

  // New calculators (could be based on actual new additions in a real app)
  const newCalculators = [
    {
      title: "5G ROI Calculator",
      description: "Evaluate the return on investment for upgrading to 5G technology",
      icon: "wifi",
      slug: "5g-roi",
      category: "technology",
    },
    {
      title: "AI Implementation",
      description: "Calculate the costs and benefits of implementing AI in your business",
      icon: "brain",
      slug: "ai-implementation",
      category: "technology",
    },
    {
      title: "Food Waste Reduction",
      description: "Estimate the environmental and financial impact of reducing food waste",
      icon: "utensils",
      slug: "food-waste",
      category: "sustainability",
    },
  ]

  // Testimonials
  const testimonials = [
    {
      quote:
        "These calculators helped me plan my retirement with confidence. The detailed breakdown of savings was exactly what I needed.",
      author: "Sarah J.",
      role: "Financial Planner",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      quote:
        "As a teacher, I use the fraction calculators with my students. The visual representations make math concepts so much clearer.",
      author: "Michael T.",
      role: "Math Teacher",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      quote:
        "The mortgage calculator saved me thousands by helping me understand different loan options before talking to banks.",
      author: "David R.",
      role: "First-time Homebuyer",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Animated Background */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-background.png"
            alt="Calculator tools background"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>
        <AnimatedGradientBackground className="relative z-10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <Badge className="px-3.5 py-1.5 text-sm font-medium" variant="secondary">
                100+ Free Online Calculators
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Calculate <span className="text-trust-primary">Anything</span>, Anywhere
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Precise calculations for every aspect of your life - from finances and health to math and technology.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row mt-2">
                <Link href="/calculators">
                  <Button size="lg" className="gap-1.5 w-full sm:w-auto">
                    Explore All Calculators
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <div className="relative w-full sm:w-auto">
                  <form action="/search" className="w-full">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="search"
                        placeholder="Search calculators..."
                        className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-12 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-[260px]"
                        name="q"
                      />
                      <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground opacity-100">
                        ⌘K
                      </kbd>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </AnimatedGradientBackground>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/30">
        <div className="container px-4 py-8 md:px-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="text-3xl font-bold text-trust-primary">100+</div>
              <div className="text-sm text-muted-foreground">Calculators</div>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <div className="text-3xl font-bold text-trust-primary">5M+</div>
              <div className="text-sm text-muted-foreground">Calculations</div>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <div className="text-3xl font-bold text-trust-primary">99%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <div className="text-3xl font-bold text-trust-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Calculators Section */}
      <section className="container px-4 py-12 md:py-16 md:px-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Featured Calculators</h2>
            <p className="text-muted-foreground">Our most popular tools to help you make informed decisions</p>
          </div>
          <Link href="/calculators">
            <Button variant="outline" className="gap-1">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCalculators.map((calculator) => (
            <Link key={calculator.slug} href={`/calculators/${calculator.slug}`} className="group">
              <Card className="h-full overflow-hidden transition-all hover:border-trust-primary/50 hover:shadow-md">
                <CardHeader className="p-4 pb-0">
                  <div className="flex items-start justify-between">
                    <div className="rounded-full bg-trust-primary/10 p-2.5">
                      <LucideIcon name={calculator.icon} className="h-5 w-5 text-trust-primary" />
                    </div>
                    {calculator.badge && (
                      <Badge variant="secondary" className="bg-trust-primary/10 text-trust-primary">
                        {calculator.badge}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-4">
                  <CardTitle className="line-clamp-1 text-xl">{calculator.title}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-2 min-h-[40px]">{calculator.description}</CardDescription>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <div className="flex w-full items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {calculator.category.charAt(0).toUpperCase() + calculator.category.slice(1)}
                    </Badge>
                    <span className="text-sm font-medium text-trust-primary group-hover:underline">Try Calculator</span>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories Section with Tabs and Images */}
      <section className="relative bg-muted/30 py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/categories-overview.png"
            alt="Calculator categories overview"
            fill
            className="object-cover opacity-5"
          />
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Badge className="px-3.5 py-1.5 text-sm font-medium" variant="secondary">
              Browse by Category
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Find the Right Tool for Your Needs</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground">
              Our calculators are organized into categories to help you find exactly what you need
            </p>
          </div>

          <Tabs defaultValue="financial" className="mt-8">
            <TabsList className="mx-auto flex w-full max-w-md justify-between rounded-lg p-1">
              {calculatorCategories.slice(0, 4).map((category) => (
                <TabsTrigger
                  key={category.slug}
                  value={category.slug}
                  className="flex items-center gap-1.5 data-[state=active]:bg-trust-primary data-[state=active]:text-white"
                >
                  <LucideIcon name={category.icon} className="h-4 w-4" />
                  <span className="hidden sm:inline">{category.title.split(" ")[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Financial Tab with Image */}
            <TabsContent value="financial" className="mt-6">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <div className="grid gap-4 sm:grid-cols-2">
                  {calculatorCategories[0].calculators.map((calculator) => (
                    <Link key={calculator.slug} href={`/calculators/${calculator.slug}`}>
                      <Card className="h-full transition-all hover:border-trust-primary/50 hover:shadow-md">
                        <CardHeader className="p-4 pb-2">
                          <div className="mb-2 w-fit rounded-full bg-trust-primary/10 p-2">
                            <LucideIcon name={calculator.icon} className="h-4 w-4 text-trust-primary" />
                          </div>
                          <CardTitle className="text-lg">{calculator.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <CardDescription className="line-clamp-2">{calculator.description}</CardDescription>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative h-[300px] w-full max-w-[400px] overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src="/images/financial-planning.png"
                      alt="Financial planning calculators"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Link href={`/calculators?category=financial`}>
                  <Button variant="outline" className="gap-1">
                    View All Financial Calculators
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </TabsContent>

            {/* Health Tab with Image */}
            <TabsContent value="health" className="mt-6">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <div className="grid gap-4 sm:grid-cols-2">
                  {calculatorCategories[1].calculators.map((calculator) => (
                    <Link key={calculator.slug} href={`/calculators/${calculator.slug}`}>
                      <Card className="h-full transition-all hover:border-trust-primary/50 hover:shadow-md">
                        <CardHeader className="p-4 pb-2">
                          <div className="mb-2 w-fit rounded-full bg-trust-primary/10 p-2">
                            <LucideIcon name={calculator.icon} className="h-4 w-4 text-trust-primary" />
                          </div>
                          <CardTitle className="text-lg">{calculator.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <CardDescription className="line-clamp-2">{calculator.description}</CardDescription>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative h-[300px] w-full max-w-[400px] overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src="/images/health-wellness.png"
                      alt="Health and wellness calculators"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Link href={`/calculators?category=health`}>
                  <Button variant="outline" className="gap-1">
                    View All Health Calculators
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </TabsContent>

            {/* Sustainability Tab with Image */}
            <TabsContent value="sustainability" className="mt-6">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <div className="grid gap-4 sm:grid-cols-2">
                  {calculatorCategories[2].calculators.map((calculator) => (
                    <Link key={calculator.slug} href={`/calculators/${calculator.slug}`}>
                      <Card className="h-full transition-all hover:border-trust-primary/50 hover:shadow-md">
                        <CardHeader className="p-4 pb-2">
                          <div className="mb-2 w-fit rounded-full bg-trust-primary/10 p-2">
                            <LucideIcon name={calculator.icon} className="h-4 w-4 text-trust-primary" />
                          </div>
                          <CardTitle className="text-lg">{calculator.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <CardDescription className="line-clamp-2">{calculator.description}</CardDescription>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative h-[300px] w-full max-w-[400px] overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src="/images/sustainability-tools.png"
                      alt="Sustainability calculators"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Link href={`/calculators?category=sustainability`}>
                  <Button variant="outline" className="gap-1">
                    View All Sustainability Calculators
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </TabsContent>

            {/* Technology Tab with Image */}
            <TabsContent value="technology" className="mt-6">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <div className="grid gap-4 sm:grid-cols-2">
                  {calculatorCategories[3].calculators.map((calculator) => (
                    <Link key={calculator.slug} href={`/calculators/${calculator.slug}`}>
                      <Card className="h-full transition-all hover:border-trust-primary/50 hover:shadow-md">
                        <CardHeader className="p-4 pb-2">
                          <div className="mb-2 w-fit rounded-full bg-trust-primary/10 p-2">
                            <LucideIcon name={calculator.icon} className="h-4 w-4 text-trust-primary" />
                          </div>
                          <CardTitle className="text-lg">{calculator.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <CardDescription className="line-clamp-2">{calculator.description}</CardDescription>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative h-[300px] w-full max-w-[400px] overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src="/images/technology-calculators.png"
                      alt="Technology calculators"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Link href={`/calculators?category=technology`}>
                  <Button variant="outline" className="gap-1">
                    View All Technology Calculators
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* New Calculators Section */}
      <section className="container px-4 py-12 md:py-16 md:px-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <Badge className="mb-2">New</Badge>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Latest Additions</h2>
            <p className="text-muted-foreground">Check out our newest calculator tools</p>
          </div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {newCalculators.map((calculator) => (
            <Link key={calculator.slug} href={`/calculators/${calculator.slug}`} className="group">
              <Card className="h-full overflow-hidden transition-all hover:border-trust-primary/50 hover:shadow-md">
                <CardHeader className="p-4 pb-0">
                  <div className="flex items-start justify-between">
                    <div className="rounded-full bg-trust-primary/10 p-2.5">
                      <LucideIcon name={calculator.icon} className="h-5 w-5 text-trust-primary" />
                    </div>
                    <Badge variant="outline" className="bg-trust-primary/5 text-trust-primary">
                      New
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-4">
                  <CardTitle className="line-clamp-1 text-xl">{calculator.title}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-2 min-h-[40px]">{calculator.description}</CardDescription>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <div className="flex w-full items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {calculator.category.charAt(0).toUpperCase() + calculator.category.slice(1)}
                    </Badge>
                    <span className="text-sm font-medium text-trust-primary group-hover:underline">Try Calculator</span>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Academic Calculators Section with Image */}
      <section className="container px-4 py-12 md:py-16 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <div className="flex flex-col items-start justify-between gap-4">
              <div>
                <Badge className="mb-2">Academic Tools</Badge>
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Academic Calculators</h2>
                <p className="text-muted-foreground">Essential tools for students and educators</p>
              </div>
            </div>
            <div className="mt-8 grid gap-6">
              <Link href="/cgpa-to-percentage" className="group">
                <Card className="h-full overflow-hidden transition-all hover:border-trust-primary/50 hover:shadow-md">
                  <CardHeader className="p-4 pb-0">
                    <div className="flex items-start justify-between">
                      <div className="rounded-full bg-trust-primary/10 p-2.5">
                        <LucideIcon name="calculator" className="h-5 w-5 text-trust-primary" />
                      </div>
                      <Badge variant="outline" className="bg-trust-primary/5 text-trust-primary">
                        Popular
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-4">
                    <CardTitle className="line-clamp-1 text-xl">CGPA to Percentage</CardTitle>
                    <CardDescription className="line-clamp-2 mt-2 min-h-[40px]">
                      Convert your CGPA to percentage instantly with accurate results for all grading scales
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <div className="flex w-full items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        Academic
                      </Badge>
                      <span className="text-sm font-medium text-trust-primary group-hover:underline">
                        Try Calculator
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>

              <div className="grid gap-4 sm:grid-cols-2">
                <Link href="/gpa-calculator" className="group">
                  <Card className="h-full overflow-hidden transition-all hover:border-trust-primary/50 hover:shadow-md">
                    <CardHeader className="p-4 pb-0">
                      <div className="rounded-full bg-trust-primary/10 p-2.5">
                        <LucideIcon name="graduation-cap" className="h-5 w-5 text-trust-primary" />
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-4">
                      <CardTitle className="line-clamp-1 text-lg">GPA Calculator</CardTitle>
                      <CardDescription className="line-clamp-2 mt-2 text-sm">
                        Calculate your Grade Point Average
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/grade-calculator" className="group">
                  <Card className="h-full overflow-hidden transition-all hover:border-trust-primary/50 hover:shadow-md">
                    <CardHeader className="p-4 pb-0">
                      <div className="rounded-full bg-trust-primary/10 p-2.5">
                        <LucideIcon name="book-open" className="h-5 w-5 text-trust-primary" />
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-4">
                      <CardTitle className="line-clamp-1 text-lg">Grade Calculator</CardTitle>
                      <CardDescription className="line-clamp-2 mt-2 text-sm">
                        Calculate final grades and scores
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative h-[400px] w-full max-w-[500px] overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/images/academic-tools.png"
                alt="Academic calculator tools interface"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Popular CGPA Conversions */}
        <div className="mt-12">
          <div className="mb-6 text-center">
            <h3 className="mb-2 text-xl font-bold">Popular CGPA Conversions</h3>
            <p className="text-muted-foreground">Quick access to commonly searched CGPA values</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {[
              { cgpa: 9.5, percentage: 90.25 },
              { cgpa: 9.0, percentage: 85.5 },
              { cgpa: 8.5, percentage: 80.75 },
              { cgpa: 8.0, percentage: 76.0 },
              { cgpa: 7.5, percentage: 71.25 },
              { cgpa: 7.38, percentage: 70.11 },
              { cgpa: 7.0, percentage: 66.5 },
              { cgpa: 6.5, percentage: 61.75 },
            ].map((item) => (
              <Link
                key={item.cgpa}
                href={`/cgpa-to-percentage/${item.cgpa}`}
                className="group flex flex-col items-center justify-center rounded-lg border bg-card p-4 shadow-sm transition-all hover:border-trust-primary/50 hover:shadow-md"
              >
                <span className="text-lg font-medium text-trust-primary">{item.cgpa} CGPA</span>
                <div className="mt-1 text-sm text-muted-foreground">{item.percentage}%</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Common Decimal to Fraction Conversions */}
      <section className="container px-4 py-12 md:px-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <Badge className="mb-2">Popular Conversions</Badge>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Common Decimal to Fraction Conversions</h2>
            <p className="text-muted-foreground">Quick access to frequently used decimal-to-fraction conversions</p>
          </div>
          <Link href="/decimal-to-fraction">
            <Button variant="outline" className="gap-1">
              More Conversions
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
          {[0.25, 0.5, 0.75, 0.33, 0.67, 0.125, 0.375, 0.625, 0.875, 0.2, 0.4, 0.6].map((decimal) => (
            <Link
              key={decimal}
              href={`/decimal-to-fraction/${decimal}-as-a-fraction`}
              className="group flex flex-col items-center justify-center rounded-lg border bg-card p-4 shadow-sm transition-all hover:border-trust-primary/50 hover:shadow-md"
            >
              <span className="text-lg font-medium">{decimal}</span>
              <div className="mt-2 text-sm text-muted-foreground">
                {(() => {
                  // Simple function to convert decimal to fraction for display
                  const getSimpleFraction = (d: number) => {
                    if (d === 0.25) return "1/4"
                    if (d === 0.5) return "1/2"
                    if (d === 0.75) return "3/4"
                    if (d === 0.33) return "1/3"
                    if (d === 0.67) return "2/3"
                    if (d === 0.125) return "1/8"
                    if (d === 0.375) return "3/8"
                    if (d === 0.625) return "5/8"
                    if (d === 0.875) return "7/8"
                    if (d === 0.2) return "1/5"
                    if (d === 0.4) return "2/5"
                    if (d === 0.6) return "3/5"
                    return `${d}`
                  }
                  return getSimpleFraction(decimal)
                })()}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Benefits Section with Enhanced Visuals */}
      <section className="relative bg-trust-primary text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/precision-accuracy.png"
            alt="Precision and accuracy visualization"
            fill
            className="object-cover opacity-10"
          />
        </div>
        <div className="container px-4 py-12 md:py-16 md:px-6 relative z-10">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <Badge className="w-fit border-white/20 bg-white/10 text-white hover:bg-white/20">Why Choose Us</Badge>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
                Trusted by Millions for Accurate Calculations
              </h2>
              <p className="text-trust-primary-foreground/90 md:text-lg">
                Our calculators are designed with precision, usability, and reliability in mind. We're committed to
                helping you make informed decisions with confidence.
              </p>
              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <Link href="/about">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    About Us
                  </Button>
                </Link>
                <Link href="/calculators">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-white text-white hover:bg-white/10 sm:w-auto"
                  >
                    Explore Calculators
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-start rounded-lg bg-white/10 p-4">
                <Shield className="mb-2 h-8 w-8 text-white" />
                <h3 className="text-lg font-medium">Privacy First</h3>
                <p className="mt-1 text-sm text-white/80">
                  Your data never leaves your device - all calculations happen locally
                </p>
              </div>
              <div className="flex flex-col items-start rounded-lg bg-white/10 p-4">
                <Award className="mb-2 h-8 w-8 text-white" />
                <h3 className="text-lg font-medium">Accurate Results</h3>
                <p className="mt-1 text-sm text-white/80">
                  Our calculators use industry-standard formulas to ensure accurate results
                </p>
              </div>
              <div className="flex flex-col items-start rounded-lg bg-white/10 p-4">
                <Smartphone className="mb-2 h-8 w-8 text-white" />
                <h3 className="text-lg font-medium">Mobile Friendly</h3>
                <p className="mt-1 text-sm text-white/80">
                  Use our calculators on any device with a fully responsive design
                </p>
              </div>
              <div className="flex flex-col items-start rounded-lg bg-white/10 p-4">
                <Clock className="mb-2 h-8 w-8 text-white" />
                <h3 className="text-lg font-medium">Regular Updates</h3>
                <p className="mt-1 text-sm text-white/80">
                  We continuously improve our calculators with the latest data and formulas
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section with Background */}
      <section className="relative container px-4 py-12 md:py-16 md:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/testimonials-bg.png"
            alt="User testimonials background"
            fill
            className="object-cover opacity-5"
          />
        </div>
        <div className="relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Badge className="px-3.5 py-1.5 text-sm font-medium" variant="secondary">
              Testimonials
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">What Our Users Say</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground">
              Thousands of people use our calculators every day to make better decisions
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-muted">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.author}
                        width={60}
                        height={60}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <svg
                      className="absolute -left-1 -top-2 h-6 w-6 text-muted-foreground/20"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="relative text-muted-foreground">{testimonial.quote}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories Quick Links */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Popular Calculator Categories</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground">
              Quick access to our most-used calculator categories
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {calculatorCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/calculators?category=${category.slug}`}
                className="group flex items-center justify-between rounded-lg border bg-card p-4 shadow-sm transition-all hover:border-trust-primary/50 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-trust-primary/10 p-2">
                    <LucideIcon name={category.icon} className="h-5 w-5 text-trust-primary" />
                  </div>
                  <span className="font-medium">{category.title}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-trust-primary" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Unit Converters Section with Image */}
      <section className="container px-4 py-12 md:py-16 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex items-center justify-center order-2 lg:order-1">
            <div className="relative h-[400px] w-full max-w-[500px] overflow-hidden rounded-lg shadow-lg">
              <Image src="/images/unit-converter.png" alt="Unit converter interface" fill className="object-cover" />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="flex flex-col items-center justify-center space-y-4 text-center lg:text-left lg:items-start">
              <Badge className="px-3.5 py-1.5 text-sm font-medium" variant="secondary">
                Unit Converters
              </Badge>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Popular Unit Converters</h2>
              <p className="max-w-[700px] text-muted-foreground">
                Quick access to our most frequently used unit conversion tools
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Length Converter",
                  description: "Convert between meters, feet, inches, kilometers, miles, and more",
                  icon: "ruler",
                  slug: "convert/length",
                },
                {
                  title: "Weight Converter",
                  description: "Convert between kilograms, pounds, ounces, grams, and more",
                  icon: "weight",
                  slug: "convert/weight",
                },
                {
                  title: "Temperature Converter",
                  description: "Convert between Celsius, Fahrenheit, and Kelvin temperature scales",
                  icon: "thermometer",
                  slug: "convert/temperature",
                },
                {
                  title: "Volume Converter",
                  description: "Convert between liters, gallons, cups, milliliters, and more",
                  icon: "flask",
                  slug: "convert/volume",
                },
              ].map((converter) => (
                <Link key={converter.slug} href={`/${converter.slug}`}>
                  <Card className="h-full overflow-hidden transition-all hover:border-trust-primary/50 hover:shadow-md">
                    <CardHeader className="p-4 pb-0">
                      <div className="rounded-full bg-trust-primary/10 p-2.5 w-fit">
                        <LucideIcon name={converter.icon} className="h-5 w-5 text-trust-primary" />
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-4">
                      <CardTitle className="line-clamp-1 text-lg">{converter.title}</CardTitle>
                      <CardDescription className="line-clamp-2 mt-2 text-sm">{converter.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center lg:text-left">
              <Link href="/unit-converter">
                <Button className="gap-1.5">
                  Explore All Unit Converters
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Experience Section */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <Badge className="w-fit">Mobile First</Badge>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Perfect Experience on Every Device</h2>
              <p className="text-muted-foreground md:text-lg">
                Our calculators are designed mobile-first to ensure a seamless experience whether you're on your phone,
                tablet, or desktop. Fast, responsive, and always accessible.
              </p>
              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <Link href="/calculators">
                  <Button size="lg" className="w-full sm:w-auto">
                    Try on Mobile
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[400px] w-full max-w-[300px] overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="/images/mobile-calculator.png"
                  alt="Mobile calculator interface"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Image */}
      <section className="container px-4 py-12 md:py-16 md:px-6">
        <div className="relative overflow-hidden rounded-lg border bg-background p-8 shadow-lg md:p-12">
          <div className="absolute inset-0 bg-trust-primary/5" aria-hidden="true" />
          <div className="relative grid gap-6 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Ready to Get Started?</h2>
                <p className="text-muted-foreground md:text-lg">
                  Explore our comprehensive suite of calculators and start making informed decisions today.
                </p>
              </div>
              <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                <Link href="/calculators">
                  <Button size="lg" className="w-full sm:w-auto">
                    Browse All Calculators
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[240px] w-full max-w-[320px] overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="/images/calculator-dashboard.png"
                  alt="Calculator dashboard preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
