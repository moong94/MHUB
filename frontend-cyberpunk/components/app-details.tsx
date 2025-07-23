"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Activity, Users, AlertTriangle, Settings, Code, Database, Sparkles } from "lucide-react"
import type { App } from "@/lib/types"

interface AppDetailsProps {
  app: App
  onBack: () => void
}

export function AppDetails({ app, onBack }: AppDetailsProps) {
  const getStatusColor = (status: App["status"]) => {
    switch (status) {
      case "active":
        return "bg-status-active-bg text-status-active border-status-active-border"
      case "inactive":
        return "bg-status-inactive-bg text-status-inactive border-status-inactive-border"
      case "error":
        return "bg-status-error-bg text-status-error border-status-error-border"
    }
  }

  const getStatusIcon = (status: App["status"]) => {
    switch (status) {
      case "active":
        return <Activity className="w-4 h-4" />
      case "inactive":
        return <Users className="w-4 h-4" />
      case "error":
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-4 pb-4">
          {/* 헤더 섹션 - 뒤로가기 버튼과 제목을 같은 줄에 배치 */}
          <div className="flex items-start gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => {
                console.log("AppDetails: 뒤로가기 버튼 클릭됨")
                onBack()
              }} 
                              className="hover:bg-hover shrink-0 h-8 w-8 md:h-10 md:w-10 mt-2 md:mt-0"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#ff0040] to-[#ff6600] bg-clip-text text-transparent leading-tight">
                    {app.name}
                  </h1>
                  <p className="text-muted mt-2 text-sm md:text-base line-clamp-2">{app.description}</p>
                </div>
                <Badge className={`${getStatusColor(app.status)} shrink-0 mt-2 sm:mt-0`}>
                  {getStatusIcon(app.status)}
                  <span className="ml-2 capitalize">{app.status}</span>
                </Badge>
              </div>
            </div>
          </div>

          {/* 메트릭 카드들 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-gray bg-card-transparent">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted">Traffic</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red">{app.traffic.toLocaleString()}</div>
                <p className="text-xs text-muted mt-2">Total requests</p>
              </CardContent>
            </Card>

            <Card className="border-gray bg-card-transparent">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted">Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange">{app.usage}%</div>
                <p className="text-xs text-muted mt-2">Resource utilization</p>
              </CardContent>
            </Card>

            <Card className="border-gray bg-card-transparent">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted">Errors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-status-error">{app.errors}</div>
                <p className="text-xs text-muted mt-2">Error count</p>
              </CardContent>
            </Card>
          </div>

          {/* 탭 섹션 */}
          <Tabs defaultValue="overview" className="space-y-4 md:space-y-6">
                          <TabsList className="bg-card border border-gray p-2">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-hover data-[state=active]:text-white data-[state=inactive]:text-muted"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="structure"
                className="data-[state=active]:bg-hover data-[state=active]:text-white data-[state=inactive]:text-muted"
              >
                Structure
              </TabsTrigger>
              <TabsTrigger
                value="config"
                className="data-[state=active]:bg-hover data-[state=active]:text-white data-[state=inactive]:text-muted"
              >
                Configuration
              </TabsTrigger>
              <TabsTrigger
                value="logs"
                className="data-[state=active]:bg-hover data-[state=active]:text-white data-[state=inactive]:text-muted"
              >
                Logs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card className="border-[#2a2a3a] bg-[#12121a]/50">
                <CardHeader>
                  <CardTitle className="text-[#ff0040]">App Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-[#1e1e2a] rounded-lg border border-[#2a2a3a]">
                                              <div className="text-sm font-medium text-[#8a8a9a] mb-2">Created</div>
                      <div>{new Date(app.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div className="p-4 bg-[#1e1e2a] rounded-lg border border-[#2a2a3a]">
                                              <div className="text-sm font-medium text-[#8a8a9a] mb-2">Status</div>
                      <div className="capitalize">{app.status}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="structure" className="space-y-6">
              {app.structure ? (
                <div className="space-y-6">
                  <Card className="border-[#2a2a3a] bg-[#12121a]/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-[#ff0040]">
                        <Code className="w-5 h-5" />
                        Components
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {app.structure.components?.map((component, index: number) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-[#1e1e2a] rounded-lg border border-[#2a2a3a]"
                          >
                            <div>
                              <div className="font-medium">{component.name}</div>
                              <div className="text-sm text-[#8a8a9a]">{component.description}</div>
                            </div>
                            <Badge variant="outline" className="bg-[#2a2a3a]/50 border-[#3a3a4a] text-[#aaaaaa]">
                              {component.type}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-[#2a2a3a] bg-[#12121a]/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-[#ff6600]">
                        <Database className="w-5 h-5" />
                        APIs
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {app.structure.apis?.map((api, index: number) => (
                          <div key={index} className="p-4 bg-[#1e1e2a] rounded-lg border border-[#2a2a3a]">
                            <div className="font-medium">{api.name}</div>
                            <div className="text-sm text-[#8a8a9a]">{api.endpoint}</div>
                            <div className="flex gap-2 mt-4">
                              {api.methods?.map((method: string) => (
                                <Badge
                                  key={method}
                                  variant="outline"
                                  className="bg-[#2a2a3a]/50 border-[#3a3a4a] text-[#aaaaaa]"
                                >
                                  {method}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card className="border-[#2a2a3a] bg-[#12121a]/50">
                  <CardContent className="text-center py-4">
                    <Sparkles className="w-12 h-12 text-[#8a8a9a] mx-auto mb-4" />
                    <p className="text-[#8a8a9a]">No structure information available</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="config" className="space-y-6">
              {app.mcpConfig ? (
                <Card className="border-[#2a2a3a] bg-[#12121a]/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-[#ff0040]">
                      <Settings className="w-5 h-5" />
                      MCP Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-[#1e1e2a] rounded-lg border border-[#2a2a3a]">
                                              <div className="text-sm font-medium text-[#8a8a9a] mb-2">Model</div>
                      <div>{app.mcpConfig.model}</div>
                    </div>
                    <div className="p-4 bg-[#1e1e2a] rounded-lg border border-[#2a2a3a]">
                                              <div className="text-sm font-medium text-[#8a8a9a] mb-2">Endpoint</div>
                      <div>{app.mcpConfig.endpoint || "Not configured"}</div>
                    </div>
                    <div className="p-4 bg-[#1e1e2a] rounded-lg border border-[#2a2a3a]">
                                              <div className="text-sm font-medium text-[#8a8a9a] mb-2">API Key</div>
                      <div>{"*".repeat(20)}</div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-[#2a2a3a] bg-[#12121a]/50">
                  <CardContent className="text-center py-4">
                    <Settings className="w-12 h-12 text-[#8a8a9a] mx-auto mb-4" />
                    <p className="text-[#8a8a9a]">No configuration available</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="logs" className="space-y-6">
              <Card className="border-[#2a2a3a] bg-[#12121a]/50">
                <CardHeader>
                  <CardTitle className="text-[#ff0040]">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 bg-[#1e1e2a] rounded-lg border border-[#2a2a3a]">
                      <div className="w-3 h-3 bg-[#00ffaa] rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm">App deployed successfully</div>
                        <div className="text-xs text-[#8a8a9a] mt-2">2 hours ago</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-[#1e1e2a] rounded-lg border border-[#2a2a3a]">
                      <div className="w-3 h-3 bg-[#00ffff] rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm">Configuration updated</div>
                        <div className="text-xs text-[#8a8a9a] mt-2">5 hours ago</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-[#1e1e2a] rounded-lg border border-[#2a2a3a]">
                      <div className="w-3 h-3 bg-[#ffaa00] rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm">High traffic detected</div>
                        <div className="text-xs text-[#8a8a9a] mt-2">1 day ago</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
    </div>
  )
}
