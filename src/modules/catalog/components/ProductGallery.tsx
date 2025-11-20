"use client"

import { useState } from "react"
import { ImageWithFallback } from "@/components/ui/ImageWithFallback"

interface ProductGalleryProps {
  images: string[]
  alt: string
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square rounded-lg bg-slate-800 flex items-center justify-center">
        <p className="text-sm text-slate-500">Aucune image disponible</p>
      </div>
    )
  }

  return (
    <div className="space-y-4" role="group" aria-label="Galerie d'images du produit">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-800">
        <ImageWithFallback
          src={images[selectedImage]}
          alt={`${alt} - Image principale ${selectedImage + 1} sur ${images.length}`}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2" role="group" aria-label="Miniatures d'images">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square overflow-hidden rounded-md border-2 animate-in fade-in duration-200 hover:animate-in hover:zoom-in-95 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                selectedImage === index
                  ? "border-sky-500 ring-2 ring-sky-500/20"
                  : "border-slate-700 hover:border-slate-600"
              }`}
              aria-label={`Afficher l'image ${index + 1} sur ${images.length}`}
              aria-pressed={selectedImage === index}
            >
              <ImageWithFallback
                src={image}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, 25vw"
                className="object-cover"
                aria-hidden="true"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
