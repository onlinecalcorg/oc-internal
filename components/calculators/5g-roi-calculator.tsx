"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { useCurrency } from "@/contexts/currency-context"

type IndustryType = "manufacturing" | "healthcare" | "retail" | "logistics" | "media" | "other"
type NetworkType = "private" | "public" | "hybrid"
type CompanySize = "small" | "medium" | "large" | "enterprise"

interface ROIResult {
  implementationCost: number
  annualOperatingCost: number
  totalFiveYearCost: number
  productivityBenefit: number
  operationalSavings: number
  newRevenue: number
  totalAnnualBenefit: number
  fiveYearBenefit: number
  roi: number
  paybackMonths: number
}

export function FiveGROICalculator() {
  const { formatCurrency } = useCurrency()
  const [industry, setIndustry] = useState<IndustryType>("manufacturing")
  const [companySize, setCompanySize] = useState<CompanySize>("medium")
  const [networkType, setNetworkType] = useState<NetworkType>("hybrid")
  const [employees, setEmployees] = useState<string>("100")
  const [annualRevenue, setAnnualRevenue] = useState<string>("10000000")
  const [currentConnectedDevices, setCurrentConnectedDevices] = useState<string>("50")
  const [plannedConnectedDevices, setPlannedConnectedDevices] = useState<string>("200")
  const [currentNetworkSatisfaction, setCurrentNetworkSatisfaction] = useState<number[]>([30])
  const [includeEdgeComputing, setIncludeEdgeComputing] = useState<boolean>(true)
  const [includeIoTExpansion, setIncludeIoTExpansion] = useState<boolean>(true)

  const [result, setResult] = useState<ROIResult | null>(null)

  // Base cost and benefit multipliers
  const industryMultipliers = {
    manufacturing: { cost: 1.2, benefit: 1.5 },
    healthcare: { cost: 1.3, benefit: 1.6 },
    retail: { cost: 0.9, benefit: 1.2 },
    logistics: { cost: 1.1, benefit: 1.4 },
    media: { cost: 1.0, benefit: 1.3 },
    other: { cost: 1.0, benefit: 1.0 },
  }

  const networkTypeMultipliers = {
    private: { cost: 1.5, benefit: 1.3 },
    public: { cost: 0.7, benefit: 0.8 },
    hybrid: { cost: 1.2, benefit: 1.1 },
  }

  const companySizeMultipliers = {
    small: 0.5,
    medium: 1.0,
    large: 2.0,
    enterprise: 4.0,
  }

  const calculateROI = () => {
    const employeesNum = Number.parseInt(employees) || 100
    const revenueNum = Number.parseInt(annualRevenue) || 10000000
    const currentDevices = Number.parseInt(currentConnectedDevices) || 50
    const plannedDevices = Number.parseInt(plannedConnectedDevices) || 200
    const networkSatisfaction = currentNetworkSatisfaction[0] / 100

    // Base costs in USD
    const baseImplementationCost = 250000
    const baseAnnualOperatingCost = 50000

    // Calculate adjusted costs
    const industryCostMult = industryMultipliers[industry].cost
    const networkCostMult = networkTypeMultipliers[networkType].cost
    const sizeMult = companySizeMultipliers[companySize]
    const deviceRatio = plannedDevices / Math.max(currentDevices, 1)
    const satisfactionFactor = 1.5 - networkSatisfaction // Lower satisfaction means higher potential benefit

    // Additional costs for selected options
    const edgeComputingCost = includeEdgeComputing ? baseImplementationCost * 0.3 : 0
    const iotExpansionCost = includeIoTExpansion ? baseImplementationCost * 0.25 : 0

    // Calculate implementation cost
    const implementationCost =
      baseImplementationCost * industryCostMult * networkCostMult * sizeMult + edgeComputingCost + iotExpansionCost

    // Calculate annual operating cost
    const annualOperatingCost = baseAnnualOperatingCost * networkCostMult * sizeMult * (1 + (deviceRatio - 1) * 0.3) // Device scaling factor

    // Calculate 5-year total cost
    const totalFiveYearCost = implementationCost + annualOperatingCost * 5

    // Calculate benefits
    const industryBenefitMult = industryMultipliers[industry].benefit
    const networkBenefitMult = networkTypeMultipliers[networkType].benefit

    // Productivity benefit (% of employee cost)
    const avgSalary = 70000 // Assumed average salary
    const totalSalaries = avgSalary * employeesNum
    const productivityGainPercent = 0.05 * industryBenefitMult * satisfactionFactor
    const productivityBenefit = totalSalaries * productivityGainPercent

    // Operational savings (reduced downtime, maintenance, etc.)
    const operationalSavingsPercent = 0.03 * industryBenefitMult * networkBenefitMult
    let operationalSavings = revenueNum * operationalSavingsPercent * 0.2 // Assuming 20% of revenue is operational cost

    // New revenue opportunities
    const newRevenuePercent = 0.02 * industryBenefitMult * networkBenefitMult
    let newRevenue = revenueNum * newRevenuePercent

    // Additional benefits for selected options
    if (includeEdgeComputing) {
      newRevenue *= 1.2 // 20% additional revenue from edge computing capabilities
    }

    if (includeIoTExpansion) {
      operationalSavings *= 1.25 // 25% additional operational savings from IoT
    }

    // Total annual benefit
    const totalAnnualBenefit = productivityBenefit + operationalSavings + newRevenue

    // 5-year benefit (assuming 10% year-over-year growth in benefits)
    let fiveYearBenefit = 0
    for (let year = 0; year < 5; year++) {
      fiveYearBenefit += totalAnnualBenefit * Math.pow(1.1, year)
    }

    // ROI calculation
    const roi = ((fiveYearBenefit - totalFiveYearCost) / totalFiveYearCost) * 100

    // Payback period in months
    const paybackMonths = implementationCost / (totalAnnualBenefit / 12)

    setResult({
      implementationCost: Math.round(implementationCost),
      annualOperatingCost: Math.round(annualOperatingCost),
      totalFiveYearCost: Math.round(totalFiveYearCost),
      productivityBenefit: Math.round(productivityBenefit),
      operationalSavings: Math.round(operationalSavings),
      newRevenue: Math.round(newRevenue),
      totalAnnualBenefit: Math.round(totalAnnualBenefit),
      fiveYearBenefit: Math.round(fiveYearBenefit),
      roi: Math.round(roi),
      paybackMonths: Math.round(paybackMonths),
    })
  }

  const handleReset = () => {
    setIndustry("manufacturing")
    setCompanySize("medium")
    setNetworkType("hybrid")
    setEmployees("100")
    setAnnualRevenue("10000000")
    setCurrentConnectedDevices("50")
    setPlannedConnectedDevices("200")
    setCurrentNetworkSatisfaction([30])
    setIncludeEdgeComputing(true)
    setIncludeIoTExpansion(true)
    setResult(null)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">5G Upgrade ROI Calculator</CardTitle>
        <CardDescription>
          Calculate the return on investment for upgrading to 5G technology in your business
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
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={industry} onValueChange={(value) => setIndustry(value as IndustryType)}>
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="logistics">Logistics & Transportation</SelectItem>
                      <SelectItem value="media">Media & Entertainment</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

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
                  <Label htmlFor="network-type">5G Network Type</Label>
                  <Select value={networkType} onValueChange={(value) => setNetworkType(value as NetworkType)}>
                    <SelectTrigger id="network-type">
                      <SelectValue placeholder="Select network type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">Private 5G Network</SelectItem>
                      <SelectItem value="public">Public 5G Service</SelectItem>
                      <SelectItem value="hybrid">Hybrid Approach</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

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
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="current-devices">Current Connected Devices</Label>
                  <Input
                    id="current-devices"
                    type="number"
                    value={currentConnectedDevices}
                    onChange={(e) => setCurrentConnectedDevices(e.target.value)}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="planned-devices">Planned Connected Devices (with 5G)</Label>
                  <Input
                    id="planned-devices"
                    type="number"
                    value={plannedConnectedDevices}
                    onChange={(e) => setPlannedConnectedDevices(e.target.value)}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="network-satisfaction" className="mb-2 block">
                    Current Network Satisfaction ({currentNetworkSatisfaction[0]}%)
                  </Label>
                  <Slider
                    id="network-satisfaction"
                    value={currentNetworkSatisfaction}
                    onValueChange={setCurrentNetworkSatisfaction}
                    max={100}
                    step={1}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Unsatisfied</span>
                    <span>Neutral</span>
                    <span>Very Satisfied</span>
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <Label>Additional 5G Capabilities</Label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="edge-computing"
                        checked={includeEdgeComputing}
                        onCheckedChange={(checked) => setIncludeEdgeComputing(checked as boolean)}
                      />
                      <Label htmlFor="edge-computing" className="cursor-pointer">
                        Include Edge Computing
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="iot-expansion"
                        checked={includeIoTExpansion}
                        onCheckedChange={(checked) => setIncludeIoTExpansion(checked as boolean)}
                      />
                      <Label htmlFor="iot-expansion" className="cursor-pointer">
                        Include IoT Expansion
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-6">
              <Button onClick={calculateROI} className="flex-1">
                Calculate 5G ROI
              </Button>
              <Button variant="outline" onClick={handleReset}>
                Reset
              </Button>
            </div>

            {result && (
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">Cost Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span>Implementation Cost:</span>
                          <span className="font-medium">{formatCurrency(result.implementationCost)}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Annual Operating Cost:</span>
                          <span className="font-medium">{formatCurrency(result.annualOperatingCost)}</span>
                        </li>
                        <li className="flex justify-between border-t pt-2 mt-2">
                          <span className="font-bold">Total 5-Year Cost:</span>
                          <span className="font-bold">{formatCurrency(result.totalFiveYearCost)}</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">Benefit Analysis (Annual)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span>Productivity Benefit:</span>
                          <span className="font-medium">{formatCurrency(result.productivityBenefit)}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Operational Savings:</span>
                          <span className="font-medium">{formatCurrency(result.operationalSavings)}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>New Revenue Opportunities:</span>
                          <span className="font-medium">{formatCurrency(result.newRevenue)}</span>
                        </li>
                        <li className="flex justify-between border-t pt-2 mt-2">
                          <span className="font-bold">Total Annual Benefit:</span>
                          <span className="font-bold">{formatCurrency(result.totalAnnualBenefit)}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="font-bold">5-Year Benefit:</span>
                          <span className="font-bold">{formatCurrency(result.fiveYearBenefit)}</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">ROI Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-muted/50">
                        <h3 className="text-lg font-medium">5-Year ROI</h3>
                        <p className={`text-4xl font-bold mt-2 ${result.roi > 0 ? "text-green-600" : "text-red-600"}`}>
                          {result.roi}%
                        </p>
                      </div>

                      <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-muted/50">
                        <h3 className="text-lg font-medium">Payback Period</h3>
                        <p className="text-4xl font-bold mt-2">{result.paybackMonths} months</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="text-sm text-muted-foreground">
                  <p>
                    These calculations are estimates based on industry averages and the information provided. Actual
                    costs and returns may vary based on specific implementation details, vendor selection, and
                    organizational factors.
                  </p>
                  <p className="mt-2">
                    For a more accurate assessment, consider consulting with 5G implementation specialists who can
                    provide a detailed analysis based on your specific business needs.
                  </p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="info" className="space-y-4">
            <div className="prose max-w-none dark:prose-invert">
              <h3>Understanding 5G ROI for Business</h3>
              <p>
                5G technology offers transformative capabilities for businesses across industries, but understanding the
                return on investment is crucial for making informed decisions.
              </p>

              <h4>Key Benefits of 5G</h4>
              <ul>
                <li>
                  <strong>Enhanced Speed and Bandwidth:</strong> Up to 100x faster than 4G, enabling real-time data
                  processing and high-definition video streaming.
                </li>
                <li>
                  <strong>Ultra-Low Latency:</strong> Response times as low as 1ms, critical for applications requiring
                  real-time feedback.
                </li>
                <li>
                  <strong>Massive Device Connectivity:</strong> Support for up to 1 million devices per square
                  kilometer, enabling large-scale IoT deployments.
                </li>
                <li>
                  <strong>Network Slicing:</strong> Ability to create virtual networks with specific characteristics for
                  different applications.
                </li>
                <li>
                  <strong>Edge Computing Integration:</strong> Processing data closer to its source, reducing latency
                  and bandwidth usage.
                </li>
              </ul>

              <h4>Industry-Specific Applications</h4>
              <ul>
                <li>
                  <strong>Manufacturing:</strong> Smart factories, predictive maintenance, augmented reality for worker
                  assistance.
                </li>
                <li>
                  <strong>Healthcare:</strong> Remote surgery, real-time patient monitoring, AR/VR for medical training.
                </li>
                <li>
                  <strong>Retail:</strong> Immersive shopping experiences, inventory management, personalized marketing.
                </li>
                <li>
                  <strong>Logistics:</strong> Fleet management, autonomous vehicles, supply chain visibility.
                </li>
                <li>
                  <strong>Media:</strong> 4K/8K streaming, virtual reality experiences, remote production.
                </li>
              </ul>

              <h4>Implementation Considerations</h4>
              <p>When planning a 5G implementation, consider these key factors:</p>
              <ul>
                <li>
                  <strong>Private vs. Public Networks:</strong> Private networks offer more control and security but at
                  higher cost.
                </li>
                <li>
                  <strong>Device Ecosystem:</strong> Ensure compatibility with existing and planned devices.
                </li>
                <li>
                  <strong>Security Requirements:</strong> 5G introduces new security considerations that must be
                  addressed.
                </li>
                <li>
                  <strong>Integration with Existing Systems:</strong> Plan for how 5G will work with your current
                  infrastructure.
                </li>
                <li>
                  <strong>Phased Approach:</strong> Consider starting with high-value use cases before expanding.
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
