"use client"

import { ChatMessageArea } from "./chat-message-area"
import { WorkflowSteps } from "./workflow-steps"
import { StructureReviewPanel } from "./structure-review-panel"
import { MCPConfigPanel } from "./mcp-config-panel"
import { PublishAppPanel } from "./publish-app-panel"
import { useAppCreationWorkflow } from "../hooks/use-app-creation-workflow"
import { useMobilePanel } from "../hooks/use-mobile-panel"
import type { Chat, App } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ChatInterfaceProps {
  chatId: string
  chats: Chat[]
  setChats: (chats: Chat[]) => void
  onAppPublished: (app: App) => void
  onBackToDashboard: () => void
}

export function ChatInterface({ chatId, chats, setChats, onAppPublished, onBackToDashboard }: ChatInterfaceProps) {
  const chat = chats.find((c) => c.id === chatId)

  const {
    currentStep,
    appStructure,
    mcpConfig,
    appDetails,
    setMcpConfig,
    setAppDetails,
    generateAIResponse,
    progressToNextStep,
    handleApproveStructure,
    handleMCPSubmit,
    handleGoBack,
    handlePublish,
  } = useAppCreationWorkflow()

  const {
    isMobile,
    showMobilePanel,
    setShowMobilePanel,
    shouldShowSidePanel,
    sidePanelVisible,
  } = useMobilePanel(currentStep)

  if (!chat) return null

  const handleRequestChanges = () => {
    // 채팅 입력으로 포커스하고 변경 요청 메시지 준비
    if (isMobile) setShowMobilePanel(false)
  }

  return (
    <div className="flex h-[calc(100vh-3rem)] relative">
      {/* Chat Section */}
      <div
        className={cn(
          "flex flex-col h-full transition-all duration-300",
          // 모바일에서는 항상 full width, 데스크톱에서는 사이드 패널 여부에 따라 조정
          isMobile ? "w-full" : (shouldShowSidePanel ? "w-1/2 border-r border-cyber-hover" : "w-full")
        )}
      >
        {/* Chat Message Area */}
        <ChatMessageArea
          chat={chat}
          chatId={chatId}
          chats={chats}
          setChats={setChats}
          currentStep={currentStep}
          onBackToDashboard={onBackToDashboard}
          onProgressWorkflow={progressToNextStep}
          generateAIResponse={generateAIResponse}
          isMobile={isMobile}
          workflowStepsComponent={
            <div className={cn(
              "flex items-center gap-2 mt-2",
              isMobile ? "overflow-x-auto scrollbar-none pb-1" : "flex-wrap"
            )}>
              <WorkflowSteps
                currentStep={currentStep}
                isMobile={isMobile}
                shouldShowSidePanel={shouldShowSidePanel}
                showMobilePanel={showMobilePanel}
                onToggleMobilePanel={() => setShowMobilePanel(!showMobilePanel)}
              />
            </div>
          }
        />
      </div>

      {/* 모바일 백드롭 (Structure, MCP, Publish 패널용) */}
      {isMobile && showMobilePanel && shouldShowSidePanel && (
        <div 
          className="fixed inset-0 bg-black/50 z-40" 
          onClick={() => setShowMobilePanel(false)}
        />
      )}

      {/* Structure Review Section */}
      {currentStep === "structure" && sidePanelVisible && (
        <StructureReviewPanel
          appStructure={appStructure}
          onApprove={handleApproveStructure}
          onRequestChanges={handleRequestChanges}
          onGoBack={handleGoBack}
          isMobile={isMobile}
          showMobilePanel={showMobilePanel}
          onCloseMobilePanel={() => setShowMobilePanel(false)}
        />
      )}

      {/* MCP Configuration Section */}
      {currentStep === "mcp" && sidePanelVisible && (
        <MCPConfigPanel
          mcpConfig={mcpConfig}
          onConfigChange={setMcpConfig}
          onSubmit={handleMCPSubmit}
          onGoBack={handleGoBack}
          isMobile={isMobile}
          showMobilePanel={showMobilePanel}
          onCloseMobilePanel={() => setShowMobilePanel(false)}
        />
      )}

      {/* Publish Section */}
      {currentStep === "publish" && sidePanelVisible && (
        <PublishAppPanel
          appDetails={appDetails}
          onDetailsChange={setAppDetails}
          onPublish={() => handlePublish(onAppPublished)}
          onGoBack={handleGoBack}
          isMobile={isMobile}
          showMobilePanel={showMobilePanel}
          onCloseMobilePanel={() => setShowMobilePanel(false)}
        />
      )}
    </div>
  )
} 