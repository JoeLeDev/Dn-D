"use client"

import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface ErrorDisplayProps {
  title?: string
  message?: string
  onRetry?: () => void
  retryLabel?: string
}

export function ErrorDisplay({
  title = "Une erreur est survenue",
  message = "Désolé, nous n'avons pas pu charger les données. Veuillez réessayer.",
  onRetry,
  retryLabel = "Réessayer",
}: ErrorDisplayProps) {
  return (
    <Card className="border-red-500/50 bg-red-950/20 p-6">
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <AlertCircle className="h-12 w-12 text-red-400" />
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-red-400">{title}</h3>
          <p className="text-sm text-slate-400 max-w-md">{message}</p>
        </div>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" className="mt-4">
            <RefreshCw className="mr-2 h-4 w-4" />
            {retryLabel}
          </Button>
        )}
      </div>
    </Card>
  )
}
