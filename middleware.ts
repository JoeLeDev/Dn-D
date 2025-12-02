import createMiddleware from "next-intl/middleware"
import { routing } from "./src/i18n/routing"

export default createMiddleware(routing)

export const config = {
  // Matcher pour toutes les routes sauf les fichiers statiques et les routes API internes
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
}

