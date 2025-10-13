'use client'

export function StripePendingBanner() {
  const handleComplete = () => {
    window.location.href = '/api/stripe/connect'
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
      <div className="flex items-start gap-4">
        <svg
          className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-yellow-900 mb-2">
            Compte Stripe en cours de configuration
          </h3>
          <p className="text-yellow-800 mb-4">
            Votre compte Stripe Connect est en cours de vérification. En mode test, vous pouvez quand même créer des liens de paiement, mais ils ne fonctionneront que lorsque votre compte sera activé.
          </p>
          <button
            onClick={handleComplete}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition cursor-pointer"
          >
            Compléter la configuration Stripe
          </button>
        </div>
      </div>
    </div>
  )
}
