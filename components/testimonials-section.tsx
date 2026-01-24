"use client"

import { useEffect, useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import Image from "next/image"
import { useGameSelection } from "@/contexts/game-selection-context"
import { IMAGES } from "@/lib/images-config"

export function TestimonialsSection() {
  const { ref, isVisible } = useScrollAnimation()
  const [currentSlide, setCurrentSlide] = useState(0)
  const { selectedGame } = useGameSelection()
  
  // Formata o nome do jogo para exibir no botao (remove espacos)
  const gameNameForButton = selectedGame.game.replace(/\s+/g, "")
  
  /* ================================================
     IMAGENS DOS DEPOIMENTOS / FEEDBACKS
     
     COMO ADICIONAR SUAS IMAGENS:
     1. Coloque suas imagens em: /public/images/
     2. Nomeie como: testimonial-1.png, testimonial-2.png, etc.
     3. Altere o "image" abaixo para o caminho correto
     
     Tamanho recomendado: 280x500px (proporção 9:16 - formato stories)
     ================================================ */
  const testimonials = [
    { id: 1, placeholder: "Avaliação 1", image: "https://iili.io/f6TjrQa.jpg" },
    { id: 2, placeholder: "Avaliação 2", image: "https://iili.io/f6TjPEv.jpg" },
    { id: 3, placeholder: "Avaliação 3", image: "https://iili.io/f6Tji4R.jpg" },
    { id: 4, placeholder: "Avaliação 4", image: "https://iili.io/f6Tj6CJ.jpg" },
  ]

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <section 
      ref={ref}
      className={`px-4 py-12 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* CTA Button - Dinamico baseado na selecao do usuario */}
      <div className="flex justify-center mb-8">
        <a
          href={selectedGame.checkoutUrl}
          className="relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm uppercase tracking-wider rounded-full shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 animate-pulse hover:animate-none"
        >
          <span className="relative z-10">ATUALIZAR MEU {gameNameForButton} AGORA</span>
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </a>
      </div>

      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-3">
          O que nossos <span className="text-cyan-400">clientes</span> dizem
        </h2>
        <p className="text-sm text-muted-foreground px-4">
          Veja os feedbacks reais de quem já atualizou seu EA FC com sucesso
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-2xl">
        {/* Slides */}
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="min-w-full flex-shrink-0"
            >
              {/* ================================================
                  IMAGEM DO DEPOIMENTO
                  
                  A imagem será carregada automaticamente de:
                  {testimonial.image} (ex: /images/testimonial-1.png)
                  
                  Se a imagem não existir, mostra o placeholder
                  ================================================ */}
              <div className="relative aspect-[9/16] max-h-[500px] mx-auto w-full max-w-[280px] rounded-2xl border-2 border-cyan-500/30 bg-gradient-to-b from-cyan-500/10 to-blue-500/10 overflow-hidden">
                <Image 
                  src={testimonial.image || "/placeholder.svg"}
                  alt={`Depoimento ${testimonial.id}`}
                  fill
                  className="object-cover z-10 relative"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? "bg-cyan-400 w-6" 
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Ir para avaliação ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
          className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-foreground hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-300"
          aria-label="Avaliação anterior"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % testimonials.length)}
          className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-foreground hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-300"
          aria-label="Próxima avaliação"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  )
}
