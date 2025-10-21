'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Linkedin, Building2 } from 'lucide-react'
import { PodcastGuest } from '@/types/content'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface PodcastGuestsProps {
  guests: PodcastGuest[]
}

/**
 * PodcastGuests component displays guest profile cards
 * Features: avatar, name, role, company, bio, LinkedIn link
 */
export function PodcastGuests({ guests }: PodcastGuestsProps) {
  if (!guests || guests.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-xl text-neutral-900">
        {guests.length === 1 ? 'Invitado' : 'Invitados'}
      </h3>

      <div className="grid gap-6 md:grid-cols-2">
        {guests.map(guest => (
          <Card key={guest.id} className="overflow-hidden">
            <CardContent className="p-6">
              {/* Avatar and Basic Info */}
              <div className="mb-4 flex items-start gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-neutral-100">
                  <Image src={guest.avatar} alt={guest.name} fill className="object-cover" />
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="mb-1 font-semibold text-lg text-neutral-900">{guest.name}</h4>
                  <p className="mb-1 text-sm text-neutral-600">{guest.role}</p>
                  {guest.company && (
                    <div className="flex items-center gap-1 text-xs text-neutral-500">
                      <Building2 className="h-3 w-3" />
                      <span>{guest.company}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bio */}
              {guest.bio && (
                <p className="mb-4 text-sm text-neutral-600 leading-relaxed">{guest.bio}</p>
              )}

              {/* LinkedIn Link */}
              {guest.linkedin && (
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href={guest.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                    Conectar en LinkedIn
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
