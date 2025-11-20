/**
 * Taux de change vers EUR (approximatifs, à jour de janvier 2024)
 * Les prix sont stockés en centimes dans l'API
 */
const EXCHANGE_RATES: Record<string, number> = {
  EUR: 1.0,
  USD: 0.92, // 1 USD = 0.92 EUR
  GBP: 1.17, // 1 GBP = 1.17 EUR
  CHF: 1.05, // 1 CHF = 1.05 EUR
  JPY: 0.0067, // 1 JPY = 0.0067 EUR
}

/**
 * Convertit un prix (en centimes) d'une devise vers EUR
 * @param priceInCents Prix en centimes dans la devise d'origine
 * @param fromCurrency Code devise d'origine (USD, EUR, etc.)
 * @returns Prix en centimes EUR
 */
export function convertToEUR(priceInCents: number, fromCurrency: string): number {
  const rate = EXCHANGE_RATES[fromCurrency.toUpperCase()] ?? 1.0
  return Math.round(priceInCents * rate)
}

/**
 * Formate un prix en centimes EUR en string avec le symbole €
 * @param priceInCents Prix en centimes EUR
 * @returns String formatée (ex: "12.34 €")
 */
export function formatPriceEUR(priceInCents: number): string {
  return `${(priceInCents / 100).toFixed(2)} €`
}

/**
 * Convertit et formate un prix d'une devise vers EUR
 * @param priceInCents Prix en centimes dans la devise d'origine
 * @param fromCurrency Code devise d'origine
 * @returns String formatée (ex: "12.34 €")
 */
export function convertAndFormatPrice(priceInCents: number, fromCurrency: string): string {
  const priceInEUR = convertToEUR(priceInCents, fromCurrency)
  return formatPriceEUR(priceInEUR)
}

