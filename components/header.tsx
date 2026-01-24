"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { IMAGES } from "@/lib/images-config"

export function Header() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <header className="flex flex-col items-center px-4 pt-6 pb-4">
      {/* ================================================
          LOGO DA MARCA
          
          COMO ADICIONAR SUA IMAGEM:
          1. Coloque sua imagem em: /public/images/logo.png
          2. Substitua o <span> abaixo por:
             <Image 
               src="/images/logo.png" 
               alt="WG Patch Logo" 
               width={48} 
               height={48} 
               className="object-contain"
             />
          ================================================ */}
      <div 
        className={`flex h-16 w-16 items-center justify-center rounded-full bg-[#1a1a2e] overflow-hidden transition-all duration-700 ease-out ${
          isLoaded ? "scale-100 opacity-100" : "scale-50 opacity-0"
        } hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25 cursor-pointer`}
      >
        <Image 
          src={IMAGES.logo || "/placeholder.svg"} 
          alt="WG Patch Logo" 
          width={64} 
          height={64} 
          className="object-cover w-full h-full"
        />
      </div>
      
      {/* Brand Name */}
      <div 
        className={`mt-2 flex items-center gap-1 transition-all duration-700 delay-200 ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <span className="text-lg font-bold text-[#1a1a2e]">WG</span>
        <span className="text-lg font-bold text-[#3b82f6] animate-pulse">PATCH</span>
      </div>
    </header>
  )
}
