"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useCurrency } from "@/contexts/currency-context"

export default function MortgageCalculator() {
  // Change from formatCurrency to formatAmount which is what the context actually provides
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

  // Calculate mortgage details
  useEffect(() => {
    const calculateMortgage = () => {
      const principal = homePrice - downPayment
      const monthlyRate = interestRate / 100 / 12
      const numberOfPayments = loanTerm * 12

      // Calculate monthly payment
      const x = Math.pow(1 + monthlyRate, numberOfPayments)
      const monthly = (principal * x * monthlyRate) / (x - 1)

      if (isFinite(monthly)) {
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
  }, [homePrice, downPayment, loanTerm, interestRate])

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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Mortgage Calculator</CardTitle>
        <CardDescription>Calculate your monthly mortgage payments and view amortization schedule</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="amortization">Amortization Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="home-price">Home Price</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="home-price"
                      type="number"
                      value={homePrice}
                      onChange={(e) => handleHomePriceChange(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="down-payment">Down Payment</Label>
                    <span className="text-sm text-muted-foreground">{downPaymentPercent.toFixed(0)}%</span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="down-payment"
                      type="number"
                      value={downPayment}
                      onChange={(e) => handleDownPaymentChange(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                  <Slider
                    value={[downPaymentPercent]}
                    onValueChange={handleDownPaymentPercentChange}
                    max={50}
                    step={1}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loan-term">Loan Term (Years)</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={loanTerm === 15 ? "default" : "outline"}
                      onClick={() => setLoanTerm(15)}
                      className="w-full"
                    >
                      15
                    </Button>
                    <Button
                      variant={loanTerm === 20 ? "default" : "outline"}
                      onClick={() => setLoanTerm(20)}
                      className="w-full"
                    >
                      20
                    </Button>
                    <Button
                      variant={loanTerm === 30 ? "default" : "outline"}
                      onClick={() => setLoanTerm(30)}
                      className="w-full"
                    >
                      30
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="interest-rate">Interest Rate</Label>
                    <span className="text-sm text-muted-foreground">{interestRate}%</span>
                  </div>
                  <Slider
                    id="interest-rate"
                    value={[interestRate]}
                    onValueChange={(value) => setInterestRate(value[0])}
                    min={0.5}
                    max={10}
                    step={0.1}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0.5%</span>
                    <span>5%</span>
                    <span>10%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium mb-4">Mortgage Summary</h3>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Loan Amount:</span>
                      <span className="font-medium">{formatAmount(homePrice - downPayment)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly Payment:</span>
                      <span className="font-medium">{formatAmount(monthlyPayment)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Payment:</span>
                      <span className="font-medium">{formatAmount(totalPayment)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Interest:</span>
                      <span className="font-medium">{formatAmount(totalInterest)}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium mb-2">Payment Breakdown</h3>

                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-blue-200 text-blue-800">
                          Principal
                        </span>
                      </div>
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-orange-200 text-orange-800">
                          Interest
                        </span>
                      </div>
                    </div>
                    <div className="flex h-4 mb-4 overflow-hidden rounded-full bg-gray-200">
                      <div
                        style={{ width: `${((homePrice - downPayment) / totalPayment) * 100}%` }}
                        className="flex flex-col justify-center rounded-l-full text-center text-white bg-blue-500"
                      ></div>
                      <div
                        style={{ width: `${(totalInterest / totalPayment) * 100}%` }}
                        className="flex flex-col justify-center rounded-r-full text-center text-white bg-orange-500"
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Principal: {(((homePrice - downPayment) / totalPayment) * 100).toFixed(1)}%</span>
                      <span>Interest: {((totalInterest / totalPayment) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="amortization">
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-medium mb-4">Amortization Schedule</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  This table shows how your loan balance decreases over time as you make payments.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 px-4 text-left">Year</th>
                        <th className="py-2 px-4 text-right">Principal Payment</th>
                        <th className="py-2 px-4 text-right">Interest Payment</th>
                        <th className="py-2 px-4 text-right">Total Interest Paid</th>
                        <th className="py-2 px-4 text-right">Remaining Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {amortizationSchedule.map((entry, index) => (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="py-2 px-4">{entry.year}</td>
                          <td className="py-2 px-4 text-right">{formatAmount(entry.principalPayment)}</td>
                          <td className="py-2 px-4 text-right">{formatAmount(entry.interestPayment)}</td>
                          <td className="py-2 px-4 text-right">{formatAmount(entry.totalInterestPaid)}</td>
                          <td className="py-2 px-4 text-right">{formatAmount(entry.remainingBalance)}</td>
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
