import { useState, useEffect } from "react"
import { useIsMobile } from "@/hooks/use-media-query"
import type { CreationStep } from "./use-app-creation-workflow"

export function useMobilePanel(currentStep: CreationStep) {
  const isMobile = useIsMobile()
  const [showMobilePanel, setShowMobilePanel] = useState(() => {
    // 초기 로드시 chat 단계가 아니면 패널 표시
    return currentStep !== "chat"
  })

  // 모바일에서 단계 변경시 자동으로 사이드 패널 표시
  useEffect(() => {
    if (isMobile && currentStep !== "chat") {
      setShowMobilePanel(true)
    }
  }, [currentStep, isMobile])

  // ESC 키로 모바일 패널 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobile && showMobilePanel) {
        setShowMobilePanel(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isMobile, showMobilePanel])

  const shouldShowSidePanel = currentStep !== "chat"
  const sidePanelVisible = shouldShowSidePanel && (isMobile ? showMobilePanel : true)

  return {
    isMobile,
    showMobilePanel,
    setShowMobilePanel,
    shouldShowSidePanel,
    sidePanelVisible,
  }
} 