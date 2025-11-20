"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ShoppingCart } from "lucide-react"
import { Product } from "../types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useCart } from "@/modules/cart/hooks/useCart"
import { convertAndFormatPrice } from "@/lib/currency"
import { translateProduct, translateProductDescription } from "@/lib/translations"
import { ImageWithFallback } from "@/components/ui/ImageWithFallback"

interface Props {
  product: Product
}

export function ProductCard({ product }: Props) {
  const searchParams = useSearchParams()
  const { addProduct } = useCart()
  // Préserver les query params lors de la navigation
  const queryString = searchParams.toString()
  const href = `/product/${product.slug}${queryString ? `?${queryString}` : ""}`

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addProduct(product, 1)
    toast.success(`${translateProduct(product.name)} ajouté au panier`)
  }

  const productName = translateProduct(product.name)

  return (
    <article className="group flex flex-col overflow-hidden border-slate-800 bg-slate-900/60">
      <Link
        href={href}
        className="flex flex-1 flex-col focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded"
        aria-label={`Voir les détails de ${productName}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-800">
          <ImageWithFallback
            src={product.thumbnail}
            alt={`Image de ${productName}`}
            fill
            sizes="(min-width: 1024px) 300px, 50vw"
            className="object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="line-clamp-2 text-sm font-medium text-slate-50">{productName}</h3>

          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold text-sky-300" aria-label="Prix">
              {convertAndFormatPrice(product.price, product.currencyCode)}
            </p>
          </div>

          <p className="text-xs text-slate-400" aria-label="Note et nombre d'avis">
            <span aria-hidden="true">⭐</span>{" "}
            {product.averageRating > 0 ? product.averageRating.toFixed(1) : "0.0"} •{" "}
            {product.reviewCount} {product.reviewCount <= 1 ? "avis" : "avis"}
          </p>

          <p className="mt-1 line-clamp-2 text-xs text-slate-400">
            {translateProductDescription(product.description)}
          </p>
        </div>
      </Link>

      <div className="p-4 pt-0">
        <Button
          size="sm"
          className="w-full bg-sky-400 hover:bg-sky-500 text-black focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900"
          onClick={handleAddToCart}
          onMouseDown={(e) => e.preventDefault()}
          aria-label={`Ajouter ${productName} au panier`}
        >
          <ShoppingCart className="mr-2 h-4 w-4" aria-hidden="true" />
          Ajouter au panier
        </Button>
      </div>
    </article>
  )
}
