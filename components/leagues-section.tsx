"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Trophy } from "lucide-react"
import Image from "next/image"
import { IMAGES } from "@/lib/images-config"

/* ================================================
   IMAGENS DAS LIGAS (CARROSSEL)
   
   Para alterar as imagens, edite o arquivo:
   /lib/images-config.ts
   ================================================ */
const leagueImages = [
  {
    src: IMAGES.leagues[0],
    alt: "Ligas Licenciadas - Clubes Brasileiros",
    badge: "LIGAS",
    badgeSubtitle: "Licenciadas"
  },
  {
    src: IMAGES.leagues[1],
    alt: "Ligas Licenciadas - Clubes Brasileiros 2",
    badge: "LIGAS",
    badgeSubtitle: "Licenciadas"
  }
]

export function LeaguesSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % leagueImages.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + leagueImages.length) % leagueImages.length)
  }

  return (
    <section ref={sectionRef} className="px-4 py-6 bg-background">
      {/* Attention Badge */}
      <div 
        className={`flex justify-center mb-4 transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-90"
        }`}
      >
        <span className="inline-flex items-center gap-1.5 bg-[#ef4444] text-white text-xs font-bold px-3 py-1.5 rounded-full animate-pulse hover:scale-105 transition-transform duration-300 cursor-default">
          <svg className="w-3.5 h-3.5 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          ATENÇÃO
        </span>
      </div>

      {/* Title */}
      <h2 
        className={`text-center text-xl font-extrabold leading-tight mb-6 px-2 transition-all duration-700 delay-100 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <span className="text-[#1e3a5f]">O PATCH MAIS COMPLETO E REALISTA </span>
        <span className="text-[#3b82f6] relative">
          DO MERCADO ESTÁ AQUI!
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#3b82f6] animate-pulse"></span>
        </span>
      </h2>

      {/* Carousel */}
      <div 
        className={`relative transition-all duration-700 delay-200 ${
          isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"
        }`}
      >
        <div className="overflow-hidden rounded-2xl">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {leagueImages.map((image, index) => (
              <div key={index} className="min-w-full relative group">
                <div className="relative aspect-[4/3] bg-gradient-to-b from-[#e0f2fe] to-[#bae6fd] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500">
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10"></div>
                  
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    style={{ objectPosition: "center 60%" }}
                  />
                  
                  {/* Badge */}
                  <div className="absolute bottom-4 right-4 z-20">
                    <div className="bg-[#3b82f6] text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Trophy className="w-5 h-5 animate-pulse" />
                      <div className="text-left">
                        <div className="text-[10px] font-medium leading-none">{image.badge}</div>
                        <div className="text-xs font-bold leading-tight">{image.badgeSubtitle}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200"
          aria-label="Imagem anterior"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200"
          aria-label="Próxima imagem"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {leagueImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-[#3b82f6] w-6" : "bg-gray-300 w-2 hover:bg-gray-400"
              }`}
              aria-label={`Ir para imagem ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
