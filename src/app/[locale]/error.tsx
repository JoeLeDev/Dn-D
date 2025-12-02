"use client"

import { useEffect } from "react"
import { ErrorDisplay } from "@/components/errors/ErrorDisplay"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations("errors.page")
  const locale = useLocale()

  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Page error:", error)
    }
  }, [error])

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="max-w-md w-full">
        <ErrorDisplay
          title={t("title")}
          message={t("message")}
          onRetry={reset}
          retryLabel={t("retry")}
        />
        <div className="mt-4 flex justify-center">
          <Link href={`/${locale}`}>
            <Button variant="outline">
              <Home className="mr-2 h-4 w-4" />
              {t("goHome")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

