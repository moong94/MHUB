import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { App } from "@/lib/types"
import { Settings } from "lucide-react"

interface ConfigTabProps {
  app: App
}

export default function ConfigTab({ app }: ConfigTabProps) {
  if (!app.mcpConfig) {
    return (
      <Card>
        <CardContent className="text-center py-4">
          <Settings className="w-12 h-12 text-cyber-text-secondary mx-auto mb-4" />
          <p className="text-cyber-text-secondary">No configuration available</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          MCP Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="p-4 card-hover rounded-lg">
          <div className="text-sm font-medium text-cyber-text-secondary">Model</div>
          <div>{app.mcpConfig.model}</div>
        </div>
        <div className="p-4 card-hover rounded-lg">
          <div className="text-sm font-medium text-cyber-text-secondary">Endpoint</div>
          <div>{app.mcpConfig.endpoint || "Not configured"}</div>
        </div>
        <div className="p-4 card-hover rounded-lg">
          <div className="text-sm font-medium text-cyber-text-secondary">API Key</div>
          <div>{"*".repeat(20)}</div>
        </div>
      </CardContent>
    </Card>
  )
} 