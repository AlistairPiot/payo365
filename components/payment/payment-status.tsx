'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface PaymentStatusProps {
  paymentLinkId: string
}

export function PaymentStatus({ paymentLinkId }: PaymentStatusProps) {
  const router = useRouter()
  const [checkCount, setCheckCount] = useState(0)
  const maxChecks = 30 // 30 secondes maximum (30 checks * 1 seconde)

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const response = await fetch(`/api/payment-links/${paymentLinkId}/status`)
        const data = await response.json()

        if (data.paid) {
          // Rafraîchir la page pour afficher la confirmation
          router.refresh()
        } else if (checkCount < maxChecks) {
          // Continuer à vérifier
          setCheckCount(prev => prev + 1)
        }
      } catch (error) {
        console.error('Error checking payment status:', error)
      }
    }

    // Vérifier immédiatement
    checkPaymentStatus()

    // Puis vérifier toutes les secondes
    const interval = setInterval(checkPaymentStatus, 1000)

    // Nettoyer l'intervalle après 30 secondes ou si le composant est démonté
    const timeout = setTimeout(() => {
      clearInterval(interval)
    }, maxChecks * 1000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [paymentLinkId, checkCount, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <svg
            className="w-8 h-8 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Paiement en cours...
        </h1>
        <p className="text-gray-600 mb-4">
          Nous confirmons votre paiement. Veuillez patienter quelques instants.
        </p>
        {checkCount > 10 && (
          <p className="text-sm text-gray-500">
            La confirmation peut prendre quelques secondes...
          </p>
        )}
      </div>
    </div>
  )
}
