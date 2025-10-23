'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

interface HeroCarouselProps {
  images: string[]
  interval?: number
  variant?: 'gradient' | 'solid' | 'minimal' | 'photo-focus'
}

export function HeroCarousel({
  images,
  interval = 5000,
  variant = 'photo-focus',
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const nextSlide = useCallback(() => {
    setIsTransitioning(true)
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 1000)
  }, [images.length])

  const goToSlide = (index: number) => {
    setIsTransitioning(true)
    setCurrentIndex(index)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 1000)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, interval)
    return () => clearInterval(timer)
  }, [nextSlide, interval])

  return (
    <div className="absolute inset-0">
      {/* Images */}
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={image}
            alt={`Hero background ${index + 1}`}
            fill
            priority={index === 0}
            className="object-cover object-center"
            quality={85}
          />
        </div>
      ))}

      {/* Overlay - different for photo-focus variant */}
      {variant === 'photo-focus' ? (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10 pointer-events-none" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/85 via-primary-800/80 to-secondary-900/85 z-10 pointer-events-none" />
      )}

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
