"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface AnimatedResultProps {
  value: string | number | null
  symbol: string
  className?: string
}

export function AnimatedResult({ value, symbol, className = "" }: AnimatedResultProps) {
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    setDisplayValue(value)
  }, [value])

  return (
    <div className={`flex items-baseline ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={String(displayValue)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mr-1"
        >
          {displayValue !== null ? displayValue : "-"}
        </motion.div>
      </AnimatePresence>
      <span className="text-sm text-muted-foreground">{symbol}</span>
    </div>
  )
}
