"use client"

import { ProductGrid } from "@/modules/catalog/components/ProductGrid"
import { ProductFilters } from "@/modules/catalog/components/ProductFilters"
import { useProductFilters } from "@/modules/catalog/hooks/useProductFilters"
import { Product } from "@/modules/catalog/types"

interface HomeContentProps {
  products: Product[]
}

export function HomeContent({ products }: HomeContentProps) {
  const { search, setSearch, category, setCategory, sort, setSort, filteredProducts } =
    useProductFilters(products)

  return (
    <section className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-semibold">Catalogue produits</h2>
        <p className="text-xs text-slate-500">{filteredProducts.length} résultats</p>
      </div>

      <ProductFilters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />

      <ProductGrid products={filteredProducts} />
    </section>
  )
}

