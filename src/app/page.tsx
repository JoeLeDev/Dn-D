import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Catalogue produits</h2>
      <p className="text-sm text-slate-400">
        La liste des produits sera affichée ici depuis l&apos;API GraphQL.
      </p>
      <div className="mt-8 rounded-lg border border-dashed border-slate-700 p-6 text-sm text-slate-400">
        Placeholder PLP – prochain sprint : branchement GraphQL + cartes produit.
      </div>
    </section>
  )
}
