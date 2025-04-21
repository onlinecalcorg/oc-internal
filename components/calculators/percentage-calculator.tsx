"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export function PercentageCalculator() {
  // Basic percentage calculation
  const [value, setValue] = useState<string>("")
  const [percentage, setPercentage] = useState<string>("")
  const [basicResult, setBasicResult] = useState<string>("")

  // Percentage of a value
  const [percentageOf, setPercentageOf] = useState<string>("")
  const [totalValue, setTotalValue] = useState<string>("")
  const [percentageOfResult, setPercentageOfResult] = useState<string>("")

  // Percentage change
  const [originalValue, setOriginalValue] = useState<string>("")
  const [newValue, setNewValue] = useState<string>("")
  const [percentageChangeResult, setPercentageChangeResult] = useState<string>("")

  // Tip calculator
  const [billAmount, setBillAmount] = useState<string>("")
  const [tipPercentage, setTipPercentage] = useState<string>("15")
  const [tipResult, setTipResult] = useState<{ tip: string; total: string }>({ tip: "", total: "" })

  // Calculate basic percentage
  const calculateBasicPercentage = () => {
    if (value && percentage) {
      const result = (Number.parseFloat(value) * Number.parseFloat(percentage)) / 100
      setBasicResult(result.toFixed(2))
    }
  }

  // Calculate percentage of a value
  const calculatePercentageOf = () => {
    if (percentageOf && totalValue) {
      const result = (Number.parseFloat(percentageOf) / Number.parseFloat(totalValue)) * 100
      setPercentageOfResult(result.toFixed(2))
    }
  }

  // Calculate percentage change
  const calculatePercentageChange = () => {
    if (originalValue && newValue) {
      const original = Number.parseFloat(originalValue)
      const current = Number.parseFloat(newValue)
      const change = ((current - original) / original) * 100
      setPercentageChangeResult(change.toFixed(2))
    }
  }

  // Calculate tip
  const calculateTip = () => {
    if (billAmount && tipPercentage) {
      const bill = Number.parseFloat(billAmount)
      const tipPercent = Number.parseFloat(tipPercentage)
      const tipAmount = (bill * tipPercent) / 100
      const totalAmount = bill + tipAmount
      setTipResult({
        tip: tipAmount.toFixed(2),
        total: totalAmount.toFixed(2),
      })
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Percentage Calculator</CardTitle>
        <CardDescription>Calculate percentages for various applications</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="of">% of Value</TabsTrigger>
            <TabsTrigger value="change">% Change</TabsTrigger>
            <TabsTrigger value="tip">Tip Calc</TabsTrigger>
          </TabsList>

          {/* Basic Percentage Calculation */}
          <TabsContent value="basic" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                type="number"
                placeholder="Enter a value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="percentage">Percentage (%)</Label>
              <Input
                id="percentage"
                type="number"
                placeholder="Enter percentage"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
              />
            </div>
            <Button onClick={calculateBasicPercentage} className="w-full">
              Calculate
            </Button>
            {basicResult && (
              <div className="mt-4 p-4 bg-muted rounded-md">
                <p className="font-medium">Result:</p>
                <p className="text-2xl font-bold">
                  {percentage}% of {value} = {basicResult}
                </p>
              </div>
            )}
            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                This calculator finds the percentage of a given value. For example, 15% of 200 is 30.
              </AlertDescription>
            </Alert>
          </TabsContent>

          {/* Percentage of a Value */}
          <TabsContent value="of" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="percentageOf">Part Value</Label>
              <Input
                id="percentageOf"
                type="number"
                placeholder="Enter part value"
                value={percentageOf}
                onChange={(e) => setPercentageOf(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalValue">Total Value</Label>
              <Input
                id="totalValue"
                type="number"
                placeholder="Enter total value"
                value={totalValue}
                onChange={(e) => setTotalValue(e.target.value)}
              />
            </div>
            <Button onClick={calculatePercentageOf} className="w-full">
              Calculate
            </Button>
            {percentageOfResult && (
              <div className="mt-4 p-4 bg-muted rounded-md">
                <p className="font-medium">Result:</p>
                <p className="text-2xl font-bold">
                  {percentageOf} is {percentageOfResult}% of {totalValue}
                </p>
              </div>
            )}
            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                This calculator finds what percentage one value is of another. For example, 30 is 15% of 200.
              </AlertDescription>
            </Alert>
          </TabsContent>

          {/* Percentage Change */}
          <TabsContent value="change" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="originalValue">Original Value</Label>
              <Input
                id="originalValue"
                type="number"
                placeholder="Enter original value"
                value={originalValue}
                onChange={(e) => setOriginalValue(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newValue">New Value</Label>
              <Input
                id="newValue"
                type="number"
                placeholder="Enter new value"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
              />
            </div>
            <Button onClick={calculatePercentageChange} className="w-full">
              Calculate
            </Button>
            {percentageChangeResult && (
              <div className="mt-4 p-4 bg-muted rounded-md">
                <p className="font-medium">Result:</p>
                <p className="text-2xl font-bold">Percentage Change: {percentageChangeResult}%</p>
                <p className="text-sm text-muted-foreground">
                  {Number.parseFloat(percentageChangeResult) > 0
                    ? "Increase"
                    : Number.parseFloat(percentageChangeResult) < 0
                      ? "Decrease"
                      : "No change"}
                </p>
              </div>
            )}
            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                This calculator finds the percentage increase or decrease from one value to another. For example, a
                change from 200 to 250 is a 25% increase.
              </AlertDescription>
            </Alert>
          </TabsContent>

          {/* Tip Calculator */}
          <TabsContent value="tip" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="billAmount">Bill Amount</Label>
              <Input
                id="billAmount"
                type="number"
                placeholder="Enter bill amount"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tipPercentage">Tip Percentage (%)</Label>
              <div className="flex space-x-2">
                <Button
                  variant={tipPercentage === "10" ? "default" : "outline"}
                  onClick={() => setTipPercentage("10")}
                  className="flex-1"
                >
                  10%
                </Button>
                <Button
                  variant={tipPercentage === "15" ? "default" : "outline"}
                  onClick={() => setTipPercentage("15")}
                  className="flex-1"
                >
                  15%
                </Button>
                <Button
                  variant={tipPercentage === "18" ? "default" : "outline"}
                  onClick={() => setTipPercentage("18")}
                  className="flex-1"
                >
                  18%
                </Button>
                <Button
                  variant={tipPercentage === "20" ? "default" : "outline"}
                  onClick={() => setTipPercentage("20")}
                  className="flex-1"
                >
                  20%
                </Button>
              </div>
              <Input
                id="tipPercentage"
                type="number"
                placeholder="Or enter custom percentage"
                value={tipPercentage}
                onChange={(e) => setTipPercentage(e.target.value)}
                className="mt-2"
              />
            </div>
            <Button onClick={calculateTip} className="w-full">
              Calculate
            </Button>
            {tipResult.tip && (
              <div className="mt-4 p-4 bg-muted rounded-md">
                <p className="font-medium">Result:</p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Tip Amount:</p>
                    <p className="text-xl font-bold">${tipResult.tip}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Bill:</p>
                    <p className="text-xl font-bold">${tipResult.total}</p>
                  </div>
                </div>
              </div>
            )}
            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                This calculator helps you determine the appropriate tip amount for a bill. Standard tip percentages
                range from 15-20%.
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
