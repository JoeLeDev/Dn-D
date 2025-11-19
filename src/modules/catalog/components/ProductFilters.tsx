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

interface ProductFiltersProps {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  category: string
  setCategory: Dispatch<SetStateAction<string>>
  sort: "asc" | "desc" | "none"
  setSort: Dispatch<SetStateAction<"asc" | "desc" | "none">>
}

export function ProductFilters({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <Input
        type="text"
        placeholder="Rechercher un produit..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1"
      />

      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Catégorie" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les catégories</SelectItem>
          {/* Ajouter d'autres catégories ici plus tard */}
        </SelectContent>
      </Select>

      <Select value={sort} onValueChange={setSort}>
        <SelectTrigger className="w-full sm:w-[180px]">
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

