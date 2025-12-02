#!/usr/bin/env node

/**
 * Script pour récupérer toutes les données de l'API Vendure
 * et les sauvegarder dans des fichiers JSON
 */

const fs = require("fs")
const path = require("path")

const GRAPHQL_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_URL || "https://readonlydemo.vendure.io/shop-api"
const OUTPUT_DIR = path.join(__dirname, "../data")

// Créer le dossier data s'il n'existe pas
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

/**
 * Fait une requête GraphQL
 */
async function graphqlQuery(query, variables = {}) {
  try {
    const response = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

    if (result.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(result.errors, null, 2)}`)
    }

    return result.data
  } catch (error) {
    console.error("Erreur lors de la requête GraphQL:", error.message)
    throw error
  }
}

/**
 * Récupère toutes les catégories (collections)
 */
async function fetchAllCategories() {
  console.log("Récupération des catégories...")

  const query = `
    query GetCategories {
      collections {
        items {
          id
          name
          slug
          description
          featuredAsset {
            preview
          }
        }
      }
    }
  `

  const data = await graphqlQuery(query)
  const categories = data.collections.items

  console.log(`${categories.length} catégories récupérées`)

  // Sauvegarder dans un fichier JSON
  const filePath = path.join(OUTPUT_DIR, "categories.json")
  fs.writeFileSync(filePath, JSON.stringify(categories, null, 2), "utf-8")
  console.log(`Categories sauvegardées dans: ${filePath}`)

  return categories
}

/**
 * Récupère tous les produits avec pagination
 */
async function fetchAllProducts() {
  console.log("Récupération des produits...")

  const allProducts = []
  let skip = 0
  const take = 50 // Nombre de produits par requête
  let hasMore = true

  while (hasMore) {
    const query = `
      query GetProducts($skip: Int!, $take: Int!) {
        products(options: { skip: $skip, take: $take }) {
          items {
            id
            slug
            name
            description
            featuredAsset {
              preview
            }
            assets {
              preview
            }
            collections {
              id
              name
              slug
            }
            variants {
              id
              sku
              priceWithTax
              currencyCode
            }
          }
          totalItems
        }
      }
    `

    const data = await graphqlQuery(query, { skip, take })
    const products = data.products.items

    allProducts.push(...products)

    console.log(
      `  ${products.length} produits récupérés (total: ${allProducts.length}/${data.products.totalItems})`,
    )

    // Vérifier s'il y a encore des produits à récupérer
    hasMore = allProducts.length < data.products.totalItems
    skip += take
  }

  console.log(`${allProducts.length} produits récupérés au total`)

  // Sauvegarder dans un fichier JSON
  const filePath = path.join(OUTPUT_DIR, "products.json")
  fs.writeFileSync(filePath, JSON.stringify(allProducts, null, 2), "utf-8")
  console.log(`Produits sauvegardés dans: ${filePath}`)

  return allProducts
}

/**
 * Récupère les détails complets de chaque produit
 */
async function fetchAllProductDetails(products) {
  console.log("Récupération des détails complets des produits...")

  const productDetails = []

  for (let i = 0; i < products.length; i++) {
    const product = products[i]

    const query = `
      query GetProductBySlug($slug: String!) {
        product(slug: $slug) {
          id
          slug
          name
          description
          featuredAsset {
            preview
          }
          assets {
            preview
          }
          collections {
            id
            name
            slug
          }
          variants {
            id
            sku
            priceWithTax
            currencyCode
          }
        }
      }
    `

    try {
      const data = await graphqlQuery(query, { slug: product.slug })

      if (data.product) {
        productDetails.push(data.product)
      }

      // Afficher la progression
      if ((i + 1) % 10 === 0 || i + 1 === products.length) {
        console.log(`  ${i + 1}/${products.length} produits traités`)
      }

      // Petit délai pour éviter de surcharger l'API
      await new Promise((resolve) => setTimeout(resolve, 100))
    } catch (error) {
      console.error(`  Erreur pour le produit ${product.slug}:`, error.message)
    }
  }

  console.log(`${productDetails.length} détails de produits récupérés`)

  // Sauvegarder dans un fichier JSON
  const filePath = path.join(OUTPUT_DIR, "product-details.json")
  fs.writeFileSync(filePath, JSON.stringify(productDetails, null, 2), "utf-8")
  console.log(`Détails des produits sauvegardés dans: ${filePath}`)

  return productDetails
}

/**
 * Crée un fichier récapitulatif avec toutes les données
 */
function createSummary(categories, products, productDetails) {
  console.log("Création du fichier récapitulatif...")

  const summary = {
    metadata: {
      fetchedAt: new Date().toISOString(),
      apiUrl: GRAPHQL_URL,
      totalCategories: categories.length,
      totalProducts: products.length,
      totalProductDetails: productDetails.length,
    },
    categories: categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
    })),
    products: products.map((prod) => ({
      id: prod.id,
      name: prod.name,
      slug: prod.slug,
      categories: prod.collections.map((c) => c.name),
      priceRange: {
        min: Math.min(...prod.variants.map((v) => v.priceWithTax)),
        max: Math.max(...prod.variants.map((v) => v.priceWithTax)),
        currency: prod.variants[0]?.currencyCode || "USD",
      },
    })),
  }

  const filePath = path.join(OUTPUT_DIR, "summary.json")
  fs.writeFileSync(filePath, JSON.stringify(summary, null, 2), "utf-8")
  console.log(`Récapitulatif sauvegardé dans: ${filePath}`)
}

/**
 * Fonction principale
 */
async function main() {
  console.log("Début de la récupération des données...\n")
  console.log(`URL de l'API: ${GRAPHQL_URL}`)
  console.log(`Dossier de sortie: ${OUTPUT_DIR}\n`)

  try {
    // Récupérer les catégories
    const categories = await fetchAllCategories()
    console.log("")

    // Récupérer tous les produits
    const products = await fetchAllProducts()
    console.log("")

    // Récupérer les détails complets (optionnel, peut être long)
    console.log("Récupération des détails complets (peut prendre du temps)...")
    const productDetails = await fetchAllProductDetails(products)
    console.log("")

    // Créer le récapitulatif
    createSummary(categories, products, productDetails)
    console.log("")

    console.log("Toutes les données ont été récupérées avec succès!")
    console.log(`\nFichiers créés dans: ${OUTPUT_DIR}`)
    console.log("   - categories.json")
    console.log("   - products.json")
    console.log("   - product-details.json")
    console.log("   - summary.json")
  } catch (error) {
    console.error("\nErreur lors de la récupération des données:", error)
    process.exit(1)
  }
}

// Exécuter le script
if (require.main === module) {
  main()
}

module.exports = { fetchAllCategories, fetchAllProducts, fetchAllProductDetails }
