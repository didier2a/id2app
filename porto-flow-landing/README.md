# Porto Flow

> Landing page premium pour une application territoriale intelligente dédiée à Porto-Vecchio.

---

## Présentation du projet

**Porto Flow** est une landing page statique haut de gamme conçue pour présenter une application territoriale intelligente destinée à la ville de Porto-Vecchio, en Corse du Sud.

Elle met en valeur les fonctionnalités clés de la plateforme numérique territoriale : mobilité, services citoyens, tourisme intelligent, gestion urbaine et données en temps réel.

La page est entièrement construite en **HTML sémantique**, **CSS moderne** et **JavaScript vanilla**, sans aucun framework ni dépendance externe obligatoire.

---

## Objectifs de la landing page

- Présenter Porto Flow comme une solution territoriale innovante
- Mettre en avant les fonctionnalités et bénéfices de l'application
- Offrir une expérience visuelle premium et immersive
- Encourager les visiteurs à s'inscrire ou à demander une démonstration

---

## Structure des fichiers

```
porto-flow-landing/
│
├── index.html          # Page principale — structure HTML sémantique complète
├── style.css           # Feuille de styles — design premium, responsive, animations
├── main.js             # JavaScript vanilla — interactions, animations, navigation
└── README.md           # Documentation du projet (ce fichier)
```

### Détail des fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Contient toute la structure de la landing page : hero, features, stats, CTA, footer |
| `style.css` | Gère l'identité visuelle, les variables CSS, le responsive design et les animations |
| `main.js` | Gère le scroll, les animations à l'entrée, la navigation sticky et les interactions UI |
| `README.md` | Documentation complète du projet |

---

## Technologies utilisées

- **HTML5** — structure sémantique (header, main, section, footer, nav, article)
- **CSS3** — variables CSS, Flexbox, Grid, animations, media queries
- **JavaScript ES6+** — vanilla, Intersection Observer, scroll events, DOM manipulation
- **Aucun framework** — aucune dépendance npm, aucun build tool requis

---

## Ouvrir la page localement

### Méthode 1 — Ouverture directe dans le navigateur

1. Télécharger ou cloner le dossier `porto-flow-landing/`
2. Ouvrir le fichier `index.html` directement dans votre navigateur

```bash
# Exemple sur macOS
open porto-flow-landing/index.html

# Exemple sur Linux
xdg-open porto-flow-landing/index.html

# Exemple sur Windows
start porto-flow-landing/index.html
```

### Méthode 2 — Serveur local avec Python (recommandée)

Pour éviter les restrictions CORS et bénéficier d'un environnement proche de la production :

```bash
# Se placer dans le dossier du projet
cd porto-flow-landing

# Python 3
python3 -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```

Puis ouvrir dans le navigateur : [http://localhost:8080](http://localhost:8080)

### Méthode 3 — Extension VS Code Live Server

1. Installer l'extension **Live Server** dans Visual Studio Code
2. Ouvrir le dossier `porto-flow-landing/` dans VS Code
3. Clic droit sur `index.html` → **Open with Live Server**

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

## Design & identité visuelle

- **Palette** : tons bleus profonds, dorés méditerranéens, blancs lumineux
- **Typographie** : moderne, aérée, lisible sur tous les écrans
- **Ambiance** : premium, institutionnel, ancré dans le territoire corse
- **Responsive** : adapté mobile, tablette et desktop

---

## Auteur

Projet généré pour **Porto-Vecchio** dans le cadre du développement d'une plateforme territoriale intelligente.

---

*Porto Flow — L'intelligence au service du territoire.*