import { MathJax, MathJaxContext } from "better-react-mathjax"
import type { UnitCategory, Unit } from "@/types/unit-converter"

interface ConversionFormulaProps {
  category: UnitCategory
  fromUnit: Unit
  toUnit: Unit
}

export function ConversionFormula({ category, fromUnit, toUnit }: ConversionFormulaProps) {
  // Temperature has special formulas
  if (category === "temperature") {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Conversion Formula</h3>
        <div className="p-4 border rounded-lg bg-muted/30">
          <MathJaxContext>
            {fromUnit.id === "celsius" && toUnit.id === "fahrenheit" && (
              <div>
                <p className="mb-2 font-medium">To convert from Celsius to Fahrenheit:</p>
                <div className="overflow-x-auto py-2">
                  <MathJax className="text-lg block text-center">{"$$°F = (°C \\times \\frac{9}{5}) + 32$$"}</MathJax>
                </div>
              </div>
            )}
            {fromUnit.id === "fahrenheit" && toUnit.id === "celsius" && (
              <div>
                <p className="mb-2 font-medium">To convert from Fahrenheit to Celsius:</p>
                <div className="overflow-x-auto py-2">
                  <MathJax className="text-lg block text-center">{"$$°C = (°F - 32) \\times \\frac{5}{9}$$"}</MathJax>
                </div>
              </div>
            )}
            {fromUnit.id === "celsius" && toUnit.id === "kelvin" && (
              <div>
                <p className="mb-2 font-medium">To convert from Celsius to Kelvin:</p>
                <div className="overflow-x-auto py-2">
                  <MathJax className="text-lg block text-center">{"$$K = °C + 273.15$$"}</MathJax>
                </div>
              </div>
            )}
            {fromUnit.id === "kelvin" && toUnit.id === "celsius" && (
              <div>
                <p className="mb-2 font-medium">To convert from Kelvin to Celsius:</p>
                <div className="overflow-x-auto py-2">
                  <MathJax className="text-lg block text-center">{"$$°C = K - 273.15$$"}</MathJax>
                </div>
              </div>
            )}
            {fromUnit.id === "fahrenheit" && toUnit.id === "kelvin" && (
              <div>
                <p className="mb-2 font-medium">To convert from Fahrenheit to Kelvin:</p>
                <div className="overflow-x-auto py-2">
                  <MathJax className="text-lg block text-center">
                    {"$$K = (°F - 32) \\times \\frac{5}{9} + 273.15$$"}
                  </MathJax>
                </div>
              </div>
            )}
            {fromUnit.id === "kelvin" && toUnit.id === "fahrenheit" && (
              <div>
                <p className="mb-2 font-medium">To convert from Kelvin to Fahrenheit:</p>
                <div className="overflow-x-auto py-2">
                  <MathJax className="text-lg block text-center">
                    {"$$°F = (K - 273.15) \\times \\frac{9}{5} + 32$$"}
                  </MathJax>
                </div>
              </div>
            )}
          </MathJaxContext>
        </div>
      </div>
    )
  }

  // For other unit types
  const conversionFactor = toUnit.conversionFactor / fromUnit.conversionFactor
  const inverseConversionFactor = fromUnit.conversionFactor / toUnit.conversionFactor

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Conversion Formula</h3>
      <div className="p-4 border rounded-lg bg-muted/30">
        <MathJaxContext>
          <div>
            <p className="mb-2 font-medium">
              To convert from {fromUnit.name} to {toUnit.name}:
            </p>
            <div className="overflow-x-auto py-2">
              <MathJax className="text-lg block text-center">{`\\(${toUnit.symbol} = ${fromUnit.symbol} \\times ${conversionFactor.toFixed(
                8,
              )}\\)`}</MathJax>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <p className="mb-2 font-medium">
              To convert from {toUnit.name} to {fromUnit.name}:
            </p>
            <div className="overflow-x-auto py-2">
              <MathJax className="text-lg block text-center">{`\\(${fromUnit.symbol} = ${toUnit.symbol} \\times ${inverseConversionFactor.toFixed(
                8,
              )}\\)`}</MathJax>
            </div>
          </div>
        </MathJaxContext>
      </div>
    </div>
  )
}
