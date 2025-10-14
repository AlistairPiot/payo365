# Charte Graphique Payo365

## Vue d'ensemble
Payo365 utilise une identité visuelle **moderne, rassurante et minimaliste** qui inspire confiance pour les paiements en ligne. Le design met l'accent sur la clarté, la rapidité et la sécurité.

---

## 🎨 Palette de couleurs

### Couleurs principales

| Type | Code couleur | Variable CSS | Usage |
|------|-------------|--------------|-------|
| **Primaire** | `#4CAF50` (vert vif) | `var(--primary)` | Boutons d'action, CTA principaux, succès paiement |
| **Primaire hover** | `#45a049` | `var(--primary-hover)` | État hover des boutons primaires |
| **Secondaire** | `#1F2937` (gris foncé) | `var(--secondary)` | Texte principal, titres |
| **Accent** | `#FBBF24` (jaune/orange) | `var(--accent)` | Highlight, badges, notifications |
| **Neutre clair** | `#F3F4F6` (gris très clair) | `var(--neutral-light)` | Background, sections |
| **Neutre sombre** | `#111827` (gris presque noir) | `var(--neutral-dark)` | Footer, headers secondaires |
| **Erreur** | `#EF4444` (rouge vif) | `var(--error)` | Messages d'erreur, alertes paiement |
| **Succès** | `#4CAF50` (vert vif) | `var(--success)` | Messages de succès |

### Pourquoi ces couleurs ?
- **Vert** → Confiance et sécurité, classique pour les paiements
- **Jaune/Orange** → Attire l'attention sans être agressif
- **Gris neutre** → Minimalisme et lisibilité maximale

---

## 🖋️ Typographie

### Fonts utilisées

```tsx
// Dans layout.tsx
const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});

const roboto = Roboto({
    variable: "--font-roboto",
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});
```

### Usage
- **Titres et CTA** : Inter, 700 (bold) → Moderne, lisible, friendly
- **Texte courant** : Roboto, 400 (regular) → Lisible sur tous supports
- **Monospace** : Geist Mono → Pour code ou IDs de paiement (optionnel)

---

## 🎨 Classes utilitaires disponibles

### Boutons

```tsx
// Bouton primaire (vert)
<button className="btn-primary">Action principale</button>

// Bouton secondaire (gris foncé)
<button className="btn-secondary">Action secondaire</button>

// Bouton outline
<button className="btn-outline">Action tertiaire</button>
```

**Caractéristiques des boutons :**
- Border-radius : 8px
- Effet hover : légère élévation + changement de couleur
- Transition douce : 0.2s ease
- Shadow : subtil

### Boutons d'action (petits)

Pour les actions dans les tables ou les listes :

```tsx
// Action primaire (vert)
<button className="btn-action btn-action-primary">Copier</button>

// Action réussie (vert)
<button className="btn-action btn-action-success">Facture</button>

// Action neutre (gris)
<button className="btn-action btn-action-neutral">Modifier</button>

// Action danger (rouge)
<button className="btn-action btn-action-danger">Supprimer</button>
```

**Caractéristiques :**
- Plus petits que les boutons standards
- Padding : 0.375rem 0.75rem
- Font-size : 0.875rem (14px)
- Couleurs de fond légères (10-20% opacity)
- Hover : background opacity augmentée

### Cartes

```tsx
// Carte avec effet hover
<div className="card">
  {/* Contenu de la carte */}
</div>

// Carte sans hover (pour modales, dialogs)
<div className="card-static">
  {/* Contenu de la modale */}
</div>
```

**Caractéristiques :**
- Fond blanc
- Shadow : `var(--shadow-md)` (`.card`) ou `var(--shadow-lg)` (`.card-static`)
- Border-radius : 8px
- Padding : 1.5rem
- Hover : shadow plus importante + translateY(-2px) **uniquement pour `.card`**

**Quand utiliser :**
- `.card` : Pour les éléments de contenu normaux (stats, formulaires, listes)
- `.card-static` : Pour les modales, dialogs, overlays (pas d'effet hover)

### Inputs & Forms

```tsx
// Input
<input className="input" />

// Label
<label className="label">Mon label</label>
```

**Focus states :**
- Border verte : `var(--primary)`
- Ring shadow vert : `0 0 0 3px rgba(76, 175, 80, 0.1)`

### Badges

```tsx
<span className="badge badge-success">Payé</span>
<span className="badge badge-warning">En attente</span>
<span className="badge badge-error">Échoué</span>
<span className="badge badge-accent">3% commission</span>
```

### Alertes

```tsx
<div className="alert alert-success">Paiement réussi !</div>
<div className="alert alert-error">Erreur de paiement</div>
<div className="alert alert-info">Information importante</div>
```

---

## 🖌️ Style des composants

### Arrondis (Border-radius)
- **Petits** : 4px (`var(--radius-sm)`)
- **Moyens** : 8px (`var(--radius-md)`) → **Standard recommandé**
- **Grands** : 12px (`var(--radius-lg)`)

### Ombres (Shadows)
- **Légère** : `var(--shadow-sm)` → Boutons, éléments subtils
- **Moyenne** : `var(--shadow-md)` → Cartes, conteneurs
- **Importante** : `var(--shadow-lg)` → Modals, éléments en overlay

### Animations
- **Fade-in** : `.animate-fade-in` (0.2s)
- **Slide-in** : `.animate-slide-in` (0.3s)
- **Scale-in** : `.animate-scale-in` (0.2s)

---

## 🎯 Principes UX

### Design Patterns
1. **Minimalisme** → Le focus est sur le lien de paiement
2. **Animations douces** → Hover, chargement de paiement
3. **Layout responsive** → Mobile first (beaucoup de freelances utilisent le mobile)
4. **Feedback instantané** → Success/erreur avec couleurs dédiées

### Hiérarchie visuelle
1. **CTA principal** → Toujours visible et coloré (vert)
2. **Micro-texte transparent** → Ex: "Commission 3 % incluse" (badge accent)
3. **Texte principal** → Gris foncé `var(--secondary)`
4. **Texte secondaire** → Gris moyen `#6B7280`

---

## 🏁 Inspirations

- **Stripe** → Clean, trust, minimal
- **PayPal / SumUp** → Simple et rassurant
- **Notion / Superhuman** → Typographie claire et UX rapide

---

## 📝 Exemples d'implémentation

### Exemple : Page d'accueil

```tsx
<div className="min-h-screen" style={{ backgroundColor: 'var(--neutral-light)' }}>
  <h1 style={{ color: 'var(--secondary)' }}>
    Créez un lien de paiement
    <span style={{ color: 'var(--primary)' }}>en quelques secondes</span>
  </h1>

  <button className="btn-primary">
    Commencer maintenant
  </button>
</div>
```

### Exemple : Formulaire de paiement

```tsx
<div className="card">
  <h2 style={{ color: 'var(--secondary)' }}>
    Nouveau lien de paiement
  </h2>

  <form>
    <label className="label">Montant (€) *</label>
    <input className="input" type="number" />

    <p className="badge-accent">
      Commission: 3%
    </p>

    <button className="btn-primary">Créer le lien</button>
    <button className="btn-secondary">Annuler</button>
  </form>
</div>
```

---

## 💡 Tips UX importants

### 1. Transparence des frais
Le bouton principal pour générer un lien doit **toujours** afficher un micro-texte type :
```tsx
<span className="badge-accent">Commission 3 % incluse</span>
```

### 2. États de chargement
Toujours afficher un feedback pendant les actions :
```tsx
<button className="btn-primary" disabled={loading}>
  {loading ? 'Création...' : 'Créer le lien'}
</button>
```

### 3. Messages de succès/erreur
Utiliser les alertes avec les bonnes couleurs :
```tsx
{success && <div className="alert alert-success">Lien créé !</div>}
{error && <div className="alert alert-error">{error}</div>}
```

---

## 🚀 Quick Start

Pour utiliser la charte dans un nouveau composant :

1. **Importer les classes** : Les classes sont disponibles globalement via `globals.css`
2. **Utiliser les variables CSS** : `style={{ color: 'var(--primary)' }}`
3. **Utiliser les classes utilitaires** : `className="btn-primary card input label"`

---

## 📦 Fichiers modifiés

- `app/globals.css` → Variables CSS + classes utilitaires
- `app/layout.tsx` → Fonts Inter et Roboto
- `app/page.tsx` → Page d'accueil avec nouvelle charte
- `components/dashboard/create-payment-link.tsx` → Formulaire principal

---

**Dernière mise à jour** : 2025-10-13
**Version** : 1.0
