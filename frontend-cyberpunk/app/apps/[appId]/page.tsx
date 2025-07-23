"use client"

import { useParams, useRouter } from "next/navigation"
import { AppDetails } from "@/components/app-details"
import { TopNavBar } from "@/components/top-nav-bar"
import { SidebarDesktop } from "@/components/sidebar-desktop"
import { SidebarMobile } from "@/components/sidebar-mobile"
import { useAppContext } from "@/lib/context"
import { useMobileNavigation } from "@/hooks/use-mobile-navigation"
import { useEffect } from "react"
import { Chat } from "@/lib/types"

export default function AppDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const appId = params.appId as string
  
  const { apps, chats, addChat } = useAppContext()
  const { isSidebarOpen, toggleSidebar, closeSidebar, isMobile } = useMobileNavigation()
  
  const app = apps.find(a => a.id === appId)
  
  useEffect(() => {
    if (!app) {
      router.push("/")
    }
  }, [app, router])



  const handleNewChat = () => {
    const newChat: Chat = {
      id: `chat-${Date.now()}`,
      title: "New App Creation",
      messages: [],
      createdAt: new Date().toISOString(),
    }

    // Context를 통해 즉시 추가
    addChat(newChat)
    
    // 즉시 라우팅
    router.push(`/chat/${newChat.id}`)
  }

  const handleChatClick = (chatId: string) => {
    router.push(`/chat/${chatId}`)
  }

  const handleBackToDashboard = () => {
    console.log("뒤로가기 버튼 클릭됨") // 디버깅용 로그 추가
    try {
      // 브라우저 히스토리에서 뒤로가기 시도
      if (window.history.length > 1) {
        router.back()
      } else {
        // 히스토리가 없으면 홈으로 이동
        router.push("/")
      }
    } catch (error) {
      console.error("뒤로가기 중 오류 발생:", error)
      // 오류 발생시 홈으로 강제 이동
      router.replace("/")
    }
  }

  if (!app) {
    return <div>Loading...</div>
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
            selectedChatId={null}
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
            selectedChatId={null}
          />
        )}

        <main
          className={`flex-1 h-full transition-all duration-300 ${!isMobile && isSidebarOpen ? "ml-64" : "ml-0"}`}
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.03) 0%, rgba(0, 0, 0, 0) 70%), radial-gradient(circle at 85% 20%, rgba(255, 0, 128, 0.03) 0%, rgba(0, 0, 0, 0) 70%)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <AppDetails app={app} onBack={handleBackToDashboard} />
        </main>
      </div>
    </div>
  )
} 