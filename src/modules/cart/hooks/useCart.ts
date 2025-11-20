"use client"

import { useCartContext } from "../context/CartContext"
import { Product } from "@/modules/catalog/types"

export function useCart() {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useCartContext()

  const addProduct = (product: Product, quantity: number = 1) => {
    addToCart(product, quantity)
  }

  const removeProduct = (productId: string) => {
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

