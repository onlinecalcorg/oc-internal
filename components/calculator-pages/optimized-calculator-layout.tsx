import type React from "react"
import { LucideIcon } from "@/components/lucide-icon"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"

interface CalculatorContentLayoutProps {
  title: string
  description: string
  icon: string
  children: React.ReactNode
  useCases: { title: string; description: string }[]
  faqs: { question: string; answer: string }[]
  aboutContent: React.ReactNode
  jsonLd: Record<string, any>
}

export function OptimizedCalculatorLayout({
  title,
  description,
  icon,
  children,
  useCases,
  faqs,
  aboutContent,
  jsonLd,
}: CalculatorContentLayoutProps) {
  return (
    <>
      {/* Add JSON-LD to your page */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container py-8 md:py-12">
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10">
              <LucideIcon name={icon} className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground">{description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Calculator</h2>
              {children}
            </CardContent>
          </Card>

          <div className="space-y-8">
            {useCases.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Use Cases</h2>
                  <div className="space-y-4">
                    {useCases.map((useCase, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:border-primary/50 transition-colors">
                        <h3 className="text-lg font-semibold mb-2 text-primary">{useCase.title}</h3>
                        <p className="text-muted-foreground">{useCase.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {faqs.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">About This Calculator</h2>
            <div className="prose max-w-none dark:prose-invert">{aboutContent}</div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
