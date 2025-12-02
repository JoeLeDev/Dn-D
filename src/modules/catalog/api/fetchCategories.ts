import { Category } from "../types"
import { ApiError, NetworkError, logError } from "@/lib/errors"

interface GetCategoriesResponse {
  data?: {
    collections: {
      items: {
        id: string
        name: string
        slug: string
      }[]
    }
  }
  errors?: Array<{
    message: string
    locations?: Array<{ line: number; column: number }>
    path?: Array<string | number>
  }>
}

const GET_CATEGORIES_QUERY = `
  query GetCategories {
    collections {
      items {
        id
        name
        slug
      }
    }
  }
`

export async function fetchCategories(): Promise<Category[]> {
  const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL

  if (!graphqlUrl) {
    logError(
      new Error("NEXT_PUBLIC_GRAPHQL_URL is not defined"),
      "fetchCategories - Missing environment variable",
    )
    return []
  }

  try {
    const response = await fetch(graphqlUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GET_CATEGORIES_QUERY,
      }),
      // Utiliser le cache Next.js avec revalidation toutes les 60 secondes
      // En développement, pas de cache pour éviter les problèmes
      ...(process.env.NODE_ENV === "production" ? { next: { revalidate: 60 } } : { cache: "no-store" }),
      signal: AbortSignal.timeout(5000),
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unable to read error response")
      throw new ApiError(
        `Erreur lors de la récupération des catégories: ${response.status} ${response.statusText}`,
        response.status,
        errorText,
      )
    }

    const result: GetCategoriesResponse = await response.json()

    // Check for GraphQL errors
    if (result.errors && result.errors.length > 0) {
      const errorMessages = result.errors.map((e) => e.message).join(", ")
      logError(new Error(`GraphQL errors: ${errorMessages}`), "fetchCategories")
      return []
    }

    if (!result?.data?.collections?.items) {
      return []
    }

    return result.data.collections.items
  } catch (error) {
    if (error instanceof ApiError) {
      logError(error, "fetchCategories")
      // Pour les catégories, on retourne un tableau vide plutôt que de throw
      // car l'absence de catégories ne doit pas bloquer l'affichage
      return []
    }

    if (error instanceof Error && error.name === "AbortError") {
      logError(new NetworkError("La requête a expiré."), "fetchCategories - Timeout")
      return []
    }

    if (error instanceof TypeError && error.message.includes("fetch")) {
      logError(new NetworkError("Impossible de se connecter au serveur.", error), "fetchCategories")
      return []
    }

    logError(error, "fetchCategories - Unknown error")
    return []
  }
}

