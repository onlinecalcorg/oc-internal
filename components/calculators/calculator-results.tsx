import type { Calculator } from "@/lib/site-config"
import { CalculatorCard } from "./calculator-card"

interface CalculatorResultsProps {
  calculators: Calculator[]
  searchTerm?: string
}

export function CalculatorResults({ calculators, searchTerm }: CalculatorResultsProps) {
  return (
    <div className="space-y-6">
      {searchTerm && (
        <p className="text-sm text-muted-foreground">
          {calculators.length} {calculators.length === 1 ? "result" : "results"} found for "{searchTerm}"
        </p>
      )}

      {calculators.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calculator) => (
            <CalculatorCard key={calculator.slug} calculator={calculator} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg bg-muted/30">
          <h3 className="text-lg font-medium mb-2">No calculators found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}
