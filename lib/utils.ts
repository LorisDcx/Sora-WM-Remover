import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCredits(credits: number): string {
  return credits.toLocaleString('fr-FR')
}

export function calculateCost(type: 'image' | 'video', quality: 'SD' | 'HD' | '4K', duration?: number): number {
  if (type === 'image') {
    return quality === 'HD' ? 5 : 1
  }
  
  // Video cost per second
  const costPerSecond = quality === '4K' ? 16 : quality === 'HD' ? 8 : 4
  return Math.ceil((duration || 1) * costPerSecond)
}
