import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'

async function fixPaymentIntent() {
  const paymentId = process.argv[2]

  if (!paymentId) {
    console.error('Usage: ts-node scripts/fix-payment-intent.ts <payment-link-id>')
    process.exit(1)
  }

  const payment = await prisma.paymentLink.findUnique({
    where: { id: paymentId }
  })

  if (!payment) {
    console.error('Payment not found')
    process.exit(1)
  }

  if (!payment.stripeCheckoutId) {
    console.error('No Stripe Checkout ID found')
    process.exit(1)
  }

  console.log('Fetching session from Stripe...')
  const session = await stripe.checkout.sessions.retrieve(payment.stripeCheckoutId)

  console.log('Session status:', session.status)
  console.log('Payment status:', session.payment_status)
  console.log('Payment Intent:', session.payment_intent)

  if (session.payment_intent) {
    console.log('\nUpdating payment link with Payment Intent ID...')
    await prisma.paymentLink.update({
      where: { id: paymentId },
      data: {
        stripePaymentIntentId: session.payment_intent as string,
        paid: session.payment_status === 'paid',
        paidAt: session.payment_status === 'paid' ? new Date() : payment.paidAt,
        customerEmail: session.customer_email || session.customer_details?.email || payment.customerEmail
      }
    })

    console.log('✅ Payment link updated successfully!')
    console.log('You can now generate the invoice.')
  } else {
    console.error('No Payment Intent found in the session')
  }

  await prisma.$disconnect()
}

fixPaymentIntent()
