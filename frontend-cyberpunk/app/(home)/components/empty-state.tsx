import { Button } from "@/components/ui/button"
import { Plus, Sparkles } from "lucide-react"

interface EmptyStateProps {
  searchQuery: string
  filter: "all" | "active" | "inactive" | "error"
  onNewApp: () => void
}

export default function EmptyState({ searchQuery, filter, onNewApp }: EmptyStateProps) {
  const isFiltered = searchQuery || filter !== "all"

  return (
    <div className="text-center py-4">
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-cyber-hover flex items-center justify-center mx-auto mb-4">
        <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-cyber-text-secondary" />
      </div>
      <h3 className="text-lg md:text-xl font-medium mb-2">No apps found</h3>
      <p className="text-cyber-text-secondary mb-4 max-w-md mx-auto text-sm md:text-base px-4">
        {isFiltered
          ? "Try adjusting your search or filters"
          : "Get started by creating your first AI-powered app"}
      </p>
      {!isFiltered && (
        <Button
          variant="gradient"
          onClick={onNewApp}
          className="h-10 md:h-11"
        >
          <Plus className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Create Your First App</span>
          <span className="sm:hidden">Create App</span>
        </Button>
      )}
    </div>
  )
} 