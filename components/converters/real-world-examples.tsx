import Image from "next/image"
import type { UnitCategory, Unit } from "@/types/unit-converter"

interface RealWorldExampleProps {
  category: UnitCategory
  fromUnit: Unit
  toUnit: Unit
}

export function RealWorldExamples({ category, fromUnit, toUnit }: RealWorldExampleProps) {
  // Examples based on category
  const examples = getRealWorldExamples(category, fromUnit, toUnit)

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Real-World Examples</h3>
      <div className="grid grid-cols-1 gap-6">
        {examples.map((example, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg hover:shadow-md transition-all duration-300"
          >
            <div className="w-full sm:w-1/3 relative h-48 sm:h-auto">
              <Image
                src={example.image || "/placeholder.svg"}
                alt={example.imageAlt}
                fill
                className="object-cover rounded-md"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="w-full sm:w-2/3">
              <h4 className="font-medium text-lg mb-2">{example.title}</h4>
              <p className="text-muted-foreground">{example.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function getRealWorldExamples(category: UnitCategory, fromUnit: Unit, toUnit: Unit) {
  // Default examples if specific ones aren't available
  const defaultExamples = [
    {
      title: "International Standards",
      description: `Converting between ${fromUnit.name} and ${toUnit.name} is essential for international standards and specifications.`,
      image: "/placeholder.svg?height=300&width=400",
      imageAlt: `International standards conversion between ${fromUnit.name} and ${toUnit.name}`,
    },
    {
      title: "Everyday Applications",
      description: `In daily life, converting from ${fromUnit.name} to ${toUnit.name} helps in various practical situations.`,
      image: "/placeholder.svg?height=300&width=400",
      imageAlt: `Everyday applications of ${fromUnit.name} to ${toUnit.name} conversion`,
    },
  ]

  // Category-specific examples
  switch (category) {
    case "length":
      return [
        {
          title: "Construction and Architecture",
          description: `Architects and builders often need to convert between ${fromUnit.name} and ${toUnit.name} when working with international designs or materials.`,
          image: "/images/converters/construction.png",
          imageAlt: `Construction worker using ${fromUnit.name} to ${toUnit.name} conversion`,
        },
        {
          title: "Travel and Navigation",
          description: `When traveling internationally, understanding the conversion between ${fromUnit.name} and ${toUnit.name} helps with distance perception and navigation.`,
          image: "/images/converters/travel-map.png",
          imageAlt: `Map showing distances in both ${fromUnit.name} and ${toUnit.name}`,
        },
      ]
    case "weight":
      return [
        {
          title: "Cooking and Baking",
          description: `International recipes often require converting between ${fromUnit.name} and ${toUnit.name} for accurate measurements.`,
          image: "/images/converters/cooking.png",
          imageAlt: `Kitchen scale showing weight in ${fromUnit.name} and ${toUnit.name}`,
        },
        {
          title: "Shipping and Logistics",
          description: `Shipping companies need to convert between ${fromUnit.name} and ${toUnit.name} for international freight calculations.`,
          image: "/images/converters/shipping.png",
          imageAlt: `Shipping containers with weight specifications in ${fromUnit.name} and ${toUnit.name}`,
        },
      ]
    case "temperature":
      return [
        {
          title: "Weather Forecasting",
          description: `Weather reports in different countries use either ${fromUnit.name} or ${toUnit.name}, requiring conversion for travelers.`,
          image: "/images/converters/weather.png",
          imageAlt: `Weather forecast showing temperatures in both ${fromUnit.name} and ${toUnit.name}`,
        },
        {
          title: "Cooking and Baking",
          description: `Recipes from different regions may specify oven temperatures in ${fromUnit.name} or ${toUnit.name}, requiring conversion.`,
          image: "/images/converters/oven.png",
          imageAlt: `Oven with temperature dial showing both ${fromUnit.name} and ${toUnit.name}`,
        },
      ]
    // Add more categories as needed
    default:
      return defaultExamples
  }
}
