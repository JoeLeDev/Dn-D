"use client"

import Link from "next/link"
import { CartIndicator } from "@/modules/cart/components/CartIndicator"
import { usePathname } from "next/navigation"
import { ImageWithFallback } from "@/components/ui/ImageWithFallback"

export function Header() {
  const pathname = usePathname()

  return (
    <header className="mb-6 border-b border-slate-800 pb-4" role="banner">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-950 rounded"
          aria-label="Retour à la page d'accueil Dn'D Shop"
        >
          <ImageWithFallback
            src="/logo.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10"
            aria-hidden="true"
          />
          <div className="text-xl font-semibold">Dn&apos;D Shop</div>
        </Link>
        <nav
          className="flex items-center gap-6"
          role="navigation"
          aria-label="Navigation principale"
        >
          <Link
            href="/catalogue"
            className={`text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-950 rounded px-2 py-1 ${
              pathname === "/catalogue" ? "text-sky-400" : "text-slate-400 hover:text-slate-200"
            }`}
            aria-current={pathname === "/catalogue" ? "page" : undefined}
          >
            Catalogue
          </Link>

          <CartIndicator />
        </nav>
      </div>
    </header>
  )
}
