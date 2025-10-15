import { notFound, redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { PaymentStatus } from '@/components/payment/payment-status'
import { Footer } from '@/components/footer'

interface PaymentPageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ success?: string; canceled?: string }>
}

export default async function PaymentPage({ params, searchParams }: PaymentPageProps) {
  const { id } = await params
  const search = await searchParams

  const paymentLink = await prisma.paymentLink.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  })

  if (!paymentLink) {
    notFound()
  }

  // Si déjà payé, afficher la confirmation
  if (paymentLink.paid) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Paiement réussi !
            </h1>
            <p className="text-gray-600 mb-4">
              Ce lien de paiement a déjà été utilisé.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 text-left">
              <p className="text-sm text-gray-500 mb-1">Montant payé</p>
              <p className="text-2xl font-bold text-gray-900">
                {(paymentLink.amount / 100).toFixed(2)} {paymentLink.currency.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Si pas de session Stripe créée, rediriger vers l'accueil
  if (!paymentLink.stripeSessionUrl) {
    redirect('/')
  }

  // Gestion des paramètres de retour Stripe
  if (search.success) {
    return <PaymentStatus paymentLinkId={id} />
  }

  if (search.canceled) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-orange-600"
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
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Paiement annulé
            </h1>
            <p className="text-gray-600 mb-6">
              Vous pouvez réessayer quand vous le souhaitez.
            </p>
            <a
              href={paymentLink.stripeSessionUrl}
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition cursor-pointer"
            >
              Réessayer le paiement
            </a>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Page de paiement par défaut
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {paymentLink.title}
            </h1>
            {paymentLink.description && (
              <p className="text-gray-600">{paymentLink.description}</p>
            )}
          </div>

          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white mb-6">
            <p className="text-sm opacity-90 mb-1">Montant à payer</p>
            <p className="text-4xl font-bold">
              {(paymentLink.amount / 100).toFixed(2)} {paymentLink.currency.toUpperCase()}
            </p>
          </div>

          {paymentLink.user.name && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-500 mb-1">Bénéficiaire</p>
              <p className="font-medium text-gray-900">{paymentLink.user.name}</p>
            </div>
          )}

          <a
            href={paymentLink.stripeSessionUrl}
            className="block w-full bg-indigo-600 text-white text-center px-6 py-4 rounded-lg font-semibold hover:bg-indigo-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
          >
            Payer maintenant
          </a>

          <p className="text-xs text-gray-500 text-center mt-4">
            Paiement sécurisé par Stripe
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
