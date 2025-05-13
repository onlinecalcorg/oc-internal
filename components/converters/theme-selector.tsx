"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Paintbrush } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const themes = [
  { name: "Default", primary: "hsl(221.2, 83.2%, 53.3%)", secondary: "hsl(210, 40%, 96.1%)" },
  { name: "Ocean", primary: "hsl(200, 98%, 39%)", secondary: "hsl(190, 80%, 96%)" },
  { name: "Forest", primary: "hsl(160, 84%, 39%)", secondary: "hsl(150, 80%, 96%)" },
  { name: "Sunset", primary: "hsl(20, 90%, 50%)", secondary: "hsl(30, 80%, 96%)" },
  { name: "Berry", primary: "hsl(280, 84%, 39%)", secondary: "hsl(290, 80%, 96%)" },
]

export function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState(themes[0])

  const applyTheme = (theme: (typeof themes)[0]) => {
    document.documentElement.style.setProperty("--primary", theme.primary)
    document.documentElement.style.setProperty("--secondary", theme.secondary)
    setCurrentTheme(theme)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Paintbrush className="h-4 w-4" />
          <span className="hidden sm:inline">Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((theme) => (
          <DropdownMenuItem key={theme.name} onClick={() => applyTheme(theme)} className="gap-2 cursor-pointer">
            <div className="h-4 w-4 rounded-full" style={{ backgroundColor: theme.primary }} />
            {theme.name}
            {currentTheme.name === theme.name && " ✓"}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
