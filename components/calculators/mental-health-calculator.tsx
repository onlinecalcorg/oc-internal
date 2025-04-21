"use client"

import { useState } from "react"
import { Brain, Heart, ArrowRight, ExternalLink, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"

export default function MentalHealthCalculator() {
  // Assessment state
  const [currentSection, setCurrentSection] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [assessmentComplete, setAssessmentComplete] = useState(false)

  // Personal information
  const [age, setAge] = useState("adult") // child, teen, adult, senior
  const [gender, setGender] = useState("") // male, female, non-binary, prefer-not-to-say
  const [sleepHours, setSleepHours] = useState(7)
  const [exerciseFrequency, setExerciseFrequency] = useState(2) // days per week

  // Assessment sections
  const sections = [
    {
      title: "Mood & Emotions",
      description: "These questions assess your general mood and emotional state over the past two weeks.",
      questions: [
        {
          id: "mood1",
          text: "I have felt sad, down, or depressed",
          options: [
            { value: 0, label: "Not at all" },
            { value: 1, label: "Several days" },
            { value: 2, label: "More than half the days" },
            { value: 3, label: "Nearly every day" },
          ],
        },
        {
          id: "mood2",
          text: "I have had little interest or pleasure in doing things I usually enjoy",
          options: [
            { value: 0, label: "Not at all" },
            { value: 1, label: "Several days" },
            { value: 2, label: "More than half the days" },
            { value: 3, label: "Nearly every day" },
          ],
        },
        {
          id: "mood3",
          text: "I have felt hopeful about the future",
          options: [
            { value: 3, label: "Not at all" },
            { value: 2, label: "Several days" },
            { value: 1, label: "More than half the days" },
            { value: 0, label: "Nearly every day" },
          ],
        },
      ],
    },
    {
      title: "Anxiety & Worry",
      description: "These questions assess your level of anxiety and worry over the past two weeks.",
      questions: [
        {
          id: "anxiety1",
          text: "I have felt nervous, anxious, or on edge",
          options: [
            { value: 0, label: "Not at all" },
            { value: 1, label: "Several days" },
            { value: 2, label: "More than half the days" },
            { value: 3, label: "Nearly every day" },
          ],
        },
        {
          id: "anxiety2",
          text: "I have not been able to stop or control worrying",
          options: [
            { value: 0, label: "Not at all" },
            { value: 1, label: "Several days" },
            { value: 2, label: "More than half the days" },
            { value: 3, label: "Nearly every day" },
          ],
        },
        {
          id: "anxiety3",
          text: "I have had trouble relaxing",
          options: [
            { value: 0, label: "Not at all" },
            { value: 1, label: "Several days" },
            { value: 2, label: "More than half the days" },
            { value: 3, label: "Nearly every day" },
          ],
        },
      ],
    },
    {
      title: "Sleep & Energy",
      description: "These questions assess your sleep quality and energy levels over the past two weeks.",
      questions: [
        {
          id: "sleep1",
          text: "I have had trouble falling or staying asleep, or sleeping too much",
          options: [
            { value: 0, label: "Not at all" },
            { value: 1, label: "Several days" },
            { value: 2, label: "More than half the days" },
            { value: 3, label: "Nearly every day" },
          ],
        },
        {
          id: "sleep2",
          text: "I have felt tired or had little energy",
          options: [
            { value: 0, label: "Not at all" },
            { value: 1, label: "Several days" },
            { value: 2, label: "More than half the days" },
            { value: 3, label: "Nearly every day" },
          ],
        },
        {
          id: "sleep3",
          text: "I have felt well-rested after sleeping",
          options: [
            { value: 3, label: "Not at all" },
            { value: 2, label: "Several days" },
            { value: 1, label: "More than half the days" },
            { value: 0, label: "Nearly every day" },
          ],
        },
      ],
    },
    {
      title: "Social Connections",
      description: "These questions assess your social connections and relationships over the past two weeks.",
      questions: [
        {
          id: "social1",
          text: "I have felt connected to other people",
          options: [
            { value: 3, label: "Not at all" },
            { value: 2, label: "Several days" },
            { value: 1, label: "More than half the days" },
            { value: 0, label: "Nearly every day" },
          ],
        },
        {
          id: "social2",
          text: "I have felt supported by others in my life",
          options: [
            { value: 3, label: "Not at all" },
            { value: 2, label: "Several days" },
            { value: 1, label: "More than half the days" },
            { value: 0, label: "Nearly every day" },
          ],
        },
        {
          id: "social3",
          text: "I have avoided social situations or interactions with others",
          options: [
            { value: 0, label: "Not at all" },
            { value: 1, label: "Several days" },
            { value: 2, label: "More than half the days" },
            { value: 3, label: "Nearly every day" },
          ],
        },
      ],
    },
  ]

  // Handle answer selection
  const handleAnswerSelect = (questionId: string, value: number) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    })
  }

  // Navigate to next section
  const handleNextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1)
    } else {
      setAssessmentComplete(true)
    }
  }

  // Navigate to previous section
  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  // Check if current section is complete
  const isCurrentSectionComplete = () => {
    const currentQuestions = sections[currentSection].questions
    return currentQuestions.every((question) => answers[question.id] !== undefined)
  }

  // Calculate assessment results
  const calculateResults = () => {
    // Calculate scores for each category
    const moodScore = (answers.mood1 || 0) + (answers.mood2 || 0) + (answers.mood3 || 0)
    const anxietyScore = (answers.anxiety1 || 0) + (answers.anxiety2 || 0) + (answers.anxiety3 || 0)
    const sleepScore = (answers.sleep1 || 0) + (answers.sleep2 || 0) + (answers.sleep3 || 0)
    const socialScore = (answers.social1 || 0) + (answers.social2 || 0) + (answers.social3 || 0)

    // Calculate total score
    const totalScore = moodScore + anxietyScore + sleepScore + socialScore
    const maxPossibleScore = 36 // 12 questions * max score of 3

    // Calculate percentage scores
    const moodPercentage = (moodScore / 9) * 100
    const anxietyPercentage = (anxietyScore / 9) * 100
    const sleepPercentage = (sleepScore / 9) * 100
    const socialPercentage = (socialScore / 9) * 100
    const totalPercentage = (totalScore / maxPossibleScore) * 100

    // Determine overall mental health status
    let status = ""
    let statusColor = ""

    if (totalPercentage < 25) {
      status = "Good"
      statusColor = "text-trust-success"
    } else if (totalPercentage < 50) {
      status = "Mild Concerns"
      statusColor = "text-yellow-500"
    } else if (totalPercentage < 75) {
      status = "Moderate Concerns"
      statusColor = "text-orange-500"
    } else {
      status = "Significant Concerns"
      statusColor = "text-destructive"
    }

    return {
      moodScore,
      anxietyScore,
      sleepScore,
      socialScore,
      totalScore,
      moodPercentage,
      anxietyPercentage,
      sleepPercentage,
      socialPercentage,
      totalPercentage,
      status,
      statusColor,
    }
  }

  // Generate recommendations based on results
  const generateRecommendations = () => {
    const results = calculateResults()
    const recommendations = []

    // Mood recommendations
    if (results.moodPercentage >= 50) {
      recommendations.push({
        category: "mood",
        title: "Practice Gratitude",
        description:
          "Take a few minutes each day to write down three things you're grateful for to help shift focus to positive aspects of life.",
        priority: results.moodPercentage >= 75 ? "high" : "medium",
      })
      recommendations.push({
        category: "mood",
        title: "Consider Professional Support",
        description:
          "Your responses suggest you may benefit from speaking with a mental health professional about your mood.",
        priority: results.moodPercentage >= 75 ? "high" : "medium",
      })
    }

    // Anxiety recommendations
    if (results.anxietyPercentage >= 50) {
      recommendations.push({
        category: "anxiety",
        title: "Try Deep Breathing Exercises",
        description: "Practice deep breathing for 5 minutes daily: breathe in for 4 counts, hold for 2, exhale for 6.",
        priority: results.anxietyPercentage >= 75 ? "high" : "medium",
      })
      recommendations.push({
        category: "anxiety",
        title: "Limit Caffeine and Alcohol",
        description:
          "Both can worsen anxiety symptoms. Consider reducing intake, especially in the afternoon and evening.",
        priority: results.anxietyPercentage >= 75 ? "high" : "medium",
      })
    }

    // Sleep recommendations
    if (results.sleepPercentage >= 50) {
      recommendations.push({
        category: "sleep",
        title: "Establish a Sleep Routine",
        description:
          "Go to bed and wake up at the same time every day, even on weekends, to regulate your body's internal clock.",
        priority: results.sleepPercentage >= 75 ? "high" : "medium",
      })
      recommendations.push({
        category: "sleep",
        title: "Create a Restful Environment",
        description: "Keep your bedroom cool, quiet, and dark. Remove electronic devices that emit blue light.",
        priority: results.sleepPercentage >= 75 ? "high" : "medium",
      })
    }

    // Social recommendations
    if (results.socialPercentage >= 50) {
      recommendations.push({
        category: "social",
        title: "Schedule Regular Social Interactions",
        description:
          "Plan at least one social activity each week, even if it's just a short coffee or video call with a friend.",
        priority: results.socialPercentage >= 75 ? "high" : "medium",
      })
      recommendations.push({
        category: "social",
        title: "Join a Group or Class",
        description:
          "Consider joining a group based on your interests to meet like-minded people in a low-pressure environment.",
        priority: results.socialPercentage >= 75 ? "high" : "medium",
      })
    }

    // General recommendations for everyone
    recommendations.push({
      category: "general",
      title: "Regular Physical Activity",
      description:
        "Aim for at least 30 minutes of moderate exercise most days of the week to boost mood and reduce anxiety.",
      priority: exerciseFrequency < 3 ? "high" : "medium",
    })

    recommendations.push({
      category: "general",
      title: "Mindfulness Practice",
      description: "Spend 5-10 minutes daily practicing mindfulness meditation to improve focus and reduce stress.",
      priority: "medium",
    })

    // Sort recommendations by priority
    return recommendations.sort((a, b) => {
      if (a.priority === "high" && b.priority !== "high") return -1
      if (a.priority !== "high" && b.priority === "high") return 1
      return 0
    })
  }

  const results = assessmentComplete ? calculateResults() : null
  const recommendations = assessmentComplete ? generateRecommendations() : []

  return (
    <div className="space-y-6">
      {!assessmentComplete ? (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-trust-primary">{sections[currentSection].title}</CardTitle>
                <CardDescription>{sections[currentSection].description}</CardDescription>
              </div>
              <div className="text-sm text-muted-foreground">
                Section {currentSection + 1} of {sections.length}
              </div>
            </div>
            <Progress value={((currentSection + 1) / sections.length) * 100} className="h-2 mt-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            {sections[currentSection].questions.map((question) => (
              <div key={question.id} className="space-y-3">
                <Label className="text-base">{question.text}</Label>
                <RadioGroup
                  value={answers[question.id]?.toString() || ""}
                  onValueChange={(value) => handleAnswerSelect(question.id, Number.parseInt(value))}
                >
                  <div className="grid gap-2">
                    {question.options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value.toString()} id={`${question.id}-${option.value}`} />
                        <Label htmlFor={`${question.id}-${option.value}`} className="font-normal">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevSection} disabled={currentSection === 0}>
              Previous
            </Button>
            <Button onClick={handleNextSection} disabled={!isCurrentSectionComplete()}>
              {currentSection < sections.length - 1 ? "Next" : "Complete Assessment"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="calculator-result-card">
            <CardHeader>
              <CardTitle className="text-trust-primary">Mental Health Assessment Results</CardTitle>
              <CardDescription>Based on your responses to the assessment questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <span className={`text-2xl font-bold ${results?.statusColor}`}>{results?.status}</span>
                <p className="text-sm text-muted-foreground">Overall mental wellbeing status</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Mood & Emotions</span>
                    <span>{Math.round(results?.moodPercentage || 0)}% concern level</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${results?.moodPercentage || 0 >= 75 ? "bg-destructive" : results?.moodPercentage || 0 >= 50 ? "bg-orange-500" : results?.moodPercentage || 0 >= 25 ? "bg-yellow-500" : "bg-trust-success"}`}
                      style={{ width: `${results?.moodPercentage || 0}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Anxiety & Worry</span>
                    <span>{Math.round(results?.anxietyPercentage || 0)}% concern level</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${results?.anxietyPercentage || 0 >= 75 ? "bg-destructive" : results?.anxietyPercentage || 0 >= 50 ? "bg-orange-500" : results?.anxietyPercentage || 0 >= 25 ? "bg-yellow-500" : "bg-trust-success"}`}
                      style={{ width: `${results?.anxietyPercentage || 0}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Sleep & Energy</span>
                    <span>{Math.round(results?.sleepPercentage || 0)}% concern level</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${results?.sleepPercentage || 0 >= 75 ? "bg-destructive" : results?.sleepPercentage || 0 >= 50 ? "bg-orange-500" : results?.sleepPercentage || 0 >= 25 ? "bg-yellow-500" : "bg-trust-success"}`}
                      style={{ width: `${results?.sleepPercentage || 0}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Social Connections</span>
                    <span>{Math.round(results?.socialPercentage || 0)}% concern level</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${results?.socialPercentage || 0 >= 75 ? "bg-destructive" : results?.socialPercentage || 0 >= 50 ? "bg-orange-500" : results?.socialPercentage || 0 >= 25 ? "bg-yellow-500" : "bg-trust-success"}`}
                      style={{ width: `${results?.socialPercentage || 0}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-4">
                  This assessment is for informational purposes only and is not a diagnostic tool. If you're
                  experiencing significant mental health concerns, please consult with a healthcare professional.
                </p>
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setAssessmentComplete(false)
                      setCurrentSection(0)
                    }}
                  >
                    Retake Assessment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-trust-primary">Personalized Recommendations</CardTitle>
              <CardDescription>Based on your assessment results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((recommendation, index) => (
                  <div key={index} className="p-3 border rounded-md">
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className={`p-1 rounded-full ${
                          recommendation.category === "mood"
                            ? "bg-blue-500/20 text-blue-500"
                            : recommendation.category === "anxiety"
                              ? "bg-purple-500/20 text-purple-500"
                              : recommendation.category === "sleep"
                                ? "bg-indigo-500/20 text-indigo-500"
                                : recommendation.category === "social"
                                  ? "bg-green-500/20 text-green-500"
                                  : "bg-trust-primary/20 text-trust-primary"
                        }`}
                      >
                        {recommendation.category === "mood" && <Heart className="h-4 w-4" />}
                        {recommendation.category === "anxiety" && <Brain className="h-4 w-4" />}
                        {recommendation.category === "sleep" && <Brain className="h-4 w-4" />}
                        {recommendation.category === "social" && <Brain className="h-4 w-4" />}
                        {recommendation.category === "general" && <Info className="h-4 w-4" />}
                      </div>
                      <h3 className="font-medium">{recommendation.title}</h3>
                      <div
                        className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                          recommendation.priority === "high"
                            ? "bg-destructive/20 text-destructive"
                            : "bg-trust-primary/20 text-trust-primary"
                        }`}
                      >
                        {recommendation.priority === "high" ? "High Priority" : "Recommended"}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                  </div>
                ))}

                <div className="mt-4 p-4 bg-trust-primary/5 rounded-lg">
                  <h3 className="text-sm font-medium text-trust-primary mb-2">Mental Health Resources</h3>
                  <div className="space-y-2 text-sm">
                    <a
                      href="https://www.nimh.nih.gov/health/find-help"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="calculator-external-link"
                    >
                      National Institute of Mental Health <ExternalLink className="calculator-external-link-icon" />
                    </a>
                    <a
                      href="https://www.samhsa.gov/find-help/national-helpline"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="calculator-external-link"
                    >
                      SAMHSA's National Helpline: 1-800-662-4357{" "}
                      <ExternalLink className="calculator-external-link-icon" />
                    </a>
                    <a
                      href="https://988lifeline.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="calculator-external-link"
                    >
                      988 Suicide & Crisis Lifeline <ExternalLink className="calculator-external-link-icon" />
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {!assessmentComplete && (
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="about">About This Assessment</TabsTrigger>
            <TabsTrigger value="privacy">Privacy Information</TabsTrigger>
            <TabsTrigger value="disclaimer">Disclaimer</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="p-4 border rounded-md mt-4">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">About the Mental Health Self-Assessment</h3>
              <p className="text-muted-foreground">
                This assessment is designed to help you evaluate different aspects of your mental wellbeing, including
                mood, anxiety, sleep, and social connections. The questions are based on validated screening tools used
                by mental health professionals.
              </p>
              <p className="text-muted-foreground">
                The assessment consists of {sections.length} sections with{" "}
                {sections.reduce((total, section) => total + section.questions.length, 0)} questions total. It takes
                approximately 5-7 minutes to complete.
              </p>
              <h4 className="font-medium mt-4">What This Assessment Measures</h4>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Mood and emotional wellbeing</li>
                <li>Anxiety and worry levels</li>
                <li>Sleep quality and energy</li>
                <li>Social connections and support</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="privacy" className="p-4 border rounded-md mt-4">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Privacy Information</h3>
              <p className="text-muted-foreground">
                Your privacy is important to us. All calculations and assessments are performed locally in your browser.
                We do not store or transmit your responses or results.
              </p>
              <p className="text-muted-foreground">This means:</p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Your responses are not saved after you leave this page</li>
                <li>No personal data is collected or stored</li>
                <li>No information is shared with third parties</li>
              </ul>
              <p className="text-muted-foreground">
                You can feel comfortable answering honestly, knowing that your information remains private.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="disclaimer" className="p-4 border rounded-md mt-4">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Important Disclaimer</h3>
              <p className="text-muted-foreground">
                This self-assessment tool is for informational and educational purposes only. It is not a diagnostic
                instrument and is not intended to replace professional medical advice, diagnosis, or treatment.
              </p>
              <p className="text-muted-foreground">
                The results of this assessment should not be used for self-diagnosis or to make decisions about your
                health. Always consult with a qualified healthcare provider regarding any questions or concerns you may
                have about your mental health.
              </p>
              <p className="text-muted-foreground">
                If you're experiencing thoughts of harming yourself or others, please seek immediate help by calling the
                988 Suicide & Crisis Lifeline at 988, or go to your nearest emergency room.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
