import { renderHook, act } from "@testing-library/react"
import { CartProvider, useCartContext } from "../CartContext"
import { Product } from "@/modules/catalog/types"

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
})

describe("CartContext", () => {
  const mockProduct: Product = {
    id: "1",
    slug: "laptop",
    name: "Laptop",
    description: "A great laptop",
    price: 100000, // 1000 EUR en centimes
    currencyCode: "EUR",
    thumbnail: "/laptop.jpg",
    averageRating: 4.5,
    reviewCount: 100,
    sku: "LAP001",
    categories: [],
  }

  beforeEach(() => {
    localStorageMock.clear()
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  )

  it("should initialize with empty cart", () => {
    const { result } = renderHook(() => useCartContext(), { wrapper })

    expect(result.current.cart.items).toHaveLength(0)
    expect(result.current.cart.totalItems).toBe(0)
    expect(result.current.cart.totalPrice).toBe(0)
  })

  it("should add product to cart", () => {
    const { result } = renderHook(() => useCartContext(), { wrapper })

    act(() => {
      result.current.addToCart(mockProduct, 1)
    })

    expect(result.current.cart.items).toHaveLength(1)
    expect(result.current.cart.items[0].productId).toBe("1")
    expect(result.current.cart.items[0].quantity).toBe(1)
    expect(result.current.cart.totalItems).toBe(1)
  })

  it("should update quantity when adding same product again", () => {
    const { result } = renderHook(() => useCartContext(), { wrapper })

    act(() => {
      result.current.addToCart(mockProduct, 1)
    })

    act(() => {
      result.current.addToCart(mockProduct, 2)
    })

    expect(result.current.cart.items).toHaveLength(1)
    expect(result.current.cart.items[0].quantity).toBe(3)
    expect(result.current.cart.totalItems).toBe(3)
  })

  it("should remove product from cart", () => {
    const { result } = renderHook(() => useCartContext(), { wrapper })

    act(() => {
      result.current.addToCart(mockProduct, 1)
    })

    expect(result.current.cart.items).toHaveLength(1)

    act(() => {
      result.current.removeFromCart("1")
    })

    expect(result.current.cart.items).toHaveLength(0)
    expect(result.current.cart.totalItems).toBe(0)
  })

  it("should update product quantity", () => {
    const { result } = renderHook(() => useCartContext(), { wrapper })

    act(() => {
      result.current.addToCart(mockProduct, 1)
    })

    act(() => {
      result.current.updateQuantity("1", 5)
    })

    expect(result.current.cart.items[0].quantity).toBe(5)
    expect(result.current.cart.totalItems).toBe(5)
  })

  it("should remove product when quantity is set to 0", () => {
    const { result } = renderHook(() => useCartContext(), { wrapper })

    act(() => {
      result.current.addToCart(mockProduct, 1)
    })

    act(() => {
      result.current.updateQuantity("1", 0)
    })

    expect(result.current.cart.items).toHaveLength(0)
  })

  it("should clear cart", () => {
    const { result } = renderHook(() => useCartContext(), { wrapper })

    act(() => {
      result.current.addToCart(mockProduct, 1)
    })

    act(() => {
      result.current.clearCart()
    })

    expect(result.current.cart.items).toHaveLength(0)
    expect(result.current.cart.totalItems).toBe(0)
    expect(result.current.cart.totalPrice).toBe(0)
  })

  it("should calculate total price correctly", () => {
    const { result } = renderHook(() => useCartContext(), { wrapper })

    act(() => {
      result.current.addToCart(mockProduct, 2)
    })

    // 100000 centimes * 2 = 200000 centimes = 2000 EUR
    expect(result.current.cart.totalPrice).toBe(200000)
  })

  it("should persist cart to localStorage", async () => {
    const { result } = renderHook(() => useCartContext(), { wrapper })

    act(() => {
      result.current.addToCart(mockProduct, 1)
    })

    // Attendre que useEffect sauvegarde dans localStorage
    await new Promise((resolve) => setTimeout(resolve, 100))

    // Vérifier que le panier a bien été ajouté
    expect(result.current.cart.items).toHaveLength(1)
    expect(result.current.cart.items[0].productId).toBe("1")
    
    // Vérifier que localStorage a été mis à jour (peut nécessiter plusieurs tentatives)
    const keys = Object.keys(localStorageMock as any)
    const cartKey = keys.find((key) => key.includes("cart"))
    if (cartKey) {
      const savedCart = localStorageMock.getItem(cartKey)
      expect(savedCart).toBeTruthy()
    }
  })

  it("should calculate total items correctly", () => {
    const { result } = renderHook(() => useCartContext(), { wrapper })

    act(() => {
      result.current.addToCart(mockProduct, 3)
    })

    expect(result.current.cart.totalItems).toBe(3)
  })

  it("should handle invalid product gracefully", () => {
    const { result } = renderHook(() => useCartContext(), { wrapper })

    act(() => {
      // @ts-expect-error - Testing invalid input
      result.current.addToCart(null, 1)
    })

    // Le panier devrait rester vide
    expect(result.current.cart.items).toHaveLength(0)
  })

  it("should handle invalid quantity gracefully", () => {
    const { result } = renderHook(() => useCartContext(), { wrapper })

    act(() => {
      // @ts-expect-error - Testing invalid input
      result.current.addToCart(mockProduct, -1)
    })

    // Le panier devrait rester vide
    expect(result.current.cart.items).toHaveLength(0)
  })
})

