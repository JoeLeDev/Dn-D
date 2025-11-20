"use client"

import { useEffect } from "react"
import { ErrorDisplay } from "@/components/errors/ErrorDisplay"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
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
          title="Une erreur est survenue"
          message="Désolé, une erreur inattendue s'est produite. Veuillez réessayer ou retourner à la page d'accueil."
          onRetry={reset}
          retryLabel="Réessayer"
        />
        <div className="mt-4 flex justify-center">
          <Link href="/">
            <Button variant="outline">
              <Home className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

