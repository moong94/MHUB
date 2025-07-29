import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface DashboardHeaderProps {
  onNewApp: () => void
}

export default function DashboardHeader({ onNewApp }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold gradient-text">
          Apps Dashboard
        </h1>
        <p className="text-cyber-text-secondary mt-2 text-sm md:text-base">
          Manage and monitor your AI-powered applications
        </p>
      </div>

      <Button
        variant="gradient"
        onClick={onNewApp}
        className="h-10 md:h-11 shrink-0"
      >
        <Plus className="w-4 h-4 mr-2" />
        <span className="hidden sm:inline">Create New App</span>
        <span className="sm:hidden">New App</span>
      </Button>
    </div>
  )
} 