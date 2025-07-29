"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send, Bot, User, ArrowLeft, Check, Settings, Rocket, Sparkles } from "lucide-react"
import { useIsMobile } from "@/hooks/use-media-query"
import type { Chat, App, AppStructure } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ChatInterfaceProps {
  chatId: string
  chats: Chat[]
  setChats: (chats: Chat[]) => void
  onAppPublished: (app: App) => void
  onBackToDashboard: () => void
}

type CreationStep = "chat" | "structure" | "mcp" | "publish"

export function ChatInterface({ chatId, chats, setChats, onAppPublished, onBackToDashboard }: ChatInterfaceProps) {
  const [message, setMessage] = useState("")
  const [currentStep, setCurrentStep] = useState<CreationStep>("chat")
  const [appStructure, setAppStructure] = useState<AppStructure | null>(null)
  const [showMobilePanel, setShowMobilePanel] = useState(() => {
    // 초기 로드시 chat 단계가 아니면 패널 표시
    return currentStep !== "chat"
  })
  const [mcpConfig, setMcpConfig] = useState({
    apiKey: "",
    endpoint: "",
    model: "gpt-4",
  })
  const [appDetails, setAppDetails] = useState({
    name: "",
    description: "",
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const isMobile = useIsMobile()
  const chat = chats.find((c) => c.id === chatId)

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chat?.messages])

  const sendMessage = () => {
    if (!message.trim() || !chat) return

    const newMessage = {
      id: `msg-${Date.now()}`,
      role: "user" as const,
      content: message,
      timestamp: new Date().toISOString(),
    }

    const updatedChat = {
      ...chat,
      messages: [...chat.messages, newMessage],
    }

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant" as const,
        content: generateAIResponse(),
        timestamp: new Date().toISOString(),
      }

      const chatWithResponse = {
        ...updatedChat,
        messages: [...updatedChat.messages, aiResponse],
      }

      setChats(chats.map((c) => (c.id === chatId ? chatWithResponse : c)))

      // Handle step progression based on current step and message count
      if (currentStep === "chat" && chat.messages.length >= 4) {
        setAppStructure(generateAppStructure())
        setCurrentStep("structure")
      } else if (currentStep === "structure") {
        // If user is asking for changes in structure step, regenerate structure
        setAppStructure(generateAppStructure())
      }
    }, 1000)

    setChats(chats.map((c) => (c.id === chatId ? updatedChat : c)))
    setMessage("")
  }

  const generateAIResponse = (): string => {
    if (currentStep === "chat") {
      const responses = [
        "I understand you want to create an app. Let me help you design the structure and functionality.",
        "Great idea! I can help you build that. What specific features would you like to include?",
        "That sounds like an interesting project. Let me break down the components we'll need.",
        "Perfect! I have a good understanding of your requirements. Let me create the app structure for you.",
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    } else if (currentStep === "structure") {
      const responses = [
        "I've updated the app structure based on your feedback. Please review the changes.",
        "Good point! I've modified the components and APIs accordingly. Take a look at the updated structure.",
        "Thanks for the feedback! I've restructured the app to better match your requirements.",
        "I've made those changes to the app structure. The updated design should better fit your needs.",
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    } else {
      const responses = [
        "I'm here to help with any questions about your app configuration.",
        "Feel free to ask me anything about the setup process.",
        "I can assist you with any concerns or modifications you need.",
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }
  }

  const generateAppStructure = (): AppStructure => {
    return {
      components: [
        { name: "Header", type: "navigation", description: "Main navigation bar" },
        { name: "Dashboard", type: "view", description: "Main dashboard view" },
        { name: "UserProfile", type: "component", description: "User profile management" },
        { name: "Settings", type: "component", description: "Application settings" },
      ],
      apis: [
        { name: "User API", endpoint: "/api/users", methods: ["GET", "POST", "PUT"] },
        { name: "Data API", endpoint: "/api/data", methods: ["GET", "POST"] },
      ],
      database: {
        tables: ["users", "sessions", "data"],
        relationships: ["users -> sessions", "users -> data"],
      },
    }
  }

  const handleApproveStructure = () => {
    setCurrentStep("mcp")
  }

  const handleMCPSubmit = () => {
    setCurrentStep("publish")
  }

  const handlePublish = () => {
    const newApp: App = {
      id: `app-${Date.now()}`,
      name: appDetails.name,
      description: appDetails.description,
      status: "active",
      traffic: Math.floor(Math.random() * 10000),
      usage: Math.floor(Math.random() * 100),
      errors: Math.floor(Math.random() * 10),
      createdAt: new Date().toISOString(),
      structure: appStructure || undefined,
      mcpConfig,
    }

    onAppPublished(newApp)
  }

  const handleGoBack = () => {
    if (currentStep === "structure") {
      setCurrentStep("chat")
    } else if (currentStep === "mcp") {
      setCurrentStep("structure")
    } else if (currentStep === "publish") {
      setCurrentStep("mcp")
    }
  }

  const steps = [
    { id: "chat", label: "Chat", icon: Bot },
    { id: "structure", label: "Structure", icon: Settings },
    { id: "mcp", label: "MCP Config", icon: Settings },
    { id: "publish", label: "Publish", icon: Rocket },
  ]

  if (!chat) return null

  const shouldShowSidePanel = currentStep !== "chat"
  const sidePanelVisible = shouldShowSidePanel && (isMobile ? showMobilePanel : true)

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
        {/* 헤더 - 고정 */}
        <div className="p-4 border-b border-cyber-hover flex-shrink-0">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onBackToDashboard} 
              className="h-8 w-8 md:h-10 md:w-10"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1 min-w-0">
              <h2 className="text-base md:text-lg font-semibold truncate">{chat.title}</h2>
              <div className={cn(
                "flex items-center gap-2 mt-2",
                isMobile ? "overflow-x-auto scrollbar-none pb-1" : "flex-wrap"
              )}>
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center shrink-0">
                    <Badge
                      variant={currentStep === step.id ? "gradient" : "outline"}
                      className="text-xs"
                    >
                      <step.icon className="w-3 h-3 mr-1" />
                      <span className={isMobile ? "hidden sm:inline" : ""}>{step.label}</span>
                    </Badge>
                    {index < steps.length - 1 && <div className="w-2 h-px bg-cyber-border mx-1" />}
                  </div>
                ))}
              </div>
            </div>
            
            {/* 모바일에서 사이드 패널 토글 버튼 */}
            {isMobile && shouldShowSidePanel && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMobilePanel(!showMobilePanel)}
                className="h-8 px-4 text-xs font-medium"
              >
                {showMobilePanel ? "Hide" : "Show"}
              </Button>
            )}
          </div>
        </div>

        {/* 메시지 영역 - 확장 가능 */}
        <ScrollArea className="flex-1 p-4 min-h-0">
          <div className="space-y-4 md:space-y-6">
            {chat.messages.map((msg) => (
              <div key={msg.id} className={cn("flex gap-2", msg.role === "user" ? "justify-end" : "justify-start")}>
                <div className={cn(
                  "flex gap-2", 
                  msg.role === "user" ? "flex-row-reverse" : "flex-row",
                  isMobile ? "max-w-[85%]" : "max-w-[80%]"
                )}>
                  <div
                    className={cn(
                      "rounded-full flex items-center justify-center flex-shrink-0",
                      isMobile ? "w-8 h-8" : "w-10 h-10",
                      msg.role === "user" ? "bg-gradient-to-br from-cyber-red to-cyber-orange" : "bg-cyber-hover",
                    )}
                  >
                    {msg.role === "user" ? (
                      <User className={cn(isMobile ? "w-4 h-4" : "w-5 h-5", "text-black")} />
                    ) : (
                      <Sparkles className={cn(isMobile ? "w-4 h-4" : "w-5 h-5", "text-cyber-red")} />
                    )}
                  </div>
                  <div
                    className={cn(
                      "rounded-2xl p-4",
                      msg.role === "user"
                        ? "bg-gradient-to-br from-cyber-red to-cyber-orange text-black font-semibold"
                        : "bg-cyber-hover border border-cyber-border",
                    )}
                  >
                    <p className={cn("text-sm", msg.role === "user" ? "font-semibold" : "")}>{msg.content}</p>
                    <p className="text-xs opacity-70 mt-2">{new Date(msg.timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>

        {/* 입력 영역 - 고정 */}
        <div className="p-4 border-t border-cyber-hover flex-shrink-0">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                currentStep === "chat" 
                  ? "Describe the app you want to create..."
                  : currentStep === "structure"
                  ? "Request changes to the app structure..."
                  : currentStep === "mcp"
                  ? "Ask questions about MCP configuration..."
                  : "Ask anything about your app..."
              }
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1"
            />
            <Button
              variant="gradient"
              onClick={sendMessage}
              disabled={!message.trim()}
              className="h-10 md:h-11 px-4"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* 모바일 백드롭 (Structure, MCP, Publish 패널용) */}
      {isMobile && showMobilePanel && shouldShowSidePanel && (
        <div 
          className="fixed inset-0 bg-black/50 z-40" 
          onClick={() => setShowMobilePanel(false)}
        />
      )}

      {/* Structure Review Section */}
      {currentStep === "structure" && appStructure && sidePanelVisible && (
        <div className={cn(
          "h-full overflow-y-auto transition-all duration-300",
          isMobile ? (showMobilePanel ? "fixed inset-x-0 top-16 bottom-0 bg-cyber-main z-50" : "hidden") : "w-1/2"
        )}>
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={isMobile ? () => setShowMobilePanel(false) : handleGoBack} 
                className="h-8 w-8 md:h-10 md:w-10"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg md:text-2xl font-semibold gradient-text">
                  App Structure Review
                </h3>
                <p className="text-xs md:text-sm text-cyber-text-secondary mt-2">
                  Review the generated app structure and approve or request modifications.
                </p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Components</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {appStructure.components.map((component, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 card-hover rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{component.name}</div>
                        <div className="text-sm text-cyber-text-secondary">{component.description}</div>
                      </div>
                      <Badge variant="outline">
                        {component.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-cyber-orange">APIs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {appStructure.apis.map((api, index: number) => (
                    <div key={index} className="p-4 card-hover rounded-lg">
                      <div className="font-medium">{api.name}</div>
                      <div className="text-sm text-cyber-text-secondary">{api.endpoint}</div>
                      <div className="flex gap-2 mt-4">
                        {api.methods.map((method: string) => (
                          <Badge
                            key={method}
                            variant="outline"
                            className="bg-cyber-border/50 border-cyber-border-light text-cyber-text-tertiary"
                          >
                            {method}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4 pb-4">
              <Button
                variant="gradient"
                onClick={() => {
                  handleApproveStructure()
                  if (isMobile) setShowMobilePanel(false)
                }}
                className="w-full h-10 md:h-12 text-sm md:text-lg font-medium"
              >
                <Check className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Approve Structure
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  inputRef.current?.focus()
                  setMessage("I'd like to request changes to ")
                  if (isMobile) setShowMobilePanel(false)
                }}
                className="w-full h-10 md:h-12 text-sm md:text-lg font-medium"
              >
                💬 Ask for Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MCP Configuration Section */}
      {currentStep === "mcp" && sidePanelVisible && (
        <div className={cn(
          "h-full overflow-y-auto transition-all duration-300",
          isMobile ? (showMobilePanel ? "fixed inset-x-0 top-16 bottom-0 bg-cyber-main z-50" : "hidden") : "w-1/2"
        )}>
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="ghost" size="icon" onClick={handleGoBack}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h3 className="text-2xl font-semibold gradient-text">
                  MCP Configuration
                </h3>
                <p className="text-cyber-text-secondary">Configure the Model Context Protocol settings for your app.</p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="apiKey">
                    API Key
                  </Label>
                  <Input
                    id="apiKey"
                    type="password"
                    value={mcpConfig.apiKey}
                    onChange={(e) => setMcpConfig({ ...mcpConfig, apiKey: e.target.value })}
                    placeholder="Enter your API key"
                  />
                </div>
                <div>
                  <Label htmlFor="endpoint">
                    Endpoint
                  </Label>
                  <Input
                    id="endpoint"
                    value={mcpConfig.endpoint}
                    onChange={(e) => setMcpConfig({ ...mcpConfig, endpoint: e.target.value })}
                    placeholder="https://api.example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="model">
                    Model
                  </Label>
                  <Input
                    id="model"
                    value={mcpConfig.model}
                    onChange={(e) => setMcpConfig({ ...mcpConfig, model: e.target.value })}
                    placeholder="gpt-4"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="pb-4">
              <Button
                variant="gradient"
                onClick={handleMCPSubmit}
                className="w-full h-12 text-lg font-medium"
              >
                <Settings className="w-5 h-5 mr-2" />
                Continue to Publish
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Publish Section */}
      {currentStep === "publish" && sidePanelVisible && (
        <div className={cn(
          "h-full overflow-y-auto transition-all duration-300",
          isMobile ? (showMobilePanel ? "fixed inset-x-0 top-16 bottom-0 bg-cyber-main z-50" : "hidden") : "w-1/2"
        )}>
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="ghost" size="icon" onClick={handleGoBack}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h3 className="text-2xl font-semibold gradient-text">
                  Publish Your App
                </h3>
                <p className="text-cyber-text-secondary">Add final details and publish your app to make it live.</p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>App Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="appName">
                    App Name
                  </Label>
                  <Input
                    id="appName"
                    value={appDetails.name}
                    onChange={(e) => setAppDetails({ ...appDetails, name: e.target.value })}
                    placeholder="My Awesome App"
                  />
                </div>
                <div>
                  <Label htmlFor="appDescription">
                    Description
                  </Label>
                  <Textarea
                    id="appDescription"
                    value={appDetails.description}
                    onChange={(e) => setAppDetails({ ...appDetails, description: e.target.value })}
                    placeholder="Describe what your app does..."
                    rows={4}
                    className="resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="pb-4">
              <Button
                variant="gradient"
                onClick={handlePublish}
                className="w-full h-12 text-lg font-medium"
                disabled={!appDetails.name || !appDetails.description}
              >
                <Rocket className="w-5 h-5 mr-2" />
                Publish App
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
