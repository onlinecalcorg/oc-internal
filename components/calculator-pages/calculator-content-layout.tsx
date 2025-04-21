import type React from "react"
import { LucideIcon } from "@/components/lucide-icon"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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

export function CalculatorContentLayout({
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

      <div className="container py-12">
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10">
              <LucideIcon name={icon} className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          </div>
          <p className="text-xl text-muted-foreground">{description}</p>
        </div>

        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="p-4 border rounded-md mt-4">
            {children}
          </TabsContent>

          <TabsContent value="use-cases" className="p-4 border rounded-md mt-4">
            <h2 className="text-2xl font-bold mb-4">Use Cases</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {useCases.map((useCase, index) => (
                <div key={index} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold mb-2 text-primary">{useCase.title}</h3>
                  <p className="text-muted-foreground">{useCase.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="faq" className="p-4 border rounded-md mt-4">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">About This Calculator</h2>
          <div className="prose max-w-none dark:prose-invert">{aboutContent}</div>
        </div>
      </div>
    </>
  )
}
