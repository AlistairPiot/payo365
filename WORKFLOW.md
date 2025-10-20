# Workflow Payo365

## Flux utilisateur complet

### 1. Inscription / Connexion

1. L'utilisateur arrive sur la landing page `/`
2. Il clique sur "Connexion" ou "Commencer gratuitement"
3. Il est redirigé vers NextAuth pour se connecter avec Google
4. Un compte User est créé dans la base de données
5. Il est redirigé vers le dashboard `/dashboard`

### 2. Onboarding Stripe Connect

1. L'utilisateur voit la page "Connectez votre compte Stripe"
2. Il clique sur "Connecter Stripe"
3. API: `POST /api/stripe/connect` crée un compte Stripe Connect Express
4. L'utilisateur est redirigé vers Stripe pour compléter l'onboarding
5. Après validation, il revient sur `/dashboard?stripe=success`
6. Le champ `stripeOnboarded` est mis à `true` dans la DB

### 3. Création d'un lien de paiement

1. L'utilisateur clique sur "+ Nouveau lien"
2. Il remplit le formulaire (titre, description, montant)
3. Frontend appelle `POST /api/checkout` avec les données
4. Backend:
    - Vérifie que l'utilisateur a un compte Stripe Connect onboardé
    - Crée un enregistrement PaymentLink dans la DB
    - Calcule la commission (3%)
    - Crée une Stripe Checkout Session avec:
        - `payment_intent_data.application_fee_amount` = 3% du montant
        - `payment_intent_data.transfer_data.destination` = stripeAccountId de l'utilisateur
    - Met à jour le PaymentLink avec l'URL de la session Stripe
5. Le lien est affiché dans le tableau du dashboard

### 4. Partage du lien

1. L'utilisateur copie le lien: `https://payo365.com/pay/{id}`
2. Il le partage par email, SMS, réseaux sociaux, etc.

### 5. Paiement par le client

1. Le client clique sur le lien et arrive sur `/pay/{id}`
2. La page affiche:
    - Le titre et la description
    - Le montant à payer
    - Le nom du bénéficiaire
    - Un bouton "Payer maintenant"
3. Le client clique sur "Payer maintenant"
4. Il est redirigé vers Stripe Checkout
5. Il entre ses informations de carte bancaire
6. Stripe traite le paiement:
    - Débite le client
    - Prélève 8% de commission pour la plateforme
    - Transfère le reste (97%) au compte Stripe Connect de l'utilisateur

### 6. Confirmation du paiement

1. Stripe envoie un webhook `checkout.session.completed` à `/api/webhooks/stripe`
2. Le webhook:
    - Vérifie la signature du webhook
    - Récupère le `paymentLinkId` depuis les metadata
    - Met à jour le PaymentLink: `paid = true`, `paidAt = now()`
    - Sauvegarde l'email du client
3. Le client est redirigé vers `/pay/{id}?success=true`
4. La page affiche "Paiement en cours de confirmation..."
5. Une fois la DB mise à jour, la page affiche "Paiement réussi !"

### 7. Visualisation dans le dashboard

1. L'utilisateur voit son lien passer de "En attente" à "Payé"
2. Les statistiques sont mises à jour:
    - Nombre de liens créés
    - Nombre de paiements reçus
    - Revenu total
    - Commission plateforme (3%)

## Architecture technique

### Routes API

```
/api/auth/[...nextauth]     → NextAuth.js (authentification)
/api/checkout               → Création de session Stripe Checkout
/api/stripe/connect         → Onboarding Stripe Connect
/api/webhooks/stripe        → Webhooks Stripe
```

### Pages

```
/                           → Landing page
/dashboard                  → Dashboard utilisateur
/pay/[id]                   → Page publique de paiement
```

### Base de données (Prisma)

**User**

-   id, email, name, image
-   stripeAccountId (compte Stripe Connect)
-   stripeOnboarded (boolean)
-   paymentLinks (relation)

**PaymentLink**

-   id, userId, title, description
-   amount (en centimes), currency
-   stripeCheckoutId, stripeSessionUrl
-   paid (boolean), paidAt, customerEmail

**Account, Session, VerificationToken** (NextAuth)

### Flux de paiement Stripe

```
Client → Stripe Checkout
         ↓
      Paiement
         ↓
    ┌─────────────────┐
    │  Stripe prend   │
    │  sa commission  │
    └─────────────────┘
         ↓
    ┌─────────────────┐
    │  Plateforme     │
    │  prend 3%       │
    └─────────────────┘
         ↓
    ┌─────────────────┐
    │  L'utilisateur  │
    │  reçoit 97%     │
    │  (moins frais   │
    │  Stripe)        │
    └─────────────────┘
```

### Webhook Stripe

Événements écoutés:

-   `checkout.session.completed` → Marque le paiement comme payé
-   `account.updated` → Met à jour le statut d'onboarding

## Sécurité

-   Authentification obligatoire pour créer des liens
-   Vérification de la signature des webhooks Stripe
-   Validation des montants côté serveur
-   Utilisation de Stripe Connect pour sécuriser les transferts
-   HTTPS obligatoire en production

## Variables d'environnement critiques

-   `STRIPE_SECRET_KEY` → Ne JAMAIS exposer côté client
-   `STRIPE_WEBHOOK_SECRET` → Pour valider les webhooks
-   `NEXTAUTH_SECRET` → Pour signer les sessions
-   `DATABASE_URL` → Connexion à la base de données

## Prochaines étapes

1. Ajouter des emails de confirmation (Resend/Postmark)
2. Implémenter l'export des données
3. Ajouter des analytics détaillés
4. Support de plusieurs devises
5. Personnalisation de la page de paiement
6. API publique pour intégrations
