"use client"

import { useEffect } from "react"

// URL do back redirect - quando o usuario tentar sair, sera redirecionado para esta pagina
const BACK_REDIRECT_URL = "http://patchwgoferta.netlify.app/"

export function BackRedirect() {
  useEffect(() => {
    // Script oficial UTMify para back redirect
    function setBackRedirect(url: string) {
      let urlBackRedirect = url
      // Adiciona os parametros UTM da URL atual ao link de destino
      urlBackRedirect =
        urlBackRedirect.trim() +
        (urlBackRedirect.indexOf("?") > 0 ? "&" : "?") +
        document.location.search.replace("?", "").toString()

      // Push 3 estados no historico (abordagem UTMify)
      history.pushState({}, "", location.href)
      history.pushState({}, "", location.href)
      history.pushState({}, "", location.href)

      // Listener para quando o usuario clicar em voltar
      window.addEventListener("popstate", () => {
        console.log("onpopstate", urlBackRedirect)
        setTimeout(() => {
          location.href = urlBackRedirect
        }, 1)
      })
    }

    setBackRedirect(BACK_REDIRECT_URL)
  }, [])

  // Este componente nao renderiza nada visualmente
  return null
}
