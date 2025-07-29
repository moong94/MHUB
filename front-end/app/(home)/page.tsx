"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppContext } from "@/lib/context"
import DashboardHeader from "./components/dashboard-header"
import SearchAndFilter from "./components/search-and-filter"
import AppGrid from "./components/app-grid"
import EmptyState from "./components/empty-state"
import type { Chat } from "@/lib/types"

export default function Home() {
  const router = useRouter()
  const { apps, removeApp, addChat } = useAppContext()
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "active" | "inactive" | "error">("all")

  const handleAppClick = (appId: string) => {
    router.push(`/apps/${appId}`)
  }

  const handleNewApp = () => {
    // 새 앱 생성은 새 채팅을 통해 이루어짐 - layout과 동일한 로직
    const newChat: Chat = {
      id: `chat-${Date.now()}`,
      title: "New App Creation", 
      messages: [],
      createdAt: new Date().toISOString(),
    }

    addChat(newChat)
    router.push(`/chat/${newChat.id}`)
  }

  const filteredApps = apps.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === "all" || app.status === filter
    return matchesSearch && matchesFilter
  })



  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-4">
        <DashboardHeader onNewApp={handleNewApp} />

        <SearchAndFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filter={filter}
          onFilterChange={setFilter}
        />

        {filteredApps.length === 0 ? (
          <EmptyState
            searchQuery={searchQuery}
            filter={filter}
            onNewApp={handleNewApp}
          />
        ) : (
          <AppGrid
            apps={filteredApps}
            onAppClick={handleAppClick}
            onRemoveApp={removeApp}
          />
        )}
      </div>
    </div>
  )
}
