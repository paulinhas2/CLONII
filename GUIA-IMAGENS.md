# Guia de Imagens - WG Patch

Este arquivo lista todas as imagens que você precisa adicionar ao projeto.

## Estrutura de Pastas

Todas as imagens devem ser colocadas em: `/public/images/`

\`\`\`
public/
├── images/
│   ├── logo.png                    (Logo do Header)
│   ├── logo-footer.png             (Logo do Footer)
│   ├── eafc26-cover.png            (Capa EA FC 26)
│   ├── eafc25-cover.png            (Capa EA FC 25)
│   ├── leagues-clubs.png           (Imagem das Ligas)
│   ├── brazilian-clubs.png         (Clubes Brasileiros)
│   ├── testimonial-1.png           (Depoimento 1)
│   ├── testimonial-2.png           (Depoimento 2)
│   ├── testimonial-3.png           (Depoimento 3)
│   └── testimonial-4.png           (Depoimento 4)
└── video-demo.mp4                  (Vídeo de demonstração)
\`\`\`

## Lista de Imagens por Seção

### 1. Header (Cabeçalho)
- **Arquivo:** `/components/header.tsx`
- **Imagem:** `/public/images/logo.png`
- **Tamanho:** 48x48px (será exibido dentro de círculo de 64px)

### 2. Vídeo de Demonstração
- **Arquivo:** `/components/video-section.tsx`
- **Vídeo:** `/public/video-demo.mp4`
- **Formato:** MP4, WebM ou OGG
- **Proporção:** 16:9 (widescreen)

### 3. Carrossel de Ofertas
- **Arquivo:** `/components/offer-carousel.tsx`
- **Imagens:**
  - `/public/images/eafc26-cover.png` (Capa EA FC 26)
  - `/public/images/eafc25-cover.png` (Capa EA FC 25)
- **Tamanho:** 400x533px (proporção 3:4)

### 4. Seção de Ligas
- **Arquivo:** `/components/leagues-section.tsx`
- **Imagem:** `/public/images/leagues-clubs.png`
- **Tamanho:** 800x600px (proporção 4:3)

### 5. Clubes Brasileiros
- **Arquivo:** `/components/brazilian-clubs-section.tsx`
- **Imagem:** `/public/images/brazilian-clubs.png`
- **Tamanho:** 800x400px

### 6. Depoimentos/Testimonials
- **Arquivo:** `/components/testimonials-section.tsx`
- **Imagens:**
  - `/public/images/testimonial-1.png`
  - `/public/images/testimonial-2.png`
  - `/public/images/testimonial-3.png`
  - `/public/images/testimonial-4.png`
- **Tamanho:** 280x500px (proporção 9:16 - formato stories)

### 7. Footer (Rodapé)
- **Arquivo:** `/components/footer-section.tsx`
- **Imagem:** `/public/images/logo-footer.png`
- **Tamanho:** 80x80px (ícone quadrado)

## Como Adicionar as Imagens

1. Crie a pasta `/public/images/` se não existir
2. Coloque suas imagens na pasta com os nomes exatos listados acima
3. As imagens serão carregadas automaticamente

## Dicas

- Use imagens otimizadas para web (comprimidas)
- Formatos recomendados: PNG para logos, JPG para fotos
- O vídeo deve ser comprimido para carregamento rápido
- Todas as proporções estão listadas para facilitar o redimensionamento
