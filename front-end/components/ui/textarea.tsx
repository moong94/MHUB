import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // 기본 스타일
        "flex w-full min-w-0 rounded-md border-2 px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none",
        // 사이버펑크 테마 기본 스타일 - input과 동일
        "bg-cyber-card border-cyber-border min-h-16",
        // 포커스 상태
        "focus-visible:border-1 focus-visible:border-cyber-red focus-visible:ring-cyber-red/30 focus-visible:ring-[3px]",
        // placeholder 색상 (더 부드럽게)
        "placeholder:text-cyber-text-secondary/70",
        // 텍스트 색상
        "text-white",
        // Selection 스타일
        "selection:bg-cyber-red selection:text-white",
        // 비활성화 상태
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        // 반응형 텍스트 크기
        "md:text-sm",
        // 에러 상태
        "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
        // field-sizing-content 유지 (textarea 특화 기능)
        "field-sizing-content",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
