"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

type Gender = "male" | "female"
type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very-active"
type Goal = "maintain" | "lose" | "gain"

interface NutritionResult {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export function NutritionCalculator() {
  const [age, setAge] = useState<string>("")
  const [gender, setGender] = useState<Gender>("male")
  const [heightCm, setHeightCm] = useState<string>("")
  const [weightKg, setWeightKg] = useState<string>("")
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate")
  const [goal, setGoal] = useState<Goal>("maintain")
  const [result, setResult] = useState<NutritionResult | null>(null)

  const activityMultipliers = {
    sedentary: 1.2, // Little or no exercise
    light: 1.375, // Light exercise 1-3 days/week
    moderate: 1.55, // Moderate exercise 3-5 days/week
    active: 1.725, // Hard exercise 6-7 days/week
    "very-active": 1.9, // Very hard exercise & physical job or 2x training
  }

  const goalMultipliers = {
    maintain: 1,
    lose: 0.8, // 20% calorie deficit
    gain: 1.15, // 15% calorie surplus
  }

  const calculateNutrition = () => {
    const ageNum = Number.parseInt(age)
    const heightNum = Number.parseInt(heightCm)
    const weightNum = Number.parseInt(weightKg)

    if (isNaN(ageNum) || isNaN(heightNum) || isNaN(weightNum)) {
      return
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr
    if (gender === "male") {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161
    }

    // Calculate TDEE (Total Daily Energy Expenditure)
    const tdee = bmr * activityMultipliers[activityLevel]

    // Adjust calories based on goal
    const calories = Math.round(tdee * goalMultipliers[goal])

    // Calculate macronutrients
    // Protein: 1.6g per kg for weight loss, 2g per kg for muscle gain, 1.2g for maintenance
    let proteinMultiplier = 1.2
    if (goal === "lose") proteinMultiplier = 1.6
    if (goal === "gain") proteinMultiplier = 2.0

    const protein = Math.round(weightNum * proteinMultiplier)

    // Fat: 25% of calories
    const fat = Math.round((calories * 0.25) / 9)

    // Carbs: remaining calories
    const carbs = Math.round((calories - protein * 4 - fat * 9) / 4)

    setResult({
      calories,
      protein,
      carbs,
      fat,
    })
  }

  const handleReset = () => {
    setAge("")
    setGender("male")
    setHeightCm("")
    setWeightKg("")
    setActivityLevel("moderate")
    setGoal("maintain")
    setResult(null)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Nutrition Calculator</CardTitle>
        <CardDescription>
          Calculate your daily calorie and macronutrient needs based on your personal metrics and goals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="info">Information</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Years"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min="15"
                  max="100"
                />
              </div>

              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup value={gender} onValueChange={(value) => setGender(value as Gender)} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="e.g., 175"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  min="100"
                  max="250"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="e.g., 70"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  min="30"
                  max="300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="activity">Activity Level</Label>
                <Select value={activityLevel} onValueChange={(value) => setActivityLevel(value as ActivityLevel)}>
                  <SelectTrigger id="activity">
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                    <SelectItem value="light">Lightly active (1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderately active (3-5 days/week)</SelectItem>
                    <SelectItem value="active">Very active (6-7 days/week)</SelectItem>
                    <SelectItem value="very-active">Extremely active (physical job/training)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal">Goal</Label>
                <Select value={goal} onValueChange={(value) => setGoal(value as Goal)}>
                  <SelectTrigger id="goal">
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maintain">Maintain weight</SelectItem>
                    <SelectItem value="lose">Lose weight</SelectItem>
                    <SelectItem value="gain">Gain muscle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-6">
              <Button onClick={calculateNutrition} className="flex-1">
                Calculate Nutrition Needs
              </Button>
              <Button variant="outline" onClick={handleReset}>
                Reset
              </Button>
            </div>

            {result && (
              <div className="mt-6 space-y-6">
                <div className="p-6 border rounded-lg bg-muted/50">
                  <h3 className="text-lg font-medium mb-4">Your Daily Nutrition Requirements</h3>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Calories</span>
                        <span className="font-bold">{result.calories} kcal</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">Protein</span>
                          <span>{result.protein}g</span>
                        </div>
                        <Progress
                          value={(result.protein * 4 * 100) / result.calories}
                          className="h-2 bg-blue-100"
                          indicatorClassName="bg-blue-500"
                        />
                        <div className="text-xs text-muted-foreground mt-1 text-right">
                          {Math.round((result.protein * 4 * 100) / result.calories)}% ({result.protein * 4} kcal)
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">Carbs</span>
                          <span>{result.carbs}g</span>
                        </div>
                        <Progress
                          value={(result.carbs * 4 * 100) / result.calories}
                          className="h-2 bg-green-100"
                          indicatorClassName="bg-green-500"
                        />
                        <div className="text-xs text-muted-foreground mt-1 text-right">
                          {Math.round((result.carbs * 4 * 100) / result.calories)}% ({result.carbs * 4} kcal)
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">Fat</span>
                          <span>{result.fat}g</span>
                        </div>
                        <Progress
                          value={(result.fat * 9 * 100) / result.calories}
                          className="h-2 bg-yellow-100"
                          indicatorClassName="bg-yellow-500"
                        />
                        <div className="text-xs text-muted-foreground mt-1 text-right">
                          {Math.round((result.fat * 9 * 100) / result.calories)}% ({result.fat * 9} kcal)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>
                    These calculations are estimates based on the Mifflin-St Jeor equation and standard macronutrient
                    distributions.
                  </p>
                  <p className="mt-2">
                    Individual needs may vary based on factors like medical conditions, specific training goals, and
                    metabolic differences.
                  </p>
                  <p className="mt-2">
                    Consult with a registered dietitian or healthcare provider for personalized nutrition advice.
                  </p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="info" className="space-y-4">
            <div className="prose max-w-none dark:prose-invert">
              <h3>Understanding Your Nutritional Needs</h3>
              <p>
                Proper nutrition is essential for overall health, performance, and achieving your fitness goals. This
                calculator provides estimates for:
              </p>

              <h4>Calories</h4>
              <p>
                Your total daily energy expenditure (TDEE) is calculated based on your basal metabolic rate (BMR) and
                activity level. This represents the calories you need to maintain your current weight.
              </p>

              <h4>Macronutrients</h4>
              <ul>
                <li>
                  <strong>Protein:</strong> Essential for muscle repair and growth. Recommendations range from 1.2g to
                  2.0g per kg of body weight depending on your goals.
                </li>
                <li>
                  <strong>Carbohydrates:</strong> Your body's primary energy source, especially important for
                  high-intensity activities.
                </li>
                <li>
                  <strong>Fat:</strong> Essential for hormone production, vitamin absorption, and overall health.
                  Typically 25-35% of total calories.
                </li>
              </ul>

              <h4>How We Calculate Your Needs</h4>
              <p>
                We use the Mifflin-St Jeor equation to estimate your BMR, which is then adjusted based on your activity
                level to determine your TDEE. Macronutrient recommendations are based on current nutritional science and
                adjusted for your specific goal.
              </p>

              <h4>Tips for Success</h4>
              <ul>
                <li>Focus on whole, nutrient-dense foods</li>
                <li>Stay hydrated by drinking plenty of water</li>
                <li>Adjust your intake based on results and how you feel</li>
                <li>Consider tracking your food intake for a few weeks to ensure you're meeting your targets</li>
                <li>Remember that consistency matters more than perfection</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
