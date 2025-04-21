"use client"

import { useState, useEffect } from "react"
import { PiggyBank, DollarSign, TrendingUp, Calendar, BarChart } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ExternalLink } from "lucide-react"

export default function RetirementSavingsCalculator() {
  // Current situation
  const [currentAge, setCurrentAge] = useState(35)
  const [retirementAge, setRetirementAge] = useState(67)
  const [currentSavings, setCurrentSavings] = useState(30000)
  const [annualContribution, setAnnualContribution] = useState(7000) // 10% of $70,000

  // Investment assumptions
  const [returnRate, setReturnRate] = useState(6) // % annual return before retirement
  const [retirementReturnRate, setRetirementReturnRate] = useState(6) // % annual return during retirement
  const [inflationRate, setInflationRate] = useState(3) // % annual inflation

  // Retirement needs
  const [lifeExpectancy, setLifeExpectancy] = useState(85)
  const [currentIncome, setCurrentIncome] = useState(70000) // Current annual income
  const [incomePercentage, setIncomePercentage] = useState(75) // % of current income needed in retirement
  const [annualIncomeIncrease, setAnnualIncomeIncrease] = useState(3) // % annual increase in current income
  const [desiredIncome, setDesiredIncome] = useState(currentIncome * (incomePercentage / 100)) // Annual income needed in retirement

  // Tax assumptions
  const [currentTaxRate, setCurrentTaxRate] = useState(22) // % current income tax rate
  const [retirementTaxRate, setRetirementTaxRate] = useState(15) // % expected retirement tax rate

  // Additional states
  const [annualIncrease, setAnnualIncrease] = useState(2) // % annual increase in contributions
  const [includeSocialSecurity, setIncludeSocialSecurity] = useState(true)
  const [socialSecurityIncome, setSocialSecurityIncome] = useState(20000)

  // Update desired income when current income or percentage changes
  useEffect(() => {
    setDesiredIncome(currentIncome * (incomePercentage / 100))
  }, [currentIncome, incomePercentage])

  // Calculate retirement savings
  const calculateRetirementSavings = () => {
    const yearsToRetirement = retirementAge - currentAge
    const yearsInRetirement = lifeExpectancy - retirementAge

    // Calculate future value of current savings
    const futureValueCurrentSavings = currentSavings * Math.pow(1 + returnRate / 100, yearsToRetirement)

    // Calculate future value of contributions with annual increases
    let futureValueContributions = 0
    let yearlyContribution = annualContribution

    for (let i = 0; i < yearsToRetirement; i++) {
      futureValueContributions += yearlyContribution * Math.pow(1 + returnRate / 100, yearsToRetirement - i)
      yearlyContribution *= 1 + annualIncrease / 100
    }

    // Total retirement savings at retirement age
    const totalRetirementSavings = futureValueCurrentSavings + futureValueContributions

    // Calculate future income at retirement (with annual increases)
    const futureIncome = currentIncome * Math.pow(1 + annualIncomeIncrease / 100, yearsToRetirement)

    // Calculate retirement income needed based on percentage of future income
    const retirementIncomeNeeded = futureIncome * (incomePercentage / 100)

    // Adjust for inflation to get today's equivalent
    const inflationAdjustedIncome = retirementIncomeNeeded

    // Subtract social security if included
    let annualIncomeNeeded = inflationAdjustedIncome
    if (includeSocialSecurity) {
      const inflationAdjustedSS = socialSecurityIncome * Math.pow(1 + inflationRate / 100, yearsToRetirement)
      annualIncomeNeeded -= inflationAdjustedSS
    }

    // Calculate how long savings will last
    let savingsRemaining = totalRetirementSavings
    let yearsLasting = 0

    while (savingsRemaining > 0 && yearsLasting < 50) {
      // Cap at 50 years to prevent infinite loop
      savingsRemaining = (savingsRemaining - annualIncomeNeeded) * (1 + retirementReturnRate / 100)
      yearsLasting++
    }

    // Calculate required savings to meet retirement goals
    const withdrawalRate = 4 // 4% safe withdrawal rate
    const requiredSavings = annualIncomeNeeded / (withdrawalRate / 100)

    // Calculate monthly contribution needed to reach goal
    const monthlyContributionNeeded = calculateRequiredMonthlyContribution(
      currentSavings,
      requiredSavings,
      yearsToRetirement,
      returnRate,
    )

    // Calculate savings gap
    const savingsGap = requiredSavings - totalRetirementSavings

    return {
      totalRetirementSavings,
      inflationAdjustedIncome,
      annualIncomeNeeded,
      yearsLasting,
      requiredSavings,
      savingsGap,
      monthlyContributionNeeded,
      yearsToRetirement,
      yearsInRetirement,
    }
  }

  // Calculate required monthly contribution to reach goal
  const calculateRequiredMonthlyContribution = (current, target, years, rate) => {
    const monthlyRate = rate / 100 / 12
    const months = years * 12
    const futureValueOfCurrent = current * Math.pow(1 + monthlyRate, months)

    if (futureValueOfCurrent >= target) {
      return 0
    }

    const pmt = (target - futureValueOfCurrent) * (monthlyRate / (Math.pow(1 + monthlyRate, months) - 1))

    return pmt
  }

  const results = calculateRetirementSavings()

  // Generate retirement savings chart data
  const generateChartData = () => {
    const data = []
    let savings = currentSavings
    let yearlyContribution = annualContribution

    // Pre-retirement phase
    for (let age = currentAge; age <= retirementAge; age++) {
      const yearReturn = savings * (returnRate / 100)
      savings += yearReturn + yearlyContribution
      yearlyContribution *= 1 + annualIncrease / 100

      data.push({
        age,
        savings: Math.round(savings),
        phase: "accumulation",
      })
    }

    // Retirement phase
    let retirementSavings = savings
    const inflationAdjustedIncome = desiredIncome * Math.pow(1 + inflationRate / 100, retirementAge - currentAge)
    let annualIncomeNeeded = inflationAdjustedIncome

    if (includeSocialSecurity) {
      const inflationAdjustedSS = socialSecurityIncome * Math.pow(1 + inflationRate / 100, retirementAge - currentAge)
      annualIncomeNeeded -= inflationAdjustedSS
    }

    for (let age = retirementAge + 1; age <= lifeExpectancy; age++) {
      retirementSavings = (retirementSavings - annualIncomeNeeded) * (1 + retirementReturnRate / 100)

      if (retirementSavings < 0) {
        retirementSavings = 0
      }

      data.push({
        age,
        savings: Math.round(retirementSavings),
        phase: "distribution",
      })

      if (retirementSavings <= 0) {
        break
      }
    }

    return data
  }

  const chartData = generateChartData()

  // Find the maximum savings value for chart scaling
  const maxSavings = Math.max(...chartData.map((d) => d.savings))

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="calculator-result-card">
          <CardHeader>
            <CardTitle className="text-trust-primary">Retirement Projection</CardTitle>
            <CardDescription>Based on your current savings and contributions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <span className="text-4xl font-bold text-trust-primary">
                ${Math.round(results.totalRetirementSavings).toLocaleString()}
              </span>
              <p className="text-sm text-muted-foreground">Projected savings at retirement</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Retirement Income Needed:</span>
                <span className="font-medium">
                  ${Math.round(results.inflationAdjustedIncome).toLocaleString()}/year
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">After Social Security:</span>
                <span className="font-medium">${Math.round(results.annualIncomeNeeded).toLocaleString()}/year</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Savings Will Last:</span>
                <span
                  className={`font-medium ${results.yearsLasting >= results.yearsInRetirement ? "text-trust-success" : "text-destructive"}`}
                >
                  {results.yearsLasting >= 50 ? "Indefinitely" : `${results.yearsLasting} years`}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Required Savings:</span>
                <span className="font-medium">${Math.round(results.requiredSavings).toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Savings Gap:</span>
                <span className={`font-medium ${results.savingsGap <= 0 ? "text-trust-success" : "text-destructive"}`}>
                  {results.savingsGap <= 0 ? "No Gap" : `$${Math.round(results.savingsGap).toLocaleString()}`}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Monthly Contribution Needed:</span>
                <span
                  className={`font-medium ${results.monthlyContributionNeeded <= annualContribution / 12 ? "text-trust-success" : "text-destructive"}`}
                >
                  ${Math.round(results.monthlyContributionNeeded).toLocaleString()}/month
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">
              <BarChart className="mr-2 h-4 w-4" /> View Detailed Report
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-trust-primary">Retirement Timeline</CardTitle>
            <CardDescription>Projected savings over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 relative">
              {/* Simplified chart visualization */}
              <div className="absolute inset-0 flex items-end">
                {chartData
                  .filter((d, i) => i % 5 === 0 || i === chartData.length - 1)
                  .map((data, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div
                        className={`w-4/5 ${data.phase === "accumulation" ? "bg-trust-primary" : "bg-trust-accent"}`}
                        style={{
                          height: `${(data.savings / maxSavings) * 100}%`,
                          minHeight: data.savings > 0 ? "4px" : "0",
                        }}
                      ></div>
                      <div className="text-xs mt-1">{data.age}</div>
                    </div>
                  ))}
              </div>

              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-muted-foreground">
                <div>${Math.round(maxSavings).toLocaleString()}</div>
                <div>${Math.round(maxSavings * 0.75).toLocaleString()}</div>
                <div>${Math.round(maxSavings * 0.5).toLocaleString()}</div>
                <div>${Math.round(maxSavings * 0.25).toLocaleString()}</div>
                <div>$0</div>
              </div>

              {/* Retirement age indicator */}
              <div
                className="absolute bottom-0 border-l border-dashed border-destructive h-full"
                style={{
                  left: `${((retirementAge - currentAge) / (lifeExpectancy - currentAge)) * 100}%`,
                  transform: "translateX(-50%)",
                }}
              >
                <div className="absolute -top-6 -translate-x-1/2 text-xs text-destructive">Retirement</div>
              </div>
            </div>

            <div className="flex justify-center mt-4 space-x-4 text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-trust-primary mr-1"></div>
                <span>Accumulation Phase</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-trust-accent mr-1"></div>
                <span>Distribution Phase</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="current" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="current">Current Situation</TabsTrigger>
          <TabsTrigger value="income">Income Details</TabsTrigger>
          <TabsTrigger value="investment">Investment Assumptions</TabsTrigger>
          <TabsTrigger value="retirement">Retirement Needs</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="p-4 border rounded-md mt-4">
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="current-age">Current Age</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="current-age"
                    value={[currentAge]}
                    min={18}
                    max={70}
                    step={1}
                    onValueChange={(value) => setCurrentAge(value[0])}
                    className="flex-1"
                  />
                  <span className="w-16 text-right">{currentAge} years</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="retirement-age">Retirement Age</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="retirement-age"
                    value={[retirementAge]}
                    min={Math.max(currentAge + 1, 50)}
                    max={75}
                    step={1}
                    onValueChange={(value) => setRetirementAge(value[0])}
                    className="flex-1"
                  />
                  <span className="w-16 text-right">{retirementAge} years</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="current-savings">Current Retirement Savings ($)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="current-savings"
                  value={[currentSavings]}
                  min={0}
                  max={500000}
                  step={1000}
                  onValueChange={(value) => setCurrentSavings(value[0])}
                  className="flex-1"
                />
                <span className="w-24 text-right">${currentSavings.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="annual-contribution">Annual Contribution ($)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="annual-contribution"
                  value={[annualContribution]}
                  min={0}
                  max={25000}
                  step={500}
                  onValueChange={(value) => setAnnualContribution(value[0])}
                  className="flex-1"
                />
                <span className="w-24 text-right">${annualContribution.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="annual-increase">Annual Increase in Contributions (%)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="annual-increase"
                  value={[annualIncrease]}
                  min={0}
                  max={10}
                  step={0.5}
                  onValueChange={(value) => setAnnualIncrease(value[0])}
                  className="flex-1"
                />
                <span className="w-16 text-right">{annualIncrease}%</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="current-tax-rate">Current Income Tax Rate (%)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="current-tax-rate"
                  value={[currentTaxRate]}
                  min={0}
                  max={40}
                  step={1}
                  onValueChange={(value) => setCurrentTaxRate(value[0])}
                  className="flex-1"
                />
                <span className="w-16 text-right">{currentTaxRate}%</span>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="income" className="p-4 border rounded-md mt-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="current-income">Current Pre-Tax Income ($)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="current-income"
                  value={[currentIncome]}
                  min={20000}
                  max={500000}
                  step={1000}
                  onValueChange={(value) => setCurrentIncome(value[0])}
                  className="flex-1"
                />
                <span className="w-24 text-right">${currentIncome.toLocaleString()}/year</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="annual-income-increase">Annual Income Increase (%)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="annual-income-increase"
                  value={[annualIncomeIncrease]}
                  min={0}
                  max={10}
                  step={0.5}
                  onValueChange={(value) => setAnnualIncomeIncrease(value[0])}
                  className="flex-1"
                />
                <span className="w-16 text-right">{annualIncomeIncrease}%</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="income-percentage">Income Needed After Retirement (%)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="income-percentage"
                  value={[incomePercentage]}
                  min={30}
                  max={100}
                  step={5}
                  onValueChange={(value) => setIncomePercentage(value[0])}
                  className="flex-1"
                />
                <span className="w-16 text-right">{incomePercentage}%</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                This equals ${Math.round(currentIncome * (incomePercentage / 100)).toLocaleString()}/year in today's
                dollars
              </p>
            </div>

            <div className="p-4 bg-trust-primary/5 rounded-lg mt-4">
              <h3 className="font-medium text-trust-primary mb-2">Income Planning Tips</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <DollarSign className="h-4 w-4 text-trust-primary mt-0.5" />
                  <span>
                    Most financial experts recommend planning for 70-80% of your pre-retirement income during
                    retirement.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="h-4 w-4 text-trust-primary mt-0.5" />
                  <span>
                    Consider how your expenses might change in retirement - less commuting and work expenses, but
                    potentially more for healthcare and leisure.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 text-trust-primary mt-0.5" />
                  <span>
                    Your income needs may vary throughout retirement - higher in early "active" years, lower in middle
                    years, and higher again in later years due to healthcare costs.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="investment" className="p-4 border rounded-md mt-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <TooltipProvider>
                <div className="flex items-center gap-2">
                  <Label htmlFor="return-rate">Expected Annual Return Before Retirement (%)</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TrendingUp className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        The average annual return on your investments before retirement. Historically, a diversified
                        portfolio has returned 7-10% annually before inflation.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
              <div className="flex items-center gap-4">
                <Slider
                  id="return-rate"
                  value={[returnRate]}
                  min={1}
                  max={12}
                  step={0.1}
                  onValueChange={(value) => setReturnRate(value[0])}
                  className="flex-1"
                />
                <span className="w-16 text-right">{returnRate}%</span>
              </div>
            </div>

            <div className="space-y-2">
              <TooltipProvider>
                <div className="flex items-center gap-2">
                  <Label htmlFor="retirement-return-rate">Expected Annual Return During Retirement (%)</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TrendingUp className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        The average annual return on your investments during retirement. This is typically lower than
                        pre-retirement as you'll likely shift to more conservative investments.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
              <div className="flex items-center gap-4">
                <Slider
                  id="retirement-return-rate"
                  value={[retirementReturnRate]}
                  min={1}
                  max={8}
                  step={0.1}
                  onValueChange={(value) => setRetirementReturnRate(value[0])}
                  className="flex-1"
                />
                <span className="w-16 text-right">{retirementReturnRate}%</span>
              </div>
            </div>

            <div className="space-y-2">
              <TooltipProvider>
                <div className="flex items-center gap-2">
                  <Label htmlFor="inflation-rate">Expected Inflation Rate (%)</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DollarSign className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        The average annual rate at which prices increase over time. Historically, inflation in the US
                        has averaged around 2-3% annually.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
              <div className="flex items-center gap-4">
                <Slider
                  id="inflation-rate"
                  value={[inflationRate]}
                  min={1}
                  max={6}
                  step={0.1}
                  onValueChange={(value) => setInflationRate(value[0])}
                  className="flex-1"
                />
                <span className="w-16 text-right">{inflationRate}%</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="retirement-tax-rate">Expected Retirement Tax Rate (%)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="retirement-tax-rate"
                  value={[retirementTaxRate]}
                  min={0}
                  max={40}
                  step={1}
                  onValueChange={(value) => setRetirementTaxRate(value[0])}
                  className="flex-1"
                />
                <span className="w-16 text-right">{retirementTaxRate}%</span>
              </div>
            </div>

            <div className="p-4 bg-trust-primary/5 rounded-lg mt-4">
              <h3 className="font-medium text-trust-primary mb-2">Investment Strategy Recommendations</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Based on your age and retirement timeline, consider the following asset allocation:
              </p>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="p-2 bg-trust-primary/10 rounded text-center">
                  <div className="font-medium">{Math.max(0, 110 - currentAge)}%</div>
                  <div className="text-xs text-muted-foreground">Stocks</div>
                </div>
                <div className="p-2 bg-trust-primary/10 rounded text-center">
                  <div className="font-medium">{Math.min(100, Math.max(0, currentAge - 10))}%</div>
                  <div className="text-xs text-muted-foreground">Bonds</div>
                </div>
                <div className="p-2 bg-trust-primary/10 rounded text-center">
                  <div className="font-medium">
                    {Math.max(0, 100 - (110 - currentAge) - Math.max(0, currentAge - 10))}%
                  </div>
                  <div className="text-xs text-muted-foreground">Cash/Other</div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="retirement" className="p-4 border rounded-md mt-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="life-expectancy">Life Expectancy</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="life-expectancy"
                  value={[lifeExpectancy]}
                  min={Math.max(retirementAge + 1, 70)}
                  max={100}
                  step={1}
                  onValueChange={(value) => setLifeExpectancy(value[0])}
                  className="flex-1"
                />
                <span className="w-16 text-right">{lifeExpectancy} years</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="desired-income">Desired Annual Retirement Income ($)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="desired-income"
                  value={[desiredIncome]}
                  min={20000}
                  max={200000}
                  step={1000}
                  onValueChange={(value) => setDesiredIncome(value[0])}
                  className="flex-1"
                />
                <span className="w-24 text-right">${desiredIncome.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="include-social-security">Include Social Security</Label>
                <Switch
                  id="include-social-security"
                  checked={includeSocialSecurity}
                  onCheckedChange={setIncludeSocialSecurity}
                />
              </div>

              {includeSocialSecurity && (
                <div className="pt-2">
                  <Label htmlFor="social-security-income">Expected Annual Social Security Income ($)</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <Slider
                      id="social-security-income"
                      value={[socialSecurityIncome]}
                      min={10000}
                      max={40000}
                      step={500}
                      onValueChange={(value) => setSocialSecurityIncome(value[0])}
                      className="flex-1"
                    />
                    <span className="w-24 text-right">${socialSecurityIncome.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-trust-primary/5 rounded-lg mt-4">
              <h3 className="font-medium text-trust-primary mb-2">Retirement Planning Tips</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <PiggyBank className="h-4 w-4 text-trust-primary mt-0.5" />
                  <span>
                    Consider maximizing tax-advantaged accounts like 401(k)s and IRAs before investing in taxable
                    accounts.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 text-trust-primary mt-0.5" />
                  <span>
                    The 4% rule suggests withdrawing 4% of your retirement savings in the first year, then adjusting for
                    inflation each year after.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="h-4 w-4 text-trust-primary mt-0.5" />
                  <span>
                    As you approach retirement, consider gradually shifting to more conservative investments to protect
                    your savings.
                  </span>
                </li>
              </ul>

              <div className="mt-4 text-sm">
                <a
                  href="https://www.ssa.gov/benefits/retirement/estimator.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="calculator-external-link"
                >
                  Estimate your Social Security benefits <ExternalLink className="calculator-external-link-icon" />
                </a>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
