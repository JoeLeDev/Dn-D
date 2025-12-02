"use client"

import { useTranslations } from "next-intl"

/**
 * Hook personnalisé pour utiliser les traductions dans les Client Components
 * 
 * @example
 * const t = useTranslation()
 * t("catalog.title") // "Catalogue"
 */
export function useTranslation() {
  return useTranslations()
}

