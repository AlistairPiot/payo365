import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set')
}

export const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendPaymentNotification(
  merchantEmail: string,
  paymentDetails: {
    amount: number // en centimes
    currency: string
    title: string
    customerEmail: string
    paymentLinkId: string
  }
) {
  const amountInEuros = (paymentDetails.amount / 100).toFixed(2)

  try {
    await resend.emails.send({
      from: 'Payo365 <notifications@send.payo365.com>',
      to: merchantEmail,
      subject: `✅ Paiement reçu de ${amountInEuros}€ - ${paymentDetails.title}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                border-radius: 10px;
                text-align: center;
                margin-bottom: 30px;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border-radius: 10px;
                border: 1px solid #e5e7eb;
              }
              .amount {
                font-size: 36px;
                font-weight: bold;
                color: #10b981;
                margin: 20px 0;
              }
              .detail-row {
                display: flex;
                justify-content: space-between;
                padding: 12px 0;
                border-bottom: 1px solid #e5e7eb;
              }
              .detail-label {
                color: #6b7280;
                font-weight: 500;
              }
              .detail-value {
                color: #111827;
                font-weight: 600;
              }
              .button {
                display: inline-block;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 14px 28px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 600;
                margin-top: 20px;
              }
              .footer {
                text-align: center;
                color: #6b7280;
                font-size: 14px;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">🎉 Paiement reçu !</h1>
            </div>

            <div class="content">
              <p style="font-size: 18px; margin-top: 0;">Bonjour,</p>

              <p>Vous venez de recevoir un paiement via Payo365 !</p>

              <div class="amount">${amountInEuros} €</div>

              <div style="margin-top: 30px;">
                <div class="detail-row">
                  <span class="detail-label">Article</span>
                  <span class="detail-value">${paymentDetails.title}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Client</span>
                  <span class="detail-value">${paymentDetails.customerEmail}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Montant</span>
                  <span class="detail-value">${amountInEuros} ${paymentDetails.currency.toUpperCase()}</span>
                </div>
                <div class="detail-row" style="border-bottom: none;">
                  <span class="detail-label">ID de transaction</span>
                  <span class="detail-value" style="font-family: monospace; font-size: 12px;">${paymentDetails.paymentLinkId}</span>
                </div>
              </div>

              <div style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="button">
                  Voir mon tableau de bord
                </a>
              </div>
            </div>

            <div class="footer">
              <p>Cette notification a été envoyée automatiquement par Payo365.</p>
              <p style="margin-top: 10px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="color: #667eea; text-decoration: none;">payo365.com</a>
              </p>
            </div>
          </body>
        </html>
      `,
    })

    console.log(`Payment notification sent to ${merchantEmail}`)
  } catch (error) {
    console.error('Failed to send payment notification:', error)
    // Ne pas bloquer le webhook si l'email échoue
  }
}
