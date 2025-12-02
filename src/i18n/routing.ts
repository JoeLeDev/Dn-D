export const routing = {
  // Liste des langues supportées
  locales: ["fr", "en"] as const,

  // Langue par défaut
  defaultLocale: "fr" as const,

  // Toujours afficher le préfixe de locale dans l'URL
  localePrefix: "always" as const,
}

export type Locale = (typeof routing.locales)[number]

