"use client"

import { useEffect, useState } from "react"

function getCurrentDate() {
  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = String(now.getFullYear()).slice(-2)
  return `${day}/${month}/${year}`
}

export function PromoBanner() {
  const [currentDate, setCurrentDate] = useState("")

  useEffect(() => {
    setCurrentDate(getCurrentDate())
  }, [])

  return (
    <div className="w-full bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 py-2 px-4 text-center overflow-hidden">
      <p className="text-white text-xs sm:text-sm font-bold whitespace-nowrap animate-marquee">
        PATCH 100% ATUALIZADO TODA SEMANA 🎮 PROMOCAO VALIDA ATE {currentDate}
      </p>
    </div>
  )
}
