import { useState, useEffect } from "react"
import type { App, AppStructure, Chat } from "@/lib/types"

export type CreationStep = "building" | "chat" | "structure" | "mcp" | "publish"

interface MCPConfig {
  apiKey: string
  endpoint: string
  model: string
}

interface AppDetails {
  name: string
  description: string
}

export function useAppCreationWorkflow() {
  const [currentStep, setCurrentStep] = useState<CreationStep>("chat")
  const [appStructure, setAppStructure] = useState<AppStructure | null>(null)
  const [mcpConfig, setMcpConfig] = useState<MCPConfig>({
    apiKey: "",
    endpoint: "",
    model: "gpt-4",
  })
  const [appDetails, setAppDetails] = useState<AppDetails>({
    name: "",
    description: "",
  })

  // Building 단계에서 3초 후 자동으로 structure 단계로 이동
  useEffect(() => {
    if (currentStep === "building") {
      const timer = setTimeout(() => {
        setAppStructure(generateAppStructure())
        setCurrentStep("structure")
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [currentStep])

  const generateAppStructure = (): AppStructure => {
    return {
      components: [
        { name: "Header", type: "navigation", description: "Main navigation bar" },
        { name: "Dashboard", type: "view", description: "Main dashboard view" },
        { name: "UserProfile", type: "component", description: "User profile management" },
        { name: "Settings", type: "component", description: "Application settings" },
      ],
      apis: [
        { name: "User API", endpoint: "/api/users", methods: ["GET", "POST", "PUT"] },
        { name: "Data API", endpoint: "/api/data", methods: ["GET", "POST"] },
      ],
    }
  }

  const generateAIResponse = (step: CreationStep): string => {
    if (step === "chat") {
      const responses = [
        "I understand you want to create an app. Let me help you design the structure and functionality.",
        "Great idea! I can help you build that. What specific features would you like to include?",
        "That sounds like an interesting project. Let me break down the components we'll need.",
        "Perfect! I have a good understanding of your requirements. Let me create the app structure for you.",
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    } else if (step === "structure") {
      const responses = [
        "I've updated the app structure based on your feedback. Please review the changes.",
        "Good point! I've modified the components and APIs accordingly. Take a look at the updated structure.",
        "Thanks for the feedback! I've restructured the app to better match your requirements.",
        "I've made those changes to the app structure. The updated design should better fit your needs.",
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    } else {
      const responses = [
        "I'm here to help with any questions about your app configuration.",
        "Feel free to ask me anything about the setup process.",
        "I can assist you with any concerns or modifications you need.",
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }
  }

  const progressToNextStep = (chat: Chat) => {
    if (currentStep === "chat" && chat.messages.length >= 4) {
      setCurrentStep("building")
    } else if (currentStep === "structure") {
      setAppStructure(generateAppStructure())
    }
  }

  const handleApproveStructure = () => {
    setCurrentStep("mcp")
  }

  const handleMCPSubmit = () => {
    setCurrentStep("publish")
  }

  const handleGoBack = () => {
    if (currentStep === "structure") {
      setCurrentStep("chat")
    } else if (currentStep === "mcp") {
      setCurrentStep("structure")
    } else if (currentStep === "publish") {
      setCurrentStep("mcp")
    }
  }

  const handlePublish = (onAppPublished: (app: App) => void) => {
    const newApp: App = {
      id: `app-${Date.now()}`,
      name: appDetails.name,
      description: appDetails.description,
      status: "active",
      traffic: Math.floor(Math.random() * 10000),
      usage: Math.floor(Math.random() * 100),
      errors: Math.floor(Math.random() * 10),
      createdAt: new Date().toISOString(),
      structure: appStructure || undefined,
      mcpConfig,
    }

    onAppPublished(newApp)
  }

  return {
    currentStep,
    appStructure,
    mcpConfig,
    appDetails,
    setMcpConfig,
    setAppDetails,
    generateAIResponse,
    progressToNextStep,
    handleApproveStructure,
    handleMCPSubmit,
    handleGoBack,
    handlePublish,
  }
} 