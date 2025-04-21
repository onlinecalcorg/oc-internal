import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LucideIcon } from "@/components/lucide-icon"
import Link from "next/link"
import type { Calculator } from "@/lib/site-config"

interface CalculatorCardProps {
  calculator: Calculator
  featured?: boolean
}

export function CalculatorCard({ calculator, featured = false }: CalculatorCardProps) {
  const { title, description, slug, category, icon } = calculator

  return (
    <Card
      className={`overflow-hidden transition-all hover:shadow-md ${featured ? "border-trust-primary/30 bg-trust-primary/5" : ""}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${featured ? "bg-trust-primary/20" : "bg-trust-primary/10"}`}>
              <LucideIcon name={icon} className="h-6 w-6 text-trust-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <Link href={`/calculators?category=${category}`}>
                <Badge
                  variant="outline"
                  className="mt-1 text-xs bg-background/80 hover:bg-trust-primary/10 transition-colors"
                >
                  {category}
                </Badge>
              </Link>
            </div>
          </div>
          {featured && <Badge className="bg-trust-primary text-white">Featured</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardContent>
      <CardFooter className="pt-2">
        <Button asChild className="w-full">
          <Link href={`/calculators/${slug}`}>Try Calculator</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
