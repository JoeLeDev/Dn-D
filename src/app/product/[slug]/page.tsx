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
      title: "Produit introuvable",
      description: "Le produit demandé n'existe pas ou n'est plus disponible.",
    }
  }

  const productName = product.name
  const productDescription = product.description.replace(/<[^>]*>/g, "").slice(0, 160)
  const productImage = product.thumbnail || product.gallery[0] || "/logo.png"

  return {
    title: productName,
    description: productDescription,
    keywords: [
      productName,
      ...(product.categories?.map((cat) => cat.name) || []),
      "produit",
      "achat",
    ],
    openGraph: {
      type: "website",
      title: productName,
      description: productDescription,
      images: [
        {
          url: productImage,
          width: 1200,
          height: 630,
          alt: productName,
        },
        ...product.gallery.slice(1, 4).map((img) => ({
          url: img,
          width: 1200,
          height: 630,
          alt: `${productName} - Vue supplémentaire`,
        })),
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: productName,
      description: productDescription,
      images: [productImage],
    },
    alternates: {
      canonical: `/product/${slug}`,
    },
    other: {
      "product:price:amount": product.price.toString(),
      "product:price:currency": product.currencyCode,
    },
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
