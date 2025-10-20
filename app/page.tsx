import { AuthButton } from "@/components/auth-button";
import { CTAButton } from "@/components/cta-button";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Header */}
            <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-3">
                            <Link href="/" className="flex items-center gap-2">
                                <Image
                                    src="/icon_payo365.svg"
                                    alt="Payo365 Logo"
                                    width={40}
                                    height={40}
                                    className="w-10 h-10"
                                />
                                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xl px-4 py-2 rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
                                    Payo365
                                </div>
                            </Link>
                        </div>
                        <AuthButton />
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
                        Créez un lien de paiement
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                            en quelques secondes
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        La solution ultra simple pour freelances et créateurs.
                        Générez un lien, partagez-le et recevez vos paiements
                        instantanément.
                    </p>
                </div>

                {/* Payment Link Preview */}
                <div className="mt-20 mb-20 grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Text content */}
                    <div className="order-2 lg:order-1">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            Voici à quoi ressemble votre lien de paiement
                        </h2>
                        <p className="text-lg text-gray-600 mb-6">
                            Simple, élégant et professionnel. Vos clients
                            verront une page de paiement moderne et sécurisée
                            qui inspire confiance.
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg
                                        className="w-4 h-4 text-green-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">
                                        Design professionnel
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        Interface claire et moderne qui rassure
                                        vos clients
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg
                                        className="w-4 h-4 text-green-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">
                                        Informations claires
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        Titre, description, montant et
                                        bénéficiaire bien visibles
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg
                                        className="w-4 h-4 text-green-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">
                                        Paiement sécurisé
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        Badge Stripe visible pour inspirer
                                        confiance
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-3 rounded-lg text-sm font-medium">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                            Créez le vôtre en moins de 30 secondes
                        </div>
                    </div>

                    {/* Right: Browser mockup */}
                    <div className="order-1 lg:order-2">
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 transform hover:scale-105 transition-all duration-300">
                            {/* Browser bar */}
                            <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="flex-1 mx-4">
                                    <div className="bg-white rounded-md px-3 py-1.5 text-xs text-gray-500 flex items-center gap-2">
                                        <svg
                                            className="w-3 h-3"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            />
                                        </svg>
                                        <span className="truncate">
                                            payo365.com/pay/abc123
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Payment page content */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <div className="mb-4">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                            Consultation Marketing
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            Session de 1h pour optimiser votre
                                            stratégie digitale
                                        </p>
                                    </div>

                                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-4 text-white mb-4">
                                        <p className="text-xs opacity-90 mb-0.5">
                                            Montant à payer
                                        </p>
                                        <p className="text-3xl font-bold">
                                            150.00 EUR
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                                        <p className="text-xs text-gray-500 mb-0.5">
                                            Bénéficiaire
                                        </p>
                                        <p className="font-medium text-gray-900 text-sm">
                                            Votre Nom
                                        </p>
                                    </div>

                                    <button className="block w-full bg-indigo-600 text-white text-center px-4 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 shadow-md text-sm">
                                        Payer maintenant
                                    </button>

                                    <p className="text-xs text-gray-500 text-center mt-3 flex items-center justify-center gap-1">
                                        <svg
                                            className="w-3 h-3"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            />
                                        </svg>
                                        Paiement sécurisé par Stripe
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white hover:shadow-2xl transition-all duration-300">
                    <h2 className="text-3xl font-bold mb-4">
                        Prêt à recevoir vos premiers paiements ?
                    </h2>
                    <p className="text-xl opacity-90 mb-8">
                        Démarrez en quelques clics et recevez vos paiements
                        immédiatement.
                    </p>
                    <CTAButton
                        href="/api/auth/signin?callbackUrl=/dashboard"
                        variant="secondary"
                    >
                        Créer mon compte
                    </CTAButton>
                </div>

                {/* Features */}
                <div
                    id="features"
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20"
                >
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300">
                        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                            <svg
                                className="w-6 h-6 text-indigo-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Ultra rapide
                        </h3>
                        <p className="text-gray-600">
                            Créez votre lien de paiement en moins de 30
                            secondes. Pas de configuration compliquée.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                            <svg
                                className="w-6 h-6 text-purple-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            100% sécurisé
                        </h3>
                        <p className="text-gray-600">
                            Paiements sécurisés par Stripe, la solution utilisée
                            par des millions d'entreprises.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                            <svg
                                className="w-6 h-6 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            100% gratuit
                        </h3>
                        <p className="text-gray-600">
                            Aucun abonnement, aucun frais caché. Vous ne payez
                            que lorsque vous recevez un paiement.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300">
                        <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                            <svg
                                className="w-6 h-6 text-amber-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Commissions imbattables
                        </h3>
                        <p className="text-gray-600">
                            Seulement 8% de commission tout inclus. Simple et
                            transparent, sans frais cachés.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                            <svg
                                className="w-6 h-6 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Factures automatiques
                        </h3>
                        <p className="text-gray-600">
                            Générez et téléchargez automatiquement vos factures
                            pour chaque paiement reçu. Gestion simplifiée.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300">
                        <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                            <svg
                                className="w-6 h-6 text-pink-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Personnalisable
                        </h3>
                        <p className="text-gray-600">
                            Personnalisez vos liens de paiement avec titre,
                            description et montant selon vos besoins.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
