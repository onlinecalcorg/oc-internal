"use client"

import type React from "react"

import { useState } from "react"
import {
  Calculator,
  DollarSign,
  PlaneTakeoff,
  Hotel,
  Utensils,
  Ticket,
  ShoppingBag,
  Shield,
  HelpCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ExpenseCategory {
  name: string
  icon: React.ReactNode
  value: number
  tooltip: string
}

export default function VacationCostCalculator() {
  const [numTravelers, setNumTravelers] = useState(2)
  const [numDays, setNumDays] = useState(7)
  const [expenses, setExpenses] = useState<ExpenseCategory[]>([
    {
      name: "Transportation",
      icon: <PlaneTakeoff className="h-4 w-4" />,
      value: 500,
      tooltip: "Includes airfare, train tickets, car rentals, or gas costs for road trips.",
    },
    {
      name: "Accommodation",
      icon: <Hotel className="h-4 w-4" />,
      value: 150,
      tooltip: "Daily cost for hotels, vacation rentals, hostels, or camping fees.",
    },
    {
      name: "Food & Dining",
      icon: <Utensils className="h-4 w-4" />,
      value: 60,
      tooltip: "Daily cost for restaurants, groceries, and other food-related expenses.",
    },
    {
      name: "Activities",
      icon: <Ticket className="h-4 w-4" />,
      value: 40,
      tooltip: "Daily cost for tours, attractions, events, and other entertainment.",
    },
    {
      name: "Shopping",
      icon: <ShoppingBag className="h-4 w-4" />,
      value: 30,
      tooltip: "Daily budget for gifts, souvenirs, and personal shopping.",
    },
    {
      name: "Travel Insurance",
      icon: <Shield className="h-4 w-4" />,
      value: 100,
      tooltip: "One-time cost for trip insurance covering cancellations, medical emergencies, and lost luggage.",
    },
    {
      name: "Miscellaneous",
      icon: <HelpCircle className="h-4 w-4" />,
      value: 20,
      tooltip: "Daily budget for local transportation, tips, fees, and other unexpected expenses.",
    },
  ])

  const handleExpenseChange = (index: number, value: number) => {
    const newExpenses = [...expenses]
    newExpenses[index].value = value
    setExpenses(newExpenses)
  }

  // Calculate total cost
  const calculateTotalCost = () => {
    let total = 0

    // One-time costs
    total += expenses[0].value // Transportation
    total += expenses[5].value // Travel Insurance

    // Daily costs
    total += expenses[1].value * numDays // Accommodation
    total += expenses[2].value * numDays * numTravelers // Food & Dining
    total += expenses[3].value * numDays * numTravelers // Activities
    total += expenses[4].value * numDays * numTravelers // Shopping
    total += expenses[6].value * numDays * numTravelers // Miscellaneous

    return total
  }

  const totalCost = calculateTotalCost()
  const costPerPerson = totalCost / numTravelers

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Trip Details</CardTitle>
            <CardDescription>Enter basic information about your trip</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="travelers">Number of Travelers</Label>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setNumTravelers(Math.max(1, numTravelers - 1))}
                  disabled={numTravelers <= 1}
                >
                  -
                </Button>
                <span className="w-8 text-center">{numTravelers}</span>
                <Button variant="outline" size="icon" onClick={() => setNumTravelers(numTravelers + 1)}>
                  +
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="days">Duration (Days)</Label>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setNumDays(Math.max(1, numDays - 1))}
                  disabled={numDays <= 1}
                >
                  -
                </Button>
                <span className="w-8 text-center">{numDays}</span>
                <Button variant="outline" size="icon" onClick={() => setNumDays(numDays + 1)}>
                  +
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cost Summary</CardTitle>
            <CardDescription>Estimated total cost for your trip</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Cost:</span>
              <span className="text-2xl font-bold">${totalCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Cost Per Person:</span>
              <span className="text-xl font-semibold">${costPerPerson.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Daily Cost:</span>
              <span className="text-xl font-semibold">${(totalCost / numDays).toLocaleString()}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">
              <Calculator className="mr-2 h-4 w-4" /> Recalculate
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="expenses" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="expenses">Expense Details</TabsTrigger>
          <TabsTrigger value="breakdown">Cost Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="expenses" className="p-4 border rounded-md mt-4">
          <div className="space-y-6">
            <TooltipProvider>
              {expenses.map((expense, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {expense.icon}
                      <Label htmlFor={`expense-${index}`}>{expense.name}</Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{expense.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id={`expense-${index}`}
                        type="number"
                        value={expense.value}
                        onChange={(e) => handleExpenseChange(index, Number.parseFloat(e.target.value) || 0)}
                        className="w-24"
                      />
                    </div>
                  </div>
                  <Slider
                    value={[expense.value]}
                    min={0}
                    max={index === 0 ? 2000 : 500} // Higher max for transportation
                    step={5}
                    onValueChange={(value) => handleExpenseChange(index, value[0])}
                  />
                  <div className="text-xs text-muted-foreground">
                    {index === 0 || index === 5
                      ? "One-time cost"
                      : `$${expense.value} per ${index === 1 ? "day" : "person per day"}`}
                  </div>
                </div>
              ))}
            </TooltipProvider>
          </div>
        </TabsContent>

        <TabsContent value="breakdown" className="p-4 border rounded-md mt-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Transportation (one-time)</span>
              <span>${expenses[0].value.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Accommodation ({numDays} days)</span>
              <span>${(expenses[1].value * numDays).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">
                Food & Dining ({numTravelers} people, {numDays} days)
              </span>
              <span>${(expenses[2].value * numDays * numTravelers).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">
                Activities ({numTravelers} people, {numDays} days)
              </span>
              <span>${(expenses[3].value * numDays * numTravelers).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">
                Shopping ({numTravelers} people, {numDays} days)
              </span>
              <span>${(expenses[4].value * numDays * numTravelers).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Travel Insurance (one-time)</span>
              <span>${expenses[5].value.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">
                Miscellaneous ({numTravelers} people, {numDays} days)
              </span>
              <span>${(expenses[6].value * numDays * numTravelers).toLocaleString()}</span>
            </div>
            <div className="pt-4 border-t flex justify-between items-center">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCost.toLocaleString()}</span>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
