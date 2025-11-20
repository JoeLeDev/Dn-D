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
  categories: { id: string; name: string; slug: string }[]
}

export interface Category {
  id: string
  name: string
  slug: string
  }
  
  export interface ProductDetail extends Product {
    gallery: string[]
    descriptionHtml: string
  }
  