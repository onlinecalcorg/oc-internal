import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LucideIcon } from "@/components/lucide-icon"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { Calculator } from "@/lib/site-config"

interface CategoryCardProps {
  title: string
  description: string
  icon: string
  slug: string
  calculators: Calculator[]
}

export function CategoryCard({ title, description, icon, slug, calculators }: CategoryCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden group hover:shadow-md transition-all">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <LucideIcon name={icon} className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-xl group-hover:text-primary transition-colors">{title}</CardTitle>
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>

      {calculators.length > 0 && (
        <>
          <Separator />
          <CardContent className="p-4 pt-3 pb-0 flex-grow">
            <div className="text-sm font-medium mb-3">Popular in this category:</div>
            <ul className="space-y-2">
              {calculators.map((calculator) => (
                <li key={calculator.slug} className="flex items-center gap-2">
                  <LucideIcon name={calculator.icon} className="h-4 w-4 text-muted-foreground" />
                  <Link
                    href={`/calculators/${calculator.slug}`}
                    className="text-sm hover:text-primary hover:underline transition-colors"
                  >
                    {calculator.title}
                  </Link>
                  {calculator.isNew && (
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                      New
                    </Badge>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </>
      )}

      <CardFooter className="p-4 mt-auto">
        <Button asChild variant="outline" className="w-full group-hover:bg-primary/5 transition-colors">
          <Link href={`/calculators?category=${slug}`}>View All {title} Calculators</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
