'use client'

import { Container } from '@/components/ui/Container'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image?: string
  email?: string
  linkedin?: string
  specialties?: string[]
}

interface TeamGridProps {
  title?: string
  subtitle?: string
  members: TeamMember[]
  variant?: '2-col' | '3-col' | '4-col'
}

export function TeamGrid({
  title = 'Conoce a Nuestro Equipo',
  subtitle = 'Profesionales certificados con experiencia global y conocimiento local',
  members,
  variant = '3-col',
}: TeamGridProps) {
  const gridClasses = {
    '2-col': 'md:grid-cols-2',
    '3-col': 'md:grid-cols-2 lg:grid-cols-3',
    '4-col': 'md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <section className="py-16 lg:py-24">
      <Container>
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
          {subtitle && <p className="mt-4 text-lg text-gray-600">{subtitle}</p>}
        </div>

        {/* Team Grid */}
        <div className={`mt-12 grid gap-8 ${gridClasses[variant]}`}>
          {members.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </Container>
    </section>
  )
}

interface TeamMemberCardProps {
  member: TeamMember
}

function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl">
      <CardHeader className="p-0">
        {/* Member Photo */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200">
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-6xl font-bold text-primary-700">
                {member.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </span>
            </div>
          )}

          {/* Social Links Overlay */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 bg-primary-900/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {member.linkedin && (
              <Link
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary-700 transition-transform hover:scale-110"
                aria-label={`LinkedIn profile of ${member.name}`}
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            )}
            {member.email && (
              <Link
                href={`mailto:${member.email}`}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary-700 transition-transform hover:scale-110"
                aria-label={`Email ${member.name}`}
              >
                <Mail className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Name and Role */}
        <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
        <p className="mt-1 font-medium text-primary-600">{member.role}</p>

        {/* Bio */}
        <p className="mt-4 text-sm leading-relaxed text-gray-600">{member.bio}</p>

        {/* Specialties */}
        {member.specialties && member.specialties.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {member.specialties.slice(0, 3).map((specialty, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
            {member.specialties.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{member.specialties.length - 3} más
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
