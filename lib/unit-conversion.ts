import type { UnitCategory, UnitCategoryDefinition, Unit, RecentConversion } from "@/types/unit-converter"

// Unit definitions with conversion factors to base unit
export const unitCategories: UnitCategoryDefinition[] = [
  {
    id: "length",
    name: "Length",
    icon: "ruler",
    units: [
      { id: "meter", name: "Meter", symbol: "m", conversionFactor: 1 },
      { id: "kilometer", name: "Kilometer", symbol: "km", conversionFactor: 1000 },
      { id: "centimeter", name: "Centimeter", symbol: "cm", conversionFactor: 0.01 },
      { id: "millimeter", name: "Millimeter", symbol: "mm", conversionFactor: 0.001 },
      { id: "inch", name: "Inch", symbol: "in", conversionFactor: 0.0254 },
      { id: "foot", name: "Foot", symbol: "ft", conversionFactor: 0.3048 },
      { id: "yard", name: "Yard", symbol: "yd", conversionFactor: 0.9144 },
      { id: "mile", name: "Mile", symbol: "mi", conversionFactor: 1609.344 },
      { id: "nautical-mile", name: "Nautical Mile", symbol: "nmi", conversionFactor: 1852 },
    ],
    popularConversions: [
      ["meter", "foot"],
      ["kilometer", "mile"],
      ["centimeter", "inch"],
      ["inch", "centimeter"],
      ["foot", "meter"],
      ["mile", "kilometer"],
    ],
  },
  {
    id: "weight",
    name: "Weight",
    icon: "weight",
    units: [
      { id: "kilogram", name: "Kilogram", symbol: "kg", conversionFactor: 1 },
      { id: "gram", name: "Gram", symbol: "g", conversionFactor: 0.001 },
      { id: "milligram", name: "Milligram", symbol: "mg", conversionFactor: 0.000001 },
      { id: "metric-ton", name: "Metric Ton", symbol: "t", conversionFactor: 1000 },
      { id: "pound", name: "Pound", symbol: "lb", conversionFactor: 0.45359237 },
      { id: "ounce", name: "Ounce", symbol: "oz", conversionFactor: 0.028349523125 },
      { id: "stone", name: "Stone", symbol: "st", conversionFactor: 6.35029318 },
      { id: "us-ton", name: "US Ton", symbol: "ton", conversionFactor: 907.18474 },
    ],
    popularConversions: [
      ["kilogram", "pound"],
      ["pound", "kilogram"],
      ["gram", "ounce"],
      ["ounce", "gram"],
      ["metric-ton", "us-ton"],
      ["stone", "kilogram"],
    ],
  },
  {
    id: "temperature",
    name: "Temperature",
    icon: "thermometer",
    units: [
      { id: "celsius", name: "Celsius", symbol: "°C", conversionFactor: 1, offset: 0 },
      { id: "fahrenheit", name: "Fahrenheit", symbol: "°F", conversionFactor: 5 / 9, offset: -32 },
      { id: "kelvin", name: "Kelvin", symbol: "K", conversionFactor: 1, offset: -273.15 },
    ],
    popularConversions: [
      ["celsius", "fahrenheit"],
      ["fahrenheit", "celsius"],
      ["celsius", "kelvin"],
      ["kelvin", "celsius"],
      ["fahrenheit", "kelvin"],
    ],
  },
  {
    id: "volume",
    name: "Volume",
    icon: "flask",
    units: [
      { id: "liter", name: "Liter", symbol: "L", conversionFactor: 1 },
      { id: "milliliter", name: "Milliliter", symbol: "mL", conversionFactor: 0.001 },
      { id: "cubic-meter", name: "Cubic Meter", symbol: "m³", conversionFactor: 1000 },
      { id: "cubic-centimeter", name: "Cubic Centimeter", symbol: "cm³", conversionFactor: 0.001 },
      { id: "us-gallon", name: "US Gallon", symbol: "gal", conversionFactor: 3.78541 },
      { id: "us-quart", name: "US Quart", symbol: "qt", conversionFactor: 0.946353 },
      { id: "us-pint", name: "US Pint", symbol: "pt", conversionFactor: 0.473176 },
      { id: "us-cup", name: "US Cup", symbol: "cup", conversionFactor: 0.24 },
      { id: "us-fluid-ounce", name: "US Fluid Ounce", symbol: "fl oz", conversionFactor: 0.0295735 },
      { id: "imperial-gallon", name: "Imperial Gallon", symbol: "gal (UK)", conversionFactor: 4.54609 },
    ],
    popularConversions: [
      ["liter", "us-gallon"],
      ["milliliter", "us-fluid-ounce"],
      ["us-cup", "milliliter"],
      ["us-gallon", "liter"],
      ["liter", "imperial-gallon"],
      ["us-pint", "liter"],
    ],
  },
  {
    id: "area",
    name: "Area",
    icon: "square",
    units: [
      { id: "square-meter", name: "Square Meter", symbol: "m²", conversionFactor: 1 },
      { id: "square-kilometer", name: "Square Kilometer", symbol: "km²", conversionFactor: 1000000 },
      { id: "square-centimeter", name: "Square Centimeter", symbol: "cm²", conversionFactor: 0.0001 },
      { id: "square-millimeter", name: "Square Millimeter", symbol: "mm²", conversionFactor: 0.000001 },
      { id: "square-inch", name: "Square Inch", symbol: "in²", conversionFactor: 0.00064516 },
      { id: "square-foot", name: "Square Foot", symbol: "ft²", conversionFactor: 0.09290304 },
      { id: "square-yard", name: "Square Yard", symbol: "yd²", conversionFactor: 0.83612736 },
      { id: "square-mile", name: "Square Mile", symbol: "mi²", conversionFactor: 2589988.11 },
      { id: "acre", name: "Acre", symbol: "ac", conversionFactor: 4046.8564224 },
      { id: "hectare", name: "Hectare", symbol: "ha", conversionFactor: 10000 },
    ],
    popularConversions: [
      ["square-meter", "square-foot"],
      ["square-foot", "square-meter"],
      ["acre", "hectare"],
      ["hectare", "acre"],
      ["square-kilometer", "square-mile"],
      ["square-mile", "square-kilometer"],
    ],
  },
  {
    id: "speed",
    name: "Speed",
    icon: "gauge",
    units: [
      { id: "meter-per-second", name: "Meter per Second", symbol: "m/s", conversionFactor: 1 },
      { id: "kilometer-per-hour", name: "Kilometer per Hour", symbol: "km/h", conversionFactor: 0.277778 },
      { id: "mile-per-hour", name: "Mile per Hour", symbol: "mph", conversionFactor: 0.44704 },
      { id: "foot-per-second", name: "Foot per Second", symbol: "ft/s", conversionFactor: 0.3048 },
      { id: "knot", name: "Knot", symbol: "kn", conversionFactor: 0.514444 },
    ],
    popularConversions: [
      ["kilometer-per-hour", "mile-per-hour"],
      ["mile-per-hour", "kilometer-per-hour"],
      ["meter-per-second", "kilometer-per-hour"],
      ["knot", "kilometer-per-hour"],
      ["mile-per-hour", "meter-per-second"],
    ],
  },
  {
    id: "time",
    name: "Time",
    icon: "clock",
    units: [
      { id: "second", name: "Second", symbol: "s", conversionFactor: 1 },
      { id: "millisecond", name: "Millisecond", symbol: "ms", conversionFactor: 0.001 },
      { id: "microsecond", name: "Microsecond", symbol: "μs", conversionFactor: 0.000001 },
      { id: "nanosecond", name: "Nanosecond", symbol: "ns", conversionFactor: 0.000000001 },
      { id: "minute", name: "Minute", symbol: "min", conversionFactor: 60 },
      { id: "hour", name: "Hour", symbol: "h", conversionFactor: 3600 },
      { id: "day", name: "Day", symbol: "d", conversionFactor: 86400 },
      { id: "week", name: "Week", symbol: "wk", conversionFactor: 604800 },
      { id: "month", name: "Month (avg)", symbol: "mo", conversionFactor: 2629800 },
      { id: "year", name: "Year", symbol: "yr", conversionFactor: 31557600 },
    ],
    popularConversions: [
      ["hour", "minute"],
      ["day", "hour"],
      ["week", "day"],
      ["month", "day"],
      ["year", "day"],
      ["minute", "second"],
    ],
  },
  {
    id: "digital",
    name: "Digital",
    icon: "hard-drive",
    units: [
      { id: "byte", name: "Byte", symbol: "B", conversionFactor: 1 },
      { id: "kilobyte", name: "Kilobyte", symbol: "KB", conversionFactor: 1000 },
      { id: "megabyte", name: "Megabyte", symbol: "MB", conversionFactor: 1000000 },
      { id: "gigabyte", name: "Gigabyte", symbol: "GB", conversionFactor: 1000000000 },
      { id: "terabyte", name: "Terabyte", symbol: "TB", conversionFactor: 1000000000000 },
      { id: "petabyte", name: "Petabyte", symbol: "PB", conversionFactor: 1000000000000000 },
      { id: "kibibyte", name: "Kibibyte", symbol: "KiB", conversionFactor: 1024 },
      { id: "mebibyte", name: "Mebibyte", symbol: "MiB", conversionFactor: 1048576 },
      { id: "gibibyte", name: "Gibibyte", symbol: "GiB", conversionFactor: 1073741824 },
      { id: "tebibyte", name: "Tebibyte", symbol: "TiB", conversionFactor: 1099511627776 },
      { id: "pebibyte", name: "Pebibyte", symbol: "PiB", conversionFactor: 1125899906842624 },
    ],
    popularConversions: [
      ["gigabyte", "gibibyte"],
      ["megabyte", "mebibyte"],
      ["terabyte", "tebibyte"],
      ["kilobyte", "kibibyte"],
      ["gigabyte", "megabyte"],
      ["terabyte", "gigabyte"],
    ],
  },
  {
    id: "pressure",
    name: "Pressure",
    icon: "gauge",
    units: [
      { id: "pascal", name: "Pascal", symbol: "Pa", conversionFactor: 1 },
      { id: "kilopascal", name: "Kilopascal", symbol: "kPa", conversionFactor: 1000 },
      { id: "megapascal", name: "Megapascal", symbol: "MPa", conversionFactor: 1000000 },
      { id: "bar", name: "Bar", symbol: "bar", conversionFactor: 100000 },
      { id: "psi", name: "Pound per Square Inch", symbol: "psi", conversionFactor: 6894.76 },
      { id: "atmosphere", name: "Atmosphere", symbol: "atm", conversionFactor: 101325 },
      { id: "torr", name: "Torr", symbol: "Torr", conversionFactor: 133.322 },
      { id: "millimeter-of-mercury", name: "Millimeter of Mercury", symbol: "mmHg", conversionFactor: 133.322 },
    ],
    popularConversions: [
      ["bar", "psi"],
      ["psi", "bar"],
      ["kilopascal", "psi"],
      ["atmosphere", "bar"],
      ["millimeter-of-mercury", "kilopascal"],
      ["bar", "atmosphere"],
    ],
  },
  {
    id: "energy",
    name: "Energy",
    icon: "zap",
    units: [
      { id: "joule", name: "Joule", symbol: "J", conversionFactor: 1 },
      { id: "kilojoule", name: "Kilojoule", symbol: "kJ", conversionFactor: 1000 },
      { id: "calorie", name: "Calorie", symbol: "cal", conversionFactor: 4.184 },
      { id: "kilocalorie", name: "Kilocalorie", symbol: "kcal", conversionFactor: 4184 },
      { id: "watt-hour", name: "Watt Hour", symbol: "Wh", conversionFactor: 3600 },
      { id: "kilowatt-hour", name: "Kilowatt Hour", symbol: "kWh", conversionFactor: 3600000 },
      { id: "electronvolt", name: "Electronvolt", symbol: "eV", conversionFactor: 1.602176634e-19 },
      { id: "british-thermal-unit", name: "British Thermal Unit", symbol: "BTU", conversionFactor: 1055.06 },
      { id: "foot-pound", name: "Foot-Pound", symbol: "ft⋅lb", conversionFactor: 1.355818 },
    ],
    popularConversions: [
      ["kilocalorie", "kilojoule"],
      ["joule", "calorie"],
      ["kilowatt-hour", "megajoule"],
      ["british-thermal-unit", "kilojoule"],
      ["kilocalorie", "kilowatt-hour"],
      ["joule", "foot-pound"],
    ],
  },
]

// Convert value from one unit to another
export function convertValue(value: number, fromUnit: Unit, toUnit: Unit, category: UnitCategory): number {
  // Special case for temperature
  if (category === "temperature") {
    // Convert to Celsius first (our base unit for temperature)
    let celsius: number

    if (fromUnit.id === "celsius") {
      celsius = value
    } else if (fromUnit.id === "fahrenheit") {
      celsius = (value - 32) * (5 / 9)
    } else if (fromUnit.id === "kelvin") {
      celsius = value - 273.15
    } else {
      celsius = value
    }

    // Convert from Celsius to target unit
    if (toUnit.id === "celsius") {
      return celsius
    } else if (toUnit.id === "fahrenheit") {
      return celsius * (9 / 5) + 32
    } else if (toUnit.id === "kelvin") {
      return celsius + 273.15
    } else {
      return celsius
    }
  }

  // For all other unit types, use conversion factors
  // Convert from source unit to base unit, then from base unit to target unit
  const valueInBaseUnit = value * fromUnit.conversionFactor
  return valueInBaseUnit / toUnit.conversionFactor
}

// Format the result with appropriate precision
export function formatResult(value: number): string {
  if (Math.abs(value) < 0.000001 && value !== 0) {
    return value.toExponential(6)
  }

  if (Math.abs(value) >= 1000000) {
    return value.toExponential(6)
  }

  // For very small numbers or very large numbers, use exponential notation
  if (Math.abs(value) < 0.01 || Math.abs(value) >= 10000) {
    return value.toPrecision(6)
  }

  // For normal range numbers, use fixed precision
  const decimalPlaces = value % 1 === 0 ? 0 : 6
  return value.toFixed(decimalPlaces).replace(/\.?0+$/, "")
}

// Get unit by ID from a category
export function getUnitById(categoryId: UnitCategory, unitId: string): Unit | undefined {
  const category = unitCategories.find((cat) => cat.id === categoryId)
  return category?.units.find((unit) => unit.id === unitId)
}

// Save recent conversion to localStorage
export function saveRecentConversion(conversion: RecentConversion): void {
  if (typeof window === "undefined") return

  try {
    const recentConversions = getRecentConversions()

    // Check if this exact conversion already exists
    const existingIndex = recentConversions.findIndex(
      (c) => c.category === conversion.category && c.fromUnit === conversion.fromUnit && c.toUnit === conversion.toUnit,
    )

    // If it exists, remove it (we'll add the updated one to the front)
    if (existingIndex !== -1) {
      recentConversions.splice(existingIndex, 1)
    }

    // Add the new conversion to the front
    recentConversions.unshift(conversion)

    // Keep only the 10 most recent conversions
    const trimmedConversions = recentConversions.slice(0, 10)

    localStorage.setItem("recentConversions", JSON.stringify(trimmedConversions))
  } catch (error) {
    console.error("Error saving recent conversion:", error)
  }
}

// Get recent conversions from localStorage
export function getRecentConversions(): RecentConversion[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem("recentConversions")
    if (!stored) return []

    return JSON.parse(stored)
  } catch (error) {
    console.error("Error retrieving recent conversions:", error)
    return []
  }
}
