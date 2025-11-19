"use client"

import Link from "next/link"
import Image from "next/image"
import { Product } from "../types"
import { Card } from "@/components/ui/card"

interface Props {
  product: Product
}

export function ProductCard({ product }: Props) {
  return (
    <Card className="group flex flex-col overflow-hidden border-slate-800 bg-slate-900/60">
      <Link href={`/product/${product.slug}`} className="flex flex-1 flex-col">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-800">
          <Image
            src={product.thumbnail}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 300px, 50vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="line-clamp-2 text-sm font-medium">{product.name}</h3>

          <p className="text-lg font-semibold">
            {(product.price / 100).toFixed(2)} {product.currencyCode}
          </p>

          {product.reviewCount > 0 && (
            <p className="text-xs text-slate-400">
              ⭐ {product.averageRating.toFixed(1)} • {product.reviewCount} avis
            </p>
          )}

          <p className="mt-1 line-clamp-2 text-xs text-slate-400">
            {product.description.replace(/<[^>]*>/g, "")}
          </p>
        </div>
      </Link>
    </Card>
  )
}
