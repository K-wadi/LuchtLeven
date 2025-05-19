"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ToastProps {
  message: string
  type: "success" | "error" | "info"
  duration?: number
  onClose: () => void
}

export function Toast({
  message,
  type,
  duration = 3000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // Wait for fade out animation
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-lg px-4 py-3 shadow-lg transition-all duration-300",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        type === "success" && "bg-green-500 text-white",
        type === "error" && "bg-red-500 text-white",
        type === "info" && "bg-blue-500 text-white"
      )}
    >
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={() => {
          setIsVisible(false)
          setTimeout(onClose, 300)
        }}
        className="ml-2 rounded-full p-1 hover:bg-white/20"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
} 