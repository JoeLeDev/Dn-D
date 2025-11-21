import type { Metadata } from "next"
import "./globals.css"
import { ReactNode } from "react"
import { ApolloProviderWrapper } from "@/modules/catalog/api/ApolloProviderWrapper"
import { CartProvider } from "@/modules/cart/context/CartContext"
import { Header } from "./Header"
import { Toaster } from "sonner"
import { ErrorBoundary } from "@/components/errors/ErrorBoundary"
import { PageViewTracker } from "@/components/analytics/PageViewTracker"
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics"

export const metadata: Metadata = {
  title: {
    default: "Dn'D Shop - Votre boutique en ligne",
    template: "%s | Dn'D Shop",
  },
  description:
    "Découvrez notre sélection de produits de qualité. Parcourez notre catalogue et trouvez exactement ce dont vous avez besoin pour tous vos projets.",
  keywords: ["boutique en ligne", "e-commerce", "produits", "catalogue", "achat en ligne"],
  authors: [{ name: "Jonathan Luembe" }],
  creator: "Jonathan Luembe",
  publisher: "Dn'D",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Dn'D Shop",
    title: "Dn'D Shop - Votre boutique en ligne",
    description:
      "Découvrez notre sélection de produits de qualité. Parcourez notre catalogue et trouvez exactement ce dont vous avez besoin.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Dn'D Shop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dn'D Shop - Votre boutique en ligne",
    description:
      "Découvrez notre sélection de produits de qualité. Parcourez notre catalogue et trouvez exactement ce dont vous avez besoin.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
      <html lang="fr">
        <body className="min-h-screen bg-slate-950 text-slate-50">
          <GoogleAnalytics />
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
        </body>
      </html>
  )
}
