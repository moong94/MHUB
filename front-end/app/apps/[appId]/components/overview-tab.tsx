import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info } from "lucide-react"
import type { App } from "@/lib/types"

interface OverviewTabProps {
  app: App
}

export default function OverviewTab({ app }: OverviewTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="w-5 h-5" />
          App Information
        </CardTitle>
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
  )
} 