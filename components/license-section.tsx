"use client"

import { useEffect, useRef, useState } from "react"
import { ShieldCheck } from "lucide-react"

export function LicenseSection() {
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
    <section ref={sectionRef} className="px-4 py-6">
      {/* Security Badge */}
      <div 
        className={`flex justify-center transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-90"
        }`}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-[#10b981]/30 bg-[#10b981]/10 px-4 py-2 hover:bg-[#10b981]/20 hover:scale-105 transition-all duration-300 cursor-default group">
          <ShieldCheck className="h-4 w-4 text-[#10b981] group-hover:animate-bounce" />
          <span className="text-sm font-medium text-[#10b981]">
            100% Seguro e Atualizado
          </span>
        </div>
      </div>
      
      {/* Main Title */}
      <h2 
        className={`mt-6 text-center text-2xl font-bold leading-tight text-[#1a1a2e] transition-all duration-700 delay-100 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        Licencie seu{" "}
        <span className="text-[#3b82f6] relative inline-block hover:scale-105 transition-transform duration-300">
          EA FC 26 ou 25
        </span>{" "}
        de PS4, PS5 e Xbox
      </h2>
      
      {/* Subtitle */}
      <div 
        className={`transition-all duration-700 delay-200 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <p className="mt-4 text-center text-sm font-semibold uppercase tracking-wide text-[#1a1a2e]">
          OBTENHA AS EQUIPES{" "}
          <span className="text-[#3b82f6] animate-pulse">BRASILEIRAS</span>
        </p>
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-[#1a1a2e]">
          <span className="text-[#3b82f6] animate-pulse">100% ATUALIZADAS</span>{" "}
          E LICENCIADAS COM ESSA ATUALIZAÇÃO
        </p>
      </div>
    </section>
  )
}
