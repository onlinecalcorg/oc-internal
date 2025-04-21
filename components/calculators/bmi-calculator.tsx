"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { LucideIcon } from "@/components/lucide-icon"

export function BMICalculator() {
  const [heightCm, setHeightCm] = useState<string>("")
  const [heightFt, setHeightFt] = useState<string>("")
  const [heightIn, setHeightIn] = useState<string>("")
  const [weightKg, setWeightKg] = useState<string>("")
  const [weightLbs, setWeightLbs] = useState<string>("")
  const [bmi, setBmi] = useState<number | null>(null)
  const [bmiCategory, setBmiCategory] = useState<string>("")
  const [bmiColor, setBmiColor] = useState<string>("")
  const [unit, setUnit] = useState<string>("metric")

  const calculateBMI = () => {
    let calculatedBmi: number | null = null

    if (unit === "metric" && heightCm && weightKg) {
      const height = Number.parseFloat(heightCm) / 100 // convert cm to meters
      const weight = Number.parseFloat(weightKg)

      if (height > 0 && weight > 0) {
        calculatedBmi = weight / (height * height)
      }
    } else if (unit === "imperial" && heightFt && weightLbs) {
      const inches = Number.parseFloat(heightFt) * 12 + (Number.parseFloat(heightIn) || 0)
      const pounds = Number.parseFloat(weightLbs)

      if (inches > 0 && pounds > 0) {
        calculatedBmi = (pounds * 703) / (inches * inches)
      }
    }

    setBmi(calculatedBmi)

    if (calculatedBmi !== null) {
      if (calculatedBmi < 18.5) {
        setBmiCategory("Underweight")
        setBmiColor("text-blue-500")
      } else if (calculatedBmi < 25) {
        setBmiCategory("Normal weight")
        setBmiColor("text-green-500")
      } else if (calculatedBmi < 30) {
        setBmiCategory("Overweight")
        setBmiColor("text-yellow-500")
      } else if (calculatedBmi < 35) {
        setBmiCategory("Obesity Class I")
        setBmiColor("text-orange-500")
      } else if (calculatedBmi < 40) {
        setBmiCategory("Obesity Class II")
        setBmiColor("text-red-400")
      } else {
        setBmiCategory("Obesity Class III")
        setBmiColor("text-red-600")
      }
    } else {
      setBmiCategory("")
      setBmiColor("")
    }
  }

  const handleReset = () => {
    setHeightCm("")
    setHeightFt("")
    setHeightIn("")
    setWeightKg("")
    setWeightLbs("")
    setBmi(null)
    setBmiCategory("")
    setBmiColor("")
  }

  useEffect(() => {
    // Recalculate when unit changes
    setBmi(null)
    setBmiCategory("")
    setBmiColor("")
  }, [unit])

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">BMI Calculator</CardTitle>
        <CardDescription>
          Calculate your Body Mass Index (BMI) to assess if your weight is healthy for your height
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="metric" value={unit} onValueChange={setUnit} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="metric">Metric (cm/kg)</TabsTrigger>
            <TabsTrigger value="imperial">Imperial (ft/lbs)</TabsTrigger>
          </TabsList>

          <TabsContent value="metric" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height-cm">Height (cm)</Label>
                <Input
                  id="height-cm"
                  type="number"
                  placeholder="e.g., 175"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  min="50"
                  max="250"
                  aria-describedby="height-cm-description"
                />
                <p id="height-cm-description" className="text-xs text-muted-foreground">
                  Enter your height in centimeters
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight-kg">Weight (kg)</Label>
                <Input
                  id="weight-kg"
                  type="number"
                  placeholder="e.g., 70"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  min="20"
                  max="300"
                  aria-describedby="weight-kg-description"
                />
                <p id="weight-kg-description" className="text-xs text-muted-foreground">
                  Enter your weight in kilograms
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="imperial" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height-ft">Height</Label>
                <div className="flex gap-2">
                  <div className="w-1/2">
                    <Input
                      id="height-ft"
                      type="number"
                      placeholder="Feet"
                      value={heightFt}
                      onChange={(e) => setHeightFt(e.target.value)}
                      min="1"
                      max="8"
                      aria-label="Height in feet"
                    />
                  </div>
                  <div className="w-1/2">
                    <Input
                      id="height-in"
                      type="number"
                      placeholder="Inches"
                      value={heightIn}
                      onChange={(e) => setHeightIn(e.target.value)}
                      min="0"
                      max="11"
                      aria-label="Height in inches"
                    />
                  </div>
                </div>
                <p id="height-imperial-description" className="text-xs text-muted-foreground">
                  Enter your height in feet and inches
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight-lbs">Weight (lbs)</Label>
                <Input
                  id="weight-lbs"
                  type="number"
                  placeholder="e.g., 154"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(e.target.value)}
                  min="40"
                  max="660"
                  aria-describedby="weight-lbs-description"
                />
                <p id="weight-lbs-description" className="text-xs text-muted-foreground">
                  Enter your weight in pounds
                </p>
              </div>
            </div>
          </TabsContent>

          <div className="flex flex-col sm:flex-row gap-2 mt-6">
            <Button onClick={calculateBMI} className="flex-1">
              Calculate BMI
            </Button>
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
          </div>

          {bmi !== null && (
            <div className="mt-6 space-y-4">
              <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-muted/50">
                <h3 className="text-lg font-medium">Your BMI Result</h3>
                <p className="text-4xl font-bold mt-2" aria-live="polite">
                  {bmi.toFixed(1)}
                </p>
                <p className={`text-lg font-semibold mt-1 ${bmiColor}`} aria-live="polite">
                  {bmiCategory}
                </p>
              </div>

              <Alert>
                <LucideIcon name="info" className="h-4 w-4" />
                <AlertTitle>BMI Categories</AlertTitle>
                <AlertDescription>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>
                      <span className="text-blue-500 font-medium">Underweight:</span> BMI less than 18.5
                    </li>
                    <li>
                      <span className="text-green-500 font-medium">Normal weight:</span> BMI 18.5 to 24.9
                    </li>
                    <li>
                      <span className="text-yellow-500 font-medium">Overweight:</span> BMI 25 to 29.9
                    </li>
                    <li>
                      <span className="text-orange-500 font-medium">Obesity Class I:</span> BMI 30 to 34.9
                    </li>
                    <li>
                      <span className="text-red-400 font-medium">Obesity Class II:</span> BMI 35 to 39.9
                    </li>
                    <li>
                      <span className="text-red-600 font-medium">Obesity Class III:</span> BMI 40 or higher
                    </li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div className="text-sm text-muted-foreground">
                <p>
                  BMI is a screening tool, not a diagnostic of body fatness or health. Factors like muscle mass, age,
                  sex, ethnicity, and body composition are not accounted for in BMI calculations.
                </p>
                <p className="mt-2">Consult with a healthcare provider for a complete health assessment.</p>
              </div>
            </div>
          )}
        </Tabs>
      </CardContent>
    </Card>
  )
}
