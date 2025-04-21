"use client"

import { useState } from "react"
import { Sun, Battery, DollarSign, BarChart, ExternalLink, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function SolarPanelCalculator() {
  // Home energy details
  const [monthlyElectricBill, setMonthlyElectricBill] = useState(150)
  const [electricityRate, setElectricityRate] = useState(0.15) // $ per kWh
  const [annualElectricityUsage, setAnnualElectricityUsage] = useState(12000) // kWh
  const [offsetPercentage, setOffsetPercentage] = useState(100) // % of electricity to offset with solar

  // Location and system details
  const [location, setLocation] = useState("average") // low, average, high solar potential
  const [roofAngle, setRoofAngle] = useState("optimal") // suboptimal, average, optimal
  const [systemSize, setSystemSize] = useState(0) // kW (calculated)
  const [costPerWatt, setCostPerWatt] = useState(3.0) // $ per watt

  // Financial details
  const [federalTaxCredit, setFederalTaxCredit] = useState(30) // % federal tax credit
  const [stateTaxCredit, setStateTaxCredit] = useState(0) // $ state tax credit
  const [utilityRebate, setUtilityRebate] = useState(0) // $ utility rebate
  const [loanTerm, setLoanTerm] = useState(15) // years
  const [loanRate, setLoanRate] = useState(5.5) // % loan interest rate
  const [includeLoan, setIncludeLoan] = useState(true)

  // System performance
  const [annualDegradation, setAnnualDegradation] = useState(0.5) // % annual system degradation
  const [electricityInflation, setElectricityInflation] = useState(3.5) // % annual electricity price inflation

  // Calculate system size based on electricity usage and location
  const calculateSystemSize = () => {
    // Average kWh per kW of solar in different solar potential regions
    const solarPotential = {
      low: 1100, // kWh per kW per year
      average: 1400,
      high: 1700,
    }

    // Adjustment factor for roof angle
    const angleAdjustment = {
      suboptimal: 0.8,
      average: 0.9,
      optimal: 1.0,
    }

    // Calculate system size needed
    const energyToOffset = annualElectricityUsage * (offsetPercentage / 100)
    const calculatedSize =
      energyToOffset /
      (solarPotential[location as keyof typeof solarPotential] *
        angleAdjustment[roofAngle as keyof typeof angleAdjustment])

    return Math.round(calculatedSize * 10) / 10 // Round to 1 decimal place
  }

  // Update system size when inputs change
  const updateSystemSize = () => {
    setSystemSize(calculateSystemSize())
  }

  // Calculate solar panel system costs and savings
  const calculateSolarSavings = () => {
    const size = calculateSystemSize()

    // Calculate system cost
    const grossCost = size * 1000 * costPerWatt
    const federalCredit = grossCost * (federalTaxCredit / 100)
    const totalIncentives = federalCredit + stateTaxCredit + utilityRebate
    const netCost = grossCost - totalIncentives

    // Calculate annual production and savings
    const solarPotential = {
      low: 1100, // kWh per kW per year
      average: 1400,
      high: 1700,
    }
    const angleAdjustment = {
      suboptimal: 0.8,
      average: 0.9,
      optimal: 1.0,
    }

    const firstYearProduction =
      size *
      solarPotential[location as keyof typeof solarPotential] *
      angleAdjustment[roofAngle as keyof typeof angleAdjustment]
    const firstYearSavings = firstYearProduction * electricityRate

    // Calculate lifetime savings (25 years)
    let lifetimeSavings = 0
    let currentProduction = firstYearProduction
    let currentElectricityRate = electricityRate

    for (let year = 1; year <= 25; year++) {
      const yearSavings = currentProduction * currentElectricityRate
      lifetimeSavings += yearSavings

      // Apply degradation and inflation for next year
      currentProduction *= 1 - annualDegradation / 100
      currentElectricityRate *= 1 + electricityInflation / 100
    }

    // Calculate loan payments if applicable
    let monthlyLoanPayment = 0
    let totalLoanPayments = 0

    if (includeLoan) {
      const monthlyRate = loanRate / 100 / 12
      const numberOfPayments = loanTerm * 12

      monthlyLoanPayment =
        (netCost * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

      totalLoanPayments = monthlyLoanPayment * numberOfPayments
    }

    // Calculate payback period
    let paybackPeriod = 0
    let cumulativeSavings = 0
    let currentProduction2 = firstYearProduction
    let currentElectricityRate2 = electricityRate

    while (cumulativeSavings < netCost && paybackPeriod < 25) {
      paybackPeriod++
      const yearSavings = currentProduction2 * currentElectricityRate2
      cumulativeSavings += yearSavings

      // Apply degradation and inflation for next year
      currentProduction2 *= 1 - annualDegradation / 100
      currentElectricityRate2 *= 1 + electricityInflation / 100
    }

    // Calculate ROI
    const roi = ((lifetimeSavings - netCost) / netCost) * 100

    return {
      systemSize: size,
      grossCost,
      federalCredit,
      totalIncentives,
      netCost,
      firstYearProduction,
      firstYearSavings,
      lifetimeSavings,
      monthlyLoanPayment,
      totalLoanPayments,
      paybackPeriod,
      roi,
    }
  }

  // Update system size when relevant inputs change
  useState(() => {
    updateSystemSize()
  })

  const solarSavings = calculateSolarSavings()

  // Generate yearly savings data for chart
  const generateYearlySavingsData = () => {
    const data = []
    let cumulativeSavings = 0
    let currentProduction = solarSavings.firstYearProduction
    let currentElectricityRate = electricityRate

    for (let year = 1; year <= 25; year++) {
      const yearSavings = currentProduction * currentElectricityRate
      cumulativeSavings += yearSavings

      data.push({
        year,
        yearSavings,
        cumulativeSavings,
        production: currentProduction,
      })

      // Apply degradation and inflation for next year
      currentProduction *= 1 - annualDegradation / 100
      currentElectricityRate *= 1 + electricityInflation / 100
    }

    return data
  }

  const yearlySavingsData = generateYearlySavingsData()

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="calculator-result-card">
          <CardHeader>
            <CardTitle className="text-trust-primary">Solar System Summary</CardTitle>
            <CardDescription>Based on your energy usage and location</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <span className="text-4xl font-bold text-trust-primary">{solarSavings.systemSize} kW</span>
              <p className="text-sm text-muted-foreground">Recommended system size</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Gross System Cost:</span>
                <span className="font-medium">${Math.round(solarSavings.grossCost).toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Federal Tax Credit:</span>
                <span className="font-medium text-trust-success">
                  -${Math.round(solarSavings.federalCredit).toLocaleString()}
                </span>
              </div>

              {stateTaxCredit > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-sm">State Incentives:</span>
                  <span className="font-medium text-trust-success">-${stateTaxCredit.toLocaleString()}</span>
                </div>
              )}

              {utilityRebate > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-sm">Utility Rebates:</span>
                  <span className="font-medium text-trust-success">-${utilityRebate.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-sm font-medium">Net System Cost:</span>
                <span className="font-medium">${Math.round(solarSavings.netCost).toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-sm">First Year Production:</span>
                <span className="font-medium">{Math.round(solarSavings.firstYearProduction).toLocaleString()} kWh</span>
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="text-sm">First Year Savings:</span>
                <span className="font-medium text-trust-success">
                  ${Math.round(solarSavings.firstYearSavings).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="text-sm">25-Year Savings:</span>
                <span className="font-medium text-trust-success">
                  ${Math.round(solarSavings.lifetimeSavings).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="text-sm">Payback Period:</span>
                <span className="font-medium">{solarSavings.paybackPeriod.toFixed(1)} years</span>
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="text-sm">Return on Investment:</span>
                <span className="font-medium text-trust-success">{Math.round(solarSavings.roi)}%</span>
              </div>
            </div>

            {includeLoan && (
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Monthly Loan Payment:</span>
                  <span className="font-medium">${Math.round(solarSavings.monthlyLoanPayment).toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm">Total Loan Payments:</span>
                  <span className="font-medium">${Math.round(solarSavings.totalLoanPayments).toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm">Net Lifetime Benefit:</span>
                  <span
                    className={`font-medium ${solarSavings.lifetimeSavings > solarSavings.totalLoanPayments ? "text-trust-success" : "text-destructive"}`}
                  >
                    ${Math.round(solarSavings.lifetimeSavings - solarSavings.totalLoanPayments).toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">
              <BarChart className="mr-2 h-4 w-4" /> View Detailed Report
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-trust-primary">Savings Over Time</CardTitle>
            <CardDescription>Cumulative savings over 25 years</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 relative">
              {/* Simplified chart visualization */}
              <div className="absolute inset-0 flex items-end">
                {yearlySavingsData
                  .filter((d, i) => i % 5 === 0 || i === yearlySavingsData.length - 1)
                  .map((data, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-4/5 bg-trust-primary"
                        style={{
                          height: `${(data.cumulativeSavings / yearlySavingsData[yearlySavingsData.length - 1].cumulativeSavings) * 100}%`,
                          minHeight: data.cumulativeSavings > 0 ? "4px" : "0",
                        }}
                      ></div>
                      <div className="text-xs mt-1">{data.year}</div>
                    </div>
                  ))}
              </div>

              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-muted-foreground">
                <div>
                  ${Math.round(yearlySavingsData[yearlySavingsData.length - 1].cumulativeSavings).toLocaleString()}
                </div>
                <div>
                  $
                  {Math.round(
                    yearlySavingsData[yearlySavingsData.length - 1].cumulativeSavings * 0.75,
                  ).toLocaleString()}
                </div>
                <div>
                  $
                  {Math.round(yearlySavingsData[yearlySavingsData.length - 1].cumulativeSavings * 0.5).toLocaleString()}
                </div>
                <div>
                  $
                  {Math.round(
                    yearlySavingsData[yearlySavingsData.length - 1].cumulativeSavings * 0.25,
                  ).toLocaleString()}
                </div>
                <div>$0</div>
              </div>

              {/* Payback period indicator */}
              <div
                className="absolute bottom-0 border-l border-dashed border-trust-success h-full"
                style={{
                  left: `${(solarSavings.paybackPeriod / 25) * 100}%`,
                  transform: "translateX(-50%)",
                }}
              >
                <div className="absolute -top-6 -translate-x-1/2 text-xs text-trust-success">Payback</div>
              </div>
            </div>

            <div className="flex justify-center mt-4 space-x-4 text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-trust-primary mr-1"></div>
                <span>Cumulative Savings</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 border border-dashed border-trust-success mr-1"></div>
                <span>Payback Point</span>
              </div>
            </div>

            <div className="mt-4 p-4 bg-trust-primary/5 rounded-lg">
              <h3 className="text-sm font-medium text-trust-primary mb-2">Environmental Impact</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">CO₂ Reduction</div>
                  <div className="font-medium">{Math.round(solarSavings.firstYearProduction * 0.7)} kg/year</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Equivalent Trees</div>
                  <div className="font-medium">
                    {Math.round((solarSavings.firstYearProduction * 0.7) / 20)} trees/year
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="energy" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="energy">Energy Usage</TabsTrigger>
          <TabsTrigger value="system">System Details</TabsTrigger>
          <TabsTrigger value="financial">Financial Options</TabsTrigger>
        </TabsList>

        <TabsContent value="energy" className="p-4 border rounded-md mt-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="monthly-bill">Average Monthly Electric Bill ($)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="monthly-bill"
                  value={[monthlyElectricBill]}
                  min={50}
                  max={500}
                  step={10}
                  onValueChange={(value) => {
                    setMonthlyElectricBill(value[0])
                    // Update annual usage based on bill and rate
                    setAnnualElectricityUsage(Math.round((value[0] / electricityRate) * 12))
                  }}
                  className="flex-1"
                />
                <span className="w-16 text-right">${monthlyElectricBill}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="electricity-rate">Electricity Rate ($/kWh)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="electricity-rate"
                  value={[electricityRate]}
                  min={0.08}
                  max={0.4}
                  step={0.01}
                  onValueChange={(value) => {
                    setElectricityRate(value[0])
                    // Update annual usage based on bill and new rate
                    setAnnualElectricityUsage(Math.round((monthlyElectricBill / value[0]) * 12))
                  }}
                  className="flex-1"
                />
                <span className="w-16 text-right">${electricityRate.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="annual-usage">Annual Electricity Usage (kWh)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="annual-usage"
                  value={[annualElectricityUsage]}
                  min={1000}
                  max={30000}
                  step={100}
                  onValueChange={(value) => {
                    setAnnualElectricityUsage(value[0])
                    updateSystemSize()
                  }}
                  className="flex-1"
                />
                <span className="w-24 text-right">{annualElectricityUsage.toLocaleString()} kWh</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="offset-percentage">Percentage to Offset with Solar (%)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="offset-percentage"
                  value={[offsetPercentage]}
                  min={50}
                  max={120}
                  step={5}
                  onValueChange={(value) => {
                    setOffsetPercentage(value[0])
                    updateSystemSize()
                  }}
                  className="flex-1"
                />
                <span className="w-16 text-right">{offsetPercentage}%</span>
              </div>
            </div>

            <div className="p-4 bg-trust-primary/5 rounded-lg mt-4">
              <h3 className="font-medium text-trust-primary mb-2">Energy Usage Insights</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span>Average Daily Usage:</span>
                  <span className="font-medium">{Math.round(annualElectricityUsage / 365)} kWh</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Monthly Usage:</span>
                  <span className="font-medium">{Math.round(annualElectricityUsage / 12)} kWh</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Compared to Average Home:</span>
                  <span className="font-medium">
                    {annualElectricityUsage < 10000
                      ? "Below Average"
                      : annualElectricityUsage < 14000
                        ? "Average"
                        : "Above Average"}
                  </span>
                </div>
              </div>
              <div className="mt-2 text-sm">
                <a
                  href="https://www.energy.gov/energysaver/articles/how-much-can-you-save-solar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="calculator-external-link"
                >
                  Learn about average energy usage <ExternalLink className="calculator-external-link-icon" />
                </a>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="system" className="p-4 border rounded-md mt-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="location">Solar Potential in Your Location</Label>
              <Select
                value={location}
                onValueChange={(value) => {
                  setLocation(value)
                  updateSystemSize()
                }}
              >
                <SelectTrigger id="location">
                  <SelectValue placeholder="Select solar potential" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (Northeast, Northwest)</SelectItem>
                  <SelectItem value="average">Average (Midwest, Mid-Atlantic)</SelectItem>
                  <SelectItem value="high">High (Southwest, Southeast)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="roof-angle">Roof Orientation and Angle</Label>
              <Select
                value={roofAngle}
                onValueChange={(value) => {
                  setRoofAngle(value)
                  updateSystemSize()
                }}
              >
                <SelectTrigger id="roof-angle">
                  <SelectValue placeholder="Select roof orientation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="suboptimal">Suboptimal (East/West facing, flat or steep)</SelectItem>
                  <SelectItem value="average">Average (Southeast/Southwest facing)</SelectItem>
                  <SelectItem value="optimal">Optimal (South facing, 30-40° tilt)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <TooltipProvider>
                <div className="flex items-center gap-2">
                  <Label htmlFor="cost-per-watt">Cost per Watt ($)</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DollarSign className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        The average cost of solar installation per watt. National average is $2.95-$3.25 per watt before
                        incentives.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
              <div className="flex items-center gap-4">
                <Slider
                  id="cost-per-watt"
                  value={[costPerWatt]}
                  min={2.5}
                  max={4.5}
                  step={0.05}
                  onValueChange={(value) => setCostPerWatt(value[0])}
                  className="flex-1"
                />
                <span className="w-16 text-right">${costPerWatt.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <TooltipProvider>
                <div className="flex items-center gap-2">
                  <Label htmlFor="annual-degradation">Annual Panel Degradation (%)</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Battery className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Solar panels degrade slightly each year. Most manufacturers guarantee at least 80% production
                        after 25 years, which equals about 0.5-0.8% degradation per year.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
              <div className="flex items-center gap-4">
                <Slider
                  id="annual-degradation"
                  value={[annualDegradation]}
                  min={0.2}
                  max={1.0}
                  step={0.1}
                  onValueChange={(value) => setAnnualDegradation(value[0])}
                  className="flex-1"
                />
                <span className="w-16 text-right">{annualDegradation}%</span>
              </div>
            </div>

            <div className="space-y-2">
              <TooltipProvider>
                <div className="flex items-center gap-2">
                  <Label htmlFor="electricity-inflation">Annual Electricity Price Increase (%)</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DollarSign className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        The average annual increase in electricity prices. Historically, electricity prices have
                        increased 2-4% per year in the US.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
              <div className="flex items-center gap-4">
                <Slider
                  id="electricity-inflation"
                  value={[electricityInflation]}
                  min={1}
                  max={6}
                  step={0.5}
                  onValueChange={(value) => setElectricityInflation(value[0])}
                  className="flex-1"
                />
                <span className="w-16 text-right">{electricityInflation}%</span>
              </div>
            </div>

            <div className="p-4 bg-trust-primary/5 rounded-lg mt-4">
              <h3 className="font-medium text-trust-primary mb-2">System Specifications</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Estimated Panels</div>
                  <div className="font-medium">{Math.ceil((solarSavings.systemSize * 1000) / 400)} panels</div>
                  <div className="text-xs text-muted-foreground">(400W panels)</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Roof Space Needed</div>
                  <div className="font-medium">{Math.round(solarSavings.systemSize * 100)} sq ft</div>
                  <div className="text-xs text-muted-foreground">(approx.)</div>
                </div>
                <div>
                  <div className="text-muted-foreground">System Warranty</div>
                  <div className="font-medium">25 years</div>
                  <div className="text-xs text-muted-foreground">(typical)</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Expected Lifespan</div>
                  <div className="font-medium">30+ years</div>
                  <div className="text-xs text-muted-foreground">(with degradation)</div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="p-4 border rounded-md mt-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="federal-tax-credit">Federal Tax Credit (%)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="federal-tax-credit"
                  value={[federalTaxCredit]}
                  min={0}
                  max={30}
                  step={1}
                  onValueChange={(value) => setFederalTaxCredit(value[0])}
                  className="flex-1"
                />
                <span className="w-16 text-right">{federalTaxCredit}%</span>
              </div>
              <p className="text-xs text-muted-foreground">
                The federal solar tax credit is currently 30% through 2032.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="state-tax-credit">State Tax Credit/Rebate ($)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="state-tax-credit"
                  value={[stateTaxCredit]}
                  min={0}
                  max={5000}
                  step={100}
                  onValueChange={(value) => setStateTaxCredit(value[0])}
                  className="flex-1"
                />
                <span className="w-16 text-right">${stateTaxCredit}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="utility-rebate">Utility Rebate ($)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="utility-rebate"
                  value={[utilityRebate]}
                  min={0}
                  max={2000}
                  step={100}
                  onValueChange={(value) => setUtilityRebate(value[0])}
                  className="flex-1"
                />
                <span className="w-16 text-right">${utilityRebate}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="include-loan">Include Solar Loan</Label>
                <Switch id="include-loan" checked={includeLoan} onCheckedChange={setIncludeLoan} />
              </div>

              {includeLoan && (
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="loan-term">Loan Term (Years)</Label>
                    <Select value={loanTerm.toString()} onValueChange={(value) => setLoanTerm(Number.parseInt(value))}>
                      <SelectTrigger id="loan-term">
                        <SelectValue placeholder="Select loan term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 years</SelectItem>
                        <SelectItem value="10">10 years</SelectItem>
                        <SelectItem value="15">15 years</SelectItem>
                        <SelectItem value="20">20 years</SelectItem>
                        <SelectItem value="25">25 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loan-rate">Loan Interest Rate (%)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        id="loan-rate"
                        value={[loanRate]}
                        min={3}
                        max={8}
                        step={0.25}
                        onValueChange={(value) => setLoanRate(value[0])}
                        className="flex-1"
                      />
                      <span className="w-16 text-right">{loanRate}%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-trust-primary/5 rounded-lg mt-4">
              <h3 className="font-medium text-trust-primary mb-2">Financial Benefits</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <DollarSign className="h-4 w-4 text-trust-primary mt-0.5" />
                  <span>Solar increases home value by approximately 4.1% according to Zillow research.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 text-trust-primary mt-0.5" />
                  <span>
                    Fixed energy costs protect against utility rate increases, which have averaged{" "}
                    {electricityInflation}% annually.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Sun className="h-4 w-4 text-trust-primary mt-0.5" />
                  <span>Many states offer net metering, allowing you to sell excess electricity back to the grid.</span>
                </li>
              </ul>
              <div className="mt-2 text-sm">
                <a
                  href="https://www.energy.gov/eere/solar/homeowners-guide-federal-tax-credit-solar-photovoltaics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="calculator-external-link"
                >
                  Learn about federal tax credits <ExternalLink className="calculator-external-link-icon" />
                </a>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
