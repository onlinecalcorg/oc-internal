import type { Metadata } from "next"
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Online Calculators team for questions, feedback, or support.",
}

export default function ContactPage() {
  return (
    <div className="container py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-trust-primary mb-2">Contact Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions about our calculators? Need help with a specific calculation? We're here to help!
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-trust-primary" />
                  Get In Touch
                </CardTitle>
                <CardDescription>We'd love to hear from you. Here's how you can reach us.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-trust-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Email Us</h3>
                    <p className="text-sm text-muted-foreground">
                      <a href="mailto:info@online-calculators.com" className="calculator-link">
                        info@online-calculators.com
                      </a>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">We typically respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-trust-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Call Us</h3>
                    <p className="text-sm text-muted-foreground">
                      <a href="tel:+18005551234" className="calculator-link">
                        (800) 555-1234
                      </a>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Monday-Friday, 9am-5pm EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-trust-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Visit Us</h3>
                    <p className="text-sm text-muted-foreground">
                      123 Calculator Way
                      <br />
                      Suite 456
                      <br />
                      San Francisco, CA 94105
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>FAQ</CardTitle>
                <CardDescription>Common questions about our calculators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="calculator-faq-item pb-3">
                  <h3 className="font-medium calculator-faq-trigger">Are the calculators free to use?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Yes, all our calculators are completely free to use with no hidden fees or subscriptions.
                  </p>
                </div>

                <div className="calculator-faq-item pb-3">
                  <h3 className="font-medium calculator-faq-trigger">How accurate are the calculations?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Our calculators use industry-standard formulas and are regularly updated, but they should be used as
                    estimates rather than definitive answers.
                  </p>
                </div>

                <div className="calculator-faq-item pb-3">
                  <h3 className="font-medium calculator-faq-trigger">Is my data secure?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    All calculations are performed in your browser. We don't store any of the data you input into our
                    calculators.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select>
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="bug">Report a Bug</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="calculator">Related Calculator (Optional)</Label>
                    <Select>
                      <SelectTrigger id="calculator">
                        <SelectValue placeholder="Select a calculator" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="retirement">Retirement Savings Calculator</SelectItem>
                        <SelectItem value="mortgage">Mortgage Calculator</SelectItem>
                        <SelectItem value="carbon">Carbon Footprint Calculator</SelectItem>
                        <SelectItem value="ev">Electric Vehicle Cost Calculator</SelectItem>
                        <SelectItem value="solar">Solar Panel Savings Calculator</SelectItem>
                        <SelectItem value="vacation">Vacation Cost Calculator</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Please describe your question or issue in detail..." rows={6} />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button className="w-full calculator-button-primary">Send Message</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
