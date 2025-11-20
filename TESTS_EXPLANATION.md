# 📚 Guide des Tests Unitaires

## Qu'est-ce qu'un test unitaire ?

Un **test unitaire** est un petit programme qui vérifie automatiquement qu'une fonction ou un composant fonctionne correctement. C'est comme un assistant qui teste votre code à chaque fois que vous le modifiez.

### Exemple concret

Imaginez que vous avez une fonction qui convertit des dollars en euros :

```typescript
function convertToEUR(priceInCents: number, fromCurrency: string): number {
  const rate = EXCHANGE_RATES[fromCurrency.toUpperCase()] ?? 1.0
  return Math.round(priceInCents * rate)
}
```

Un test unitaire vérifie que cette fonction fait bien son travail :

```typescript
test("should convert USD to EUR correctly", () => {
  // On teste : 100 USD devraient donner 92 EUR
  expect(convertToEUR(10000, "USD")).toBe(9200)
})
```

## Pourquoi faire des tests ?

### 1. **Détecter les bugs rapidement**
Si vous modifiez une fonction et qu'elle casse, les tests vous le disent immédiatement.

### 2. **Documentation vivante**
Les tests montrent comment utiliser votre code avec des exemples concrets.

### 3. **Confiance pour refactoriser**
Vous pouvez modifier votre code en étant sûr de ne rien casser.

### 4. **Qualité du code**
Les tests forcent à écrire du code plus simple et testable.

## Structure d'un test

Un test suit généralement cette structure :

```typescript
describe("nomDuGroupe", () => {
  it("devrait faire quelque chose de spécifique", () => {
    // 1. ARRANGE (Préparer) - Mettre en place les données
    const input = 100
    
    // 2. ACT (Agir) - Exécuter la fonction
    const result = maFonction(input)
    
    // 3. ASSERT (Vérifier) - Vérifier le résultat
    expect(result).toBe(200)
  })
})
```

## Les outils utilisés dans ce projet

### Jest
- **Framework de test** JavaScript/TypeScript
- Fournit les fonctions `describe`, `it`, `expect`, etc.
- Exécute les tests et affiche les résultats

### React Testing Library
- **Bibliothèque pour tester les composants React**
- Permet de simuler des interactions utilisateur
- Vérifie que les composants s'affichent correctement

### @testing-library/jest-dom
- **Extensions pour Jest**
- Ajoute des matchers comme `toBeInTheDocument()`, `toHaveClass()`, etc.

## Exemples de tests dans ce projet

### Test 1 : Conversion de devises

```typescript
// src/lib/__tests__/currency.test.ts

describe("convertToEUR", () => {
  it("should convert USD to EUR correctly", () => {
    // Test : 100 USD (10000 centimes) = 92 EUR (9200 centimes)
    expect(convertToEUR(10000, "USD")).toBe(9200)
  })
  
  it("should return the same value for EUR", () => {
    // Test : Si c'est déjà en EUR, ça ne change pas
    expect(convertToEUR(10000, "EUR")).toBe(10000)
  })
})
```

**Explication** :
- `describe` groupe plusieurs tests ensemble
- `it` définit un test individuel
- `expect(...).toBe(...)` vérifie que le résultat est égal à la valeur attendue

### Test 2 : Traduction de catégories

```typescript
// src/lib/__tests__/translations.test.ts

describe("translateCategory", () => {
  it("should translate known categories", () => {
    expect(translateCategory("Electronics")).toBe("Électronique")
    expect(translateCategory("Computers")).toBe("Ordinateurs")
  })
  
  it("should return original name for unknown categories", () => {
    // Si la catégorie n'existe pas, on retourne le nom original
    expect(translateCategory("UnknownCategory")).toBe("UnknownCategory")
  })
})
```

**Explication** :
- On teste le cas "normal" (catégorie connue)
- On teste aussi le cas "limite" (catégorie inconnue)

## Types de tests

### 1. **Tests unitaires** (ce qu'on fait ici)
- Testent une fonction isolée
- Rapides à exécuter
- Exemple : tester `convertToEUR()` seul

### 2. **Tests d'intégration**
- Testent plusieurs fonctions ensemble
- Plus lents
- Exemple : tester le flux complet d'ajout au panier

### 3. **Tests E2E (End-to-End)**
- Testent l'application complète
- Très lents
- Exemple : simuler un utilisateur qui navigue sur le site

## Comment exécuter les tests

### Lancer tous les tests
```bash
npm test
```

### Lancer les tests en mode watch (re-exécute automatiquement)
```bash
npm test -- --watch
```

### Lancer un test spécifique
```bash
npm test currency.test.ts
```

### Voir la couverture de code
```bash
npm test -- --coverage
```

## Les assertions (expect)

Jest fournit plusieurs façons de vérifier les résultats :

```typescript
// Égalité stricte
expect(result).toBe(42)

// Égalité pour les objets/tableaux
expect(result).toEqual({ name: "Test" })

// Vérifier qu'une valeur est vraie
expect(result).toBeTruthy()

// Vérifier qu'une valeur est fausse
expect(result).toBeFalsy()

// Vérifier qu'un tableau contient un élément
expect(array).toContain("item")

// Vérifier qu'une string contient un texte
expect(string).toContain("hello")

// Vérifier qu'une fonction lance une erreur
expect(() => maFonction()).toThrow()
```

## Tests de composants React

Pour tester un composant React, on utilise React Testing Library :

```typescript
import { render, screen } from "@testing-library/react"
import { ProductCard } from "../ProductCard"

test("should display product name", () => {
  const product = { name: "Laptop", price: 1000 }
  
  // Rendre le composant
  render(<ProductCard product={product} />)
  
  // Vérifier que le nom s'affiche
  expect(screen.getByText("Laptop")).toBeInTheDocument()
})
```

## Bonnes pratiques

### 1. **Un test = une chose**
Chaque test doit vérifier une seule fonctionnalité.

### 2. **Nommer clairement les tests**
Le nom du test doit expliquer ce qu'il teste :
- ✅ `"should convert USD to EUR correctly"`
- ❌ `"test1"`

### 3. **Tester les cas limites**
- Valeurs nulles
- Tableaux vides
- Valeurs extrêmes

### 4. **Tester les cas d'erreur**
- Que se passe-t-il si on passe une valeur invalide ?
- La fonction lance-t-elle une erreur appropriée ?

## Structure des fichiers de test

Dans ce projet, les tests sont organisés ainsi :

```
src/
├── lib/
│   ├── currency.ts
│   └── __tests__/
│       └── currency.test.ts  ← Test pour currency.ts
│
├── modules/
│   └── catalog/
│       └── hooks/
│           ├── useProductFilters.ts
│           └── __tests__/
│               └── useProductFilters.test.ts  ← Test pour le hook
```

## Exemple complet : Test d'un hook

```typescript
import { renderHook, act } from "@testing-library/react"
import { useProductFilters } from "../useProductFilters"

test("should filter products by search term", () => {
  const products = [
    { id: "1", name: "Laptop", price: 1000 },
    { id: "2", name: "Tablet", price: 500 },
  ]
  
  const { result } = renderHook(() => useProductFilters(products))
  
  // Simuler une recherche
  act(() => {
    result.current.setSearch("Laptop")
  })
  
  // Vérifier que seul "Laptop" est retourné
  expect(result.current.filteredProducts).toHaveLength(1)
  expect(result.current.filteredProducts[0].name).toBe("Laptop")
})
```

## Résumé

1. **Un test = une vérification** : "Cette fonction fait-elle ce qu'elle doit faire ?"
2. **Structure** : Arrange (préparer) → Act (agir) → Assert (vérifier)
3. **Outils** : Jest pour les fonctions, React Testing Library pour les composants
4. **Objectif** : S'assurer que le code fonctionne et continue de fonctionner après modifications

## Prochaines étapes

Une fois que vous comprenez les tests, vous pouvez :
1. Ajouter plus de tests pour couvrir tous les cas
2. Tester les composants React
3. Tester les hooks personnalisés
4. Configurer la couverture de code pour voir ce qui n'est pas testé

