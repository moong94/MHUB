import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Sparkles } from "lucide-react"
import type { App } from "@/lib/types"

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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Components
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {app.structure.components?.map((component, index: number) => (
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
          <CardTitle className="flex items-center gap-2 text-cyber-orange">
            <Database className="w-5 h-5" />
            APIs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {app.structure.apis?.map((api, index: number) => (
              <div key={index} className="p-4 card-hover rounded-lg">
                <div className="font-medium">{api.name}</div>
                <div className="text-sm text-cyber-text-secondary">{api.endpoint}</div>
                <div className="flex gap-2 mt-4">
                  {api.methods?.map((method: string) => (
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
    </div>
  )
} 