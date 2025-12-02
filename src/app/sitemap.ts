import { MetadataRoute } from "next"
import { fetchProducts } from "@/modules/catalog/api/fetchProducts"
import { routing } from "@/i18n/routing"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

  // Pages statiques pour chaque locale
  const staticPages: MetadataRoute.Sitemap = []
  
  for (const locale of routing.locales) {
    staticPages.push(
      {
        url: `${baseUrl}/${locale}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: `${baseUrl}/${locale}/catalogue`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/${locale}/cart`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      }
    )
  }

  // Pages produits dynamiques pour chaque locale
  try {
    const products = await fetchProducts()
    const productPages: MetadataRoute.Sitemap = []
    
    for (const locale of routing.locales) {
      for (const product of products) {
        productPages.push({
          url: `${baseUrl}/${locale}/product/${product.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        })
      }
    }

    return [...staticPages, ...productPages]
  } catch (error) {
    console.error("Error generating sitemap:", error)
    // Retourner au moins les pages statiques en cas d'erreur
    return staticPages
  }
}
