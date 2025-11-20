import { CartContent } from "@/modules/cart/components/CartContent"

export default function CartPage() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Panier</h2>
      <CartContent />
    </section>
  )
}

