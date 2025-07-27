"use client"

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/hooks/use-media-query'

// 모바일에서 터치 친화적 버튼 래퍼
interface TouchFriendlyButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export function TouchFriendlyButton({ 
  children, 
  className,
  onClick,
  disabled,
  ...props 
}: TouchFriendlyButtonProps) {
  const isMobile = useIsMobile()
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "transition-all duration-200",
        isMobile && "min-h-[44px] min-w-[44px] active:scale-95",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

// 모바일 친화적 스크롤 영역
interface MobileScrollAreaProps {
  children: ReactNode
  className?: string
  showScrollbar?: boolean
}

export function MobileScrollArea({ 
  children, 
  className,
  showScrollbar = false 
}: MobileScrollAreaProps) {
  const isMobile = useIsMobile()
  
  return (
    <div
      className={cn(
        "overflow-auto",
        isMobile && !showScrollbar && "scrollbar-none",
        isMobile && showScrollbar && "scrollbar-thin",
        className
      )}
    >
      {children}
    </div>
  )
}

// 모바일에서 텍스트 크기 조정
interface ResponsiveTextProps {
  children: ReactNode
  className?: string
  mobileSize?: string
  desktopSize?: string
}

export function ResponsiveText({ 
  children, 
  className,
  mobileSize = "text-sm",
  desktopSize = "md:text-base"
}: ResponsiveTextProps) {
  return (
    <span className={cn(mobileSize, desktopSize, className)}>
      {children}
    </span>
  )
} 