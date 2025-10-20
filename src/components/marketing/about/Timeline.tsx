'use client'

import { Container } from '@/components/ui/Container'
import { CheckCircle } from 'lucide-react'

export interface TimelineItem {
  year: string
  title: string
  description: string
}

interface TimelineProps {
  title?: string
  subtitle?: string
  items: TimelineItem[]
}

export function Timeline({
  title = 'Nuestra Historia',
  subtitle,
  items,
}: TimelineProps) {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-16 lg:py-24">
      <Container>
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
          {subtitle && <p className="mt-4 text-lg text-gray-600">{subtitle}</p>}
        </div>

        {/* Timeline */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-600 to-primary-300 md:left-1/2" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 flex h-4 w-4 items-center justify-center md:left-1/2 md:-translate-x-1/2">
                    <div className="h-4 w-4 rounded-full border-4 border-white bg-primary-600 ring-4 ring-primary-100" />
                  </div>

                  {/* Content Card */}
                  <div
                    className={`ml-16 w-full md:ml-0 md:w-5/12 ${
                      index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                    }`}
                  >
                    <div className="group rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl hover:ring-primary-300">
                      {/* Year Badge */}
                      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5">
                        <CheckCircle className="h-4 w-4 text-primary-700" />
                        <span className="text-sm font-bold text-primary-900">{item.year}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-primary-700">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="mt-3 text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-5/12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
