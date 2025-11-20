import { Category } from "../types"

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
      cache: "no-store",
    })

    if (!response.ok) {
      return []
    }

    const result: GetCategoriesResponse = await response.json()

    // Check for GraphQL errors
    if (result.errors && result.errors.length > 0) {
      return []
    }

    if (!result?.data?.collections?.items) {
      return []
    }

    return result.data.collections.items
  } catch {
    return []
  }
}

