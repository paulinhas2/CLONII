"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { IMAGES } from "@/lib/images-config"

export function FooterSection() {
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
    <footer ref={sectionRef} className="bg-[#0a1628] px-6 py-10 text-center">
      {/* ================================================
          LOGO DO FOOTER
          
          COMO ADICIONAR SUA IMAGEM:
          1. Coloque a imagem em: /public/images/logo-footer.png
          2. Substitua o <span> abaixo por:
             <Image 
               src="/images/logo-footer.png" 
               alt="WG Patch Logo" 
               width={40} 
               height={40} 
               className="object-contain"
             />
          3. Adicione no topo: import Image from "next/image"
          
          Tamanho recomendado: 80x80px (ícone quadrado)
          ================================================ */}
      <div 
        className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full p-[3px] transition-all duration-700 hover:scale-110 hover:rotate-12 cursor-pointer ${
          isVisible ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
        style={{
          background: "linear-gradient(135deg, #ec4899, #8b5cf6, #3b82f6, #06b6d4, #10b981)"
        }}
      >
        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0a1628] overflow-hidden">
          <Image 
            src={IMAGES.logo || "/placeholder.svg"} 
            alt="WG Patch Logo" 
            width={56} 
            height={56} 
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Brand name */}
      <h3 
        className={`mb-1 text-xl font-bold transition-all duration-700 delay-100 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <span className="text-white">WG</span>
        <span className="hover:text-[#3b82f6] transition-colors duration-300 text-background">PATCH</span>
      </h3>

      {/* Subtitle */}
      <p 
        className={`mb-6 text-sm text-blue-400 animate-pulse transition-all duration-700 delay-200 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        Futebol
      </p>

      {/* Disclaimer */}
      <p 
        className={`mx-auto mb-8 max-w-xs text-sm leading-relaxed text-muted-foreground transition-all duration-700 delay-300 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        Não somos afiliados à EA Sports. Este é um produto independente criado pela comunidade para a comunidade.
      </p>

      {/* Footer links */}
      <div 
        className={`mb-6 flex items-center justify-center gap-4 text-sm text-muted-foreground transition-all duration-700 delay-400 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <a href="#" className="transition-all duration-300 hover:text-[#3b82f6] hover:scale-105">
          Termos de Uso
        </a>
        <a href="#" className="transition-all duration-300 hover:text-[#3b82f6] hover:scale-105">
          Política de Privacidade
        </a>
        <a href="#" className="transition-all duration-300 hover:text-[#3b82f6] hover:scale-105">
          Suporte
        </a>
      </div>

      {/* Copyright */}
      <p 
        className={`text-sm text-muted-foreground transition-all duration-700 delay-500 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        © 2026 Todos os direitos reservados.
      </p>
    </footer>
  )
}
