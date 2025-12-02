"use client"

import { useRouter, usePathname } from "next/navigation"
import { Globe } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { routing } from "@/i18n/routing"

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()

  // Extraire la locale directement depuis le pathname pour qu'elle se mette à jour automatiquement
  const currentLocale = pathname.split("/")[1] || routing.defaultLocale
  const locale = routing.locales.includes(currentLocale as any) ? currentLocale : routing.defaultLocale

  const handleLanguageChange = (newLocale: string) => {
    // Ne rien faire si la locale est déjà la même
    if (newLocale === locale) {
      return
    }

    // Extraire le chemin sans la locale
    // Le pathname peut être /fr/catalogue ou /en/catalogue
    // On doit retirer le premier segment s'il correspond à une locale valide
    let pathWithoutLocale = pathname
    
    // Retirer toutes les locales possibles du début du pathname
    for (const loc of routing.locales) {
      if (pathname.startsWith(`/${loc}/`)) {
        pathWithoutLocale = pathname.slice(`/${loc}`.length)
        break
      } else if (pathname === `/${loc}`) {
        pathWithoutLocale = "/"
        break
      }
    }

    // S'assurer qu'on a au moins "/"
    if (!pathWithoutLocale || pathWithoutLocale === "") {
      pathWithoutLocale = "/"
    }

    // Construire le nouveau pathname avec la nouvelle locale
    const newPath = `/${newLocale}${pathWithoutLocale}`

    // Rediriger vers la nouvelle URL
    router.push(newPath)
    router.refresh()
  }

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-slate-400" />
      <Select value={locale} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[100px] border-slate-700 bg-slate-900/60">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {routing.locales.map((loc) => (
            <SelectItem key={loc} value={loc}>
              {loc.toUpperCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

