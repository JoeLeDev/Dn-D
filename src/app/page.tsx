import { fetchCategories } from "@/modules/catalog/api/fetchCategories"
import { fetchProducts } from "@/modules/catalog/api/fetchProducts"
import { HomePageContent } from "./HomePageContent"
import { ErrorDisplay } from "@/components/errors/ErrorDisplay"
import { formatErrorMessage, logError } from "@/lib/errors"

async function getHomePageData() {
  try {
    const [categories, products] = await Promise.all([fetchCategories(), fetchProducts()])
    return { categories, products, error: null }
  } catch (error) {
    logError(error, "HomePage")
    return { categories: [], products: [], error }
  }
}

export default async function HomePage() {
  const { categories, products, error } = await getHomePageData()

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <ErrorDisplay title="Erreur de chargement" message={formatErrorMessage(error)} />
      </div>
    )
  }

  // Filtrer pour n'afficher que les catégories qui ont au moins un produit
  const productCategorySlugs = new Set(products.flatMap((p) => p.categories.map((c) => c.slug)))
  const availableCategories = categories.filter((cat) => productCategorySlugs.has(cat.slug))

  return <HomePageContent categories={availableCategories} />
}
