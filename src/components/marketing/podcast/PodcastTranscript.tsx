'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, FileText } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { estimateReadingTime } from '@/lib/utils/podcast'

interface PodcastTranscriptProps {
  transcript?: string
}

/**
 * PodcastTranscript component displays a collapsible transcript
 * Features: expand/collapse functionality, reading time estimate
 */
export function PodcastTranscript({ transcript }: PodcastTranscriptProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!transcript) {
    return null
  }

  const readingTime = estimateReadingTime(transcript)

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="mb-1 flex items-center gap-2 font-semibold text-xl text-neutral-900">
              <FileText className="h-5 w-5 text-primary-600" />
              Transcripción
            </h3>
            <p className="text-sm text-neutral-600">Tiempo de lectura: {readingTime} min</p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="shrink-0"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Ocultar
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Ver transcripción
              </>
            )}
          </Button>
        </div>

        {/* Transcript Content */}
        {isExpanded && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-6">
              <div className="prose prose-sm max-w-none text-neutral-700">
                {transcript.split('\n').map((line, index) => {
                  // Check if line is a timestamp [MM:SS]
                  const timestampMatch = line.match(/^\[(\d{2}:\d{2})\](.*)/)

                  if (timestampMatch) {
                    const [, timestamp, text] = timestampMatch
                    return (
                      <p key={index} className="mb-3">
                        <span className="mr-2 font-mono text-xs text-primary-600">{timestamp}</span>
                        <span>{text.trim()}</span>
                      </p>
                    )
                  }

                  // Regular line
                  if (line.trim()) {
                    return (
                      <p key={index} className="mb-3">
                        {line}
                      </p>
                    )
                  }

                  return <br key={index} />
                })}
              </div>
            </div>

            {/* Collapse button at bottom */}
            <div className="mt-4 text-center">
              <Button variant="ghost" size="sm" onClick={() => setIsExpanded(false)}>
                <ChevronUp className="h-4 w-4" />
                Ocultar transcripción
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
