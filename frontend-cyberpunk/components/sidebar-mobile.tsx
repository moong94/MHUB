"use client"

import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Grid3X3, Plus, Sparkles, X } from "lucide-react"
import type { Chat } from "@/lib/types"
import { cn } from "@/lib/utils"

interface SidebarMobileProps {
  open: boolean
  chats: Chat[]
  onNewChat: () => void
  onChatClick: (chatId: string) => void
  onDashboardClick: () => void
  onClose: () => void
  selectedChatId: string | null
}

export function SidebarMobile({ 
  open, 
  chats, 
  onNewChat, 
  onChatClick, 
  onDashboardClick,
  onClose,
  selectedChatId 
}: SidebarMobileProps) {
  const pathname = usePathname()
  const isOnDashboard = pathname === "/"

  // 모든 메뉴 클릭시 자연스러운 타이밍으로 라우트 이동과 사이드바 닫기
  const handleNewChat = () => {
    // 라우트 이동을 먼저 시작
    onNewChat()
    // 사이드바 닫기를 약간 지연하여 더 자연스러운 전환
    setTimeout(() => {
      onClose()
    }, 50)
  }

  const handleChatClick = (chatId: string) => {
    // 라우트 이동을 먼저 시작
    onChatClick(chatId)
    // 사이드바 닫기를 약간 지연하여 더 자연스러운 전환
    setTimeout(() => {
      onClose()
    }, 50)
  }

  const handleDashboardClick = () => {
    // 라우트 이동을 먼저 시작
    onDashboardClick()
    // 사이드바 닫기를 약간 지연하여 더 자연스러운 전환
    setTimeout(() => {
      onClose()
    }, 50)
  }

  if (!open) return null

  return (
    <>
      {/* 백드롭 */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* 사이드바 */}
             <aside
         className={cn(
           "fixed left-0 top-0 h-full w-4/5 max-w-xs bg-[#0f0f17] border-r border-[#1e1e2a] z-50",
           "transform transition-transform duration-200 ease-out",
           open ? "translate-x-0" : "-translate-x-full"
         )}
       >
        <div className="flex flex-col h-full">
          {/* 헤더 */}
          <div className="flex items-center justify-end p-4 border-b border-[#1e1e2a]">

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 hover:bg-[#1e1e2a] shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* 메뉴 */}
          <div className="p-4 pt-0 space-y-2">
                         <Button
               onClick={handleNewChat}
               className="w-full justify-start gradient-button h-10 transition-all duration-150 active:scale-95"
             >
               <Plus className="w-4 h-4 mr-2" />
               New Chat
             </Button>

             <Button 
               variant="ghost" 
               onClick={handleDashboardClick} 
               className={cn(
                 "w-full justify-start hover-bg h-10 transition-all duration-150 active:scale-95",
                 isOnDashboard && "bg-[#1e1e2a] border-l-2 border-[#ff0040]"
               )}
             >
               <Grid3X3 className="w-4 h-4 mr-2" />
               Apps Dashboard
             </Button>
          </div>

          <Separator className="bg-[#1e1e2a]" />

          {/* 채팅 리스트 */}
          <div className="flex-1 overflow-hidden">
            <div className="px-4 py-2">
              <h3 className="text-xs font-medium text-[#8a8a9a] mb-2">Recent Chats</h3>
            </div>

            <ScrollArea className="flex-1 px-4">
              <div className="space-y-1">
                {chats.map((chat) => (
                                     <Button
                     key={chat.id}
                     variant="ghost"
                     onClick={() => handleChatClick(chat.id)}
                     className={cn(
                       "w-full justify-start text-left h-auto p-2 hover-bg transition-all duration-150 active:scale-95",
                       selectedChatId === chat.id && "bg-[#1e1e2a] border-l-2 border-[#ff0040]",
                     )}
                   >
                    <div className="flex items-start gap-2 w-full min-h-[44px]">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#ff0040]/20 to-[#ff6600]/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <Sparkles className="w-3 h-3 text-[#ff0040]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-xs truncate leading-relaxed">{chat.title}</div>
                        <div className="text-xs text-[#8a8a9a] mt-2">{new Date(chat.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </Button>
                ))}

                {chats.length === 0 && (
                  <div className="text-center text-[#8a8a9a] text-xs py-4">
                    No chats yet.<br />Create your first app!
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </aside>
    </>
  )
} 