/**
 * Wrapper autour de next-intl pour maintenir la compatibilité avec le code existant
 * Utilise next-intl en arrière-plan pour gérer les traductions
 */

import { getTranslations } from "next-intl/server"

// Fonction pour encoder les clés (remplacer les points par __DOT__)
function encodeKey(key: string): string {
  return key.replace(/\./g, "__DOT__")
}

// Pour les Server Components
export async function translateCategory(categoryName: string): Promise<string> {
  const t = await getTranslations("categories")
  const encodedKey = encodeKey(categoryName)
  return t(encodedKey) || categoryName
}

export async function translateProduct(productName: string): Promise<string> {
  const t = await getTranslations("products")
  const encodedKey = encodeKey(productName)
  return t(encodedKey) || productName
}

export async function translateProductDescription(description: string): Promise<string> {
  if (!description) return description

  const t = await getTranslations("descriptions")
  const tTerms = await getTranslations("terms")

  // Nettoyer le HTML si présent et normaliser les espaces multiples
  let cleanDescription = description
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim()

  // Normaliser les guillemets typographiques
  cleanDescription = cleanDescription
    .replace(/\u2018/g, "'")
    .replace(/\u2019/g, "'")
    .replace(/\u201C/g, '"')
    .replace(/\u201D/g, '"')

  const normalizedDescription = cleanDescription.replace(/\s+/g, " ").trim()

  // Essayer de traduire la description complète (encoder la clé)
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

  // Si pas de traduction complète, essayer les termes
  let translatedDescription = normalizedDescription
  const terms = await tTerms.raw("terms")
  if (terms && typeof terms === "object") {
    const sortedTerms = Object.entries(terms as Record<string, string>).sort(
      (a, b) => b[0].length - a[0].length,
    )

    for (const [english, french] of sortedTerms) {
      const normalizedEnglish = english.replace(/\s+/g, " ").trim()
      const escapedEnglish = normalizedEnglish.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      const isPhrase = normalizedEnglish.includes(" ") || normalizedEnglish.length > 15
      const regex = isPhrase
        ? new RegExp(escapedEnglish.replace(/\s+/g, "\\s+"), "gi")
        : new RegExp(`\\b${escapedEnglish}\\b`, "gi")

      translatedDescription = translatedDescription.replace(regex, (match) => {
        if (match[0] === match[0].toUpperCase()) {
          return (french as string).charAt(0).toUpperCase() + (french as string).slice(1)
        }
        return french as string
      })
    }
  }

  return translatedDescription
}

// Les hooks pour Client Components sont maintenant dans translations-client.ts
// Importez-les depuis "@/lib/translations-client"
