# Payo365 - Lien de paiement instantané

Un SaaS ultra simple qui permet aux freelances et créateurs de générer instantanément des liens de paiement Stripe et de recevoir leurs paiements, avec une commission de 3% par transaction.

## Fonctionnalités

-   Authentification via Google avec NextAuth.js
-   Connexion Stripe Connect pour recevoir les paiements
-   Création de liens de paiement en quelques clics
-   Commission automatique de 3% sur chaque paiement
-   Dashboard avec statistiques et gestion des liens
-   Page publique de paiement sécurisée
-   Webhooks Stripe pour la confirmation des paiements

## Stack technique

-   **Frontend:** Next.js 15 (App Router) + TypeScript
-   **UI:** Tailwind CSS + shadcn/ui
-   **Database:** PostgreSQL (Neon.tech) + Prisma ORM
-   **Auth:** NextAuth.js (Google OAuth)
-   **Paiements:** Stripe Connect
-   **Déploiement:** Vercel

## Installation

### 1. Cloner le projet

```bash
git clone <votre-repo>
cd Payo365
npm install
```

### 2. Configurer la base de données

1. Créez un compte sur [Neon.tech](https://neon.tech)
2. Créez une nouvelle base de données PostgreSQL
3. Copiez l'URL de connexion

### 3. Configurer Stripe

1. Créez un compte sur [Stripe](https://stripe.com)
2. Activez Stripe Connect dans votre dashboard
3. Récupérez vos clés API (Test mode pour le développement)
4. Créez un webhook endpoint pointant vers `https://votre-domaine.com/api/webhooks/stripe`
5. Sélectionnez les événements: `checkout.session.completed`, `account.updated`
6. Récupérez le secret du webhook

### 4. Configurer Google OAuth

1. Allez sur [Google Cloud Console](https://console.cloud.google.com)
2. Créez un nouveau projet
3. Activez l'API Google+
4. Créez des identifiants OAuth 2.0
5. Ajoutez `http://localhost:3000/api/auth/callback/google` dans les URL de redirection
6. Récupérez le Client ID et Client Secret

### 5. Variables d'environnement

Copiez le fichier `.env.example` en `.env` et remplissez les valeurs :

```bash
cp .env.example .env
```

```env
# Database
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="générez-avec: openssl rand -base64 32"

# Google OAuth
GOOGLE_CLIENT_ID="votre-client-id"
GOOGLE_CLIENT_SECRET="votre-client-secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_PLATFORM_FEE_PERCENT="3"
```

### 6. Initialiser la base de données

```bash
npx prisma generate
npx prisma db push
```

### 7. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Structure du projet

```
Payo365/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/   # NextAuth routes
│   │   ├── checkout/             # Création session Stripe
│   │   ├── stripe/connect/       # Onboarding Stripe Connect
│   │   └── webhooks/stripe/      # Webhooks Stripe
│   ├── dashboard/                # Dashboard utilisateur
│   ├── pay/[id]/                 # Page publique de paiement
│   └── page.tsx                  # Landing page
├── components/
│   └── dashboard/                # Composants du dashboard
├── lib/
│   ├── auth.ts                   # Configuration NextAuth
│   ├── prisma.ts                 # Client Prisma
│   └── stripe.ts                 # Client Stripe
├── prisma/
│   └── schema.prisma             # Schéma de base de données
└── types/
    └── next-auth.d.ts            # Types NextAuth
```

## Déploiement sur Vercel

1. Créez un compte sur [Vercel](https://vercel.com)
2. Importez votre repository GitHub
3. Configurez les variables d'environnement
4. Déployez !

N'oubliez pas de mettre à jour :

-   `NEXTAUTH_URL` avec votre domaine de production
-   `NEXT_PUBLIC_APP_URL` avec votre domaine de production
-   Les URL de callback Google OAuth
-   L'URL du webhook Stripe

## Commandes utiles pour le développement

### Stripe CLI

**Installer Stripe CLI (Linux) :**

```bash
# Télécharger et extraire
wget https://github.com/stripe/stripe-cli/releases/download/v1.31.0/stripe_1.31.0_linux_x86_64.tar.gz
tar -xzf stripe_1.31.0_linux_x86_64.tar.gz

# Authentifier (première fois uniquement)
./stripe login
```

**Écouter les webhooks en local :**

```bash
./stripe listen --forward-to localhost:3000/api/webhook
```

⚠️ **Important :** Cette commande doit tourner en permanence pendant le développement pour que les paiements fonctionnent !

**Vérifier votre compte Stripe Connect :**

```bash
./stripe get /v1/accounts/acct_VOTRE_ACCOUNT_ID
```

**Voir les événements récents :**

```bash
./stripe events list
```

**Déclencher un événement de test :**

```bash
./stripe trigger checkout.session.completed
```

**Voir les logs en temps réel :**

```bash
./stripe logs tail
```

### Base de données (Prisma)

**Synchroniser le schéma avec la DB :**

```bash
npx prisma db push
```

**Ouvrir Prisma Studio (interface visuelle) :**

```bash
npx prisma studio
```

**Générer le client Prisma :**

```bash
npx prisma generate
```

**Créer une migration :**

```bash
npx prisma migrate dev --name nom_de_la_migration
```

**Réinitialiser la base de données :**

```bash
npx prisma migrate reset
```

### Next.js

**Lancer le serveur de développement :**

```bash
npm run dev
```

**Build de production :**

```bash
npm run build
```

**Lancer en production :**

```bash
npm start
```

**Vérifier les erreurs TypeScript :**

```bash
npm run type-check
```

### Workflow de développement typique

**Terminal 1 - Application Next.js :**

```bash
npm run dev
```

**Terminal 2 - Webhooks Stripe :**

```bash
./stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

**Terminal 3 (optionnel) - Prisma Studio :**

```bash
npx prisma studio
```

## Cartes de test Stripe

### Paiements réussis

-   **Carte valide :** `4242 4242 4242 4242`
-   **Date :** N'importe quelle date future (ex: `12/34`)
-   **CVC :** N'importe quel code à 3 chiffres (ex: `123`)
-   **Code postal :** N'importe lequel

### Tester des erreurs

-   **Carte refusée :** `4000 0000 0000 0002`
-   **Fonds insuffisants :** `4000 0000 0000 9995`
-   **CVC incorrect :** `4000 0000 0000 0127`

### 3D Secure (authentification forte)

-   **Authentification réussie :** `4000 0027 6000 3184`
-   **Authentification échouée :** `4000 0082 6000 3178`

## Roadmap

-   [ ] Support de plusieurs devises
-   [ ] Email de confirmation automatique
-   [ ] Analytics avancés
-   [ ] Export des données
-   [ ] API publique
-   [ ] Personnalisation de la page de paiement

## Licence

MIT
