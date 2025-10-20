import { AuthButton } from "@/components/auth-button";
import { Footer } from "@/components/footer";
import { CTAButton } from "@/components/cta-button";
import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Header */}
            <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-3">
                            <Link href="/" className="inline-block">
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
                    <CTAButton href="/api/auth/signin?callbackUrl=/dashboard">
                        Commencer maintenant
                    </CTAButton>
                </div>

                {/* Payment Link Preview */}
                <div className="mt-20 mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Voici à quoi ressemble votre lien de paiement
                        </h2>
                        <p className="text-lg text-gray-600">
                            Simple, élégant et professionnel
                        </p>
                    </div>

                    <div className="max-w-2xl mx-auto">
                        {/* Browser mockup */}
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                            {/* Browser bar */}
                            <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="flex-1 mx-4">
                                    <div className="bg-white rounded-md px-3 py-1 text-sm text-gray-500 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        <span className="truncate">payo365.com/pay/abc123</span>
                                    </div>
                                </div>
                            </div>

                            {/* Payment page content */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
                                <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
                                    <div className="mb-6">
                                        <h3 className="text-3xl font-bold text-gray-900 mb-2">
                                            Consultation Marketing
                                        </h3>
                                        <p className="text-gray-600">
                                            Session de 1h pour optimiser votre stratégie digitale
                                        </p>
                                    </div>

                                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white mb-6">
                                        <p className="text-sm opacity-90 mb-1">Montant à payer</p>
                                        <p className="text-4xl font-bold">
                                            150.00 EUR
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                        <p className="text-sm text-gray-500 mb-1">Bénéficiaire</p>
                                        <p className="font-medium text-gray-900">Votre Nom</p>
                                    </div>

                                    <button className="block w-full bg-indigo-600 text-white text-center px-6 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 shadow-lg">
                                        Payer maintenant
                                    </button>

                                    <p className="text-xs text-gray-500 text-center mt-4 flex items-center justify-center gap-1">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        Paiement sécurisé par Stripe
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Info badge */}
                        <div className="mt-6 text-center">
                            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Créez le vôtre en moins de 30 secondes
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div id="features" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
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
                            Seulement 3% de commission, parmi les plus basses du
                            marché. Nos concurrents facturent jusqu'à 5-7%.
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

                {/* CTA Section */}
                <div className="mt-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white hover:shadow-2xl transition-all duration-300">
                    <h2 className="text-3xl font-bold mb-4">
                        Prêt à recevoir vos premiers paiements ?
                    </h2>
                    <p className="text-xl opacity-90 mb-8">
                        Démarrez en quelques clics et recevez vos paiements
                        immédiatement.
                    </p>
                    <CTAButton href="/api/auth/signin?callbackUrl=/dashboard" variant="secondary">
                        Créer mon compte
                    </CTAButton>
                </div>
            </main>

            <Footer />
        </div>
    );
}
