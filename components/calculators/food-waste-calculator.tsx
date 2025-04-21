"use client"

import { useState } from "react"
import { Trash2, Leaf, DollarSign, Droplets, BarChart, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function FoodWasteCalculator() {
  // Household details
  const [householdSize, setHouseholdSize] = useState(3)
  const [foodBudget, setFoodBudget] = useState(800) // Monthly food budget
  const [wastePercentage, setWastePercentage] = useState(30) // % of food wasted

  // Food waste habits
  const [mealPlanning, setMealPlanning] = useState("sometimes") // never, sometimes, always
  const [leftoverUsage, setLeftoverUsage] = useState("sometimes") // never, sometimes, always
  const [groceryShopping, setGroceryShopping] = useState("weekly") // daily, weekly, biweekly
  const [storageKnowledge, setStorageKnowledge] = useState("moderate") // poor, moderate, good

  // Reduction goals
  const [reductionGoal, setReductionGoal] = useState(50) // % reduction goal
  const [implementationLevel, setImplementationLevel] = useState("moderate") // easy, moderate, comprehensive

  // Calculate waste impact
  const calculateWasteImpact = () => {
    // Average food waste per person in kg per year (EPA data)
    const avgWastePerPersonKg = 95

    // Current waste
    const currentWasteKg = (avgWastePerPersonKg * householdSize * wastePercentage) / 100

    // Financial impact
    const monthlyWaste = (foodBudget * wastePercentage) / 100
    const annualWaste = monthlyWaste * 12

    // Environmental impact
    // CO2 emissions: ~2.5 kg CO2 per kg of food waste
    const co2Emissions = currentWasteKg * 2.5

    // Water footprint: ~1,500 liters of water per kg of food waste
    const waterFootprint = currentWasteKg * 1500

    // Land use: ~0.5 m² per kg of food waste
    const landUse = currentWasteKg * 0.5

    // Calculate potential savings with reduction goal
    const potentialReduction = currentWasteKg * (reductionGoal / 100)
    const financialSavings = annualWaste * (reductionGoal / 100)
    const co2Savings = co2Emissions * (reductionGoal / 100)
    const waterSavings = waterFootprint * (reductionGoal / 100)

    // Adjust difficulty based on current habits
    let difficultyScore = 5 // Medium difficulty by default

    // Adjust based on meal planning
    if (mealPlanning === "never") difficultyScore += 2
    if (mealPlanning === "always") difficultyScore -= 2

    // Adjust based on leftover usage
    if (leftoverUsage === "never") difficultyScore += 2
    if (leftoverUsage === "always") difficultyScore -= 2

    // Adjust based on grocery shopping frequency
    if (groceryShopping === "daily") difficultyScore += 1
    if (groceryShopping === "biweekly") difficultyScore -= 1

    // Adjust based on storage knowledge
    if (storageKnowledge === "poor") difficultyScore += 2
    if (storageKnowledge === "good") difficultyScore -= 2

    // Cap difficulty between 1-10
    difficultyScore = Math.max(1, Math.min(10, difficultyScore))

    return {
      currentWasteKg,
      monthlyWaste,
      annualWaste,
      co2Emissions,
      waterFootprint,
      landUse,
      potentialReduction,
      financialSavings,
      co2Savings,
      waterSavings,
      difficultyScore,
    }
  }

  const impact = calculateWasteImpact()

  // Generate recommendations based on habits
  const generateRecommendations = () => {
    const recommendations = []

    // Meal planning recommendations
    if (mealPlanning === "never" || mealPlanning === "sometimes") {
      recommendations.push({
        title: "Create a Weekly Meal Plan",
        description: "Plan your meals for the week before shopping to buy only what you need.",
        impact: "high",
        category: "planning",
      })
    }

    // Leftover recommendations
    if (leftoverUsage === "never" || leftoverUsage === "sometimes") {
      recommendations.push({
        title: "Designate a 'Leftovers Night'",
        description: "Set aside one night a week to use up leftovers before they spoil.",
        impact: "medium",
        category: "consumption",
      })
    }

    // Shopping recommendations
    if (groceryShopping === "biweekly") {
      recommendations.push({
        title: "Shop More Frequently",
        description: "Consider shopping weekly instead of biweekly to reduce spoilage of fresh items.",
        impact: "medium",
        category: "shopping",
      })
    }

    // Storage recommendations
    if (storageKnowledge === "poor" || storageKnowledge === "moderate") {
      recommendations.push({
        title: "Learn Proper Food Storage",
        description: "Store fruits, vegetables, and other perishables properly to extend their life.",
        impact: "high",
        category: "storage",
      })
    }

    // General recommendations
    recommendations.push({
      title: "Use a 'First In, First Out' System",
      description: "Place newer items at the back of the fridge/pantry and older items at the front.",
      impact: "medium",
      category: "storage",
    })

    recommendations.push({
      title: "Understand Food Date Labels",
      description:
        "'Best by' and 'use by' dates are about quality, not safety. Many foods are still good after these dates.",
      impact: "medium",
      category: "knowledge",
    })

    recommendations.push({
      title: "Freeze Food Before It Spoils",
      description: "If you can't eat something before it goes bad, freeze it for later use.",
      impact: "high",
      category: "storage",
    })

    // Return top recommendations based on implementation level
    const numRecommendations = implementationLevel === "easy" ? 3 : implementationLevel === "moderate" ? 5 : 7
    return recommendations.slice(0, numRecommendations)
  }

  const recommendations = generateRecommendations()

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="calculator-result-card">
          <CardHeader>
            <CardTitle className="text-trust-primary">Food Waste Impact</CardTitle>
            <CardDescription>Environmental and financial impact of your food waste</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <span className="text-4xl font-bold text-trust-primary">{Math.round(impact.currentWasteKg)} kg</span>
              <p className="text-sm text-muted-foreground">Estimated annual food waste</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Monthly Financial Waste:</span>
                <span className="font-medium">${Math.round(impact.monthlyWaste)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Annual Financial Waste:</span>
                <span className="font-medium">${Math.round(impact.annualWaste)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">CO₂ Emissions:</span>
                <span className="font-medium">{Math.round(impact.co2Emissions)} kg CO₂</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Water Footprint:</span>
                <span className="font-medium">{Math.round(impact.waterFootprint / 1000)} m³ water</span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Reduction Goal:</span>
                <span className="font-medium">{reductionGoal}%</span>
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="text-sm">Potential Annual Savings:</span>
                <span className="font-medium text-trust-success">${Math.round(impact.financialSavings)}</span>
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="text-sm">CO₂ Reduction:</span>
                <span className="font-medium text-trust-success">{Math.round(impact.co2Savings)} kg CO₂</span>
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="text-sm">Water Saved:</span>
                <span className="font-medium text-trust-success">
                  {Math.round(impact.waterSavings / 1000)} m³ water
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">
              <BarChart className="mr-2 h-4 w-4" /> View Detailed Impact
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-trust-primary">Recommended Actions</CardTitle>
            <CardDescription>Personalized steps to reduce your food waste</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((recommendation, index) => (
                <div key={index} className="p-3 border rounded-md">
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className={`p-1 rounded-full ${
                        recommendation.impact === "high"
                          ? "bg-trust-success/20 text-trust-success"
                          : "bg-trust-primary/20 text-trust-primary"
                      }`}
                    >
                      {recommendation.category === "planning" && <BarChart className="h-4 w-4" />}
                      {recommendation.category === "consumption" && <Trash2 className="h-4 w-4" />}
                      {recommendation.category === "shopping" && <DollarSign className="h-4 w-4" />}
                      {recommendation.category === "storage" && <Leaf className="h-4 w-4" />}
                      {recommendation.category === "knowledge" && <Info className="h-4 w-4" />}
                    </div>
                    <h3 className="font-medium">{recommendation.title}</h3>
                    <div
                      className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                        recommendation.impact === "high"
                          ? "bg-trust-success/20 text-trust-success"
                          : "bg-trust-primary/20 text-trust-primary"
                      }`}
                    >
                      {recommendation.impact === "high" ? "High Impact" : "Medium Impact"}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                </div>
              ))}

              <div className="mt-4 p-4 bg-trust-primary/5 rounded-lg">
                <h3 className="text-sm font-medium text-trust-primary mb-2">Implementation Difficulty</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Easy</span>
                    <span>Challenging</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-trust-primary"
                      style={{ width: `${(impact.difficultyScore / 10) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Based on your current habits, reducing your food waste by {reductionGoal}% will be
                    {impact.difficultyScore <= 3
                      ? " relatively easy"
                      : impact.difficultyScore <= 6
                        ? " moderately challenging"
                        : " quite challenging but achievable"}
                    .
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="household" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="household">Household Details</TabsTrigger>
          <TabsTrigger value="habits">Current Habits</TabsTrigger>
          <TabsTrigger value="goals">Reduction Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="household" className="p-4 border rounded-md mt-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="household-size">Household Size</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="household-size"
                  value={[householdSize]}
                  min={1}
                  max={8}
                  step={1}
                  onValueChange={(value) => setHouseholdSize(value[0])}
                  className="flex-1"
                />
                <span className="w-16 text-right">
                  {householdSize} {householdSize === 1 ? "person" : "people"}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="food-budget">Monthly Food Budget ($)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="food-budget"
                  value={[foodBudget]}
                  min={200}
                  max={2000}
                  step={50}
                  onValueChange={(value) => setFoodBudget(value[0])}
                  className="flex-1"
                />
                <span className="w-20 text-right">${foodBudget}</span>
              </div>
              <p className="text-xs text-muted-foreground">This includes groceries, takeout, and restaurant meals.</p>
            </div>

            <div className="space-y-2">
              <TooltipProvider>
                <div className="flex items-center gap-2">
                  <Label htmlFor="waste-percentage">Estimated Food Waste (%)</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        The average household wastes 30-40% of their food. Consider all food that goes uneaten,
                        including spoiled food, leftovers, and plate waste.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
              <div className="flex items-center gap-4">
                <Slider
                  id="waste-percentage"
                  value={[wastePercentage]}
                  min={5}
                  max={60}
                  step={5}
                  onValueChange={(value) => setWastePercentage(value[0])}
                  className="flex-1"
                />
                <span className="w-16 text-right">{wastePercentage}%</span>
              </div>
            </div>

            <div className="p-4 bg-trust-primary/5 rounded-lg mt-4">
              <h3 className="font-medium text-trust-primary mb-2">Food Waste Facts</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Trash2 className="h-4 w-4 text-trust-primary mt-0.5" />
                  <span>
                    The average American family of four throws away approximately $1,600 worth of food each year.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Leaf className="h-4 w-4 text-trust-primary mt-0.5" />
                  <span>Food waste is responsible for 8% of global greenhouse gas emissions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Droplets className="h-4 w-4 text-trust-primary mt-0.5" />
                  <span>Producing food that goes uneaten uses 25% of all freshwater consumed in the U.S.</span>
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="habits" className="p-4 border rounded-md mt-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Do you plan meals before grocery shopping?</Label>
              <RadioGroup value={mealPlanning} onValueChange={setMealPlanning}>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="always" id="planning-always" />
                    <Label htmlFor="planning-always">Always (I have a detailed plan for the week)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sometimes" id="planning-sometimes" />
                    <Label htmlFor="planning-sometimes">Sometimes (I have a rough idea of what I'll cook)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="never" id="planning-never" />
                    <Label htmlFor="planning-never">Never (I shop without specific meals in mind)</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>How often do you use leftovers?</Label>
              <RadioGroup value={leftoverUsage} onValueChange={setLeftoverUsage}>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="always" id="leftovers-always" />
                    <Label htmlFor="leftovers-always">Always (I rarely throw away leftovers)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sometimes" id="leftovers-sometimes" />
                    <Label htmlFor="leftovers-sometimes">Sometimes (I use some leftovers, discard others)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="never" id="leftovers-never" />
                    <Label htmlFor="leftovers-never">Never (I often discard leftovers)</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>How often do you grocery shop?</Label>
              <Select value={groceryShopping} onValueChange={setGroceryShopping}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily or every few days</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Biweekly or less frequently</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>How would you rate your knowledge of proper food storage?</Label>
              <Select value={storageKnowledge} onValueChange={setStorageKnowledge}>
                <SelectTrigger>
                  <SelectValue placeholder="Select knowledge level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="good">Good (I know how to store different foods to maximize freshness)</SelectItem>
                  <SelectItem value="moderate">Moderate (I know some basics but could learn more)</SelectItem>
                  <SelectItem value="poor">Poor (I'm not sure how to properly store many foods)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="p-4 border rounded-md mt-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="reduction-goal">Food Waste Reduction Goal (%)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="reduction-goal"
                  value={[reductionGoal]}
                  min={10}
                  max={90}
                  step={10}
                  onValueChange={(value) => setReductionGoal(value[0])}
                  className="flex-1"
                />
                <span className="w-16 text-right">{reductionGoal}%</span>
              </div>
              <p className="text-xs text-muted-foreground">
                This is the percentage of your current food waste you aim to eliminate.
              </p>
            </div>

            <div className="space-y-2">
              <Label>Implementation Level</Label>
              <RadioGroup value={implementationLevel} onValueChange={setImplementationLevel}>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="easy" id="implementation-easy" />
                    <Label htmlFor="implementation-easy">Easy (I want to start with simple changes)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="implementation-moderate" />
                    <Label htmlFor="implementation-moderate">Moderate (I'm ready to make several changes)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="comprehensive" id="implementation-comprehensive" />
                    <Label htmlFor="implementation-comprehensive">Comprehensive (I want to transform my habits)</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="p-4 bg-trust-primary/5 rounded-lg mt-4">
              <h3 className="font-medium text-trust-primary mb-2">Setting Realistic Goals</h3>
              <p className="text-sm mb-4">
                Most households can reduce their food waste by 20-50% with simple changes to shopping, storage, and
                consumption habits. More significant reductions (50-80%) require more comprehensive changes.
              </p>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Easy Changes (20-30% reduction)</span>
                    <span className="text-trust-success">Achievable in 1-2 months</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Moderate Changes (30-50% reduction)</span>
                    <span className="text-trust-primary">Achievable in 2-4 months</span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Comprehensive Changes (50-80% reduction)</span>
                    <span className="text-trust-accent">Achievable in 4-6 months</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
