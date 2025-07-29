import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from "lucide-react"

export default function LogsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Recent Activity
        </CardTitle>
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
  )
} 