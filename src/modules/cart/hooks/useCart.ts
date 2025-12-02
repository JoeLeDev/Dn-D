"use client"

import { useCartContext } from "../context/CartContext"
import { Product } from "@/modules/catalog/types"
import { trackAddToCart, trackRemoveFromCart } from "@/lib/analytics"
import { convertToEUR } from "@/lib/currency"

export function useCart() {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useCartContext()

  const addProduct = (product: Product, quantity: number = 1) => {
    addToCart(product, quantity)
    const priceInEUR = convertToEUR(product.price, product.currencyCode)
    trackAddToCart(product.id, product.name, quantity, priceInEUR, "EUR")
  }

  const removeProduct = (productId: string) => {
    const item = cart.items.find((item) => item.productId === productId)
    if (item) {
      const priceInEUR = convertToEUR(item.product.price, item.product.currencyCode)
      trackRemoveFromCart(productId, item.product.name, priceInEUR, "EUR")
    }
    removeFromCart(productId)
  }

  const setQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity)
  }

  const isInCart = (productId: string) => {
    return cart.items.some((item) => item.productId === productId)
  }

  const getItemQuantity = (productId: string) => {
    const item = cart.items.find((item) => item.productId === productId)
    return item?.quantity ?? 0
  }

  return {
    cart,
    addProduct,
    removeProduct,
    setQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  }
}

