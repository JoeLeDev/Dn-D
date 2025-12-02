/**
 * Types d'erreurs personnalisées pour l'application
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

export class NetworkError extends Error {
  constructor(
    message: string = "Erreur de connexion réseau",
    public originalError?: unknown,
  ) {
    super(message)
    this.name = "NetworkError"
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ValidationError"
  }
}

/**
 * Formate un message d'erreur pour l'affichage utilisateur
 */
export function formatErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.statusCode === 404) {
      return "La ressource demandée est introuvable."
    }
    if (error.statusCode === 500) {
      return "Une erreur serveur est survenue. Veuillez réessayer plus tard."
    }
    if (error.statusCode === 503) {
      return "Le service est temporairement indisponible. Veuillez réessayer plus tard."
    }
    return error.message || "Une erreur est survenue lors de la récupération des données."
  }

  if (error instanceof NetworkError) {
    return "Impossible de se connecter au serveur. Vérifiez votre connexion internet."
  }

  if (error instanceof ValidationError) {
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return "Une erreur inattendue est survenue."
}

/**
 * Log une erreur de manière sécurisée
 */
export function logError(error: unknown, context?: string) {
  if (process.env.NODE_ENV === "development") {
    console.error(`[Error${context ? ` - ${context}` : ""}]`, error)
  }
  // En production, vous pourriez envoyer l'erreur à un service de logging
  // comme Sentry, LogRocket, etc.
}
