/**
 * Système de tracking simple pour les événements utilisateur
 * Peut être facilement remplacé par Google Analytics, Plausible, ou autre service
 */

type TrackingEvent =
  | "product_view"
  | "product_add_to_cart"
  | "product_remove_from_cart"
  | "cart_view"
  | "search"
  | "filter_category"
  | "filter_sort"
  | "page_view"

interface TrackingData {
  event: TrackingEvent
  [key: string]: unknown
}

/**
 * Envoie un événement de tracking
 * @param event Type d'événement
 * @param data Données supplémentaires de l'événement
 */
export function trackEvent(event: TrackingEvent, data?: Record<string, unknown>) {
  // En développement, on log simplement dans la console
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", event, data)
    return
  }

  // En production, on peut envoyer à un service de tracking
  // Exemple avec Google Analytics :
  // if (typeof window !== "undefined" && window.gtag) {
  //   window.gtag("event", event, data)
  // }

  // Exemple avec un endpoint personnalisé :
  // if (typeof window !== "undefined") {
  //   fetch("/api/track", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ event, data }),
  //   }).catch(() => {
  //     // Ignore les erreurs de tracking
  //   })
  // }
}

/**
 * Track une vue de page
 */
export function trackPageView(path: string) {
  trackEvent("page_view", { path })
}

/**
 * Track la visualisation d'un produit
 */
export function trackProductView(productId: string, productName: string) {
  trackEvent("product_view", { productId, productName })
}

/**
 * Track l'ajout d'un produit au panier
 */
export function trackAddToCart(productId: string, productName: string, quantity: number) {
  trackEvent("product_add_to_cart", { productId, productName, quantity })
}

/**
 * Track la suppression d'un produit du panier
 */
export function trackRemoveFromCart(productId: string, productName: string) {
  trackEvent("product_remove_from_cart", { productId, productName })
}

/**
 * Track une recherche
 */
export function trackSearch(searchTerm: string, resultsCount: number) {
  trackEvent("search", { searchTerm, resultsCount })
}

/**
 * Track un filtre par catégorie
 */
export function trackCategoryFilter(categorySlug: string) {
  trackEvent("filter_category", { categorySlug })
}

/**
 * Track un tri
 */
export function trackSort(sortType: "asc" | "desc" | "none") {
  trackEvent("filter_sort", { sortType })
}

