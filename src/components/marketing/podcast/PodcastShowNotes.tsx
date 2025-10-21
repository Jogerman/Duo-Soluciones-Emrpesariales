'use client'

import { FileText } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'

interface PodcastShowNotesProps {
  showNotes?: string
}

/**
 * PodcastShowNotes component displays formatted show notes
 * Features: markdown-style formatting, proper typography
 */
export function PodcastShowNotes({ showNotes }: PodcastShowNotesProps) {
  if (!showNotes) {
    return null
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="mb-4 flex items-center gap-2 font-semibold text-xl text-neutral-900">
          <FileText className="h-5 w-5 text-primary-600" />
          Show Notes
        </h3>

        <div className="prose prose-neutral max-w-none">
          {showNotes.split('\n').map((line, index) => {
            // Check for headers (## Header)
            if (line.startsWith('### ')) {
              return (
                <h4 key={index} className="mb-2 mt-6 font-semibold text-base text-neutral-900">
                  {line.replace('### ', '')}
                </h4>
              )
            }

            if (line.startsWith('## ')) {
              return (
                <h3 key={index} className="mb-3 mt-6 font-semibold text-lg text-neutral-900">
                  {line.replace('## ', '')}
                </h3>
              )
            }

            // Check for list items (- Item)
            if (line.trim().startsWith('- ')) {
              return (
                <li key={index} className="ml-6 text-neutral-700">
                  {line.replace(/^-\s*/, '')}
                </li>
              )
            }

            // Check for bold text (**text**)
            if (line.includes('**')) {
              const parts = line.split(/\*\*(.*?)\*\*/)
              return (
                <p key={index} className="mb-3 text-neutral-700">
                  {parts.map((part, i) =>
                    i % 2 === 0 ? (
                      part
                    ) : (
                      <strong key={i} className="font-semibold text-neutral-900">
                        {part}
                      </strong>
                    )
                  )}
                </p>
              )
            }

            // Check for timestamps in brackets [MM:SS]
            const timestampMatch = line.match(/^(\[[\d:]+\])\s*(.*)/)
            if (timestampMatch) {
              const [, timestamp, text] = timestampMatch
              return (
                <p key={index} className="mb-2 text-neutral-700">
                  <span className="mr-2 font-mono text-sm text-primary-600">{timestamp}</span>
                  <span>{text}</span>
                </p>
              )
            }

            // Regular paragraph
            if (line.trim()) {
              return (
                <p key={index} className="mb-3 text-neutral-700">
                  {line}
                </p>
              )
            }

            return <br key={index} />
          })}
        </div>
      </CardContent>
    </Card>
  )
}
