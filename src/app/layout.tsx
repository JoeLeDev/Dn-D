import type { Metadata } from "next"
import "./globals.css"
import { ReactNode } from "react"
import { ApolloProviderWrapper } from "@/modules/catalog/api/ApolloProviderWrapper"
import { Toaster } from "sonner"

export const metadata: Metadata = {
  title: "DnD Shop - Technical Test",
  description: "Product listing and detail pages built with Next.js and GraphQL",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-slate-950 text-slate-50">
        <ApolloProviderWrapper>
          <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6">
            <header className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h1 className="text-xl font-semibold">DnD Shop</h1>
                <p className="text-xs text-slate-400">
                  Technical test – Next.js, GraphQL, PLP & PDP
                </p>
              </div>
            </header>

            <main className="flex-1">{children}</main>

            <footer className="mt-8 border-t border-slate-800 pt-4 text-xs text-slate-500">
              Construit par Jonathan Luembe pour le test technique D&amp;D.
            </footer>
          </div>
        </ApolloProviderWrapper>
        <Toaster />
      </body>
    </html>
  )
}
