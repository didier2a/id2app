# PortoFlow Mini Réel — V4.4.5

> **Le copilote intelligent du territoire** · Porto-Vecchio · ID2App Brand System + Premium UX Shell

---

## Identité du projet

| Champ | Valeur |
|---|---|
| **ID** | `portoflow-v445-mini-real-v1` |
| **Version shell** | 4.4.5-fallback |
| **Secteur** | Technologie territoriale / Smart City IA locale |
| **Territoire** | Porto-Vecchio, Corse-du-Sud |
| **Langue** | Français |
| **Dépôt** | `didier2a/id2app` · branche `main` |
| **Dossier site** | `portoflow-v445-mini-real-v1/` |

---

## Objectif de publication

Valider le rendu **V4.4.5** sur une page réelle publiée via GitHub Pages.  
Critères de succès : logo SVG inline · header premium sticky · boutons visuels · footer colonnes · espacement aéré · zéro rendu blog.

---

## Architecture des fichiers

```
portoflow-v445-mini-real-v1/
├── index.html          ← Page d'accueil (template_cinematic_territory_home)
├── assets/
│   ├── pf-shell.css    ← Design system complet (tokens + composants)
│   └── pf-shell.js     ← Interactions légères (nav mobile, année, états actifs)
├── .id2app/
│   └── checkpoint.json ← Suivi de build
└── README.md           ← Ce fichier
```

---

## Brand System

**Palette de couleurs**

| Token | Hex | Usage |
|---|---|---|
| `--pf-navy` | `#071b2f` | Fond header / hero |
| `--pf-ink` | `#102033` | Texte principal |
| `--pf-ivory` | `#f7f2ea` | Fond page / sections claires |
| `--pf-copper` | `#c76a3a` | Accent CTA / état actif |
| `--pf-cyan` | `#3ec7d8` | Intelligence / signal |
| `--pf-slate` | `#667085` | Texte secondaire |

**Typographie** · System geometric sans · Headings serrés · Nav claire

**Logo** · SVG inline · Boussole territoriale + monogramme PF + lignes de flux · `aria-label` requis

---

## UX Shell — Contrat de composants

### Header `pf-header`
- Layout : logo gauche · nav centrée · CTA pill droite
- Sticky + effet verre dépoli au scroll
- CTA primaire : **Devenir partenaire** → `contact.html`
- CTA secondaire : **Voir l'application** → `application.html`

### Navigation `pf-nav`
- État actif : pill cuivre + soulignement
- Mobile : drawer animé
- Aucun lien texte nu — boutons visuels obligatoires

### Boutons `pf-button`
| Variante | Classe |
|---|---|
| Primaire | `pf-button pf-button--primary` |
| Secondaire | `pf-button pf-button--secondary` |
| Ghost | `pf-button pf-button--ghost` |

### Footer `pf-footer`
Layout 4 colonnes : brand · Plateforme · Territoire · Projet

| Colonne | Liens |
|---|---|
| **Plateforme** | Application · Assistant · Dashboard |
| **Territoire** | Territoire · Économie locale |
| **Projet** | Ingénierie · Production · Contact |

CTA final : **Créer un partenariat** → `contact.html`

---

## Page index — Template cinématique

**Sections dans l'ordre :**
1. Hero cinématique — fond navy · lignes de carte · boussole SVG
2. Panneau signal territorial — métriques clés
3. Bento promesse — grille asymétrique 4 blocs
4. Flow map — visualisation flux territoire
5. CTA partenaire — bande conversion finale

**CTAs contextuels minimum :** 2 par page

---

## Espacement

| Token | Valeur |
|---|---|
| `xs` | 8px |
| `sm` | 12px |
| `md` | 18px |
| `lg` | 28px |
| `xl` | 44px |
| `2xl` | 72px |
| `3xl` | 104px |
| Section desktop | 96px |
| Section mobile | 56px |

---

## Règles anti-patterns

- ✗ Header texte seul sans logo
- ✗ Menu liste de liens plats
- ✗ Footer une ligne
- ✗ CTA lien texte sans bouton
- ✗ Mise en page blog / article
- ✗ Dépendance externe obligatoire
- ✗ CSS inline massif dans HTML

---

## Audiences cibles

Habitants de Porto-Vecchio · Visiteurs · Professionnels locaux · Collectivités · Partenaires économiques

---

## Modèle économique

Partenariats locaux · Visibilité premium · Services territoriaux · Publicité contextuelle

---

## Workflow créatif V4.4.5

| Rôle | Agent |
|---|---|
| Architecte site + Direction UX/UI + Éditorial | OpenAI |
| Validation plan + QA fichiers | Gemini |
| Construction fichiers + Réparation | Anthropic (Claude) |

---

*PortoFlow V4.4.5 · ID2App Brand System · © <span id="year">2025</span> · Porto-Vecchio*