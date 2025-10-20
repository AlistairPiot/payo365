# 🚀 Checklist de mise en production Payo365

**Date de création:** 13 octobre 2025
**Statut MVP:** ✅ 85% prêt pour la production

---

## ⚠️ CRITIQUE (OBLIGATOIRE AVANT LANCEMENT)

### 1. Configuration Stripe Webhook ⚡ PRIORITÉ #1

**🔴 Problème actuel:** Les `stripePaymentIntentId` ne sont pas enregistrés automatiquement, empêchant la génération de factures.

**✅ Solution étape par étape:**

#### A. Passer Stripe en mode LIVE

1. [ ] Aller sur https://dashboard.stripe.com
2. [ ] Toggle "Test mode" → "Live mode" (en haut à droite)
3. [ ] Compléter le questionnaire de vérification si demandé

#### B. Créer le webhook de PRODUCTION

1. [ ] Aller sur https://dashboard.stripe.com/webhooks (en mode LIVE!)
2. [ ] Cliquer sur **"Add endpoint"**
3. [ ] Configuration:

    - **Endpoint URL:** `https://votre-domaine.com/api/webhooks/stripe`
    - **Description:** "Payo365 Production Webhook"
    - **Version API:** Sélectionner la plus récente (≥ 2025-09-30)

4. [ ] **Événements à sélectionner:**

    - ✅ `checkout.session.completed` ← CRITIQUE (génération factures)
    - ✅ `account.updated` ← Pour Stripe Connect

5. [ ] Cliquer sur **"Add endpoint"**

#### C. Récupérer le secret du webhook

1. [ ] Dans la liste des webhooks, cliquer sur celui créé
2. [ ] Section "Signing secret" → Cliquer sur **"Reveal"**
3. [ ] Copier la valeur (commence par `whsec_`)

#### D. Configurer dans l'hébergement

1. [ ] Dans Vercel/Railway/votre hébergeur:
    - Nom: `STRIPE_WEBHOOK_SECRET`
    - Valeur: `whsec_xxxxxxxxxxxxx`
2. [ ] Redéployer l'application

#### E. Tester le webhook

```bash
# Utiliser le script fourni pour vérifier un paiement
npx tsx scripts/check-payment.ts [ID_DU_PAIEMENT]

# Vérifier que stripePaymentIntentId est bien rempli
# Si null → le webhook ne fonctionne pas
```

**🧪 Test de validation complet:**

-   [ ] Créer un nouveau lien de paiement de 1€
-   [ ] Effectuer le paiement
-   [ ] Vérifier que le statut passe à "Payé"
-   [ ] Cliquer sur "Facture" → Le PDF doit se télécharger
-   [ ] Si erreur 400 → webhook pas configuré correctement

---

### 2. Variables d'environnement de production

**⚙️ À configurer sur Vercel/Railway/votre hébergeur:**

#### Variables Stripe (mode LIVE)

-   [ ] `STRIPE_SECRET_KEY` = `sk_live_...` (depuis https://dashboard.stripe.com/apikeys)
-   [ ] `STRIPE_PUBLISHABLE_KEY` = `pk_live_...`
-   [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = `pk_live_...` (même valeur)
-   [ ] `STRIPE_WEBHOOK_SECRET` = `whsec_...` (du point 1)

#### Base de données

-   [ ] `DATABASE_URL` = URL PostgreSQL de production (Neon/Supabase/autre)
    -   ⚠️ Créer une NOUVELLE base de données pour la prod (pas la même que test!)

#### NextAuth

-   [ ] `NEXTAUTH_URL` = `https://votre-domaine.com` (sans trailing slash)
-   [ ] `NEXTAUTH_SECRET` = Générer nouveau secret:
    ```bash
    openssl rand -base64 32
    ```

#### Google OAuth (production)

1. [ ] Aller sur https://console.cloud.google.com
2. [ ] Créer des credentials OAuth pour la PRODUCTION
3. [ ] Authorized redirect URIs: `https://votre-domaine.com/api/auth/callback/google`
4. [ ] Copier le nouveau Client ID et Secret
5. [ ] Configurer:
    - `GOOGLE_CLIENT_ID` = `xxxxx.apps.googleusercontent.com`
    - `GOOGLE_CLIENT_SECRET` = `GOCSPX-xxxxx`

#### App Configuration

-   [ ] `NEXT_PUBLIC_APP_URL` = `https://votre-domaine.com`
-   [ ] `NEXT_PUBLIC_PLATFORM_FEE_PERCENT` = `3`

**📋 Fichier .env.production à créer:**

```bash
# Copier ce template dans votre hébergeur
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://votre-domaine.com"
NEXTAUTH_SECRET="[généré avec openssl]"
GOOGLE_CLIENT_ID="xxxxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxxxx"
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
NEXT_PUBLIC_APP_URL="https://votre-domaine.com"
NEXT_PUBLIC_PLATFORM_FEE_PERCENT="3"
```

---

### 3. Stripe Connect - Votre compte vendeur

**🏦 Configuration de VOTRE compte pour recevoir les commissions:**

#### A. Terminer l'onboarding Stripe Connect

1. [ ] Se connecter en tant qu'utilisateur sur votre app
2. [ ] Aller dans le Dashboard
3. [ ] Cliquer sur "Connecter Stripe" si pas déjà fait
4. [ ] Compléter TOUTES les informations demandées par Stripe:
    - Informations personnelles
    - Informations bancaires (RIB)
    - Documents d'identité
    - Informations fiscales (SIRET)

#### B. Vérifier le statut

-   [ ] Statut doit être: ✅ "charges_enabled: true"
-   [ ] Vérifier dans: https://dashboard.stripe.com/connect/accounts/overview

#### C. Tester un paiement réel

-   [ ] Créer un lien de 1€
-   [ ] Le payer avec une vraie carte
-   [ ] Vérifier que:
    -   Le paiement apparaît dans Stripe Dashboard
    -   La commission de 3% est prélevée
    -   Le reste va sur votre compte Stripe
    -   La facture se génère correctement

---

### 4. Nom de domaine et déploiement

#### A. Acheter un nom de domaine

**Options recommandées:**

-   [ ] **OVH** (français, bon support): ~10€/an
-   [ ] **Namecheap**: ~12$/an
-   [ ] **Google Domains** (maintenant Squarespace): ~12$/an

**Suggestions de noms:**

-   payo365.com
-   payo365.fr
-   getpayo.com
-   payo.io

#### B. Déployer sur Vercel (recommandé)

1. [ ] Créer compte sur https://vercel.com
2. [ ] Connecter votre repo GitHub
3. [ ] Importer le projet Payo365
4. [ ] Configurer les variables d'environnement (voir point 2)
5. [ ] Déployer

**⚡ Commandes:**

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel --prod
```

#### C. Configurer le domaine

1. [ ] Dans Vercel: Settings → Domains → Add domain
2. [ ] Entrer votre domaine (ex: payo365.com)
3. [ ] Configurer les DNS chez votre registrar:

    ```
    Type: A
    Name: @
    Value: 76.76.21.21 (IP de Vercel)

    Type: CNAME
    Name: www
    Value: cname.vercel-dns.com
    ```

4. [ ] Attendre la propagation DNS (15min - 48h)

#### D. HTTPS

-   [ ] Vercel active HTTPS automatiquement ✅
-   [ ] Forcer HTTPS dans next.config.js si nécessaire

---

## 📝 IMPORTANT (Recommandé avant lancement public)

### 5. Protection légale

#### A. Médiateur de la consommation (OBLIGATOIRE)

**🔴 Requis par la loi française**

1. [ ] **Adhérer au CM2C:**

    - Site: https://www.cm2c.net
    - Coût: ~50-100€/an
    - Remplir le formulaire d'adhésion
    - Attendre validation (quelques jours)

2. [ ] Mettre à jour les mentions légales:
    - ✅ Déjà fait dans `/app/legal/mentions-legales/page.tsx`
    - Vérifier que les infos CM2C sont correctes

#### B. Assurance RC Pro

-   [ ] Vérifier que votre contrat actuel (N° RCP250906183077) couvre:
    -   E-commerce
    -   Traitement de paiements en ligne
    -   Responsabilité professionnelle pour plateforme
-   [ ] Si non → souscrire assurance adaptée (~300-500€/an)

#### C. Adresse légale

**⚠️ Actuellement:** Seule "Poitiers" est indiquée
**📍 Légalement requis:** Adresse complète

**Options:**

1. **Accepter d'afficher votre adresse perso** (gratuit mais pas privé)
2. **Domiciliation commerciale** (~15-30€/mois):
    - Permet d'avoir une adresse pro
    - Protège votre vie privée
    - Services: Regus, WeWork, Bureaux Locaux, etc.

-   [ ] Décider de l'option
-   [ ] Mettre à jour `/app/legal/mentions-legales/page.tsx` ligne 44

---

### 6. Email professionnel

**📧 Problème actuel:** Utilisation de `alistair.piot@gmail.com`
**✅ Solution:** Email professionnel type `contact@payo365.com`

#### A. Configurer l'email

**Options:**

1. **Google Workspace** (recommandé): 6€/mois

    - Gmail professionnel
    - Support client
    - 30 Go de stockage

2. **Zoho Mail** (gratuit jusqu'à 5 utilisateurs):

    - Bon pour démarrer
    - Interface correcte

3. **Email du domaine** (via OVH/Namecheap): ~1€/mois
    - Basique mais suffisant

#### B. Remplacer dans le code

Une fois l'email pro configuré:

```bash
# Chercher toutes les occurrences
grep -r "alistair.piot@gmail.com" app/

# Remplacer par:
# contact@payo365.com ou support@payo365.com
```

Fichiers à modifier:

-   [ ] `/app/api/payment-links/[id]/invoice/route.ts` (ligne ~180)
-   [ ] `/app/legal/mentions-legales/page.tsx`
-   [ ] `/app/legal/cgv/page.tsx`
-   [ ] `/app/legal/cgu/page.tsx`
-   [ ] `/app/legal/confidentialite/page.tsx`

---

### 7. Analytics et monitoring

#### A. Analytics (choix recommandé)

**Option 1 - Plausible (RGPD-friendly):**

-   [ ] S'inscrire sur https://plausible.io (~9€/mois)
-   [ ] Ajouter le script dans `/app/layout.tsx`
-   [ ] Pas besoin de cookie consent

**Option 2 - Google Analytics 4 (gratuit):**

-   [ ] Créer propriété GA4
-   [ ] Installer `@next/third-parties`
-   [ ] ⚠️ Nécessite cookie consent banner

#### B. Monitoring d'erreurs

**Sentry (recommandé):**

```bash
# Installation
npm install @sentry/nextjs

# Init
npx @sentry/wizard@latest -i nextjs
```

-   [ ] Créer compte sur https://sentry.io (gratuit jusqu'à 5k erreurs/mois)
-   [ ] Suivre le wizard d'installation
-   [ ] Tester avec une erreur volontaire

#### C. Uptime monitoring

**UptimeRobot (gratuit):**

-   [ ] S'inscrire sur https://uptimerobot.com
-   [ ] Créer un monitor HTTP pour https://votre-domaine.com
-   [ ] Configurer alertes email
-   [ ] Vérifier toutes les 5 minutes

---

### 8. Sécurité

#### A. Rate limiting sur les APIs

**Ajouter protection contre les abus:**

Créer `/middleware.ts`:

```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "10 s"),
});

export async function middleware(request: Request) {
    if (request.url.includes("/api/")) {
        const ip = request.headers.get("x-forwarded-for");
        const { success } = await ratelimit.limit(ip);
        if (!success) return new Response("Too Many Requests", { status: 429 });
    }
}
```

-   [ ] S'inscrire sur https://upstash.com (gratuit jusqu'à 10k requêtes/jour)
-   [ ] Ajouter rate limiting
-   [ ] Tester avec un script automatisé

#### B. Headers de sécurité

Ajouter dans `next.config.js`:

```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
      ],
    },
  ];
}
```

-   [ ] Ajouter headers de sécurité
-   [ ] Tester sur https://securityheaders.com

#### C. Audit de sécurité

-   [ ] Vérifier toutes les routes API ont:
    -   Vérification d'authentification (`await auth()`)
    -   Vérification des permissions (user = owner)
    -   Validation des inputs (types, longueurs)

---

### 9. Tests avant lancement

#### A. Parcours utilisateur complet

-   [ ] **Inscription:**

    -   [ ] Via Google OAuth fonctionne
    -   [ ] Utilisateur créé dans la BDD
    -   [ ] Redirection vers dashboard OK

-   [ ] **Stripe Connect:**

    -   [ ] Bouton "Connecter Stripe" visible
    -   [ ] Onboarding Stripe s'ouvre correctement
    -   [ ] Retour après onboarding fonctionne
    -   [ ] Statut "onboarded" se met à jour

-   [ ] **Création de lien:**

    -   [ ] Formulaire validation fonctionne
    -   [ ] Lien créé avec succès
    -   [ ] URL générée est correcte
    -   [ ] Copier fonctionne

-   [ ] **Paiement:**

    -   [ ] Page de paiement s'affiche
    -   [ ] Informations correctes affichées
    -   [ ] Paiement Stripe fonctionne
    -   [ ] Webhook reçu
    -   [ ] Statut "paid" mis à jour
    -   [ ] Email client enregistré

-   [ ] **Facture:**
    -   [ ] Bouton "Facture" visible
    -   [ ] PDF se télécharge
    -   [ ] Informations correctes dans le PDF
    -   [ ] Commission 8% calculée correctement

#### B. Tests navigateurs

-   [ ] Chrome/Edge
-   [ ] Firefox
-   [ ] Safari (Mac/iPhone)
-   [ ] Responsive mobile (< 768px)
-   [ ] Responsive tablette (768-1024px)

#### C. Tests d'erreur

-   [ ] Paiement refusé → Message d'erreur clair
-   [ ] Webhook raté → Retry automatique
-   [ ] Connexion perdue → Gestion propre
-   [ ] Session expirée → Redirection login

---

## 🎨 OPTIONNEL (Améliorations post-lancement)

### 10. SEO et Marketing

#### A. Meta tags SEO

Ajouter dans `/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
    title: "Payo365 - Liens de paiement en 30 secondes",
    description:
        "Créez des liens de paiement instantanément. 100% gratuit, 3% de commission. Pour freelances et créateurs.",
    openGraph: {
        title: "Payo365",
        description: "La solution ultra simple pour recevoir des paiements",
        url: "https://payo365.com",
        siteName: "Payo365",
        images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Payo365",
        description: "Créez des liens de paiement en quelques secondes",
        images: ["/twitter-image.png"],
    },
};
```

-   [ ] Créer images OG (1200x630px)
-   [ ] Créer favicon set complet
-   [ ] Tester avec https://metatags.io

#### B. Sitemap & Robots

-   [ ] Générer sitemap.xml
-   [ ] Créer robots.txt
-   [ ] Soumettre à Google Search Console

---

### 11. UX/Design

-   [ ] **Logo professionnel:** Remplacer le bouton gradient par un vrai logo
-   [ ] **Favicon:** Créer favicon.ico + apple-touch-icon
-   [ ] **Loading states:** Skeletons pour améliorer la perception
-   [ ] **Emails transactionnels:**
    -   Confirmation de paiement au client
    -   Notification de paiement reçu au vendeur
    -   Via Resend ou SendGrid

---

### 12. Fonctionnalités V2

**Prioriser selon feedback utilisateurs:**

-   [ ] Export CSV des transactions
-   [ ] Graphiques revenus dans dashboard
-   [ ] QR codes pour les liens
-   [ ] Personnalisation branding (couleurs, logo)
-   [ ] Multi-devises (USD, GBP, CHF)
-   [ ] Paiements récurrents / abonnements
-   [ ] API pour intégrations tierces
-   [ ] Mode "paiement libre" (montant choisi par client)

---

### 13. Support client

-   [ ] **FAQ page:** Top 10 questions
-   [ ] **Documentation:** Guide d'utilisation
-   [ ] **Chat support:** Crisp ou Intercom (gratuit jusqu'à 2 users)
-   [ ] **Email auto-répondeur:** Confirmer réception des demandes
-   [ ] **Vidéo démo:** 2-3 min montrant comment ça marche

---

## 📊 Tableau de bord de progression

### Statut actuel: 85% ✅

| Catégorie                | Progression | Temps estimé |
| ------------------------ | ----------- | ------------ |
| ⚠️ **Critique** (1-4)    | 25%         | 4-6 heures   |
| 📝 **Important** (5-9)   | 40%         | 2-3 jours    |
| 🎨 **Optionnel** (10-13) | 0%          | 1-2 semaines |

---

## 🗓️ Planning recommandé

### Semaine 1 - Lancement MVP

**Lundi-Mardi:**

-   Webhook Stripe (2h)
-   Variables environnement (1h)
-   Acheter domaine (30min)
-   Déployer sur Vercel (1h)

**Mercredi-Jeudi:**

-   Tests complets (3h)
-   Adhérer médiateur CM2C (1h)
-   Email professionnel (2h)

**Vendredi:**

-   Lancement soft (amis/famille)
-   Monitoring des erreurs

### Semaine 2 - Consolidation

-   Analytics
-   Rate limiting
-   Tests utilisateurs réels
-   Corrections bugs

### Semaine 3+ - Croissance

-   SEO
-   Marketing
-   Fonctionnalités V2
-   Support

---

## ✅ Validation finale avant GO LIVE

**Checklist ultime:**

-   [ ] Paiement test de bout en bout fonctionne
-   [ ] Facture se génère sans erreur
-   [ ] Aucune erreur dans Sentry
-   [ ] Uptime > 99% sur les tests
-   [ ] Webhook configuré et fonctionnel
-   [ ] Variables d'environnement LIVE (pas TEST!)
-   [ ] DNS configuré et propagé
-   [ ] HTTPS actif
-   [ ] Mentions légales complètes
-   [ ] Email professionnel actif
-   [ ] Au moins 1 paiement test réussi en LIVE

---

## 📞 Support et ressources

**Documentation:**

-   Stripe: https://stripe.com/docs
-   Next.js: https://nextjs.org/docs
-   Vercel: https://vercel.com/docs

**Scripts utiles fournis:**

-   `scripts/check-payment.ts` - Vérifier un paiement
-   `scripts/fix-payment-intent.ts` - Réparer un paiement sans PaymentIntent

**Contact urgence:**

-   Stripe Support: https://support.stripe.com
-   Vercel Support: support@vercel.com

---

## 🎉 Félicitations!

Vous avez construit un **excellent MVP**. Les fondations sont solides:

-   ✅ Architecture propre
-   ✅ Sécurisé (Stripe, NextAuth)
-   ✅ Conforme RGPD
-   ✅ Fonctionnalités essentielles
-   ✅ Design professionnel

**Vous êtes prêt à lancer!** 🚀

Une fois les points critiques (1-4) complétés, vous pouvez ouvrir au public et itérer progressivement sur les améliorations.

**Bonne chance avec Payo365!** 💪
