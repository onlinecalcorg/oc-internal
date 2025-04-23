"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useCurrency } from "@/contexts/currency-context"
import { Home, DollarSign, PiggyBank, Calendar, TrendingUp, ChevronDown, ChevronUp, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function MortgageCalculator() {
  const { formatAmount } = useCurrency()
  const [homePrice, setHomePrice] = useState<number>(300000)
  const [downPayment, setDownPayment] = useState<number>(60000)
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20)
  const [loanTerm, setLoanTerm] = useState<number>(30)
  const [interestRate, setInterestRate] = useState<number>(4.5)
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0)
  const [totalPayment, setTotalPayment] = useState<number>(0)
  const [totalInterest, setTotalInterest] = useState<number>(0)
  const [amortizationSchedule, setAmortizationSchedule] = useState<any[]>([])
  const [showAmortizationSchedule, setShowAmortizationSchedule] = useState<boolean>(false)
  const [propertyTax, setPropertyTax] = useState<number>(2400)
  const [insurance, setInsurance] = useState<number>(1200)
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false)
  const [pmi, setPmi] = useState<number>(0)

  // Calculate mortgage details
  useEffect(() => {
    const calculateMortgage = () => {
      const principal = homePrice - downPayment
      const monthlyRate = interestRate / 100 / 12
      const numberOfPayments = loanTerm * 12

      // Calculate PMI (if down payment < 20%)
      const pmiRate = downPaymentPercent < 20 ? 0.005 : 0
      const annualPmi = principal * pmiRate
      const monthlyPmi = annualPmi / 12
      setPmi(monthlyPmi)

      // Calculate monthly payment
      const x = Math.pow(1 + monthlyRate, numberOfPayments)
      const monthly = (principal * x * monthlyRate) / (x - 1)

      if (isFinite(monthly)) {
        // Principal and interest payment
        setMonthlyPayment(monthly)
        setTotalPayment(monthly * numberOfPayments)
        setTotalInterest(monthly * numberOfPayments - principal)

        // Generate amortization schedule
        let balance = principal
        let totalInterestPaid = 0
        const schedule = []

        for (let i = 1; i <= numberOfPayments; i++) {
          const interestPayment = balance * monthlyRate
          const principalPayment = monthly - interestPayment

          totalInterestPaid += interestPayment
          balance -= principalPayment

          // Only add yearly entries to keep the schedule manageable
          if (i % 12 === 0) {
            schedule.push({
              year: i / 12,
              principalPayment: principalPayment,
              interestPayment: interestPayment,
              totalInterestPaid: totalInterestPaid,
              remainingBalance: balance > 0 ? balance : 0,
            })
          }
        }

        setAmortizationSchedule(schedule)
      }
    }

    calculateMortgage()
  }, [homePrice, downPayment, downPaymentPercent, loanTerm, interestRate])

  // Update down payment amount when percentage changes
  const handleDownPaymentPercentChange = (value: number[]) => {
    const percent = value[0]
    setDownPaymentPercent(percent)
    setDownPayment(homePrice * (percent / 100))
  }

  // Update down payment percentage when amount changes
  const handleDownPaymentChange = (value: string) => {
    const amount = Number.parseFloat(value) || 0
    setDownPayment(amount)
    setDownPaymentPercent((amount / homePrice) * 100)
  }

  // Handle home price change
  const handleHomePriceChange = (value: string) => {
    const price = Number.parseFloat(value) || 0
    setHomePrice(price)
    // Keep the same down payment percentage
    setDownPayment(price * (downPaymentPercent / 100))
  }

  // Calculate total monthly payment including taxes and insurance
  const monthlyPropertyTax = propertyTax / 12
  const monthlyInsurance = insurance / 12
  const totalMonthlyPayment = monthlyPayment + monthlyPropertyTax + monthlyInsurance + pmi

  return (
    <Card className="w-full border-t-4 border-t-blue-600 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-blue-950 dark:to-gray-900">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
            <Home className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <CardTitle className="text-2xl">Mortgage Payment Calculator</CardTitle>
            <CardDescription>Calculate your monthly mortgage payments and view amortization schedule</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="calculator" className="text-sm md:text-base">
              <DollarSign className="h-4 w-4 mr-1 hidden sm:inline" /> Calculator
            </TabsTrigger>
            <TabsTrigger value="amortization" className="text-sm md:text-base">
              <Calendar className="h-4 w-4 mr-1 hidden sm:inline" /> Amortization
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="home-price" className="text-base flex items-center">
                      Home Price
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 ml-1 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-[200px]">The total purchase price of the home</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <Badge variant="outline" className="font-normal">
                      Market Value
                    </Badge>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="home-price"
                      type="number"
                      value={homePrice}
                      onChange={(e) => handleHomePriceChange(e.target.value)}
                      className="pl-7 text-lg"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="down-payment" className="text-base flex items-center">
                      Down Payment
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 ml-1 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-[200px]">Initial payment toward your home purchase</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <Badge
                      variant={downPaymentPercent >= 20 ? "success" : "secondary"}
                      className={`font-normal ${downPaymentPercent >= 20 ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : ""}`}
                    >
                      {downPaymentPercent.toFixed(0)}%
                    </Badge>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="down-payment"
                      type="number"
                      value={downPayment}
                      onChange={(e) => handleDownPaymentChange(e.target.value)}
                      className="pl-7 text-lg"
                    />
                  </div>
                  <div className="pt-2">
                    <Slider
                      value={[downPaymentPercent]}
                      onValueChange={handleDownPaymentPercentChange}
                      max={50}
                      step={1}
                      className="my-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span className="text-blue-600 font-medium">20%</span>
                      <span>50%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="loan-term" className="text-base">
                    Loan Term (Years)
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={loanTerm === 15 ? "default" : "outline"}
                      onClick={() => setLoanTerm(15)}
                      className={`w-full ${loanTerm === 15 ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                    >
                      15
                    </Button>
                    <Button
                      variant={loanTerm === 20 ? "default" : "outline"}
                      onClick={() => setLoanTerm(20)}
                      className={`w-full ${loanTerm === 20 ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                    >
                      20
                    </Button>
                    <Button
                      variant={loanTerm === 30 ? "default" : "outline"}
                      onClick={() => setLoanTerm(30)}
                      className={`w-full ${loanTerm === 30 ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                    >
                      30
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="interest-rate" className="text-base flex items-center">
                      Interest Rate
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 ml-1 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-[200px]">Annual interest rate for your mortgage</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <Badge variant="outline" className="font-normal">
                      {interestRate}%
                    </Badge>
                  </div>
                  <div className="pt-2">
                    <Slider
                      id="interest-rate"
                      value={[interestRate]}
                      onValueChange={(value) => setInterestRate(value[0])}
                      min={0.5}
                      max={10}
                      step={0.1}
                      className="my-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0.5%</span>
                      <span>5%</span>
                      <span>10%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Button
                    variant="ghost"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="w-full flex justify-between items-center text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950"
                  >
                    <span>Advanced Options</span>
                    {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>

                  {showAdvanced && (
                    <div className="mt-4 space-y-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-md">
                      <div className="space-y-2">
                        <Label htmlFor="property-tax" className="text-sm">
                          Annual Property Tax
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                          <Input
                            id="property-tax"
                            type="number"
                            value={propertyTax}
                            onChange={(e) => setPropertyTax(Number(e.target.value) || 0)}
                            className="pl-7"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="insurance" className="text-sm">
                          Annual Home Insurance
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                          <Input
                            id="insurance"
                            type="number"
                            value={insurance}
                            onChange={(e) => setInsurance(Number(e.target.value) || 0)}
                            className="pl-7"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-lg border p-4 bg-white dark:bg-gray-950 shadow-sm">
                  <h3 className="text-xl font-medium mb-4 flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
                    Payment Summary
                  </h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950 rounded-md">
                      <span className="font-medium">Monthly Payment:</span>
                      <span className="text-xl font-bold text-blue-700 dark:text-blue-400">
                        {formatAmount(totalMonthlyPayment)}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Principal & Interest:</span>
                        <span className="font-medium">{formatAmount(monthlyPayment)}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Property Tax:</span>
                        <span className="font-medium">{formatAmount(monthlyPropertyTax)}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Home Insurance:</span>
                        <span className="font-medium">{formatAmount(monthlyInsurance)}</span>
                      </div>

                      {pmi > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground flex items-center">
                            PMI:
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-3 w-3 ml-1 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="w-[200px]">
                                    Private Mortgage Insurance is required when down payment is less than 20%
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </span>
                          <span className="font-medium">{formatAmount(pmi)}</span>
                        </div>
                      )}

                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Loan Amount:</span>
                          <span className="font-medium">{formatAmount(homePrice - downPayment)}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total of All Payments:</span>
                          <span className="font-medium">
                            {formatAmount(totalPayment + (monthlyPropertyTax + monthlyInsurance + pmi) * loanTerm * 12)}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Interest:</span>
                          <span className="font-medium">{formatAmount(totalInterest)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-white dark:bg-gray-950 shadow-sm">
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <PiggyBank className="h-5 w-5 mr-2 text-blue-600" />
                    Payment Breakdown
                  </h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Principal & Interest</span>
                        <span>{formatAmount(monthlyPayment)}</span>
                      </div>
                      <Progress
                        value={(monthlyPayment / totalMonthlyPayment) * 100}
                        className="h-2 bg-gray-200"
                        indicatorClassName="bg-blue-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Property Tax</span>
                        <span>{formatAmount(monthlyPropertyTax)}</span>
                      </div>
                      <Progress
                        value={(monthlyPropertyTax / totalMonthlyPayment) * 100}
                        className="h-2 bg-gray-200"
                        indicatorClassName="bg-green-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Insurance</span>
                        <span>{formatAmount(monthlyInsurance)}</span>
                      </div>
                      <Progress
                        value={(monthlyInsurance / totalMonthlyPayment) * 100}
                        className="h-2 bg-gray-200"
                        indicatorClassName="bg-amber-600"
                      />
                    </div>

                    {pmi > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>PMI</span>
                          <span>{formatAmount(pmi)}</span>
                        </div>
                        <Progress
                          value={(pmi / totalMonthlyPayment) * 100}
                          className="h-2 bg-gray-200"
                          indicatorClassName="bg-red-600"
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span>Principal vs. Interest</span>
                      </div>
                      <div className="flex h-4 overflow-hidden rounded-full bg-gray-200">
                        <div
                          style={{ width: `${((homePrice - downPayment) / totalPayment) * 100}%` }}
                          className="bg-blue-600"
                        ></div>
                        <div
                          style={{ width: `${(totalInterest / totalPayment) * 100}%` }}
                          className="bg-orange-500"
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-600 rounded-full mr-1"></div>
                          <span>Principal: {(((homePrice - downPayment) / totalPayment) * 100).toFixed(1)}%</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-orange-500 rounded-full mr-1"></div>
                          <span>Interest: {((totalInterest / totalPayment) * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="amortization">
            <div className="space-y-4">
              <div className="rounded-lg border p-4 bg-white dark:bg-gray-950 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-medium flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                    Amortization Schedule
                  </h3>
                  <Badge variant="outline" className="font-normal">
                    {loanTerm} Year Fixed
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  This table shows how your loan balance decreases over time as you make payments.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-900">
                        <th className="py-2 px-4 text-left border-b">Year</th>
                        <th className="py-2 px-4 text-right border-b">Principal Payment</th>
                        <th className="py-2 px-4 text-right border-b">Interest Payment</th>
                        <th className="py-2 px-4 text-right border-b">Total Interest Paid</th>
                        <th className="py-2 px-4 text-right border-b">Remaining Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {amortizationSchedule.map((entry, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900">
                          <td className="py-3 px-4">{entry.year}</td>
                          <td className="py-3 px-4 text-right font-mono">{formatAmount(entry.principalPayment)}</td>
                          <td className="py-3 px-4 text-right font-mono">{formatAmount(entry.interestPayment)}</td>
                          <td className="py-3 px-4 text-right font-mono">{formatAmount(entry.totalInterestPaid)}</td>
                          <td className="py-3 px-4 text-right font-mono">{formatAmount(entry.remainingBalance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
