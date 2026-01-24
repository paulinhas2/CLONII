"use client"

import { useEffect, useRef, useState } from "react"
import { Database, Download, Gamepad2, PenLine, Monitor } from "lucide-react"

const steps = [
  {
    icon: Database,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
    title: "1. Dados Atualizados",
    description: "Enviamos os dados dos elencos atualizados diretamente para você.",
    delay: 0
  },
  {
    icon: Download,
    iconBg: "bg-green-100",
    iconColor: "text-green-500",
    title: "2. Tutorial Incluso",
    description: "Você recebe um tutorial passo a passo para inserir na edição do EA FC 26 ou 25.",
    delay: 150
  },
  {
    icon: Gamepad2,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
    title: "3. Sem Pen Drive",
    description: "Não é necessário pen drive ou dispositivo externo. A atualização é feita dentro da edição do próprio jogo.",
    hasBadges: true,
    delay: 300
  }
]

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="px-4 py-8">
      {/* Title */}
      <h2 
        className={`text-2xl font-bold text-foreground text-center mb-2 transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        Como funciona?
      </h2>
      <p 
        className={`text-muted-foreground text-center text-sm mb-8 transition-all duration-700 delay-100 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        Processo simples, rapido e facil de instalar. Você não vai precisar de um expert para instalar.
      </p>

      {/* Cards */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <div 
              key={index}
              className={`bg-card rounded-2xl p-6 border border-border transition-all duration-700 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-200 hover:-translate-y-1 group cursor-default ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${step.delay + 200}ms` }}
            >
              <div className={`w-12 h-12 ${step.iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-6 h-6 ${step.iconColor}`} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-[#3b82f6] transition-colors duration-300">
                {step.title}
              </h3>
              <p className={`text-muted-foreground text-sm ${step.hasBadges ? 'mb-4' : ''}`}>
                {step.hasBadges ? (
                  <>
                    <span className="font-bold">Não é necessário pen drive</span> ou dispositivo externo. A atualização é feita dentro da edição do próprio jogo.
                  </>
                ) : (
                  step.description
                )}
              </p>
              {step.hasBadges && (
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg text-sm hover:bg-blue-100 hover:scale-105 transition-all duration-300">
                    <PenLine className="w-4 h-4" strokeWidth={2} />
                    <span className="line-through">Pen Drive</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg text-sm hover:bg-blue-100 hover:scale-105 transition-all duration-300">
                    <Monitor className="w-4 h-4" strokeWidth={2} />
                    <span className="line-through">PC/Note</span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
