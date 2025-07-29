"use client"

import { useParams, useRouter } from "next/navigation"
import { ChatInterface } from "./components/chat-interface"
import { useAppContext } from "@/lib/context"
import { useEffect } from "react"
import { App, Chat } from "@/lib/types"

export default function ChatPage() {
  const params = useParams()
  const router = useRouter()
  const chatId = params.chatId as string
  
  const { chats, addApp, updateChat } = useAppContext()
  
  const chat = chats.find(c => c.id === chatId)
  
  useEffect(() => {
    // 채팅을 찾지 못하면 대시보드로 리다이렉트
    if (!chat) {
      router.push("/")
    }
  }, [chat, router])

  const handleBackToDashboard = () => {
    router.push("/")
  }

  const handleAppPublished = (app: App) => {
    addApp(app)
    router.push(`/apps/${app.id}`)
  }

  const handleSetChats = (updatedChats: Chat[]) => {
    const updatedChat = updatedChats.find(c => c.id === chatId)
    if (updatedChat) {
      updateChat(chatId, updatedChat)
    }
  }

  if (!chat) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#ff0040]/10 to-[#ff6600]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-8 h-8 border-2 border-[#ff0040] border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h3 className="text-xl font-medium mb-2">채팅을 로드하는 중...</h3>
          <p className="text-[#8a8a9a]">잠시만 기다려주세요</p>
        </div>
      </div>
    )
  }

  return (
    <ChatInterface
      chatId={chatId}
      chats={chats}
      setChats={handleSetChats}
      onAppPublished={handleAppPublished}
      onBackToDashboard={handleBackToDashboard}
    />
  )
} 