'use client'

import { User } from '@prisma/client'
import { handleSignOut } from '@/app/actions/auth'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { useState } from 'react'
import Link from 'next/link'

interface DashboardHeaderProps {
  user: User
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false)

  const handleSignOutClick = () => {
    setShowSignOutConfirm(true)
  }

  const confirmSignOut = async () => {
    await handleSignOut()
  }

  return (
    <>
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link href="/dashboard">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xl px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg transition-shadow">
                  Payo365
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <button
                onClick={handleSignOutClick}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition cursor-pointer"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      {showSignOutConfirm && (
        <ConfirmDialog
          title="Déconnexion"
          message="Êtes-vous sûr de vouloir vous déconnecter ?"
          confirmText="Se déconnecter"
          cancelText="Annuler"
          type="warning"
          onConfirm={confirmSignOut}
          onCancel={() => setShowSignOutConfirm(false)}
        />
      )}
    </>
  )
}
