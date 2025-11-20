"use client"

import { useEffect, useState } from "react"
import { ProductGrid } from "@/modules/catalog/components/ProductGrid"
import { ProductFilters } from "@/modules/catalog/components/ProductFilters"
import { useProductFilters } from "@/modules/catalog/hooks/useProductFilters"
import { Product, Category } from "@/modules/catalog/types"
import { fetchCategories } from "@/modules/catalog/api/fetchCategories"

interface HomeContentProps {
  products: Product[]
}

export function HomeContent({ products }: HomeContentProps) {
  const { search, setSearch, category, setCategory, sort, setSort, filteredProducts } =
    useProductFilters(products)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetchCategories().then((allCategories) => {
      // Filtrer pour n'afficher que les catégories qui ont au moins un produit
      const productCategorySlugs = new Set(products.flatMap((p) => p.categories.map((c) => c.slug)))
      const availableCategories = allCategories.filter((cat) => productCategorySlugs.has(cat.slug))
      setCategories(availableCategories)
    })
  }, [products])

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
        categories={categories}
        sort={sort}
        setSort={setSort}
      />

      <ProductGrid products={filteredProducts} />
    </section>
  )
}
