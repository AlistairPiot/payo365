import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { stripe, calculatePlatformFee } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, amount, currency = 'eur' } = body

    if (!title || !amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid title or amount' },
        { status: 400 }
      )
    }

    // Récupérer l'utilisateur et vérifier son compte Stripe Connect
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (!user.stripeAccountId) {
      return NextResponse.json(
        { error: 'Stripe account not connected. Please complete onboarding.' },
        { status: 400 }
      )
    }

    // Avertissement si le compte n'est pas complètement onboardé
    if (!user.stripeOnboarded) {
      console.warn(`User ${user.id} creating payment link with incomplete Stripe onboarding`)
    }

    // Créer le lien de paiement dans la DB
    const paymentLink = await prisma.paymentLink.create({
      data: {
        userId: user.id,
        title,
        description,
        amount: Math.round(amount * 100), // Convertir en centimes
        currency,
      },
    })

    // Calculer la commission (3%)
    const platformFee = calculatePlatformFee(paymentLink.amount)

    // Configuration de base de la session Checkout
    const sessionConfig: any = {
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: paymentLink.currency,
            product_data: {
              name: paymentLink.title,
              description: paymentLink.description || undefined,
            },
            unit_amount: paymentLink.amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/pay/${paymentLink.id}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pay/${paymentLink.id}?canceled=true`,
      metadata: {
        paymentLinkId: paymentLink.id,
        userId: user.id,
      },
    }

    // Ajouter les transfer_data seulement si le compte est onboardé
    if (user.stripeOnboarded) {
      sessionConfig.payment_intent_data = {
        application_fee_amount: platformFee,
        transfer_data: {
          destination: user.stripeAccountId,
        },
      }
    } else {
      console.warn('Creating checkout without transfers - Stripe account not fully onboarded')
    }

    // Créer la session Stripe Checkout
    const checkoutSession = await stripe.checkout.sessions.create(sessionConfig)

    // Mettre à jour le lien avec les infos Stripe
    await prisma.paymentLink.update({
      where: { id: paymentLink.id },
      data: {
        stripeCheckoutId: checkoutSession.id,
        stripeSessionUrl: checkoutSession.url,
      },
    })

    return NextResponse.json({
      id: paymentLink.id,
      checkoutUrl: checkoutSession.url,
    })
  } catch (error: unknown) {
    console.error('Checkout error:', error)

    // Plus de détails sur l'erreur
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error details:', errorMessage)

    return NextResponse.json(
      {
        error: 'Failed to create checkout session',
        details: errorMessage
      },
      { status: 500 }
    )
  }
}
