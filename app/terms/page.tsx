import type { Metadata } from "next"
import Link from "next/link"
import { FileText, AlertTriangle, Scale, HelpCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for Calculator Suite 2025, outlining the rules and guidelines for using our calculator services.",
}

export default function TermsPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="h-6 w-6 text-trust-primary" />
          <h1 className="text-3xl font-bold tracking-tight text-trust-primary">Terms of Service</h1>
        </div>

        <div className="text-sm text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </div>

        <div className="prose max-w-none dark:prose-invert">
          <p>
            Welcome to Calculator Suite. These Terms of Service ("Terms") govern your use of our website and calculator
            services. By accessing or using our services, you agree to be bound by these Terms.
          </p>

          <h2 className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-trust-primary" />
            Use of Services
          </h2>

          <h3>License</h3>
          <p>
            Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, and revocable license to
            use our calculator services for personal, non-commercial purposes.
          </p>

          <h3>Restrictions</h3>
          <p>You agree not to:</p>
          <ul>
            <li>
              Use our services for any illegal purpose or in violation of any local, state, national, or international
              law
            </li>
            <li>Violate or infringe other people's intellectual property, privacy, or other rights</li>
            <li>Interfere with or disrupt the integrity or performance of our services</li>
            <li>Attempt to gain unauthorized access to our services or related systems</li>
            <li>Use any robot, spider, crawler, scraper, or other automated means to access our services</li>
            <li>Bypass measures we may use to prevent or restrict access to our services</li>
          </ul>

          <h2 className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-trust-primary" />
            Disclaimer of Warranties
          </h2>

          <p>
            Our services are provided "as is" and "as available" without warranties of any kind, either express or
            implied, including, but not limited to, implied warranties of merchantability, fitness for a particular
            purpose, or non-infringement.
          </p>

          <p>We do not warrant that:</p>
          <ul>
            <li>Our services will function uninterrupted, secure, or available at any particular time or location</li>
            <li>Any errors or defects will be corrected</li>
            <li>Our services are free of viruses or other harmful components</li>
            <li>The results of using our services will meet your requirements</li>
          </ul>

          <h3>Calculator Accuracy</h3>
          <p>
            While we strive to provide accurate calculations, our calculators are designed for informational and
            educational purposes only. The results provided by our calculators should not be considered as financial,
            legal, tax, or professional advice. We recommend consulting with appropriate professionals for advice
            specific to your situation.
          </p>

          <h2>Limitation of Liability</h2>

          <p>
            To the maximum extent permitted by law, in no event shall Calculator Suite, its directors, employees,
            partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential,
            or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible
            losses, resulting from:
          </p>
          <ul>
            <li>Your access to or use of or inability to access or use our services</li>
            <li>Any conduct or content of any third party on our services</li>
            <li>Any content obtained from our services</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content</li>
          </ul>

          <h2>Indemnification</h2>

          <p>
            You agree to defend, indemnify, and hold harmless Calculator Suite, its directors, employees, partners,
            agents, suppliers, and affiliates from and against any claims, liabilities, damages, losses, and expenses,
            including without limitation reasonable attorney's fees and costs, arising out of or in any way connected
            with your access to or use of our services or your violation of these Terms.
          </p>

          <h2>Changes to Terms</h2>

          <p>
            We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
            provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change
            will be determined at our sole discretion.
          </p>

          <h2>Governing Law</h2>

          <p>
            These Terms shall be governed and construed in accordance with the laws of the United States, without regard
            to its conflict of law provisions.
          </p>

          <h2 className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-trust-primary" />
            Contact Us
          </h2>

          <p>If you have any questions about these Terms, please contact us at:</p>
          <ul>
            <li>Email: terms@calculatorsuite.com</li>
            <li>Address: 123 Calculator Way, Suite 456, San Francisco, CA 94105</li>
          </ul>

          <div className="mt-8 p-4 bg-trust-primary/5 rounded-lg">
            <h3 className="text-trust-primary font-medium">Questions About Our Terms?</h3>
            <p className="text-sm">
              If you have any questions or concerns about our Terms of Service, we're here to help.
            </p>
            <div className="mt-4">
              <Link href="/contact" className="calculator-link">
                Contact Our Support Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
