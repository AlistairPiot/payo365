import Link from 'next/link'
import { Footer } from '@/components/footer'

export default function ConfidentialitePage() {
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
            Politique de Confidentialité
          </h1>

          <p className="text-sm text-gray-500 mb-8">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>

          <div className="prose prose-indigo max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Payo365 s'engage à protéger la confidentialité et la sécurité de vos données personnelles.
                Cette politique explique comment nous collectons, utilisons, stockons et protégeons vos
                informations conformément au Règlement Général sur la Protection des Données (RGPD).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Responsable du traitement</h2>
              <p className="text-gray-700 mb-4">
                Le responsable du traitement des données est Payo365.
              </p>
              <p className="text-gray-700 mb-4">
                Contact : alistair.piot@gmail.com
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Données collectées</h2>
              <p className="text-gray-700 mb-4">
                <strong>Lors de l'inscription (via Google OAuth) :</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Photo de profil Google</li>
                <li>Identifiant Google unique</li>
              </ul>
              <p className="text-gray-700 mb-4">
                <strong>Lors de la connexion Stripe Connect :</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Identifiant de compte Stripe</li>
                <li>Informations transmises à Stripe (nom, adresse, informations bancaires, etc.)</li>
                <li>Statut de vérification du compte</li>
              </ul>
              <p className="text-gray-700 mb-4">
                <strong>Lors de l'utilisation du service :</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Liens de paiement créés (titre, montant, description)</li>
                <li>Transactions effectuées (montant, date, statut)</li>
                <li>Données de navigation (adresse IP, navigateur, pages visitées)</li>
                <li>Cookies techniques nécessaires au fonctionnement du service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Finalités du traitement</h2>
              <p className="text-gray-700 mb-4">
                Vos données sont utilisées pour :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Fourniture du service :</strong> Création et gestion de votre compte, traitement des paiements</li>
                <li><strong>Sécurité :</strong> Prévention de la fraude, vérification d'identité</li>
                <li><strong>Communication :</strong> Notifications importantes, support client</li>
                <li><strong>Amélioration du service :</strong> Analyse d'utilisation, corrections de bugs</li>
                <li><strong>Conformité légale :</strong> Respect des obligations fiscales et réglementaires</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Base légale du traitement</h2>
              <p className="text-gray-700 mb-4">
                Le traitement de vos données repose sur :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Exécution du contrat :</strong> Nécessaire pour fournir le service</li>
                <li><strong>Consentement :</strong> Pour certaines communications non essentielles</li>
                <li><strong>Obligation légale :</strong> Conservation des données de transaction pour la comptabilité</li>
                <li><strong>Intérêt légitime :</strong> Amélioration du service et prévention de la fraude</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Partage des données</h2>
              <p className="text-gray-700 mb-4">
                Vos données peuvent être partagées avec :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Stripe :</strong> Pour le traitement des paiements (soumis à leur propre politique de confidentialité)</li>
                <li><strong>Google :</strong> Pour l'authentification (données limitées au strict nécessaire)</li>
                <li><strong>Hébergeurs :</strong> Vercel (application) et Neon.tech (base de données)</li>
                <li><strong>Autorités :</strong> Si requis par la loi ou pour prévenir une fraude</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Nous ne vendons jamais vos données à des tiers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Transfert de données hors UE</h2>
              <p className="text-gray-700 mb-4">
                Certains de nos prestataires (Vercel, Stripe) peuvent stocker des données en dehors de l'Union
                Européenne. Ces transferts sont encadrés par des clauses contractuelles types approuvées par la
                Commission Européenne.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Durée de conservation</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Données de compte :</strong> Pendant toute la durée de vie du compte + 1 an après suppression</li>
                <li><strong>Données de transaction :</strong> 10 ans (obligation comptable et fiscale)</li>
                <li><strong>Logs de connexion :</strong> 1 an</li>
                <li><strong>Cookies :</strong> Maximum 13 mois</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Vos droits (RGPD)</h2>
              <p className="text-gray-700 mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Droit d'accès :</strong> Obtenir une copie de vos données</li>
                <li><strong>Droit de rectification :</strong> Corriger des données inexactes</li>
                <li><strong>Droit à l'effacement :</strong> Supprimer vos données (sauf obligation légale)</li>
                <li><strong>Droit à la limitation :</strong> Limiter le traitement dans certains cas</li>
                <li><strong>Droit à la portabilité :</strong> Récupérer vos données dans un format structuré</li>
                <li><strong>Droit d'opposition :</strong> S'opposer au traitement pour motif légitime</li>
                <li><strong>Droit de retrait du consentement :</strong> À tout moment</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Pour exercer ces droits, contactez-nous à : alistair.piot@gmail.com
              </p>
              <p className="text-gray-700 mb-4">
                Vous disposez également du droit d'introduire une réclamation auprès de la CNIL (Commission
                Nationale de l'Informatique et des Libertés).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Sécurité des données</h2>
              <p className="text-gray-700 mb-4">
                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Chiffrement des données en transit (HTTPS/TLS)</li>
                <li>Chiffrement des données au repos</li>
                <li>Authentification sécurisée via Google OAuth</li>
                <li>Accès restreint aux données personnelles</li>
                <li>Surveillance et logs de sécurité</li>
                <li>Sauvegardes régulières</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Cookies</h2>
              <p className="text-gray-700 mb-4">
                Nous utilisons les cookies suivants :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Cookies essentiels :</strong> Nécessaires au fonctionnement (session, authentification)</li>
                <li><strong>Cookies de performance :</strong> Pour améliorer le service (si consentement)</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela peut limiter
                l'utilisation du service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Modifications de la politique</h2>
              <p className="text-gray-700 mb-4">
                Nous pouvons modifier cette politique de confidentialité. Les modifications importantes vous
                seront notifiées par email au moins 30 jours avant leur entrée en vigueur.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact</h2>
              <p className="text-gray-700 mb-4">
                Pour toute question sur la protection de vos données ou pour exercer vos droits :
              </p>
              <p className="text-gray-700 mb-4">
                Email : alistair.piot@gmail.com
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
