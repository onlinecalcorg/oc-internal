"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp, Calculator, Copy, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface FloatingActionButtonProps {
  onCopy?: () => void
  onShare?: () => void
  result?: string | null
}

export function FloatingActionButton({ onCopy, onShare, result }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleShare = () => {
    if (onShare) {
      onShare()
    } else if (navigator.share) {
      navigator
        .share({
          title: document.title,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error))
    }
    setIsOpen(false)
  }

  const handleCopy = () => {
    if (onCopy) {
      onCopy()
    } else if (result) {
      navigator.clipboard.writeText(result)
    }
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
      {/* Sub buttons that appear when main button is clicked */}
      <div
        className={cn(
          "flex flex-col items-end space-y-2 transition-all duration-300",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none",
        )}
      >
        <Button size="icon" variant="secondary" className="h-10 w-10 rounded-full shadow-lg" onClick={scrollToTop}>
          <ArrowUp className="h-5 w-5" />
        </Button>
        <Button size="icon" variant="secondary" className="h-10 w-10 rounded-full shadow-lg" onClick={handleShare}>
          <Share2 className="h-5 w-5" />
        </Button>
        {result && (
          <Button size="icon" variant="secondary" className="h-10 w-10 rounded-full shadow-lg" onClick={handleCopy}>
            <Copy className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Main floating action button */}
      <Button
        size="icon"
        variant="default"
        className="h-14 w-14 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Calculator className="h-6 w-6" />
      </Button>
    </div>
  )
}
