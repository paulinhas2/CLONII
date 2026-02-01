import { PromoBanner } from "@/components/promo-banner"
import { Header } from "@/components/header"
import { VideoSection } from "@/components/video-section"
import { LicenseSection } from "@/components/license-section"
import { OfferCarousel } from "@/components/offer-carousel"
import { LeaguesSection } from "@/components/leagues-section"
import { RealPlayersSection } from "@/components/real-players-section"
import { BrazilianClubsSection } from "@/components/brazilian-clubs-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FooterSection } from "@/components/footer-section"
import { GameSelectionProvider } from "@/contexts/game-selection-context"
import { BackRedirect } from "@/components/back-redirect-modal"

export default function Home() {
  return (
    <GameSelectionProvider>
      <main className="min-h-screen bg-background">
        {/* Back Redirect - Redireciona para pagina de oferta ao tentar sair */}
        <BackRedirect />
        
        {/* ========================================
            BARRA DE PROMOÇÃO NO TOPO
            - Fixa no topo da página
            ======================================== */}
        <PromoBanner />
        
        <div className="mx-auto max-w-md">
          {/* ========================================
              HEADER / CABEÇALHO
              - Imagem do LOGO: /components/header.tsx
              - Atualmente usa texto "WG" como placeholder
              ======================================== */}
          <Header />
          
          {/* ========================================
              SEÇÃO DE VÍDEO
              - Vídeo de demonstração: /components/video-section.tsx
              - Arquivo: /public/video-demo.mp4
              ======================================== */}
          <VideoSection />
          
          {/* ========================================
              SEÇÃO DE LICENÇA
              - Sem imagens necessárias
              ======================================== */}
          <LicenseSection />
          
          {/* ========================================
              CARROSSEL DE OFERTAS
              - Imagens das capas dos jogos: /components/offer-carousel.tsx
              - Imagem EA FC 26: /public/images/eafc26-cover.png
              - Imagem EA FC 25: /public/images/eafc25-cover.png
              ======================================== */}
          <OfferCarousel />
          
          {/* ========================================
              SEÇÃO DE LIGAS
              - Imagens das ligas: /components/leagues-section.tsx
              - Imagem: /public/images/leagues-clubs.png
              ======================================== */}
          <LeaguesSection />
          
          {/* ========================================
              SEÇÃO JOGADORES REAIS
              - Imagem promocional: /components/real-players-section.tsx
              - Imagem: /public/images/real-players-promo.png
              ======================================== */}
          <RealPlayersSection />
          
          {/* ========================================
              SEÇÃO CLUBES BRASILEIROS
              - Imagem principal: /components/brazilian-clubs-section.tsx
              - Imagem: /public/images/brazilian-clubs.png
              ======================================== */}
          <BrazilianClubsSection />
          
          {/* ========================================
              SEÇÃO COMO FUNCIONA
              - Sem imagens necessárias (usa ícones)
              ======================================== */}
          <HowItWorksSection />
          
          {/* ========================================
              SEÇÃO DE DEPOIMENTOS
              - Screenshots de feedbacks: /components/testimonials-section.tsx
              - Imagem 1: /public/images/testimonial-1.png
              - Imagem 2: /public/images/testimonial-2.png
              - Imagem 3: /public/images/testimonial-3.png
              - Imagem 4: /public/images/testimonial-4.png
              ======================================== */}
          <TestimonialsSection />
          
          {/* ========================================
              FOOTER / RODAPÉ
              - Logo do footer: /components/footer-section.tsx
              - Imagem: /public/images/logo.png
              ======================================== */}
          <FooterSection />
        </div>
      </main>
    </GameSelectionProvider>
  )
}
