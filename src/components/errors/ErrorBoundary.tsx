"use client"

import React, { Component, ReactNode } from "react"
import { ErrorDisplay } from "./ErrorDisplay"
import { logError } from "@/lib/errors"

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
    logError(error, `ErrorBoundary - ${errorInfo.componentStack}`)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex min-h-screen items-center justify-center p-6">
          <div className="max-w-md w-full">
            <ErrorDisplay
              title="Une erreur est survenue"
              message={
                this.state.error?.message ||
                "Désolé, une erreur inattendue s'est produite. Veuillez réessayer."
              }
              onRetry={this.handleReset}
              retryLabel="Réessayer"
            />
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
