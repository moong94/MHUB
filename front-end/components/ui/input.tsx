import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // 기본 스타일
        "flex w-full min-w-0 rounded-md border-2 px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none",
        // 사이버펑크 테마 기본 스타일 - 모든 input 동일
        "bg-cyber-card border-cyber-border h-10 md:h-11",
        // 포커스 상태
        "focus-visible:border-1 focus-visible:border-cyber-red focus-visible:ring-cyber-red/30 focus-visible:ring-[3px]",
        // placeholder 색상 (더 부드럽게)
        "placeholder:text-cyber-text-secondary/70",
        // 텍스트 색상
        "text-white",
        // Selection 스타일
        "selection:bg-cyber-red selection:text-white",
        // 파일 input 스타일
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white",
        // 비활성화 상태
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        // 반응형 텍스트 크기
        "md:text-sm",
        // 에러 상태
        "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
