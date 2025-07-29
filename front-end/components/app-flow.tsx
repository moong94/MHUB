"use client"

import { cn } from "@/lib/utils"
import {
    Background,
    Edge,
    Handle,
    Node,
    Position,
    ReactFlow
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { ArrowDown, Code, Database, Network, Settings } from "lucide-react"
import { useEffect, useState } from "react"

interface MCPStep {
  id: string
  title: string
  description: string
  icon: any
  connections: string[]
}

  // MCP 단계 생성 (1:N 연결 구조)
  const mcpSteps: MCPStep[] = [
    {
      id: 'input',
      title: 'Data Input Layer',
      description: 'Receives and validates incoming data from multiple sources',
      icon: Database,
      connections: ['process1', 'process2']
    },
    {
      id: 'process1',
      title: 'Primary Processing',
      description: 'Main data transformation and business logic',
      icon: Settings,
      connections: ['validate']
    },
    {
      id: 'process2', 
      title: 'Secondary Processing',
      description: 'Parallel processing for optimization and caching',
      icon: Network,
      connections: ['validate']
    },
    {
      id: 'validate',
      title: 'Validation Layer',
      description: 'Validates processed data and ensures consistency',
      icon: Code,
      connections: ['output1', 'output2']
    },
    {
      id: 'output1',
      title: 'Primary Output',
      description: 'Main response generation and formatting',
      icon: Settings,
      connections: []
    },
    {
      id: 'output2',
      title: 'Logging Output', 
      description: 'Audit logging and monitoring data output',
      icon: Database,
      connections: []
    }
  ]

const nodeTypes = {
  cyberNode: CyberNode,
}

// 사이버펑크 스타일 커스텀 노드 컴포넌트
function CyberNode({ data, selected }: any) {
  const IconComponent = data.icon
  
  return (
    <div className={cn(
      "p-2 rounded-lg border-2 bg-cyber-card/80 backdrop-blur-sm",
      "border-cyber-border hover:border-cyber-red transition-all duration-300",
      "cursor-pointer relative",
      selected && "border-cyber-orange shadow-lg shadow-cyber-orange/20"
    )}>
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 border-cyber-red bg-cyber-red"
      />
      
      {/* 아이콘과 제목 */}
      <div className="flex items-center space-x-1.5 mb-1.5">
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-cyber-main border border-cyber-red">
          <IconComponent className="w-2.5 h-2.5 text-cyber-red" />
        </div>
        <h3 className="text-xs font-semibold gradient-text">
          {data.title}
        </h3>
      </div>
      
      {/* 설명 */}
      <p className="text-xs text-cyber-text-secondary leading-relaxed">
        {data.description}
      </p>
      
      {/* 연결 인디케이터 */}
      {data.connections && data.connections.length > 0 && (
        <div className="flex justify-center mt-1.5">
          <ArrowDown className="w-1.5 h-1.5 text-cyber-orange opacity-60" />
        </div>
      )}
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 border-cyber-orange bg-cyber-orange"
      />
    </div>
  )
}

export function AppFlow() {
      const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])

  // 단계별 위치 계산
  const getStepPosition = (stepId: string) => {
    const positions: { [key: string]: { row: number, col: number } } = {
      'input': { row: 0, col: 1 },
      'process1': { row: 1, col: 0 },
      'process2': { row: 1, col: 2 },
      'validate': { row: 2, col: 1 },
      'output1': { row: 3, col: 0 },
      'output2': { row: 3, col: 2 }
    }
    return positions[stepId] || { row: 0, col: 0 }
  }

  // React Flow 초기화
  useEffect(() => {
    const initialNodes: Node[] = mcpSteps.map((step, index) => {
      const pos = getStepPosition(step.id)
      return {
        id: step.id,
        type: 'cyberNode',
        position: { x: 80 + pos.col * 220, y: 80 + pos.row * 140 },
        data: {
          title: step.title,
          description: step.description,
          icon: step.icon,
          connections: step.connections
        }
      }
    })

    const initialEdges: Edge[] = []
    mcpSteps.forEach(step => {
      step.connections.forEach(connId => {
        initialEdges.push({
          id: `${step.id}-${connId}`,
          source: step.id,
          target: connId,
          style: {
            stroke: 'var(--color-cyber-orange)',
            strokeWidth: 2,
          },
          animated: false
        })
      })
    })

    setNodes(initialNodes)
    setEdges(initialEdges)
  }, [])
  return (
    <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            panOnDrag={true}
            zoomOnScroll={true}
            zoomOnPinch={true}
            zoomOnDoubleClick={true}
            fitView
          >
            <Background />
          </ReactFlow>
  )
}