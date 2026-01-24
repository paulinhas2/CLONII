"use client"

import { createContext, useContext, useState, ReactNode } from "react"

/* ================================================
   CONTEXTO DE SELEÇÃO DO JOGO
   
   Este contexto compartilha a seleção do usuário
   (EA FC 25 ou EA FC 26) entre todos os componentes.
   ================================================ */

interface GameSelection {
  game: string
  checkoutUrl: string
}

interface GameSelectionContextType {
  selectedGame: GameSelection
  setSelectedGame: (game: GameSelection) => void
}

const defaultGame: GameSelection = {
  game: "EA FC 26",
  checkoutUrl: "#checkout-fc26"
}

const GameSelectionContext = createContext<GameSelectionContextType | undefined>(undefined)

export function GameSelectionProvider({ children }: { children: ReactNode }) {
  const [selectedGame, setSelectedGame] = useState<GameSelection>(defaultGame)

  return (
    <GameSelectionContext.Provider value={{ selectedGame, setSelectedGame }}>
      {children}
    </GameSelectionContext.Provider>
  )
}

export function useGameSelection() {
  const context = useContext(GameSelectionContext)
  if (context === undefined) {
    throw new Error("useGameSelection must be used within a GameSelectionProvider")
  }
  return context
}
