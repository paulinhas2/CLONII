"use client"

import { useEffect, useRef, useState } from "react"

export function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="px-4 pb-6">
      {/* Title */}
      <h1 
        className={`text-center text-xl font-bold text-[#1a1a2e] transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        Veja como fica o jogo{" "}
        <span className="text-[#3b82f6] relative">
          apos a atualizacao
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#3b82f6] animate-pulse"></span>
        </span>
      </h1>
      
      {/* Subtitle */}
      <p 
        className={`mt-2 text-center text-sm text-muted-foreground transition-all duration-700 delay-100 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        Assista ao video abaixo e veja a qualidade da nossa atualizacao
      </p>
      
      {/* Video Container */}
      <div 
        className={`mt-4 overflow-hidden rounded-xl shadow-lg transition-all duration-700 delay-200 ${
          isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"
        } hover:shadow-2xl hover:shadow-blue-500/20`}
      >
        <div className="relative aspect-video w-full overflow-hidden bg-black">
          <iframe
            className="absolute inset-0 h-full w-full border-0"
            src="https://www.youtube.com/embed/S0YS75jvgXE"
            title="Video de demonstracao"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
      
      {/* Video Caption */}
      <p 
        className={`mt-3 text-center text-xs text-muted-foreground transition-all duration-700 delay-300 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        Video demonstrando todos os recursos da atualizacao e melhorias visuais do jogo
      </p>
    </section>
  )
}
