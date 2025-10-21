'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { clients, type IndustryType } from '@/lib/mock-data/clients'

export function ClientGrid() {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType | 'Todos'>('Todos')

  // Filter clients by industry
  const filteredClients =
    selectedIndustry === 'Todos'
      ? clients
      : clients.filter(client => client.industry === selectedIndustry)

  // Industry filter options
  const industryFilters: Array<IndustryType | 'Todos'> = [
    'Todos',
    'Banca',
    'Salud',
    'Manufactura',
    'Retail',
    'Tecnología',
    'Gobierno',
  ]

  return (
    <>
      {/* Industry Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {industryFilters.map(industry => (
          <Button
            key={industry}
            variant={selectedIndustry === industry ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedIndustry(industry)}
            className="transition-all duration-200"
          >
            {industry}
          </Button>
        ))}
      </div>

      {/* Client Grid */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {filteredClients.map(client => (
          <Card
            key={client.id}
            className="group transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-primary-300"
          >
            <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[160px]">
              {/* Placeholder for logo - using company initials */}
              <div className="w-full aspect-video flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg mb-4 group-hover:from-primary-100 group-hover:to-primary-200 transition-colors">
                <span className="text-2xl font-bold text-primary-700">
                  {client.name
                    .split(' ')
                    .slice(0, 2)
                    .map(word => word[0])
                    .join('')}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 text-center line-clamp-2">
                {client.name}
              </h3>
              <Badge variant="secondary" className="mt-2 text-xs">
                {client.industry}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No hay clientes disponibles en esta categoría actualmente.
          </p>
        </div>
      )}
    </>
  )
}
