"use client"

import { useEffect, useState } from "react"
import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPulsing, setIsPulsing] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulsing(prev => !prev)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <a
      href="https://wa.me/5500000000000"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] shadow-lg transition-all duration-500 hover:scale-110 hover:shadow-xl hover:shadow-green-500/40 active:scale-95 z-50 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      } ${isPulsing ? "shadow-green-500/50" : ""}`}
      aria-label="Contato via WhatsApp"
    >
      {/* Pulse ring effect */}
      <span className="absolute inset-0 rounded-full bg-[#25d366] animate-ping opacity-30"></span>
      <MessageCircle className="h-7 w-7 text-white relative z-10" fill="white" />
    </a>
  )
}
