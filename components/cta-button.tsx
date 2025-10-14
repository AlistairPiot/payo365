'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Loader } from '@/components/ui/loader'

interface CTAButtonProps {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
}

export function CTAButton({ href, children, variant = 'primary', className = '' }: CTAButtonProps) {
  const [isNavigating, setIsNavigating] = useState(false)

  const baseClasses = "inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg transition shadow-lg cursor-pointer min-w-[200px]"

  const variantClasses = variant === 'primary'
    ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-xl"
    : "bg-white text-indigo-600 hover:bg-gray-50"

  return (
    <Link
      href={href}
      onClick={() => setIsNavigating(true)}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {isNavigating ? (
        <>
          <Loader size="sm" className="mr-2" />
          Chargement...
        </>
      ) : (
        children
      )}
    </Link>
  )
}
