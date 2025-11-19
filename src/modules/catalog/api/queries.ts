import { gql } from "@apollo/client"

export const GET_PRODUCTS = gql`
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
        customFields {
          averageRating
          reviewCount
        }
      }
    }
  }
`
