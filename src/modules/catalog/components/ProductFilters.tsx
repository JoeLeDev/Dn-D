"use client"

import { Dispatch, SetStateAction } from "react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Category } from "../types"
import { translateCategory } from "@/lib/translations"

interface ProductFiltersProps {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  category: string
  setCategory: Dispatch<SetStateAction<string>>
  categories: Category[]
  sort: "asc" | "desc" | "none"
  setSort: Dispatch<SetStateAction<"asc" | "desc" | "none">>
}

export function ProductFilters({
  search,
  setSearch,
  category,
  setCategory,
  categories,
  sort,
  setSort,
}: ProductFiltersProps) {
  return (
    <div
      className="flex flex-col gap-4 sm:flex-row sm:items-center"
      role="search"
      aria-label="Filtres de recherche produits"
    >
      <label htmlFor="product-search" className="sr-only">
        Rechercher un produit
      </label>
      <Input
        id="product-search"
        type="text"
        placeholder="Rechercher un produit..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1"
        aria-label="Rechercher un produit"
      />

      <label htmlFor="category-filter" className="sr-only">
        Filtrer par catégorie
      </label>
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger
          id="category-filter"
          className="w-full sm:w-[180px]"
          aria-label="Filtrer par catégorie"
        >
          <SelectValue placeholder="Catégorie" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les catégories</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.slug}>
              {translateCategory(cat.name)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <label htmlFor="sort-filter" className="sr-only">
        Trier les produits
      </label>
      <Select
        value={sort}
        onValueChange={(value) => setSort(value as "asc" | "desc" | "none")}
      >
        <SelectTrigger
          id="sort-filter"
          className="w-full sm:w-[180px]"
          aria-label="Trier les produits"
        >
          <SelectValue placeholder="Trier par" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">Aucun tri</SelectItem>
          <SelectItem value="asc">Prix croissant</SelectItem>
          <SelectItem value="desc">Prix décroissant</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

