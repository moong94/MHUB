"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { TopNavBar } from "@/components/top-nav-bar"
import { SidebarDesktop } from "@/components/sidebar-desktop"
import { SidebarMobile } from "@/components/sidebar-mobile"
import { AppDashboard } from "@/components/app-dashboard"
import { CommandPalette } from "@/components/command-palette"
import { useAppContext } from "@/lib/context"
import { useMobileNavigation } from "@/hooks/use-mobile-navigation"
import { gsap } from "gsap"
import { Chat } from "@/lib/types"

export default function Home() {
  const router = useRouter()
  const [commandOpen, setCommandOpen] = useState(false)
  const { apps, chats, addChat, removeApp } = useAppContext()
  const { isSidebarOpen, toggleSidebar, closeSidebar, isMobile } = useMobileNavigation()

  const handleNewChat = () => {
    const newChat: Chat = {
      id: `chat-${Date.now()}`,
      title: "New App Creation",
      messages: [],
      createdAt: new Date().toISOString(),
    }

    // Context를 통해 즉시 추가 (동기적 처리)
    addChat(newChat)
    
    // 즉시 라우팅
    router.push(`/chat/${newChat.id}`)
  }

  const handleAppClick = (appId: string) => {
    router.push(`/apps/${appId}`)
  }

  const handleChatClick = (chatId: string) => {
    router.push(`/chat/${chatId}`)
  }

  // Keyboard shortcut for command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setCommandOpen(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // GSAP entrance animation
  useEffect(() => {
    gsap.fromTo(".main-content", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      <TopNavBar 
        onToggleSidebar={toggleSidebar} 
        onOpenCommand={() => setCommandOpen(true)}
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
            onDashboardClick={() => router.push("/")}
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
            onDashboardClick={() => router.push("/")}
            onClose={closeSidebar}
            selectedChatId={null}
          />
        )}

        <main
          className={`main-content flex-1 transition-all duration-300 ${
            !isMobile && isSidebarOpen ? "ml-64" : "ml-0"
          }`}
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.03) 0%, rgba(0, 0, 0, 0) 70%), radial-gradient(circle at 85% 20%, rgba(255, 0, 128, 0.03) 0%, rgba(0, 0, 0, 0) 70%)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <AppDashboard
            apps={apps}
            onAppClick={handleAppClick}
            onNewApp={handleNewChat}
            onDeleteApp={(id) => removeApp(id)}
          />
        </main>
      </div>

      <CommandPalette
        open={commandOpen}
        onOpenChange={setCommandOpen}
        onNewChat={handleNewChat}
        onDashboard={() => router.push("/")}
        apps={apps}
        chats={chats}
        onAppClick={handleAppClick}
        onChatClick={handleChatClick}
      />
    </div>
  )
}
