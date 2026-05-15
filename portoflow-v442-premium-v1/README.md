# PortoFlow — Plateforme territoriale intelligente
> Projet `portoflow-v442-premium-v1` · ID2App v4.4.4 Creative Controlled Workflow

---

## Présentation

**PortoFlow** est une plateforme territoriale intelligente conçue pour les collectivités, les opérateurs locaux et les citoyens. Elle agrège données de mobilité, flux urbains, recommandations IA et pilotage local dans une interface unifiée — web et mobile.

Ce dépôt contient le site vitrine multi-pages de PortoFlow, généré et maintenu via le workflow **ID2App v4.4.4**.

---

## Architecture du site

| Page | Fichier | Template |
|---|---|---|
| Accueil | `index.html` | `home_page` |
| Territoire | `territoire.html` | `generic_content_page` |
| Assistant territorial | `assistant.html` | `generic_content_page` |
| Application | `application.html` | `product_page` |
| Économie locale | `ecosysteme.html` | `services_page` |
| Tableau de bord | `dashboard.html` | `dashboard_page` |
| Ingénierie IA | `ingenierie.html` | `documentation_page` |
| Production continue | `production.html` | `documentation_page` |
| Contact | `contact.html` | `contact_page` |

---

## Structure du dépôt

```
portoflow-v442-premium-v1/
├── index.html
├── territoire.html
├── assistant.html
├── application.html
├── ecosysteme.html
├── dashboard.html
├── ingenierie.html
├── production.html
├── contact.html
├── assets/
│   ├── css/
│   │   └── portoflow.css
│   ├── js/
│   │   └── portoflow.js
│   └── images/
│       └── (placeholders prêts pour assets visuels)
├── .id2app/
│   └── checkpoint.json
└── README.md
```

---

## Design & Identité

| Token | Valeur |
|---|---|
| Mood | Ivoire cartographique · Bleu marine profond · Ardoise · Orange cuivre · Cyan discret |
| Typographie corps | Système natif (stack sans-serif) |
| Typographie titres | Système natif (stack serif institutionnel) |
| Composants interdits | `tourism_generic_layout` · `generic_saas_layout` · `linear_text_stack` · `duplicate_header` · `duplicate_footer` |
| Ton éditorial | Institutionnel premium · Territorial · Stratégique · Moderne |

---

## Navigation contract

- Header identique sur toutes les pages
- Footer identique sur toutes les pages
- Classe `active` obligatoire sur le lien courant
- Aucun lien mort toléré
- CTA contextualisés par page

---

## Workflow de production

```
OpenAI       →  Architecte site · Directeur UX/UI · Rédacteur éditorial
Gemini       →  Validateur plan · QA qualité fichier
Claude       →  Constructeur fichier · Réparateur
```

Version workflow : **ID2App Creative Controlled Workflow v4.4.4**

---

## Modèle économique

- Publicité contextuelle intégrée
- Mises en avant premium pour acteurs locaux
- Partenariats territoriaux
- Offres dynamiques selon contexte utilisateur

---

## Dépôt GitHub

| Paramètre | Valeur |
|---|---|
| Owner | `didier2a` |
| Repository | `id2app` |
| Branch | `main` |
| Dossier site | `portoflow-v442-premium-v1` |
| Checkpoint | `portoflow-v442-premium-v1/.id2app/checkpoint.json` |

---

## Contraintes techniques

- Aucune dépendance externe obligatoire
- CSS externalisé — pas de CSS inline massif dans le HTML
- JavaScript minimal et progressif, sans framework
- Images : placeholders `assets/images/` prêts pour remplacement par assets réels
- Responsive mobile-first
- Sections premium, textes riches, composants spécialisés

---

*PortoFlow · Plateforme territoriale intelligente · ID2App v4.4.4*