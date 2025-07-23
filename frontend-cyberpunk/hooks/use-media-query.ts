import { useState, useEffect } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    
    const listener = () => setMatches(media.matches)
    media.addListener(listener)
    
    return () => media.removeListener(listener)
  }, [matches, query])

  return matches
}

// 편의성을 위한 사전 정의된 브레이크포인트 훅들
export function useIsMobile() {
  return useMediaQuery(`(max-width: ${768 - 1}px)`)
}

export function useIsTablet() {
  return useMediaQuery(`(min-width: ${768}px) and (max-width: ${1024 - 1}px)`)
}

export function useIsDesktop() {
  return useMediaQuery(`(min-width: ${1025}px)`)
}

export function useBreakpoint() {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const isDesktop = useIsDesktop()
  
  if (isMobile) return 'mobile'
  if (isTablet) return 'tablet'
  if (isDesktop) return 'desktop'
  return 'mobile' // fallback
} 