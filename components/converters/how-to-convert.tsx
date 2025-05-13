import { LucideIcon } from "@/components/lucide-icon"
import type { UnitCategory, Unit } from "@/types/unit-converter"

interface HowToConvertProps {
  category: UnitCategory
  fromUnit: Unit
  toUnit: Unit
}

export function HowToConvert({ category, fromUnit, toUnit }: HowToConvertProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        How to Convert from {fromUnit.name} to {toUnit.name}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <LucideIcon name="pencil" className="h-5 w-5 text-primary" />
            </div>
            <h4 className="font-medium">Step 1: Enter Value</h4>
          </div>
          <p className="text-muted-foreground">
            Enter the {fromUnit.name} value you want to convert in the input field.
          </p>
        </div>

        <div className="p-4 border rounded-lg hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <LucideIcon name="calculator" className="h-5 w-5 text-primary" />
            </div>
            <h4 className="font-medium">Step 2: Automatic Calculation</h4>
          </div>
          <p className="text-muted-foreground">
            Our converter automatically applies the conversion formula and calculates the equivalent {toUnit.name}{" "}
            value.
          </p>
        </div>

        <div className="p-4 border rounded-lg hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <LucideIcon name="check" className="h-5 w-5 text-primary" />
            </div>
            <h4 className="font-medium">Step 3: Get Result</h4>
          </div>
          <p className="text-muted-foreground">
            The converted value in {toUnit.name} is displayed instantly. You can copy it to your clipboard with one
            click.
          </p>
        </div>
      </div>

      <div className="p-4 bg-muted/50 rounded-lg mt-6 border border-muted">
        <h4 className="font-medium mb-2">Manual Conversion Method</h4>
        <p>
          To convert manually from {fromUnit.name} to {toUnit.name}, multiply the {fromUnit.name} value by{" "}
          {(toUnit.conversionFactor / fromUnit.conversionFactor).toFixed(6)}.
        </p>
        <div className="mt-2 overflow-x-auto">
          <code className="p-2 bg-muted rounded text-sm block whitespace-nowrap">
            {toUnit.name} = {fromUnit.name} × {(toUnit.conversionFactor / fromUnit.conversionFactor).toFixed(6)}
          </code>
        </div>
      </div>
    </div>
  )
}
