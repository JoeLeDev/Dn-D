import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-slate-400">404</h1>
          <h2 className="text-2xl font-semibold text-slate-200">Page introuvable</h2>
          <p className="text-slate-400 max-w-md">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button>
              <Home className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Button>
          </Link>
          <Link href="/catalogue">
            <Button variant="outline">
              <Search className="mr-2 h-4 w-4" />
              Voir le catalogue
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

