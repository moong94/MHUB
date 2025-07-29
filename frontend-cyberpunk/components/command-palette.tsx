"use client"

import { useState, useEffect } from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Grid3X3, MessageSquare, Plus, Zap, Sparkles } from "lucide-react"
import type { App, Chat } from "@/lib/types"

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onNewChat: () => void
  onDashboard: () => void
  apps: App[]
  chats: Chat[]
  onAppClick: (appId: string) => void
  onChatClick: (chatId: string) => void
}

export function CommandPalette({
  open,
  onOpenChange,
  onNewChat,
  onDashboard,
  apps,
  chats,
  onAppClick,
  onChatClick,
}: CommandPaletteProps) {
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (!open) {
      setSearch("")
    }
  }, [open])

  const handleSelect = (callback: () => void) => {
    callback()
    onOpenChange(false)
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <CommandInput
        placeholder="Type a command or search..."
        value={search}
        onValueChange={setSearch}
      />
      <CommandList className="scrollbar-thin scrollbar-thumb-cyber-border scrollbar-track-transparent">
        <CommandEmpty>
          <div className="flex flex-col items-center justify-center py-4">
            <Sparkles className="w-10 h-10 text-cyber-text-secondary mb-2" />
            <p className="text-cyber-text-secondary">No results found.</p>
          </div>
        </CommandEmpty>

        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => handleSelect(onNewChat)}>
            <Plus className="mr-2 h-4 w-4 text-cyber-red" />
            <span>New Chat</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(onDashboard)}>
            <Grid3X3 className="mr-2 h-4 w-4 text-cyber-orange" />
            <span>Go to Dashboard</span>
          </CommandItem>
        </CommandGroup>

        {apps.length > 0 && (
          <CommandGroup heading="Apps">
            {apps
              .filter(
                (app) =>
                  app.name.toLowerCase().includes(search.toLowerCase()) ||
                  app.description.toLowerCase().includes(search.toLowerCase()),
              )
              .slice(0, 5)
              .map((app) => (
                <CommandItem
                  key={app.id}
                  onSelect={() => handleSelect(() => onAppClick(app.id))}
                >
                  <Zap className="mr-2 h-4 w-4 text-cyber-red" />
                  <div className="flex flex-col">
                    <span>{app.name}</span>
                    <span className="text-xs text-cyber-text-secondary">{app.description}</span>
                  </div>
                </CommandItem>
              ))}
          </CommandGroup>
        )}

        {chats.length > 0 && (
          <CommandGroup heading="Chats">
            {chats
              .filter((chat) => chat.title.toLowerCase().includes(search.toLowerCase()))
              .slice(0, 5)
              .map((chat) => (
                <CommandItem
                  key={chat.id}
                  onSelect={() => handleSelect(() => onChatClick(chat.id))}
                >
                  <MessageSquare className="mr-2 h-4 w-4 text-cyber-orange" />
                  <div className="flex flex-col">
                    <span>{chat.title}</span>
                    <span className="text-xs text-cyber-text-secondary">{new Date(chat.createdAt).toLocaleDateString()}</span>
                  </div>
                </CommandItem>
              ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  )
}
