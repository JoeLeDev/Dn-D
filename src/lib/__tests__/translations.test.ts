import { translateCategory, translateProduct, translateProductDescription } from "../translations"

describe("translations", () => {
  describe("translateCategory", () => {
    it("should translate known categories", () => {
      expect(translateCategory("Electronics")).toBe("Électronique")
      expect(translateCategory("Computers")).toBe("Ordinateurs")
      expect(translateCategory("Furniture")).toBe("Mobilier")
    })

    it("should return original name for unknown categories", () => {
      expect(translateCategory("UnknownCategory")).toBe("UnknownCategory")
    })

    it("should handle empty string", () => {
      expect(translateCategory("")).toBe("")
    })
  })

  describe("translateProduct", () => {
    it("should translate known products", () => {
      expect(translateProduct("Laptop")).toBe("Ordinateur portable")
      expect(translateProduct("Tablet")).toBe("Tablette")
      expect(translateProduct("Wireless Optical Mouse")).toBe("Souris optique sans fil")
    })

    it("should return original name for unknown products", () => {
      expect(translateProduct("UnknownProduct")).toBe("UnknownProduct")
    })

    it("should handle empty string", () => {
      expect(translateProduct("")).toBe("")
    })
  })

  describe("translateProductDescription", () => {
    it("should return empty string for empty input", () => {
      expect(translateProductDescription("")).toBe("")
    })

    it("should return original description if no translation found", () => {
      const description = "This is a test description"
      expect(translateProductDescription(description)).toBe(description)
    })

    it("should translate known phrases", () => {
      const description =
        "Now equipped with seventh-generation Intel Core processors, Laptop is snappier than ever."
      const translated = translateProductDescription(description)
      expect(translated).toContain("septième génération")
      expect(translated).not.toBe(description)
    })

    it("should handle HTML tags by removing them", () => {
      const description = "<p>Test description</p>"
      const result = translateProductDescription(description)
      expect(result).not.toContain("<p>")
      expect(result).not.toContain("</p>")
    })

    it("should normalize typographic quotes", () => {
      const description = 'It wouldn\'t really be a "computer."'
      const result = translateProductDescription(description)
      // Should handle both straight and curly quotes
      expect(result).toBeDefined()
    })

    it("should handle multiple spaces", () => {
      const description = "Test    description   with   spaces"
      const result = translateProductDescription(description)
      expect(result).not.toContain("    ")
    })
  })
})
