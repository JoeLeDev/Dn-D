# Scripts utilitaires

## fetch-all-data.js

Script pour récupérer toutes les données de l'API Vendure et les sauvegarder dans des fichiers JSON.

### Utilisation

```bash
# Avec npm
npm run fetch-data

# Ou directement avec Node.js
node scripts/fetch-all-data.js
```

### Prérequis

- Node.js 18+ (pour le support natif de `fetch`)
- Variable d'environnement `NEXT_PUBLIC_GRAPHQL_URL` (optionnelle, utilise l'URL par défaut si non définie)

### Fichiers générés

Le script crée un dossier `data/` à la racine du projet avec les fichiers suivants :

- **categories.json** : Toutes les catégories (collections) de l'API
- **products.json** : Tous les produits avec leurs informations de base
- **product-details.json** : Détails complets de chaque produit (peut prendre du temps)
- **summary.json** : Récapitulatif avec métadonnées et statistiques

### Exemple de structure

```
dnd-frontend/
├── data/
│   ├── categories.json
│   ├── products.json
│   ├── product-details.json
│   └── summary.json
└── scripts/
    └── fetch-all-data.js
```

### Notes

- Le script récupère les données par lots pour éviter de surcharger l'API
- Un délai de 100ms est ajouté entre chaque requête de détails de produit
- Les fichiers JSON sont formatés avec une indentation de 2 espaces pour faciliter la lecture
- Le dossier `data/` est ignoré par Git (dans `.gitignore`)

## generate-translations.js

Script pour générer automatiquement la structure de traductions à partir des fichiers JSON du dossier `data/`.

### Utilisation

```bash
npm run generate-translations
```

Ce script :
- Extrait toutes les catégories, produits et descriptions des fichiers JSON
- Ajoute les nouvelles entrées dans `src/locales/fr.json` (avec leur nom/description originale)
- Encode automatiquement les clés avec des points (`.`) en `__DOT__` pour compatibilité avec next-intl

**Note :** 
- Ce script ajoute seulement les nouvelles entrées sans les traduire
- Utilisez `translate-all` pour traduire automatiquement (nécessite `DEEPL_API_KEY`)
- **Ces scripts sont optionnels** : l'application fonctionne sans eux car toutes les traductions sont déjà dans les fichiers JSON

## auto-translate-all.js

Script pour traduire **automatiquement** toutes les nouvelles données en utilisant **DeepL API** (API professionnelle de traduction).

**⚠️ IMPORTANT :** Ce script est **optionnel**. L'application fonctionne parfaitement sans lui car toutes les traductions sont déjà présentes dans les fichiers JSON (`src/locales/fr.json` et `src/locales/en.json`). Utilisez ce script uniquement si vous ajoutez de nouvelles données et souhaitez les traduire automatiquement.

### Utilisation

```bash
# 1. Obtenir une clé API (voir ci-dessous)
# 2. Définir la clé API
export DEEPL_API_KEY=votre_cle_api

# 3. Lancer la traduction automatique
npm run translate-all
```

### Obtenir une clé API DeepL

1. Allez sur https://www.deepl.com/fr/pro-api
2. Créez un compte (gratuit jusqu'à 500K caractères/mois)
3. Copiez votre clé API depuis le tableau de bord
4. Définissez-la : `export DEEPL_API_KEY=votre_cle_api`

### Workflow complet

```bash
# 1. Récupérer les nouvelles données de l'API
npm run fetch-data

# 2. Générer la structure de traductions (ajoute les nouvelles entrées)
npm run generate-translations

# 3. Traduire automatiquement toutes les nouvelles données
export DEEPL_API_KEY=votre_cle_api
npm run translate-all
```

### Notes

- ✅ **100% automatique** : Aucune intervention manuelle nécessaire
- ✅ **Gratuit** : DeepL API gratuite jusqu'à 500K caractères/mois
- ✅ **Qualité professionnelle** : Traductions de haute qualité
- ✅ **Retry automatique** : Réessaie automatiquement en cas d'erreur
- ⏱️  **Temps** : Peut prendre plusieurs minutes selon le nombre d'éléments à traduire
