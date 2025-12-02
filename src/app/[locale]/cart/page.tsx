import { CartContent } from "@/modules/cart/components/CartContent"
import { getTranslations } from "next-intl/server"

export default async function CartPage() {
  const t = await getTranslations("cart")

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">{t("title")}</h2>
      <CartContent />
    </section>
  )
}

