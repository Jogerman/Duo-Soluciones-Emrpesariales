import * as React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

export interface StatCardProps {
  value: string | number
  label: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  className?: string
}

/**
 * StatCard - Display metrics and statistics
 * Features large number display with optional trend indicator
 */
export function StatCard({ value, label, trend, trendValue, className }: StatCardProps) {
  return (
    <Card className={cn('text-center', className)}>
      <CardContent className="pt-6">
        <div className="mb-2 text-4xl font-bold text-neutral-900">{value}</div>
        <div className="text-sm font-medium text-neutral-600">{label}</div>

        {trend && trendValue && (
          <div className="mt-3 flex items-center justify-center gap-1">
            {trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
            {trend === 'down' && <TrendingDown className="h-4 w-4 text-red-500" />}
            <span
              className={cn(
                'text-sm font-medium',
                trend === 'up' && 'text-green-600',
                trend === 'down' && 'text-red-600',
                trend === 'neutral' && 'text-neutral-600'
              )}
            >
              {trendValue}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
