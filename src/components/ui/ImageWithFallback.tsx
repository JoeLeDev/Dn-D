"use client"

import Image from "next/image"
import { useState } from "react"
import { ImageOff } from "lucide-react"

interface ImageWithFallbackProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  sizes?: string
  priority?: boolean
  loading?: "lazy" | "eager"
}

// Placeholder SVG en base64 pour éviter les erreurs 404
const PLACEHOLDER_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%231e293b' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23475569' font-family='system-ui' font-size='16'%3EImage non disponible%3C/text%3E%3C/svg%3E"

export function ImageWithFallback({
  src,
  alt,
  fill,
  width,
  height,
  className = "",
  sizes,
  priority,
  loading = priority ? "eager" : "lazy",
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      setImgSrc(PLACEHOLDER_SVG)
    }
  }

  if (fill) {
    if (hasError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <ImageOff className="h-12 w-12 text-slate-600" />
        </div>
      )
    }
    return (
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        onError={handleError}
        priority={priority}
        loading={loading}
      />
    )
  }

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-slate-800 ${className}`}
        style={{ width, height }}
      >
        <ImageOff className="h-8 w-8 text-slate-600" />
      </div>
    )
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
      priority={priority}
      loading={loading}
    />
  )
}
