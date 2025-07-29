"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowLeft } from "lucide-react"
import type { AppStructure } from "@/lib/types"
import { cn } from "@/lib/utils"

interface StructureReviewPanelProps {
  appStructure: AppStructure | null
  onApprove: () => void
  onRequestChanges: () => void
  onGoBack: () => void
  isMobile: boolean
  showMobilePanel?: boolean
  onCloseMobilePanel?: () => void
}

export function StructureReviewPanel({
  appStructure,
  onApprove,
  onRequestChanges,
  onGoBack,
  isMobile,
  showMobilePanel = true,
  onCloseMobilePanel,
}: StructureReviewPanelProps) {
  if (!appStructure) return null

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
          <div className="flex-1 min-w-0">
            <h3 className="text-lg md:text-2xl font-semibold gradient-text">
              App Structure Review
            </h3>
            <p className="text-xs md:text-sm text-cyber-text-secondary mt-2">
              Review the generated app structure and approve or request modifications.
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Components</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {appStructure.components.map((component, index: number) => (
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
            <CardTitle className="text-cyber-orange">APIs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {appStructure.apis.map((api, index: number) => (
                <div key={index} className="p-4 card-hover rounded-lg">
                  <div className="font-medium">{api.name}</div>
                  <div className="text-sm text-cyber-text-secondary">{api.endpoint}</div>
                  <div className="flex gap-2 mt-4">
                    {api.methods.map((method: string) => (
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

        <div className="space-y-4 pb-4">
          <Button
            variant="gradient"
            onClick={() => {
              onApprove()
              if (isMobile && onCloseMobilePanel) onCloseMobilePanel()
            }}
            className="w-full h-10 md:h-12 text-sm md:text-lg font-medium"
          >
            <Check className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Approve Structure
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              onRequestChanges()
              if (isMobile && onCloseMobilePanel) onCloseMobilePanel()
            }}
            className="w-full h-10 md:h-12 text-sm md:text-lg font-medium"
          >
            💬 Ask for Changes
          </Button>
        </div>
      </div>
    </div>
  )
} 