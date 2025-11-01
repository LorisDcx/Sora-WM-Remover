'use client'

import { Coins } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { formatCredits } from '@/lib/utils'
import Link from 'next/link'

interface CreditDisplayProps {
  credits: number
  estimatedCost?: number
}

export function CreditDisplay({ credits, estimatedCost }: CreditDisplayProps) {
  const hasEnoughCredits = !estimatedCost || credits >= estimatedCost

  return (
    <Card className={!hasEnoughCredits ? 'border-orange-500' : ''}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <Coins className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Crédits disponibles</p>
              <p className="text-2xl font-bold">{formatCredits(credits)}</p>
            </div>
          </div>

          {estimatedCost && (
            <div className="text-right">
              <p className="text-sm text-gray-600">Coût estimé</p>
              <p className={`text-xl font-semibold ${hasEnoughCredits ? 'text-green-600' : 'text-orange-600'}`}>
                {formatCredits(estimatedCost)} crédits
              </p>
            </div>
          )}
        </div>

        {!hasEnoughCredits && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-orange-600 mb-2">
              Crédits insuffisants pour ce traitement
            </p>
            <Link href="/pricing">
              <Button className="w-full" size="sm">
                Acheter des crédits
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
