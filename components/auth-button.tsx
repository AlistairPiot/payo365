'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export function AuthButton() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((session) => {
        setIsAuthenticated(!!session?.user)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="px-6 py-2 bg-gray-200 text-gray-400 font-semibold rounded-lg">
        ...
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <Link
        href="/dashboard"
        className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition cursor-pointer"
      >
        Dashboard
      </Link>
    )
  }

  return (
    <Link
      href="/api/auth/signin?callbackUrl=/dashboard"
      className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition cursor-pointer"
    >
      Connexion
    </Link>
  )
}
