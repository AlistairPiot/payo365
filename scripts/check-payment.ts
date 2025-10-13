import { prisma } from '@/lib/prisma'

async function checkPayment() {
  const paymentId = process.argv[2]

  if (!paymentId) {
    console.error('Usage: ts-node scripts/check-payment.ts <payment-link-id>')
    process.exit(1)
  }

  const payment = await prisma.paymentLink.findUnique({
    where: { id: paymentId },
    include: { user: true }
  })

  if (!payment) {
    console.error('Payment not found')
    process.exit(1)
  }

  console.log('Payment Link Info:')
  console.log('==================')
  console.log('ID:', payment.id)
  console.log('Title:', payment.title)
  console.log('Amount:', payment.amount / 100, 'EUR')
  console.log('Paid:', payment.paid)
  console.log('Paid At:', payment.paidAt)
  console.log('Customer Email:', payment.customerEmail)
  console.log('Stripe Checkout ID:', payment.stripeCheckoutId)
  console.log('Stripe Payment Intent ID:', payment.stripePaymentIntentId)
  console.log('Stripe Charge ID:', payment.stripeChargeId)
  console.log('==================')

  if (payment.paid && !payment.stripePaymentIntentId) {
    console.warn('\n⚠️  WARNING: Payment is marked as paid but has no stripePaymentIntentId!')
    console.warn('This will prevent invoice generation.')
  }

  await prisma.$disconnect()
}

checkPayment()
