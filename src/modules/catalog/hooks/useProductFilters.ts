"use client"

import { useMemo, useState } from "react"
import { Product } from "../types"

export function useProductFilters(products: Product[]) {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [sort, setSort] = useState<"asc" | "desc" | "none">("none")

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Recherche
    if (search.trim()) {
      const term = search.toLowerCase()
      result = result.filter((p) => p.name.toLowerCase().includes(term))
    }

    // Catégorie (à adapter après le setup des categories)
    if (category !== "all") {
      result = result.filter((p) => p.description.toLowerCase().includes(category.toLowerCase()))
    }

    // Tri
    if (sort === "asc") {
      result.sort((a, b) => a.price - b.price)
    }
    if (sort === "desc") {
      result.sort((a, b) => b.price - a.price)
    }

    return result
  }, [search, category, sort, products])

  return {
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort,
    filteredProducts,
  }
}
