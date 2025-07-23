import { useState, useEffect } from 'react'
import { useIsMobile } from './use-media-query'

export function useMobileNavigation() {
  const isMobile = useIsMobile()
  
  // 초기 상태를 화면 크기에 따라 설정 (서버사이드 렌더링 고려)
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    // 서버사이드에서는 기본값 false, 클라이언트에서만 실제 화면 크기 확인
    if (typeof window === 'undefined') return false
    return !window.matchMedia('(max-width: 767px)').matches
  })

  // 모바일에서 사이드바가 열려있을 때 스크롤 방지
  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobile, isSidebarOpen])

  // 화면 크기 변경시에만 사이드바 상태 조정 (초기 로드 제외)
  useEffect(() => {
    const handleResize = () => {
      const isCurrentlyMobile = window.matchMedia('(max-width: 767px)').matches
      if (!isCurrentlyMobile && !isSidebarOpen) {
        // 데스크톱으로 변경되었는데 사이드바가 닫혀있으면 열기
        setIsSidebarOpen(true)
      } else if (isCurrentlyMobile && isSidebarOpen) {
        // 모바일로 변경되었는데 사이드바가 열려있으면 닫기
        setIsSidebarOpen(false)
      }
    }

    const mediaQuery = window.matchMedia('(max-width: 767px)')
    mediaQuery.addListener(handleResize)
    
    return () => mediaQuery.removeListener(handleResize)
  }, [isSidebarOpen])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return {
    isSidebarOpen,
    toggleSidebar,
    closeSidebar,
    isMobile
  }
} 