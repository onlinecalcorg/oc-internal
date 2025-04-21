import { CalculatorContentLayout } from "./calculator-content-layout"
import MentalHealthCalculator from "@/components/calculators/mental-health-calculator"

export function MentalHealthContent({ jsonLd }: { jsonLd: Record<string, any> }) {
  const useCases = [
    {
      title: "Personal Wellbeing Check-In",
      description:
        "Individuals can regularly assess their mental wellbeing and track changes over time to identify patterns and improvement areas.",
    },
    {
      title: "Preventive Mental Health Maintenance",
      description:
        "People can use the assessment to catch potential mental health concerns early and implement self-care strategies proactively.",
    },
    {
      title: "Preparation for Professional Consultation",
      description:
        "Those considering therapy can use the assessment results to better articulate their concerns when speaking with mental health professionals.",
    },
  ]

  const faqs = [
    {
      question: "Is this assessment a diagnostic tool?",
      answer:
        "No, this self-assessment is for informational purposes only and is not a diagnostic tool. It cannot replace professional evaluation and should not be used to self-diagnose mental health conditions.",
    },
    {
      question: "How were the questions in this assessment developed?",
      answer:
        "The questions are based on validated screening tools commonly used by mental health professionals to assess mood, anxiety, sleep quality, and social connections.",
    },
    {
      question: "What should I do if my results show significant concerns?",
      answer:
        "If your results indicate significant concerns, consider consulting with a mental health professional. The assessment provides resources and recommendations, but professional guidance is important for addressing mental health issues.",
    },
  ]

  const aboutContent = (
    <div className="space-y-6">
      <p>
        Mental wellbeing is a crucial component of overall health. Our Mental Health Self-Assessment helps you evaluate
        different aspects of your mental wellbeing and identify areas for improvement:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative overflow-hidden rounded-lg border border-blue-100 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-800/30 opacity-30"></div>
          <h4 className="relative z-10 text-lg font-semibold text-blue-700 dark:text-blue-300 mb-3">Mood & Emotions</h4>
          <p className="relative z-10 text-gray-700 dark:text-gray-300">
            Assessment of your general mood and emotional state.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-lg border border-purple-100 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-800/30 opacity-30"></div>
          <h4 className="relative z-10 text-lg font-semibold text-purple-700 dark:text-purple-300 mb-3">
            Anxiety & Worry
          </h4>
          <p className="relative z-10 text-gray-700 dark:text-gray-300">
            Evaluation of anxiety levels and worry patterns.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-lg border border-indigo-100 dark:border-indigo-800 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-6">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-800/30 opacity-30"></div>
          <h4 className="relative z-10 text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-3">
            Sleep & Energy
          </h4>
          <p className="relative z-10 text-gray-700 dark:text-gray-300">Analysis of sleep quality and energy levels.</p>
        </div>

        <div className="relative overflow-hidden rounded-lg border border-green-100 dark:border-green-800 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-6">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-16 w-16 rounded-full bg-green-100 dark:bg-green-800/30 opacity-30"></div>
          <h4 className="relative z-10 text-lg font-semibold text-green-700 dark:text-green-300 mb-3">
            Social Connections
          </h4>
          <p className="relative z-10 text-gray-700 dark:text-gray-300">
            Assessment of your social relationships and support network.
          </p>
        </div>
      </div>

      <p>
        The assessment provides a comprehensive overview of your mental wellbeing, highlighting areas of strength and
        potential concern. It offers personalized recommendations based on your results to help you maintain or improve
        your mental health.
      </p>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
        <h3 className="text-xl font-semibold mb-3">How to Use This Assessment</h3>
        <p>
          Complete the questionnaire by answering questions about your experiences over the past two weeks. The
          assessment will analyze your responses and provide a breakdown of results by category, along with tailored
          recommendations and resources for support.
        </p>
        <p className="text-sm text-muted-foreground mt-4">
          <strong>Important Note:</strong> This self-assessment is for informational purposes only and is not a
          diagnostic tool. If you're experiencing significant mental health concerns, please consult with a healthcare
          professional.
        </p>
      </div>
    </div>
  )

  return (
    <CalculatorContentLayout
      title="Mental Health Self-Assessment"
      description="Evaluate your mental wellbeing and get personalized recommendations"
      icon="Brain"
      useCases={useCases}
      faqs={faqs}
      aboutContent={aboutContent}
      jsonLd={jsonLd}
    >
      <MentalHealthCalculator />
    </CalculatorContentLayout>
  )
}
