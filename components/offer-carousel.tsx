"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useGameSelection } from "@/contexts/game-selection-context"
import { IMAGES } from "@/lib/images-config"

/* ================================================
   OFERTAS / PRODUTOS
   
   Para alterar as imagens, edite o arquivo:
   /lib/images-config.ts
   ================================================ */
const offers = [
  {
    id: 1,
    game: "EA FC 26",
    image: IMAGES.offers.eafc26,
    originalPrice: "109,90",
    price: "29,90",
    discount: "-67%",
    checkoutUrl: "https://go.invictuspay.app.br/8dxwdye1ez",
  },
  {
    id: 2,
    game: "EA FC 25",
    image: IMAGES.offers.eafc25,
    originalPrice: "89,90",
    price: "19,90",
    discount: "-60%",
    checkoutUrl: "https://go.invictuspay.app.br/etvngoabn9",
  },
]

export function OfferCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedOffer, setSelectedOffer] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isPulsing, setIsPulsing] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)
  const { setSelectedGame } = useGameSelection()

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

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulsing(prev => !prev)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % offers.length)
    setSelectedOffer((prev) => (prev + 1) % offers.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length)
    setSelectedOffer((prev) => (prev - 1 + offers.length) % offers.length)
  }

  const currentOffer = offers[selectedOffer]

  return (
    <section ref={sectionRef} className="px-4 py-6">
      {/* Carousel */}
      <div 
        className={`relative mb-4 transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"
        }`}
      >
        <div className="overflow-hidden rounded-lg">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {offers.map((offer) => (
              <div key={offer.id} className="min-w-full">
                <div className="relative aspect-[3/4] bg-gradient-to-b from-[#0a4d2e] to-[#063d23] rounded-lg overflow-hidden group hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-500">
                  {/* Animated glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="bg-[#00b4d8] text-white text-xs font-bold px-2 py-1 rounded animate-pulse">
                      PS5, PS4, Xbox X|S / One
                    </span>
                  </div>
                  
                  {/* Game Cover Image */}
                  <Image
                    src={offer.image || "/placeholder.svg"}
                    alt={`Capa ${offer.game}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Age Rating */}
                  <div className="absolute bottom-3 left-3 z-10">
                    <span className="bg-[#00a651] text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded">
                      L
                    </span>
                  </div>

                  {/* EA Sports Logo */}
                  <div className="absolute bottom-3 right-3 z-10">
                    <span className="text-white text-xs font-bold drop-shadow-lg">EA SPORTS</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200"
          aria-label="Próximo"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Offer Tabs */}
      <div 
        className={`flex border border-gray-200 rounded-lg overflow-hidden mb-4 transition-all duration-700 delay-100 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {offers.map((offer, index) => (
          <button
            key={offer.id}
            onClick={() => {
              setSelectedOffer(index)
              setCurrentSlide(index)
              // Atualiza o contexto global com a seleção do usuário
              setSelectedGame({
                game: offer.game,
                checkoutUrl: offer.checkoutUrl
              })
            }}
            className={`flex-1 py-3 px-4 text-left transition-all duration-300 hover:bg-blue-50 ${
              selectedOffer === index
                ? "bg-white border-b-2 border-[#2563eb] shadow-inner"
                : "bg-gray-50"
            }`}
          >
            <div className="font-bold text-gray-900">{offer.game}</div>
            <div className="text-sm text-gray-400 line-through">R$ {offer.originalPrice}</div>
            <div className="text-lg font-bold text-[#2563eb]">R$ {offer.price}</div>
          </button>
        ))}
      </div>

      {/* CTA Button */}
      <div 
        className={`transition-all duration-700 delay-200 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <Button
          asChild
          className={`w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold py-6 text-base rounded-lg mb-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.98] ${
            isPulsing ? "shadow-lg shadow-blue-500/40" : ""
          }`}
        >
          <a href={currentOffer.checkoutUrl} className="flex items-center justify-center gap-2">
            
            QUERO ATUALIZAR MEU EA FC HOJE
          </a>
        </Button>
      </div>

      {/* Price Summary */}
      <div 
        className={`text-center mb-4 transition-all duration-700 delay-300 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <span className="text-gray-500 line-through">DE: R$ {currentOffer.originalPrice}</span>
        <div className="text-2xl font-black">
          POR: <span className="text-[#2563eb] animate-pulse">R$ {currentOffer.price}</span>
        </div>
      </div>

      {/* Badges */}
      <div 
        className={`flex justify-center gap-3 transition-all duration-700 delay-400 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <span className="bg-[#dbeafe] text-[#2563eb] text-sm font-semibold px-3 py-1 rounded-full hover:scale-105 transition-transform duration-300 cursor-default">
          {currentOffer.discount} de Desconto
        </span>
        <span className="bg-[#d1fae5] text-[#059669] text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-1 hover:scale-105 transition-transform duration-300 cursor-default">
          <Check className="w-4 h-4" />
          Entrega Imediata
        </span>
      </div>
    </section>
  )
}
