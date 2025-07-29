"use client"

import { useParams, useRouter } from "next/navigation"
import { useAppContext } from "@/lib/context"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Activity, Users, AlertTriangle, Settings, Code, Database, Sparkles } from "lucide-react"
import type { App } from "@/lib/types"

export default function AppDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const appId = params.appId as string
  
  const { apps } = useAppContext()
  
  const app = apps.find(a => a.id === appId)
  
  useEffect(() => {
    if (!app) {
      router.push("/")
    }
  }, [app, router])

  const handleBackToDashboard = () => {
    console.log("뒤로가기 버튼 클릭됨") // 디버깅용 로그 추가
    try {
      // 브라우저 히스토리에서 뒤로가기 시도
      if (window.history.length > 1) {
        router.back()
      } else {
        // 히스토리가 없으면 홈으로 이동
        router.push("/")
      }
    } catch (error) {
      console.error("뒤로가기 중 오류 발생:", error)
      // 오류 발생시 홈으로 강제 이동
      router.replace("/")
    }
  }

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
        return <Activity className="w-4 h-4" />
      case "inactive":
        return <Users className="w-4 h-4" />
      case "error":
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  if (!app) {
    return <div>Loading...</div>
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
              handleBackToDashboard()
            }} 
            className="shrink-0 h-8 w-8 md:h-10 md:w-10 mt-2 md:mt-0"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text leading-tight">
                  {app.name}
                </h1>
                <p className="text-cyber-text-secondary mt-2 text-sm md:text-base line-clamp-2">{app.description}</p>
              </div>
              <Badge variant={getStatusVariant(app.status)} className="shrink-0 mt-2 sm:mt-0">
                {getStatusIcon(app.status)}
                <span className="ml-2 capitalize">{app.status}</span>
              </Badge>
            </div>
          </div>
        </div>

        {/* 메트릭 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="card-transparent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-cyber-text-secondary">Traffic</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cyber-red">{app.traffic.toLocaleString()}</div>
              <p className="text-xs text-cyber-text-secondary mt-2">Total requests</p>
            </CardContent>
          </Card>

          <Card className="card-transparent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-cyber-text-secondary">Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cyber-orange">{app.usage}%</div>
              <p className="text-xs text-cyber-text-secondary mt-2">Resource utilization</p>
            </CardContent>
          </Card>

          <Card className="card-transparent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-cyber-text-secondary">Errors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-status-error">{app.errors}</div>
              <p className="text-xs text-cyber-text-secondary mt-2">Error count</p>
            </CardContent>
          </Card>
        </div>

        {/* 탭 섹션 */}
        <Tabs defaultValue="overview" className="space-y-4 md:space-y-6">
          <TabsList>
            <TabsTrigger value="overview">
              Overview
            </TabsTrigger>
            <TabsTrigger value="structure">
              Structure
            </TabsTrigger>
            <TabsTrigger value="config">
              Configuration
            </TabsTrigger>
            <TabsTrigger value="logs">
              Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>App Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 card-hover rounded-lg">
                    <div className="text-sm font-medium text-cyber-text-secondary mb-2">Created</div>
                    <div>{new Date(app.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className="p-4 card-hover rounded-lg">
                    <div className="text-sm font-medium text-cyber-text-secondary mb-2">Status</div>
                    <div className="capitalize">{app.status}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="structure" className="space-y-6">
            {app.structure ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      Components
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {app.structure.components?.map((component, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 card-hover rounded-lg"
                        >
                          <div>
                            <div className="font-medium">{component.name}</div>
                            <div className="text-sm text-cyber-text-secondary">{component.description}</div>
                          </div>
                          <Badge variant="outline">
                            {component.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-cyber-orange">
                      <Database className="w-5 h-5" />
                      APIs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {app.structure.apis?.map((api, index: number) => (
                        <div key={index} className="p-4 card-hover rounded-lg">
                          <div className="font-medium">{api.name}</div>
                          <div className="text-sm text-cyber-text-secondary">{api.endpoint}</div>
                          <div className="flex gap-2 mt-4">
                            {api.methods?.map((method: string) => (
                              <Badge
                                key={method}
                                variant="outline"
                                className="bg-cyber-border/50 border-cyber-border-light text-cyber-text-tertiary"
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
              <Card>
                <CardContent className="text-center py-4">
                  <Sparkles className="w-12 h-12 text-cyber-text-secondary mx-auto mb-4" />
                  <p className="text-cyber-text-secondary">No structure information available</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="config" className="space-y-6">
            {app.mcpConfig ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    MCP Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 card-hover rounded-lg">
                    <div className="text-sm font-medium text-cyber-text-secondary mb-2">Model</div>
                    <div>{app.mcpConfig.model}</div>
                  </div>
                  <div className="p-4 card-hover rounded-lg">
                    <div className="text-sm font-medium text-cyber-text-secondary mb-2">Endpoint</div>
                    <div>{app.mcpConfig.endpoint || "Not configured"}</div>
                  </div>
                  <div className="p-4 card-hover rounded-lg">
                    <div className="text-sm font-medium text-cyber-text-secondary mb-2">API Key</div>
                    <div>{"*".repeat(20)}</div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="text-center py-4">
                  <Settings className="w-12 h-12 text-cyber-text-secondary mx-auto mb-4" />
                  <p className="text-cyber-text-secondary">No configuration available</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="logs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 p-4 card-hover rounded-lg">
                    <div className="w-3 h-3 bg-status-active rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm">App deployed successfully</div>
                      <div className="text-xs text-cyber-text-secondary mt-2">2 hours ago</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 card-hover rounded-lg">
                    <div className="w-3 h-3 bg-cyber-orange rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm">Configuration updated</div>
                      <div className="text-xs text-cyber-text-secondary mt-2">5 hours ago</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 card-hover rounded-lg">
                    <div className="w-3 h-3 bg-status-error rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm">High traffic detected</div>
                      <div className="text-xs text-cyber-text-secondary mt-2">1 day ago</div>
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