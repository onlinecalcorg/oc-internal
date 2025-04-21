import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SolarPanelCalculator from "@/components/calculators/solar-panel-calculator"
import { LucideIcon } from "@/components/lucide-icon"

export function SolarPanelContent({ jsonLd }: { jsonLd: Record<string, any> }) {
  const useCases = [
    {
      title: "Homeowner Investment Decision",
      description:
        "Homeowners can evaluate the financial and environmental benefits of installing solar panels on their property.",
      icon: "Home",
    },
    {
      title: "System Sizing Optimization",
      description:
        "Solar installers and homeowners can determine the optimal system size based on energy usage, roof space, and budget constraints.",
      icon: "Maximize",
    },
    {
      title: "Incentive Maximization",
      description:
        "Consumers can understand how various incentives and rebates affect the return on investment for solar installation.",
      icon: "BadgeDollarSign",
    },
    {
      title: "Environmental Impact Assessment",
      description:
        "Environmentally conscious individuals can quantify the carbon emission reduction from switching to solar energy.",
      icon: "Leaf",
    },
  ]

  const faqs = [
    {
      question: "How accurate are the solar savings estimates?",
      answer:
        "The calculator provides estimates based on your inputs and average solar production in your region. Actual savings may vary based on specific roof conditions, local weather patterns, and electricity rate changes. For the most accurate assessment, we recommend consulting with a local solar installer who can perform a detailed site analysis.",
    },
    {
      question: "What incentives are available for solar installation?",
      answer:
        "The federal solar tax credit is currently 30% through 2032. Additional state and local incentives vary by location, and the calculator allows you to input these to provide a more accurate estimate. These may include state tax credits, property tax exemptions, performance-based incentives, and utility rebates.",
    },
    {
      question: "How long do solar panels last?",
      answer:
        "Most solar panels are warrantied for 25-30 years but can continue producing electricity for longer. The calculator accounts for gradual degradation in panel efficiency over time, typically 0.5% to 0.8% per year. Modern solar panels are quite durable and can withstand various weather conditions while maintaining their productivity.",
    },
    {
      question: "What maintenance is required for solar panels?",
      answer:
        "Solar panels require minimal maintenance. Occasional cleaning to remove dust and debris is recommended, typically 1-2 times per year depending on your location. Most systems have no moving parts, reducing the risk of mechanical failure. Inverters typically need replacement after 10-15 years, which is factored into our long-term ROI calculations.",
    },
    {
      question: "Can I install solar if I have a shaded roof?",
      answer:
        "Partial shading can reduce solar panel efficiency, but modern systems with microinverters or power optimizers can minimize this impact. Our calculator allows you to input a shading factor to provide more accurate estimates. For heavily shaded roofs, a professional assessment is recommended to determine viability.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/90 to-orange-700/90 z-10"></div>
        <div
          className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center"
          aria-hidden="true"
        ></div>
        <div className="relative z-20 px-6 py-16 sm:px-8 sm:py-20 lg:py-24 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 rounded-full bg-yellow-500/30 text-white text-sm font-medium mb-2">
                Renewable Energy Calculator
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Solar Panel Savings Calculator</h1>
              <p className="text-lg sm:text-xl opacity-90 max-w-xl">
                Calculate your potential savings, payback period, and environmental impact from installing solar panels.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <LucideIcon name="DollarSign" className="h-5 w-5 text-yellow-300" />
                  <span>Financial Savings</span>
                </div>
                <div className="flex items-center gap-2">
                  <LucideIcon name="Zap" className="h-5 w-5 text-yellow-300" />
                  <span>Energy Independence</span>
                </div>
                <div className="flex items-center gap-2">
                  <LucideIcon name="Leaf" className="h-5 w-5 text-yellow-300" />
                  <span>Reduce Carbon Footprint</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Solar panels installed on a residential roof with sun shining"
                className="rounded-lg shadow-lg max-w-md mx-auto"
                width={500}
                height={400}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Calculator Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="shadow-lg border-yellow-100 dark:border-yellow-900/30">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-yellow-800 dark:text-yellow-300">
                Calculate Your Solar Savings
              </h2>
              <SolarPanelCalculator />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="shadow-md border-yellow-100 dark:border-yellow-900/30">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4 text-yellow-800 dark:text-yellow-300 flex items-center gap-2">
                <LucideIcon name="Info" className="h-5 w-5" />
                Did You Know?
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <p className="font-medium">The cost of solar panels has dropped by more than 70% since 2010.</p>
                </div>
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <p className="font-medium">Solar energy systems typically pay for themselves in 7-10 years.</p>
                </div>
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <p className="font-medium">Adding solar panels can increase your home's value by up to 4%.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-md border-yellow-100 dark:border-yellow-900/30">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4 text-yellow-800 dark:text-yellow-300 flex items-center gap-2">
                <LucideIcon name="BadgePercent" className="h-5 w-5" />
                Current Incentives
              </h2>
              <p className="mb-4">Take advantage of these solar incentives:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <LucideIcon name="CheckCircle2" className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                  <span>30% Federal Tax Credit through 2032</span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcon name="CheckCircle2" className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                  <span>Net metering in many states</span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcon name="CheckCircle2" className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                  <span>Local rebates and incentives vary by location</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Key Benefits of Solar Energy</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-md border-yellow-100 dark:border-yellow-900/30 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20">
            <CardContent className="p-6 space-y-4">
              <div className="bg-yellow-100 dark:bg-yellow-800/30 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                <LucideIcon name="DollarSign" className="h-6 w-6 text-yellow-700 dark:text-yellow-300" />
              </div>
              <h3 className="text-lg font-bold text-yellow-800 dark:text-yellow-300">Financial Savings</h3>
              <p>
                Reduce or eliminate your electricity bills and protect against rising utility rates with predictable
                energy costs.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-md border-green-100 dark:border-green-900/30 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
            <CardContent className="p-6 space-y-4">
              <div className="bg-green-100 dark:bg-green-800/30 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                <LucideIcon name="Leaf" className="h-6 w-6 text-green-700 dark:text-green-300" />
              </div>
              <h3 className="text-lg font-bold text-green-800 dark:text-green-300">Environmental Impact</h3>
              <p>Reduce your carbon footprint and help combat climate change by generating clean, renewable energy.</p>
            </CardContent>
          </Card>
          <Card className="shadow-md border-blue-100 dark:border-blue-900/30 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <CardContent className="p-6 space-y-4">
              <div className="bg-blue-100 dark:bg-blue-800/30 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                <LucideIcon name="Home" className="h-6 w-6 text-blue-700 dark:text-blue-300" />
              </div>
              <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300">Increased Home Value</h3>
              <p>
                Solar installations can increase your property value and make your home more attractive to potential
                buyers.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-md border-purple-100 dark:border-purple-900/30 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
            <CardContent className="p-6 space-y-4">
              <div className="bg-purple-100 dark:bg-purple-800/30 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                <LucideIcon name="Zap" className="h-6 w-6 text-purple-700 dark:text-purple-300" />
              </div>
              <h3 className="text-lg font-bold text-purple-800 dark:text-purple-300">Energy Independence</h3>
              <p>Generate your own electricity and reduce dependence on utility companies and fossil fuels.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">How You Can Use This Calculator</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <Card key={index} className="shadow-md border-yellow-100 dark:border-yellow-900/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-100 dark:bg-yellow-800/30 p-3 rounded-full shrink-0">
                    <LucideIcon name={useCase.icon as any} className="h-6 w-6 text-yellow-700 dark:text-yellow-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{useCase.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{useCase.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* System Components Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Understanding Solar Panel Systems</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="Diagram showing components of a solar panel system including panels, inverter, and electrical panel"
              className="rounded-lg shadow-lg w-full h-auto"
              width={600}
              height={400}
            />
          </div>
          <div className="space-y-4">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-lg">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <LucideIcon name="PanelTop" className="h-5 w-5 text-yellow-700 dark:text-yellow-300" />
                Solar Panels
              </h3>
              <p>
                Photovoltaic (PV) panels convert sunlight into direct current (DC) electricity. Modern panels are more
                efficient and affordable than ever before.
              </p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-lg">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <LucideIcon name="Cable" className="h-5 w-5 text-yellow-700 dark:text-yellow-300" />
                Inverters
              </h3>
              <p>
                Inverters convert DC electricity from the panels into alternating current (AC) that can be used in your
                home. Options include string inverters, microinverters, and power optimizers.
              </p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-lg">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <LucideIcon name="Battery" className="h-5 w-5 text-yellow-700 dark:text-yellow-300" />
                Battery Storage (Optional)
              </h3>
              <p>
                Battery systems store excess energy for use when the sun isn't shining, providing backup power during
                outages and maximizing self-consumption.
              </p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-lg">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <LucideIcon name="Gauge" className="h-5 w-5 text-yellow-700 dark:text-yellow-300" />
                Monitoring Systems
              </h3>
              <p>
                Modern solar installations include monitoring systems that allow you to track energy production,
                consumption, and system performance in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Frequently Asked Questions</h2>
        <Card className="shadow-lg border-yellow-100 dark:border-yellow-900/30">
          <CardContent className="p-6">
            <Tabs defaultValue="tab1" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="tab1">General</TabsTrigger>
                <TabsTrigger value="tab2">Financial</TabsTrigger>
                <TabsTrigger value="tab3">Technical</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="space-y-4">
                {faqs.slice(0, 2).map((faq, index) => (
                  <div key={index} className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="tab2" className="space-y-4">
                {faqs.slice(2, 3).map((faq, index) => (
                  <div key={index} className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="tab3" className="space-y-4">
                {faqs.slice(3).map((faq, index) => (
                  <div key={index} className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Educational Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">The Solar Revolution</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <p>
              Solar energy is transforming how we power our homes and businesses. As technology improves and costs
              continue to fall, solar power has become an increasingly attractive option for homeowners looking to
              reduce their energy bills and environmental impact.
            </p>
            <p>
              The average residential solar system can offset the equivalent of planting over 100 trees annually in
              terms of carbon dioxide reduction. This makes solar power one of the most accessible ways for individuals
              to combat climate change while also benefiting financially.
            </p>
            <p>
              Modern solar panels are more efficient and durable than ever before. Most systems require minimal
              maintenance and are designed to withstand various weather conditions, including hail, snow, and high
              winds. With warranties typically lasting 25 years or more, solar panels represent a long-term investment
              in your property.
            </p>
            <p>
              Beyond the immediate benefits to homeowners, widespread solar adoption helps create jobs, reduces strain
              on the electrical grid, and decreases our collective dependence on fossil fuels. By using this calculator
              to explore your solar options, you're taking the first step toward joining this important energy
              transition.
            </p>
          </div>
          <div>
            <Card className="shadow-md border-yellow-100 dark:border-yellow-900/30">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-bold">Solar Energy Growth</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>U.S. Solar Capacity 2010</span>
                    <span className="font-bold text-yellow-700 dark:text-yellow-300">2.5 GW</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: "5%" }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>U.S. Solar Capacity 2023</span>
                    <span className="font-bold text-yellow-700 dark:text-yellow-300">142 GW</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: "95%" }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average Cost Reduction Since 2010</span>
                    <span className="font-bold text-yellow-700 dark:text-yellow-300">70%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: "70%" }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>U.S. Homes Powered by Solar</span>
                    <span className="font-bold text-yellow-700 dark:text-yellow-300">23 million</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: "23%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Harness the Power of the Sun?</h2>
        <p className="max-w-2xl mx-auto mb-6">
          Use our calculator to estimate your potential savings and environmental impact from installing solar panels on
          your property.
        </p>
        <a
          href="#calculator"
          className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-yellow-700 font-medium hover:bg-yellow-50 transition-colors"
        >
          Calculate Your Savings
        </a>
      </div>

      {/* Structured Data */}
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
    </div>
  )
}
