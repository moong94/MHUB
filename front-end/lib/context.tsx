"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { App, Chat } from "@/lib/types"

interface AppContextType {
  apps: App[]
  chats: Chat[]
  setApps: React.Dispatch<React.SetStateAction<App[]>>
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>
  addChat: (chat: Chat) => void
  addApp: (app: App) => void
  removeApp: (appId: string) => void
  updateChat: (chatId: string, updatedChat: Chat) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const initialApps: App[] = [
  {
    id: "app-1",
    name: "Neural Chat",
    description: "AI-powered chat application with real-time translation",
    status: "active",
    traffic: 12450,
    usage: 78,
    errors: 2,
    createdAt: new Date().toISOString(),
  },
  {
    id: "app-2",
    name: "Cyber Scan",
    description: "Security scanning tool with vulnerability detection",
    status: "inactive",
    traffic: 5230,
    usage: 45,
    errors: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "app-3",
    name: "Data Nexus",
    description: "Data visualization and analytics dashboard",
    status: "error",
    traffic: 8760,
    usage: 92,
    errors: 7,
    createdAt: new Date().toISOString(),
  },
]

const initialChats: Chat[] = [
  {
    id: "chat-1",
    title: "Neural Chat Creation",
    messages: [
      {
        id: "msg-1",
        role: "user",
        content: "I need an AI-powered chat application with real-time translation",
        timestamp: new Date().toISOString(),
      },
      {
        id: "msg-2",
        role: "assistant",
        content:
          "I'll help you build a chat application with AI translation capabilities. What languages do you want to support?",
        timestamp: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    appId: "app-1",
  },
]

export function AppProvider({ children }: { children: ReactNode }) {
  const [apps, setApps] = useState<App[]>(initialApps)
  const [chats, setChats] = useState<Chat[]>(initialChats)

  const addChat = (chat: Chat) => {
    setChats(prev => [...prev, chat])
  }

  const addApp = (app: App) => {
    setApps(prev => [...prev, app])
  }

  const removeApp = (appId: string) => {
    setApps(prev => prev.filter(app => app.id !== appId))
  }

  const updateChat = (chatId: string, updatedChat: Chat) => {
    setChats(prev => prev.map(chat => (chat.id === chatId ? updatedChat : chat)))
  }

  return (
    <AppContext.Provider
      value={{
        apps,
        chats,
        setApps,
        setChats,
        addChat,
        addApp,
        removeApp,
        updateChat,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
} 