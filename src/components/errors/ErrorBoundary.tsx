"use client"

import React, { Component, ReactNode } from "react"
import { ErrorDisplay } from "./ErrorDisplay"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex min-h-[400px] items-center justify-center p-6">
          <ErrorDisplay
            title="Une erreur inattendue est survenue"
            message="Nous nous excusons pour la gêne occasionnée. Veuillez rafraîchir la page ou réessayer plus tard."
            onRetry={() => {
              this.setState({ hasError: false, error: null })
              window.location.reload()
            }}
            retryLabel="Rafraîchir la page"
          />
        </div>
      )
    }

    return this.props.children
  }
}

