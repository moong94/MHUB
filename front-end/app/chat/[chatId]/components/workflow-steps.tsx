"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bot, Settings, Rocket, Cpu } from "lucide-react"
import type { CreationStep } from "../hooks/use-app-creation-workflow"

interface WorkflowStepsProps {
  currentStep: CreationStep
  isMobile: boolean
  shouldShowSidePanel: boolean
  showMobilePanel: boolean
  onToggleMobilePanel: () => void
}

export function WorkflowSteps({
  currentStep,
  isMobile,
  shouldShowSidePanel,
  showMobilePanel,
  onToggleMobilePanel,
}: WorkflowStepsProps) {
  const steps = [
    { id: "chat", label: "Chat", icon: Bot },
    { id: "building", label: "Building", icon: Cpu },
    { id: "structure", label: "Structure", icon: Settings },
    { id: "mcp", label: "MCP Config", icon: Settings },
    { id: "publish", label: "Publish", icon: Rocket },
  ]

  return (
    <>
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center shrink-0">
          <Badge
            variant={currentStep === step.id ? "gradient" : "cyber"}
            className="text-xs"
          >
            <step.icon className="w-3 h-3 mr-1" />
            <span className={isMobile ? "hidden sm:inline" : ""}>{step.label}</span>
          </Badge>
          {index < steps.length - 1 && (
            <div className="flex items-center ml-2">
              <div className="w-3 h-0.5 bg-cyber-border-light"></div>
              <div className="w-0 h-0 border-l-[4px] border-l-cyber-border-light border-y-[3px] border-y-transparent ml-0.5"></div>
            </div>
          )}
        </div>
      ))}
      
      {/* 모바일에서 사이드 패널 토글 버튼 */}
      {isMobile && shouldShowSidePanel && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleMobilePanel}
          className="h-8 px-4 text-xs font-medium ml-auto"
        >
          {showMobilePanel ? "Hide" : "Show"}
        </Button>
      )}
    </>
  )
} 