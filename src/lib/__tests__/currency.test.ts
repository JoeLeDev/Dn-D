import { convertToEUR, formatPriceEUR, convertAndFormatPrice } from "../currency"

describe("currency", () => {
  describe("convertToEUR", () => {
    it("should convert USD to EUR correctly", () => {
      // 100 USD = 92 EUR (100 * 0.92)
      expect(convertToEUR(10000, "USD")).toBe(9200)
    })

    it("should convert GBP to EUR correctly", () => {
      // 100 GBP = 117 EUR (100 * 1.17)
      expect(convertToEUR(10000, "GBP")).toBe(11700)
    })

    it("should return the same value for EUR", () => {
      expect(convertToEUR(10000, "EUR")).toBe(10000)
    })

    it("should handle unknown currency by defaulting to EUR rate", () => {
      expect(convertToEUR(10000, "UNKNOWN")).toBe(10000)
    })

    it("should handle case-insensitive currency codes", () => {
      expect(convertToEUR(10000, "usd")).toBe(9200)
      expect(convertToEUR(10000, "UsD")).toBe(9200)
    })

    it("should round the result correctly", () => {
      // 100.5 USD = 92.46 EUR, rounded to 9246
      expect(convertToEUR(10050, "USD")).toBe(9246)
    })
  })

  describe("formatPriceEUR", () => {
    it("should format price in cents to EUR string", () => {
      expect(formatPriceEUR(1234)).toBe("12.34 €")
    })

    it("should format price with two decimals", () => {
      expect(formatPriceEUR(100)).toBe("1.00 €")
      expect(formatPriceEUR(1000)).toBe("10.00 €")
    })

    it("should handle zero price", () => {
      expect(formatPriceEUR(0)).toBe("0.00 €")
    })

    it("should handle large prices", () => {
      expect(formatPriceEUR(12345678)).toBe("123456.78 €")
    })
  })

  describe("convertAndFormatPrice", () => {
    it("should convert USD and format to EUR", () => {
      // 100 USD = 92 EUR = "0.92 €"
      expect(convertAndFormatPrice(100, "USD")).toBe("0.92 €")
    })

    it("should convert GBP and format to EUR", () => {
      // 100 GBP = 117 EUR = "1.17 €"
      expect(convertAndFormatPrice(100, "GBP")).toBe("1.17 €")
    })

    it("should handle EUR directly", () => {
      expect(convertAndFormatPrice(1234, "EUR")).toBe("12.34 €")
    })

    it("should handle zero price", () => {
      expect(convertAndFormatPrice(0, "USD")).toBe("0.00 €")
    })
  })
})

