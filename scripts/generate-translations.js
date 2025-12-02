const fs = require("fs")
const path = require("path")

const DATA_DIR = path.join(__dirname, "../data")
const LOCALES_DIR = path.join(__dirname, "../src/locales")
const FR_JSON_PATH = path.join(LOCALES_DIR, "fr.json")

// Charger les données
const categories = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "categories.json"), "utf-8"))
const products = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "products.json"), "utf-8"))

// Charger les traductions existantes
let translations = {}
if (fs.existsSync(FR_JSON_PATH)) {
  translations = JSON.parse(fs.readFileSync(FR_JSON_PATH, "utf-8"))
} else {
  translations = {
    common: {},
    errors: {},
    categories: {},
    products: {},
    descriptions: {},
    terms: {},
  }
}

// Initialiser les sections si elles n'existent pas
if (!translations.categories) translations.categories = {}
if (!translations.products) translations.products = {}
if (!translations.descriptions) translations.descriptions = {}

// Extraire toutes les catégories uniques
const allCategories = new Set()
categories.forEach((cat) => {
  if (cat.name && cat.name.trim()) {
    allCategories.add(cat.name.trim())
  }
})

// Extraire tous les produits uniques
const allProducts = new Set()
products.forEach((product) => {
  if (product.name && product.name.trim()) {
    allProducts.add(product.name.trim())
  }
})

// Extraire toutes les descriptions uniques
const allDescriptions = new Set()
products.forEach((product) => {
  if (product.description && product.description.trim()) {
    // Nettoyer le HTML
    const cleanDescription = product.description
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim()
    if (cleanDescription) {
      allDescriptions.add(cleanDescription)
    }
  }
})

// Fonction pour encoder les clés (remplacer les points par __DOT__)
function encodeKey(key) {
  return key.replace(/\./g, "__DOT__")
}

// Ajouter les catégories manquantes
let categoriesAdded = 0
allCategories.forEach((categoryName) => {
  const encodedKey = encodeKey(categoryName)
  if (!translations.categories[encodedKey]) {
    translations.categories[encodedKey] = categoryName // Par défaut, garder le nom original
    categoriesAdded++
  }
})

// Ajouter les produits manquants
let productsAdded = 0
allProducts.forEach((productName) => {
  const encodedKey = encodeKey(productName)
  if (!translations.products[encodedKey]) {
    translations.products[encodedKey] = productName // Par défaut, garder le nom original
    productsAdded++
  }
})

// Ajouter les descriptions manquantes
let descriptionsAdded = 0
allDescriptions.forEach((description) => {
  // Normaliser les guillemets
  const normalizedDescription = description
    .replace(/\u2018/g, "'")
    .replace(/\u2019/g, "'")
    .replace(/\u201C/g, '"')
    .replace(/\u201D/g, '"')

  const encodedKey = encodeKey(normalizedDescription)
  if (!translations.descriptions[encodedKey]) {
    translations.descriptions[encodedKey] = normalizedDescription // Par défaut, garder la description originale
    descriptionsAdded++
  }
})

// Sauvegarder le fichier de traductions
fs.writeFileSync(FR_JSON_PATH, JSON.stringify(translations, null, 2), "utf-8")

console.log("✅ Structure de traductions générée avec succès !")
console.log(`📊 Statistiques:`)
console.log(`   - Catégories: ${allCategories.size} totales, ${categoriesAdded} nouvelles`)
console.log(`   - Produits: ${allProducts.size} totales, ${productsAdded} nouveaux`)
console.log(`   - Descriptions: ${allDescriptions.size} totales, ${descriptionsAdded} nouvelles`)

if (categoriesAdded > 0 || productsAdded > 0 || descriptionsAdded > 0) {
  console.log(`\n💡 ${categoriesAdded + productsAdded + descriptionsAdded} nouvelles entrées ajoutées.`)
  console.log(`   Exécutez "npm run translate-all" pour les traduire automatiquement.`)
} else {
  console.log(`\n✅ Toutes les données sont déjà présentes dans les traductions.`)
}
