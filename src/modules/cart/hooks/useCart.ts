"use client"

import { useCartContext } from "../context/CartContext"
import { Product } from "@/modules/catalog/types"
import { trackAddToCart, trackRemoveFromCart } from "@/lib/analytics"

export function useCart() {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useCartContext()

  const addProduct = (product: Product, quantity: number = 1) => {
    addToCart(product, quantity)
    trackAddToCart(product.id, product.name, quantity)
  }

  const removeProduct = (productId: string) => {
    const item = cart.items.find((item) => item.productId === productId)
    if (item) {
      trackRemoveFromCart(productId, item.product.name)
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

