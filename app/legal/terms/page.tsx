import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export default function TermsPage() {
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
        <h1 className="text-4xl font-bold mb-8">Conditions Générales d'Utilisation</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Acceptation des conditions</h2>
            <p className="mb-4">
              En accédant et en utilisant AI Video & Image Cleaner (ci-après "le Service"), vous acceptez d'être lié par les présentes Conditions Générales d'Utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Utilisation légale uniquement</h2>
            <p className="mb-4">
              <strong className="text-red-600">IMPORTANT :</strong> Le Service est conçu exclusivement pour être utilisé sur des contenus dont vous détenez les droits d'auteur ou pour lesquels vous avez obtenu l'autorisation explicite du détenteur des droits.
            </p>
            <p className="mb-4">
              Il est strictement interdit d'utiliser le Service pour :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Retirer des filigranes, logos ou marques de contenus protégés par des tiers</li>
              <li>Modifier des œuvres protégées sans autorisation</li>
              <li>Contourner des mesures de protection technique</li>
              <li>Violer les droits de propriété intellectuelle de tiers</li>
              <li>Toute activité illégale ou frauduleuse</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Responsabilité de l'utilisateur</h2>
            <p className="mb-4">
              Vous êtes seul responsable de l'utilisation que vous faites du Service. Vous vous engagez à :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Respecter toutes les lois applicables</li>
              <li>Ne traiter que des contenus dont vous détenez les droits</li>
              <li>Obtenir toutes les autorisations nécessaires avant traitement</li>
              <li>Indemniser AI Cleaner contre toute réclamation résultant de votre utilisation du Service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Système de crédits</h2>
            <p className="mb-4">
              Le Service fonctionne sur un système de crédits :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>20 crédits gratuits sont offerts à l'inscription</li>
              <li>Les crédits achetés n'ont pas de date d'expiration</li>
              <li>Les crédits ne sont pas remboursables</li>
              <li>Les crédits sont consommés lors du traitement réussi d'un fichier</li>
              <li>Le coût en crédits est affiché avant chaque traitement</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Paiements</h2>
            <p className="mb-4">
              Les paiements sont traités de manière sécurisée via Stripe. Nous n'avons pas accès à vos informations de carte bancaire. Tous les prix sont en euros TTC.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Stockage et suppression des fichiers</h2>
            <p className="mb-4">
              Les fichiers uploadés sont automatiquement supprimés de nos serveurs après 48 heures maximum. Nous ne conservons pas vos fichiers au-delà de cette période.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Limitation de garantie</h2>
            <p className="mb-4">
              Le Service est fourni "tel quel" sans garantie d'aucune sorte. Nous ne garantissons pas que le Service sera ininterrompu ou exempt d'erreurs.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Suspension et résiliation</h2>
            <p className="mb-4">
              Nous nous réservons le droit de suspendre ou de résilier votre accès au Service en cas de violation des présentes conditions, notamment en cas d'utilisation illégale.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">9. Modifications</h2>
            <p className="mb-4">
              Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications seront publiées sur cette page avec une nouvelle date de mise à jour.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">10. Contact</h2>
            <p className="mb-4">
              Pour toute question concernant ces conditions, contactez-nous à : support@aicleaner.com
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
