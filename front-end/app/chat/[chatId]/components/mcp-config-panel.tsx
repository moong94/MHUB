"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings } from "lucide-react"

interface MCPConfig {
  apiKey: string
  endpoint: string
  model: string
}

interface MCPConfigPanelProps {
  mcpConfig: MCPConfig
  onConfigChange: (config: MCPConfig) => void
  onSubmit: () => void
}

export function MCPConfigPanel({
  mcpConfig,
  onConfigChange,
  onSubmit,
}: MCPConfigPanelProps) {
  return (
    <>
      <div className="flex-1 p-4 space-y-4 overflow-y-auto pb-20">
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
      </div>
      
      <div className="bg-cyber-main/95 backdrop-blur-sm border-t border-cyber-border/50 p-4 z-10 flex-shrink-0">
        <div className="flex justify-end">
          <Button
            variant="gradient"
            onClick={onSubmit}
            className="h-9 md:h-10 text-sm font-medium px-6"
          >
            <Settings className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Continue to Publish
          </Button>
        </div>
      </div>
    </>
  )
} 