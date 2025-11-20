"use client"

import Link from "next/link"
import { Category } from "@/modules/catalog/types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingBag, Truck, Shield, Headphones } from "lucide-react"
import { translateCategory } from "@/lib/translations"
import { ImageWithFallback } from "@/components/ui/ImageWithFallback"

interface HomePageContentProps {
  categories: Category[]
}

export function HomePageContent({ categories }: HomePageContentProps) {
  return (
    <div className="space-y-12">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-800 w-full">
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Hero background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-slate-900/75 to-sky-950/85"></div>
        </div>

        {/* Content */}
        <div className="relative px-6 py-16 sm:px-12 sm:py-24 lg:px-16 lg:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl font-bold text-slate-50 sm:text-5xl lg:text-6xl leading-tight">
              Bienvenue sur{" "}
              <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
                Dn&apos;D Shop
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Découvrez notre sélection de produits de qualité. Parcourez nos catégories et trouvez
              exactement ce dont vous avez besoin pour tous vos projets.
            </p>

            <div className="flex justify-center pt-4">
              <Link href="/catalogue">
                <Button
                  size="lg"
                  className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-6 text-base"
                >
                  Découvrir le catalogue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-50">Nos catégories</h2>
          <Link
            href="/catalogue"
            className="text-sm text-sky-400 animate-in fade-in duration-200 hover:text-sky-300 flex items-center gap-1"
          >
            Voir tout <ArrowRight className="h-4 w-4 animate-in fade-in duration-200" />
          </Link>
        </div>

        {categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ShoppingBag className="mb-4 h-16 w-16 text-slate-600" />
            <h3 className="mb-2 text-lg font-semibold">Aucune catégorie disponible</h3>
            <p className="text-sm text-slate-400"> Les catégories seront bientôt disponibles.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/catalogue?category=${category.slug}`}>
                <Card className="group border-slate-800 bg-slate-900/60 p-6 animate-in fade-in duration-300 hover:animate-in hover:zoom-in-95 hover:bg-slate-900/80 hover:border-sky-500/50 cursor-pointer h-full flex flex-col">
                  <div className="flex-1 space-y-3">
                    <div className="w-12 h-12 rounded-lg bg-sky-500/10 flex items-center justify-center animate-in fade-in duration-200 group-hover:animate-in group-hover:zoom-in-105 group-hover:bg-sky-500/20">
                      <ShoppingBag className="h-6 w-6 text-sky-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-50 animate-in fade-in duration-200 group-hover:animate-in group-hover:fade-in group-hover:text-sky-400">
                      {translateCategory(category.name)}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-sky-400 mt-4 pt-4 border-t border-slate-800">
                    <span>Découvrir</span>
                    <ArrowRight className="h-4 w-4 animate-in fade-in duration-200 group-hover:animate-in group-hover:slide-in-from-left-1" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-slate-800 bg-slate-900/60 p-6 animate-in fade-in duration-300 hover:animate-in hover:zoom-in-95 hover:bg-slate-900/80 group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-lg bg-sky-500/10 flex items-center justify-center animate-in fade-in duration-200 group-hover:animate-in group-hover:zoom-in-105 group-hover:bg-sky-500/20">
              <Truck className="h-6 w-6 text-sky-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-50">Livraison rapide</h3>
              <p className="text-sm text-slate-400">
                Livraison express sur tous nos produits en stock. Recevez vos commandes en 24-48h.
              </p>
            </div>
          </div>
        </Card>
        <Card className="border-slate-800 bg-slate-900/60 p-6 animate-in fade-in duration-300 hover:animate-in hover:zoom-in-95 hover:bg-slate-900/80 group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-lg bg-sky-500/10 flex items-center justify-center animate-in fade-in duration-200 group-hover:animate-in group-hover:zoom-in-105 group-hover:bg-sky-500/20">
              <Shield className="h-6 w-6 text-sky-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-50">Paiement sécurisé</h3>
              <p className="text-sm text-slate-400">
                Transactions sécurisées avec les meilleurs moyens de paiement. Vos données sont
                protégées.
              </p>
            </div>
          </div>
        </Card>
        <Card className="border-slate-800 bg-slate-900/60 p-6 animate-in fade-in duration-300 hover:animate-in hover:zoom-in-95 hover:bg-slate-900/80 group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-lg bg-sky-500/10 flex items-center justify-center animate-in fade-in duration-200 group-hover:animate-in group-hover:zoom-in-105 group-hover:bg-sky-500/20">
              <Headphones className="h-6 w-6 text-sky-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-50">Service client</h3>
              <p className="text-sm text-slate-400">
                Une équipe à votre écoute pour répondre à toutes vos questions. Support 7j/7.
              </p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}
