"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useCurrency } from "@/contexts/currency-context"

type CompanySize = "small" | "medium" | "large" | "enterprise"
type AIScope = "narrow" | "moderate" | "comprehensive"
type AIType = "custom" | "vendor" | "hybrid"

interface CostBreakdown {
  development: number
  infrastructure: number
  integration: number
  training: number
  maintenance: number
  total: number
}

interface ROIBreakdown {
  productivityGain: number
  costReduction: number
  revenueIncrease: number
  totalBenefit: number
  roi: number
  paybackMonths: number
}

export function AIImplementationCalculator() {
  const { formatCurrency } = useCurrency()
  const [companySize, setCompanySize] = useState<CompanySize>("medium")
  const [aiScope, setAIScope] = useState<AIScope>("moderate")
  const [aiType, setAIType] = useState<AIType>("hybrid")
  const [employees, setEmployees] = useState<string>("100")
  const [annualRevenue, setAnnualRevenue] = useState<string>("10000000")
  const [dataReadiness, setDataReadiness] = useState<number[]>([50])
  const [includeTraining, setIncludeTraining] = useState<boolean>(true)
  const [includeConsulting, setIncludeConsulting] = useState<boolean>(true)

  const [costBreakdown, setCostBreakdown] = useState<CostBreakdown | null>(null)
  const [roiBreakdown, setROIBreakdown] = useState<ROIBreakdown | null>(null)

  // Base cost multipliers
  const companySizeMultipliers = {
    small: 0.5,
    medium: 1,
    large: 2,
    enterprise: 4,
  }

  const aiScopeMultipliers = {
    narrow: 0.6,
    moderate: 1,
    comprehensive: 2.5,
  }

  const aiTypeMultipliers = {
    vendor: 0.7,
    hybrid: 1,
    custom: 1.8,
  }

  const calculateCosts = () => {
    const employeesNum = Number.parseInt(employees) || 100
    const revenueNum = Number.parseInt(annualRevenue) || 10000000
    const dataReadinessPercent = dataReadiness[0] / 100

    // Base costs in USD
    const baseDevelopmentCost = 75000
    const baseInfrastructureCost = 30000
    const baseIntegrationCost = 40000
    const baseTrainingCost = 20000
    const baseMaintenanceCost = 25000

    // Calculate adjusted costs
    const sizeMult = companySizeMultipliers[companySize]
    const scopeMult = aiScopeMultipliers[aiScope]
    const typeMult = aiTypeMultipliers[aiType]
    const employeeFactor = Math.log10(employeesNum) / Math.log10(100)
    const revenueFactor = Math.log10(revenueNum) / Math.log10(10000000)
    const dataReadinessFactor = 1.5 - dataReadinessPercent * 0.5 // Higher readiness reduces cost

    // Calculate each cost component
    let development = baseDevelopmentCost * sizeMult * scopeMult * typeMult * dataReadinessFactor
    const infrastructure = baseInfrastructureCost * sizeMult * scopeMult * employeeFactor
    const integration = baseIntegrationCost * sizeMult * scopeMult * dataReadinessFactor
    const training = includeTraining ? baseTrainingCost * sizeMult * employeeFactor : 0
    const consulting = includeConsulting ? development * 0.2 : 0 // Consulting at 20% of development
    const maintenance = baseMaintenanceCost * sizeMult * scopeMult * typeMult

    // Add consulting to development cost
    development += consulting

    // Calculate total
    const total = development + infrastructure + integration + training + maintenance

    setCostBreakdown({
      development: Math.round(development),
      infrastructure: Math.round(infrastructure),
      integration: Math.round(integration),
      training: Math.round(training),
      maintenance: Math.round(maintenance),
      total: Math.round(total),
    })

    // Calculate ROI
    calculateROI(total, employeesNum, revenueNum)
  }

  const calculateROI = (totalCost: number, employeesNum: number, revenueNum: number) => {
    // Estimate benefits
    const avgSalary = 70000 // Assumed average salary
    const totalSalaries = avgSalary * employeesNum

    // Productivity gain (% of employee time saved * salary cost)
    const productivityPercent = aiScope === "narrow" ? 0.03 : aiScope === "moderate" ? 0.07 : 0.12
    const productivityGain = totalSalaries * productivityPercent

    // Cost reduction (operational savings)
    const costReductionPercent = aiScope === "narrow" ? 0.02 : aiScope === "moderate" ? 0.04 : 0.08
    const costReduction = revenueNum * costReductionPercent * 0.2 // Assuming 20% of revenue is operational cost

    // Revenue increase (from improved decisions, customer service, etc.)
    const revenueIncreasePercent = aiScope === "narrow" ? 0.01 : aiScope === "moderate" ? 0.03 : 0.06
    const revenueIncrease = revenueNum * revenueIncreasePercent

    // Total annual benefit
    const totalBenefit = productivityGain + costReduction + revenueIncrease

    // ROI calculation
    const roi = (totalBenefit / totalCost) * 100

    // Payback period in months
    const paybackMonths = totalCost / (totalBenefit / 12)

    setROIBreakdown({
      productivityGain: Math.round(productivityGain),
      costReduction: Math.round(costReduction),
      revenueIncrease: Math.round(revenueIncrease),
      totalBenefit: Math.round(totalBenefit),
      roi: Math.round(roi),
      paybackMonths: Math.round(paybackMonths),
    })
  }

  const handleReset = () => {
    setCompanySize("medium")
    setAIScope("moderate")
    setAIType("hybrid")
    setEmployees("100")
    setAnnualRevenue("10000000")
    setDataReadiness([50])
    setIncludeTraining(true)
    setIncludeConsulting(true)
    setCostBreakdown(null)
    setROIBreakdown(null)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">AI Implementation Cost Calculator</CardTitle>
        <CardDescription>
          Estimate the costs and potential ROI of implementing AI solutions in your business
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="info">Information</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="company-size">Company Size</Label>
                  <Select value={companySize} onValueChange={(value) => setCompanySize(value as CompanySize)}>
                    <SelectTrigger id="company-size">
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (1-50 employees)</SelectItem>
                      <SelectItem value="medium">Medium (51-500 employees)</SelectItem>
                      <SelectItem value="large">Large (501-5,000 employees)</SelectItem>
                      <SelectItem value="enterprise">Enterprise (5,000+ employees)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="ai-scope">AI Implementation Scope</Label>
                  <Select value={aiScope} onValueChange={(value) => setAIScope(value as AIScope)}>
                    <SelectTrigger id="ai-scope">
                      <SelectValue placeholder="Select implementation scope" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="narrow">Narrow (Single use case)</SelectItem>
                      <SelectItem value="moderate">Moderate (Multiple use cases)</SelectItem>
                      <SelectItem value="comprehensive">Comprehensive (Enterprise-wide)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="ai-type">AI Solution Type</Label>
                  <Select value={aiType} onValueChange={(value) => setAIType(value as AIType)}>
                    <SelectTrigger id="ai-type">
                      <SelectValue placeholder="Select solution type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vendor">Vendor Solution (Off-the-shelf)</SelectItem>
                      <SelectItem value="hybrid">Hybrid (Customized vendor solution)</SelectItem>
                      <SelectItem value="custom">Custom Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="employees">Number of Employees</Label>
                  <Input
                    id="employees"
                    type="number"
                    value={employees}
                    onChange={(e) => setEmployees(e.target.value)}
                    min="1"
                  />
                </div>

                <div>
                  <Label htmlFor="revenue">Annual Revenue</Label>
                  <Input
                    id="revenue"
                    type="number"
                    value={annualRevenue}
                    onChange={(e) => setAnnualRevenue(e.target.value)}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="data-readiness" className="mb-2 block">
                    Data Readiness ({dataReadiness[0]}%)
                  </Label>
                  <Slider
                    id="data-readiness"
                    value={dataReadiness}
                    onValueChange={setDataReadiness}
                    max={100}
                    step={1}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Unstructured</span>
                    <span>Partially Ready</span>
                    <span>Fully Prepared</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label>Additional Services</Label>
              <div className="flex flex-col gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="training"
                    checked={includeTraining}
                    onCheckedChange={(checked) => setIncludeTraining(checked as boolean)}
                  />
                  <Label htmlFor="training" className="cursor-pointer">
                    Include employee training and change management
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="consulting"
                    checked={includeConsulting}
                    onCheckedChange={(checked) => setIncludeConsulting(checked as boolean)}
                  />
                  <Label htmlFor="consulting" className="cursor-pointer">
                    Include AI strategy consulting
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-6">
              <Button onClick={calculateCosts} className="flex-1">
                Calculate Costs & ROI
              </Button>
              <Button variant="outline" onClick={handleReset}>
                Reset
              </Button>
            </div>

            {costBreakdown && roiBreakdown && (
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">Cost Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span>Development & Consulting:</span>
                          <span className="font-medium">{formatCurrency(costBreakdown.development)}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Infrastructure & Hosting:</span>
                          <span className="font-medium">{formatCurrency(costBreakdown.infrastructure)}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Integration:</span>
                          <span className="font-medium">{formatCurrency(costBreakdown.integration)}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Training & Change Management:</span>
                          <span className="font-medium">{formatCurrency(costBreakdown.training)}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Annual Maintenance:</span>
                          <span className="font-medium">{formatCurrency(costBreakdown.maintenance)}</span>
                        </li>
                        <li className="flex justify-between border-t pt-2 mt-2">
                          <span className="font-bold">Total Implementation Cost:</span>
                          <span className="font-bold">{formatCurrency(costBreakdown.total)}</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">ROI Analysis (Annual)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span>Productivity Gains:</span>
                          <span className="font-medium">{formatCurrency(roiBreakdown.productivityGain)}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Operational Cost Reduction:</span>
                          <span className="font-medium">{formatCurrency(roiBreakdown.costReduction)}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Revenue Increase:</span>
                          <span className="font-medium">{formatCurrency(roiBreakdown.revenueIncrease)}</span>
                        </li>
                        <li className="flex justify-between border-t pt-2 mt-2">
                          <span className="font-bold">Total Annual Benefit:</span>
                          <span className="font-bold">{formatCurrency(roiBreakdown.totalBenefit)}</span>
                        </li>
                      </ul>

                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between mb-2">
                          <span className="font-bold">Return on Investment:</span>
                          <span className="font-bold text-green-600">{roiBreakdown.roi}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-bold">Payback Period:</span>
                          <span className="font-bold">{roiBreakdown.paybackMonths} months</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>
                    These calculations are estimates based on industry averages and the information provided. Actual
                    costs and returns may vary based on specific implementation details, vendor selection, and
                    organizational factors.
                  </p>
                  <p className="mt-2">
                    For a more accurate assessment, consider consulting with AI implementation specialists who can
                    provide a detailed analysis based on your specific business needs.
                  </p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="info" className="space-y-4">
            <div className="prose max-w-none dark:prose-invert">
              <h3>Understanding AI Implementation Costs & ROI</h3>
              <p>
                Implementing artificial intelligence solutions in your business involves various cost factors and
                potential returns. This calculator helps you estimate both sides of the equation.
              </p>

              <h4>Cost Components</h4>
              <ul>
                <li>
                  <strong>Development & Consulting:</strong> Costs related to AI solution development, customization,
                  and strategic consulting.
                </li>
                <li>
                  <strong>Infrastructure & Hosting:</strong> Hardware, cloud services, and computing resources needed to
                  run AI systems.
                </li>
                <li>
                  <strong>Integration:</strong> Expenses for connecting AI systems with existing business applications
                  and data sources.
                </li>
                <li>
                  <strong>Training & Change Management:</strong> Costs for training employees and managing
                  organizational changes.
                </li>
                <li>
                  <strong>Maintenance:</strong> Ongoing costs for updates, monitoring, and maintaining AI systems.
                </li>
              </ul>

              <h4>ROI Factors</h4>
              <ul>
                <li>
                  <strong>Productivity Gains:</strong> Value of time saved through automation and improved
                  decision-making.
                </li>
                <li>
                  <strong>Operational Cost Reduction:</strong> Savings from improved efficiency, reduced errors, and
                  optimized processes.
                </li>
                <li>
                  <strong>Revenue Increase:</strong> Additional revenue from improved customer experiences, new
                  products/services, and better decision-making.
                </li>
              </ul>

              <h4>Implementation Considerations</h4>
              <p>When planning an AI implementation, consider these key factors:</p>
              <ul>
                <li>
                  <strong>Data Readiness:</strong> The quality, accessibility, and structure of your data significantly
                  impacts implementation costs.
                </li>
                <li>
                  <strong>Scope Definition:</strong> Clearly defined use cases with measurable outcomes lead to more
                  successful implementations.
                </li>
                <li>
                  <strong>Build vs. Buy:</strong> Consider whether to develop custom solutions or leverage existing
                  vendor platforms.
                </li>
                <li>
                  <strong>Change Management:</strong> Plan for organizational changes and user adoption to maximize ROI.
                </li>
                <li>
                  <strong>Phased Approach:</strong> Consider starting with smaller, high-impact projects before scaling
                  to enterprise-wide implementations.
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
