# 🌍 Guide d'utilisation du système i18n

Ce projet utilise **next-intl** pour la gestion multilingue avec support FR/EN.

## 📁 Structure des fichiers

```
src/
├── i18n.ts                    # Configuration next-intl
├── i18n/
│   └── routing.ts            # Configuration des locales
├── locales/
│   ├── fr.json               # Traductions françaises
│   └── en.json               # Traductions anglaises
├── lib/
│   └── useTranslation.ts     # Hook personnalisé (optionnel)
└── components/
    └── LanguageSwitcher.tsx # Sélecteur de langue
```

## 🚀 Utilisation dans les composants

### Server Components (async)

```tsx
import { getTranslations } from "next-intl/server"

export default async function MyPage() {
  const t = await getTranslations("catalog")
  
  return <h1>{t("title")}</h1> // "Catalogue"
}
```

### Client Components

```tsx
"use client"

import { useTranslations } from "next-intl"

export function MyComponent() {
  const t = useTranslations("catalog")
  
  return <button>{t("addToCart")}</button> // "Ajouter au panier"
}
```

### Avec le hook personnalisé

```tsx
"use client"

import { useTranslation } from "@/lib/useTranslation"

export function MyComponent() {
  const t = useTranslation()
  
  return <h1>{t("catalog.title")}</h1>
}
```

## 🔄 Changer de langue

Le composant `LanguageSwitcher` est déjà intégré dans le Header. Il permet de basculer entre FR et EN.

## 🌐 Route API de traduction

### Endpoint : `/api/translate`

Traduit du texte dynamique via DeepL API.

**Requête :**
```typescript
const response = await fetch("/api/translate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    text: "Hello world",
    target: "FR" // ou "EN"
  })
})

const { text, detectedSourceLanguage } = await response.json()
console.log(text) // "Bonjour le monde"
```

**Configuration :**
1. Obtenez une clé API DeepL gratuite : https://www.deepl.com/fr/pro-api
2. Ajoutez-la dans `.env` :
   ```
   DEEPL_API_KEY=votre_cle_api
   ```

**⚠️ Note :** Cette route API est **optionnelle**. Elle n'est nécessaire que si vous voulez traduire du contenu dynamique en temps réel. L'application fonctionne parfaitement sans elle car toutes les traductions sont déjà dans les fichiers JSON.

## 📝 Ajouter des traductions

### 1. Ajouter une nouvelle clé dans `fr.json` :

```json
{
  "catalog": {
    "title": "Catalogue",
    "newKey": "Nouvelle traduction"
  }
}
```

### 2. Ajouter la même clé dans `en.json` :

```json
{
  "catalog": {
    "title": "Catalog",
    "newKey": "New translation"
  }
}
```

### 3. Utiliser dans votre composant :

```tsx
const t = useTranslations("catalog")
t("newKey") // "Nouvelle traduction" ou "New translation"
```

## 🔧 Scripts disponibles (optionnels)

**⚠️ IMPORTANT :** Ces scripts sont **optionnels**. L'application fonctionne parfaitement sans eux car toutes les traductions sont déjà présentes dans les fichiers JSON. Utilisez ces scripts uniquement si vous ajoutez de nouvelles données et souhaitez les traduire automatiquement.

### Générer les traductions automatiquement

```bash
# 1. Récupérer les données de l'API
npm run fetch-data

# 2. Générer la structure de traductions
npm run generate-translations

# 3. Traduire automatiquement avec DeepL (nécessite DEEPL_API_KEY)
export DEEPL_API_KEY=votre_cle
npm run translate-all
```

## 🎯 Exemples pratiques

### Traduction de catégories/produits dynamiques

Les catégories et produits sont stockés dans `categories`, `products`, et `descriptions` :

```tsx
"use client"

import { useTranslations } from "next-intl"

function encodeKey(key: string) {
  return key.replace(/\./g, "__DOT__")
}

export function ProductCard({ product }) {
  const t = useTranslations("products")
  const encodedKey = encodeKey(product.name)
  
  // Essayer la traduction, sinon utiliser le nom original
  const translatedName = t(encodedKey) || product.name
  
  return <h3>{translatedName}</h3>
}
```

## 📚 Structure des fichiers de traduction

Les fichiers JSON sont organisés par namespace :

- `common` : Traductions communes (boutons, labels, etc.)
- `catalog` : Catalogue et produits
- `cart` : Panier
- `navbar` : Navigation
- `product` : Pages produits
- `errors` : Messages d'erreur
- `categories` : Traductions des catégories (dynamiques)
- `products` : Traductions des produits (dynamiques)
- `descriptions` : Traductions des descriptions (dynamiques)
- `terms` : Termes techniques (dynamiques)

## ⚠️ Notes importantes

1. **Clés avec des points** : Les clés contenant `.` doivent être encodées avec `__DOT__` pour next-intl
2. **Server vs Client** : Utilisez `getTranslations` dans les Server Components et `useTranslations` dans les Client Components
3. **Middleware** : Le middleware redirige automatiquement vers la bonne locale dans l'URL (`/fr/...` ou `/en/...`)
4. **Fallback** : Si une traduction n'existe pas, next-intl retourne la clé elle-même

## 🔗 Ressources

- [Documentation next-intl](https://next-intl-docs.vercel.app/)
- [DeepL API](https://www.deepl.com/fr/pro-api)

