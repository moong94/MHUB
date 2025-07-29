import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"

interface SearchAndFilterProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  filter: "all" | "active" | "inactive" | "error"
  onFilterChange: (filter: "all" | "active" | "inactive" | "error") => void
}

export default function SearchAndFilter({
  searchQuery,
  onSearchChange,
  filter,
  onFilterChange
}: SearchAndFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1 max-w-none sm:max-w-md">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyber-text-secondary" />
        <Input
          placeholder="Search apps..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12"
        />
      </div>

      <Tabs value={filter} onValueChange={(value) => onFilterChange(value as typeof filter)}>
        <TabsList className="grid w-full grid-cols-4 h-10 md:h-11">
          {(["all", "active", "inactive", "error"] as const).map((status) => (
            <TabsTrigger
              key={status}
              value={status}
              className="capitalize text-xs md:text-sm"
            >
              {status}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
} 