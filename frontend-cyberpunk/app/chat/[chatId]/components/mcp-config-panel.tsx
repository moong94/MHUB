"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Settings, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface MCPConfig {
  apiKey: string
  endpoint: string
  model: string
}

interface MCPConfigPanelProps {
  mcpConfig: MCPConfig
  onConfigChange: (config: MCPConfig) => void
  onSubmit: () => void
  onGoBack: () => void
  isMobile: boolean
  showMobilePanel?: boolean
  onCloseMobilePanel?: () => void
}

export function MCPConfigPanel({
  mcpConfig,
  onConfigChange,
  onSubmit,
  onGoBack,
  isMobile,
  showMobilePanel = true,
  onCloseMobilePanel,
}: MCPConfigPanelProps) {
  return (
    <div className={cn(
      "h-full overflow-y-auto transition-all duration-300",
      isMobile ? (showMobilePanel ? "fixed inset-x-0 top-16 bottom-0 bg-cyber-main z-50" : "hidden") : "w-1/2"
    )}>
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-4 mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={isMobile ? onCloseMobilePanel : onGoBack}
            className="h-8 w-8 md:h-10 md:w-10"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h3 className="text-lg md:text-2xl font-semibold gradient-text">
              MCP Configuration
            </h3>
            <p className="text-xs md:text-sm text-cyber-text-secondary">Configure the Model Context Protocol settings for your app.</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>API Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="apiKey">
                API Key
              </Label>
              <Input
                id="apiKey"
                type="password"
                value={mcpConfig.apiKey}
                onChange={(e) => onConfigChange({ ...mcpConfig, apiKey: e.target.value })}
                placeholder="Enter your API key"
              />
            </div>
            <div>
              <Label htmlFor="endpoint">
                Endpoint
              </Label>
              <Input
                id="endpoint"
                value={mcpConfig.endpoint}
                onChange={(e) => onConfigChange({ ...mcpConfig, endpoint: e.target.value })}
                placeholder="https://api.example.com"
              />
            </div>
            <div>
              <Label htmlFor="model">
                Model
              </Label>
              <Input
                id="model"
                value={mcpConfig.model}
                onChange={(e) => onConfigChange({ ...mcpConfig, model: e.target.value })}
                placeholder="gpt-4"
              />
            </div>
          </CardContent>
        </Card>

        <div className="pb-4">
          <Button
            variant="gradient"
            onClick={onSubmit}
            className="w-full h-10 md:h-12 text-sm md:text-lg font-medium"
          >
            <Settings className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Continue to Publish
          </Button>
        </div>
      </div>
    </div>
  )
} 