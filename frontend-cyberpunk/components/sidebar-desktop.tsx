"use client"

import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Grid3X3, Plus, Sparkles } from "lucide-react"
import type { Chat } from "@/lib/types"
import { cn } from "@/lib/utils"

interface SidebarDesktopProps {
  open: boolean
  chats: Chat[]
  onNewChat: () => void
  onChatClick: (chatId: string) => void
  onDashboardClick: () => void
  selectedChatId: string | null
}

export function SidebarDesktop({ 
  open, 
  chats, 
  onNewChat, 
  onChatClick, 
  onDashboardClick, 
  selectedChatId 
}: SidebarDesktopProps) {
  const pathname = usePathname()
  const isOnDashboard = pathname === "/"

  return (
    <aside
      className={cn(
        "fixed left-0 top-12 h-[calc(100vh-3rem)] w-64 bg-[#0f0f17] border-r border-[#1e1e2a] z-40",
        !open && "-translate-x-full"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 space-y-2">
          <Button
            onClick={onNewChat}
            className="w-full justify-start gradient-button h-11 transition-all duration-150 active:scale-95"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </Button>

          <Button 
            variant="ghost" 
            onClick={onDashboardClick} 
            className={cn(
              "w-full justify-start hover-bg h-11 transition-all duration-150 active:scale-95",
              isOnDashboard && "bg-[#1e1e2a] border-l-2 border-[#ff0040]"
            )}
          >
            <Grid3X3 className="w-4 h-4 mr-2" />
            Apps Dashboard
          </Button>
        </div>

        <Separator className="bg-[#1e1e2a]" />

        <div className="flex-1 overflow-hidden">
          <div className="px-4 py-2">
            <h3 className="text-sm font-medium text-[#8a8a9a] mb-2">Recent Chats</h3>
          </div>

          <ScrollArea className="flex-1 px-4">
            <div className="space-y-1">
              {chats.map((chat) => (
                                 <Button
                   key={chat.id}
                   variant="ghost"
                   onClick={() => onChatClick(chat.id)}
                   className={cn(
                     "w-full justify-start text-left h-auto p-2 hover-bg transition-all duration-150 active:scale-95",
                     selectedChatId === chat.id && "bg-[#1e1e2a] border-l-2 border-[#ff0040]",
                   )}
                 >
                  <div className="flex items-start gap-2 w-full min-h-[44px]">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff0040]/20 to-[#ff6600]/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Sparkles className="w-4 h-4 text-[#ff0040]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate leading-relaxed">{chat.title}</div>
                      <div className="text-xs text-[#8a8a9a] mt-2">{new Date(chat.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                </Button>
              ))}

              {chats.length === 0 && (
                <div className="text-center text-[#8a8a9a] text-sm py-4">
                  No chats yet.<br />Create your first app!
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </aside>
  )
} 