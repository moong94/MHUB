"use client"

import { useParams, useRouter } from "next/navigation"
import { useAppContext } from "@/lib/context"
import { useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AppHeader from "./components/app-header"
import MetricsCards from "./components/metrics-cards"
import OverviewTab from "./components/overview-tab"
import StructureTab from "./components/structure-tab"
import ConfigTab from "./components/config-tab"
import LogsTab from "./components/logs-tab"

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

  if (!app) {
    return <div>Loading...</div>
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-4 pb-4">
        {/* 헤더 섹션 */}
        <AppHeader app={app} onBack={handleBackToDashboard} />

        {/* 메트릭 카드들 */}
        <MetricsCards app={app} />

        {/* 탭 섹션 */}
        <Tabs defaultValue="overview" className="space-y-4 md:space-y-6">
          <TabsList className="!mb-2">
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
            <OverviewTab app={app} />
          </TabsContent>

          <TabsContent value="structure" className="space-y-6">
            <StructureTab app={app} />
          </TabsContent>

          <TabsContent value="config" className="space-y-6">
            <ConfigTab app={app} />
          </TabsContent>

          <TabsContent value="logs" className="space-y-6">
            <LogsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 