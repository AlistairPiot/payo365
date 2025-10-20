import Link from 'next/link'
import { Footer } from '@/components/footer'

export default function CGVPage() {
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
            Conditions Générales de Vente (CGV)
          </h1>

          <p className="text-sm text-gray-500 mb-8">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>

          <div className="prose prose-indigo max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Objet</h2>
              <p className="text-gray-700 mb-4">
                Les présentes Conditions Générales de Vente (CGV) régissent la relation commerciale entre Payo365
                (ci-après "le Service") et tout professionnel ou particulier (ci-après "l'Utilisateur") souhaitant
                utiliser les services de création de liens de paiement proposés par Payo365.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description du service</h2>
              <p className="text-gray-700 mb-4">
                Payo365 est une plateforme SaaS permettant aux utilisateurs de :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Créer des liens de paiement personnalisés</li>
                <li>Recevoir des paiements en ligne via Stripe</li>
                <li>Gérer et suivre leurs transactions</li>
                <li>Accéder à un tableau de bord avec statistiques</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Tarification</h2>
              <p className="text-gray-700 mb-4">
                <strong>Modèle de tarification :</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Aucun abonnement mensuel</li>
                <li>Commission unique de 8% sur chaque transaction réussie (tout inclus)</li>
                <li>Les frais de traitement (Stripe, etc.) sont inclus dans la commission de 8%</li>
                <li>Aucun frais caché ou supplémentaire</li>
              </ul>
              <p className="text-gray-700 mb-4">
                La commission de 8% est automatiquement prélevée lors de chaque paiement effectué via un lien Payo365.
                Ce tarif tout inclus couvre l'ensemble des frais de traitement, vous permettant de savoir exactement combien vous recevrez.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Inscription et compte</h2>
              <p className="text-gray-700 mb-4">
                Pour utiliser Payo365, l'Utilisateur doit :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Créer un compte via authentification Google</li>
                <li>Connecter un compte Stripe Connect pour recevoir les paiements</li>
                <li>Fournir des informations exactes et à jour</li>
                <li>Maintenir la confidentialité de ses identifiants</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Obligations de l'Utilisateur</h2>
              <p className="text-gray-700 mb-4">
                L'Utilisateur s'engage à :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Utiliser le service de manière conforme à la législation en vigueur</li>
                <li>Ne pas utiliser le service pour des activités illégales ou frauduleuses</li>
                <li>Respecter les conditions d'utilisation de Stripe</li>
                <li>Fournir des descriptions de produits/services honnêtes et précises</li>
                <li>Traiter les litiges clients de bonne foi</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Paiements et remboursements</h2>
              <p className="text-gray-700 mb-4">
                <strong>Traitement des paiements :</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Les paiements sont traités par Stripe</li>
                <li>Les fonds sont versés directement sur le compte Stripe Connect de l'Utilisateur</li>
                <li>Payo365 ne détient jamais les fonds des transactions</li>
              </ul>
              <p className="text-gray-700 mb-4">
                <strong>Remboursements :</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Les remboursements aux clients finaux sont à la discrétion de l'Utilisateur</li>
                <li>En cas de remboursement, la commission Payo365 reste acquise</li>
                <li>L'Utilisateur doit gérer les remboursements via son compte Stripe</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Responsabilité</h2>
              <p className="text-gray-700 mb-4">
                Payo365 agit en tant qu'intermédiaire technique et ne peut être tenu responsable :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Des litiges entre l'Utilisateur et ses clients</li>
                <li>De la qualité des produits ou services vendus</li>
                <li>Des interruptions de service Stripe</li>
                <li>Des pertes financières liées à l'utilisation du service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Résiliation</h2>
              <p className="text-gray-700 mb-4">
                L'Utilisateur peut résilier son compte à tout moment. Payo365 se réserve le droit de suspendre
                ou résilier un compte en cas de :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Violation des présentes CGV</li>
                <li>Activité frauduleuse ou illégale</li>
                <li>Taux de litiges anormalement élevé</li>
                <li>Non-respect des conditions de Stripe</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Modifications des CGV</h2>
              <p className="text-gray-700 mb-4">
                Payo365 se réserve le droit de modifier les présentes CGV à tout moment. Les Utilisateurs
                seront informés par email des modifications importantes au moins 30 jours avant leur entrée en vigueur.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Loi applicable et juridiction</h2>
              <p className="text-gray-700 mb-4">
                Les présentes CGV sont régies par le droit français. Tout litige sera soumis à la compétence
                exclusive des tribunaux français.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact</h2>
              <p className="text-gray-700 mb-4">
                Pour toute question concernant ces CGV, vous pouvez nous contacter à : alistair.piot@gmail.com
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
