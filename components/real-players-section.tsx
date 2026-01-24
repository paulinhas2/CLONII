"use client"

import { useEffect, useRef, useState } from "react"
import { Trophy, UserCheck, SlidersHorizontal } from "lucide-react"
import Image from "next/image"
import { IMAGES } from "@/lib/images-config"

const features = [
  {
    icon: UserCheck,
    title: "Faces e Nomes Reais",
    description: "Todos os jogadores com seus nomes corretos e faces similares às reais.",
    delay: 0
  },
  {
    icon: SlidersHorizontal,
    title: "Habilidades e Posições",
    description: "Overall (nível) calibrado de acordo com o momento atual do jogador (ATUALIZADO/2026).",
    delay: 100
  },
  {
    icon: Trophy,
    title: "Competições Licenciadas",
    description: "A atualização contém a Libertadores e Sul-Americana licenciadas.",
    delay: 200
  }
]

export function RealPlayersSection() {
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
    <section ref={sectionRef} className="px-4 py-8 bg-background">
      {/* Title */}
      <h2 
        className={`text-2xl font-bold text-foreground mb-2 transition-all duration-700 ${
          isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
        }`}
      >
        Jogue com os{" "}
        <span className="text-[#3b82f6] relative">
          Jogadores Reais
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#3b82f6] animate-pulse"></span>
        </span>
      </h2>
      
      {/* Subtitle */}
      <p 
        className={`text-muted-foreground text-sm mb-6 transition-all duration-700 delay-100 ${
          isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
        }`}
      >
        Diga adeus aos nomes genéricos. Com essa atualização, você terá a imersão completa.
      </p>
      
      {/* Features List */}
      <div className="space-y-5 mb-6">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div 
              key={index}
              className={`flex items-start gap-3 group cursor-default transition-all duration-700 ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: `${feature.delay + 200}ms` }}
            >
              <div className="flex-shrink-0 mt-0.5 p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
                <Icon className="w-5 h-5 text-[#3b82f6]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-base group-hover:text-[#3b82f6] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
      
      {/* ================================================
          IMAGEM PROMOCIONAL - JOGADORES REAIS
          
          Esta imagem mostra os jogadores brasileiros reais
          com as competicoes licenciadas (Libertadores, etc.)
          ================================================ */}
      <div 
        className={`relative w-full rounded-2xl overflow-hidden mb-6 shadow-lg transition-all duration-700 delay-400 ${
          isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"
        }`}
      >
        <Image
          src={IMAGES.realPlayers || "/placeholder.svg"}
          alt="Jogue com jogadores reais - Faces e nomes oficiais - Libertadores, Sudamericana e Brasileirao"
          width={800}
          height={450}
          className="w-full h-auto object-cover"
          priority
        />
      </div>
      
      {/* Licensed Badge */}
      <div 
        className={`flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-amber-50 to-amber-100/50 border border-amber-200 rounded-xl transition-all duration-700 delay-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/20 cursor-default ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="flex-shrink-0 p-2 bg-amber-100 rounded-lg">
          <Trophy className="w-5 h-5 text-[#f59e0b] animate-pulse" strokeWidth={1.5} />
        </div>
        <div>
          <h4 className="font-semibold text-foreground text-sm">
            Licenciado Oficial
          </h4>
          <p className="text-muted-foreground text-xs">
            Jogadores reais com faces e nomes oficiais.
          </p>
        </div>
      </div>
    </section>
  )
}
