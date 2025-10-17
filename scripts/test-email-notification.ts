/**
 * Script de test pour l'envoi d'email de notification de paiement
 * Usage: npx tsx scripts/test-email-notification.ts
 */

// Charger les variables d'environnement depuis .env
import * as dotenv from 'dotenv'
dotenv.config()

import { sendPaymentNotification } from '../lib/resend'

async function testEmailNotification() {
  console.log('🧪 Test d\'envoi d\'email de notification...\n')

  try {
    await sendPaymentNotification('fireflytoip@gmail.com', {
      amount: 500, // 5€ en centimes
      currency: 'eur',
      title: 'Test de notification email',
      customerEmail: 'client-test@example.com',
      paymentLinkId: 'test_' + Date.now(),
    })

    console.log('✅ Email envoyé avec succès !')
    console.log('📧 Vérifiez la boîte mail : fireflytoip@gmail.com')
    console.log('📨 Vérifiez aussi les spams si vous ne le voyez pas')
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi :', error)
    process.exit(1)
  }
}

testEmailNotification()
