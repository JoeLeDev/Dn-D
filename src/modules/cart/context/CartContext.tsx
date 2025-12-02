"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
  useEffect,
} from "react"
import { Cart, CartItem } from "../types"
import { Product } from "@/modules/catalog/types"
import { convertToEUR } from "@/lib/currency"
import { logError } from "@/lib/errors"

interface CartContextType {
  cart: Cart
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = "dn&apos;d-cart"

function loadCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") {
    return []
  }
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (savedCart) {
      const parsed = JSON.parse(savedCart) as CartItem[]
      // Valider que les données sont valides
      if (Array.isArray(parsed)) {
        return parsed.filter((item) => item.productId && item.product && item.quantity > 0)
      }
    }
  } catch (error) {
    logError(error, "loadCartFromStorage")
    // En cas d'erreur, on nettoie le localStorage corrompu
    try {
      localStorage.removeItem(CART_STORAGE_KEY)
    } catch {
      // Ignore si on ne peut pas supprimer
    }
  }
  return []
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCartFromStorage)

  // Sauvegarder le panier dans localStorage à chaque changement
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
      } catch (error) {
        logError(error, "CartContext - Save to localStorage")
        if (error instanceof DOMException && error.name === "QuotaExceededError") {
          logError(
            new Error("Le panier ne peut pas être sauvegardé : espace de stockage insuffisant"),
            "CartContext - localStorage full",
          )
        }
      }
    }
  }, [items])

  const cart = useMemo<Cart>(() => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
    // Convertir tous les prix en EUR avant de calculer le total
    const totalPrice = items.reduce((sum, item) => {
      const priceInEUR = convertToEUR(item.product.price, item.product.currencyCode)
      return sum + priceInEUR * item.quantity
    }, 0)

    return {
      items,
      totalItems,
      totalPrice,
    }
  }, [items])

  const addToCart = useCallback((product: Product, quantity: number) => {
    if (!product || !product.id) {
      logError(new Error("Invalid product provided to addToCart"), "CartContext")
      return
    }

    if (quantity <= 0 || !Number.isInteger(quantity)) {
      logError(new Error(`Invalid quantity: ${quantity}`), "CartContext")
      return
    }

    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.productId === product.id)

      if (existingItem) {
        // Si le produit existe déjà, on augmente la quantité
        return prevItems.map((item) =>
          item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }

      // Sinon, on ajoute un nouvel article
      return [...prevItems, { productId: product.id, product, quantity }]
    })
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.productId !== productId))
  }, [])

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (!productId) {
        logError(new Error("Invalid productId provided to updateQuantity"), "CartContext")
        return
      }

      if (quantity <= 0 || !Number.isInteger(quantity)) {
        removeFromCart(productId)
        return
      }

      setItems((prevItems) =>
        prevItems.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
      )
    },
    [removeFromCart],
  )

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider")
  }
  return context
}
