"use client"

import { Dispatch, SetStateAction } from "react"
import { useTranslations } from "next-intl"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Category } from "../types"
import { useCategoryTranslation } from "@/lib/translations-client"

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
  const t = useTranslations("catalog")
  const tCommon = useTranslations("common")
  const translateCategory = useCategoryTranslation()

  return (
    <div
      className="flex flex-col gap-4 sm:flex-row sm:items-center"
      role="search"
      aria-label="Filtres de recherche produits"
    >
      <label htmlFor="product-search" className="sr-only">
        {tCommon("search")}
      </label>
      <Input
        id="product-search"
        type="text"
        placeholder={t("searchPlaceholder")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1"
        aria-label={tCommon("search")}
      />

      <label htmlFor="category-filter" className="sr-only">
        {tCommon("filter")}
      </label>
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger
          id="category-filter"
          className="w-full sm:w-[180px]"
          aria-label={tCommon("filter")}
        >
          <SelectValue placeholder={tCommon("category")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{tCommon("allCategories")}</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.slug}>
              {translateCategory(cat.name)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <label htmlFor="sort-filter" className="sr-only">
        {tCommon("sort")}
      </label>
      <Select value={sort} onValueChange={(value) => setSort(value as "asc" | "desc" | "none")}>
        <SelectTrigger
          id="sort-filter"
          className="w-full sm:w-[180px]"
          aria-label={tCommon("sort")}
        >
          <SelectValue placeholder={tCommon("sort")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">{t("sortNone")}</SelectItem>
          <SelectItem value="asc">{t("sortAsc")}</SelectItem>
          <SelectItem value="desc">{t("sortDesc")}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
