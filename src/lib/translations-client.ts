"use client"

/**
 * Hooks de traduction pour les Client Components
 * Utilise next-intl en arrière-plan pour gérer les traductions
 */

import { useTranslations } from "next-intl"

// Fonction pour encoder les clés (remplacer les points par __DOT__)
function encodeKey(key: string): string {
  return key.replace(/\./g, "__DOT__")
}

export function useCategoryTranslation() {
  const t = useTranslations("categories")
  return (categoryName: string) => {
    const encodedKey = encodeKey(categoryName)
    return t(encodedKey) || categoryName
  }
}

export function useProductTranslation() {
  const t = useTranslations("products")
  return (productName: string) => {
    const encodedKey = encodeKey(productName)
    return t(encodedKey) || productName
  }
}

export function useProductDescriptionTranslation() {
  const t = useTranslations("descriptions")
  const tTerms = useTranslations("terms")

  return (description: string): string => {
    if (!description) return description

    let cleanDescription = description
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim()

    cleanDescription = cleanDescription
      .replace(/\u2018/g, "'")
      .replace(/\u2019/g, "'")
      .replace(/\u201C/g, '"')
      .replace(/\u201D/g, '"')

    const normalizedDescription = cleanDescription.replace(/\s+/g, " ").trim()

    // Essayer la traduction complète (encoder la clé)
    const encodedKey = encodeKey(normalizedDescription)
    let fullTranslation: string | undefined
    try {
      fullTranslation = t(encodedKey)
    } catch {
      // Si la traduction n'existe pas, next-intl peut throw une erreur
      // Dans ce cas, on continue avec la description originale
    }
    if (fullTranslation && fullTranslation !== normalizedDescription) {
      return fullTranslation
    }

    // Traduire les termes (encoder les clés avec des points)
    let translatedDescription = normalizedDescription
    const termsKeys = [
      "metres",
      "Cat.6",
      "network cable",
      "upwards/downwards compatible",
      "Patch cable",
      "RJ-45 plug",
      "bend protection mantle",
      "High transmission speeds",
      "due to operating frequency",
      "up to",
      "MHz",
      "in comparison to",
      "Cat.5",
      "Cat.5e",
      "cable bandwidth",
    ]

    for (const key of termsKeys) {
      const encodedTermKey = encodeKey(key)
      const french = tTerms(encodedTermKey)
      if (french && french !== key) {
        const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        const isPhrase = key.includes(" ") || key.length > 15
        const regex = isPhrase
          ? new RegExp(escapedKey.replace(/\s+/g, "\\s+"), "gi")
          : new RegExp(`\\b${escapedKey}\\b`, "gi")

        translatedDescription = translatedDescription.replace(regex, (match) => {
          if (match[0] === match[0].toUpperCase()) {
            return french.charAt(0).toUpperCase() + french.slice(1)
          }
          return french
        })
      }
    }

    return translatedDescription
  }
}

