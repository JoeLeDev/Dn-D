"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { ProductDetail } from "../types"
import { ProductGallery } from "./ProductGallery"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useCart } from "@/modules/cart/hooks/useCart"
import { convertAndFormatPrice } from "@/lib/currency"
import { translateProduct, translateProductDescription } from "@/lib/translations"
import { trackProductView } from "@/lib/analytics"

interface ProductDetailClientProps {
  product: ProductDetail
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1)
  const searchParams = useSearchParams()
  const { addProduct } = useCart()
  // Préserver les query params pour le retour au catalogue
  const queryString = searchParams.toString()
  const backUrl = `/catalogue${queryString ? `?${queryString}` : ""}`

  const productName = translateProduct(product.name)

  // Track product view
  useEffect(() => {
    trackProductView(product.id, productName)
  }, [product.id, productName])

  const handleAddToCart = () => {
    addProduct(product, quantity)
    toast.success(`${quantity} × ${productName} ajouté au panier`)
  }

  return (
    <div className="space-y-6">
      <Link href={backUrl}>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-black bg-sky-400 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-950"
          aria-label="Retour au catalogue"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Retour au catalogue
        </Button>
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.2fr,1fr]">
        <ProductGallery images={product.gallery} alt={productName} />

        <div className="space-y-6 rounded-lg border border-slate-800 bg-slate-900/40 p-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">{productName}</h1>
            {product.sku && (
              <p className="text-xs uppercase tracking-wide text-slate-500">
                <span className="sr-only">Code SKU :</span>SKU : {product.sku}
              </p>
            )}

            <div className="flex items-center gap-3 text-sm text-slate-400">
              <span className="text-xl font-semibold text-sky-300" aria-label="Prix">
                {convertAndFormatPrice(product.price, product.currencyCode)}
              </span>

              {product.reviewCount > 0 && (
                <span
                  aria-label={`Note : ${product.averageRating.toFixed(1)} sur 5, ${product.reviewCount} avis`}
                >
                  <span aria-hidden="true">⭐</span> {product.averageRating.toFixed(1)} •{" "}
                  {product.reviewCount} avis
                </span>
              )}
            </div>
          </div>

          <section className="space-y-2 text-sm text-slate-300" aria-labelledby="description-heading">
            <h2
              id="description-heading"
              className="text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              Description
            </h2>
            <p className="text-sm leading-relaxed">
              {translateProductDescription(product.description)}
            </p>
          </section>

          <section className="space-y-3" aria-labelledby="quantity-heading">
            <h2
              id="quantity-heading"
              className="text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              Quantité
            </h2>
            <div className="flex items-center gap-3">
              <label htmlFor="product-quantity" className="sr-only">
                Quantité à ajouter au panier
              </label>
              <Input
                id="product-quantity"
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => {
                  const value = Number(e.target.value)
                  if (Number.isNaN(value) || value < 1) return
                  setQuantity(value)
                }}
                className="w-20"
                aria-label="Quantité"
              />
              <Button
                size="lg"
                onClick={handleAddToCart}
                className="bg-sky-400 hover:bg-sky-500 text-black focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                aria-label={`Ajouter ${quantity} ${productName} au panier`}
              >
                Ajouter au panier
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
