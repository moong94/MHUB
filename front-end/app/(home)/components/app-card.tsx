import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2 } from "lucide-react"
import { useAppStatus } from "../hooks/use-app-status"
import type { App } from "@/lib/types"

interface AppCardProps {
  app: App
  onAppClick: (appId: string) => void
  onRemoveApp: (appId: string) => void
}

export default function AppCard({ app, onAppClick, onRemoveApp }: AppCardProps) {
  const { getStatusVariant, getStatusIcon } = useAppStatus()

  return (
    <Card
      className="group cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-cyber-red/30 card-transparent overflow-hidden"
      onClick={() => onAppClick(app.id)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-red/5 to-cyber-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base md:text-lg group-hover:text-cyber-red transition-colors truncate">
              {app.name}
            </CardTitle>
            <p className="text-xs md:text-sm text-cyber-text-secondary mt-2 line-clamp-2 md:line-clamp-3">
              {app.description}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              onRemoveApp(app.id)
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-status-error/20 hover:text-status-error h-8 w-8 shrink-0"
          >
            <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-0">
        <div className="flex items-center justify-between">
          <Badge variant={getStatusVariant(app.status)} className="text-xs">
            {getStatusIcon(app.status)}
            <span className="ml-1 capitalize">{app.status}</span>
          </Badge>
          <span className="text-xs text-cyber-text-secondary">
            {new Date(app.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-2 rounded-lg card-hover">
            <div className="text-sm md:text-lg font-semibold text-cyber-red truncate">
              {app.traffic > 999 ? `${Math.floor(app.traffic / 1000)}k` : app.traffic.toLocaleString()}
            </div>
            <div className="text-xs text-cyber-text-secondary">Traffic</div>
          </div>
          <div className="p-2 rounded-lg card-hover">
            <div className="text-sm md:text-lg font-semibold text-cyber-orange">{app.usage}%</div>
            <div className="text-xs text-cyber-text-secondary">Usage</div>
          </div>
          <div className="p-2 rounded-lg card-hover">
            <div className="text-sm md:text-lg font-semibold text-status-error">{app.errors}</div>
            <div className="text-xs text-cyber-text-secondary">Errors</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 