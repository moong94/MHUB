import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { App } from "@/lib/types"

interface MetricsCardsProps {
  app: App
}

export default function MetricsCards({ app }: MetricsCardsProps) {
  return (
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
  )
} 