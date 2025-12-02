import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import { ReactNode } from "react"
import { ApolloProviderWrapper } from "@/modules/catalog/api/ApolloProviderWrapper"
import { CartProvider } from "@/modules/cart/context/CartContext"
import { Header } from "../Header"
import { Toaster } from "sonner"
import { ErrorBoundary } from "@/components/errors/ErrorBoundary"
import { PageViewTracker } from "@/components/analytics/PageViewTracker"
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics"

interface LocaleLayoutProps {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  // Vérifier que la locale est valide
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  // Passer explicitement la locale pour charger les bonnes traductions
  const messages = await getMessages({ locale })

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-slate-950 text-slate-50">
        <GoogleAnalytics />
        <NextIntlClientProvider messages={messages}>
          <ErrorBoundary>
            <ApolloProviderWrapper>
              <CartProvider>
                <PageViewTracker />
                <div className="mx-auto flex min-h-screen w-[80vw] flex-col px-4 py-6">
                  <Header />
                  <main className="flex-1 w-full" role="main" id="main-content">
                    {children}
                  </main>
                  <footer
                    className="mt-8 border-t border-slate-800 pt-4 text-xs text-slate-500"
                    role="contentinfo"
                  >
                    Construit par Jonathan Luembe pour le test technique D&amp;D.
                  </footer>
                </div>
              </CartProvider>
            </ApolloProviderWrapper>
            <Toaster />
          </ErrorBoundary>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

