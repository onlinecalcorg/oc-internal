export const siteConfig = {
  name: "Online Calculators",
  description:
    "Access 100+ free online calculators for finance, health, math, sustainability & technology. Updated for 2025 with the latest formulas and data for accurate results.",
  url: "https://online-calculators.com",
  ogImage: "https://online-calculators.com/og-image-2025.png",
  email: "info@online-calculators.com",
  links: {
    twitter: "https://twitter.com/onlinecalculators",
    github: "https://github.com/onlinecalculators",
  },
}

export type CalculatorCategory = {
  title: string
  description: string
  slug: string
  icon: string
  calculators: Calculator[]
  seoKeywords?: string[]
}

export type Calculator = {
  title: string
  description: string
  slug: string
  category: string
  icon: string
  keywords?: string[]
  seoTitle?: string
  seoDescription?: string
  yearUpdated?: string
}

export const calculatorCategories: CalculatorCategory[] = [
  {
    title: "Financial Calculators",
    description: "Plan your finances with precision using our 2025-updated financial calculators",
    slug: "financial",
    icon: "dollar-sign",
    seoKeywords: [
      "financial calculators 2025",
      "money calculators",
      "budget planning tools",
      "investment calculators",
      "loan calculators",
      "mortgage payment calculator",
      "retirement planning tools",
      "compound interest calculator",
      "debt payoff calculator",
      "tax calculators 2025",
    ],
    calculators: [
      {
        title: "Vacation Cost Calculator",
        description:
          "Estimate the total cost of your next vacation including travel, accommodation, food, and activities with 2025 pricing data",
        slug: "vacation-cost",
        category: "financial",
        icon: "plane",
        seoTitle: "Vacation Cost Calculator 2025 | Plan Your Trip Budget",
        seoDescription:
          "Plan your 2025 vacation budget with our free vacation cost calculator. Estimate expenses for flights, hotels, food, activities & more with current pricing data.",
        yearUpdated: "2025",
        keywords: [
          "vacation cost calculator",
          "trip budget planner",
          "travel expense calculator",
          "holiday budget tool",
          "vacation planning 2025",
          "travel cost estimator",
          "flight cost calculator",
          "hotel price estimator",
          "vacation budget planner",
          "international travel costs",
        ],
      },
      {
        title: "Retirement Savings Calculator",
        description:
          "Plan for your retirement by calculating how much you need to save based on your lifestyle goals and 2025 economic projections",
        slug: "retirement-savings",
        category: "financial",
        icon: "piggy-bank",
        seoTitle: "Retirement Savings Calculator 2025 | Plan Your Future",
        seoDescription:
          "Calculate your retirement needs with our 2025 retirement savings calculator. Account for inflation, investment returns, and lifestyle goals with updated economic projections.",
        yearUpdated: "2025",
        keywords: [
          "retirement calculator 2025",
          "retirement planning tool",
          "401k calculator",
          "pension calculator",
          "retirement savings planner",
          "retirement income calculator",
          "retirement age calculator",
          "early retirement calculator",
          "retirement nest egg calculator",
          "retirement fund estimator",
        ],
      },
      {
        title: "Mortgage Calculator",
        description:
          "Calculate your monthly mortgage payments, interest, and amortization schedule with 2025 interest rate projections",
        slug: "mortgage",
        category: "financial",
        icon: "home",
        seoTitle: "Mortgage Calculator 2025 | Current Rates & Payment Estimator",
        seoDescription:
          "Calculate your monthly mortgage payments with our 2025 mortgage calculator. Compare current interest rates, estimate total costs, and view amortization schedules.",
        yearUpdated: "2025",
        keywords: [
          "mortgage calculator 2025",
          "home loan calculator",
          "mortgage payment estimator",
          "house payment calculator",
          "mortgage interest calculator",
          "mortgage amortization calculator",
          "mortgage refinance calculator",
          "mortgage affordability calculator",
          "current mortgage rates 2025",
          "mortgage comparison tool",
        ],
      },
    ],
  },
  // Other categories remain the same, just updating the first one for brevity
  {
    title: "Sustainability Calculators",
    description: "Measure and reduce your environmental impact with our sustainability calculators updated for 2025",
    slug: "sustainability",
    icon: "leaf",
    seoKeywords: [
      "sustainability calculators 2025",
      "environmental impact tools",
      "carbon footprint calculator",
      "eco-friendly calculators",
      "green living calculators",
      "renewable energy calculators",
      "sustainable lifestyle tools",
      "climate impact calculator",
      "energy efficiency calculator",
      "water usage calculator",
    ],
    calculators: [
      {
        title: "Carbon Footprint Calculator",
        description:
          "Measure your carbon footprint based on your lifestyle and find ways to reduce it with 2025 emissions data",
        slug: "carbon-footprint",
        category: "sustainability",
        icon: "footprints",
        seoTitle: "Carbon Footprint Calculator 2025 | Measure Your Environmental Impact",
        seoDescription:
          "Calculate your carbon footprint with our 2025-updated calculator. Get personalized recommendations to reduce your environmental impact based on the latest emissions data.",
        yearUpdated: "2025",
        keywords: [
          "carbon footprint calculator 2025",
          "CO2 emissions calculator",
          "greenhouse gas calculator",
          "personal carbon calculator",
          "carbon emissions tracker",
          "climate impact calculator",
          "carbon neutral calculator",
          "environmental impact calculator",
          "carbon offset calculator",
          "sustainable lifestyle calculator",
        ],
      },
      {
        title: "Solar Panel Savings Calculator",
        description:
          "Calculate potential savings and ROI from installing solar panels on your property with 2025 energy prices and incentives",
        slug: "solar-savings",
        category: "sustainability",
        icon: "sun",
        seoTitle: "Solar Panel Savings Calculator 2025 | Calculate Solar ROI",
        seoDescription:
          "Estimate your solar panel savings with our 2025 calculator. Calculate ROI, payback period, and total savings with current energy prices, tax incentives, and rebates.",
        yearUpdated: "2025",
        keywords: [
          "solar panel calculator 2025",
          "solar savings calculator",
          "solar ROI calculator",
          "solar panel cost calculator",
          "solar investment calculator",
          "solar energy savings",
          "solar tax credit calculator",
          "solar payback calculator",
          "solar installation calculator",
          "renewable energy calculator",
        ],
      },
      {
        title: "Food Waste Reduction Calculator",
        description:
          "Estimate the environmental and financial impact of reducing your food waste with 2025 food cost data",
        slug: "food-waste",
        category: "sustainability",
        icon: "utensils",
        seoTitle: "Food Waste Reduction Calculator 2025 | Environmental & Financial Impact",
        seoDescription:
          "Calculate the environmental and financial benefits of reducing food waste with our 2025 calculator. See your potential savings and positive environmental impact.",
        yearUpdated: "2025",
        keywords: [
          "food waste calculator 2025",
          "food waste reduction tool",
          "food waste cost calculator",
          "environmental impact of food waste",
          "food waste savings calculator",
          "household food waste calculator",
          "food waste carbon footprint",
          "sustainable food calculator",
          "food waste management calculator",
          "food waste prevention tool",
        ],
      },
      ,
     {
      title: "5G Upgrade ROI Calculator",
      description: "Calculate the return on investment for upgrading to 5G technology",
      slug: "5g-roi",
      category: "technology",
      icon: "wifi",
      seoTitle: "5G Upgrade ROI Calculator 2025 | Evaluate the Value of 5G Integration",
      seoDescription: "Determine the financial and performance benefits of upgrading to 5G in 2025. Evaluate ROI, productivity gains, and cost-effectiveness for your organization.",
      yearUpdated: "2025",
      keywords: [
        "5G ROI calculator 2025",
        "5G upgrade benefits",
        "5G implementation cost",
        "5G business calculator",
        "5G cost calculator",
        "5G tech ROI estimator",
        "5G integration savings",
        "5G value calculator",
        "5G investment calculator",
        "5G technology assessment"
      ]
    },
      ,
      {
      title: "AI Implementation Cost Calculator",
      description: "Estimate the costs and potential ROI of implementing AI solutions in your business",
      slug: "ai-implementation",
      category: "technology",
      icon: "brain",
      seoTitle: "AI Implementation Cost Calculator 2025 | Estimate ROI for Your Business",
      seoDescription: "Calculate the ROI and implementation costs of AI solutions in 2025. Discover how artificial intelligence can streamline operations and boost profitability.",
      yearUpdated: "2025",
      keywords: [
        "AI ROI calculator 2025",
        "AI cost estimator",
        "artificial intelligence investment calculator",
        "AI implementation costs",
        "AI business benefits calculator",
        "AI efficiency tool",
        "AI adoption calculator",
        "AI project ROI",
        "AI integration cost tool",
        "AI cost-benefit analysis"
      ]
    },
    ],
  },
  // Other categories remain the same
  {
    title: "Technology Calculators",
    description: "Evaluate the costs and benefits of modern technology investments",
    slug: "technology",
    icon: "cpu",
    calculators: [
      {
        title: "Electric Vehicle Cost Calculator",
        description: "Compare the total cost of ownership between electric and gas vehicles",
        slug: "ev-cost",
        category: "technology",
        icon: "car",
      },
    ],
  },
  {
    title: "Health & Fitness Calculators",
    description: "Monitor and improve your health with our wellbeing calculators",
    slug: "health",
    icon: "heart",
    calculators: [
      {
      title: "Mental Health Self-Assessment",
      description: "Evaluate your mental wellbeing and get personalized recommendations",
      slug: "mental-health",
      category: "health",
      icon: "brain",
      seoTitle: "Mental Health Self-Assessment 2025 | Personal Wellbeing Insights",
      seoDescription: "Assess your mental health with our 2025 tool. Get recommendations and insights into stress, anxiety, and overall wellbeing based on your responses.",
      yearUpdated: "2025",
      keywords: [
        "mental health calculator 2025",
        "mental wellness self-assessment",
        "stress and anxiety checker",
        "emotional wellbeing tool",
        "personal mental health assessment",
        "mental health tracker",
        "psychological wellness tool",
        "mental health planner",
        "online mental health quiz",
        "mental health evaluation tool"
      ]
    },
    {
      title: "Nutrition Calculator",
      description: "Calculate your nutritional needs based on your age, weight, height, and activity level",
      slug: "nutrition",
      category: "health",
      icon: "apple",
      seoTitle: "Nutrition Calculator 2025 | Daily Calorie & Macro Needs",
      seoDescription: "Calculate your ideal nutrition needs with our 2025 calculator. Get personalized daily calorie, protein, fat, and carb targets based on your profile.",
      yearUpdated: "2025",
      keywords: [
        "nutrition calculator 2025",
        "daily calorie calculator",
        "macro calculator 2025",
        "personalized nutrition planner",
        "health and diet calculator",
        "nutrition needs tool",
        "macro tracking calculator",
        "BMI and calorie needs calculator",
        "diet planning tool",
        "nutritional analysis calculator"
      ]
    },
    {
      title: "BMI Calculator",
      description: "Measure your body mass index and understand what it means for your health",
      slug: "bmi",
      category: "health",
      icon: "activity",
      seoTitle: "BMI Calculator 2025 | Body Mass Index & Health Ranges",
      seoDescription: "Use our 2025 BMI calculator to measure your body mass index and interpret the results to understand your health status and weight category.",
      yearUpdated: "2025",
      keywords: [
        "BMI calculator 2025",
        "body mass index calculator",
        "BMI health chart",
        "weight status calculator",
        "BMI and health tool",
        "BMI categories 2025",
        "body weight evaluation tool",
        "BMI interpretation tool",
        "BMI for adults",
        "healthy BMI calculator"
      ]
    }
    ],
  },
  {
    title: "Math Calculators",
    description: "Solve mathematical problems quickly and accurately",
    slug: "math",
    icon: "calculator",
    calculators: [
      {
        title: "Scientific Calculator",
        description: "Perform complex mathematical calculations including trigonometry and logarithms",
        slug: "scientific",
        category: "math",
        icon: "percent",
      },
      {
        title: "Fraction Calculator",
        description: "Add, subtract, multiply, and divide fractions with ease",
        slug: "fraction",
        category: "math",
        icon: "divide",
      },
      {
        title: "Percentage Calculator",
        description: "Calculate percentages for various applications including discounts and tips",
        slug: "percentage",
        category: "math",
        icon: "percent",
      },
    ],
  },
]

export function getAllCalculators(): Calculator[] {
  return calculatorCategories.flatMap((category) => category.calculators)
}

export function getCalculatorBySlug(slug: string): Calculator | undefined {
  return getAllCalculators().find((calculator) => calculator.slug === slug)
}

export function getCalculatorsByCategory(category: string): Calculator[] {
  return getAllCalculators().filter((calculator) => calculator.category === category)
}

export const calculators = getAllCalculators()
