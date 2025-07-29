export interface AppStructure {
  components: Array<{
    name: string
    type: string
    description: string
  }>
  apis: Array<{
    name: string
    endpoint: string
    methods: string[]
  }>
}

export interface MCPConfig {
  apiKey: string
  endpoint: string
  model: string
}

export interface App {
  id: string
  name: string
  description: string
  status: "active" | "inactive" | "error"
  traffic: number
  usage: number
  errors: number
  createdAt: string
  structure?: AppStructure
  mcpConfig?: MCPConfig
}

export interface Chat {
  id: string
  title: string
  messages: Array<{
    id: string
    role: "user" | "assistant"
    content: string
    timestamp: string
  }>
  createdAt: string
  appId?: string
} 