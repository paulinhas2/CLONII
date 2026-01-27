"use client"

import { useEffect, useState, useCallback } from "react"
import { Gift, Gamepad2, Video, Ticket, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

type ModalScreen = "main" | "lastChance"

export function BackRedirectModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const [currentScreen, setCurrentScreen] = useState<ModalScreen>("main")

  const handleBackButton = useCallback(() => {
    if (!hasTriggered) {
      setIsOpen(true)
      setHasTriggered(true)
      setCurrentScreen("main")
      // Push state again to prevent actual navigation
      window.history.pushState(null, "", window.location.href)
    }
  }, [hasTriggered])

  useEffect(() => {
    // Push initial state to history
    window.history.pushState(null, "", window.location.href)
    
    // Listen for popstate (back button)
    const handlePopState = () => {
      handleBackButton()
    }

    window.addEventListener("popstate", handlePopState)

    // For iOS Safari - detect touch move towards edge (swipe back gesture)
    let touchStartX = 0
    let touchStartY = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!hasTriggered && e.changedTouches.length > 0) {
        const touchEndX = e.changedTouches[0].clientX
        const touchEndY = e.changedTouches[0].clientY
        const diffX = touchEndX - touchStartX
        const diffY = Math.abs(touchEndY - touchStartY)
        
        // Detect swipe from left edge (iOS back gesture)
        if (touchStartX < 30 && diffX > 100 && diffY < 50) {
          handleBackButton()
        }
      }
    }

    document.addEventListener("touchstart", handleTouchStart, { passive: true })
    document.addEventListener("touchend", handleTouchEnd, { passive: true })

    // Visibility change detection (when user switches apps/tabs)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && !hasTriggered) {
        sessionStorage.setItem("showBackOffer", "true")
      }
      if (document.visibilityState === "visible") {
        const shouldShow = sessionStorage.getItem("showBackOffer")
        if (shouldShow === "true" && !hasTriggered) {
          setIsOpen(true)
          setHasTriggered(true)
          setCurrentScreen("main")
          sessionStorage.removeItem("showBackOffer")
        }
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      window.removeEventListener("popstate", handlePopState)
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchend", handleTouchEnd)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [handleBackButton, hasTriggered])

  const handleRefuseOffer = () => {
    setCurrentScreen("lastChance")
  }

  const handleFinalClose = () => {
    setIsOpen(false)
  }

  // Main offer links
  const handleSelectEAFC26 = () => {
    window.location.href = "https://go.invictuspay.app.br/kvo05"
  }

  const handleSelectEAFC25 = () => {
    window.location.href = "https://go.invictuspay.app.br/coucm"
  }

  // Last chance offer links (discounted prices)
  const handleLastChanceEAFC26 = () => {
    window.location.href = "https://go.invictuspay.app.br/xjtgl"
  }

  const handleLastChanceEAFC25 = () => {
    window.location.href = "https://go.invictuspay.app.br/sak9r"
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
      
      {currentScreen === "main" ? (
        /* Main Offer Modal */
        <div className="relative w-full max-w-sm bg-gradient-to-b from-[#0a0a1a] to-[#000000] border-2 border-[#3b82f6]/50 rounded-2xl shadow-2xl shadow-[#3b82f6]/20 overflow-hidden animate-in zoom-in-95 fade-in duration-300 my-4">
          {/* Glow effect */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#3b82f6]/30 rounded-full blur-3xl" />
          
          {/* Video Section */}
          <div className="relative w-full aspect-video bg-black">
            <iframe
              className="absolute inset-0 w-full h-full border-0"
              src="https://www.youtube.com/embed/S0YS75jvgXE?autoplay=1&mute=0&loop=1&playlist=S0YS75jvgXE&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
              title="Video demonstracao WG Patch"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay"
              allowFullScreen
            />
            {/* Video overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Content */}
          <div className="relative p-5">
            {/* Badge */}
            <div className="flex justify-center mb-3">
              
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-center text-white mb-1">
              Ganhe um <span className="text-[#3b82f6]">BRINDE</span> ao adquirir agora!
            </h2>
            
            <p className="text-zinc-400 text-center text-xs mb-4">
              Oferta exclusiva por tempo limitado
            </p>

            {/* Benefits */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-3 p-2.5 bg-[#1a1a2e]/80 rounded-xl border border-[#3b82f6]/20">
                <div className="w-9 h-9 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <Gamepad2 className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Instalacao Remota GRATIS</p>
                  <p className="text-zinc-500 text-xs">Instalamos para voce sem custo</p>
                </div>
              </div>

              

              <div className="flex items-center gap-3 p-2.5 bg-[#1a1a2e]/80 rounded-xl border border-[#3b82f6]/20">
                <div className="w-9 h-9 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <Ticket className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Cupom 5 OFF na compra</p>
                  <p className="text-zinc-500 text-xs">Desconto exclusivo para voce</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-[#3b82f6]/30" />
              <span className="text-zinc-500 text-xs font-medium">ESCOLHA SUA VERSAO</span>
              <div className="flex-1 h-px bg-[#3b82f6]/30" />
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2.5">
              <Button
                onClick={handleSelectEAFC26}
                className="w-full h-12 bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8] hover:from-[#60a5fa] hover:to-[#3b82f6] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#3b82f6]/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Gamepad2 className="w-4 h-4 mr-2" />
                QUERO O EA FC 26
              </Button>

              <Button
                onClick={handleSelectEAFC25}
                className="w-full h-12 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Gamepad2 className="w-4 h-4 mr-2" />
                QUERO O EA FC 25
              </Button>
            </div>

            {/* Refuse offer link */}
            <button
              onClick={handleRefuseOffer}
              className="w-full mt-4 py-2 text-zinc-600 hover:text-zinc-400 text-xs underline underline-offset-2 transition-colors"
            >
              Recusar oferta e perder atualizacao
            </button>
          </div>
        </div>
      ) : (
        /* Last Chance Modal */
        <div className="relative w-full max-w-sm bg-gradient-to-b from-[#1a0a0a] to-[#000000] border-2 border-red-500/50 rounded-2xl shadow-2xl shadow-red-500/20 overflow-hidden animate-in zoom-in-95 fade-in duration-300 my-4">
          {/* Glow effect */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-red-500/30 rounded-full blur-3xl" />
          
          {/* Warning header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-4">
            <div className="flex items-center justify-center gap-2">
              <AlertTriangle className="w-6 h-6 text-white animate-pulse" />
              <span className="text-white font-bold text-lg">ULTIMA CHANCE!</span>
              <AlertTriangle className="w-6 h-6 text-white animate-pulse" />
            </div>
          </div>

          {/* Video Section */}
          <div className="relative w-full aspect-video bg-black">
            <iframe
              className="absolute inset-0 w-full h-full border-0"
              src="https://www.youtube.com/embed/S0YS75jvgXE?autoplay=1&mute=0&loop=1&playlist=S0YS75jvgXE&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
              title="Video demonstracao WG Patch"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay"
              allowFullScreen
            />
            {/* Video overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a0a] via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Content */}
          <div className="relative p-5">
            {/* Title */}
            <h2 className="text-xl font-bold text-center text-white mb-2">
              Voce esta prestes a <span className="text-red-400">perder</span> essa oferta!
            </h2>
            
            <p className="text-zinc-400 text-center text-sm mb-5">
              Fizemos um preco especial so para voce nao sair de maos vazias:
            </p>

            {/* Price Cards */}
            <div className="space-y-3 mb-5">
              {/* EAFC 26 Card */}
              <div className="relative bg-gradient-to-r from-[#1a1a2e] to-[#0a0a1a] rounded-xl border border-[#3b82f6]/30 overflow-hidden">
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  -60% OFF
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold text-lg">EA FC 26</p>
                      <p className="text-zinc-500 text-xs line-through">De R$ 109,90</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#3b82f6] font-bold text-2xl">R$ 19,90</p>
                    </div>
                  </div>
                  <Button
                    onClick={handleLastChanceEAFC26}
                    className="w-full mt-3 h-11 bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8] hover:from-[#60a5fa] hover:to-[#3b82f6] text-white font-bold text-sm rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    GARANTIR POR R$ 19,90
                  </Button>
                </div>
              </div>

              {/* EAFC 25 Card */}
              <div className="relative bg-gradient-to-r from-[#1a1a2e] to-[#0a0a1a] rounded-xl border border-emerald-500/30 overflow-hidden">
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  -75% OFF
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold text-lg">EA FC 25</p>
                      <p className="text-zinc-500 text-xs line-through">De R$ 89,90</p>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-400 font-bold text-2xl">R$ 9,90</p>
                    </div>
                  </div>
                  <Button
                    onClick={handleLastChanceEAFC25}
                    className="w-full mt-3 h-11 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold text-sm rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    GARANTIR POR R$ 9,90
                  </Button>
                </div>
              </div>
            </div>

            {/* Final refuse link */}
            <button
              onClick={handleFinalClose}
              className="w-full py-2 text-zinc-600 hover:text-zinc-400 text-xs underline underline-offset-2 transition-colors"
            >
              Nao, obrigado. Prefiro pagar mais caro depois.
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
