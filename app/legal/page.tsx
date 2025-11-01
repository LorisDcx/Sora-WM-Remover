import Link from 'next/link'
import { Sparkles, FileText, Shield, AlertTriangle } from 'lucide-react'

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl">AI Cleaner</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-4xl font-bold mb-4">Mentions Légales</h1>
        <p className="text-gray-600 mb-12">
          Toutes les informations légales concernant l'utilisation d'AI Cleaner
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/legal/terms" className="block">
            <div className="border rounded-lg p-6 hover:shadow-lg transition cursor-pointer h-full bg-white">
              <div className="mb-4 p-3 bg-blue-100 rounded-full w-fit">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Conditions Générales</h3>
              <p className="text-gray-600 text-sm">
                Conditions d'utilisation du service, responsabilités et engagements
              </p>
            </div>
          </Link>

          <Link href="/legal/privacy" className="block">
            <div className="border rounded-lg p-6 hover:shadow-lg transition cursor-pointer h-full bg-white">
              <div className="mb-4 p-3 bg-green-100 rounded-full w-fit">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Confidentialité</h3>
              <p className="text-gray-600 text-sm">
                Comment nous collectons, utilisons et protégeons vos données
              </p>
            </div>
          </Link>

          <Link href="/legal/dmca" className="block">
            <div className="border rounded-lg p-6 hover:shadow-lg transition cursor-pointer h-full bg-white">
              <div className="mb-4 p-3 bg-orange-100 rounded-full w-fit">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Politique DMCA</h3>
              <p className="text-gray-600 text-sm">
                Procédure de signalement des violations de droits d'auteur
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-12 border border-blue-200 rounded-lg p-6 bg-blue-50">
          <h3 className="text-xl font-semibold mb-4">Utilisation Légale Uniquement</h3>
          <p className="text-gray-700 mb-4">
            AI Cleaner est conçu pour être utilisé <strong>uniquement sur des contenus dont vous détenez les droits</strong>. 
            L'utilisation de notre service pour retirer des filigranes, logos ou éléments de contenus protégés par des tiers est strictement interdite et peut entraîner :
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>La suspension immédiate de votre compte</li>
            <li>Des poursuites judiciaires de la part des détenteurs de droits</li>
            <li>Des sanctions pénales selon les lois applicables</li>
          </ul>
          <p className="text-gray-700 mt-4">
            Nous coopérons pleinement avec les autorités et les détenteurs de droits pour faire respecter la loi.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Retour à l'accueil
          </Link>
        </div>
      </main>
    </div>
  )
}
