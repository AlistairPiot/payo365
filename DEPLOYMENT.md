# Guide de Déploiement - Payo365

## Configuration Production

### Infrastructure
- **Domaine** : payo365.com (Hostinger) - https://hpanel.hostinger.com/domain/payo365.com/domain-overview/Azqb4hUzmhOdV1J5l
- **Base de données** : Neon PostgreSQL - https://console.neon.tech/app/projects/dawn-fog-40470216
- **Hébergement** : Vercel (Next.js)

---

## Étape 1 : Préparer les Clés Stripe de Production

### ⚠️ IMPORTANT : Activer le Mode Live Stripe

Actuellement, le projet utilise des clés de **TEST**. Pour la production :

1. Aller sur le dashboard Stripe : https://dashboard.stripe.com
2. **Basculer en mode Live** (toggle en haut à droite)
3. Récupérer les clés de production :
   - Dans **Developers > API keys** : copier `Secret key` et `Publishable key`
4. Configurer Stripe Connect pour la production :
   - Vérifier que votre compte Stripe est activé pour recevoir des paiements
   - Stripe Connect doit être activé en mode Live

### Configurer le Webhook Stripe (Production)

1. Aller sur : https://dashboard.stripe.com/webhooks (mode Live)
2. Cliquer sur **Add endpoint**
3. URL du endpoint : `https://payo365.com/api/webhooks/stripe`
4. Sélectionner les événements :
   - `checkout.session.completed`
   - `payment_intent.succeeded`
5. Copier le **Signing secret** (commence par `whsec_`)

---

## Étape 2 : Configurer Google OAuth pour Production

1. Aller sur : https://console.cloud.google.com/apis/credentials
2. Sélectionner votre projet OAuth
3. Modifier les **Authorized JavaScript origins** :
   - Ajouter : `https://payo365.com`
4. Modifier les **Authorized redirect URIs** :
   - Ajouter : `https://payo365.com/api/auth/callback/google`
5. Sauvegarder

---

## Étape 3 : Déployer sur Vercel

### 3.1 Connexion et Import du Projet

1. Aller sur : https://vercel.com
2. Se connecter avec GitHub
3. Cliquer sur **Add New... > Project**
4. Importer votre repository `payo365`
5. **Framework Preset** : Next.js (détecté automatiquement)
6. **Build Command** : `npm run build` ou `next build`
7. **Output Directory** : `.next` (par défaut)

### 3.2 Configurer les Variables d'Environnement

Dans **Settings > Environment Variables**, ajouter :

#### Base de Données
```
DATABASE_URL=postgresql://neondb_owner:npg_8k7SEKtibRdo@ep-gentle-rice-aguk92lz-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

#### NextAuth
```
NEXTAUTH_URL=https://payo365.com
NEXTAUTH_SECRET=[GÉNÉRER UN NOUVEAU SECRET - voir ci-dessous]
```

Pour générer un nouveau `NEXTAUTH_SECRET` en production :
```bash
openssl rand -base64 32
```

#### Google OAuth
```
GOOGLE_CLIENT_ID=372805958861-nbv03601akesn1dfvg9s54nn6adf7pgo.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
```

#### Stripe (PRODUCTION - À REMPLACER)
```
STRIPE_SECRET_KEY=sk_live_VOTRE_CLE_SECRETE
STRIPE_PUBLISHABLE_KEY=pk_live_VOTRE_CLE_PUBLIQUE
STRIPE_WEBHOOK_SECRET=whsec_VOTRE_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_VOTRE_CLE_PUBLIQUE
```

#### Configuration App
```
NEXT_PUBLIC_APP_URL=https://payo365.com
NEXT_PUBLIC_PLATFORM_FEE_PERCENT=3
```

### 3.3 Déployer

1. Cliquer sur **Deploy**
2. Attendre la fin du build (environ 2-3 minutes)
3. Vercel va générer une URL temporaire (ex: `payo365.vercel.app`)

---

## Étape 4 : Configurer le Domaine Custom (Hostinger → Vercel)

### 4.1 Récupérer les DNS de Vercel

1. Dans Vercel, aller dans **Settings > Domains**
2. Ajouter le domaine : `payo365.com`
3. Vercel va vous donner des enregistrements DNS à configurer

### 4.2 Configurer les DNS sur Hostinger

1. Aller sur : https://hpanel.hostinger.com/domain/payo365.com/dns
2. Ajouter les enregistrements DNS fournis par Vercel :

**Option A : Configuration CNAME (Recommandé)**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

**Option B : Configuration A Records**
```
Type: A
Name: @
Value: 76.76.21.21
```

3. Pour le sous-domaine `www` :
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

4. Sauvegarder les changements
5. **Propagation DNS** : attendre 5-30 minutes

### 4.3 Vérifier le Domaine

1. Retourner sur Vercel > Settings > Domains
2. Cliquer sur **Refresh** jusqu'à ce que le domaine soit vérifié
3. Une fois vérifié, `payo365.com` pointera vers votre application

---

## Étape 5 : Initialiser la Base de Données (Neon)

La base de données Neon est déjà créée, mais il faut s'assurer que le schéma Prisma est appliqué :

### Option 1 : Via Vercel (après déploiement)
```bash
# Depuis votre machine locale
npm run build
```

Vercel exécutera automatiquement `prisma generate` via le hook `postinstall`

### Option 2 : Manuellement via Neon
1. Aller sur : https://console.neon.tech/app/projects/dawn-fog-40470216
2. Ouvrir le **SQL Editor**
3. S'assurer que toutes les tables sont créées (users, accounts, sessions, payment_links, etc.)

---

## Étape 6 : Tests Post-Déploiement

### 6.1 Vérifier l'Application
- [ ] Accéder à `https://payo365.com`
- [ ] La page d'accueil se charge correctement
- [ ] Les assets (CSS, images) sont bien chargés

### 6.2 Tester l'Authentification
- [ ] Cliquer sur "Se connecter"
- [ ] Authentification Google fonctionne
- [ ] Redirection après connexion OK
- [ ] Session persistante

### 6.3 Tester Stripe Connect
- [ ] Se connecter avec un compte
- [ ] Accéder au dashboard
- [ ] Cliquer sur "Connecter Stripe"
- [ ] Compléter l'onboarding Stripe Connect
- [ ] Vérifier que `stripeAccountId` est enregistré

### 6.4 Tester les Paiements
- [ ] Créer un lien de paiement
- [ ] Copier le lien
- [ ] Ouvrir en navigation privée
- [ ] Effectuer un paiement test avec :
  - Carte test : `4242 4242 4242 4242`
  - Date : n'importe quelle date future
  - CVC : n'importe quel 3 chiffres
- [ ] Vérifier que le webhook est reçu
- [ ] Vérifier que le paiement est marqué comme `paid` dans la DB

### 6.5 Vérifier les Webhooks
1. Aller sur : https://dashboard.stripe.com/webhooks
2. Cliquer sur le webhook de production
3. Vérifier les **Recent deliveries**
4. S'assurer qu'il n'y a pas d'erreurs (statut 200)

---

## Étape 7 : Monitoring et Logs

### Vercel Logs
- Aller sur : https://vercel.com/[votre-projet]/logs
- Surveiller les erreurs en temps réel

### Neon Monitoring
- Aller sur : https://console.neon.tech/app/projects/dawn-fog-40470216
- Vérifier les **Queries** et les connexions actives

### Stripe Dashboard
- Surveiller les paiements : https://dashboard.stripe.com/payments
- Vérifier les transfers vers les comptes connectés

---

## Commandes Utiles

### Redéployer depuis local
```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel --prod
```

### Vérifier les variables d'environnement
```bash
vercel env ls
```

### Voir les logs en temps réel
```bash
vercel logs --follow
```

### Regénérer Prisma Client (si nécessaire)
```bash
npx prisma generate
npx prisma db push  # Appliquer le schéma sans migration
```

---

## Sécurité Post-Production

### ✅ À Vérifier
- [ ] `.env` et `.env.production` sont dans `.gitignore`
- [ ] Ne **jamais** commiter les secrets dans Git
- [ ] Utiliser les clés Stripe **Live** (pas Test)
- [ ] NEXTAUTH_SECRET unique en production
- [ ] HTTPS activé (automatique avec Vercel)
- [ ] Stripe webhooks configurés en LIVE mode

### 🔒 Recommandations
- Activer l'authentification à deux facteurs (2FA) sur :
  - Vercel
  - Stripe
  - Google Cloud Console
  - Neon
  - Hostinger
- Surveiller les logs régulièrement
- Configurer des alertes Stripe pour les paiements
- Faire des sauvegardes de la base de données Neon

---

## Troubleshooting

### Erreur : "Database connection failed"
- Vérifier que `DATABASE_URL` est correctement configurée dans Vercel
- S'assurer que `?sslmode=require` est dans l'URL

### Erreur : "NEXTAUTH_URL mismatch"
- Vérifier que `NEXTAUTH_URL=https://payo365.com` (sans trailing slash)
- Vérifier que Google OAuth autorise `https://payo365.com`

### Erreur : "Stripe webhook signature invalid"
- S'assurer que `STRIPE_WEBHOOK_SECRET` correspond au webhook de **production**
- Vérifier que l'URL du webhook est `https://payo365.com/api/webhooks/stripe`

### Domaine ne pointe pas vers Vercel
- Attendre 30 minutes pour la propagation DNS
- Vérifier les DNS sur : https://dnschecker.org
- S'assurer que les CNAME sont corrects sur Hostinger

---

## Contact et Support

- **Vercel Support** : https://vercel.com/support
- **Stripe Support** : https://support.stripe.com
- **Neon Support** : https://neon.tech/docs/introduction
- **Next.js Docs** : https://nextjs.org/docs

---

Bon déploiement ! 🚀
