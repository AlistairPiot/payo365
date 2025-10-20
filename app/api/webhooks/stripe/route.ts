import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { sendPaymentNotification } from '@/lib/brevo'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
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
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        const paymentLinkId = session.metadata?.paymentLinkId

        if (!paymentLinkId) {
          console.error('No paymentLinkId in session metadata')
          break
        }

        // Mettre à jour le lien de paiement avec les informations nécessaires pour la facture
        const updatedPaymentLink = await prisma.paymentLink.update({
          where: { id: paymentLinkId },
          data: {
            paid: true,
            paidAt: new Date(),
            customerEmail: session.customer_email || session.customer_details?.email,
            stripePaymentIntentId: session.payment_intent as string,
          },
          include: {
            user: true, // Inclure l'utilisateur pour récupérer son email
          },
        })

        console.log(`Payment link ${paymentLinkId} marked as paid`)

        // Envoyer une notification email au marchand
        if (updatedPaymentLink.user.email) {
          await sendPaymentNotification(updatedPaymentLink.user.email, {
            amount: updatedPaymentLink.amount,
            currency: updatedPaymentLink.currency,
            title: updatedPaymentLink.title,
            customerEmail: updatedPaymentLink.customerEmail || 'Non renseigné',
            paymentLinkId: updatedPaymentLink.id,
          })
        }

        break
      }

      case 'account.updated': {
        const account = event.data.object as Stripe.Account

        // Mettre à jour le statut d'onboarding
        const user = await prisma.user.findUnique({
          where: { stripeAccountId: account.id },
        })

        if (user) {
          const onboarded = account.charges_enabled && account.details_submitted

          await prisma.user.update({
            where: { id: user.id },
            data: { stripeOnboarded: onboarded },
          })

          console.log(`User ${user.id} onboarding status updated: ${onboarded}`)
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
