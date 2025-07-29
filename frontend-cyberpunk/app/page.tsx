"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppContext } from "@/lib/context"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Trash2, Activity, Users, AlertTriangle, Sparkles } from "lucide-react"
import type { App, Chat } from "@/lib/types"

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

  const getStatusVariant = (status: App["status"]) => {
    switch (status) {
      case "active":
        return "status"
      case "inactive":
        return "inactive"
      case "error":
        return "error"
      default:
        return "cyber"
    }
  }

  const getStatusIcon = (status: App["status"]) => {
    switch (status) {
      case "active":
        return <Activity className="w-3 h-3" />
      case "inactive":
        return <Users className="w-3 h-3" />
      case "error":
        return <AlertTriangle className="w-3 h-3" />
    }
  }



  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold gradient-text">
              Apps Dashboard
            </h1>
            <p className="text-cyber-text-secondary mt-2 text-sm md:text-base">
              Manage and monitor your AI-powered applications
            </p>
          </div>

          <Button
            variant="gradient"
            onClick={handleNewApp}
            className="h-10 md:h-11 shrink-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Create New App</span>
            <span className="sm:hidden">New App</span>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-none sm:max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyber-text-secondary" />
            <Input
              placeholder="Search apps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {(["all", "active", "inactive", "error"] as const).map((status) => (
              <Button
                key={status}
                variant={filter === status ? "cyber" : "outline"}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  setFilter(status)
                }}
                className={cn(
                  "capitalize shrink-0 h-10 px-4 md:h-11 md:px-4"
                )}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>

        {filteredApps.length === 0 ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-cyber-hover flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-cyber-text-secondary" />
            </div>
            <h3 className="text-lg md:text-xl font-medium mb-2">No apps found</h3>
            <p className="text-cyber-text-secondary mb-4 max-w-md mx-auto text-sm md:text-base px-4">
              {searchQuery || filter !== "all"
                ? "Try adjusting your search or filters"
                : "Get started by creating your first AI-powered app"}
            </p>
            {!searchQuery && filter === "all" && (
              <Button
                variant="gradient"
                onClick={handleNewApp}
                className="h-10 md:h-11"
              >
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Create Your First App</span>
                <span className="sm:hidden">Create App</span>
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredApps.map((app) => (
              <Card
                key={app.id}
                className="group cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-cyber-red/30 card-transparent overflow-hidden"
                onClick={() => handleAppClick(app.id)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-red/5 to-cyber-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base md:text-lg group-hover:text-cyber-red transition-colors truncate">
                        {app.name}
                      </CardTitle>
                      <p className="text-xs md:text-sm text-cyber-text-secondary mt-2 line-clamp-2 md:line-clamp-3">
                        {app.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeApp(app.id)
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-status-error/20 hover:text-status-error h-8 w-8 shrink-0"
                    >
                      <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 pt-0">
                  <div className="flex items-center justify-between">
                    <Badge variant={getStatusVariant(app.status)} className="text-xs">
                      {getStatusIcon(app.status)}
                      <span className="ml-1 capitalize">{app.status}</span>
                    </Badge>
                    <span className="text-xs text-cyber-text-secondary">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-2 rounded-lg card-hover">
                      <div className="text-sm md:text-lg font-semibold text-cyber-red truncate">
                        {app.traffic > 999 ? `${Math.floor(app.traffic / 1000)}k` : app.traffic.toLocaleString()}
                      </div>
                      <div className="text-xs text-cyber-text-secondary">Traffic</div>
                    </div>
                    <div className="p-2 rounded-lg card-hover">
                      <div className="text-sm md:text-lg font-semibold text-cyber-orange">{app.usage}%</div>
                      <div className="text-xs text-cyber-text-secondary">Usage</div>
                    </div>
                    <div className="p-2 rounded-lg card-hover">
                      <div className="text-sm md:text-lg font-semibold text-status-error">{app.errors}</div>
                      <div className="text-xs text-cyber-text-secondary">Errors</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
