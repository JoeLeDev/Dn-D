import { render, screen } from "@testing-library/react"
import { ProductCard } from "../ProductCard"
import { Product } from "../../types"
import { CartProvider } from "@/modules/cart/context/CartContext"

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}))

// Mock sonner
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
  },
}))

// Mock translations
jest.mock("@/lib/translations", () => ({
  translateProduct: (name: string) => name,
  translateProductDescription: (desc: string) => desc,
}))

const mockProduct: Product = {
  id: "1",
  slug: "laptop",
  name: "Laptop",
  description: "A great laptop for work",
  price: 100000, // 1000 EUR
  currencyCode: "EUR",
  thumbnail: "/laptop.jpg",
  averageRating: 4.5,
  reviewCount: 100,
  sku: "LAP001",
  categories: [],
}

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
)

describe("ProductCard", () => {
  it("should render product name", () => {
    render(<ProductCard product={mockProduct} />, { wrapper })

    expect(screen.getByText("Laptop")).toBeInTheDocument()
  })

  it("should render product price", () => {
    render(<ProductCard product={mockProduct} />, { wrapper })

    expect(screen.getByText("1000.00 €")).toBeInTheDocument()
  })

  it("should render product rating and review count", () => {
    render(<ProductCard product={mockProduct} />, { wrapper })

    expect(screen.getByText(/4.5/)).toBeInTheDocument()
    expect(screen.getByText(/100 avis/)).toBeInTheDocument()
  })

  it("should render add to cart button", () => {
    const { container } = render(<ProductCard product={mockProduct} />, { wrapper })

    // Vérifier que le bouton existe avec le texte
    const buttonText = screen.getByText(/ajouter au panier/i)
    expect(buttonText).toBeInTheDocument()
    
    // Vérifier que c'est bien un bouton
    const buttonElement = container.querySelector("button")
    expect(buttonElement).toBeInTheDocument()
  })

  it("should have correct link to product detail page", () => {
    render(<ProductCard product={mockProduct} />, { wrapper })

    const link = screen.getByRole("link", { name: /voir les détails de/i })
    expect(link).toHaveAttribute("href", "/product/laptop")
  })

  it("should display product description", () => {
    render(<ProductCard product={mockProduct} />, { wrapper })

    expect(screen.getByText(/A great laptop for work/i)).toBeInTheDocument()
  })
})

