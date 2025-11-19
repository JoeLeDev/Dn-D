import { Product } from "../types"
import { ProductCard } from "./ProductCard"

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (!products.length) {
    return (
      <p className="mt-6 text-sm text-slate-400">
        Aucun produit trouvé. Veuillez vérifier la connexion à l&apos;API.
      </p>
    )
  }

  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
