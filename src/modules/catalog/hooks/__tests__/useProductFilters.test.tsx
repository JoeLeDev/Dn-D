import { renderHook, act } from "@testing-library/react"
import { useProductFilters } from "../useProductFilters"
import { Product } from "../../types"

// Mock des hooks Next.js
const mockSearchParams = new URLSearchParams()
const mockRouter = {
  replace: jest.fn(),
}
const mockPathname = "/catalogue"

jest.mock("next/navigation", () => ({
  useSearchParams: () => mockSearchParams,
  useRouter: () => mockRouter,
  usePathname: () => mockPathname,
}))

describe("useProductFilters", () => {
  const mockProducts: Product[] = [
    {
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
      categories: [{ id: "cat1", name: "Computers", slug: "computers" }],
    },
    {
      id: "2",
      slug: "tablet",
      name: "Tablet",
      description: "A great tablet",
      price: 50000, // 500 EUR en centimes
      currencyCode: "EUR",
      thumbnail: "/tablet.jpg",
      averageRating: 4.0,
      reviewCount: 50,
      sku: "TAB001",
      categories: [{ id: "cat2", name: "Electronics", slug: "electronics" }],
    },
    {
      id: "3",
      slug: "mouse",
      name: "Wireless Mouse",
      description: "A wireless mouse",
      price: 30000, // 300 EUR en centimes
      currencyCode: "EUR",
      thumbnail: "/mouse.jpg",
      averageRating: 4.2,
      reviewCount: 75,
      sku: "MOU001",
      categories: [{ id: "cat1", name: "Computers", slug: "computers" }],
    },
  ]

  beforeEach(() => {
    mockSearchParams.delete("search")
    mockSearchParams.delete("category")
    mockSearchParams.delete("sort")
    mockRouter.replace.mockClear()
  })

  it("should return all products when no filters are applied", () => {
    const { result } = renderHook(() => useProductFilters(mockProducts))

    expect(result.current.filteredProducts).toHaveLength(3)
    expect(result.current.search).toBe("")
    expect(result.current.category).toBe("all")
    expect(result.current.sort).toBe("none")
  })

  it("should filter products by search term", () => {
    mockSearchParams.set("search", "Laptop")

    const { result } = renderHook(() => useProductFilters(mockProducts))

    expect(result.current.filteredProducts).toHaveLength(1)
    expect(result.current.filteredProducts[0].name).toBe("Laptop")
  })

  it("should filter products by category", () => {
    mockSearchParams.set("category", "computers")

    const { result } = renderHook(() => useProductFilters(mockProducts))

    expect(result.current.filteredProducts).toHaveLength(2)
    expect(result.current.filteredProducts.every((p) => p.categories.some((c) => c.slug === "computers"))).toBe(true)
  })

  it("should sort products by price ascending", () => {
    mockSearchParams.set("sort", "asc")

    const { result } = renderHook(() => useProductFilters(mockProducts))

    expect(result.current.filteredProducts[0].price).toBe(30000) // Le moins cher
    expect(result.current.filteredProducts[2].price).toBe(100000) // Le plus cher
  })

  it("should sort products by price descending", () => {
    mockSearchParams.set("sort", "desc")

    const { result } = renderHook(() => useProductFilters(mockProducts))

    expect(result.current.filteredProducts[0].price).toBe(100000) // Le plus cher
    expect(result.current.filteredProducts[2].price).toBe(30000) // Le moins cher
  })

  it("should combine search and category filters", () => {
    mockSearchParams.set("search", "Mouse")
    mockSearchParams.set("category", "computers")

    const { result } = renderHook(() => useProductFilters(mockProducts))

    expect(result.current.filteredProducts).toHaveLength(1)
    expect(result.current.filteredProducts[0].name).toBe("Wireless Mouse")
  })

  it("should update search filter", () => {
    const { result } = renderHook(() => useProductFilters(mockProducts))

    act(() => {
      result.current.setSearch("Tablet")
    })

    expect(mockRouter.replace).toHaveBeenCalledWith("/catalogue?search=Tablet", { scroll: false })
  })

  it("should update category filter", () => {
    const { result } = renderHook(() => useProductFilters(mockProducts))

    act(() => {
      result.current.setCategory("computers")
    })

    expect(mockRouter.replace).toHaveBeenCalledWith("/catalogue?category=computers", { scroll: false })
  })

  it("should remove category filter when set to 'all'", () => {
    mockSearchParams.set("category", "computers")
    const { result } = renderHook(() => useProductFilters(mockProducts))

    act(() => {
      result.current.setCategory("all")
    })

    expect(mockRouter.replace).toHaveBeenCalledWith("/catalogue", { scroll: false })
  })

  it("should update sort filter", () => {
    const { result } = renderHook(() => useProductFilters(mockProducts))

    act(() => {
      result.current.setSort("asc")
    })

    expect(mockRouter.replace).toHaveBeenCalledWith("/catalogue?sort=asc", { scroll: false })
  })

  it("should remove sort filter when set to 'none'", () => {
    mockSearchParams.set("sort", "asc")
    const { result } = renderHook(() => useProductFilters(mockProducts))

    act(() => {
      result.current.setSort("none")
    })

    expect(mockRouter.replace).toHaveBeenCalledWith("/catalogue", { scroll: false })
  })

  it("should handle case-insensitive search", () => {
    mockSearchParams.set("search", "laptop")

    const { result } = renderHook(() => useProductFilters(mockProducts))

    expect(result.current.filteredProducts).toHaveLength(1)
    expect(result.current.filteredProducts[0].name).toBe("Laptop")
  })
})

