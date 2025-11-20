import { ProductDetail } from "../types"
import { ApiError, NetworkError, logError } from "@/lib/errors"

interface GetProductBySlugResponse {
  data?: {
    product: {
      id: string
      slug: string
      name: string
      description: string
      featuredAsset: { preview: string } | null
      assets: { preview: string }[]
      collections: { id: string; name: string; slug: string }[]
      variants: {
        id: string
        sku: string
        priceWithTax: number
        currencyCode: string
      }[]
    } | null
  }
  errors?: Array<{
    message: string
    locations?: Array<{ line: number; column: number }>
    path?: Array<string | number>
  }>
}

const GET_PRODUCT_BY_SLUG_QUERY = `
  query GetProductBySlug($slug: String!) {
    product(slug: $slug) {
      id
      slug
      name
      description
      featuredAsset {
        preview
      }
      assets {
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
`

export async function fetchProductBySlug(slug: string): Promise<ProductDetail | null> {
  const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL

  if (!graphqlUrl) {
    logError(
      new Error("NEXT_PUBLIC_GRAPHQL_URL is not defined"),
      "fetchProductBySlug - Missing environment variable",
    )
    return null
  }

  if (!slug || slug.trim() === "") {
    logError(new Error("Empty slug provided"), "fetchProductBySlug - Invalid slug")
    return null
  }

  try {
    const response = await fetch(graphqlUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GET_PRODUCT_BY_SLUG_QUERY,
        variables: { slug },
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      if (response.status === 404) {
        return null // Produit non trouvé, pas une erreur
      }
      const errorText = await response.text().catch(() => "Unable to read error response")
      throw new ApiError(
        `Erreur lors de la récupération du produit: ${response.status} ${response.statusText}`,
        response.status,
        errorText,
      )
    }

    const result: GetProductBySlugResponse = await response.json()

    // Check for GraphQL errors
    if (result.errors && result.errors.length > 0) {
      const errorMessages = result.errors.map((e) => e.message).join(", ")
      logError(new Error(`GraphQL errors: ${errorMessages}`), "fetchProductBySlug")
      return null
    }

    if (!result?.data?.product) {
      return null // Produit non trouvé
    }

    const p = result.data.product
    const firstVariant = p.variants[0]

    const gallery = p.assets?.map((a) => a.preview) ?? []
    const thumbnail = p.featuredAsset?.preview ?? gallery[0] ?? "/placeholder.png"

    // Générer des données mockées pour les reviews (cohérentes avec fetchProducts)
    const seed = parseInt(p.id) || 0
    const reviewCount = Math.floor((seed % 200) + 5) // Entre 5 et 204 avis
    const averageRating = Number((3.5 + (seed % 15) / 10).toFixed(1)) // Entre 3.5 et 4.9

    return {
      id: p.id,
      slug: p.slug,
      name: p.name,
      description: p.description.replace(/<[^>]*>/g, ""), // texte clean
      descriptionHtml: p.description,
      price: firstVariant?.priceWithTax ?? 0,
      currencyCode: firstVariant?.currencyCode ?? "EUR",
      thumbnail,
      gallery: gallery.length ? gallery : [thumbnail],
      averageRating,
      reviewCount,
      sku: firstVariant?.sku ?? "",
      categories: p.collections || [],
    }
  } catch (error) {
    if (error instanceof ApiError) {
      logError(error, "fetchProductBySlug")
      throw error
    }

    if (error instanceof Error && error.name === "AbortError") {
      const timeoutError = new NetworkError("La requête a expiré. Veuillez réessayer.")
      logError(timeoutError, "fetchProductBySlug - Timeout")
      throw timeoutError
    }

    if (error instanceof TypeError && error.message.includes("fetch")) {
      const networkError = new NetworkError("Impossible de se connecter au serveur.", error)
      logError(networkError, "fetchProductBySlug")
      throw networkError
    }

    logError(error, "fetchProductBySlug - Unknown error")
    return null
  }
}
