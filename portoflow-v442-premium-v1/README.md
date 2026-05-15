# PortoFlow — v442 Premium

**Plateforme territoriale intelligente · Smart City · IA locale**

---

## Présentation

PortoFlow est une plateforme web multi-pages à destination des territoires, collectivités et acteurs économiques locaux. Elle articule cartographie intelligente, assistant IA territorial, pilotage de flux et valorisation de l'économie locale dans une interface institutionnelle premium.

---

## Architecture du projet

```
portoflow-v442-premium-v1/
├── index.html          → Accueil
├── territoire.html     → Territoire
├── assistant.html      → Assistant territorial
├── application.html    → Application mobile
├── ecosysteme.html     → Économie locale
├── dashboard.html      → Tableau de bord
├── ingenierie.html     → Ingénierie IA
├── production.html     → Production continue
├── contact.html        → Contact
├── assets/
│   ├── css/
│   │   └── style.css   → Feuille de styles principale
│   ├── js/
│   │   └── main.js     → Scripts progressifs
│   └── images/         → Placeholders visuels
└── .id2app/
    └── checkpoint.json → État de build ID2App
```

---

## Stack technique

| Composant | Choix |
|---|---|
| Langage | HTML5 · CSS3 · JS vanilla |
| Dépendances externes | Aucune obligatoire |
| Polices | Google Fonts (Inter + Sora) via CDN optionnel |
| Icônes | SVG inline natifs |
| Responsive | Mobile-first, breakpoints 768px / 1200px |

---

## Design system

**Palette** — ivoire cartographique · bleu marine profond · ardoise · orange cuivre · cyan discret

| Token | Valeur |
|---|---|
| `--color-ivory` | `#F5F0E8` |
| `--color-navy` | `#0D1B2A` |
| `--color-slate` | `#4A5568` |
| `--color-copper` | `#C47A3A` |
| `--color-cyan` | `#4ECDC4` |
| `--font-body` | Inter, system-ui |
| `--font-heading` | Sora, Inter |

**Composants canoniques** : hero · feature_grid · content_rail · metrics_panel · cta_band · device_mockup · contact_panel · dashboard_widget

---

## Pages et templates

| Page | Fichier | Template |
|---|---|---|
| Accueil | index.html | home_page |
| Territoire | territoire.html | generic_content_page |
| Assistant territorial | assistant.html | generic_content_page |
| Application | application.html | product_page |
| Économie locale | ecosysteme.html | services_page |
| Tableau de bord | dashboard.html | dashboard_page |
| Ingénierie IA | ingenierie.html | documentation_page |
| Production continue | production.html | documentation_page |
| Contact | contact.html | contact_page |

---

## Navigation contract

- Header et footer identiques sur toutes les pages
- Classe `active` obligatoire sur le lien courant
- Aucun lien mort toléré
- CTA contextualisés par page
- Navigation complète sur mobile (menu hamburger)

---

## Modèle économique

Publicité contextuelle · Mises en avant premium · Partenariats locaux · Offres dynamiques

---

## Workflow de production

| Rôle | Agent |
|---|---|
| Architecte site · Direction UX/UI · Éditorial | OpenAI |
| Validation plan · QA fichiers | Gemini |
| Construction fichiers · Réparation | Claude (ID2App v4.4.4) |

---

## Déploiement

Dépôt GitHub : `didier2a/id2app` · Branche : `main` · Dossier : `portoflow-v442-premium-v1`

```bash
# Prévisualisation locale
open portoflow-v442-premium-v1/index.html
```

---

*PortoFlow · ID2App Creative Controlled Workflow v4.4.4 · Territoire & Intelligence locale*