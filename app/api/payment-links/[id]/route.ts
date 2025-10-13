import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// DELETE - Supprimer un lien de paiement
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    // Vérifier que le lien appartient à l'utilisateur
    const paymentLink = await prisma.paymentLink.findUnique({
      where: { id },
    })

    if (!paymentLink) {
      return NextResponse.json({ error: 'Payment link not found' }, { status: 404 })
    }

    if (paymentLink.userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Ne pas supprimer un lien déjà payé
    if (paymentLink.paid) {
      return NextResponse.json(
        { error: 'Cannot delete a paid payment link' },
        { status: 400 }
      )
    }

    // Supprimer le lien
    await prisma.paymentLink.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete payment link error:', error)
    return NextResponse.json(
      { error: 'Failed to delete payment link' },
      { status: 500 }
    )
  }
}

// PATCH - Modifier un lien de paiement
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { title, description, amount } = body

    if (!title || !amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid title or amount' },
        { status: 400 }
      )
    }

    // Vérifier que le lien appartient à l'utilisateur
    const paymentLink = await prisma.paymentLink.findUnique({
      where: { id },
    })

    if (!paymentLink) {
      return NextResponse.json({ error: 'Payment link not found' }, { status: 404 })
    }

    if (paymentLink.userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Ne pas modifier un lien déjà payé
    if (paymentLink.paid) {
      return NextResponse.json(
        { error: 'Cannot modify a paid payment link' },
        { status: 400 }
      )
    }

    // Mettre à jour le lien
    const updatedLink = await prisma.paymentLink.update({
      where: { id },
      data: {
        title,
        description,
        amount: Math.round(amount * 100), // Convertir en centimes
      },
    })

    return NextResponse.json({ success: true, paymentLink: updatedLink })
  } catch (error) {
    console.error('Update payment link error:', error)
    return NextResponse.json(
      { error: 'Failed to update payment link' },
      { status: 500 }
    )
  }
}
