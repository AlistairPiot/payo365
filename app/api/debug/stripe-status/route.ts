import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    let stripeAccountInfo = null
    if (user.stripeAccountId) {
      try {
        const account = await stripe.accounts.retrieve(user.stripeAccountId)
        stripeAccountInfo = {
          id: account.id,
          charges_enabled: account.charges_enabled,
          details_submitted: account.details_submitted,
          payouts_enabled: account.payouts_enabled,
        }
      } catch (error: unknown) {
        stripeAccountInfo = { error: error instanceof Error ? error.message : 'Unknown error' }
      }
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        stripeAccountId: user.stripeAccountId,
        stripeOnboarded: user.stripeOnboarded,
      },
      stripeAccount: stripeAccountInfo,
    })
  } catch (error) {
    console.error('Debug error:', error)
    return NextResponse.json(
      { error: 'Failed to get debug info' },
      { status: 500 }
    )
  }
}
