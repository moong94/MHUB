"use client"

import { Button } from "@/components/ui/button"
import type { App, Chat } from "@/lib/types"
import { cn } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"
import { useAppCreationWorkflow } from "../hooks/use-app-creation-workflow"
import { useMobilePanel } from "../hooks/use-mobile-panel"
import { BuildingPanel } from "./building-panel"
import { ChatMessageArea } from "./chat-message-area"
import { MCPConfigPanel } from "./mcp-config-panel"
import { PublishAppPanel } from "./publish-app-panel"
import { StructureReviewPanel } from "./structure-review-panel"

interface SidePanelWrapperProps {
  children: React.ReactNode
  title: string
  description: string
  isMobile: boolean
  showMobilePanel: boolean
  onGoBack: () => void
  onCloseMobilePanel?: () => void
}

function SidePanelWrapper({
  children,
  title,
  description,
  isMobile,
  showMobilePanel,
  onGoBack,
}: SidePanelWrapperProps) {
  return (
    <div className={cn(
      "h-full flex flex-col transition-all duration-300 overflow-x-hidden",
      isMobile ? (showMobilePanel ? "fixed inset-x-0 top-12 h-[calc(100vh-4rem)] bg-cyber-main z-50" : "hidden") : "w-1/2"
    )}>
      {/* 헤더 - 고정 */}
      <div className="bg-cyber-main/95 backdrop-blur-sm border-b border-cyber-border/50 p-4 z-30 flex-shrink-0">
        <div className="flex items-start gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onGoBack} 
            className="h-8 w-8 md:h-10 md:w-10"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-semibold gradient-text">
              {title}
            </h3>
            <p className="text-xs md:text-sm text-cyber-text-secondary">
              {description}
            </p>
          </div>
        </div>
      </div>
      
      {children}
    </div>
  )
}

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
          shouldShowSidePanel={shouldShowSidePanel}
          showMobilePanel={showMobilePanel}
          setShowMobilePanel={setShowMobilePanel}
        />
      </div>

      {/* 모바일 백드롭 (Building, Structure, MCP, Publish 패널용) */}
      {isMobile && showMobilePanel && shouldShowSidePanel && (
        <div 
          className="fixed inset-0 bg-black/50 z-40" 
          onClick={() => setShowMobilePanel(false)}
        />
      )}

      {/* Building Section */}
      {currentStep === "building" && sidePanelVisible && (
        <BuildingPanel
          isMobile={isMobile}
          showMobilePanel={showMobilePanel}
          onCloseMobilePanel={() => setShowMobilePanel(false)}
        />
      )}

      {/* Structure Review Section */}
      {currentStep === "structure" && sidePanelVisible && (
        <SidePanelWrapper
          title="App Structure Review"
          description="Review the generated app structure and data flow patterns."
          isMobile={isMobile}
          showMobilePanel={showMobilePanel}
          onGoBack={handleGoBack}
          onCloseMobilePanel={() => setShowMobilePanel(false)}
        >
          <StructureReviewPanel
            appStructure={appStructure}
            onApprove={handleApproveStructure}
            onRequestChanges={handleRequestChanges}
            isMobile={isMobile}
            onCloseMobilePanel={() => setShowMobilePanel(false)}
          />
        </SidePanelWrapper>
      )}

      {/* MCP Configuration Section */}
      {currentStep === "mcp" && sidePanelVisible && (
        <SidePanelWrapper
          title="MCP Configuration"
          description="Configure the Model Context Protocol settings for your app."
          isMobile={isMobile}
          showMobilePanel={showMobilePanel}
          onGoBack={handleGoBack}
          onCloseMobilePanel={() => setShowMobilePanel(false)}
        >
          <MCPConfigPanel
            mcpConfig={mcpConfig}
            onConfigChange={setMcpConfig}
            onSubmit={handleMCPSubmit}
          />
        </SidePanelWrapper>
      )}

      {/* Publish Section */}
      {currentStep === "publish" && sidePanelVisible && (
        <SidePanelWrapper
          title="Publish Your App"
          description="Add final details and publish your app to make it live."
          isMobile={isMobile}
          showMobilePanel={showMobilePanel}
          onGoBack={handleGoBack}
          onCloseMobilePanel={() => setShowMobilePanel(false)}
        >
          <PublishAppPanel
            appDetails={appDetails}
            onDetailsChange={setAppDetails}
            onPublish={() => handlePublish(onAppPublished)}
          />
        </SidePanelWrapper>
      )}
    </div>
  )
} 