import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { App } from "@/lib/types"
import { ArrowLeft } from "lucide-react"
import { useAppStatus } from "../hooks/use-app-status"

interface AppHeaderProps {
  app: App
  onBack: () => void
}

export default function AppHeader({ app, onBack }: AppHeaderProps) {
  const { getStatusVariant, getStatusIcon } = useAppStatus()

  return (
    <div className="flex items-start gap-4">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => {
          console.log("AppDetails: 뒤로가기 버튼 클릭됨")
          onBack()
        }} 
        className="shrink-0 h-8 w-8 md:h-10 md:w-10 mt-2 md:mt-0"
      >
        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
      </Button>
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text leading-tight">
              {app.name}
            </h1>
            <p className="text-cyber-text-secondary mt-2 text-sm md:text-base line-clamp-2">{app.description}</p>
          </div>
          <Badge variant={getStatusVariant(app.status)} className="shrink-0 mt-0 max-w-fit">
            {getStatusIcon(app.status)}
            <span className="ml-2 capitalize">{app.status}</span>
          </Badge>
        </div>
      </div>
    </div>
  )
} 