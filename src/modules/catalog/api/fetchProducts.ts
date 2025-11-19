import { Product } from "../types"

interface GetProductsResponse {
  data?: {
    products: {
      items: {
        id: string
        slug: string
        name: string
        description: string
        featuredAsset: { preview: string } | null
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
    // Log to server console for debugging
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[fetchProducts] NEXT_PUBLIC_GRAPHQL_URL is not defined. Please check your .env file.",
      )
    }
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
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unable to read error response")
      throw new Error(
        `GraphQL request failed: ${response.status} ${response.statusText}. Response: ${errorText}`,
      )
    }

    const result: GetProductsResponse = await response.json()

    // Check for GraphQL errors
    if (result.errors && result.errors.length > 0) {
      const errorMessages = result.errors.map((e) => e.message).join(", ")
      throw new Error(`GraphQL errors: ${errorMessages}`)
    }

    if (!result?.data?.products?.items) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[fetchProducts] No products found in response:", result)
      }
      return []
    }

    return result.data.products.items.map((item) => {
      const firstVariant = item.variants[0]

      return {
        id: item.id,
        slug: item.slug,
        name: item.name,
        description: item.description,
        price: firstVariant?.priceWithTax ?? 0,
        currencyCode: firstVariant?.currencyCode ?? "EUR",
        thumbnail: item.featuredAsset?.preview ?? "/placeholder.png",
        averageRating: 0,
        reviewCount: 0,
        sku: firstVariant?.sku ?? "",
      }
    })
  } catch (error) {
    // Log error details in development for debugging
    if (process.env.NODE_ENV === "development") {
      console.error("[fetchProducts] Error fetching products:", {
        message: error instanceof Error ? error.message : String(error),
        url: graphqlUrl,
      })
    }
    return []
  }
}
