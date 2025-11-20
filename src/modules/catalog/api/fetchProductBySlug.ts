import { ProductDetail } from "../types"

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
    })

    if (!response.ok) {
      return null
    }

    const result: GetProductBySlugResponse = await response.json()

    // Check for GraphQL errors
    if (result.errors && result.errors.length > 0) {
      return null
    }

    if (!result?.data?.product) {
      return null
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
  } catch {
    return null
  }
}
