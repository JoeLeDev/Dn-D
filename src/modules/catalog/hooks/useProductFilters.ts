"use client"

import { useMemo, type SetStateAction } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Product } from "../types"

export function useProductFilters(products: Product[]) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Lire directement depuis l'URL
  const search = searchParams.get("search") || ""
  const category = searchParams.get("category") || "all"
  const sort = (searchParams.get("sort") as "asc" | "desc" | "none") || "none"

  // Fonction helper pour mettre à jour l'URL en restant sur la page actuelle
  const updateUrl = (params: URLSearchParams) => {
    const queryString = params.toString()
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname
    router.replace(newUrl, { scroll: false })
  }

  // Fonctions pour mettre à jour l'URL (compatibles avec Dispatch<SetStateAction<T>>)
  const setSearch = (value: SetStateAction<string>) => {
    const newValue = typeof value === "function" ? value(search) : value
    const params = new URLSearchParams(searchParams.toString())
    if (newValue) {
      params.set("search", newValue)
    } else {
      params.delete("search")
    }
    updateUrl(params)
  }

  const setCategory = (value: SetStateAction<string>) => {
    const newValue = typeof value === "function" ? value(category) : value
    const params = new URLSearchParams(searchParams.toString())
    if (newValue !== "all") {
      params.set("category", newValue)
    } else {
      params.delete("category")
    }
    updateUrl(params)
  }

  const setSort = (value: SetStateAction<"asc" | "desc" | "none">) => {
    const newValue = typeof value === "function" ? value(sort) : value
    const params = new URLSearchParams(searchParams.toString())
    if (newValue !== "none") {
      params.set("sort", newValue)
    } else {
      params.delete("sort")
    }
    updateUrl(params)
  }

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Recherche
    if (search.trim()) {
      const term = search.toLowerCase()
      result = result.filter((p) => p.name.toLowerCase().includes(term))
    }

    // Catégorie - filtrer par slug de collection
    if (category !== "all") {
      result = result.filter((p) => p.categories.some((cat) => cat.slug === category))
    }

    // Tri - créer un nouveau tableau trié pour éviter les mutations
    if (sort === "asc") {
      result = [...result].sort((a, b) => a.price - b.price)
    } else if (sort === "desc") {
      result = [...result].sort((a, b) => b.price - a.price)
    }
    // Si sort === "none", on ne fait rien

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
