import { fetchProducts } from "@/modules/catalog/api/fetchProducts"
import { HomeContent } from "./HomeContent"

export default async function HomePage() {
  const products = await fetchProducts()

  return <HomeContent products={products} />
}
