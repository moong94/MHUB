"use client"

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useBreakpoint } from '@/hooks/use-media-query'

interface ResponsiveContainerProps {
  children: ReactNode
  className?: string
  mobileClassName?: string
  tabletClassName?: string
  desktopClassName?: string
}

export function ResponsiveContainer({ 
  children, 
  className,
  mobileClassName,
  tabletClassName,
  desktopClassName 
}: ResponsiveContainerProps) {
  const breakpoint = useBreakpoint()
  
  const responsiveClassName = cn(
    className,
    breakpoint === 'mobile' && mobileClassName,
    breakpoint === 'tablet' && tabletClassName,
    breakpoint === 'desktop' && desktopClassName
  )

  return (
    <div className={responsiveClassName}>
      {children}
    </div>
  )
} 