import { render, screen } from "@testing-library/react"
import { ErrorDisplay } from "../ErrorDisplay"

describe("ErrorDisplay", () => {
  it("should render default title and message", () => {
    render(<ErrorDisplay />)

    expect(screen.getByText("Une erreur est survenue")).toBeInTheDocument()
    expect(screen.getByText(/Désolé, nous n'avons pas pu charger les données/i)).toBeInTheDocument()
  })

  it("should render custom title and message", () => {
    render(
      <ErrorDisplay title="Erreur de chargement" message="Impossible de charger les données" />,
    )

    expect(screen.getByText("Erreur de chargement")).toBeInTheDocument()
    expect(screen.getByText("Impossible de charger les données")).toBeInTheDocument()
  })

  it("should render alert icon", () => {
    const { container } = render(<ErrorDisplay />)

    // L'icône AlertCircle devrait être présente (c'est un SVG avec aria-hidden)
    const icon = container.querySelector("svg.lucide-circle-alert")
    expect(icon).toBeInTheDocument()
  })
})
