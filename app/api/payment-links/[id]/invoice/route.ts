import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { stripe, PLATFORM_FEE_PERCENT, calculatePlatformFee } from '@/lib/stripe'
import { jsPDF } from 'jspdf'

export const runtime = 'nodejs'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const { id } = await params

    // Récupérer le lien de paiement
    const paymentLink = await prisma.paymentLink.findUnique({
      where: { id },
      include: { user: true },
    })

    if (!paymentLink) {
      return NextResponse.json(
        { error: 'Lien de paiement introuvable' },
        { status: 404 }
      )
    }

    // Vérifier que l'utilisateur est bien le propriétaire
    if (paymentLink.user.email !== session.user.email) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
    }

    // Vérifier que le paiement a été effectué
    if (!paymentLink.paid || !paymentLink.stripePaymentIntentId) {
      return NextResponse.json(
        { error: 'Ce paiement n\'a pas encore été effectué' },
        { status: 400 }
      )
    }

    // Récupérer les informations du paiement depuis Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentLink.stripePaymentIntentId
    )

    // Récupérer les frais Stripe depuis le charge
    let stripeFee = 0
    if (paymentIntent.latest_charge) {
      const charge = await stripe.charges.retrieve(
        paymentIntent.latest_charge as string,
        { expand: ['balance_transaction'] }
      )

      if (charge.balance_transaction && typeof charge.balance_transaction !== 'string') {
        stripeFee = charge.balance_transaction.fee / 100 // Convertir en euros
      }
    }

    // Calculer les montants
    const totalAmount = paymentLink.amount / 100 // Montant total en euros
    const platformFeeInCents = calculatePlatformFee(paymentLink.amount) // Commission en centimes
    const platformFee = platformFeeInCents / 100 // Commission en euros
    const netAmount = totalAmount - stripeFee - platformFee // Montant net reçu après tous les frais

    // Créer le PDF avec jsPDF
    const doc = new jsPDF()

    // En-tête
    doc.setFontSize(24)
    doc.setFont('helvetica', 'bold')
    doc.text('FACTURE', 105, 30, { align: 'center' })

    // Informations de la facture
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text(`Facture N° ${paymentLink.id}`, 200, 50, { align: 'right' })
    doc.text(
      `Date: ${paymentLink.paidAt?.toLocaleDateString('fr-FR') || new Date().toLocaleDateString('fr-FR')}`,
      200,
      56,
      { align: 'right' }
    )

    // Émetteur
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Émis par:', 20, 80)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('Payo365', 20, 87)
    doc.text('Plateforme de paiement', 20, 93)
    doc.text('Poitiers, France', 20, 99)

    // Client (acheteur)
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Client:', 20, 121)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text(paymentLink.customerEmail || 'Non renseigné', 20, 128)

    // Détails du paiement
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Détails du paiement:', 20, 150)

    // Tableau - En-tête
    const tableTop = 160
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('Description', 20, tableTop)
    doc.text('Quantité', 120, tableTop)
    doc.text('Montant', 160, tableTop)

    doc.line(20, tableTop + 3, 190, tableTop + 3)

    // Ligne de paiement
    let yPos = tableTop + 12
    doc.setFont('helvetica', 'normal')
    doc.text(paymentLink.title, 20, yPos)
    doc.text('1', 120, yPos)
    doc.text(`${totalAmount.toFixed(2)} €`, 160, yPos)

    if (paymentLink.description) {
      yPos += 7
      doc.setFontSize(8)
      doc.setTextColor(100, 100, 100)
      doc.text(paymentLink.description, 20, yPos, { maxWidth: 80 })
      doc.setTextColor(0, 0, 0)
      yPos += 7
    } else {
      yPos += 7
    }

    yPos += 8

    // Sous-total
    doc.setFontSize(10)
    doc.text('Sous-total:', 110, yPos)
    doc.text(`${totalAmount.toFixed(2)} €`, 190, yPos, { align: 'right' })

    yPos += 7

    // Frais Stripe
    doc.text('Frais de traitement Stripe:', 110, yPos)
    doc.text(`-${stripeFee.toFixed(2)} €`, 190, yPos, { align: 'right' })

    yPos += 7

    // Commission Payo365
    doc.text(`Commission Payo365 (${PLATFORM_FEE_PERCENT}%):`, 110, yPos)
    doc.text(`-${platformFee.toFixed(2)} €`, 190, yPos, { align: 'right' })

    yPos += 7
    doc.line(110, yPos, 190, yPos)

    yPos += 5

    // Total net
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Montant net reçu:', 110, yPos)
    doc.text(`${netAmount.toFixed(2)} €`, 190, yPos, { align: 'right' })

    yPos += 20

    // Informations de paiement
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100, 100, 100)
    doc.text('Informations de paiement:', 20, yPos)
    yPos += 7
    doc.text(`ID de transaction: ${paymentLink.stripePaymentIntentId}`, 20, yPos)
    yPos += 5
    doc.text(
      `Date de paiement: ${paymentLink.paidAt?.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) || 'N/A'}`,
      20,
      yPos
    )
    yPos += 5
    doc.text(`Email du client: ${paymentLink.customerEmail || 'N/A'}`, 20, yPos)

    // Pied de page
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.text(
      'Cette facture a été générée automatiquement par Payo365.',
      105,
      270,
      { align: 'center' }
    )
    doc.text(
      'Pour toute question, veuillez contacter alistair.piot@gmail.com',
      105,
      275,
      { align: 'center' }
    )

    // Générer le PDF en buffer
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'))

    // Créer un nom de fichier professionnel et lisible
    // Format: Facture_PAYO365_YYYYMMDD_Montant_NomClient.pdf
    const invoiceDate = paymentLink.paidAt || new Date()
    const formattedDate = invoiceDate.toISOString().split('T')[0].replace(/-/g, '') // YYYYMMDD
    const formattedAmount = totalAmount.toFixed(2).replace('.', '_') // Ex: 50_00

    // Extraire le nom du client depuis l'email (partie avant @) et nettoyer
    const clientName = (paymentLink.customerEmail || 'Client')
      .split('@')[0]
      .replace(/[^a-zA-Z0-9]/g, '_') // Remplacer caractères spéciaux par _
      .substring(0, 20) // Limiter à 20 caractères

    const fileName = `Facture_PAYO365_${formattedDate}_${formattedAmount}EUR_${clientName}.pdf`

    // Retourner le PDF
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    })
  } catch (error) {
    console.error('Error generating invoice:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la génération de la facture' },
      { status: 500 }
    )
  }
}
