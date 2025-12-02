"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import { useCart } from "../hooks/useCart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"
import { convertAndFormatPrice, convertToEUR } from "@/lib/currency"
import { useProductTranslation } from "@/lib/translations-client"
import { useLocale } from "next-intl"
import { ImageWithFallback } from "@/components/ui/ImageWithFallback"
import { trackCartView } from "@/lib/analytics"

export function CartContent() {
  const { cart, setQuantity, removeProduct, clearCart } = useCart()
  const translateProduct = useProductTranslation()
  const locale = useLocale()

  // Track cart view
  useEffect(() => {
    const items = cart.items.map((item) => ({
      id: item.product.id,
      name: item.product.name,
      price: convertToEUR(item.product.price, item.product.currencyCode),
      quantity: item.quantity,
    }))
    trackCartView(items, cart.totalPrice, "EUR")
  }, [cart.items, cart.totalPrice])

  if (cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <ShoppingBag className="mb-4 h-16 w-16 text-slate-600" />
        <h3 className="mb-2 text-lg font-semibold">Votre panier est vide</h3>
        <p className="mb-6 text-sm text-slate-400">
          Parcourez notre catalogue et ajoutez des produits à votre panier.
        </p>
        <Link href={`/${locale}/catalogue`}>
          <Button>Retour au catalogue</Button>
        </Link>
      </div>
    )
  }

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeProduct(productId)
      toast.success("Article supprimé du panier")
      return
    }
    setQuantity(productId, newQuantity)
  }

  const handleRemove = (productId: string, productName: string) => {
    removeProduct(productId)
    toast.success(`${productName} supprimé du panier`)
  }

  const handleClearCart = () => {
    clearCart()
    toast.success("Panier vidé")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm ">
          {cart.totalItems} {cart.totalItems <= 1 ? "article" : "articles"}
        </p>
        <Button
          size="sm"
          onClick={handleClearCart}
          className="w-full sm:w-auto bg-sky-400 hover:bg-sky-500 text-black"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Vider le panier</span>
          <span className="sm:hidden">Vider</span>
        </Button>
      </div>

      <div className="space-y-4">
        {cart.items.map((item) => {
          // Convertir le prix en EUR avant de calculer le total
          const priceInEUR = convertToEUR(item.product.price, item.product.currencyCode)
          const itemTotal = (priceInEUR * item.quantity) / 100
          return (
            <Card key={item.productId} className="border-slate-800 bg-slate-900/60 p-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href={`/${locale}/product/${item.product.slug}`}
                  className="relative h-32 w-full flex-shrink-0 overflow-hidden rounded-md bg-slate-800 sm:h-24 sm:w-24"
                >
                  <ImageWithFallback
                    src={item.product.thumbnail}
                    alt={translateProduct(item.product.name)}
                    fill
                    sizes="(max-width: 640px) 100vw, 96px"
                    className="object-cover"
                    loading="lazy"
                  />
                </Link>

                <div className="flex flex-1 flex-col gap-3 sm:gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/${locale}/product/${item.product.slug}`}
                        className="text-sm font-medium text-slate-50 hover:text-sky-400 line-clamp-2"
                      >
                        {translateProduct(item.product.name)}
                      </Link>
                      <p className="mt-1 text-xs text-slate-400">
                        {convertAndFormatPrice(item.product.price, item.product.currencyCode)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleRemove(item.productId, translateProduct(item.product.name))
                      }
                      className="text-slate-400 hover:text-red-400 flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                        className="h-8 w-8 p-0 bg-sky-400 hover:bg-sky-500 text-black"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => {
                          const value = Number.parseInt(e.target.value, 10)
                          if (!Number.isNaN(value) && value >= 1) {
                            handleQuantityChange(item.productId, value)
                          }
                        }}
                        className="h-8 w-16 text-center text-white"
                      />
                      <Button
                        size="sm"
                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                        className="h-8 w-8 p-0 bg-sky-400 hover:bg-sky-500 text-black"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <p className="text-base font-semibold text-sky-300 sm:text-sm">
                      {itemTotal.toFixed(2)} €
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <Card className="border-slate-800 bg-slate-900/60 p-4 sm:p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Sous-total</span>
            <span className="text-sky-300">{(cart.totalPrice / 100).toFixed(2)} €</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Nombre d&apos;articles</span>
            <span className="text-slate-50">{cart.totalItems}</span>
          </div>
          <div className="border-t border-slate-800 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-xl font-bold text-sky-300">
                {(cart.totalPrice / 100).toFixed(2)} €
              </span>
            </div>
          </div>
          <Button size="lg" className="w-full" disabled>
            <span className="hidden sm:inline">Passer la commande (Avec Stripe ou PayPal)</span>
            <span className="sm:hidden">Passer la commande</span>
          </Button>
          <Link href={`/${locale}/catalogue`}>
            <Button className="w-full bg-sky-400 hover:bg-sky-500 text-black">
              Continuer les achats
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
