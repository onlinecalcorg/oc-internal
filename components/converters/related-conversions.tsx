import Link from "next/link"
import { LucideIcon } from "@/components/lucide-icon"
import type { UnitCategory, Unit } from "@/types/unit-converter"
import { unitCategories, getUnitById } from "@/lib/unit-conversion"

interface RelatedConversionsProps {
  category: UnitCategory
  fromUnit: Unit
  toUnit: Unit
}

export function RelatedConversions({ category, fromUnit, toUnit }: RelatedConversionsProps) {
  // Get the category data
  const categoryData = unitCategories.find((cat) => cat.id === category)
  if (!categoryData) return null

  // Get related conversions
  const relatedConversions = getRelatedConversions(category, fromUnit.id, toUnit.id)

  // Get other categories
  const otherCategories = unitCategories.filter((cat) => cat.id !== category).slice(0, 3)

  // Update the return statement for better mobile display
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Related Conversions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {relatedConversions.map((conversion, index) => {
            const fromUnitObj = getUnitById(category, conversion.from)
            const toUnitObj = getUnitById(category, conversion.to)

            if (!fromUnitObj || !toUnitObj) return null

            return (
              <Link
                key={index}
                href={`/convert/${category}/${conversion.from}/to/${conversion.to}`}
                className="p-3 border rounded-lg hover:bg-muted/50 transition-all duration-300 hover:shadow-sm block"
              >
                <div className="font-medium">
                  {fromUnitObj.name} to {toUnitObj.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {fromUnitObj.symbol} to {toUnitObj.symbol}
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Other Conversion Categories</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {otherCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/convert/${cat.id}`}
              className="p-3 border rounded-lg hover:bg-muted/50 transition-all duration-300 hover:shadow-sm flex items-center gap-3"
            >
              <div className="p-2 bg-primary/10 rounded-full flex-shrink-0">
                <LucideIcon name={cat.icon} className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-medium">{cat.name}</div>
                <div className="text-sm text-muted-foreground">Converter</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function getRelatedConversions(category: UnitCategory, fromUnitId: string, toUnitId: string) {
  const categoryData = unitCategories.find((cat) => cat.id === category)
  if (!categoryData) return []

  // Get popular conversions for this category
  const popularConversions = [...categoryData.popularConversions]

  // Filter out the current conversion
  const filteredConversions = popularConversions.filter(
    ([from, to]) => !(from === fromUnitId && to === toUnitId) && !(from === toUnitId && to === fromUnitId),
  )

  // Add some conversions related to the current units
  const relatedToFromUnit = categoryData.units
    .filter((unit) => unit.id !== fromUnitId && unit.id !== toUnitId)
    .slice(0, 2)
    .map((unit) => [fromUnitId, unit.id] as [string, string])

  const relatedToToUnit = categoryData.units
    .filter((unit) => unit.id !== fromUnitId && unit.id !== toUnitId)
    .slice(0, 2)
    .map((unit) => [unit.id, toUnitId] as [string, string])

  // Combine and remove duplicates
  const allRelated = [...filteredConversions, ...relatedToFromUnit, ...relatedToToUnit]

  // Convert to objects for easier filtering
  const uniqueRelated = allRelated
    .map(([from, to]) => ({ from, to }))
    .filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (t) => (t.from === value.from && t.to === value.to) || (t.from === value.to && t.to === value.from),
        ),
    )

  return uniqueRelated.slice(0, 6)
}
