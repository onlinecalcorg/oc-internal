"use client"

import { useState } from "react"
import { Car, Home, Utensils, ShoppingBag, Recycle, Leaf, BarChart } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CarbonFootprintCalculator() {
  // Transportation
  const [carMileage, setCarMileage] = useState(10000)
  const [carEfficiency, setCarEfficiency] = useState("average") // low, average, high
  const [publicTransport, setPublicTransport] = useState(1000)
  const [flightHours, setFlightHours] = useState(10)

  // Home Energy
  const [electricitySource, setElectricitySource] = useState("grid") // grid, partial-renewable, renewable
  const [homeSize, setHomeSize] = useState("medium") // small, medium, large
  const [energyEfficiency, setEnergyEfficiency] = useState("average") // low, average, high

  // Diet
  const [dietType, setDietType] = useState("omnivore") // vegan, vegetarian, pescatarian, omnivore, high-meat
  const [foodWaste, setFoodWaste] = useState("medium") // low, medium, high
  const [localFood, setLocalFood] = useState("some") // mostly, some, rarely

  // Consumption
  const [shoppingHabits, setShoppingHabits] = useState("average") // minimal, average, frequent
  const [goodsLifespan, setGoodsLifespan] = useState("average") // long, average, short

  // Waste
  const [recyclingHabits, setRecyclingHabits] = useState("most") // all, most, some, none
  const [compostingHabits, setCompostingHabits] = useState("some") // all, some, none

  // Calculate carbon footprint
  const calculateCarbonFootprint = () => {
    let total = 0

    // Transportation emissions (tCO2e)
    const carEmissionFactors = { low: 0.1, average: 0.2, high: 0.3 }
    total += (carMileage / 1000) * carEmissionFactors[carEfficiency as keyof typeof carEmissionFactors]
    total += (publicTransport / 1000) * 0.05
    total += flightHours * 0.25

    // Home energy emissions
    const electricityFactors = { grid: 3, "partial-renewable": 1.5, renewable: 0.5 }
    const homeSizeFactors = { small: 0.8, medium: 1, large: 1.5 }
    const efficiencyFactors = { low: 1.3, average: 1, high: 0.7 }

    total +=
      electricityFactors[electricitySource as keyof typeof electricityFactors] *
      homeSizeFactors[homeSize as keyof typeof homeSizeFactors] *
      efficiencyFactors[energyEfficiency as keyof typeof efficiencyFactors]

    // Diet emissions
    const dietFactors = { vegan: 1, vegetarian: 1.5, pescatarian: 2, omnivore: 2.5, "high-meat": 3.5 }
    const wasteFactors = { low: 0.8, medium: 1, high: 1.3 }
    const localFactors = { mostly: 0.8, some: 1, rarely: 1.2 }

    total +=
      dietFactors[dietType as keyof typeof dietFactors] *
      wasteFactors[foodWaste as keyof typeof wasteFactors] *
      localFactors[localFood as keyof typeof localFactors]

    // Consumption emissions
    const shoppingFactors = { minimal: 1, average: 2, frequent: 3 }
    const lifespanFactors = { long: 0.7, average: 1, short: 1.5 }

    total +=
      shoppingFactors[shoppingHabits as keyof typeof shoppingFactors] *
      lifespanFactors[goodsLifespan as keyof typeof lifespanFactors]

    // Waste emissions
    const recyclingFactors = { all: 0.5, most: 0.8, some: 1.2, none: 1.5 }
    const compostingFactors = { all: 0.7, some: 1, none: 1.2 }

    total +=
      recyclingFactors[recyclingHabits as keyof typeof recyclingFactors] *
      compostingFactors[compostingHabits as keyof typeof compostingFactors] *
      0.5

    return total
  }

  const footprint = calculateCarbonFootprint()
  const globalAverage = 4.7 // Global average carbon footprint in tCO2e
  const sustainableLevel = 2.0 // Sustainable carbon footprint level

  // Calculate category breakdowns
  const transportationEmissions =
    (carMileage / 1000) * (carEfficiency === "low" ? 0.1 : carEfficiency === "average" ? 0.2 : 0.3) +
    (publicTransport / 1000) * 0.05 +
    flightHours * 0.25

  const homeEmissions =
    (electricitySource === "grid" ? 3 : electricitySource === "partial-renewable" ? 1.5 : 0.5) *
    (homeSize === "small" ? 0.8 : homeSize === "medium" ? 1 : 1.5) *
    (energyEfficiency === "low" ? 1.3 : energyEfficiency === "average" ? 1 : 0.7)

  const dietEmissions =
    (dietType === "vegan"
      ? 1
      : dietType === "vegetarian"
        ? 1.5
        : dietType === "pescatarian"
          ? 2
          : dietType === "omnivore"
            ? 2.5
            : 3.5) *
    (foodWaste === "low" ? 0.8 : foodWaste === "medium" ? 1 : 1.3) *
    (localFood === "mostly" ? 0.8 : localFood === "some" ? 1 : 1.2)

  const consumptionEmissions =
    (shoppingHabits === "minimal" ? 1 : shoppingHabits === "average" ? 2 : 3) *
    (goodsLifespan === "long" ? 0.7 : goodsLifespan === "average" ? 1 : 1.5)

  const wasteEmissions =
    (recyclingHabits === "all" ? 0.5 : recyclingHabits === "most" ? 0.8 : recyclingHabits === "some" ? 1.2 : 1.5) *
    (compostingHabits === "all" ? 0.7 : compostingHabits === "some" ? 1 : 1.2) *
    0.5

  // Calculate percentages for the breakdown
  const total = transportationEmissions + homeEmissions + dietEmissions + consumptionEmissions + wasteEmissions
  const transportationPercentage = (transportationEmissions / total) * 100
  const homePercentage = (homeEmissions / total) * 100
  const dietPercentage = (dietEmissions / total) * 100
  const consumptionPercentage = (consumptionEmissions / total) * 100
  const wastePercentage = (wasteEmissions / total) * 100

  // Generate recommendations based on the highest emission categories
  const getRecommendations = () => {
    const recommendations = []

    if (transportationEmissions > 2) {
      recommendations.push(
        "Consider reducing car travel by carpooling, using public transportation, or biking for short trips.",
      )
      if (flightHours > 10) {
        recommendations.push("Reduce air travel or consider carbon offsets for necessary flights.")
      }
    }

    if (homeEmissions > 2) {
      if (electricitySource === "grid") {
        recommendations.push("Switch to a renewable energy provider or install solar panels if possible.")
      }
      if (energyEfficiency === "low") {
        recommendations.push("Improve home insulation and upgrade to energy-efficient appliances.")
      }
    }

    if (dietEmissions > 2) {
      if (dietType === "high-meat" || dietType === "omnivore") {
        recommendations.push("Reduce meat consumption by incorporating more plant-based meals into your diet.")
      }
      if (foodWaste === "high") {
        recommendations.push("Plan meals carefully to reduce food waste and compost organic waste when possible.")
      }
    }

    if (consumptionEmissions > 2) {
      recommendations.push("Practice mindful consumption by buying fewer, higher-quality items that last longer.")
      recommendations.push("Consider second-hand purchases and repair items instead of replacing them.")
    }

    if (wasteEmissions > 1) {
      if (recyclingHabits === "none" || recyclingHabits === "some") {
        recommendations.push("Improve recycling habits by setting up a comprehensive recycling system at home.")
      }
      if (compostingHabits === "none") {
        recommendations.push("Start composting food scraps and yard waste to reduce landfill waste.")
      }
    }

    return recommendations.length > 0
      ? recommendations
      : ["Your carbon footprint is already relatively low. Keep up the good work!"]
  }

  const recommendations = getRecommendations()

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Carbon Footprint</CardTitle>
            <CardDescription>Based on your lifestyle choices</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <span className="text-4xl font-bold">{footprint.toFixed(1)}</span>
              <span className="text-xl ml-1">tCO₂e/year</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Sustainable Level</span>
                <span>Global Average</span>
              </div>
              <div className="relative pt-4">
                <div className="absolute left-0 top-0 h-2 w-full bg-muted rounded-full">
                  <div
                    className={`absolute left-0 top-0 h-2 rounded-full ${
                      footprint <= sustainableLevel
                        ? "bg-green-500"
                        : footprint <= globalAverage
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                    style={{ width: `${Math.min((footprint / 10) * 100, 100)}%` }}
                  />
                  <div
                    className="absolute left-0 top-0 h-4 w-0.5 bg-green-500"
                    style={{ left: `${(sustainableLevel / 10) * 100}%`, top: "-4px" }}
                  />
                  <div
                    className="absolute left-0 top-0 h-4 w-0.5 bg-gray-500"
                    style={{ left: `${(globalAverage / 10) * 100}%`, top: "-4px" }}
                  />
                </div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{sustainableLevel.toFixed(1)}</span>
                <span>{globalAverage.toFixed(1)}</span>
                <span>10.0+</span>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="font-semibold">Emissions Breakdown</h3>

              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Car className="h-4 w-4" /> Transportation
                    </span>
                    <span>{transportationEmissions.toFixed(1)} tCO₂e</span>
                  </div>
                  <Progress value={transportationPercentage} className="h-2" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Home className="h-4 w-4" /> Home Energy
                    </span>
                    <span>{homeEmissions.toFixed(1)} tCO₂e</span>
                  </div>
                  <Progress value={homePercentage} className="h-2" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Utensils className="h-4 w-4" /> Diet
                    </span>
                    <span>{dietEmissions.toFixed(1)} tCO₂e</span>
                  </div>
                  <Progress value={dietPercentage} className="h-2" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <ShoppingBag className="h-4 w-4" /> Consumption
                    </span>
                    <span>{consumptionEmissions.toFixed(1)} tCO₂e</span>
                  </div>
                  <Progress value={consumptionPercentage} className="h-2" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Recycle className="h-4 w-4" /> Waste
                    </span>
                    <span>{wasteEmissions.toFixed(1)} tCO₂e</span>
                  </div>
                  <Progress value={wastePercentage} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>Ways to reduce your carbon footprint</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((recommendation, index) => (
                <div key={index} className="flex gap-2">
                  <Leaf className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <p>{recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">
              <BarChart className="mr-2 h-4 w-4" /> Compare to Average
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="transportation" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="transportation">
            <Car className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Transportation</span>
          </TabsTrigger>
          <TabsTrigger value="home">
            <Home className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Home</span>
          </TabsTrigger>
          <TabsTrigger value="diet">
            <Utensils className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Diet</span>
          </TabsTrigger>
          <TabsTrigger value="consumption">
            <ShoppingBag className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Consumption</span>
          </TabsTrigger>
          <TabsTrigger value="waste">
            <Recycle className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Waste</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="transportation" className="p-4 border rounded-md mt-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Annual Car Mileage</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[carMileage]}
                  min={0}
                  max={30000}
                  step={1000}
                  onValueChange={(value) => setCarMileage(value[0])}
                  className="flex-1"
                />
                <span className="w-16 text-right">{carMileage.toLocaleString()} mi</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Car Fuel Efficiency</Label>
              <RadioGroup value={carEfficiency} onValueChange={setCarEfficiency}>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="efficiency-high" />
                    <Label htmlFor="efficiency-high">High (Electric/Hybrid)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="average" id="efficiency-average" />
                    <Label htmlFor="efficiency-average">Average (30+ MPG)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="efficiency-low" />
                    <Label htmlFor="efficiency-low">Low (SUV/Truck)</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Annual Public Transportation Miles</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[publicTransport]}
                  min={0}
                  max={5000}
                  step={100}
                  onValueChange={(value) => setPublicTransport(value[0])}
                  className="flex-1"
                />
                <span className="w-16 text-right">{publicTransport.toLocaleString()} mi</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Annual Flight Hours</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[flightHours]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setFlightHours(value[0])}
                  className="flex-1"
                />
                <span className="w-16 text-right">{flightHours} hrs</span>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="home" className="p-4 border rounded-md mt-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Electricity Source</Label>
              <Select value={electricitySource} onValueChange={setElectricitySource}>
                <SelectTrigger>
                  <SelectValue placeholder="Select electricity source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grid">Conventional Grid</SelectItem>
                  <SelectItem value="partial-renewable">Partial Renewable</SelectItem>
                  <SelectItem value="renewable">100% Renewable</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Home Size</Label>
              <RadioGroup value={homeSize} onValueChange={setHomeSize}>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="small" id="size-small" />
                    <Label htmlFor="size-small">Small (Apartment/Small House)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="size-medium" />
                    <Label htmlFor="size-medium">Medium (Average House)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="large" id="size-large" />
                    <Label htmlFor="size-large">Large (Large House)</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Energy Efficiency</Label>
              <RadioGroup value={energyEfficiency} onValueChange={setEnergyEfficiency}>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="home-efficiency-high" />
                    <Label htmlFor="home-efficiency-high">High (Well-insulated, efficient appliances)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="average" id="home-efficiency-average" />
                    <Label htmlFor="home-efficiency-average">Average</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="home-efficiency-low" />
                    <Label htmlFor="home-efficiency-low">Low (Poor insulation, older appliances)</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="diet" className="p-4 border rounded-md mt-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Diet Type</Label>
              <RadioGroup value={dietType} onValueChange={setDietType}>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="vegan" id="diet-vegan" />
                    <Label htmlFor="diet-vegan">Vegan (No animal products)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="vegetarian" id="diet-vegetarian" />
                    <Label htmlFor="diet-vegetarian">Vegetarian (No meat, includes dairy/eggs)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pescatarian" id="diet-pescatarian" />
                    <Label htmlFor="diet-pescatarian">Pescatarian (Vegetarian plus fish)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="omnivore" id="diet-omnivore" />
                    <Label htmlFor="diet-omnivore">Omnivore (Moderate meat consumption)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high-meat" id="diet-high-meat" />
                    <Label htmlFor="diet-high-meat">High Meat (Daily meat consumption)</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Food Waste</Label>
              <RadioGroup value={foodWaste} onValueChange={setFoodWaste}>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="waste-low" />
                    <Label htmlFor="waste-low">Low (Minimal food waste)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="waste-medium" />
                    <Label htmlFor="waste-medium">Medium (Average food waste)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="waste-high" />
                    <Label htmlFor="waste-high">High (Significant food waste)</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Local Food Consumption</Label>
              <RadioGroup value={localFood} onValueChange={setLocalFood}>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mostly" id="local-mostly" />
                    <Label htmlFor="local-mostly">Mostly (Primarily local/seasonal food)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="some" id="local-some" />
                    <Label htmlFor="local-some">Some (Mix of local and imported food)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rarely" id="local-rarely" />
                    <Label htmlFor="local-rarely">Rarely (Mostly imported food)</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="consumption" className="p-4 border rounded-md mt-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Shopping Habits</Label>
              <RadioGroup value={shoppingHabits} onValueChange={setShoppingHabits}>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="minimal" id="shopping-minimal" />
                    <Label htmlFor="shopping-minimal">Minimal (Buy only necessities)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="average" id="shopping-average" />
                    <Label htmlFor="shopping-average">Average</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="frequent" id="shopping-frequent" />
                    <Label htmlFor="shopping-frequent">Frequent (Regular new purchases)</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Goods Lifespan</Label>
              <RadioGroup value={goodsLifespan} onValueChange={setGoodsLifespan}>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="long" id="lifespan-long" />
                    <Label htmlFor="lifespan-long">Long (Keep and repair items)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="average" id="lifespan-average" />
                    <Label htmlFor="lifespan-average">Average</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="short" id="lifespan-short" />
                    <Label htmlFor="lifespan-short">Short (Frequently replace items)</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="waste" className="p-4 border rounded-md mt-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Recycling Habits</Label>
              <RadioGroup value={recyclingHabits} onValueChange={setRecyclingHabits}>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="recycling-all" />
                    <Label htmlFor="recycling-all">All (Recycle everything possible)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="most" id="recycling-most" />
                    <Label htmlFor="recycling-most">Most (Recycle most items)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="some" id="recycling-some" />
                    <Label htmlFor="recycling-some">Some (Occasionally recycle)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="recycling-none" />
                    <Label htmlFor="recycling-none">None (Don't recycle)</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Composting Habits</Label>
              <RadioGroup value={compostingHabits} onValueChange={setCompostingHabits}>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="composting-all" />
                    <Label htmlFor="composting-all">All (Compost all organic waste)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="some" id="composting-some" />
                    <Label htmlFor="composting-some">Some (Occasionally compost)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="composting-none" />
                    <Label htmlFor="composting-none">None (Don't compost)</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
