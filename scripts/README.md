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

