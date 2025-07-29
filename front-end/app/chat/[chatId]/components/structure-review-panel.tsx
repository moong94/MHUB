"use client"

import { AppFlow } from "@/components/app-flow"
import { Button } from "@/components/ui/button"
import type { AppStructure } from "@/lib/types"
import '@xyflow/react/dist/style.css'
import { Check } from "lucide-react"

interface StructureReviewPanelProps {
  appStructure: AppStructure | null
  onApprove: () => void
  onRequestChanges: () => void
  isMobile: boolean
  onCloseMobilePanel?: () => void
}

export function StructureReviewPanel({
  appStructure,
  onApprove,
  onRequestChanges,
  isMobile,
  onCloseMobilePanel,
}: StructureReviewPanelProps) {
  if (!appStructure) return null

  return (
    <>
      {/* 컨텐츠 영역 - 확장 가능 */}
      <div className="flex-1 bg-cyber-main/20 min-h-0">
        <AppFlow />
      </div>
      
      {/* 하단 버튼 - 고정 */}
      <div className="bg-cyber-main/95 backdrop-blur-sm border-t border-cyber-border/50 p-4 z-30 flex-shrink-0">
        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={() => {
              onRequestChanges()
              if (isMobile && onCloseMobilePanel) onCloseMobilePanel()
            }}
            className="h-9 md:h-10 text-sm font-medium px-6"
          >
            💬 Ask for Changes
          </Button>
          <Button
            variant="gradient"
            onClick={() => {
              onApprove()
              if (isMobile && onCloseMobilePanel) onCloseMobilePanel()
            }}
            className="h-9 md:h-10 text-sm font-medium px-6"
          >
            <Check className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Approve Structure
          </Button>
        </div>
      </div>
    </>
  )
} 