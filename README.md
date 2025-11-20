# Dn'D Shop - Test Technique Frontend

Application e-commerce développée avec Next.js pour le test technique de l'agence Dn'D. Cette application permet d'afficher une liste de produits avec recherche et filtres, ainsi que des pages de détail produit.

## 🚀 Fonctionnalités

### Page de Liste Produits (PLP)
- ✅ Filtres par catégorie
- ✅ Tri par prix (croissant/décroissant)
- ✅ Recherche par nom de produit
- ✅ Affichage des produits avec :
  - Image du produit
  - Titre
  - Prix (converti en EUR)
  - Aperçu des reviews (note moyenne + nombre d'avis)
  - Bouton d'ajout au panier
  - Lien vers la page de détail

### Page de Détail Produit (PDP)
- ✅ Slideshow de visuels grand format
- ✅ Titre et SKU
- ✅ Aperçu des reviews
- ✅ Prix
- ✅ Champs quantité
- ✅ Bouton d'ajout au panier
- ✅ Description détaillée du produit
- ✅ Bouton retour au catalogue (avec préservation des filtres)

### Panier d'achat (Bonus)
- ✅ Affichage des articles
- ✅ Gestion des quantités
- ✅ Suppression d'articles
- ✅ Calcul du total en EUR
- ✅ Persistance dans le localStorage

### Page d'accueil(Bonus)
- ✅ Hero banner
- ✅ Grille de catégories
- ✅ Section de fonctionnalités

## 🛠️ Technologies utilisées

### Framework & Core
- **Next.js 16.0.3** (App Router) - Framework React avec SSR/SSG
- **React 19.2.0** - Bibliothèque UI
- **TypeScript 5** - Typage statique

### Styling
- **Tailwind CSS 3.4.17** - Framework CSS utility-first
- **tailwindcss-animate** - Plugin pour animations avancées (utilisé pour toutes les animations : fade-in, zoom-in, slide-in, etc.)
- **shadcn/ui** - Composants UI accessibles et personnalisables

### Data Fetching
- **GraphQL** - Requêtes via fetch natif (pas Apollo Client pour les Server Components)
- **@apollo/client** - Utilisé uniquement pour le wrapper (compatibilité)

### State Management
- **React Context API** - Pour le panier d'achat
- **URL Search Params** - Pour la persistance des filtres

### Autres
- **sonner** - Notifications toast
- **lucide-react** - Icônes
- **class-variance-authority** - Gestion des variantes de composants
- **Jest** - Framework de test
- **React Testing Library** - Tests de composants React

## 📁 Architecture du projet

Le projet suit une architecture modulaire inspirée de Clean Architecture :

```
src/
├── app/                    # Pages Next.js (App Router)
│   ├── page.tsx           # Page d'accueil
│   ├── catalogue/         # Page catalogue
│   ├── product/[slug]/   # Page détail produit
│   ├── cart/             # Page panier
│   ├── layout.tsx        # Layout principal
│   ├── Header.tsx        # Composant header
│   └── ...
│
├── modules/               # Modules métier
│   ├── catalog/          # Module catalogue
│   │   ├── api/          # Appels API GraphQL
│   │   ├── components/   # Composants catalogue
│   │   ├── hooks/        # Hooks personnalisés
│   │   └── types.ts      # Types TypeScript
│   │
│   └── cart/             # Module panier
│       ├── components/   # Composants panier
│       ├── context/      # Context API
│       ├── hooks/        # Hooks panier
│       └── types.ts      # Types TypeScript
│
├── components/            # Composants partagés
│   ├── ui/               # Composants UI de base
│   └── errors/           # Composants de gestion d'erreurs
│
└── lib/                  # Utilitaires
    ├── currency.ts       # Conversion de devises
    ├── translations.ts   # Traductions FR
    ├── analytics.ts       # Système de tracking
    ├── errors.ts         # Gestion d'erreurs
    └── utils.ts          # Utilitaires généraux
```

## 🎯 Choix techniques et justifications

### Next.js App Router
- **Pourquoi** : Meilleure performance avec Server Components, meilleur SEO, routing intégré
- **Avantages** : SSR/SSG natifs, optimisations automatiques, support TypeScript

### Architecture modulaire
- **Pourquoi** : Séparation des responsabilités, maintenabilité, réutilisabilité
- **Structure** : Chaque module contient ses propres composants, hooks, types et API

### Tailwind CSS
- **Pourquoi** : Développement rapide, cohérence du design, responsive facile
- **Avantages** : Pas de CSS custom, classes utilitaires, dark mode natif

### shadcn/ui
- **Pourquoi** : Composants accessibles, personnalisables, pas de dépendance lourde
- **Avantages** : Copie du code dans le projet, contrôle total, accessibilité WCAG

### Context API pour le panier
- **Pourquoi** : État global simple, pas besoin de Redux pour ce cas d'usage
- **Avantages** : Léger, intégré à React, persistance localStorage

### URL Search Params pour les filtres
- **Pourquoi** : Persistance des filtres lors de la navigation, partage d'URL
- **Avantages** : SEO friendly, UX améliorée, pas de state management complexe

### Fetch natif au lieu d'Apollo Client
- **Pourquoi** : Server Components ne peuvent pas utiliser des hooks React
- **Avantages** : Plus léger, meilleures performances, compatible SSR

### Traduction frontend
- **Pourquoi** : L'API retourne des données en anglais, traduction côté client
- **Implémentation** : Dictionnaire de traductions pour catégories, produits et descriptions

## 🚀 Installation

### Prérequis
- Node.js 20+ 
- npm, yarn, pnpm ou bun

### Étapes

1. **Cloner le repository**
```bash
git clone <repository-url>
cd dnd-frontend
```

2. **Installer les dépendances**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Configurer les variables d'environnement**

Créer un fichier `.env` à la racine du projet :

```env
NEXT_PUBLIC_GRAPHQL_URL=https://readonlydemo.vendure.io/shop-api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **Lancer le serveur de développement**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

5. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

## 📝 Scripts disponibles

```bash
# Développement
npm run dev          # Lance le serveur de développement

# Production
npm run build        # Build de production
npm run start        # Lance le serveur de production

# Qualité de code
npm run lint         # Vérifie le code avec ESLint
npm run lint:fix     # Corrige automatiquement les erreurs ESLint
npm run format       # Formate le code avec Prettier
npm run typecheck    # Vérifie les types TypeScript

# Tests
npm test             # Lance tous les tests
npm run test:watch   # Lance les tests en mode watch
npm run test:coverage # Lance les tests avec couverture
```

## 🔧 Configuration

### Variables d'environnement

- `NEXT_PUBLIC_GRAPHQL_URL` : URL de l'API GraphQL (requis)
- `NEXT_PUBLIC_SITE_URL` : URL du site pour le SEO (optionnel, défaut: localhost:3000)

### Next.js Config

Le fichier `next.config.ts` configure :
- Les images distantes autorisées (`readonlydemo.vendure.io`, `images.unsplash.com`)
- Le React Compiler

## 🎨 Fonctionnalités avancées

### SEO
- ✅ Métadonnées Open Graph et Twitter Cards
- ✅ Sitemap dynamique
- ✅ robots.txt
- ✅ URLs canoniques
- ✅ Métadonnées structurées par produit

### Accessibilité
- ✅ ARIA labels et roles
- ✅ Navigation au clavier
- ✅ Focus visible
- ✅ Structure sémantique HTML5
- ✅ Support des lecteurs d'écran

### Performances
- ✅ Lazy loading des images
- ✅ Images optimisées avec Next.js Image
- ✅ Server Components pour le SSR
- ✅ Code splitting automatique

### Gestion d'erreurs
- ✅ Error Boundaries
- ✅ Pages d'erreur personnalisées (404, 500)
- ✅ Composants d'affichage d'erreurs
- ✅ Logging des erreurs

### Internationalisation
- ✅ Traduction FR des catégories
- ✅ Traduction FR des noms de produits
- ✅ Traduction FR des descriptions

## 📊 Structure des données

### Produit (Product)
```typescript
interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: number
  currencyCode: string
  thumbnail: string
  averageRating: number
  reviewCount: number
  sku: string
  categories: Category[]
}
```

### Catégorie (Category)
```typescript
interface Category {
  id: string
  name: string
  slug: string
}
```

## 🧪 Tests

Le projet inclut une suite de tests unitaires complète utilisant Jest et React Testing Library.

### Outils de test

- **Jest** - Framework de test JavaScript/TypeScript
- **React Testing Library** - Bibliothèque pour tester les composants React
- **@testing-library/jest-dom** - Extensions Jest pour les assertions DOM
- **@testing-library/user-event** - Simulation d'interactions utilisateur

### Structure des tests

```
src/
├── lib/
│   └── __tests__/
│       ├── currency.test.ts          # Tests de conversion de devises
│       └── translations.test.ts      # Tests de traduction
│
├── modules/
│   ├── catalog/
│   │   ├── hooks/
│   │   │   └── __tests__/
│   │   │       └── useProductFilters.test.tsx  # Tests du hook de filtres
│   │   └── components/
│   │       └── __tests__/
│   │           └── ProductCard.test.tsx        # Tests du composant ProductCard
│   │
│   └── cart/
│       ├── context/
│       │   └── __tests__/
│       │       └── CartContext.test.tsx        # Tests du contexte panier
│       └── components/
│           └── __tests__/
│               └── CartContent.test.tsx        # Tests du composant panier
│
└── components/
    └── errors/
        └── __tests__/
            └── ErrorDisplay.test.tsx           # Tests du composant d'erreur
```

### Commandes de test

```bash
# Lancer tous les tests
npm test

# Lancer les tests en mode watch (re-exécute automatiquement)
npm run test:watch

# Lancer les tests avec couverture de code
npm run test:coverage
```

### Couverture des tests

Les tests couvrent :
- ✅ **Fonctions utilitaires** : Conversion de devises, traductions
- ✅ **Hooks personnalisés** : `useProductFilters`, `useCart`
- ✅ **Contextes React** : `CartContext` avec localStorage
- ✅ **Composants UI** : `ProductCard`, `ErrorDisplay`

### Exemple de test

```typescript
describe("convertToEUR", () => {
  it("should convert USD to EUR correctly", () => {
    expect(convertToEUR(10000, "USD")).toBe(9200)
  })
})
```

Pour plus d'informations sur les tests, consultez le fichier `TESTS_EXPLANATION.md`.

## 📊 Système de tracking

Un système de tracking simple a été implémenté pour suivre les interactions utilisateur.

### Événements trackés

- **Vues de pages** : Navigation entre les pages
- **Vues de produits** : Consultation d'une page produit
- **Ajout au panier** : Ajout d'un produit au panier
- **Suppression du panier** : Retrait d'un produit du panier
- **Vue du panier** : Consultation de la page panier
- **Recherche** : Recherche de produits avec nombre de résultats
- **Filtres** : Filtrage par catégorie et tri

### Implémentation

Le système de tracking est centralisé dans `src/lib/analytics.ts`. En développement, les événements sont loggés dans la console. En production, le code peut être facilement adapté pour envoyer les données à :
- Google Analytics
- Plausible Analytics
- Un endpoint API personnalisé
- Autre service de tracking

### Utilisation

```typescript
import { trackProductView, trackAddToCart } from "@/lib/analytics"

// Track une vue de produit
trackProductView(productId, productName)

// Track un ajout au panier
trackAddToCart(productId, productName, quantity)
```

## 🚧 Améliorations futures

Avec plus de temps, j'implémenterais :

1. **Tests**
   - ✅ Tests unitaires (Jest + React Testing Library) - **FAIT**
   - Tests d'intégration
   - Tests E2E (Playwright ou Cypress)

2. **Performance**
   - Optimisation Core Web Vitals
   - Cache des requêtes GraphQL
   - Pagination infinie ou lazy loading des produits

3. **Fonctionnalités**
   - ✅ Système de tracking simple - **FAIT**
   - Favoris/Wishlist
   - Comparaison de produits
   - Filtres avancés (prix, note, etc.)

4. **UX/UI**
   - Animations plus fluides
   - Skeleton loaders
   - Mode sombre/clair
   - Amélioration du responsive mobile

5. **Technique**
   - Internationalisation complète (i18n)
   - PWA (Progressive Web App)
   - Optimisation des images (WebP, AVIF)
   - Service Worker pour le cache

## 📄 Licence

Ce projet a été développé dans le cadre d'un test technique pour l'agence Dn'D.

## 👤 Auteur

**Jonathan Luembe**
- Développé pour le test technique Dn'D
- Agence Dn'D - 6 rue Germaine Richier 75013 Paris

## 🙏 Remerciements

- API GraphQL fournie par [Vendure Demo](https://readonlydemo.vendure.io)
- Composants UI par [shadcn/ui](https://ui.shadcn.com)
- Icônes par [Lucide](https://lucide.dev)
