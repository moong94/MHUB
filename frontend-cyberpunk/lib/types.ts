export interface AppStructure {
  framework?: string
  dependencies?: string[]
  components: Array<{
    name: string
    type: string
    description: string
  }>
  routes?: string[]
  apis: Array<{
    name: string
    endpoint: string
    methods: string[]
  }>
  database?: {
    type?: string
    tables: string[]
    relationships?: string[]
  }
}

export interface MCPConfig {
  enabled?: boolean
  provider?: string
  apiKey: string
  endpoint: string
  model: string
  models?: string[]
  settings?: {
    temperature: number
    maxTokens: number
    streaming: boolean
  }
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