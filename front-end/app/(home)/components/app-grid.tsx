import AppCard from "./app-card"
import type { App } from "@/lib/types"

interface AppGridProps {
  apps: App[]
  onAppClick: (appId: string) => void
  onRemoveApp: (appId: string) => void
}

export default function AppGrid({ apps, onAppClick, onRemoveApp }: AppGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {apps.map((app) => (
        <AppCard
          key={app.id}
          app={app}
          onAppClick={onAppClick}
          onRemoveApp={onRemoveApp}
        />
      ))}
    </div>
  )
} 