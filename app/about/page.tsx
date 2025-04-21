import type { Metadata } from "next"
import { Calculator, Leaf, DollarSign, Brain } from "lucide-react"

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Online Calculators and our mission to provide modern, user-friendly calculators for informed decision-making.",
}

export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-6">About Online Calculators</h1>

        <div className="prose max-w-none dark:prose-invert">
          <p>
            Online Calculators is a comprehensive collection of modern, user-friendly calculators designed to help you
            make informed decisions in various aspects of your life. Our calculators address key issues from economic
            planning and sustainability to technology impact and health assessment.
          </p>

          <h2>Our Mission</h2>
          <p>
            Our mission is to provide accessible, accurate, and easy-to-use calculation tools that empower individuals
            and organizations to make data-driven decisions. We believe that by quantifying the impact of our choices,
            we can make better decisions for ourselves, our communities, and our planet.
          </p>

          <h2>Our Calculators</h2>
          <p>We offer calculators across four main categories:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-6">
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Economic Planning</h3>
              </div>
              <p className="text-muted-foreground">
                Plan your finances with precision using our economic calculators for vacation costs, retirement savings,
                and mortgage payments.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Sustainability</h3>
              </div>
              <p className="text-muted-foreground">
                Measure and reduce your environmental impact with calculators for carbon footprint, solar panel savings,
                and food waste reduction.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Technology Impact</h3>
              </div>
              <p className="text-muted-foreground">
                Evaluate the costs and benefits of modern technology investments, including electric vehicles, AI
                implementation, and 5G upgrades.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Health & Wellbeing</h3>
              </div>
              <p className="text-muted-foreground">
                Monitor and improve your health with calculators for mental health assessment, nutrition planning, and
                productivity impact.
              </p>
            </div>
          </div>

          <h2>Our Approach</h2>
          <p>All our calculators are built with the following principles in mind:</p>
          <ul>
            <li>
              <strong>Accuracy:</strong> We use reliable data sources and validated formulas to ensure our calculations
              are accurate and trustworthy.
            </li>
            <li>
              <strong>Usability:</strong> Our calculators feature intuitive interfaces that make complex calculations
              simple and accessible to everyone.
            </li>
            <li>
              <strong>Transparency:</strong> We provide clear explanations of our methodologies and assumptions so you
              understand how results are calculated.
            </li>
            <li>
              <strong>Relevance:</strong> Our calculators address real-world issues and scenarios that matter in today's
              rapidly changing world.
            </li>
            <li>
              <strong>Accessibility:</strong> We design our calculators to be accessible to all users, including those
              with disabilities.
            </li>
          </ul>

          <h2>Stay Connected</h2>
          <p>
            We're constantly updating our calculator suite with new tools and improvements. Sign up for our newsletter
            to stay informed about new calculators and features, or follow us on social media for the latest updates.
          </p>

          <h2>Contact Us</h2>
          <p>
            Have a suggestion for a new calculator or feedback on an existing one? We'd love to hear from you! Contact
            us at <a href="mailto:info@online-calculators.com">info@online-calculators.com</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
