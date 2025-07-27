"use client"

import { useParams, useRouter } from "next/navigation"
import { ChatInterface } from "@/components/chat-interface"
import { TopNavBar } from "@/components/top-nav-bar"
import { SidebarDesktop } from "@/components/sidebar-desktop"
import { SidebarMobile } from "@/components/sidebar-mobile"
import { useAppContext } from "@/lib/context"
import { useMobileNavigation } from "@/hooks/use-mobile-navigation"
import { useEffect } from "react"
import { Chat, App } from "@/lib/types"

export default function ChatPage() {
  const params = useParams()
  const router = useRouter()
  const chatId = params.chatId as string
  
  const { chats, addChat, addApp, updateChat } = useAppContext()
  const { isSidebarOpen, toggleSidebar, closeSidebar, isMobile } = useMobileNavigation()
  
  const chat = chats.find(c => c.id === chatId)
  
  useEffect(() => {
    // 채팅을 찾지 못하면 대시보드로 리다이렉트
    if (!chat) {
      router.push("/")
    }
  }, [chat, router])



  const handleNewChat = () => {
    console.log("🔥 Chat page handleNewChat called")
    const newChat: Chat = {
      id: `chat-${Date.now()}`,
      title: "New App Creation",
      messages: [],
      createdAt: new Date().toISOString(),
    }

    console.log("📝 New chat created:", newChat)
    addChat(newChat)
    console.log("🚀 Navigating to:", `/chat/${newChat.id}`)
    router.push(`/chat/${newChat.id}`)
  }

  const handleChatClick = (chatId: string) => {
    router.push(`/chat/${chatId}`)
  }

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
      <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
        <TopNavBar 
          onToggleSidebar={toggleSidebar} 
          onOpenCommand={() => {}}
          isMobile={isMobile}
        />
        <div className="flex h-[calc(100vh-3rem)] pt-12">
          {/* PC용 사이드바 */}
          {!isMobile && (
            <SidebarDesktop
              open={isSidebarOpen}
              chats={chats}
              onNewChat={handleNewChat}
              onChatClick={handleChatClick}
              onDashboardClick={handleBackToDashboard}
              selectedChatId={chatId}
            />
          )}

          {/* 모바일용 사이드바 */}
          {isMobile && (
            <SidebarMobile
              open={isSidebarOpen}
              chats={chats}
              onNewChat={handleNewChat}
              onChatClick={handleChatClick}
              onDashboardClick={handleBackToDashboard}
              onClose={closeSidebar}
              selectedChatId={chatId}
            />
          )}
          
          <main className={`flex-1 transition-all duration-300 ${!isMobile && isSidebarOpen ? "ml-64" : "ml-0"} flex items-center justify-center`}>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#ff0040]/10 to-[#ff6600]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 border-2 border-[#ff0040] border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h3 className="text-xl font-medium mb-2">채팅을 로드하는 중...</h3>
              <p className="text-[#8a8a9a]">잠시만 기다려주세요</p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      <TopNavBar 
        onToggleSidebar={toggleSidebar} 
        onOpenCommand={() => {}}
        isMobile={isMobile}
      />

      <div className="flex h-[calc(100vh-3rem)] pt-12">
        {/* PC용 사이드바 */}
        {!isMobile && (
          <SidebarDesktop
            open={isSidebarOpen}
            chats={chats}
            onNewChat={handleNewChat}
            onChatClick={handleChatClick}
            onDashboardClick={handleBackToDashboard}
            selectedChatId={chatId}
          />
        )}

        {/* 모바일용 사이드바 */}
        {isMobile && (
          <SidebarMobile
            open={isSidebarOpen}
            chats={chats}
            onNewChat={handleNewChat}
            onChatClick={handleChatClick}
            onDashboardClick={handleBackToDashboard}
            onClose={closeSidebar}
            selectedChatId={chatId}
          />
        )}

        <main
          className={`flex-1 transition-all duration-300 ${!isMobile && isSidebarOpen ? "ml-64" : "ml-0"}`}
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.03) 0%, rgba(0, 0, 0, 0) 70%), radial-gradient(circle at 85% 20%, rgba(255, 0, 128, 0.03) 0%, rgba(0, 0, 0, 0) 70%)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <ChatInterface
            chatId={chatId}
            chats={chats}
            setChats={handleSetChats}
            onAppPublished={handleAppPublished}
            onBackToDashboard={handleBackToDashboard}
          />
        </main>
      </div>
    </div>
  )
} 