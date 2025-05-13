"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { convertValue } from "@/lib/unit-conversion"
import type { UnitCategory, Unit } from "@/types/unit-converter"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ConversionChartProps {
  category: UnitCategory
  fromUnit: Unit
  toUnit: Unit
}

export function ConversionChart({ category, fromUnit, toUnit }: ConversionChartProps) {
  const [chartData, setChartData] = useState<Array<{ [key: string]: number }>>([])

  useEffect(() => {
    // Generate data points for the chart
    const data = []
    const maxValue = getMaxValueForCategory(category, fromUnit)
    const step = maxValue / 10

    for (let i = 0; i <= 10; i++) {
      const fromValue = i * step
      const toValue = convertValue(fromValue, fromUnit, toUnit, category)

      data.push({
        [fromUnit.id]: fromValue,
        [toUnit.id]: toValue,
      })
    }

    setChartData(data)
  }, [category, fromUnit, toUnit])

  if (chartData.length === 0) {
    return <div>Loading chart...</div>
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Conversion Chart</h3>
      <div className="h-[250px] sm:h-[300px] w-full">
        <ChartContainer
          config={{
            [fromUnit.id]: {
              label: fromUnit.name,
              color: "hsl(var(--chart-1))",
            },
            [toUnit.id]: {
              label: toUnit.name,
              color: "hsl(var(--chart-2))",
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 10, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey={fromUnit.id}
                label={{
                  value: fromUnit.symbol,
                  position: "insideBottomRight",
                  offset: -10,
                  fontSize: 12,
                }}
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => (value.toString().length > 4 ? value.toExponential(1) : value)}
              />
              <YAxis
                label={{
                  value: toUnit.symbol,
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle", fontSize: 12 },
                }}
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => (value.toString().length > 4 ? value.toExponential(1) : value)}
                width={40}
              />
              <ChartTooltip content={<ChartTooltipContent />} wrapperStyle={{ outline: "none" }} />
              <Legend wrapperStyle={{ fontSize: 12, marginTop: 10 }} />
              <Line
                type="monotone"
                dataKey={toUnit.id}
                stroke="var(--color-chart-2)"
                name={`${toUnit.name} (${toUnit.symbol})`}
                activeDot={{ r: 6 }}
                strokeWidth={2}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      <p className="text-sm text-muted-foreground text-center">
        This chart shows the relationship between {fromUnit.name} and {toUnit.name}
      </p>
    </div>
  )
}

function getMaxValueForCategory(category: UnitCategory, unit: Unit): number {
  switch (category) {
    case "length":
      return unit.id === "kilometer" || unit.id === "mile" ? 10 : unit.id === "meter" || unit.id === "yard" ? 100 : 1000
    case "weight":
      return unit.id === "metric-ton" || unit.id === "us-ton"
        ? 5
        : unit.id === "kilogram" || unit.id === "pound"
          ? 100
          : 1000
    case "temperature":
      return unit.id === "kelvin" ? 373.15 : unit.id === "celsius" ? 100 : 212
    case "volume":
      return unit.id === "cubic-meter" ? 10 : unit.id === "liter" || unit.id === "us-gallon" ? 100 : 1000
    case "area":
      return unit.id === "square-kilometer" || unit.id === "square-mile"
        ? 5
        : unit.id === "hectare" || unit.id === "acre"
          ? 10
          : 100
    case "speed":
      return 100
    case "time":
      return unit.id === "year" || unit.id === "month" ? 5 : unit.id === "week" ? 10 : unit.id === "day" ? 30 : 60
    case "digital":
      return unit.id === "petabyte" || unit.id === "pebibyte"
        ? 5
        : unit.id === "terabyte" || unit.id === "tebibyte"
          ? 10
          : unit.id === "gigabyte" || unit.id === "gibibyte"
            ? 100
            : 1000
    case "pressure":
      return 100
    case "energy":
      return 100
    default:
      return 100
  }
}
