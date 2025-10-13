import Link from 'next/link'
import { Footer } from '@/components/footer'

export default function MentionsLegalesPage() {
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
            Mentions Légales
          </h1>

          <p className="text-sm text-gray-500 mb-8">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>

          <div className="prose prose-indigo max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Éditeur du site</h2>
              <p className="text-gray-700 mb-2">
                <strong>Nom du service :</strong> Payo365
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Forme juridique :</strong> [À compléter - ex: SAS, SARL, Auto-entreprise]
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Capital social :</strong> [À compléter si applicable]
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Siège social :</strong> [À compléter - adresse complète]
              </p>
              <p className="text-gray-700 mb-2">
                <strong>SIRET :</strong> [À compléter - numéro SIRET]
              </p>
              <p className="text-gray-700 mb-2">
                <strong>RCS :</strong> [À compléter si applicable]
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Numéro de TVA intracommunautaire :</strong> [À compléter si applicable]
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Directeur de la publication :</strong> [À compléter - nom du responsable légal]
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Contact :</strong> support@payo365.com
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Hébergement</h2>
              <p className="text-gray-700 mb-2">
                <strong>Hébergeur de l'application :</strong>
              </p>
              <p className="text-gray-700 mb-2">
                Vercel Inc.<br />
                440 N Barranca Ave #4133<br />
                Covina, CA 91723<br />
                États-Unis<br />
                Site web : <a href="https://vercel.com" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">https://vercel.com</a>
              </p>
              <p className="text-gray-700 mb-2 mt-4">
                <strong>Hébergeur de la base de données :</strong>
              </p>
              <p className="text-gray-700 mb-2">
                Neon (Neon, Inc.)<br />
                États-Unis<br />
                Site web : <a href="https://neon.tech" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">https://neon.tech</a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Propriété intellectuelle</h2>
              <p className="text-gray-700 mb-4">
                L'ensemble des contenus présents sur le site Payo365 (textes, graphismes, logo, icônes, images,
                sons, logiciels, etc.) sont la propriété exclusive de Payo365, à l'exception des marques, logos
                ou contenus appartenant à d'autres sociétés partenaires ou auteurs.
              </p>
              <p className="text-gray-700 mb-4">
                Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des
                éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation
                écrite préalable de Payo365.
              </p>
              <p className="text-gray-700 mb-4">
                Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient sera
                considérée comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des
                articles L.335-2 et suivants du Code de Propriété Intellectuelle.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Services tiers</h2>
              <p className="text-gray-700 mb-4">
                Payo365 utilise les services tiers suivants :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>
                  <strong>Stripe :</strong> Pour le traitement des paiements<br />
                  Site web : <a href="https://stripe.com" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">https://stripe.com</a>
                </li>
                <li>
                  <strong>Google OAuth :</strong> Pour l'authentification des utilisateurs<br />
                  Site web : <a href="https://cloud.google.com" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">https://cloud.google.com</a>
                </li>
              </ul>
              <p className="text-gray-700 mb-4">
                Ces services sont soumis à leurs propres conditions d'utilisation et politiques de confidentialité.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Responsabilité</h2>
              <p className="text-gray-700 mb-4">
                Payo365 s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site,
                dont elle se réserve le droit de corriger, à tout moment et sans préavis, le contenu.
              </p>
              <p className="text-gray-700 mb-4">
                Toutefois, Payo365 ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations
                mises à disposition sur ce site.
              </p>
              <p className="text-gray-700 mb-4">
                En conséquence, Payo365 décline toute responsabilité pour toute imprécision, inexactitude ou
                omission portant sur des informations disponibles sur ce site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Liens hypertextes</h2>
              <p className="text-gray-700 mb-4">
                Le site Payo365 peut contenir des liens hypertextes vers d'autres sites. Payo365 n'exerce aucun
                contrôle sur ces sites et décline toute responsabilité quant à l'accès, au contenu ou à
                l'utilisation de ces sites, ainsi qu'aux dommages pouvant résulter de la consultation des
                informations présentes sur ces sites.
              </p>
              <p className="text-gray-700 mb-4">
                La création de liens hypertextes vers le site Payo365 nécessite l'autorisation préalable écrite
                de Payo365.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Protection des données personnelles</h2>
              <p className="text-gray-700 mb-4">
                Les informations concernant la collecte et le traitement des données personnelles sont détaillées
                dans notre{' '}
                <Link href="/legal/confidentialite" className="text-indigo-600 hover:underline">
                  Politique de confidentialité
                </Link>
                .
              </p>
              <p className="text-gray-700 mb-4">
                Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d'un droit d'accès,
                de rectification, de suppression et d'opposition aux données personnelles vous concernant.
              </p>
              <p className="text-gray-700 mb-4">
                Pour exercer ces droits, vous pouvez contacter : support@payo365.com
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Cookies</h2>
              <p className="text-gray-700 mb-4">
                Le site utilise des cookies nécessaires à son bon fonctionnement. Pour plus d'informations,
                consultez notre{' '}
                <Link href="/legal/confidentialite" className="text-indigo-600 hover:underline">
                  Politique de confidentialité
                </Link>
                .
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Droit applicable et juridiction</h2>
              <p className="text-gray-700 mb-4">
                Les présentes mentions légales sont régies par le droit français. En cas de litige et à défaut
                d'accord amiable, le litige sera porté devant les tribunaux français conformément aux règles de
                compétence en vigueur.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Médiation</h2>
              <p className="text-gray-700 mb-4">
                Conformément à l'article L.612-1 du Code de la consommation, il est rappelé que tout consommateur
                a le droit de recourir gratuitement à un médiateur de la consommation en vue de la résolution
                amiable du litige qui l'oppose à un professionnel.
              </p>
              <p className="text-gray-700 mb-4">
                Coordonnées du médiateur : [À compléter selon votre secteur d'activité]
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact</h2>
              <p className="text-gray-700 mb-4">
                Pour toute question ou information complémentaire concernant ces mentions légales, vous pouvez
                nous contacter à : support@payo365.com
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800">
                <strong>Note importante :</strong> Cette page contient des champs marqués [À compléter].
                Assurez-vous de remplir toutes les informations légales obligatoires avant la mise en production.
              </p>
            </div>
            <Link
              href="/"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
