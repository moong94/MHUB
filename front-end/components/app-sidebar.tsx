"use client"

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { useIsMobile } from "@/hooks/use-media-query"
import type { Chat } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Grid3X3, Plus, Sparkles } from "lucide-react"
import { usePathname } from "next/navigation"

interface AppSidebarProps {
  chats: Chat[]
  onNewChat: () => void
  onChatClick: (chatId: string) => void
  onDashboardClick: () => void
  selectedChatId: string | null
}

export function AppSidebar({ 
  chats, 
  onNewChat, 
  onChatClick, 
  onDashboardClick, 
  selectedChatId 
}: AppSidebarProps) {
  const isMobile = useIsMobile()
  const { toggleSidebar } = useSidebar()

  const pathname = usePathname()
  const isOnDashboard = pathname === "/"

  return (
    <Sidebar collapsible="offcanvas" className="border-r-cyber-hover bg-cyber-main">
      <SidebarHeader className="p-4 space-y-2">
        <Button
          variant="gradient"
          onClick={() => {
            onNewChat()
            if (isMobile) toggleSidebar()
          }}
          className="w-full justify-start h-11 transition-all duration-150 active:scale-95 font-medium"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>

        <Button 
          variant="ghost" 
          onClick={() => {
            onDashboardClick()
            if (isMobile) toggleSidebar()
          }} 
          className={cn(
            "w-full justify-start hover-bg h-11 transition-all duration-150 active:scale-95 text-white",
            isOnDashboard && "bg-cyber-hover border-l-2 border-cyber-red text-cyber-red"
          )}
        >
          <Grid3X3 className="w-4 h-4 mr-2" />
          Apps Dashboard
        </Button>
      </SidebarHeader>

      <SidebarSeparator className="bg-cyber-hover mx-4" />

      <SidebarContent className="px-0">
        <SidebarGroup>
          <div className="px-4 py-2">
            <h3 className="text-sm font-medium text-cyber-text-secondary mb-2">Recent Chats</h3>
          </div>
          
          <SidebarGroupContent>
            <SidebarMenu className="px-2">
              {chats.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton
                    onClick={() => {
                      onChatClick(chat.id)
                      if (isMobile) toggleSidebar()
                    }}
                    className={cn(
                      "w-full justify-start text-left h-auto p-3 hover-bg transition-all duration-150 active:scale-95 rounded-md mx-2 mb-1",
                      selectedChatId === chat.id && "bg-cyber-hover border-l-2 border-cyber-red text-white"
                    )}
                  >
                    <div className="flex items-start gap-3 w-full min-h-[44px]">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyber-red/20 to-cyber-orange/20 flex items-center justify-center flex-shrink-0 mt-1 border border-cyber-red/20">
                        <Sparkles className="w-4 h-4 text-cyber-red" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate leading-relaxed text-white">{chat.title}</div>
                        <div className="text-xs text-cyber-text-secondary mt-1">
                          {new Date(chat.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {chats.length === 0 && (
                <div className="text-center text-cyber-text-secondary text-sm py-8 px-4">
                  <div className="opacity-60">
                    No chats yet.<br />Create your first app!
                  </div>
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="text-xs text-cyber-text-secondary text-center opacity-50">
          MHUB v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  )
} 