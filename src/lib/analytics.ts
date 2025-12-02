/**
 * Système de tracking pour Google Analytics 4 (GA4)
 * Suit les conventions GA4 pour les événements e-commerce
 */

// Types d'événements GA4 standardisés
type GA4Event =
  | "view_item" // Vue d'un produit
  | "add_to_cart" // Ajout au panier
  | "remove_from_cart" // Retrait du panier
  | "view_cart" // Vue du panier
  | "search" // Recherche
  | "page_view" // Vue de page
  | "view_item_list" // Vue de liste de produits

// Événements personnalisés (non e-commerce)
type CustomEvent = "filter_category" | "filter_sort"

type TrackingEvent = GA4Event | CustomEvent

// Structure d'un item e-commerce pour GA4
interface GA4Item {
  item_id: string
  item_name: string
  price?: number
  quantity?: number
  currency?: string
  item_category?: string
}

// Déclaration globale pour gtag
declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "js" | "set",
      targetId: string | Date,
      config?: Record<string, unknown>,
    ) => void
    dataLayer?: unknown[]
  }
}

/**
 * Envoie un événement de tracking à Google Analytics 4
 * @param event Type d'événement GA4
 * @param data Données supplémentaires de l'événement
 */
export function trackEvent(event: TrackingEvent, data?: Record<string, unknown>) {
  // En développement, on log simplement dans la console
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", event, data)
  }

  // Si Google Analytics est configuré, envoyer l'événement
  if (typeof window !== "undefined" && window.gtag && process.env.NEXT_PUBLIC_GA_ID) {
    window.gtag("event", event, {
      ...data,
      // Note: event_category n'est plus utilisé dans GA4 (c'était pour Universal Analytics)
    })
  }

  // Exemple avec un endpoint personnalisé (décommenter si besoin) :
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

  // Google Analytics nécessite un appel spécifique pour les vues de page
  if (typeof window !== "undefined" && window.gtag && process.env.NEXT_PUBLIC_GA_ID) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
      page_path: path,
    })
  }
}

/**
 * Track la visualisation d'un produit (GA4: view_item)
 * @param productId ID du produit
 * @param productName Nom du produit
 * @param price Prix du produit (optionnel)
 * @param currency Code devise (optionnel, défaut: EUR)
 */
export function trackProductView(
  productId: string,
  productName: string,
  price?: number,
  currency: string = "EUR",
) {
  const item: GA4Item = {
    item_id: productId,
    item_name: productName,
    ...(price !== undefined && { price, currency }),
  }

  trackEvent("view_item", {
    currency,
    value: price,
    items: [item],
  })
}

/**
 * Track l'ajout d'un produit au panier (GA4: add_to_cart)
 * @param productId ID du produit
 * @param productName Nom du produit
 * @param quantity Quantité ajoutée
 * @param price Prix du produit (optionnel)
 * @param currency Code devise (optionnel, défaut: EUR)
 */
export function trackAddToCart(
  productId: string,
  productName: string,
  quantity: number,
  price?: number,
  currency: string = "EUR",
) {
  const item: GA4Item = {
    item_id: productId,
    item_name: productName,
    quantity,
    ...(price !== undefined && { price, currency }),
  }

  trackEvent("add_to_cart", {
    currency,
    value: price ? price * quantity : undefined,
    items: [item],
  })
}

/**
 * Track la suppression d'un produit du panier (GA4: remove_from_cart)
 * @param productId ID du produit
 * @param productName Nom du produit
 * @param price Prix du produit (optionnel)
 * @param currency Code devise (optionnel, défaut: EUR)
 */
export function trackRemoveFromCart(
  productId: string,
  productName: string,
  price?: number,
  currency: string = "EUR",
) {
  const item: GA4Item = {
    item_id: productId,
    item_name: productName,
    ...(price !== undefined && { price, currency }),
  }

  trackEvent("remove_from_cart", {
    currency,
    value: price,
    items: [item],
  })
}

/**
 * Track la vue du panier (GA4: view_cart)
 * @param items Items dans le panier
 * @param totalValue Valeur totale du panier
 * @param currency Code devise (optionnel, défaut: EUR)
 */
export function trackCartView(
  items: Array<{ id: string; name: string; price?: number; quantity: number }>,
  totalValue?: number,
  currency: string = "EUR",
) {
  const ga4Items: GA4Item[] = items.map((item) => ({
    item_id: item.id,
    item_name: item.name,
    quantity: item.quantity,
    ...(item.price !== undefined && { price: item.price, currency }),
  }))

  trackEvent("view_cart", {
    currency,
    value: totalValue,
    items: ga4Items,
  })
}

/**
 * Track une recherche (GA4: search)
 * @param searchTerm Terme de recherche
 * @param resultsCount Nombre de résultats
 */
export function trackSearch(searchTerm: string, resultsCount: number) {
  trackEvent("search", {
    search_term: searchTerm,
    // GA4 utilise 'search_term' comme paramètre standard
  })
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

