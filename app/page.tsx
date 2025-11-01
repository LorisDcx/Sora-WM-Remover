'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, Upload, Wand2, Download, Check } from 'lucide-react'
import Link from 'next/link'
import { CREDIT_PACKS } from '@/lib/stripe'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl">AI Cleaner</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm hover:text-blue-600 transition">
              Fonctionnalités
            </Link>
            <Link href="#pricing" className="text-sm hover:text-blue-600 transition">
              Tarifs
            </Link>
            <Link href="/legal" className="text-sm hover:text-blue-600 transition">
              Légal
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Connexion
              </Button>
            </Link>
            <Link href="/app">
              <Button size="sm">
                Essayer gratuitement
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Nettoyez vos vidéos et images en toute légalité grâce à l'IA
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Supprimez les filigranes, logos ou objets indésirables de vos propres contenus en quelques secondes.
          </p>
          <p className="text-lg text-gray-500 mb-10">
            Conçu pour les créateurs, vidéastes et designers qui veulent sublimer leurs productions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/app">
              <Button size="lg" className="text-lg px-8">
                Essayer gratuitement - 20 crédits offerts
              </Button>
            </Link>
            <Link href="#pricing">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Voir les tarifs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Comment ça marche ?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Upload className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>1. Uploadez</CardTitle>
              <CardDescription>
                Importez votre image ou vidéo (formats supportés: JPG, PNG, MP4, MOV)
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Wand2 className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>2. Sélectionnez</CardTitle>
              <CardDescription>
                Marquez la zone à nettoyer avec notre outil de sélection intuitif
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Download className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>3. Téléchargez</CardTitle>
              <CardDescription>
                L'IA traite votre fichier et vous pouvez télécharger le résultat
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Tarifs simples et transparents</h2>
          <p className="text-center text-gray-600 mb-12">
            Pas d'abonnement. Pas d'engagement. Rechargez simplement vos crédits quand vous en avez besoin.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {CREDIT_PACKS.map((pack) => (
              <Card key={pack.id} className={pack.popular ? 'border-blue-600 border-2 relative' : ''}>
                {pack.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Populaire
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{pack.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{pack.price}€</span>
                  </div>
                  <CardDescription className="mt-2">
                    {pack.credits} crédits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5" />
                      <span className="text-sm">Crédits sans expiration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5" />
                      <span className="text-sm">{pack.pricePerCredit}€ par crédit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5" />
                      <span className="text-sm">Support prioritaire</span>
                    </li>
                  </ul>
                  <Link href="/app">
                    <Button className="w-full" variant={pack.popular ? 'default' : 'outline'}>
                      Choisir ce pack
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-600 mb-4">Consommation de crédits :</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white px-4 py-2 rounded-lg">Image HD: 5 crédits</span>
              <span className="bg-white px-4 py-2 rounded-lg">Vidéo 1s HD: 8 crédits</span>
              <span className="bg-white px-4 py-2 rounded-lg">Vidéo 1s 4K: 16 crédits</span>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Notice */}
      <section className="container mx-auto px-4 py-12 bg-blue-50">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-xl font-semibold mb-4">Utilisation 100% légale</h3>
          <p className="text-gray-700">
            Notre service est conçu pour être utilisé uniquement sur des contenus dont vous détenez les droits. 
            L'utilisation de cet outil sur des contenus protégés par des tiers est strictement interdite.
          </p>
          <Link href="/legal" className="text-blue-600 hover:underline mt-4 inline-block">
            Lire nos conditions d'utilisation →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-blue-600" />
                <span className="font-bold">AI Cleaner</span>
              </div>
              <p className="text-sm text-gray-600">
                Nettoyez vos contenus avec l'IA
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Produit</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="#features" className="hover:text-blue-600">Fonctionnalités</Link></li>
                <li><Link href="#pricing" className="hover:text-blue-600">Tarifs</Link></li>
                <li><Link href="/app" className="hover:text-blue-600">Essayer</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Légal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/legal/terms" className="hover:text-blue-600">CGU</Link></li>
                <li><Link href="/legal/privacy" className="hover:text-blue-600">Confidentialité</Link></li>
                <li><Link href="/legal/dmca" className="hover:text-blue-600">DMCA</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>support@aicleaner.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
            © 2024 AI Cleaner. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  )
}
