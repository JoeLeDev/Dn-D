// src/modules/catalog/types.ts
export interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: number
  currencyCode: string
  thumbnail: string
  averageRating: number
  reviewCount: number
  sku: string
}
