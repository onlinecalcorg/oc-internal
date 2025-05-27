"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "ai/react"
import { Send, Calculator, Sparkles, RotateCcw, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LucideIcon } from "@/components/lucide-icon"
import { Separator } from "@/components/ui/separator"

const calculatorSuggestions = [
  {
    title: "Basic Math",
    examples: ["What is 15% of 250?", "Calculate the square root of 144", "Convert 75°F to Celsius"],
    icon: "calculator",
  },
  {
    title: "Financial",
    examples: [
      "Calculate compound interest on $10,000 at 5% for 10 years",
      "What's the monthly payment on a $300,000 mortgage at 6.5%?",
      "How much should I save for retirement?",
    ],
    icon: "dollar-sign",
  },
  {
    title: "Geometry",
    examples: [
      "Find the area of a circle with radius 8 cm",
      "Calculate the volume of a cylinder 10cm high, 5cm radius",
      "What's the hypotenuse of a triangle with sides 3 and 4?",
    ],
    icon: "triangle",
  },
  {
    title: "Statistics",
    examples: [
      "Calculate the mean of: 12, 15, 18, 22, 25",
      "Find the standard deviation of this dataset",
      "What's the probability of rolling two sixes?",
    ],
    icon: "bar-chart",
  },
  {
    title: "Unit Conversion",
    examples: ["Convert 100 kilometers to miles", "How many ounces in 2.5 liters?", "Convert 1500 watts to horsepower"],
    icon: "arrow-right-left",
  },
  {
    title: "Advanced Math",
    examples: [
      "Solve the quadratic equation: x² + 5x + 6 = 0",
      "Find the derivative of x³ + 2x² - 5x + 1",
      "Calculate the integral of sin(x) from 0 to π",
    ],
    icon: "function-square",
  },
]

export function AiCalculatorClient() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, reload } = useChat({
    api: "/api/ai-calculator",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: `Hello! I'm your AI Calculator Assistant. I can help you with:

• **Basic Math**: Arithmetic, percentages, roots, and more
• **Financial Calculations**: Interest, loans, investments, budgeting
• **Geometry & Trigonometry**: Areas, volumes, angles, distances
• **Statistics**: Mean, median, standard deviation, probability
• **Unit Conversions**: Length, weight, temperature, currency
• **Advanced Math**: Algebra, calculus, equations, graphing

Just ask me any math question in plain English, and I'll provide step-by-step solutions with explanations!

Try asking something like: "What's 15% of $250?" or "Calculate the area of a circle with radius 5 meters"`,
      },
    ],
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSuggestionClick = (suggestion: string) => {
    handleInputChange({ target: { value: suggestion } } as any)
  }

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const formatMessage = (content: string) => {
    // Simple formatting for mathematical expressions
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>')
      .replace(/\n/g, "<br>")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-trust-primary/10">
              <Sparkles className="h-5 w-5 text-trust-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">AI Calculator</h1>
              <p className="text-sm text-muted-foreground">Smart Math Assistant</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => reload()} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            New Chat
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Suggestions Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-trust-primary" />
                  Calculator Suggestions
                </CardTitle>
                <CardDescription>Click on any example to try it out</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {calculatorSuggestions.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <LucideIcon name={category.icon} className="h-4 w-4 text-trust-primary" />
                      <h4 className="font-medium text-sm">{category.title}</h4>
                    </div>
                    <div className="space-y-1">
                      {category.examples.map((example, exampleIndex) => (
                        <button
                          key={exampleIndex}
                          onClick={() => handleSuggestionClick(example)}
                          className="w-full text-left text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 p-2 rounded transition-colors"
                        >
                          "{example}"
                        </button>
                      ))}
                    </div>
                    {categoryIndex < calculatorSuggestions.length - 1 && <Separator className="my-3" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[calc(100vh-200px)] flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">AI Calculator Chat</CardTitle>
                    <CardDescription>Ask any math question and get instant answers with explanations</CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Online
                  </Badge>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-full px-6">
                  <div className="space-y-4 pb-4">
                    {messages.map((message, index) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.role === "assistant" && (
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-trust-primary/10">
                            <Sparkles className="h-4 w-4 text-trust-primary" />
                          </div>
                        )}

                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-3 ${
                            message.role === "user" ? "bg-trust-primary text-white" : "bg-muted"
                          }`}
                        >
                          <div
                            className={`text-sm ${message.role === "user" ? "text-white" : "text-foreground"}`}
                            dangerouslySetInnerHTML={{
                              __html: formatMessage(message.content),
                            }}
                          />

                          {message.role === "assistant" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-2 h-6 px-2 text-xs"
                              onClick={() => copyToClipboard(message.content, index)}
                            >
                              {copiedIndex === index ? (
                                <Check className="h-3 w-3 mr-1" />
                              ) : (
                                <Copy className="h-3 w-3 mr-1" />
                              )}
                              {copiedIndex === index ? "Copied!" : "Copy"}
                            </Button>
                          )}
                        </div>

                        {message.role === "user" && (
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-trust-primary text-white">
                            <span className="text-sm font-medium">You</span>
                          </div>
                        )}
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex gap-3 justify-start">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-trust-primary/10">
                          <Sparkles className="h-4 w-4 text-trust-primary animate-pulse" />
                        </div>
                        <div className="bg-muted rounded-lg px-4 py-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Input Form */}
              <div className="border-t p-4">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Textarea
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask me any math question... (e.g., 'What's 15% of $250?')"
                    className="min-h-[60px] resize-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSubmit(e)
                      }
                    }}
                  />
                  <Button type="submit" disabled={isLoading || !input.trim()} className="shrink-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground mt-2">Press Enter to send, Shift+Enter for new line</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-trust-primary" />
                <CardTitle className="text-lg">Smart Calculations</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Understands natural language and provides step-by-step solutions for complex mathematical problems.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-trust-primary" />
                <CardTitle className="text-lg">AI-Powered</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Powered by advanced AI models to understand context and provide accurate mathematical explanations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <LucideIcon name="book-open" className="h-5 w-5 text-trust-primary" />
                <CardTitle className="text-lg">Educational</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Not just answers - get detailed explanations to help you understand the mathematical concepts.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">How accurate is the AI Calculator?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our AI Calculator uses advanced language models trained on mathematical data to provide highly
                  accurate calculations and explanations. However, always verify critical calculations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">What types of math can it solve?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  From basic arithmetic to advanced calculus, statistics, geometry, financial calculations, and word
                  problems. It can handle most mathematical concepts taught in schools and universities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Is my data private and secure?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Yes, your conversations are processed securely and we don't store personal information. Each chat
                  session is independent and private.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Can I use it for homework help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  The AI provides step-by-step explanations that help you understand the concepts, making it perfect for
                  learning and homework assistance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
