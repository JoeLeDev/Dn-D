import { Product } from "../types"
import { ApiError, NetworkError, logError } from "@/lib/errors"

interface GetProductsResponse {
  data?: {
    products: {
      items: {
        id: string
        slug: string
        name: string
        description: string
        featuredAsset: { preview: string } | null
        collections: { id: string; name: string; slug: string }[]
        variants: {
          id: string
          sku: string
          priceWithTax: number
          currencyCode: string
        }[]
      }[]
    }
  }
  errors?: Array<{
    message: string
    locations?: Array<{ line: number; column: number }>
    path?: Array<string | number>
  }>
}

const GET_PRODUCTS_QUERY = `
  query GetProducts {
    products(options: { take: 24 }) {
      items {
        id
        slug
        name
        description
        featuredAsset {
          preview
        }
        collections {
          id
          name
          slug
        }
        variants {
          id
          sku
          priceWithTax
          currencyCode
        }
      }
    }
  }
`

export async function fetchProducts(): Promise<Product[]> {
  const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL

  if (!graphqlUrl) {
    logError(
      new Error("NEXT_PUBLIC_GRAPHQL_URL is not defined"),
      "fetchProducts - Missing environment variable",
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
        query: GET_PRODUCTS_QUERY,
      }),
      cache: "no-store",
      // Timeout après 10 secondes
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unable to read error response")
      throw new ApiError(
        `Erreur lors de la récupération des produits: ${response.status} ${response.statusText}`,
        response.status,
        errorText,
      )
    }

    const result: GetProductsResponse = await response.json()

    // Check for GraphQL errors
    if (result.errors && result.errors.length > 0) {
      const errorMessages = result.errors.map((e) => e.message).join(", ")
      throw new ApiError(`Erreurs GraphQL: ${errorMessages}`, undefined, result.errors)
    }

    if (!result?.data?.products?.items) {
      logError(new Error("No products found in response"), "fetchProducts - Empty response")
      return []
    }

    return result.data.products.items.map((item) => {
      const firstVariant = item.variants[0]

      // Générer des données mockées pour les reviews
      // Utiliser l'ID du produit comme seed pour avoir des valeurs cohérentes
      const seed = parseInt(item.id) || 0
      const reviewCount = Math.floor((seed % 200) + 5) // Entre 5 et 204 avis
      const averageRating = Number((3.5 + (seed % 15) / 10).toFixed(1)) // Entre 3.5 et 4.9

      return {
        id: item.id,
        slug: item.slug,
        name: item.name,
        description: item.description,
        price: firstVariant?.priceWithTax ?? 0,
        currencyCode: firstVariant?.currencyCode ?? "EUR",
        thumbnail: item.featuredAsset?.preview ?? "/placeholder.png",
        averageRating,
        reviewCount,
        sku: firstVariant?.sku ?? "",
        categories: item.collections || [],
      }
    })
  } catch (error) {
    if (error instanceof ApiError) {
      logError(error, "fetchProducts")
      throw error // Re-throw pour que les pages puissent gérer l'erreur
    }

    if (error instanceof Error && error.name === "AbortError") {
      const timeoutError = new NetworkError("La requête a expiré. Veuillez réessayer.")
      logError(timeoutError, "fetchProducts - Timeout")
      throw timeoutError
    }

    if (error instanceof TypeError && error.message.includes("fetch")) {
      const networkError = new NetworkError("Impossible de se connecter au serveur.", error)
      logError(networkError, "fetchProducts")
      throw networkError
    }

    const unknownError = new Error(
      "Une erreur inattendue est survenue lors du chargement des produits.",
    )
    logError(unknownError, "fetchProducts")
    throw unknownError
  }
}
