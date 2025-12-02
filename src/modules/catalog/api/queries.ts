import { gql } from "@apollo/client"

export const GET_PRODUCTS = gql`
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
      totalItems
    }
  }
`
export const GET_PRODUCT_BY_SLUG = gql`
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
`
