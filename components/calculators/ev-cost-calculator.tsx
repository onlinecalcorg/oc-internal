"use client"

import { useState } from "react"
import { Car, Zap, Fuel, BarChart4 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

export default function EVCostCalculator() {
  // EV details
  const [evPrice, setEvPrice] = useState(45000)
  const [evRange, setEvRange] = useState(300)
  const [evEfficiency, setEvEfficiency] = useState(3.5) // miles per kWh
  const [evIncentives, setEvIncentives] = useState(7500)

  // Gas car details
  const [gasPrice, setGasPrice] = useState(30000)
  const [gasMileage, setGasMileage] = useState(30) // mpg

  // Usage details
  const [annualMiles, setAnnualMiles] = useState(12000)
  const [ownershipYears, setOwnershipYears] = useState(7)
  const [electricityRate, setElectricityRate] = useState(0.15) // $ per kWh
  const [gasRate, setGasRate] = useState(3.5) // $ per gallon
  const [includeCharger, setIncludeCharger] = useState(true)
  const [chargerCost, setChargerCost] = useState(1000)

  // Maintenance details
  const [evMaintenance, setEvMaintenance] = useState(0.03) // $ per mile
  const [gasMaintenance, setGasMaintenance] = useState(0.06) // $ per mile
  const [includeBatteryReplacement, setIncludeBatteryReplacement] = useState(false)
  const [batteryReplacementCost, setBatteryReplacementCost] = useState(10000)

  // Calculate costs
  const calculateCosts = () => {
    // Initial costs
    const evInitialCost = evPrice - evIncentives + (includeCharger ? chargerCost : 0)
    const gasInitialCost = gasPrice

    // Fuel costs over ownership period
    const totalMiles = annualMiles * ownershipYears
    const evFuelCost = (totalMiles / evEfficiency) * electricityRate
    const gasFuelCost = (totalMiles / gasMileage) * gasRate

    // Maintenance costs
    let evMaintenanceCost = totalMiles * evMaintenance
    if (includeBatteryReplacement && ownershipYears > 8) {
      evMaintenanceCost += batteryReplacementCost
    }
    const gasMaintenanceCost = totalMiles * gasMaintenance

    // Resale value (simplified)
    const evResaleValue = evPrice * Math.pow(0.85, ownershipYears) // 15% depreciation per year
    const gasResaleValue = gasPrice * Math.pow(0.82, ownershipYears) // 18% depreciation per year

    // Total cost of ownership
    const evTotalCost = evInitialCost + evFuelCost + evMaintenanceCost - evResaleValue
    const gasTotalCost = gasInitialCost + gasFuelCost + gasMaintenanceCost - gasResaleValue

    // Cost breakdown
    return {
      ev: {
        initial: evInitialCost,
        fuel: evFuelCost,
        maintenance: evMaintenanceCost,
        resale: evResaleValue,
        total: evTotalCost,
        perMile: evTotalCost / totalMiles,
      },
      gas: {
        initial: gasInitialCost,
        fuel: gasFuelCost,
        maintenance: gasMaintenanceCost,
        resale: gasResaleValue,
        total: gasTotalCost,
        perMile: gasTotalCost / totalMiles,
      },
      savings: gasTotalCost - evTotalCost,
      breakEvenYears: calculateBreakEvenPoint(
        evInitialCost,
        gasInitialCost,
        evFuelCost / ownershipYears,
        gasFuelCost / ownershipYears,
        evMaintenanceCost / ownershipYears,
        gasMaintenanceCost / ownershipYears,
      ),
    }
  }

  // Calculate break-even point in years
  const calculateBreakEvenPoint = (
    evInitial: number,
    gasInitial: number,
    evAnnualFuel: number,
    gasAnnualFuel: number,
    evAnnualMaintenance: number,
    gasAnnualMaintenance: number,
  ) => {
    const initialDifference = evInitial - gasInitial
    const annualSavings = gasAnnualFuel + gasAnnualMaintenance - (evAnnualFuel + evAnnualMaintenance)

    if (annualSavings <= 0) {
      return Number.POSITIVE_INFINITY // EV never breaks even
    }

    return initialDifference / annualSavings
  }

  const costs = calculateCosts()

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Cost Comparison</CardTitle>
            <CardDescription>Total cost of ownership over {ownershipYears} years</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Electric Vehicle</span>
                <span className="text-2xl font-bold">${Math.round(costs.ev.total).toLocaleString()}</span>
                <span className="text-xs text-muted-foreground">${costs.ev.perMile.toFixed(2)}/mile</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm text-muted-foreground">Gas Vehicle</span>
                <span className="text-2xl font-bold">${Math.round(costs.gas.total).toLocaleString()}</span>
                <span className="text-xs text-muted-foreground">${costs.gas.perMile.toFixed(2)}/mile</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Savings with EV:</span>
                <span className={`font-bold ${costs.savings > 0 ? "text-green-500" : "text-red-500"}`}>
                  {costs.savings > 0 ? "+" : ""}
                  {Math.round(costs.savings).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="font-medium">Break-even point:</span>
                <span className="font-medium">
                  {costs.breakEvenYears === Number.POSITIVE_INFINITY
                    ? "Never"
                    : costs.breakEvenYears <= 0
                      ? "Immediate"
                      : `${costs.breakEvenYears.toFixed(1)} years`}
                </span>
              </div>
            </div>

            <div className="pt-4">
              <div className="relative h-8 bg-muted rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-primary"
                  style={{ width: `${Math.min((costs.ev.total / (costs.ev.total + costs.gas.total)) * 100, 100)}%` }}
                />
                <div className="absolute top-0 left-0 h-full w-full flex">
                  <div className="flex-1 flex items-center justify-center text-xs font-medium">
                    <Car className="h-3 w-3 mr-1" /> EV
                  </div>
                  <div className="flex-1 flex items-center justify-center text-xs font-medium">
                    <Fuel className="h-3 w-3 mr-1" /> Gas
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cost Breakdown</CardTitle>
            <CardDescription>See where your money goes</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="ev">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ev">Electric Vehicle</TabsTrigger>
                <TabsTrigger value="gas">Gas Vehicle</TabsTrigger>
              </TabsList>

              <TabsContent value="ev" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Initial Cost (after incentives)</span>
                    <span className="font-medium">${Math.round(costs.ev.initial).toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${(costs.ev.initial / costs.ev.total) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Electricity Costs</span>
                    <span className="font-medium">${Math.round(costs.ev.fuel).toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${(costs.ev.fuel / costs.ev.total) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Maintenance</span>
                    <span className="font-medium">${Math.round(costs.ev.maintenance).toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-500"
                      style={{ width: `${(costs.ev.maintenance / costs.ev.total) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Resale Value (Subtracted)</span>
                    <span className="font-medium">-${Math.round(costs.ev.resale).toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500"
                      style={{ width: `${(costs.ev.resale / costs.ev.total) * 100}%` }}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="gas" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Initial Cost</span>
                    <span className="font-medium">${Math.round(costs.gas.initial).toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${(costs.gas.initial / costs.gas.total) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Fuel Costs</span>
                    <span className="font-medium">${Math.round(costs.gas.fuel).toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500"
                      style={{ width: `${(costs.gas.fuel / costs.gas.total) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Maintenance</span>
                    <span className="font-medium">${Math.round(costs.gas.maintenance).toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-500"
                      style={{ width: `${(costs.gas.maintenance / costs.gas.total) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Resale Value (Subtracted)</span>
                    <span className="font-medium">-${Math.round(costs.gas.resale).toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500"
                      style={{ width: `${(costs.gas.resale / costs.gas.total) * 100}%` }}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">
              <BarChart4 className="mr-2 h-4 w-4" /> View Detailed Report
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="vehicles" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="vehicles">Vehicle Details</TabsTrigger>
          <TabsTrigger value="usage">Usage & Costs</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="vehicles" className="p-4 border rounded-md mt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-semibold">Electric Vehicle</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ev-price">Purchase Price ($)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="ev-price"
                      value={[evPrice]}
                      min={20000}
                      max={80000}
                      step={1000}
                      onValueChange={(value) => setEvPrice(value[0])}
                      className="flex-1"
                    />
                    <span className="w-20 text-right">${evPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ev-range">Range (miles)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="ev-range"
                      value={[evRange]}
                      min={100}
                      max={500}
                      step={10}
                      onValueChange={(value) => setEvRange(value[0])}
                      className="flex-1"
                    />
                    <span className="w-20 text-right">{evRange} mi</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ev-efficiency">Efficiency (mi/kWh)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="ev-efficiency"
                      value={[evEfficiency]}
                      min={2}
                      max={5}
                      step={0.1}
                      onValueChange={(value) => setEvEfficiency(value[0])}
                      className="flex-1"
                    />
                    <span className="w-20 text-right">{evEfficiency.toFixed(1)} mi/kWh</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ev-incentives">Tax Incentives ($)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="ev-incentives"
                      value={[evIncentives]}
                      min={0}
                      max={10000}
                      step={500}
                      onValueChange={(value) => setEvIncentives(value[0])}
                      className="flex-1"
                    />
                    <span className="w-20 text-right">${evIncentives.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Fuel className="h-5 w-5 text-orange-500" />
                <h3 className="text-lg font-semibold">Gas Vehicle</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="gas-price">Purchase Price ($)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="gas-price"
                      value={[gasPrice]}
                      min={15000}
                      max={60000}
                      step={1000}
                      onValueChange={(value) => setGasPrice(value[0])}
                      className="flex-1"
                    />
                    <span className="w-20 text-right">${gasPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gas-mileage">Fuel Economy (mpg)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="gas-mileage"
                      value={[gasMileage]}
                      min={15}
                      max={50}
                      step={1}
                      onValueChange={(value) => setGasMileage(value[0])}
                      className="flex-1"
                    />
                    <span className="w-20 text-right">{gasMileage} mpg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="usage" className="p-4 border rounded-md mt-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="annual-miles">Annual Mileage</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="annual-miles"
                  value={[annualMiles]}
                  min={5000}
                  max={25000}
                  step={1000}
                  onValueChange={(value) => setAnnualMiles(value[0])}
                  className="flex-1"
                />
                <span className="w-24 text-right">{annualMiles.toLocaleString()} mi/year</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownership-years">Ownership Period</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="ownership-years"
                  value={[ownershipYears]}
                  min={3}
                  max={15}
                  step={1}
                  onValueChange={(value) => setOwnershipYears(value[0])}
                  className="flex-1"
                />
                <span className="w-24 text-right">{ownershipYears} years</span>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="electricity-rate">Electricity Rate ($/kWh)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="electricity-rate"
                    value={[electricityRate]}
                    min={0.08}
                    max={0.4}
                    step={0.01}
                    onValueChange={(value) => setElectricityRate(value[0])}
                    className="flex-1"
                  />
                  <span className="w-16 text-right">${electricityRate.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gas-rate">Gas Price ($/gallon)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="gas-rate"
                    value={[gasRate]}
                    min={2.5}
                    max={6.0}
                    step={0.1}
                    onValueChange={(value) => setGasRate(value[0])}
                    className="flex-1"
                  />
                  <span className="w-16 text-right">${gasRate.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="include-charger">Include Home Charger Cost</Label>
                <Switch id="include-charger" checked={includeCharger} onCheckedChange={setIncludeCharger} />
              </div>

              {includeCharger && (
                <div className="pt-2">
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[chargerCost]}
                      min={300}
                      max={2000}
                      step={100}
                      onValueChange={(value) => setChargerCost(value[0])}
                      className="flex-1"
                    />
                    <span className="w-16 text-right">${chargerCost}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="p-4 border rounded-md mt-4">
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ev-maintenance">EV Maintenance ($/mile)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="ev-maintenance"
                    value={[evMaintenance]}
                    min={0.01}
                    max={0.1}
                    step={0.01}
                    onValueChange={(value) => setEvMaintenance(value[0])}
                    className="flex-1"
                  />
                  <span className="w-16 text-right">${evMaintenance.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gas-maintenance">Gas Maintenance ($/mile)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="gas-maintenance"
                    value={[gasMaintenance]}
                    min={0.03}
                    max={0.15}
                    step={0.01}
                    onValueChange={(value) => setGasMaintenance(value[0])}
                    className="flex-1"
                  />
                  <span className="w-16 text-right">${gasMaintenance.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="include-battery">Include Battery Replacement</Label>
                <Switch
                  id="include-battery"
                  checked={includeBatteryReplacement}
                  onCheckedChange={setIncludeBatteryReplacement}
                />
              </div>

              {includeBatteryReplacement && (
                <div className="pt-2">
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[batteryReplacementCost]}
                      min={5000}
                      max={20000}
                      step={1000}
                      onValueChange={(value) => setBatteryReplacementCost(value[0])}
                      className="flex-1"
                    />
                    <span className="w-20 text-right">${batteryReplacementCost.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Battery replacement will be included in the calculation if your ownership period exceeds 8 years.
                  </p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
