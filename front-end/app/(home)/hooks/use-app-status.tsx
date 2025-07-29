import { Activity, Users, AlertTriangle } from "lucide-react"
import type { App } from "@/lib/types"

export const useAppStatus = () => {
  const getStatusVariant = (status: App["status"]) => {
    switch (status) {
      case "active":
        return "status"
      case "inactive":
        return "inactive"
      case "error":
        return "error"
      default:
        return "cyber"
    }
  }

  const getStatusIcon = (status: App["status"]) => {
    switch (status) {
      case "active":
        return <Activity className="w-3 h-3" />
      case "inactive":
        return <Users className="w-3 h-3" />
      case "error":
        return <AlertTriangle className="w-3 h-3" />
    }
  }

  return {
    getStatusVariant,
    getStatusIcon
  }
} 