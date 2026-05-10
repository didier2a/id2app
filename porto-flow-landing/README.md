# Porto Flow

> Landing page premium pour l'application territoriale intelligente de Porto-Vecchio.

---

## Présentation du projet

**Porto Flow** est une landing page moderne et immersive conçue pour présenter une application territoriale intelligente dédiée à la ville de Porto-Vecchio (Corse-du-Sud).

L'objectif de cette page est de valoriser les fonctionnalités de l'application, d'engager les visiteurs et de les inciter à rejoindre la plateforme ou à en savoir plus.

La page est entièrement statique — construite en HTML, CSS et JavaScript vanilla — sans aucun framework ni dépendance externe obligatoire.

---

## Fonctionnalités de la landing page

- Design premium inspiré de l'identité visuelle de Porto-Vecchio (couleurs méditerranéennes, typographie élégante)
- Animations fluides au scroll et à l'entrée des sections
- Présentation des fonctionnalités clés de l'application territoriale
- Section hero immersive avec appel à l'action
- Témoignages et indicateurs de confiance
- Formulaire de contact ou d'inscription intégré
- Responsive design — optimisé mobile, tablette et desktop
- Performances optimisées (aucune dépendance lourde)

---

## Structure des fichiers

```
porto-flow-landing/
│
├── index.html          # Page principale — structure HTML sémantique complète
├── css/
│   └── style.css       # Feuille de styles principale — variables, layout, composants, animations
├── js/
│   └── main.js         # JavaScript vanilla — interactions, animations, comportements dynamiques
├── assets/
│   ├── images/         # Visuels, photos, illustrations
│   └── icons/          # Icônes SVG utilisées dans l'interface
└── README.md           # Documentation du projet (ce fichier)
```

---

## Prérequis

Aucun prérequis technique particulier.

- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Aucun serveur backend requis
- Aucune installation de dépendances nécessaire

---

## Ouvrir la page localement

### Méthode 1 — Ouverture directe dans le navigateur

1. Téléchargez ou clonez ce dépôt sur votre machine
2. Naviguez jusqu'au dossier `porto-flow-landing/`
3. Double-cliquez sur le fichier `index.html`
4. La page s'ouvre directement dans votre navigateur par défaut

### Méthode 2 — Serveur local avec VS Code (recommandé)

Si vous utilisez **Visual Studio Code** avec l'extension **Live Server** :

1. Ouvrez le dossier `porto-flow-landing/` dans VS Code
2. Faites un clic droit sur `index.html` dans l'explorateur
3. Sélectionnez **"Open with Live Server"**
4. La page s'ouvre automatiquement sur `http://127.0.0.1:5500`

### Méthode 3 — Serveur local avec Python

Si Python est installé sur votre machine :

```bash
# Naviguez dans le dossier du projet
cd porto-flow-landing

# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```

Puis ouvrez votre navigateur à l'adresse : `http://localhost:8080`

### Méthode 4 — Serveur local avec Node.js

Si Node.js est installé sur votre machine :

```bash
# Installation globale de serve (une seule fois)
npm install -g serve

# Lancement dans le dossier du projet
cd porto-flow-landing
serve .
```

Puis ouvrez votre navigateur à l'adresse indiquée dans le terminal.

---

## Personnalisation

| Élément | Fichier à modifier |
|---|---|
| Contenu textuel | `index.html` |
| Couleurs et typographie | `css/style.css` — section `:root` (variables CSS) |
| Animations et interactions | `js/main.js` |
| Images et visuels | `assets/images/` |

---

## Compatibilité navigateurs

| Navigateur | Support |
|---|---|
| Chrome 90+ | ✅ Complet |
| Firefox 88+ | ✅ Complet |
| Safari 14+ | ✅ Complet |
| Edge 90+ | ✅ Complet |
| Internet Explorer | ❌ Non supporté |

---

## Licence

Projet Porto Flow — Tous droits réservés.  
Conçu pour la ville de Porto-Vecchio.