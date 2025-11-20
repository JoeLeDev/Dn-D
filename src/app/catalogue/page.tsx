import { fetchProducts } from "@/modules/catalog/api/fetchProducts"
import { HomeContent } from "../HomeContent"
import { ErrorDisplay } from "@/components/errors/ErrorDisplay"
import { formatErrorMessage, logError } from "@/lib/errors"

async function getCatalogueData() {
  try {
    const products = await fetchProducts()
    return { products, error: null }
  } catch (error) {
    logError(error, "CataloguePage")
    return { products: [], error }
  }
}

export default async function CataloguePage() {
  const { products, error } = await getCatalogueData()

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <ErrorDisplay
          title="Erreur de chargement du catalogue"
          message={formatErrorMessage(error)}
        />
      </div>
    )
  }

  return <HomeContent products={products} />
}

