/**
 * Traductions des noms de catégories de l'anglais vers le français
 */
const categoryTranslations: Record<string, string> = {
  // Catégories communes
  Electronics: "Électronique",
  Computers: "Ordinateurs",
  Furniture: "Mobilier",
  Equipment: "Équipement",
  "Camera & Photo": "Appareils photo",
  "Home & Garden": "Maison & Jardin",
  Plants: "Plantes",
  Footwear: "Chaussures",
  Clothing: "Vêtements",
  Books: "Livres",
  Sports: "Sports",
  Toys: "Jouets",
  Beauty: "Beauté",
  Health: "Santé",
  Automotive: "Automobile",
  Tools: "Outils",
  Music: "Musique",
  Movies: "Films",
  Software: "Logiciels",
  Games: "Jeux",
  Food: "Alimentation",
  Drinks: "Boissons",
  Accessories: "Accessoires",
  Jewelry: "Bijoux",
  Watches: "Montres",
  Bags: "Sacs",
  Sunglasses: "Lunettes de soleil",
  Phones: "Téléphones",
  Tablets: "Tablettes",
  Laptops: "Ordinateurs portables",
  Monitors: "Écrans",
  Printers: "Imprimantes",
  Headphones: "Écouteurs",
  Speakers: "Haut-parleurs",
  Cameras: "Appareils photo",
  TVs: "Téléviseurs",
  Gaming: "Jeux vidéo",
  Office: "Bureau",
  Kitchen: "Cuisine",
  Bedroom: "Chambre",
  Living: "Salon",
  Bathroom: "Salle de bain",
  Outdoor: "Extérieur",
  Garden: "Jardin",
  Lighting: "Éclairage",
  Decor: "Décoration",
  Storage: "Rangement",
  Textiles: "Textiles",
  Rugs: "Tapis",
  Curtains: "Rideaux",
  Pillows: "Oreillers",
  Blankets: "Couvertures",
  Towels: "Serviettes",
}

/**
 * Traductions des noms de produits de l'API
 */
const productTranslations: Record<string, string> = {
  // Produits de l'API Vendure
  Laptop: "Ordinateur portable",
  Tablet: "Tablette",
  "Wireless Optical Mouse": "Souris optique sans fil",
  "32-Inch Monitor": "Écran 32 pouces",
  "Curvy Monitor": "Écran incurvé",
  "High Performance RAM": "Mémoire RAM haute performance",
  "Gaming PC": "PC de jeu",
  "Hard Drive": "Disque dur",
  "Clacky Keyboard": "Clavier mécanique",
  "Ethernet Cable": "Câble Ethernet",
  "USB Cable": "Câble USB",
  "Instant Camera": "Appareil photo instantané",
  "Camera Lens": "Objectif photo",
  "Vintage Folding Camera": "Appareil photo pliant vintage",
  Tripod: "Trépied",
  "Instamatic Camera": "Appareil photo Instamatic",
  "Compact Digital Camera": "Appareil photo numérique compact",
  "Nikkormat SLR Camera": "Appareil photo reflex Nikkormat",
  "Compact SLR Camera": "Appareil photo reflex compact",
  "Twin Lens Camera": "Appareil photo à double objectif",
  "Road Bike": "Vélo de route",
  "Skipping Rope": "Corde à sauter",
  "Boxing Gloves": "Gants de boxe",
  Tent: "Tente",
}

/**
 * Traductions de phrases complètes spécifiques de l'API
 */
const descriptionPhraseTranslations: Record<string, string> = {
  "Now equipped with seventh-generation Intel Core processors, Laptop is snappier than ever.":
    "Maintenant équipé de processeurs Intel Core de septième génération, l'ordinateur portable est plus rapide que jamais.",
  "From daily tasks like launching apps and opening files to more advanced computing, you can power through your day thanks to faster SSDs and Turbo Boost processing up to 3.6GHz.":
    "Des tâches quotidiennes comme lancer des applications et ouvrir des fichiers aux calculs plus avancés, vous pouvez accomplir votre journée grâce à des SSD plus rapides et un traitement Turbo Boost jusqu'à 3.6 GHz.",
  "If the computer were invented today, what would it look like?":
    "Si l'ordinateur était inventé aujourd'hui, à quoi ressemblerait-il ?",
  "It would be powerful enough for any task.":
    "Il serait assez puissant pour toute tâche.",
  "So mobile you could take it everywhere.":
    "Si mobile que vous pourriez l'emporter partout.",
  "And so intuitive you could use it any way you wanted — with touch, a keyboard, or even a pencil.":
    "Et si intuitif que vous pourriez l'utiliser comme vous le souhaitez — avec le toucher, un clavier, ou même un crayon.",
  "In other words, it wouldn't really be a \"computer.\" It would be Tablet.":
    "En d'autres termes, ce ne serait pas vraiment un \"ordinateur\". Ce serait la Tablette.",
  "The Logitech M185 Wireless Optical Mouse is a great device for any computer user, and as Logitech are the global market leaders for these devices, you are also guaranteed absolute reliability.":
    "La souris optique sans fil Logitech M185 est un excellent appareil pour tout utilisateur d'ordinateur, et comme Logitech est le leader du marché mondial pour ces appareils, vous êtes également garanti une fiabilité absolue.",
  "A mouse to be reckoned with!": "Une souris à ne pas négliger !",
  "The UJ59 with Ultra HD resolution has 4x the pixels of Full HD, delivering more screen space and amazingly life-like images.":
    "L'UJ59 avec résolution Ultra HD a 4 fois plus de pixels que le Full HD, offrant plus d'espace d'écran et des images incroyablement réalistes.",
  "That means you can view documents and webpages with less scrolling, work more comfortably with multiple windows and toolbars, and enjoy photos, videos and games in stunning 4K quality.":
    "Cela signifie que vous pouvez consulter des documents et des pages web avec moins de défilement, travailler plus confortablement avec plusieurs fenêtres et barres d'outils, et profiter de photos, vidéos et jeux en qualité 4K époustouflante.",
  "Note: beverage not included.": "Note : boisson non incluse.",
  "Discover a truly immersive viewing experience with this monitor curved more deeply than any other.":
    "Découvrez une expérience de visualisation vraiment immersive avec cet écran plus profondément incurvé que tout autre.",
  "Wrapping around your field of vision the 1,800 R screencreates a wider field of view, enhances depth perception, and minimises peripheral distractions to draw you deeper in to your content.":
    "Enveloppant votre champ de vision, l'écran 1,800 R crée un champ de vision plus large, améliore la perception de la profondeur et minimise les distractions périphériques pour vous plonger plus profondément dans votre contenu.",
  "Each RAM module is built with a pure aluminium heat spreader for faster heat dissipation and cooler operation.":
    "Chaque module RAM est construit avec un dissipateur de chaleur en aluminium pur pour une dissipation de chaleur plus rapide et un fonctionnement plus frais.",
  "Enhanced to XMP 2.0 profiles for better overclocking; Compatibility: Intel 100 Series, Intel 200 Series, Intel 300 Series, Intel X299, AMD 300 Series, AMD 400 Series.":
    "Amélioré pour les profils XMP 2.0 pour un meilleur overclocking ; Compatibilité : Intel série 100, Intel série 200, Intel série 300, Intel X299, AMD série 300, AMD série 400.",
  "This pc is optimised for gaming, and is also VR ready.":
    "Ce PC est optimisé pour le jeu et est également prêt pour la VR.",
  "The Intel Core-i7 CPU and High Performance GPU give the computer the raw power it needs to function at a high level.":
    "Le processeur Intel Core-i7 et le processeur graphique haute performance donnent à l'ordinateur la puissance brute dont il a besoin pour fonctionner à un niveau élevé.",
  "Boost your PC storage with this internal hard drive, designed just for desktop and all-in-one PCs.":
    "Augmentez le stockage de votre PC avec ce disque dur interne, conçu spécialement pour les PC de bureau et tout-en-un.",
  "Let all your colleagues know that you are typing on this exclusive, colorful klicky-klacky keyboard.":
    "Faites savoir à tous vos collègues que vous tapez sur ce clavier exclusif et coloré au son cliquetant.",
  "Huge travel on each keypress ensures maximum klack on each and every keystroke.":
    "Une grande course sur chaque frappe garantit un maximum de claquement sur chaque frappe.",
  "5m (metres) Cat.6 network cable (upwards/downwards compatible) | Patch cable | 2 RJ-45 plug | plug with bend protection mantle.":
    "Câble réseau Cat.6 de 5 m (mètres) (compatible vers le haut/vers le bas) | Câble de raccordement | 2 prises RJ-45 | prise avec gaine de protection contre la flexion.",
  "High transmission speeds due to operating frequency with up to 250 MHz (in comparison to Cat.5/Cat.5e cable bandwidth of 100 MHz).":
    "Vitesses de transmission élevées grâce à la fréquence de fonctionnement jusqu'à 250 MHz (par rapport à la bande passante du câble Cat.5/Cat.5e de 100 MHz).",
  "Solid conductors eliminate strand-interaction distortion and reduce jitter. As the surface is made of high-purity silver, the performance is very close to that of a solid silver cable, but priced much closer to solid copper cable.":
    "Les conducteurs solides éliminent la distorsion d'interaction entre brins et réduisent le jitter. Comme la surface est en argent de haute pureté, les performances sont très proches d'un câble en argent massif, mais au prix beaucoup plus proche d'un câble en cuivre massif.",
  "With its nostalgic design and simple point-and-shoot functionality, the Instant Camera is the perfect pick to get started with instant photography.":
    "Avec son design nostalgique et sa fonctionnalité simple de visée et déclenchement, l'appareil photo instantané est le choix parfait pour commencer la photographie instantanée.",
  "This lens is a Di type lens using an optical system with improved multi-coating designed to function with digital SLR cameras as well as film cameras.":
    "Cet objectif est un objectif de type Di utilisant un système optique avec un multi-revêtement amélioré conçu pour fonctionner avec les appareils photo reflex numériques ainsi que les appareils photo argentiques.",
  "This vintage folding camera is so antiquated that you cannot possibly hope to produce actual photographs with it. However, it makes a wonderful decorative piece for the home or office.":
    "Cet appareil photo pliant vintage est si ancien que vous ne pouvez pas espérer produire de vraies photographies avec. Cependant, il fait une merveilleuse pièce décorative pour la maison ou le bureau.",
  "Capture vivid, professional-style photographs with help from this lightweight tripod. The adjustable-height tripod makes it easy to achieve reliable stability and score just the right angle when going after that award-winning shot.":
    "Capturez des photographies vives de style professionnel avec l'aide de ce trépied léger. Le trépied à hauteur réglable facilite l'obtention d'une stabilité fiable et permet d'obtenir le bon angle lors de la recherche de cette photo primée.",
  "This inexpensive point-and-shoot camera uses easy-to-load 126 film cartridges. A built-in flash unit ensure great results, no matter the lighting conditions.":
    "Cet appareil photo bon marché de visée et déclenchement utilise des cartouches de film 126 faciles à charger. Une unité de flash intégrée garantit d'excellents résultats, quelles que soient les conditions d'éclairage.",
  "Unleash your creative potential with high-level performance and advanced features such as AI-powered Real-time Eye AF; new, high-precision Real-time Tracking; high-speed continuous shooting and 4K HDR movie-shooting. The camera's innovative AF quickly and reliably detects the position of the subject and then tracks the subject's motion, keeping it in sharp focus.":
    "Libérez votre potentiel créatif avec des performances de haut niveau et des fonctionnalités avancées telles que la mise au point automatique des yeux en temps réel alimentée par l'IA ; un nouveau suivi en temps réel haute précision ; la prise de vue en rafale haute vitesse et le tournage de films 4K HDR. La mise au point automatique innovante de l'appareil photo détecte rapidement et de manière fiable la position du sujet puis suit le mouvement du sujet, en le maintenant net.",
  "The Nikkormat FS was brought to market by Nikon in 1965. The lens is a 50mm f1.4 Nikkor. Nice glass, smooth focus and a working diaphragm. A UV filter and a Nikon front lens cap are included with the lens.":
    "Le Nikkormat FS a été lancé sur le marché par Nikon en 1965. L'objectif est un Nikkor 50mm f1.4. Bel objectif, mise au point fluide et diaphragme fonctionnel. Un filtre UV et un bouchon d'objectif avant Nikon sont inclus avec l'objectif.",
  "Retro styled, portable in size and built around a powerful 24-megapixel APS-C CMOS sensor, this digital camera is the ideal companion for creative everyday photography. Packed full of high spec features such as an advanced hybrid autofocus system able to keep pace with even the most active subjects, a speedy 6fps continuous-shooting mode, high-resolution electronic viewfinder and intuitive swivelling touchscreen, it brings professional image making into everyone's grasp.":
    "De style rétro, portable et construit autour d'un capteur CMOS APS-C de 24 mégapixels puissant, cet appareil photo numérique est le compagnon idéal pour la photographie créative quotidienne. Rempli de fonctionnalités haut de gamme telles qu'un système de mise au point automatique hybride avancé capable de suivre même les sujets les plus actifs, un mode de prise de vue en rafale rapide de 6 images/seconde, un viseur électronique haute résolution et un écran tactile pivotant intuitif, il rend la création d'images professionnelles accessible à tous.",
  "What makes a Rolleiflex TLR so special? Many things. To start, TLR stands for twin lens reflex. \"Twin\" because there are two lenses. And reflex means that the photographer looks through the lens to view the reflected image of an object or scene on the focusing screen.":
    "Qu'est-ce qui rend un Rolleiflex TLR si spécial ? Beaucoup de choses. Pour commencer, TLR signifie reflex à double objectif. \"Double\" car il y a deux objectifs. Et reflex signifie que le photographe regarde à travers l'objectif pour voir l'image réfléchie d'un objet ou d'une scène sur l'écran de mise au point.",
  "What makes a Rolleiflex TLR so special? Many things. To start, TLR stands for twin lens reflex. \"Twin\" because there are two lenses. And reflex means that the photographer looks through the lens to view the reflected image of an object or scene on the focusing screen. ":
    "Qu'est-ce qui rend un Rolleiflex TLR si spécial ? Beaucoup de choses. Pour commencer, TLR signifie reflex à double objectif. \"Double\" car il y a deux objectifs. Et reflex signifie que le photographe regarde à travers l'objectif pour voir l'image réfléchie d'un objet ou d'une scène sur l'écran de mise au point.",
  "Featuring a full carbon chassis - complete with cyclocross-specific carbon fork - and a component setup geared for hard use on the race circuit, it's got the low weight, exceptional efficiency and brilliant handling you'll need to stay at the front of the pack.":
    "Avec un châssis entièrement en carbone - complet avec une fourche en carbone spécifique au cyclocross - et une configuration de composants conçue pour un usage intensif sur le circuit de course, il a le faible poids, l'efficacité exceptionnelle et la maniabilité brillante dont vous aurez besoin pour rester en tête du peloton.",
  "When you're working out you need a quality rope that doesn't tangle at every couple of jumps and with this skipping rope you won't have this problem. The fact that it looks like a pair of tasty frankfurters is merely a bonus.":
    "Lorsque vous vous entraînez, vous avez besoin d'une corde de qualité qui ne s'emmêle pas à chaque saut et avec cette corde à sauter, vous n'aurez pas ce problème. Le fait qu'elle ressemble à une paire de saucisses appétissantes n'est qu'un bonus.",
  "Training gloves designed for optimum training. Our gloves promote proper punching technique because they are conformed to the natural shape of your fist. Dense, innovative two-layer foam provides better shock absorbency and full padding on the front, back and wrist to promote proper punching technique.":
    "Gants d'entraînement conçus pour un entraînement optimal. Nos gants favorisent une technique de frappe appropriée car ils sont conformés à la forme naturelle de votre poing. Une mousse innovante à deux couches dense offre une meilleure absorption des chocs et un rembourrage complet sur l'avant, l'arrière et le poignet pour favoriser une technique de frappe appropriée.",
  "With tons of space inside (for max. 4 persons), full head height throughout the entire tent and an unusual and striking shape, this tent offers you everything you need.":
    "Avec beaucoup d'espace à l'intérieur (pour max. 4 personnes), une hauteur de tête complète dans toute la tente et une forme inhabituelle et frappante, cette tente vous offre tout ce dont vous avez besoin.",
}

/**
 * Traductions des termes et expressions courants dans les descriptions de produits
 * Utilisé uniquement pour les descriptions partielles non couvertes par descriptionPhraseTranslations
 */
const descriptionTermTranslations: Record<string, string> = {
  // Termes techniques réellement utilisés dans les descriptions
  "metres": "mètres",
  "Cat.6": "Cat.6",
  "network cable": "câble réseau",
  "upwards/downwards compatible": "compatible vers le haut/vers le bas",
  "Patch cable": "Câble de raccordement",
  "RJ-45 plug": "prise RJ-45",
  "bend protection mantle": "gaine de protection contre la flexion",
  "High transmission speeds": "Vitesses de transmission élevées",
  "due to operating frequency": "grâce à la fréquence de fonctionnement",
  "up to": "jusqu'à",
  "MHz": "MHz",
  "in comparison to": "par rapport à",
  "Cat.5": "Cat.5",
  "Cat.5e": "Cat.5e",
  "cable bandwidth": "bande passante du câble",
}

/**
 * Traduit le nom d'une catégorie de l'anglais vers le français
 * @param categoryName Nom de la catégorie en anglais
 * @returns Nom traduit en français ou le nom original si aucune traduction n'existe
 */
export function translateCategory(categoryName: string): string {
  return categoryTranslations[categoryName] || categoryName
}

/**
 * Traduit le nom d'un produit de l'anglais vers le français
 * @param productName Nom du produit en anglais
 * @returns Nom traduit en français ou le nom original si aucune traduction n'existe
 */
export function translateProduct(productName: string): string {
  return productTranslations[productName] || productName
}

/**
 * Traduit la description d'un produit de l'anglais vers le français
 * @param description Description du produit en anglais
 * @returns Description traduite en français ou la description originale si aucune traduction n'existe
 */
export function translateProductDescription(description: string): string {
  // Si la description est vide ou nulle, retourner la description originale
  if (!description) return description

  // Nettoyer le HTML si présent et normaliser les espaces multiples
  let cleanDescription = description.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim()

  // Normaliser les guillemets typographiques (curly quotes) vers des guillemets droits
  // U+2018 (') -> U+0027 ('), U+2019 (') -> U+0027 ('), U+201C (") -> U+0022 ("), U+201D (") -> U+0022 (")
  cleanDescription = cleanDescription
    .replace(/\u2018/g, "'") // ' -> '
    .replace(/\u2019/g, "'") // ' -> '
    .replace(/\u201C/g, '"') // " -> "
    .replace(/\u201D/g, '"') // " -> "

  // Normaliser la description pour la comparaison (enlever les espaces multiples, trim)
  const normalizedDescription = cleanDescription.replace(/\s+/g, " ").trim()

  // D'abord, essayer de traduire les phrases complètes (triées par longueur décroissante)
  // pour prioriser les correspondances les plus longues
  const sortedPhrases = Object.entries(descriptionPhraseTranslations).sort(
    (a, b) => b[0].length - a[0].length,
  )

  // Chercher une correspondance exacte d'abord (insensible à la casse)
  for (const [english, french] of sortedPhrases) {
    const normalizedEnglish = english.replace(/\s+/g, " ").trim()
    
    // Correspondance exacte (insensible à la casse)
    if (normalizedDescription.toLowerCase() === normalizedEnglish.toLowerCase()) {
      return french
    }
    
    // Si la description commence par la phrase anglaise et que c'est au moins 95% de la longueur
    // (pour gérer les cas avec espaces en fin)
    const descLower = normalizedDescription.toLowerCase()
    const engLower = normalizedEnglish.toLowerCase()
    if (descLower.startsWith(engLower) && engLower.length >= descLower.length * 0.95) {
      return french
    }
    
    // Vérifier aussi si la description contient la phrase complète (pour les cas avec espaces en fin)
    if (descLower.includes(engLower) && engLower.length >= descLower.length * 0.95) {
      return french
    }
  }

  // Si aucune correspondance exacte, essayer les remplacements partiels
  let translatedDescription = normalizedDescription
  for (const [english, french] of sortedPhrases) {
    const normalizedEnglish = english.replace(/\s+/g, " ").trim()
    const escapedEnglish = normalizedEnglish.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    const regex = new RegExp(escapedEnglish.replace(/\s+/g, "\\s+"), "gi")
    
    if (regex.test(translatedDescription)) {
      translatedDescription = translatedDescription.replace(regex, french)
      // Si c'était une correspondance de 90% ou plus, on arrête
      if (normalizedEnglish.length >= normalizedDescription.length * 0.9) {
        break
      }
    }
  }

  // Ensuite, traduire les termes et expressions courants (triés par longueur décroissante)
  const sortedTranslations = Object.entries(descriptionTermTranslations).sort(
    (a, b) => b[0].length - a[0].length,
  )

  for (const [english, french] of sortedTranslations) {
    // Échapper les caractères spéciaux pour la regex et gérer les espaces
    const normalizedEnglish = english.replace(/\s+/g, " ").trim()
    const escapedEnglish = normalizedEnglish.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    
    // Pour les phrases complètes, utiliser une recherche simple (insensible à la casse)
    // Pour les mots individuels, utiliser des limites de mots
    const isPhrase = normalizedEnglish.includes(" ") || normalizedEnglish.length > 15
    const regex = isPhrase
      ? new RegExp(escapedEnglish.replace(/\s+/g, "\\s+"), "gi")
      : new RegExp(`\\b${escapedEnglish}\\b`, "gi")
    
    translatedDescription = translatedDescription.replace(regex, (match) => {
      // Préserver la casse de la première lettre
      if (match[0] === match[0].toUpperCase()) {
        return french.charAt(0).toUpperCase() + french.slice(1)
      }
      return french
    })
  }

  return translatedDescription
}

