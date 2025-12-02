const fs = require("fs")
const path = require("path")
const axios = require("axios")

const DATA_DIR = path.join(__dirname, "../data")
const FR_JSON_PATH = path.join(__dirname, "../src/locales/fr.json")

// Configuration API DeepL
// Obtenez votre clé API sur : https://www.deepl.com/fr/pro-api
const DEEPL_API_KEY = process.env.DEEPL_API_KEY

// Fonction pour encoder les clés (remplacer les points par __DOT__)
function encodeKey(key) {
  return key.replace(/\./g, "__DOT__")
}

// Fonction pour traduire avec DeepL API
async function translateText(text, retries = 3) {
  if (!DEEPL_API_KEY) {
    console.error("\n❌ Erreur: DEEPL_API_KEY n'est pas définie")
    console.log("\n💡 Pour obtenir une clé API DeepL:")
    console.log("   1. Allez sur https://www.deepl.com/fr/pro-api")
    console.log("   2. Créez un compte (gratuit jusqu'à 500K caractères/mois)")
    console.log("   3. Copiez votre clé API")
    console.log("   4. Définissez: export DEEPL_API_KEY=votre_cle_api")
    return text
  }

  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.post(
        "https://api-free.deepl.com/v2/translate",
        new URLSearchParams({
          text: text,
          source_lang: "EN",
          target_lang: "FR",
        }),
        {
          headers: {
            Authorization: `DeepL-Auth-Key ${DEEPL_API_KEY}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      )
      return response.data.translations[0].text
    } catch (error) {
      if (i === retries - 1) {
        console.error(`   ❌ Échec: ${error.response?.data?.message || error.message}`)
        return text
      }
      await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, i)))
    }
  }
}

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
    const cleanDescription = product.description
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim()
    if (cleanDescription) {
      allDescriptions.add(cleanDescription)
    }
  }
})

// Normaliser les descriptions (guillemets typographiques)
const normalizedDescriptions = new Map()
allDescriptions.forEach((desc) => {
  const normalized = desc
    .replace(/\u2018/g, "'")
    .replace(/\u2019/g, "'")
    .replace(/\u201C/g, '"')
    .replace(/\u201D/g, '"')
  normalizedDescriptions.set(normalized, desc)
})

// Trouver les éléments à traduire
const categoriesToTranslate = []
allCategories.forEach((categoryName) => {
  const encodedKey = encodeKey(categoryName)
  const existingTranslation = translations.categories[encodedKey]
  if (!existingTranslation || existingTranslation === categoryName) {
    categoriesToTranslate.push({ encodedKey, english: categoryName })
  }
})

const productsToTranslate = []
allProducts.forEach((productName) => {
  const encodedKey = encodeKey(productName)
  const existingTranslation = translations.products[encodedKey]
  if (!existingTranslation || existingTranslation === productName) {
    productsToTranslate.push({ encodedKey, english: productName })
  }
})

const descriptionsToTranslate = []
normalizedDescriptions.forEach((originalDesc, normalizedDesc) => {
  const encodedKey = encodeKey(normalizedDesc)
  const existingTranslation = translations.descriptions[encodedKey]
  if (!existingTranslation || existingTranslation === normalizedDesc) {
    descriptionsToTranslate.push({ encodedKey, english: normalizedDesc })
  }
})

const totalToTranslate =
  categoriesToTranslate.length + productsToTranslate.length + descriptionsToTranslate.length

if (totalToTranslate === 0) {
  console.log("✅ Toutes les traductions sont déjà présentes !")
  process.exit(0)
}

console.log(`📊 Éléments à traduire:`)
console.log(`   - ${categoriesToTranslate.length} catégories`)
console.log(`   - ${productsToTranslate.length} produits`)
console.log(`   - ${descriptionsToTranslate.length} descriptions`)
console.log(`   - Total: ${totalToTranslate} éléments\n`)

if (!DEEPL_API_KEY) {
  console.log("⚠️  Clé API non définie. Le script va s'arrêter.")
  process.exit(1)
}

console.log("🔄 Traduction automatique en cours avec DeepL API...")
console.log("   ⚠️  Cela peut prendre plusieurs minutes selon le nombre d'éléments\n")

async function translateAll() {
  let count = 0

  // Traduire les catégories
  for (const { encodedKey, english } of categoriesToTranslate) {
    count++
    process.stdout.write(
      `\r   [${count}/${totalToTranslate}] Catégorie: ${english.substring(0, 40).padEnd(40)}`,
    )
    const french = await translateText(english)
    translations.categories[encodedKey] = french
    await new Promise((resolve) => setTimeout(resolve, 100)) // Délai entre les requêtes
  }

  // Traduire les produits
  for (const { encodedKey, english } of productsToTranslate) {
    count++
    process.stdout.write(
      `\r   [${count}/${totalToTranslate}] Produit: ${english.substring(0, 40).padEnd(40)}`,
    )
    const french = await translateText(english)
    translations.products[encodedKey] = french
    await new Promise((resolve) => setTimeout(resolve, 100))
  }

  // Traduire les descriptions
  for (const { encodedKey, english } of descriptionsToTranslate) {
    count++
    process.stdout.write(
      `\r   [${count}/${totalToTranslate}] Description: ${english.substring(0, 40).padEnd(40)}`,
    )
    const french = await translateText(english)
    translations.descriptions[encodedKey] = french
    await new Promise((resolve) => setTimeout(resolve, 200)) // Plus de délai pour les descriptions
  }

  // Sauvegarder
  fs.writeFileSync(FR_JSON_PATH, JSON.stringify(translations, null, 2), "utf-8")

  console.log(`\n\n✅ Traduction terminée avec succès !`)
  console.log(`   - ${categoriesToTranslate.length} catégories traduites`)
  console.log(`   - ${productsToTranslate.length} produits traduits`)
  console.log(`   - ${descriptionsToTranslate.length} descriptions traduites`)
  console.log(`\n💾 Fichier mis à jour: ${FR_JSON_PATH}`)
}

translateAll().catch((error) => {
  console.error("\n❌ Erreur:", error.message)
  process.exit(1)
})
