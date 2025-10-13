# Démarrage rapide Payo365

## Installation en 5 minutes

### 1. Installation des dépendances

```bash
npm install
```

### 2. Configuration de la base de données

Créez un compte sur [Neon.tech](https://neon.tech) et créez une nouvelle base de données PostgreSQL.

Copiez le fichier `.env.example` en `.env`:

```bash
cp .env.example .env
```

Ajoutez votre URL de connexion dans `.env`:

```env
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
```

Initialisez la base de données:

```bash
npx prisma generate
npx prisma db push
```

### 3. Configuration de l'authentification

#### NextAuth Secret

Générez un secret pour NextAuth:

```bash
openssl rand -base64 32
```

Ajoutez-le dans `.env`:

```env
NEXTAUTH_SECRET="votre-secret-généré"
NEXTAUTH_URL="http://localhost:3000"
```

#### Google OAuth

1. Allez sur [Google Cloud Console](https://console.cloud.google.com)
2. Créez un nouveau projet (ou sélectionnez-en un existant)
3. Activez l'API Google+
4. Allez dans "Identifiants" → "Créer des identifiants" → "ID client OAuth"
5. Type d'application: Application Web
6. Ajoutez les URI de redirection autorisés:
   - `http://localhost:3000/api/auth/callback/google`
7. Copiez le Client ID et Client Secret dans `.env`:

```env
GOOGLE_CLIENT_ID="votre-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="votre-client-secret"
```

### 4. Configuration de Stripe

#### Créer un compte Stripe

1. Créez un compte sur [Stripe](https://stripe.com)
2. Activez le mode test
3. Allez dans "Développeurs" → "Clés API"
4. Copiez les clés dans `.env`:

```env
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

#### Activer Stripe Connect

1. Dans le dashboard Stripe, allez dans "Connect" → "Paramètres"
2. Activez Stripe Connect
3. Choisissez "Express" comme type de compte
4. Configurez l'URL de redirection: `http://localhost:3000/dashboard`

#### Configurer les webhooks (pour le développement local)

Installez la CLI Stripe:

```bash
brew install stripe/stripe-cli/stripe  # macOS
# ou
curl -s https://packages.stripe.com/api/security/keypair/stripe-cli-gpg/public | gpg --dearmor | sudo tee /usr/share/keyrings/stripe.gpg
echo "deb [signed-by=/usr/share/keyrings/stripe.gpg] https://packages.stripe.com/stripe-cli-debian-local stable main" | sudo tee -a /etc/apt/sources.list.d/stripe.list
sudo apt update
sudo apt install stripe  # Linux
```

Connectez-vous à Stripe:

```bash
stripe login
```

Lancez le forwarding des webhooks:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copiez le webhook secret affiché et ajoutez-le dans `.env`:

```env
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### 5. Lancer l'application

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

## Configuration pour la production

### 1. Déployer sur Vercel

1. Créez un compte sur [Vercel](https://vercel.com)
2. Connectez votre repository GitHub
3. Importez le projet
4. Ajoutez toutes les variables d'environnement
5. Modifiez:
   - `NEXTAUTH_URL="https://votre-domaine.vercel.app"`
   - `NEXT_PUBLIC_APP_URL="https://votre-domaine.vercel.app"`
6. Déployez !

### 2. Configurer les webhooks Stripe en production

1. Dans le dashboard Stripe, allez dans "Développeurs" → "Webhooks"
2. Cliquez sur "Ajouter un endpoint"
3. URL: `https://votre-domaine.vercel.app/api/webhooks/stripe`
4. Sélectionnez les événements:
   - `checkout.session.completed`
   - `account.updated`
5. Copiez le secret du webhook dans les variables d'environnement Vercel

### 3. Mettre à jour Google OAuth

Ajoutez l'URL de production dans les URI de redirection autorisés:
- `https://votre-domaine.vercel.app/api/auth/callback/google`

### 4. Activer le mode production Stripe

1. Dans le dashboard Stripe, passez en mode "Live"
2. Générez de nouvelles clés API
3. Mettez à jour les variables d'environnement dans Vercel
4. Redéployez

## Tester l'application

### Cartes de test Stripe

- **Succès**: `4242 4242 4242 4242`
- **Échec**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

Date: N'importe quelle date future
CVC: N'importe quel code à 3 chiffres

### Flux de test complet

1. Connectez-vous avec Google
2. Connectez votre compte Stripe (mode test)
3. Créez un lien de paiement (ex: "Test - 10€")
4. Copiez le lien
5. Ouvrez le lien dans un nouvel onglet incognito
6. Payez avec une carte de test
7. Vérifiez que le statut passe à "Payé" dans le dashboard

## Troubleshooting

### Erreur "Invalid signature" sur le webhook

Le secret du webhook n'est pas correct. Vérifiez:
- Que vous avez bien lancé `stripe listen` en local
- Que le secret est bien copié dans `.env`

### Erreur "Stripe account not connected"

L'utilisateur n'a pas complété l'onboarding Stripe Connect:
- Allez dans le dashboard
- Cliquez sur "Connecter Stripe"
- Complétez le formulaire Stripe

### Erreur de connexion Google OAuth

Vérifiez:
- Que l'API Google+ est activée
- Que les URI de redirection sont corrects
- Que le Client ID et Secret sont corrects

### Erreur de base de données

Vérifiez:
- Que l'URL de connexion est correcte
- Que la base de données est accessible
- Lancez `npx prisma db push` pour synchroniser le schéma

## Support

Pour toute question ou problème:
- Ouvrez une issue sur GitHub
- Consultez la documentation Stripe: https://stripe.com/docs
- Consultez la documentation NextAuth: https://next-auth.js.org
