'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import Image from 'next/image'

export interface Testimonial {
  id: string
  content: string
  clientName: string
  role: string
  company: string
  rating: number
  image?: string
}

interface TestimonialsCarouselProps {
  title?: string
  subtitle?: string
  testimonials: Testimonial[]
}

export function TestimonialsCarousel({
  title = 'Lo Que Dicen Nuestros Clientes',
  subtitle,
  testimonials,
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  if (!testimonials || testimonials.length === 0) {
    return null
  }

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-16 lg:py-24">
      <Container>
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
          {subtitle && <p className="mt-4 text-lg text-gray-600">{subtitle}</p>}
        </div>

        {/* Testimonial Card */}
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="relative rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-200 md:p-12">
            {/* Quote Icon */}
            <Quote className="absolute left-8 top-8 h-12 w-12 text-primary-200" />

            {/* Testimonial Content */}
            <div className="relative">
              {/* Rating Stars */}
              <div className="mb-6 flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < currentTestimonial.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-center">
                <p className="text-lg leading-relaxed text-gray-700 md:text-xl">
                  "{currentTestimonial.content}"
                </p>
              </blockquote>

              {/* Client Info */}
              <div className="mt-8 flex flex-col items-center">
                {currentTestimonial.image && (
                  <div className="relative h-16 w-16 ring-4 ring-primary-100 rounded-full overflow-hidden">
                    <Image
                      src={currentTestimonial.image}
                      alt={`${currentTestimonial.clientName}, ${currentTestimonial.role} at ${currentTestimonial.company}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className={`text-center ${currentTestimonial.image ? 'mt-4' : ''}`}>
                  <p className="font-semibold text-gray-900">{currentTestimonial.clientName}</p>
                  <p className="text-sm text-gray-600">{currentTestimonial.role}</p>
                  <p className="text-sm font-medium text-primary-600">
                    {currentTestimonial.company}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            {testimonials.length > 1 && (
              <div className="mt-8 flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPrevious}
                  className="h-10 w-10 rounded-full p-0"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>

                {/* Dots Indicator */}
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 w-2 rounded-full transition-all ${
                        index === currentIndex
                          ? 'w-8 bg-primary-600'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNext}
                  className="h-10 w-10 rounded-full p-0"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
