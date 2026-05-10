# Porto Flow

> Landing page premium pour l'application territoriale intelligente de Porto-Vecchio.

---

## Présentation du projet

**Porto Flow** est une landing page moderne et immersive conçue pour présenter une application territoriale intelligente dédiée à la ville de Porto-Vecchio, en Corse du Sud.

L'objectif de cette page est de valoriser l'expérience numérique offerte aux habitants et aux visiteurs : mobilité, services municipaux, patrimoine, événements et vie locale — le tout accessible depuis une interface unifiée et élégante.

La landing page est entièrement développée en HTML, CSS et JavaScript vanilla, sans dépendance externe obligatoire, pour garantir performance, portabilité et facilité de maintenance.

---

## Aperçu des fonctionnalités de la page

- Hero section immersive avec accroche et appel à l'action
- Présentation des fonctionnalités clés de l'application
- Section statistiques et indicateurs territoriaux
- Témoignages d'utilisateurs
- Section de téléchargement / inscription
- Footer complet avec liens de navigation
- Animations fluides au scroll
- Design responsive (mobile, tablette, desktop)

---

## Structure des fichiers

```
porto-flow-landing/
│
├── index.html          # Page principale — structure HTML sémantique
├── style.css           # Feuille de styles — design premium et responsive
├── main.js             # Scripts vanilla — interactions et animations
└── README.md           # Documentation du projet (ce fichier)
```

### Détail des fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Structure sémantique de la landing page, sections et contenu |
| `style.css` | Styles visuels : typographie, couleurs, layout, animations CSS |
| `main.js` | Logique JavaScript : scroll animations, navigation, interactions UI |
| `README.md` | Documentation complète du projet |

---

## Ouvrir la page localement

### Méthode 1 — Ouverture directe dans le navigateur

1. Téléchargez ou clonez le dossier `porto-flow-landing/`
2. Naviguez jusqu'au dossier sur votre machine
3. Double-cliquez sur le fichier `index.html`
4. La page s'ouvre directement dans votre navigateur par défaut

> ✅ Aucune installation requise. Aucun serveur nécessaire.

---

### Méthode 2 — Serveur local avec VS Code (recommandé)

Si vous utilisez **Visual Studio Code** avec l'extension **Live Server** :

1. Ouvrez le dossier `porto-flow-landing/` dans VS Code
2. Faites un clic droit sur `index.html`
3. Sélectionnez **"Open with Live Server"**
4. La page s'ouvre sur `http://127.0.0.1:5500`

---

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

Ouvrez ensuite votre navigateur à l'adresse :

```
http://localhost:8080
```

---

### Méthode 4 — Serveur local avec Node.js

Si Node.js est disponible :

```bash
# Installez serve globalement (une seule fois)
npm install -g serve

# Lancez le serveur depuis le dossier du projet
cd porto-flow-landing
serve .
```

Accédez à la page via l'URL indiquée dans le terminal (généralement `http://localhost:3000`).

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

## Personnalisation

Les fichiers sont conçus pour être facilement modifiables :

- **Couleurs et typographie** → variables CSS dans `style.css` (section `:root`)
- **Contenu textuel** → directement dans `index.html`
- **Comportements et animations** → dans `main.js`

---

## Contexte territorial

Porto-Vecchio est une commune du sud de la Corse reconnue pour son patrimoine naturel, son dynamisme touristique et la qualité de vie de ses habitants. **Porto Flow** s'inscrit dans une démarche de territoire intelligent (_Smart Territory_) visant à connecter les services publics, la mobilité et la vie culturelle locale au sein d'une expérience numérique cohérente.

---

## Licence

Projet réalisé dans le cadre de l'initiative Porto Flow.
Tous droits réservés © Porto Flow — Porto-Vecchio.