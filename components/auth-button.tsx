'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Loader } from '@/components/ui/loader'

export function AuthButton() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((session) => {
        setIsAuthenticated(!!session?.user)
      })
      .catch(() => {
        // Ignorer les erreurs
      })
  }, [])

  if (isAuthenticated) {
    return (
      <Link
        href="/dashboard"
        className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 hover:shadow-lg transition-all duration-200 cursor-pointer"
      >
        Dashboard
      </Link>
    )
  }

  return (
    <Link
      href="/api/auth/signin?callbackUrl=/dashboard"
      onClick={() => setIsNavigating(true)}
      className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition cursor-pointer flex items-center justify-center min-w-[120px]"
    >
      {isNavigating ? (
        <>
          <Loader size="sm" className="mr-2" />
          Connexion...
        </>
      ) : (
        'Connexion'
      )}
    </Link>
  )
}
