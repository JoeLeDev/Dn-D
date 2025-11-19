import { fetchProducts } from "@/modules/catalog/api/fetchProducts"
import { ProductGrid } from "@/modules/catalog/components/ProductGrid"

export default async function HomePage() {
  const products = await fetchProducts()

  return (
    <section className="space-y-4">
      <div className="flex items-baseline justify-between gap-2">
        <div>
          <h2 className="text-2xl font-semibold">Catalogue produits</h2>
          <p className="text-sm text-slate-400">
            Liste de produits issue de l&apos;API GraphQL Vendure demo.
          </p>
        </div>
        <p className="text-xs text-slate-500">{products.length} produits</p>
      </div>

      {/* Filtres / recherche viendront ici dans le Sprint 3 */}

      <ProductGrid products={products} />
    </section>
  )
}
