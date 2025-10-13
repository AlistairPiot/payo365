import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  // Gérer l'événement
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        // Récupérer le lien de paiement via le metadata
        const paymentLinkId = session.metadata?.paymentLinkId

        if (!paymentLinkId) {
          console.error('No paymentLinkId in session metadata')
          return NextResponse.json({ received: true })
        }

        // Mettre à jour le lien de paiement
        await prisma.paymentLink.update({
          where: { id: paymentLinkId },
          data: {
            paid: true,
            paidAt: new Date(),
            customerEmail: session.customer_details?.email || null,
          },
        })

        console.log(`✅ Payment link ${paymentLinkId} marked as paid`)
        break
      }

      case 'account.updated': {
        const account = event.data.object as Stripe.Account

        // Mettre à jour le statut d'onboarding de l'utilisateur
        const user = await prisma.user.findUnique({
          where: { stripeAccountId: account.id },
        })

        if (user) {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              stripeOnboarded: account.charges_enabled && account.details_submitted,
            },
          })

          console.log(`✅ User ${user.id} Stripe account updated`)
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Error processing webhook:', err)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
