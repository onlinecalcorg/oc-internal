import type React from "react"
import { cn } from "@/lib/utils"

interface FractionProps {
  numerator: React.ReactNode
  denominator: React.ReactNode
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  color?: "default" | "primary" | "secondary" | "accent"
}

export function Fraction({ numerator, denominator, className, size = "md", color = "default" }: FractionProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  }

  const colorClasses = {
    default: "text-foreground",
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-blue-600",
  }

  const lineClasses = {
    default: "bg-foreground",
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-blue-600",
  }

  return (
    <div className={cn("inline-flex flex-col items-center", sizeClasses[size], colorClasses[color], className)}>
      <div className="text-center">{numerator}</div>
      <div className={cn("h-[1px] w-full my-[2px]", lineClasses[color])} />
      <div className="text-center">{denominator}</div>
    </div>
  )
}

export function MixedFraction({
  wholeNumber,
  numerator,
  denominator,
  className,
  size = "md",
  color = "default",
}: FractionProps & { wholeNumber: React.ReactNode }) {
  return (
    <div className="inline-flex items-center">
      <span
        className={cn(
          "mr-1",
          size === "xl" ? "text-xl" : size === "lg" ? "text-lg" : size === "sm" ? "text-sm" : "text-base",
        )}
      >
        {wholeNumber}
      </span>
      <Fraction numerator={numerator} denominator={denominator} className={className} size={size} color={color} />
    </div>
  )
}
