"use client"

import { useState } from "react"
import Image from "next/image"

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
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-800">
        <Image
          src={images[selectedImage]}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square overflow-hidden rounded-md border-2 transition-all ${
                selectedImage === index
                  ? "border-sky-500 ring-2 ring-sky-500/20"
                  : "border-slate-700 hover:border-slate-600"
              }`}
            >
              <Image
                src={image}
                alt={`${alt} - Vue ${index + 1}`}
                fill
                sizes="(min-width: 1024px) 25vw, 25vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

