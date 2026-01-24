"use client"

import { useEffect, useRef, useState } from "react"
import { Folder } from "lucide-react"
import Image from "next/image"
import { IMAGES } from "@/lib/images-config"

const clubs = [
  ["Flamengo", "Palmeiras"],
  ["São Paulo", "Corinthians"],
  ["Fluminense", "Botafogo"],
  ["Grêmio", "Inter"],
]

export function BrazilianClubsSection() {
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
    <section ref={sectionRef} className="px-4 py-8 bg-[#0a1628]">
      {/* Badge */}
      <div 
        className={`flex justify-center mb-6 transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-90"
        }`}
      >
        <div className="inline-flex items-center gap-2 bg-[#1a4a7a] text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-[#1e5a8a] hover:scale-105 transition-all duration-300 cursor-default group">
          <Folder className="w-4 h-4 group-hover:animate-bounce" />
          <span>Patch já exclusivo da WG</span>
        </div>
      </div>

      {/* Title */}
      <h2 
        className={`text-white text-2xl font-bold text-center mb-6 transition-all duration-700 delay-100 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        Todos os Grandes Clubes<br />
        <span className="text-[#3b82f6]">Brasileiros</span>
      </h2>

      {/* ================================================
          IMAGEM DOS CLUBES BRASILEIROS
          
          COMO ADICIONAR SUA IMAGEM:
          1. Coloque a imagem em: /public/images/brazilian-clubs.png
          2. Substitua o conteúdo dentro da div por:
             <Image 
               src="/images/brazilian-clubs.png" 
               alt="Clubes Brasileiros" 
               fill
               className="object-cover rounded-lg"
             />
          3. Adicione no topo do arquivo: import Image from "next/image"
          
          Tamanho recomendado: 800x400px
          ================================================ */}
      <div 
        className={`relative w-full h-48 bg-[#0f2744] rounded-lg mb-8 overflow-hidden transition-all duration-700 delay-200 hover:shadow-xl hover:shadow-blue-500/20 ${
          isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"
        }`}
      >
        <Image
          src={IMAGES.brazilianClubs || "https://iili.io/f6AxyHN.png"}
          alt="Clubes Brasileiros"
          fill
          className="object-cover"
        />
      </div>

      {/* Clubs Grid */}
      <div className="flex flex-col gap-3">
        {clubs.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-3 justify-center">
            {row.map((club, clubIndex) => (
              <div
                key={club}
                className={`flex-1 max-w-[160px] bg-[#0f2744] border border-[#1e3a5f] rounded-lg py-3 px-4 text-center transition-all duration-500 hover:bg-[#1a3a5f] hover:border-[#3b82f6] hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 cursor-default group ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${300 + (rowIndex * 100) + (clubIndex * 50)}ms` }}
              >
                <span className="text-white text-sm font-medium group-hover:text-[#3b82f6] transition-colors duration-300">{club}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
