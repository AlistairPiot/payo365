import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const paymentLink = await prisma.paymentLink.findUnique({
      where: { id },
      select: {
        paid: true,
        paidAt: true,
      },
    })

    if (!paymentLink) {
      return NextResponse.json({ error: 'Payment link not found' }, { status: 404 })
    }

    return NextResponse.json({
      paid: paymentLink.paid,
      paidAt: paymentLink.paidAt,
    })
  } catch (error) {
    console.error('Error checking payment status:', error)
    return NextResponse.json(
      { error: 'Failed to check payment status' },
      { status: 500 }
    )
  }
}
