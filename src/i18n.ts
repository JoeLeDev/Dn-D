import { getRequestConfig } from "next-intl/server"
import { routing } from "./i18n/routing"

export default getRequestConfig(async ({ requestLocale }) => {
  // Cette fonction sera appelée pour chaque requête
  // `requestLocale` est déterminé par le middleware
  let locale = await requestLocale

  // Assurez-vous qu'une locale valide est retournée
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default,
  }
})
