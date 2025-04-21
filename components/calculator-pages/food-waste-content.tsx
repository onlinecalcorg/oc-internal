import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FoodWasteCalculator from "@/components/calculators/food-waste-calculator"
import { LucideIcon } from "@/components/lucide-icon"

export function FoodWasteContent({ jsonLd }: { jsonLd: Record<string, any> }) {
  const useCases = [
    {
      title: "Household Budget Optimization",
      description:
        "Learn how much money your family could save by cutting down on food waste, with simple strategies to reduce waste and boost your savings.",
      icon: "DollarSign",
    },
    {
      title: "Environmental Impact Reduction",
      description:
        "Track the CO2, water, and land use impact of your food waste, and find out how making small changes can help protect the environment.",
      icon: "Leaf",
    },
    {
      title: "Restaurant or Cafeteria Management",
      description:
        "Food service managers can pinpoint where waste is happening and create targeted solutions to improve sustainability and increase profits.",
      icon: "UtensilsCrossed",
    },
    {
      title: "Educational Programs",
      description:
        "Schools and community programs can use this calculator to help educate others on the importance of reducing food waste and how to make a real difference.",
      icon: "GraduationCap",
    },
  ]

  const faqs = [
    {
      question: "How is the environmental impact of food waste calculated?",
      answer:
        "The calculator estimates CO2 emissions, water usage, and land use based on your household's food waste. These figures come from research on food production and how food breaks down in landfills.",
    },
    {
      question: "What are the most effective ways to reduce food waste?",
      answer:
        "Simple strategies like planning meals ahead, storing food properly, understanding labels, and using leftovers are great places to start. Plus, composting inedible food scraps can have a big impact.",
    },
    {
      question: "How much money can I save by reducing food waste?",
      answer:
        "The average family throws away about $1,600 worth of food each year. By reducing waste, many families can save 20-30% of their food budget. The calculator helps estimate how much you could save based on your habits.",
    },
    {
      question: "What types of food are most commonly wasted?",
      answer:
        "Fruits, vegetables, dairy, bread, and prepared meals are among the most wasted foods. These items often spoil quickly, and the calculator can help identify what’s contributing most to your waste.",
    },
    {
      question: "How does food waste contribute to climate change?",
      answer:
        "Food that ends up in landfills generates methane, a potent greenhouse gas. Wasting food also means wasting all the resources used to produce it, including water, land, and energy. Reducing food waste helps lower your carbon footprint.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/90 to-amber-800/90 z-10"></div>
        <div
          className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center"
          aria-hidden="true"
        ></div>
        <div className="relative z-20 px-6 py-16 sm:px-8 sm:py-20 lg:py-24 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 rounded-full bg-amber-500/30 text-white text-sm font-medium mb-2">
                Sustainability Calculator
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Food Waste Reduction Calculator</h1>
              <p className="text-lg sm:text-xl opacity-90 max-w-xl">
                Find out how much your food waste is costing you, both financially and environmentally, and discover
                simple strategies to reduce it.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <LucideIcon name="DollarSign" className="h-5 w-5 text-amber-300" />
                  <span>Save Money</span>
                </div>
                <div className="flex items-center gap-2">
                  <LucideIcon name="Leaf" className="h-5 w-5 text-amber-300" />
                  <span>Reduce Emissions</span>
                </div>
                <div className="flex items-center gap-2">
                  <LucideIcon name="Droplets" className="h-5 w-5 text-amber-300" />
                  <span>Conserve Water</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Food waste reduction illustration showing fresh produce and composting"
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
          <Card className="shadow-lg border-amber-100 dark:border-amber-900/30">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-amber-800 dark:text-amber-300">Calculate Your Impact</h2>
              <FoodWasteCalculator />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="shadow-md border-amber-100 dark:border-amber-900/30">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4 text-amber-800 dark:text-amber-300 flex items-center gap-2">
                <LucideIcon name="Info" className="h-5 w-5" />
                Did You Know?
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <p className="font-medium">Globally, about 1/3 of all food produced is wasted.</p>
                </div>
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <p className="font-medium">Food waste accounts for 8-10% of global greenhouse gas emissions.</p>
                </div>
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <p className="font-medium">The average American family throws away $1,600 worth of food annually.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-md border-amber-100 dark:border-amber-900/30">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4 text-amber-800 dark:text-amber-300 flex items-center gap-2">
                <LucideIcon name="Target" className="h-5 w-5" />
                Reduction Goals
              </h2>
              <p className="mb-4">Setting achievable goals is key to tracking progress:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <LucideIcon name="CheckCircle2" className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <span>Start with a 20% reduction target</span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcon name="CheckCircle2" className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <span>Track your waste for two weeks</span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcon name="CheckCircle2" className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <span>Implement one new strategy each week</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Key Impact Areas */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Key Impact Areas of Food Waste</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-md border-amber-100 dark:border-amber-900/30 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20">
            <CardContent className="p-6 space-y-4">
              <div className="bg-amber-100 dark:bg-amber-800/30 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                <LucideIcon name="DollarSign" className="h-6 w-6 text-amber-700 dark:text-amber-300" />
              </div>
              <h3 className="text-lg font-bold text-amber-800 dark:text-amber-300">Financial Impact</h3>
              <p>
                Wasting food means wasting money. Start cutting down on food waste and save hundreds, if not thousands,
                each year.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-md border-green-100 dark:border-green-900/30 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
            <CardContent className="p-6 space-y-4">
              <div className="bg-green-100 dark:bg-green-800/30 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                <LucideIcon name="Leaf" className="h-6 w-6 text-green-700 dark:text-green-300" />
              </div>
              <h3 className="text-lg font-bold text-green-800 dark:text-green-300">Environmental Impact</h3>
              <p>
                Every piece of food that ends up in landfills releases harmful methane into the atmosphere. Reducing
                waste helps fight climate change.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-md border-blue-100 dark:border-blue-900/30 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <CardContent className="p-6 space-y-4">
              <div className="bg-blue-100 dark:bg-blue-800/30 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                <LucideIcon name="Droplets" className="h-6 w-6 text-blue-700 dark:text-blue-300" />
              </div>
              <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300">Water Conservation</h3>
              <p>
                Food production uses a lot of water. By cutting down on food waste, you help save this precious resource
                for future generations.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-md border-purple-100 dark:border-purple-900/30 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
            <CardContent className="p-6 space-y-4">
              <div className="bg-purple-100 dark:bg-purple-800/30 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                <LucideIcon name="Globe" className="h-6 w-6 text-purple-700 dark:text-purple-300" />
              </div>
              <h3 className="text-lg font-bold text-purple-800 dark:text-purple-300">Global Food Security</h3>
              <p>
                Reducing food waste means more food available for those in need, contributing to a more fair and just
                global food system.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">How You Can Use This Calculator</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <Card key={index} className="shadow-md border-amber-100 dark:border-amber-900/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 dark:bg-amber-800/30 p-3 rounded-full shrink-0">
                    <LucideIcon name={useCase.icon as any} className="h-6 w-6 text-amber-700 dark:text-amber-300" />
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

      {/* FAQ Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Frequently Asked Questions</h2>
        <Card className="shadow-lg border-amber-100 dark:border-amber-900/30">
          <CardContent className="p-6">
            <Tabs defaultValue="tab1" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="tab1">General</TabsTrigger>
                <TabsTrigger value="tab2">Environmental Impact</TabsTrigger>
                <TabsTrigger value="tab3">Reduction Tips</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="space-y-4">
                {faqs.slice(0, 2).map((faq, index) => (
                  <div key={index} className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                    <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="tab2" className="space-y-4">
                {faqs.slice(2, 4).map((faq, index) => (
                  <div key={index} className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                    <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="tab3" className="space-y-4">
                {faqs.slice(4).map((faq, index) => (
                  <div key={index} className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
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
        <h2 className="text-2xl font-bold text-center">Understanding Food Waste</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <p>
              Food waste is a global problem with significant environmental, economic, and social implications. When
              food is wasted, all the resources that went into producing it—water, land, energy, labor, and capital—are
              also wasted.
            </p>
            <p>
              In the United States alone, up to 40% of food goes uneaten. This waste occurs throughout the supply chain,
              from farms to processing facilities, retailers, foodservice establishments, and households. However,
              households are responsible for the largest portion of all food waste.
            </p>
            <p>
              Beyond the environmental impact, food waste has serious social implications. While millions of pounds of
              food are thrown away, one in nine people globally still suffers from hunger. Reducing food waste is
              therefore not just an environmental issue but also a matter of social justice.
            </p>
            <p>
              By using this calculator, you can take the first step toward reducing your food waste footprint.
              Understanding the impact of your waste is the beginning of making positive changes that benefit both your
              wallet and the planet.
            </p>
          </div>
          <div>
            <Card className="shadow-md border-amber-100 dark:border-amber-900/30">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-bold">Global Food Waste Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Food wasted globally each year</span>
                    <span className="font-bold text-amber-700 dark:text-amber-300">1.3 billion tons</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: "33%" }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Value of food wasted annually</span>
                    <span className="font-bold text-amber-700 dark:text-amber-300">$1 trillion</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Water wasted in food production</span>
                    <span className="font-bold text-amber-700 dark:text-amber-300">45 trillion gallons</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Land used to grow wasted food</span>
                    <span className="font-bold text-amber-700 dark:text-amber-300">1.4 billion hectares</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: "28%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-700 rounded-xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Reduce Your Food Waste?</h2>
        <p className="max-w-2xl mx-auto mb-6">
          Use our calculator to understand your current impact, then implement our recommended strategies to save money
          and help the environment.
        </p>
        <a
          href="#calculator"
          className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-amber-700 font-medium hover:bg-amber-50 transition-colors"
        >
          Get Started Now
        </a>
      </div>

      {/* Structured Data */}
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
    </div>
  )
}
