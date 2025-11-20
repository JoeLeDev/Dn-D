"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useCart } from "../hooks/useCart"
import { Badge } from "@/components/ui/badge"

export function CartIndicator() {
  const { cart } = useCart()
  const [mounted, setMounted] = useState(false)

  // Éviter l'erreur d'hydratation en n'affichant le badge qu'après le montage côté client
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Link href="/cart" className="relative inline-block">
      <ShoppingCart className="h-5 w-5 animate-in fade-in duration-200 hover:opacity-80" />
      {mounted && cart.totalItems > 0 && (
        <Badge
          variant="destructive"
          className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
        >
          {cart.totalItems > 99 ? "99+" : cart.totalItems}
        </Badge>
      )}
    </Link>
  )
}

