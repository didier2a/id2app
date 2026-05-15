# PortoFlow — v442 Premium

**Plateforme territoriale intelligente · Smart City · IA locale**

---

## Présentation

PortoFlow est une plateforme numérique territoriale conçue pour piloter, visualiser et valoriser les dynamiques d'un territoire urbain ou périurbain. Elle articule cartographie intelligente, assistant IA contextuel, tableau de bord décisionnel et économie locale en un écosystème cohérent.

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

## Stack technique

- **HTML5** sémantique, sans dépendance externe obligatoire
- **CSS3** custom properties, responsive, design system intégré dans `assets/css/portoflow.css`
- **JS** minimal, progressif, sans framework
- **Assets** : `assets/images/`, `assets/css/`, `assets/js/`

---

## Design system

| Token | Valeur |
|---|---|
| Couleur primaire | Bleu marine profond `#0d1b2a` |
| Couleur secondaire | Orange cuivre `#c8622a` |
| Accent | Cyan discret `#4ecdc4` |
| Fond | Ivoire cartographique `#f5f0e8` |
| Neutre | Ardoise `#4a5568` |
| Police titres | Inter / system-ui, sans-serif |
| Police corps | Inter / system-ui, sans-serif |

---

## Navigation contract

- Header identique sur toutes les pages
- Footer identique sur toutes les pages
- Classe `active` obligatoire sur le lien courant
- Aucun lien mort toléré
- CTA contextualisés par page

---

## Contenu éditorial

- Ton : institutionnel premium, territorial, stratégique, moderne
- Densité : cartes > paragraphes, rails > sections longues
- Limite : 5 sections max par page, 1 paragraphe consécutif max
- Cible : décideurs territoriaux, collectivités, partenaires locaux

---

## Modèle économique

- Publicité contextuelle locale
- Mises en avant premium pour acteurs du territoire
- Partenariats institutionnels et privés
- Offres dynamiques selon flux et saisonnalité

---

## Déploiement

```
Repository : github.com/didier2a/id2app
Branch     : main
Dossier    : portoflow-v442-premium-v1/
Checkpoint : portoflow-v442-premium-v1/.id2app/checkpoint.json
```

---

## Workflow de production

| Rôle | Agent | Responsabilité |
|---|---|---|
| Architecte & Design Director | OpenAI | Plan, UX/UI, éditorial |
| Validateur QA | Gemini | Revue plan, qualité fichiers |
| Constructeur | Claude | Génération et réparation fichiers |

---

*PortoFlow · ID2App v4.4.4 Creative Controlled Workflow · Projet territorial intelligent*