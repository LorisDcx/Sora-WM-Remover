import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl">AI Cleaner</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Politique de Confidentialité</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="mb-4">
              AI Cleaner s'engage à protéger votre vie privée. Cette politique explique quelles données nous collectons, comment nous les utilisons et vos droits concernant ces données.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Données collectées</h2>
            <h3 className="text-xl font-semibold mb-3">2.1 Données de compte</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Adresse email</li>
              <li>Nom (si fourni via Google)</li>
              <li>Date de création du compte</li>
              <li>Solde de crédits</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">2.2 Données de traitement</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Fichiers uploadés (supprimés après 48h)</li>
              <li>Historique des traitements (limité)</li>
              <li>Consommation de crédits</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">2.3 Données de paiement</h3>
            <p className="mb-4">
              Les paiements sont traités par Stripe. Nous ne stockons pas vos informations de carte bancaire. Stripe collecte et traite ces données selon sa propre politique de confidentialité.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Utilisation des données</h2>
            <p className="mb-4">Nous utilisons vos données pour :</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Fournir et améliorer le Service</li>
              <li>Gérer votre compte et vos crédits</li>
              <li>Traiter vos paiements</li>
              <li>Vous contacter concernant le Service</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Stockage et sécurité</h2>
            <p className="mb-4">
              Vos données sont stockées de manière sécurisée sur Firebase (Google Cloud). Les fichiers uploadés sont automatiquement supprimés après 48 heures maximum.
            </p>
            <p className="mb-4">
              Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données contre tout accès non autorisé, perte ou destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Partage des données</h2>
            <p className="mb-4">
              Nous ne vendons jamais vos données. Nous pouvons partager vos données avec :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Stripe (pour le traitement des paiements)</li>
              <li>Firebase/Google Cloud (hébergement)</li>
              <li>Replicate (traitement IA des fichiers)</li>
              <li>Autorités légales (si requis par la loi)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Vos droits (RGPD)</h2>
            <p className="mb-4">Vous avez le droit de :</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Accéder à vos données personnelles</li>
              <li>Rectifier vos données</li>
              <li>Supprimer votre compte et vos données</li>
              <li>Vous opposer au traitement de vos données</li>
              <li>Exporter vos données (portabilité)</li>
              <li>Retirer votre consentement</li>
            </ul>
            <p className="mb-4">
              Pour exercer ces droits, contactez-nous à : support@aicleaner.com
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Cookies</h2>
            <p className="mb-4">
              Nous utilisons des cookies essentiels pour le fonctionnement du Service (authentification, session). Nous n'utilisons pas de cookies publicitaires ou de tracking tiers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Conservation des données</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>Fichiers uploadés : supprimés après 48h</li>
              <li>Données de compte : conservées tant que le compte est actif</li>
              <li>Historique des transactions : conservé pour obligations légales (5 ans)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">9. Modifications</h2>
            <p className="mb-4">
              Nous pouvons modifier cette politique à tout moment. Les modifications seront publiées sur cette page avec une nouvelle date de mise à jour.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">10. Contact</h2>
            <p className="mb-4">
              Pour toute question concernant cette politique : support@aicleaner.com
            </p>
          </section>
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
