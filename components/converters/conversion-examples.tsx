import { convertValue, formatResult } from "@/lib/unit-conversion"
import type { UnitCategory, Unit } from "@/types/unit-converter"
import Link from "next/link"

interface ConversionExamplesProps {
  category: UnitCategory
  fromUnit: Unit
  toUnit: Unit
  values?: number[]
}

export function ConversionExamples({
  category,
  fromUnit,
  toUnit,
  values = [1, 5, 10, 20, 50, 100],
}: ConversionExamplesProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        Common {fromUnit.name} to {toUnit.name} Conversions
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {values.map((value) => {
          const convertedValue = convertValue(value, fromUnit, toUnit, category)

          return (
            <Link
              key={value}
              href={`/convert/${category}/${fromUnit.id}/to/${toUnit.id}?value=${value}`}
              className="block"
            >
              <div className="p-3 border rounded-md text-center hover:bg-muted/50 transition-all duration-300 hover:shadow-sm">
                <div className="font-medium truncate">
                  {value} {fromUnit.symbol} =
                </div>
                <div className="truncate">
                  {formatResult(convertedValue)} {toUnit.symbol}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
