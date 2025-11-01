import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export default function DMCAPage() {
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
        <h1 className="text-4xl font-bold mb-8">Politique DMCA</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Notre engagement</h2>
            <p className="mb-4">
              AI Cleaner respecte les droits de propriété intellectuelle d'autrui et attend de ses utilisateurs qu'ils fassent de même. Notre service est conçu pour être utilisé uniquement sur des contenus dont l'utilisateur détient les droits.
            </p>
            <p className="mb-4">
              Nous prenons très au sérieux toute violation des droits d'auteur et répondrons rapidement aux notifications conformes au Digital Millennium Copyright Act (DMCA).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Notification de violation</h2>
            <p className="mb-4">
              Si vous pensez que votre œuvre protégée par le droit d'auteur a été utilisée de manière inappropriée via notre service, veuillez nous envoyer une notification écrite contenant les informations suivantes :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Une signature physique ou électronique de la personne autorisée à agir au nom du propriétaire du droit d'auteur</li>
              <li>Une description de l'œuvre protégée qui aurait été violée</li>
              <li>Une description de l'endroit où se trouve le contenu présumé contrefait sur notre service</li>
              <li>Vos coordonnées (adresse, téléphone, email)</li>
              <li>Une déclaration attestant que vous croyez de bonne foi que l'utilisation contestée n'est pas autorisée</li>
              <li>Une déclaration, sous peine de parjure, que les informations fournies sont exactes et que vous êtes autorisé à agir au nom du propriétaire</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Envoi de la notification</h2>
            <p className="mb-4">
              Envoyez votre notification DMCA à :
            </p>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="font-semibold">Email :</p>
              <p>dmca@aicleaner.com</p>
              <p className="font-semibold mt-4">Objet :</p>
              <p>DMCA Takedown Request</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Procédure de traitement</h2>
            <p className="mb-4">
              Lorsque nous recevons une notification DMCA valide :
            </p>
            <ol className="list-decimal pl-6 mb-4">
              <li className="mb-2">Nous examinerons la notification dans les 24 heures</li>
              <li className="mb-2">Si la notification est valide, nous supprimerons le contenu concerné</li>
              <li className="mb-2">Nous notifierons l'utilisateur concerné de la suppression</li>
              <li className="mb-2">En cas de récidive, nous suspendrons le compte de l'utilisateur</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Contre-notification</h2>
            <p className="mb-4">
              Si vous pensez que votre contenu a été supprimé par erreur, vous pouvez soumettre une contre-notification contenant :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Votre signature physique ou électronique</li>
              <li>L'identification du contenu supprimé</li>
              <li>Une déclaration sous peine de parjure que vous croyez de bonne foi que le contenu a été supprimé par erreur</li>
              <li>Votre nom, adresse, téléphone et consentement à la juridiction</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Politique de récidive</h2>
            <p className="mb-4">
              Nous maintenons une politique de suspension des comptes des utilisateurs qui violent de manière répétée les droits d'auteur. Les utilisateurs ayant reçu plusieurs notifications DMCA verront leur compte définitivement suspendu.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Fausses déclarations</h2>
            <p className="mb-4">
              Veuillez noter que soumettre une fausse notification DMCA peut entraîner des conséquences légales, y compris des dommages et intérêts et des frais d'avocat.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <p className="mb-4">
              Pour toute question concernant cette politique DMCA :
            </p>
            <p className="mb-4">
              Email : dmca@aicleaner.com<br />
              Support général : support@aicleaner.com
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
