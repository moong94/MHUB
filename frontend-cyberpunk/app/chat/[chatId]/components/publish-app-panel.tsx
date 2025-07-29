"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Rocket, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface AppDetails {
  name: string
  description: string
}

interface PublishAppPanelProps {
  appDetails: AppDetails
  onDetailsChange: (details: AppDetails) => void
  onPublish: () => void
  onGoBack: () => void
  isMobile: boolean
  showMobilePanel?: boolean
  onCloseMobilePanel?: () => void
}

export function PublishAppPanel({
  appDetails,
  onDetailsChange,
  onPublish,
  onGoBack,
  isMobile,
  showMobilePanel = true,
  onCloseMobilePanel,
}: PublishAppPanelProps) {
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
              Publish Your App
            </h3>
            <p className="text-xs md:text-sm text-cyber-text-secondary">Add final details and publish your app to make it live.</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>App Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="appName">
                App Name
              </Label>
              <Input
                id="appName"
                value={appDetails.name}
                onChange={(e) => onDetailsChange({ ...appDetails, name: e.target.value })}
                placeholder="My Awesome App"
              />
            </div>
            <div>
              <Label htmlFor="appDescription">
                Description
              </Label>
              <Textarea
                id="appDescription"
                value={appDetails.description}
                onChange={(e) => onDetailsChange({ ...appDetails, description: e.target.value })}
                placeholder="Describe what your app does..."
                rows={4}
                className="resize-none"
              />
            </div>
          </CardContent>
        </Card>

        <div className="pb-4">
          <Button
            variant="gradient"
            onClick={onPublish}
            className="w-full h-10 md:h-12 text-sm md:text-lg font-medium"
            disabled={!appDetails.name || !appDetails.description}
          >
            <Rocket className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Publish App
          </Button>
        </div>
      </div>
    </div>
  )
} 