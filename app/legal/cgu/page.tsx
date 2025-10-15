import Link from 'next/link'
import { Footer } from '@/components/footer'

export default function CGUPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xl px-4 py-2 rounded-lg">
                Payo365
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Conditions Générales d'Utilisation (CGU)
          </h1>

          <p className="text-sm text-gray-500 mb-8">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>

          <div className="prose prose-indigo max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptation des conditions</h2>
              <p className="text-gray-700 mb-4">
                En accédant et en utilisant Payo365, vous acceptez d'être lié par les présentes Conditions
                Générales d'Utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Définitions</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Service :</strong> La plateforme Payo365 et tous ses services associés</li>
                <li><strong>Utilisateur :</strong> Toute personne physique ou morale utilisant le Service</li>
                <li><strong>Lien de paiement :</strong> URL unique permettant de recevoir un paiement</li>
                <li><strong>Transaction :</strong> Paiement effectué via un lien de paiement Payo365</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Accès au service</h2>
              <p className="text-gray-700 mb-4">
                <strong>Inscription :</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>L'inscription est gratuite et nécessite une authentification Google</li>
                <li>Vous devez avoir au moins 18 ans pour utiliser le service</li>
                <li>Un seul compte par utilisateur est autorisé</li>
                <li>Vous êtes responsable de la confidentialité de vos identifiants</li>
              </ul>
              <p className="text-gray-700 mb-4">
                <strong>Connexion Stripe :</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Un compte Stripe Connect est requis pour recevoir des paiements</li>
                <li>Vous devez respecter les conditions d'utilisation de Stripe</li>
                <li>Vous êtes responsable de la véracité des informations fournies à Stripe</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Utilisation du service</h2>
              <p className="text-gray-700 mb-4">
                <strong>Utilisations autorisées :</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Vente de produits ou services légaux</li>
                <li>Acceptation de dons ou contributions</li>
                <li>Facturation de prestations professionnelles</li>
                <li>Toute activité commerciale légale</li>
              </ul>
              <p className="text-gray-700 mb-4">
                <strong>Utilisations interdites :</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Activités illégales ou frauduleuses</li>
                <li>Vente de produits contrefaits ou volés</li>
                <li>Blanchiment d'argent</li>
                <li>Activités interdites par Stripe (armes, contenus pour adultes, etc.)</li>
                <li>Manipulation des prix ou fausses descriptions</li>
                <li>Collecte de fonds pour des causes illégales</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Droits et propriété intellectuelle</h2>
              <p className="text-gray-700 mb-4">
                Le Service, son contenu, ses fonctionnalités et tous les droits de propriété intellectuelle associés
                appartiennent à Payo365. Vous ne pouvez pas :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Copier, modifier ou distribuer le code source du Service</li>
                <li>Utiliser le nom ou le logo Payo365 sans autorisation</li>
                <li>Tenter de contourner les mesures de sécurité</li>
                <li>Créer un service concurrent en utilisant nos ressources</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Données et confidentialité</h2>
              <p className="text-gray-700 mb-4">
                La collecte et l'utilisation de vos données personnelles sont régies par notre{' '}
                <Link href="/legal/confidentialite" className="text-indigo-600 hover:underline">
                  Politique de confidentialité
                </Link>
                .
              </p>
              <p className="text-gray-700 mb-4">
                Vous conservez la propriété de vos données et pouvez demander leur suppression à tout moment.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Disponibilité du service</h2>
              <p className="text-gray-700 mb-4">
                Nous nous efforçons de maintenir le Service disponible 24/7, mais nous ne garantissons pas :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Une disponibilité ininterrompue du Service</li>
                <li>L'absence d'erreurs ou de bugs</li>
                <li>La compatibilité avec tous les appareils ou navigateurs</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Des maintenances programmées pourront être effectuées avec préavis.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitation de responsabilité</h2>
              <p className="text-gray-700 mb-4">
                Payo365 ne pourra être tenu responsable :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Des pertes financières liées à l'utilisation du Service</li>
                <li>Des interruptions de service Stripe ou d'autres services tiers</li>
                <li>Des litiges entre vous et vos clients</li>
                <li>De la perte de données due à des événements hors de notre contrôle</li>
                <li>Des dommages indirects ou consécutifs</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Suspension et résiliation</h2>
              <p className="text-gray-700 mb-4">
                <strong>Suspension :</strong> Nous pouvons suspendre votre compte temporairement en cas de :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Activité suspecte ou frauduleuse</li>
                <li>Violation des présentes CGU</li>
                <li>Demande des autorités compétentes</li>
              </ul>
              <p className="text-gray-700 mb-4">
                <strong>Résiliation :</strong> Vous pouvez résilier votre compte à tout moment. Nous pouvons
                résilier votre compte en cas de violation grave ou répétée des CGU.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Modifications des CGU</h2>
              <p className="text-gray-700 mb-4">
                Nous nous réservons le droit de modifier ces CGU à tout moment. Les modifications importantes
                vous seront notifiées par email au moins 30 jours avant leur entrée en vigueur. L'utilisation
                continue du Service après l'entrée en vigueur des modifications vaut acceptation.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Droit applicable</h2>
              <p className="text-gray-700 mb-4">
                Les présentes CGU sont régies par le droit français. Tout litige relatif à leur interprétation
                ou leur exécution relève de la compétence exclusive des tribunaux français.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact</h2>
              <p className="text-gray-700 mb-4">
                Pour toute question concernant ces CGU, contactez-nous à : alistair.piot@gmail.com
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-700 group cursor-pointer"
            >
              <svg
                className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
