"use client"

import { useTranslations, useLocale } from "next-intl"
import { ErrorDisplay } from "@/components/errors/ErrorDisplay"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  const t = useTranslations("errors.notFound")
  const locale = useLocale()

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="max-w-md w-full">
        <ErrorDisplay title={t("title")} message={t("message")} />
        <div className="mt-4 flex justify-center">
          <Link href={`/${locale}`}>
            <Button variant="outline">
              <Home className="mr-2 h-4 w-4" />
              <span className="sr-only">Retour à l'accueil</span>
              Accueil
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

