"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, User, Sparkles, ArrowLeft } from "lucide-react"
import type { Chat } from "@/lib/types"
import type { CreationStep } from "../hooks/use-app-creation-workflow"
import { cn } from "@/lib/utils"

interface ChatMessageAreaProps {
  chat: Chat
  chatId: string
  chats: Chat[]
  setChats: (chats: Chat[]) => void
  currentStep: CreationStep
  onBackToDashboard: () => void
  onProgressWorkflow: (chat: Chat) => void
  generateAIResponse: (step: CreationStep) => string
  isMobile: boolean
  workflowStepsComponent: React.ReactNode
}

export function ChatMessageArea({
  chat,
  chatId,
  chats,
  setChats,
  currentStep,
  onBackToDashboard,
  onProgressWorkflow,
  generateAIResponse,
  isMobile,
  workflowStepsComponent,
}: ChatMessageAreaProps) {
  const [message, setMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chat.messages])

  const sendMessage = () => {
    if (!message.trim()) return

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
        content: generateAIResponse(currentStep),
        timestamp: new Date().toISOString(),
      }

      const chatWithResponse = {
        ...updatedChat,
        messages: [...updatedChat.messages, aiResponse],
      }

      setChats(chats.map((c) => (c.id === chatId ? chatWithResponse : c)))
      onProgressWorkflow(chatWithResponse)
    }, 1000)

    setChats(chats.map((c) => (c.id === chatId ? updatedChat : c)))
    setMessage("")
  }



  return (
    <>
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
            {/* Workflow Steps를 채팅 제목 아래로 이동 */}
            {workflowStepsComponent}
          </div>
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
    </>
  )
} 