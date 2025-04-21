import Image from "next/image"
import CarbonFootprintCalculator from "@/components/calculators/carbon-footprint-calculator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Car, Home, Utensils, ShoppingBag, Leaf, BarChart, TreePine, Globe, Wind } from "lucide-react"

export function CarbonFootprintContent({ jsonLd }: { jsonLd: Record<string, any> }) {
  const useCases = [
    {
      title: "Personal Environmental Impact Assessment",
      description:
        "Individuals concerned about climate change can measure their current carbon footprint and identify the most effective ways to reduce their impact.",
      icon: <Leaf className="h-8 w-8 text-green-500" />,
    },
    {
      title: "Family Sustainability Planning",
      description:
        "Families can use the calculator to understand their collective impact and make household decisions that reduce their environmental footprint.",
      icon: <Home className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Corporate Sustainability Initiatives",
      description:
        "Companies can encourage employees to measure their footprints as part of corporate sustainability programs and track collective reductions over time.",
      icon: <BarChart className="h-8 w-8 text-purple-500" />,
    },
    {
      title: "Educational Tool",
      description:
        "Teachers and environmental educators can use this calculator to demonstrate the impact of different lifestyle choices on carbon emissions.",
      icon: <Globe className="h-8 w-8 text-teal-500" />,
    },
  ]

  const faqs = [
    {
      question: "How is my carbon footprint calculated?",
      answer:
        "The calculator estimates your carbon footprint based on your transportation choices, home energy usage, diet, and consumption patterns using standardized emission factors. We use data from reputable environmental research organizations to convert your activities into equivalent CO2 emissions.",
    },
    {
      question: "What units are used for the carbon footprint?",
      answer:
        "Carbon footprint is measured in metric tons of CO2 equivalent (tCO2e) per year, which includes all greenhouse gases converted to their CO2 warming potential. This standardized measurement allows for comparison across different activities and lifestyles.",
    },
    {
      question: "How can I reduce my carbon footprint?",
      answer:
        "The calculator provides personalized recommendations based on your inputs, such as reducing air travel, switching to renewable energy, adjusting your diet, or changing consumption habits. Small changes in multiple areas of your life can add up to significant reductions in your overall carbon footprint.",
    },
    {
      question: "How accurate is this carbon footprint calculator?",
      answer:
        "This calculator provides a good estimate of your carbon footprint based on typical emission factors. For absolute precision, a detailed life cycle assessment would be required. However, our calculator is accurate enough to identify your major sources of emissions and track improvements over time.",
    },
    {
      question: "What's the difference between direct and indirect emissions?",
      answer:
        "Direct emissions come from sources you control directly, like your car's exhaust or your home's heating system. Indirect emissions are associated with your activities but occur elsewhere, such as emissions from power plants generating your electricity or from manufacturing the products you buy.",
    },
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section with Image */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-900 to-green-700 text-white">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/placeholder.svg?height=600&width=1200"
            alt="Carbon footprint visualization showing human impact on the environment"
            width={1200}
            height={600}
            className="h-full w-full object-cover"
            priority
          />
        </div>
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 p-8 md:p-12">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Calculate Your Carbon Footprint</h1>
            <p className="text-lg md:text-xl opacity-90">
              Understand your environmental impact and discover personalized ways to reduce your carbon emissions.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="inline-flex items-center rounded-full bg-green-800/60 px-3 py-1 text-sm font-medium">
                <Leaf className="mr-1 h-4 w-4" />
                Eco-friendly
              </span>
              <span className="inline-flex items-center rounded-full bg-green-800/60 px-3 py-1 text-sm font-medium">
                <Globe className="mr-1 h-4 w-4" />
                Climate Action
              </span>
              <span className="inline-flex items-center rounded-full bg-green-800/60 px-3 py-1 text-sm font-medium">
                <TreePine className="mr-1 h-4 w-4" />
                Sustainability
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-48 w-48 md:h-64 md:w-64">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Carbon footprint illustration showing Earth with a leaf"
                width={300}
                height={300}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Calculator */}
      <Card className="border-green-200 dark:border-green-900">
        <CardHeader className="border-b bg-green-50 dark:bg-green-950/30">
          <CardTitle className="flex items-center text-2xl">
            <Leaf className="mr-2 h-6 w-6 text-green-600 dark:text-green-400" />
            Carbon Footprint Calculator
          </CardTitle>
          <CardDescription>Measure your environmental impact based on your lifestyle choices</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <CarbonFootprintCalculator />
        </CardContent>
      </Card>

      {/* Key Impact Areas */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Key Impact Areas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Car className="mr-2 h-5 w-5 text-blue-500" />
                Transportation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Vehicle emissions, public transit usage, and air travel contribute significantly to your carbon
                footprint.
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Home className="mr-2 h-5 w-5 text-orange-500" />
                Home Energy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Electricity, heating, and cooling your home can account for up to 40% of your total emissions.
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Utensils className="mr-2 h-5 w-5 text-red-500" />
                Diet & Food
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Food choices, especially meat consumption and food waste, have a substantial environmental impact.
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <ShoppingBag className="mr-2 h-5 w-5 text-purple-500" />
                Consumption
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The products you buy have embedded carbon from manufacturing, shipping, and eventual disposal.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">How People Use This Calculator</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  {useCase.icon}
                  <span className="ml-2">{useCase.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{useCase.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Visual Data Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Global Carbon Emissions</h2>
          <p className="text-muted-foreground">
            Understanding how individual actions contribute to global emissions helps put your personal impact in
            perspective.
          </p>
          <div className="aspect-square relative rounded-xl overflow-hidden border">
            <Image
              src="/placeholder.svg?height=500&width=500"
              alt="Global carbon emissions by sector showing transportation, energy, agriculture, and industry"
              width={500}
              height={500}
              className="object-cover"
            />
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Carbon Reduction Potential</h2>
          <p className="text-muted-foreground">
            Different lifestyle changes can have varying impacts on reducing your carbon footprint.
          </p>
          <div className="aspect-square relative rounded-xl overflow-hidden border">
            <Image
              src="/placeholder.svg?height=500&width=500"
              alt="Chart showing carbon reduction potential of different actions like going car-free, plant-based diet, and renewable energy"
              width={500}
              height={500}
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="calculation" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
                <TabsTrigger value="calculation">Calculation</TabsTrigger>
                <TabsTrigger value="reduction">Reduction</TabsTrigger>
                <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
                <TabsTrigger value="comparison">Comparison</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
              </TabsList>
              <div className="mt-6 space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="font-medium text-lg">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Understanding Carbon Footprints</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Leaf className="mr-2 h-5 w-5 text-green-500" />
                What Is a Carbon Footprint?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                A carbon footprint is the total amount of greenhouse gases (including carbon dioxide and methane) that
                are generated by our actions. The average American has a carbon footprint of about 16 tons, one of the
                highest rates in the world.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Globe className="mr-2 h-5 w-5 text-blue-500" />
                Global Context
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The global average carbon footprint is closer to 4 tons per person. To avoid the worst effects of
                climate change, the average global carbon footprint needs to drop to under 2 tons by 2050.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Wind className="mr-2 h-5 w-5 text-purple-500" />
                Carbon Neutrality
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Carbon neutrality means having a balance between emitting carbon and absorbing carbon from the
                atmosphere. This can be achieved through carbon offsetting and significantly reducing emissions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content Section */}
      <Card className="border-green-200 dark:border-green-900">
        <CardHeader>
          <CardTitle>About Carbon Footprint Calculation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none dark:prose-invert">
            <p>
              Our <strong>free online Carbon Footprint Calculator</strong> helps you measure and understand your
              environmental impact based on your lifestyle choices. This comprehensive tool analyzes your transportation
              habits, home energy usage, diet preferences, consumption patterns, and waste management practices to
              provide a detailed assessment of your carbon emissions.
            </p>

            <h3>Why Calculate Your Carbon Footprint?</h3>
            <p>
              Understanding your carbon footprint is the first step toward making more environmentally conscious
              decisions. By identifying the areas where your lifestyle contributes most significantly to greenhouse gas
              emissions, you can make targeted changes that have the greatest impact on reducing your environmental
              footprint.
            </p>

            <h3>How Our Calculator Works</h3>
            <p>
              Our calculator uses scientifically validated emission factors from reputable environmental research
              organizations to convert your activities into equivalent CO2 emissions. The calculation takes into
              account:
            </p>

            <ul>
              <li>
                <strong>Transportation emissions</strong> from cars, public transit, and air travel
              </li>
              <li>
                <strong>Home energy usage</strong> including electricity source and efficiency
              </li>
              <li>
                <strong>Dietary choices</strong> and their associated emissions
              </li>
              <li>
                <strong>Consumption habits</strong> and product lifecycles
              </li>
              <li>
                <strong>Waste management practices</strong> including recycling and composting
              </li>
            </ul>

            <h3>Taking Action to Reduce Your Footprint</h3>
            <p>
              After calculating your carbon footprint, our tool provides personalized recommendations for reducing your
              environmental impact. These suggestions are tailored to your specific lifestyle and prioritized based on
              their potential impact.
            </p>

            <p>Common strategies for reducing your carbon footprint include:</p>

            <ul>
              <li>Switching to renewable energy sources</li>
              <li>Reducing meat consumption and food waste</li>
              <li>Using public transportation, carpooling, or electric vehicles</li>
              <li>Improving home energy efficiency</li>
              <li>Practicing mindful consumption and extending product lifecycles</li>
              <li>Enhancing recycling and composting habits</li>
            </ul>

            <h3>Global Impact of Carbon Emissions</h3>
            <p>
              Climate scientists agree that to avoid the worst effects of climate change, global warming must be limited
              to 1.5°C above pre-industrial levels. This requires significant reductions in carbon emissions worldwide.
              Individual action, when multiplied across millions of people, can contribute meaningfully to this goal.
            </p>

            <p>
              By regularly calculating and working to reduce your carbon footprint, you're joining a global movement
              toward a more sustainable future. Every ton of CO2 equivalent that you prevent from entering the
              atmosphere makes a difference in the fight against climate change.
            </p>

            <h3>Start Your Sustainability Journey Today</h3>
            <p>
              Use our free Carbon Footprint Calculator to establish your baseline emissions, set reduction goals, and
              track your progress over time. Small changes in your daily habits can add up to significant environmental
              benefits when maintained consistently.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
