import type { Metadata } from "next"
import "./globals.css"
import { routing } from "@/i18n/routing"

export const metadata: Metadata = {
  title: {
    default: "Dn'D Shop - Votre boutique en ligne",
    template: "%s | Dn'D Shop",
  },
  description:
    "Découvrez notre sélection de produits de qualité. Parcourez notre catalogue et trouvez exactement ce dont vous avez besoin pour tous vos projets.",
}

// Ce layout racine est minimal car le vrai layout est dans [locale]
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
