# Eco Smart Homes — Site Vitrine

Site web vitrine modernisé pour **Eco Smart Homes**, présentant des solutions écologiques et intelligentes pour l'habitat durable. Conçu pour un déploiement simple sur GitHub Pages, sans dépendance externe.

---

## Objectif du projet

Eco Smart Homes accompagne propriétaires, investisseurs éco-responsables, architectes et promoteurs immobiliers dans la transition vers des habitats intelligents et durables. Ce site vitrine a pour mission de :

- Présenter les solutions et technologies proposées
- Illustrer les cas d'usage concrets
- Identifier les profils clients et partenaires
- Faciliter la prise de contact et la prise de rendez-vous

---

## Structure des fichiers

```
eco-smart-homes-site/
│
├── index.html          # Page d'accueil — accroche et présentation générale
├── solutions.html      # Page Solutions — offres et technologies
├── usages.html         # Page Usages — cas pratiques et bénéfices
├── public.html         # Page Public — profils clients et partenaires
├── contact.html        # Page Contact — formulaire, localisation, rendez-vous
│
├── styles.css          # Feuille de styles globale (responsive, design system)
├── script.js           # JavaScript vanilla (menu mobile, scroll, animations)
│
└── README.md           # Documentation du projet
```

---

## Technologies utilisées

| Technologie | Usage |
|---|---|
| HTML5 sémantique | Structure des pages |
| CSS3 (variables, flexbox, grid) | Mise en page et design |
| JavaScript vanilla (ES6+) | Interactions et animations |
| GitHub Pages | Hébergement statique |

Aucun framework, aucune dépendance externe obligatoire. Le site fonctionne entièrement en local sans serveur.

---

## Direction artistique

- **Style** : Moderne, épuré, formes organiques, animations légères au scroll
- **Palette** :
  - `#2E7D32` — Vert forêt (couleur principale)
  - `#A5D6A7` — Vert clair (accents doux)
  - `#FFFFFF` — Blanc (fond, lisibilité)
  - `#37474F` — Gris ardoise (textes)
  - `#FFC107` — Ambre (appels à l'action)
- **Ambiance** : Naturel, technologique, fiable, chaleureux

---

## Ouvrir le site localement

### Option 1 — Ouverture directe

Double-cliquez sur `index.html` pour ouvrir le site dans votre navigateur. Aucune installation requise.

### Option 2 — Serveur local (recommandé)

Pour éviter les restrictions de navigateur sur les fichiers locaux, utilisez un serveur local :

**Avec Python 3 :**
```bash
cd eco-smart-homes-site
python -m http.server 8080
```
Puis ouvrez [http://localhost:8080](http://localhost:8080) dans votre navigateur.

**Avec Node.js (npx) :**
```bash
cd eco-smart-homes-site
npx serve .
```

---

## Déploiement sur GitHub Pages

### Étape 1 — Créer un dépôt GitHub

1. Connectez-vous à [github.com](https://github.com)
2. Créez un nouveau dépôt public nommé `eco-smart-homes-site`

### Étape 2 — Pousser les fichiers

```bash
cd eco-smart-homes-site
git init
git add .
git commit -m "Initial commit — Eco Smart Homes site"
git branch -M main
git remote add origin https://github.com/VOTRE_UTILISATEUR/eco-smart-homes-site.git
git push -u origin main
```

### Étape 3 — Activer GitHub Pages

1. Allez dans **Settings** de votre dépôt
2. Section **Pages** dans le menu latéral
3. Source : sélectionnez **Deploy from a branch**
4. Branch : `main` / `/ (root)`
5. Cliquez sur **Save**

Votre site sera disponible à l'adresse :
```
https://VOTRE_UTILISATEUR.github.io/eco-smart-homes-site/
```

> La mise en ligne peut prendre quelques minutes après la première publication.

---

## Pages du site

| Page | Fichier | Description |
|---|---|---|
| Accueil | `index.html` | Accroche forte, présentation des solutions, navigation vers sections clés |
| Solutions | `solutions.html` | Offres détaillées et technologies pour habitats intelligents et écologiques |
| Usages | `usages.html` | Cas pratiques et bénéfices dans différentes configurations résidentielles |
| Public | `public.html` | Profils clients et partenaires cibles, besoins et attentes |
| Contact | `contact.html` | Formulaire de contact, localisation, prise de rendez-vous |

---

## Audiences cibles

- **Propriétaires** souhaitant moderniser et écologiser leur habitat
- **Investisseurs éco-responsables** cherchant des projets à impact positif
- **Architectes** intégrant des solutions smart et durables dans leurs projets
- **Promoteurs immobiliers** développant des programmes résidentiels innovants

---

## Positionnement

> Premium · Innovant · Engagé pour l'écologie

Eco Smart Homes se positionne comme un acteur de référence dans l'habitat durable intelligent, alliant performance technologique et respect de l'environnement.

---

## Licence

Ce projet est un site vitrine propriétaire. Tous droits réservés — Eco Smart Homes.