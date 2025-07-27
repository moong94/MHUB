"use client"

import { Button } from "@/components/ui/button"
import { PanelLeft } from "lucide-react"

interface TopNavBarProps {
  onToggleSidebar: () => void
  onOpenCommand?: () => void
  isMobile?: boolean
}

export function TopNavBar({ onToggleSidebar }: TopNavBarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-12 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-[#1e1e2a]">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-4">
          <span className="text-base md:text-lg font-bold bg-gradient-to-r from-[#ff0040] to-[#ff6600] bg-clip-text text-transparent">
            MHUB
          </span>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleSidebar} 
            className="hover:bg-[#1e1e2a] h-8 w-8 md:h-10 md:w-10"
          >
            <PanelLeft className="w-4 h-4 text-gray-400 hover:text-gray-300" />
          </Button>
        </div>
      </div>
    </nav>
  )
}
