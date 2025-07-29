"use client"

import { cn } from "@/lib/utils"
import { gsap } from "gsap"
import { Code, Cpu, Database, Network, Rocket, Shield, Zap } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface BuildingPanelProps {
  isMobile: boolean
  showMobilePanel: boolean
  onCloseMobilePanel?: () => void
}

const statusMessages = [
  { icon: Cpu, text: "Initializing system core...", delay: 0 },
  { icon: Database, text: "Establishing database connection...", delay: 400 },
  { icon: Network, text: "Configuring network protocols...", delay: 800 },
  { icon: Code, text: "Loading core modules...", delay: 1200 },
  { icon: Shield, text: "Activating security layers...", delay: 1600 },
  { icon: Zap, text: "AI agent ready for deployment...", delay: 2000 },
  { icon: Rocket, text: "System ready for launch", delay: 2400 },
]

export function BuildingPanel({ isMobile, showMobilePanel, onCloseMobilePanel }: BuildingPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const glitchRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const statusListRef = useRef<HTMLDivElement>(null)
  
  const [progress, setProgress] = useState(0)
  const [currentStatus, setCurrentStatus] = useState(0)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const title = titleRef.current
    const progressBar = progressBarRef.current
    const glitch = glitchRef.current
    const particles = particlesRef.current
    const statusList = statusListRef.current

    // 초기 설정
    gsap.set(container, { opacity: 0 })
    gsap.set(title, { y: -50, opacity: 0 })
    if (progressBar) {
      progressBar.style.width = '0%'
    }
    gsap.set(statusList?.children || [], { x: -30, opacity: 0 })

    // 메인 애니메이션 타임라인
    const tl = gsap.timeline()

    // 컨테이너 페이드인
    tl.to(container, { opacity: 1, duration: 0.5, ease: "power2.out" })
    
    // 타이틀 글리치 효과와 함께 등장
    tl.to(title, { 
      y: 0, 
      opacity: 1, 
      duration: 0.8, 
      ease: "power3.out",
      onComplete: () => {
        // 글리치 효과 시작
        if (glitch) {
          gsap.to(glitch, {
            duration: 0.1,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            css: {
              textShadow: `
                2px 0 var(--color-cyber-red),
                -2px 0 var(--color-cyber-orange),
                0 2px var(--color-status-active),
                0 -2px var(--color-status-error)
              `
            }
          })
        }
      }
    }, "-=0.3")

    // 진행률 바 애니메이션 - 점진적으로 채워지는 애니메이션
    tl.to({ progress: 0 }, { 
      progress: 100, 
      duration: 2.5, 
      ease: "power2.inOut",
      onUpdate: function() {
        const prog = Math.round(this.targets()[0].progress)
        setProgress(prog)
        if (progressBar) {
          progressBar.style.width = `${prog}%`
        }
      }
    }, "-=0.2")

    // 상태 메시지들 순차적으로 등장
    statusMessages.forEach((message, index) => {
      tl.to(statusList?.children[index] || {}, {
        x: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        onStart: () => setCurrentStatus(index)
      }, `-=${2.5 - (message.delay / 1000)}`)
    })

    // 파티클 애니메이션
    if (particles) {
      const particleElements = particles.children
      Array.from(particleElements).forEach((particle, index) => {
        gsap.to(particle, {
          y: "random(-10, 10)",
          x: "random(-5, 5)",
          rotation: "random(-180, 180)",
          duration: "random(2, 4)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.1
        })
      })
    }

    // 스캔라인 효과
    const scanLine = container.querySelector('.scan-line')
    if (scanLine) {
      gsap.to(scanLine, {
        y: container.offsetHeight,
        duration: 2,
        repeat: -1,
        ease: "none"
      })
    }

    return () => {
      tl.kill()
      gsap.killTweensOf(container)
      gsap.killTweensOf(title)
      gsap.killTweensOf(progressBar)
      gsap.killTweensOf(glitch)
    }
  }, [statusMessages])

  return (
    <div 
      ref={containerRef}
      className={cn(
        "flex items-center justify-center relative overflow-hidden",
        isMobile 
          ? (showMobilePanel ? "fixed inset-0 bg-cyber-main/95 backdrop-blur-sm z-50" : "hidden")
          : "w-1/2 border-l border-cyber-hover bg-cyber-main/50 backdrop-blur-sm"
      )}
      onClick={isMobile && onCloseMobilePanel ? onCloseMobilePanel : undefined}
    >
      {/* 배경 그리드 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 0, 64, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 0, 64, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* 스캔라인 */}
      <div className="scan-line absolute left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyber-red to-transparent opacity-50" />

      {/* 파티클 */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyber-red rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 text-center w-4/5 md:w-3/5 mx-auto px-6">
        {/* 타이틀 */}
        <div ref={titleRef} className="mb-8">
          <div ref={glitchRef} className="text-4xl font-bold text-cyber-red mb-2 font-mono">
            MHUB
          </div>
          <div className="text-xl text-cyber-orange font-mono tracking-wider">
            SYSTEM INITIALIZATION
          </div>
        </div>

        {/* 진행률 바 */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-cyber-text-secondary font-mono">PROGRESS</span>
            <span className="text-sm text-cyber-red font-mono">{progress}%</span>
          </div>
          <div className="relative h-2 bg-cyber-card rounded-full overflow-hidden border border-cyber-border">
            <div
              ref={progressBarRef}
              className="absolute inset-y-0 left-0 bg-cyber-red rounded-full"
              style={{
                boxShadow: `
                  0 0 10px var(--color-cyber-red),
                  0 0 20px rgba(255, 0, 64, 0.3),
                  0 0 30px rgba(255, 0, 64, 0.1)
                `
              }}
            />
          </div>
        </div>

        {/* 상태 메시지 */}
        <div ref={statusListRef} className="space-y-3 w-full">
          {statusMessages.map((message, index) => {
            const Icon = message.icon
            return (
              <div
                key={index}
                className={`
                  flex items-center space-x-3 text-sm font-mono w-full
                  ${index <= currentStatus ? 'text-cyber-text-secondary' : 'text-cyber-text-tertiary'}
                  ${index === currentStatus ? 'text-cyber-red' : ''}
                `}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1 text-left truncate min-w-0">{message.text}</span>
                {index < currentStatus && (
                  <div className="w-2 h-2 bg-status-active rounded-full animate-pulse" />
                )}
                {index === currentStatus && (
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-cyber-red rounded-full animate-pulse" />
                    <div className="w-1 h-1 bg-cyber-red rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-1 h-1 bg-cyber-red rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* 하단 메시지 */}
        <div className="mt-8 text-xs text-cyber-text-tertiary font-mono opacity-70">
          AI agent will be activated shortly...
        </div>
      </div>

      {/* 코너 장식 */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyber-red opacity-50" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyber-red opacity-50" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyber-red opacity-50" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyber-red opacity-50" />
    </div>
  )
} 