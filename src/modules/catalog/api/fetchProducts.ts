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
      totalItems: number
    }
  }
  errors?: Array<{
    message: string
    locations?: Array<{ line: number; column: number }>
    path?: Array<string | number>
  }>
}

const GET_PRODUCTS_QUERY = `
  query GetProducts($skip: Int!, $take: Int!) {
    products(options: { skip: $skip, take: $take }) {
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
      totalItems
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
    // L'API Vendure limite à 100 produits maximum par requête
    const allProducts: Product[] = []
    let skip = 0
    const take = 100 // Maximum autorisé par l'API
    let totalItems = 0
    let hasMore = true

    // Récupérer tous les produits avec pagination
    while (hasMore) {
      const response = await fetch(graphqlUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: GET_PRODUCTS_QUERY,
          variables: { skip, take },
        }),
        ...(process.env.NODE_ENV === "production"
          ? { next: { revalidate: 60 } }
          : { cache: "no-store" }),
        signal: AbortSignal.timeout(5000),
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
        break
      }

      // Mettre à jour le total si c'est la première requête
      if (totalItems === 0) {
        totalItems = result.data.products.totalItems
      }

      const products = result.data.products.items.map((item) => {
        const firstVariant = item.variants[0]
        const seed = parseInt(item.id) || 0
        const reviewCount = Math.floor((seed % 200) + 5)
        const averageRating = Number((3.5 + (seed % 15) / 10).toFixed(1))

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

      allProducts.push(...products)

      // Vérifier s'il y a encore des produits à récupérer
      hasMore = allProducts.length < totalItems
      skip += take
    }

    return allProducts
  } catch (error) {
    if (error instanceof ApiError) {
      logError(error, "fetchProducts")
      throw error
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
