import { AppFlow } from "@/components/app-flow"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { App } from "@/lib/types"
import { Info, Sparkles } from "lucide-react"

interface StructureTabProps {
  app: App
}

export default function StructureTab({ app }: StructureTabProps) {
  if (!app.structure) {
    return (
      <Card>
        <CardContent className="text-center py-4">
          <Sparkles className="w-12 h-12 text-cyber-text-secondary mx-auto mb-4" />
          <p className="text-cyber-text-secondary">No structure information available</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="w-5 h-5" />
          Structure
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 h-[400px]">
        <AppFlow />
      </CardContent>
    </Card>
  )
} 