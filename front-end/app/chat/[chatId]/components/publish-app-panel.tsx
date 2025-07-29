"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Rocket } from "lucide-react"

interface AppDetails {
  name: string
  description: string
}

interface PublishAppPanelProps {
  appDetails: AppDetails
  onDetailsChange: (details: AppDetails) => void
  onPublish: () => void
}

export function PublishAppPanel({
  appDetails,
  onDetailsChange,
  onPublish,
}: PublishAppPanelProps) {
  return (
    <>
      <div className="flex-1 p-4 space-y-4 overflow-y-auto pb-20">
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
      </div>
      
      <div className="bg-cyber-main/95 backdrop-blur-sm border-t border-cyber-border/50 p-4 z-10 flex-shrink-0">
        <div className="flex justify-end">
          <Button
            variant="gradient"
            onClick={onPublish}
            className="h-9 md:h-10 text-sm font-medium px-6"
            disabled={!appDetails.name || !appDetails.description}
          >
            <Rocket className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Publish App
          </Button>
        </div>
      </div>
    </>
  )
} 