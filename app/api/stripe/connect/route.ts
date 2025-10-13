import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    let accountId = user.stripeAccountId

    // Créer un compte Stripe Connect si nécessaire
    if (!accountId) {
      if (!user.email) {
        return NextResponse.json(
          { error: 'User email is required for Stripe Connect' },
          { status: 400 }
        )
      }

      const account = await stripe.accounts.create({
        type: 'express',
        email: user.email,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
      })

      accountId = account.id

      await prisma.user.update({
        where: { id: user.id },
        data: { stripeAccountId: accountId },
      })
    }

    // Créer un lien d'onboarding
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?stripe=refresh`,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?stripe=success`,
      type: 'account_onboarding',
    })

    return NextResponse.json({ url: accountLink.url })
  } catch (error) {
    console.error('Stripe Connect error:', error)
    return NextResponse.json(
      { error: 'Failed to create Stripe Connect link' },
      { status: 500 }
    )
  }
}

// Vérifier le statut de l'onboarding
export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user?.stripeAccountId) {
      return NextResponse.json({ onboarded: false })
    }

    const account = await stripe.accounts.retrieve(user.stripeAccountId)

    const onboarded = account.charges_enabled && account.details_submitted

    if (onboarded !== user.stripeOnboarded) {
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeOnboarded: onboarded },
      })
    }

    return NextResponse.json({ onboarded })
  } catch (error) {
    console.error('Stripe account check error:', error)
    return NextResponse.json(
      { error: 'Failed to check Stripe account status' },
      { status: 500 }
    )
  }
}
