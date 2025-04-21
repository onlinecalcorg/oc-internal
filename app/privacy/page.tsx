import type { Metadata } from "next"
import Link from "next/link"
import { Shield, Lock, Eye, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Calculator Suite 2025, detailing how we collect, use, and protect your information.",
}

export default function PrivacyPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="h-6 w-6 text-trust-primary" />
          <h1 className="text-3xl font-bold tracking-tight text-trust-primary">Privacy Policy</h1>
        </div>

        <div className="text-sm text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </div>

        <div className="prose max-w-none dark:prose-invert">
          <p>
            At Calculator Suite, we take your privacy seriously. This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you use our calculator services.
          </p>

          <h2 className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-trust-primary" />
            Information We Collect
          </h2>

          <p>We collect information in several ways:</p>

          <h3>Information You Provide</h3>
          <p>
            When you use our calculators, you may input various data points depending on the calculator type. This could
            include financial information, energy usage data, health metrics, or other personal information necessary
            for the calculator to function properly.
          </p>

          <h3>Automatically Collected Information</h3>
          <p>We may automatically collect certain information about your device, including:</p>
          <ul>
            <li>IP address</li>
            <li>Browser type</li>
            <li>Operating system</li>
            <li>Access times</li>
            <li>Pages viewed</li>
            <li>Other usage information</li>
          </ul>

          <h3>Cookies and Similar Technologies</h3>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and hold certain
            information. Cookies are files with small amounts of data that may include an anonymous unique identifier.
          </p>

          <h2 className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-trust-primary" />
            How We Use Your Information
          </h2>

          <p>We use the information we collect for various purposes, including:</p>
          <ul>
            <li>Providing and maintaining our calculator services</li>
            <li>Improving and personalizing user experience</li>
            <li>Analyzing usage patterns and trends</li>
            <li>Developing new features and functionality</li>
            <li>Communicating with you about updates or changes to our services</li>
            <li>Preventing fraudulent activity and enhancing security</li>
          </ul>

          <h2 className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-trust-primary" />
            Data Security
          </h2>

          <p>
            We implement appropriate technical and organizational measures to protect your personal information from
            unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the
            Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2>Data Retention</h2>

          <p>
            We retain your personal information only for as long as necessary to fulfill the purposes outlined in this
            Privacy Policy, unless a longer retention period is required or permitted by law.
          </p>

          <h2>Third-Party Services</h2>

          <p>
            Our website may contain links to third-party websites or services that are not owned or controlled by
            Calculator Suite. We have no control over and assume no responsibility for the content, privacy policies, or
            practices of any third-party websites or services.
          </p>

          <h2>Children's Privacy</h2>

          <p>
            Our services are not intended for use by children under the age of 13. We do not knowingly collect personal
            information from children under 13. If you are a parent or guardian and believe your child has provided us
            with personal information, please contact us.
          </p>

          <h2>Changes to This Privacy Policy</h2>

          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last updated" date.
          </p>

          <h2>Contact Us</h2>

          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <ul>
            <li>Email: privacy@calculatorsuite.com</li>
            <li>Address: 123 Calculator Way, Suite 456, San Francisco, CA 94105</li>
          </ul>

          <div className="mt-8 p-4 bg-trust-primary/5 rounded-lg">
            <h3 className="text-trust-primary font-medium">Your Privacy Choices</h3>
            <p className="text-sm">
              You have the right to access, correct, or delete your personal information. To exercise these rights,
              please contact us using the information provided above.
            </p>
            <div className="mt-4">
              <Link href="/contact" className="calculator-link">
                Contact Us About Your Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
