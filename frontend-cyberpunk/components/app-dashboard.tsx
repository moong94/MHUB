"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Trash2, Activity, Users, AlertTriangle, Sparkles } from "lucide-react"
import type { App } from "@/lib/types"

interface AppDashboardProps {
  apps: App[]
  onAppClick: (appId: string) => void
  onNewApp: () => void
  onDeleteApp: (appId: string) => void
}

export function AppDashboard({ apps, onAppClick, onNewApp, onDeleteApp }: AppDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "active" | "inactive" | "error">("all")

  const filteredApps = apps.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === "all" || app.status === filter
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: App["status"]) => {
    switch (status) {
      case "active":
        return "bg-[#00ff88]/10 text-[#00ff88] border-[#00ff88]/30"
      case "inactive":
        return "bg-[#aaaaaa]/10 text-[#aaaaaa] border-[#aaaaaa]/30"
      case "error":
        return "bg-[#ff0055]/10 text-[#ff0055] border-[#ff0055]/30"
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
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#ff0040] to-[#ff6600] bg-clip-text text-transparent">
              Apps Dashboard
            </h1>
            <p className="text-[#8a8a9a] mt-2 text-sm md:text-base">
              Manage and monitor your AI-powered applications
            </p>
          </div>

          <Button
            onClick={onNewApp}
            className="bg-gradient-to-r from-[#ff0040] to-[#ff6600] hover:from-[#ff0055] hover:to-[#ff7700] text-black font-medium h-10 md:h-11 shrink-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Create New App</span>
            <span className="sm:hidden">New App</span>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-none sm:max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#8a8a9a]" />
            <Input
              placeholder="Search apps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
                              className="pl-12 bg-[#12121a] border-[#2a2a3a] focus-visible:ring-[#ff0040] h-10 md:h-11"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {(["all", "active", "inactive", "error"] as const).map((status) => (
              <Button
                key={status}
                variant={filter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(status)}
                className={cn(
                  "capitalize shrink-0 h-10 px-4 md:h-11 md:px-4",
                  filter === status
                    ? "bg-[#1e1e2a] text-white border-[#2a2a3a]"
                    : "bg-transparent text-[#8a8a9a] border-[#2a2a3a] hover:bg-[#1e1e2a]",
                )}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>

        {filteredApps.length === 0 ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#1e1e2a] flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-[#8a8a9a]" />
            </div>
            <h3 className="text-lg md:text-xl font-medium mb-2">No apps found</h3>
            <p className="text-[#8a8a9a] mb-4 max-w-md mx-auto text-sm md:text-base px-4">
              {searchQuery || filter !== "all"
                ? "Try adjusting your search or filters"
                : "Get started by creating your first AI-powered app"}
            </p>
            {!searchQuery && filter === "all" && (
              <Button
                onClick={onNewApp}
                className="bg-gradient-to-r from-[#ff0040] to-[#ff6600] hover:from-[#ff0055] hover:to-[#ff7700] text-black font-medium h-10 md:h-11"
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
                className="group cursor-pointer hover:shadow-lg transition-all duration-200 border-[#2a2a3a] hover:border-[#ff0040]/30 bg-[#12121a]/50 backdrop-blur-sm overflow-hidden"
                onClick={() => onAppClick(app.id)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff0040]/5 to-[#ff6600]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base md:text-lg group-hover:text-[#ff0040] transition-colors truncate">
                        {app.name}
                      </CardTitle>
                      <p className="text-xs md:text-sm text-[#8a8a9a] mt-2 line-clamp-2 md:line-clamp-3">
                        {app.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteApp(app.id)
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#ff0055]/20 hover:text-[#ff0055] h-8 w-8 shrink-0"
                    >
                      <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 pt-0">
                  <div className="flex items-center justify-between">
                    <Badge className={cn(getStatusColor(app.status), "text-xs")}>
                      {getStatusIcon(app.status)}
                      <span className="ml-1 capitalize">{app.status}</span>
                    </Badge>
                    <span className="text-xs text-[#8a8a9a]">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-2 rounded-lg bg-[#1e1e2a]/50">
                      <div className="text-sm md:text-lg font-semibold text-[#ff0040] truncate">
                        {app.traffic > 999 ? `${Math.floor(app.traffic / 1000)}k` : app.traffic.toLocaleString()}
                      </div>
                      <div className="text-xs text-[#8a8a9a]">Traffic</div>
                    </div>
                    <div className="p-2 rounded-lg bg-[#1e1e2a]/50">
                      <div className="text-sm md:text-lg font-semibold text-[#ff6600]">{app.usage}%</div>
                      <div className="text-xs text-[#8a8a9a]">Usage</div>
                    </div>
                    <div className="p-2 rounded-lg bg-[#1e1e2a]/50">
                      <div className="text-sm md:text-lg font-semibold text-[#ff0055]">{app.errors}</div>
                      <div className="text-xs text-[#8a8a9a]">Errors</div>
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
