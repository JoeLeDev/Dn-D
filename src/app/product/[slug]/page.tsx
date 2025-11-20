import { notFound } from "next/navigation"
import { fetchProductBySlug } from "@/modules/catalog/api/fetchProductBySlug"
import { ProductDetailClient } from "@/modules/catalog/components/ProductDetailClient"
import type { Metadata } from "next"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await fetchProductBySlug(slug)

  if (!product) {
    return {
      title: "Produit introuvable | DnD Shop",
    }
  }

  return {
    title: `${product.name} | DnD Shop`,
    description: product.description.slice(0, 150),
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await fetchProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <section className="space-y-6">
      <ProductDetailClient product={product} />
    </section>
  )
}
