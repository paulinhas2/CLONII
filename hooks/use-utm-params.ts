"use client"

import { useEffect, useState, useCallback } from "react"

/* ================================================
   HOOK DE PARAMETROS UTM
   
   Captura e gerencia parametros UTM da URL.
   Persiste no sessionStorage para manter durante a navegacao.
   ================================================ */

export interface UTMParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  src?: string
  sck?: string
  [key: string]: string | undefined
}

const UTM_STORAGE_KEY = "wg_patch_utm_params"

// Lista de parametros UTM e tracking que devem ser capturados
const TRACKED_PARAMS = [
  "utm_source",
  "utm_medium", 
  "utm_campaign",
  "utm_term",
  "utm_content",
  "src",
  "sck",
  "fbclid",
  "gclid",
  "ref",
]

export function useUTMParams() {
  const [utmParams, setUtmParams] = useState<UTMParams>({})
  const [isLoaded, setIsLoaded] = useState(false)

  // Carrega UTMs do sessionStorage e da URL atual
  useEffect(() => {
    if (typeof window === "undefined") return

    // Primeiro, tenta carregar do sessionStorage
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY)
    let storedParams: UTMParams = {}
    
    if (stored) {
      try {
        storedParams = JSON.parse(stored)
      } catch {
        storedParams = {}
      }
    }

    // Captura parametros da URL atual
    const urlParams = new URLSearchParams(window.location.search)
    const currentParams: UTMParams = {}

    TRACKED_PARAMS.forEach((param) => {
      const value = urlParams.get(param)
      if (value) {
        currentParams[param] = value
      }
    })

    // Merge: parametros da URL atual tem prioridade sobre os armazenados
    const mergedParams = { ...storedParams, ...currentParams }

    // Salva no sessionStorage se houver parametros
    if (Object.keys(mergedParams).length > 0) {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(mergedParams))
    }

    setUtmParams(mergedParams)
    setIsLoaded(true)
  }, [])

  // Funcao para adicionar UTMs a uma URL (usando abordagem UTMify oficial)
  // Script UTMify: url.trim() + (url.indexOf('?') > 0 ? '&' : '?') + document.location.search.replace('?', '')
  const appendUTMsToUrl = useCallback((baseUrl: string): string => {
    if (!baseUrl) return baseUrl

    // Abordagem UTMify oficial: pega TODOS os parametros da URL atual
    const currentSearch = typeof window !== "undefined" ? document.location.search : ""
    
    // Se nao tem parametros na URL atual, retorna a URL base
    if (!currentSearch) return baseUrl.trim()

    // Logica exata do script UTMify
    const urlTrimmed = baseUrl.trim()
    const separator = urlTrimmed.indexOf("?") > 0 ? "&" : "?"
    const paramsToAppend = currentSearch.replace("?", "")
    
    return urlTrimmed + separator + paramsToAppend
  }, [])

  // Funcao para redirecionar com UTMs
  const redirectWithUTMs = useCallback((baseUrl: string) => {
    const finalUrl = appendUTMsToUrl(baseUrl)
    window.location.href = finalUrl
  }, [appendUTMsToUrl])

  // Retorna a query string dos UTMs para uso em links
  const getUTMQueryString = useCallback((): string => {
    if (Object.keys(utmParams).length === 0) return ""
    
    const queryString = Object.entries(utmParams)
      .filter(([, value]) => value)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value!)}`)
      .join("&")
    
    return queryString
  }, [utmParams])

  return {
    utmParams,
    isLoaded,
    appendUTMsToUrl,
    redirectWithUTMs,
    getUTMQueryString,
  }
}

// Funcao utilitaria para uso fora de componentes React
export function getStoredUTMParams(): UTMParams {
  if (typeof window === "undefined") return {}
  
  const stored = sessionStorage.getItem(UTM_STORAGE_KEY)
  if (!stored) return {}
  
  try {
    return JSON.parse(stored)
  } catch {
    return {}
  }
}

// Funcao utilitaria para adicionar UTMs a URL fora de componentes React (abordagem UTMify oficial)
// Script UTMify: url.trim() + (url.indexOf('?') > 0 ? '&' : '?') + document.location.search.replace('?', '')
export function appendUTMsToUrlStatic(baseUrl: string): string {
  if (!baseUrl) return baseUrl

  // Abordagem UTMify oficial: pega TODOS os parametros da URL atual
  const currentSearch = typeof window !== "undefined" ? document.location.search : ""
  
  // Se nao tem parametros na URL atual, retorna a URL base
  if (!currentSearch) return baseUrl.trim()

  // Logica exata do script UTMify
  const urlTrimmed = baseUrl.trim()
  const separator = urlTrimmed.indexOf("?") > 0 ? "&" : "?"
  const paramsToAppend = currentSearch.replace("?", "")
  
  return urlTrimmed + separator + paramsToAppend
}
