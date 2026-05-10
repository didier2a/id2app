# Porto Flow

> Landing page premium pour l'application territoriale intelligente de Porto-Vecchio.

---

## À propos du projet

**Porto Flow** est une landing page moderne et immersive conçue pour présenter une application territoriale intelligente dédiée à la ville de Porto-Vecchio, en Corse du Sud.

L'objectif est de mettre en valeur les fonctionnalités de l'application avec une expérience visuelle premium : animations fluides, design épuré, typographie soignée et interactions élégantes.

Le projet est entièrement développé en **HTML5 sémantique**, **CSS3 moderne** et **JavaScript vanilla**, sans aucun framework ni dépendance externe obligatoire.

---

## Structure des fichiers

```
porto-flow-landing/
│
├── index.html          # Page principale — structure sémantique complète
├── css/
│   └── style.css       # Styles globaux, variables, animations, responsive
├── js/
│   └── main.js         # Interactions, scroll, animations, comportements UI
├── assets/
│   ├── images/         # Visuels, illustrations, photos de Porto-Vecchio
│   └── icons/          # Icônes SVG du projet
└── README.md           # Documentation du projet (ce fichier)
```

---

## Fonctionnalités de la landing page

- **Hero section** immersive avec animation d'entrée et accroche territoriale
- **Présentation des fonctionnalités** de l'application en cards interactives
- **Section territoire** avec visuels de Porto-Vecchio
- **Témoignages** et preuves sociales
- **Call to action** premium avec formulaire ou lien de téléchargement
- **Navigation fluide** avec scroll spy et menu fixe élégant
- **Design responsive** — mobile, tablette et desktop
- **Animations au scroll** légères et professionnelles

---

## Prérequis

Aucune dépendance à installer. Le projet fonctionne nativement dans tout navigateur moderne.

Navigateurs supportés :
- Google Chrome 90+
- Mozilla Firefox 88+
- Safari 14+
- Microsoft Edge 90+

---

## Ouvrir la page localement

### Méthode 1 — Ouverture directe (la plus simple)

1. Téléchargez ou clonez le dossier `porto-flow-landing/`
2. Ouvrez le fichier `index.html` directement dans votre navigateur

```bash
# Sous macOS
open porto-flow-landing/index.html

# Sous Linux
xdg-open porto-flow-landing/index.html

# Sous Windows (PowerShell)
Start-Process porto-flow-landing\index.html
```

### Méthode 2 — Serveur local avec Python (recommandée)

Un serveur local évite les restrictions CORS sur certains assets.

```bash
# Placez-vous dans le dossier du projet
cd porto-flow-landing

# Python 3
python3 -m http.server 8080

# Python 2 (si nécessaire)
python -m SimpleHTTPServer 8080
```

Puis ouvrez votre navigateur à l'adresse :

```
http://localhost:8080
```

### Méthode 3 — Serveur local avec Node.js

```bash
# Installez serve globalement (une seule fois)
npm install -g serve

# Lancez le serveur depuis le dossier du projet
cd porto-flow-landing
serve .
```

Puis ouvrez votre navigateur à l'adresse indiquée dans le terminal (généralement `http://localhost:3000`).

### Méthode 4 — Extension VS Code

Si vous utilisez **Visual Studio Code**, installez l'extension **Live Server** puis faites un clic droit sur `index.html` → **Open with Live Server**.

---

## Personnalisation

| Élément | Fichier | Description |
|---|---|---|
| Couleurs & thème | `css/style.css` | Variables CSS dans `:root` |
| Contenu textuel | `index.html` | Titres, paragraphes, labels |
| Animations | `js/main.js` | Timings, effets au scroll |
| Images | `assets/images/` | Remplacez les visuels existants |
| Icônes | `assets/icons/` | SVG personnalisables |

---

## Conventions du code

- **HTML** : sémantique, accessible, sections bien délimitées avec commentaires
- **CSS** : variables custom properties, BEM-like pour les classes, mobile-first
- **JavaScript** : vanilla ES6+, pas de jQuery, code modulaire et commenté

---

## Licence

Projet propriétaire — Porto Flow © 2024. Tous droits réservés.

---

*Développé avec soin pour mettre en valeur le territoire de Porto-Vecchio.*