export type UnitCategory =
  | "length"
  | "weight"
  | "temperature"
  | "volume"
  | "area"
  | "speed"
  | "time"
  | "digital"
  | "pressure"
  | "energy"

export interface Unit {
  id: string
  name: string
  symbol: string
  conversionFactor: number
  offset?: number
}

export interface UnitCategoryDefinition {
  id: UnitCategory
  name: string
  icon: string
  units: Unit[]
  popularConversions: Array<[string, string]>
}

export interface RecentConversion {
  category: UnitCategory
  fromUnit: string
  toUnit: string
  value: number
  result: number
  timestamp: number
}
