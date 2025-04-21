"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ScientificCalculator() {
  const [display, setDisplay] = useState("0")
  const [memory, setMemory] = useState<number | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(true)
  const [pendingOperator, setPendingOperator] = useState<string | null>(null)
  const [calculationHistory, setCalculationHistory] = useState<string[]>([])
  const [lastValue, setLastValue] = useState<number>(0)
  const [angleMode, setAngleMode] = useState<"DEG" | "RAD">("DEG")

  // Clear the calculator
  const clearAll = () => {
    setDisplay("0")
    setWaitingForOperand(true)
    setPendingOperator(null)
  }

  // Handle digit input
  const digitPressed = (digit: string) => {
    let newDisplay = display

    if ((display === "0" && digit !== ".") || waitingForOperand) {
      newDisplay = digit
      setWaitingForOperand(false)
    } else {
      newDisplay = display + digit
    }

    setDisplay(newDisplay)
  }

  // Handle decimal point
  const decimalPressed = () => {
    let newDisplay = display

    if (waitingForOperand) {
      newDisplay = "0."
      setWaitingForOperand(false)
    } else if (display.indexOf(".") === -1) {
      newDisplay = display + "."
    }

    setDisplay(newDisplay)
  }

  // Handle operators
  const operatorPressed = (operator: string) => {
    const operand = Number.parseFloat(display)

    if (pendingOperator !== null) {
      const result = calculate(lastValue, operand, pendingOperator)
      setDisplay(String(result))
      setLastValue(result)
      setCalculationHistory([...calculationHistory, `${lastValue} ${pendingOperator} ${operand} = ${result}`])
    } else {
      setLastValue(operand)
    }

    setWaitingForOperand(true)
    setPendingOperator(operator)
  }

  // Calculate result
  const calculate = (leftOperand: number, rightOperand: number, operator: string): number => {
    switch (operator) {
      case "+":
        return leftOperand + rightOperand
      case "-":
        return leftOperand - rightOperand
      case "×":
        return leftOperand * rightOperand
      case "÷":
        return leftOperand / rightOperand
      case "^":
        return Math.pow(leftOperand, rightOperand)
      default:
        return rightOperand
    }
  }

  // Handle equals button
  const equalsPressed = () => {
    const operand = Number.parseFloat(display)

    if (pendingOperator !== null) {
      const result = calculate(lastValue, operand, pendingOperator)
      setDisplay(String(result))
      setCalculationHistory([...calculationHistory, `${lastValue} ${pendingOperator} ${operand} = ${result}`])
      setLastValue(result)
      setPendingOperator(null)
    }

    setWaitingForOperand(true)
  }

  // Handle backspace
  const backspacePressed = () => {
    if (!waitingForOperand) {
      if (display.length > 1) {
        setDisplay(display.substring(0, display.length - 1))
      } else {
        setDisplay("0")
        setWaitingForOperand(true)
      }
    }
  }

  // Handle memory functions
  const memoryStore = () => {
    setMemory(Number.parseFloat(display))
  }

  const memoryRecall = () => {
    if (memory !== null) {
      setDisplay(String(memory))
      setWaitingForOperand(true)
    }
  }

  const memoryClear = () => {
    setMemory(null)
  }

  const memoryAdd = () => {
    if (memory !== null) {
      setMemory(memory + Number.parseFloat(display))
    } else {
      setMemory(Number.parseFloat(display))
    }
    setWaitingForOperand(true)
  }

  // Handle scientific functions
  const scientificFunction = (func: string) => {
    const operand = Number.parseFloat(display)
    let result = 0

    switch (func) {
      case "sin":
        result = angleMode === "DEG" ? Math.sin((operand * Math.PI) / 180) : Math.sin(operand)
        break
      case "cos":
        result = angleMode === "DEG" ? Math.cos((operand * Math.PI) / 180) : Math.cos(operand)
        break
      case "tan":
        result = angleMode === "DEG" ? Math.tan((operand * Math.PI) / 180) : Math.tan(operand)
        break
      case "log":
        result = Math.log10(operand)
        break
      case "ln":
        result = Math.log(operand)
        break
      case "sqrt":
        result = Math.sqrt(operand)
        break
      case "square":
        result = operand * operand
        break
      case "1/x":
        result = 1 / operand
        break
      case "exp":
        result = Math.exp(operand)
        break
      case "pi":
        result = Math.PI
        break
      case "e":
        result = Math.E
        break
      case "+/-":
        result = -operand
        break
      case "%":
        result = operand / 100
        break
      default:
        result = operand
    }

    setDisplay(String(result))
    setWaitingForOperand(true)
    setCalculationHistory([...calculationHistory, `${func}(${operand}) = ${result}`])
  }

  // Toggle angle mode
  const toggleAngleMode = () => {
    setAngleMode(angleMode === "DEG" ? "RAD" : "DEG")
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Scientific Calculator</CardTitle>
        <CardDescription>Perform complex mathematical calculations</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="calculator" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium">
                {memory !== null ? "M" : ""} {angleMode}
              </div>
              <Button variant="outline" size="sm" onClick={toggleAngleMode}>
                {angleMode}
              </Button>
            </div>

            <div className="relative">
              <Input
                className="text-right text-2xl h-16 font-mono"
                value={display}
                readOnly
                aria-label="Calculator display"
              />
            </div>

            <div className="grid grid-cols-5 gap-2">
              {/* Memory functions */}
              <Button variant="outline" size="sm" onClick={memoryClear}>
                MC
              </Button>
              <Button variant="outline" size="sm" onClick={memoryRecall}>
                MR
              </Button>
              <Button variant="outline" size="sm" onClick={memoryStore}>
                MS
              </Button>
              <Button variant="outline" size="sm" onClick={memoryAdd}>
                M+
              </Button>
              <Button variant="outline" size="sm" onClick={() => scientificFunction("+/-")}>
                +/-
              </Button>

              {/* Scientific functions - Row 1 */}
              <Button variant="outline" size="sm" onClick={() => scientificFunction("sin")}>
                sin
              </Button>
              <Button variant="outline" size="sm" onClick={() => scientificFunction("cos")}>
                cos
              </Button>
              <Button variant="outline" size="sm" onClick={() => scientificFunction("tan")}>
                tan
              </Button>
              <Button variant="outline" size="sm" onClick={() => scientificFunction("log")}>
                log
              </Button>
              <Button variant="outline" size="sm" onClick={() => scientificFunction("ln")}>
                ln
              </Button>

              {/* Scientific functions - Row 2 */}
              <Button variant="outline" size="sm" onClick={() => scientificFunction("sqrt")}>
                √
              </Button>
              <Button variant="outline" size="sm" onClick={() => scientificFunction("square")}>
                x²
              </Button>
              <Button variant="outline" size="sm" onClick={() => scientificFunction("1/x")}>
                1/x
              </Button>
              <Button variant="outline" size="sm" onClick={() => scientificFunction("exp")}>
                exp
              </Button>
              <Button variant="outline" size="sm" onClick={() => scientificFunction("%")}>
                %
              </Button>

              {/* Constants and special functions */}
              <Button variant="outline" size="sm" onClick={() => scientificFunction("pi")}>
                π
              </Button>
              <Button variant="outline" size="sm" onClick={() => scientificFunction("e")}>
                e
              </Button>
              <Button variant="outline" size="sm" onClick={() => operatorPressed("^")}>
                x^y
              </Button>
              <Button variant="outline" size="sm" onClick={clearAll}>
                C
              </Button>
              <Button variant="outline" size="sm" onClick={backspacePressed}>
                ⌫
              </Button>

              {/* Number pad and basic operators */}
              <Button variant="secondary" size="sm" onClick={() => digitPressed("7")}>
                7
              </Button>
              <Button variant="secondary" size="sm" onClick={() => digitPressed("8")}>
                8
              </Button>
              <Button variant="secondary" size="sm" onClick={() => digitPressed("9")}>
                9
              </Button>
              <Button variant="outline" size="sm" onClick={() => operatorPressed("÷")}>
                ÷
              </Button>
              <Button variant="destructive" size="sm" onClick={clearAll}>
                AC
              </Button>

              <Button variant="secondary" size="sm" onClick={() => digitPressed("4")}>
                4
              </Button>
              <Button variant="secondary" size="sm" onClick={() => digitPressed("5")}>
                5
              </Button>
              <Button variant="secondary" size="sm" onClick={() => digitPressed("6")}>
                6
              </Button>
              <Button variant="outline" size="sm" onClick={() => operatorPressed("×")}>
                ×
              </Button>
              <Button variant="outline" size="sm" onClick={() => operatorPressed("(")}>
                (
              </Button>

              <Button variant="secondary" size="sm" onClick={() => digitPressed("1")}>
                1
              </Button>
              <Button variant="secondary" size="sm" onClick={() => digitPressed("2")}>
                2
              </Button>
              <Button variant="secondary" size="sm" onClick={() => digitPressed("3")}>
                3
              </Button>
              <Button variant="outline" size="sm" onClick={() => operatorPressed("-")}>
                -
              </Button>
              <Button variant="outline" size="sm" onClick={() => operatorPressed(")")}>
                )
              </Button>

              <Button variant="secondary" size="sm" onClick={() => digitPressed("0")}>
                0
              </Button>
              <Button variant="secondary" size="sm" onClick={decimalPressed}>
                .
              </Button>
              <Button variant="secondary" size="sm" onClick={() => scientificFunction("e")}>
                EXP
              </Button>
              <Button variant="outline" size="sm" onClick={() => operatorPressed("+")}>
                +
              </Button>
              <Button variant="primary" size="sm" onClick={equalsPressed}>
                =
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="history">
            <div className="h-80 overflow-y-auto border rounded-md p-2">
              {calculationHistory.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No calculation history yet</p>
              ) : (
                <ul className="space-y-2">
                  {calculationHistory.map((calc, index) => (
                    <li key={index} className="text-sm border-b pb-1 last:border-0">
                      {calc}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Button variant="outline" size="sm" className="mt-2" onClick={() => setCalculationHistory([])}>
              Clear History
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
