# Porto Flow — Site Web Officiel

> **Le système nerveux numérique de Porto-Vecchio.**
> Un copilote territorial intelligent pour une micro-région insulaire à forte saisonnalité, rendant le territoire lisible, fluide et accessible en temps réel.

---

## Présentation du projet

Porto Flow est une plateforme numérique territoriale conçue pour Porto-Vecchio et sa région. Elle connecte habitants, visiteurs, commerçants, institutions et collectivités autour d'une interface unifiée, intelligente et temps réel.

Ce dépôt contient le **site web de présentation officiel** de Porto Flow : un site statique multi-pages, premium, sans dépendance externe, compatible GitHub Pages.

---

## Positionnement

Porto Flow n'est pas une simple application touristique. C'est un **système nerveux numérique** pour un territoire à double rythme : une ville insulaire méditerranéenne qui passe de 12 000 habitants en hiver à plus de 100 000 personnes en été. Porto Flow rend ce territoire lisible, fluide et accessible — pour tous, en toutes saisons.

**Double ambition :**
- **Territoriale** : informer, orienter, connecter les acteurs locaux et les visiteurs en temps réel.
- **Ingénierie** : démontrer une boucle de développement logiciel innovante combinant IA, automatisation et expertise humaine.

---

## Structure du dossier

```
porto-flow-site/
│
├── index.html          # Page d'accueil — Hero premium, présentation, CTA
├── territoire.html     # Territoire et Usagers — Enjeux, publics, saisonnalité
├── application.html    # Application — Interface mobile simulée, IA, parcours
├── ecosysteme.html     # Écosystème et Économie Locale — Acteurs, modèle, valeur
├── ingenierie.html     # Ingénierie et Vision — Boucle de développement, IA, n8n
│
├── styles.css          # Feuille de styles principale (CSS3, variables, responsive)
├── script.js           # JavaScript vanilla (navigation, animations, interactions)
│
└── README.md           # Ce fichier
```

---

## Pages du site

| Fichier | Titre | Description |
|---|---|---|
| `index.html` | Accueil | Hero premium, mise en scène du problème et de la solution, aperçu visuel simulé, CTA vers les autres pages |
| `territoire.html` | Territoire et Usagers | Présentation du territoire à deux rythmes, cas d'usage, publics concernés, enjeux saisonniers |
| `application.html` | Application | Simulation de l'interface mobile, carte interactive, assistant IA, recommandations temps réel |
| `ecosysteme.html` | Écosystème et Économie Locale | Connexion avec acteurs locaux, modèle économique, tableau de bord simulé |
| `ingenierie.html` | Ingénierie et Vision | Boucle de développement innovante, n8n, CloudCode, IA, rôle humain |

---

## Technologies utilisées

- **HTML5** — Structure sémantique, balises accessibles (`header`, `nav`, `main`, `section`, `article`, `footer`)
- **CSS3** — Variables CSS, Flexbox, Grid, animations, glassmorphism sobre, responsive mobile-first
- **JavaScript vanilla** — Menu mobile, navigation active, animations au scroll, interactions légères

**Aucune dépendance externe. Aucun framework. Aucun CDN requis.**

Le site fonctionne entièrement en local, sans serveur, sans build tool, sans installation.

---

## Ouvrir le site localement

### Méthode simple (double-clic)

1. Clonez ou téléchargez ce dépôt sur votre machine.
2. Ouvrez le dossier `porto-flow-site/`.
3. Double-cliquez sur `index.html`.
4. Le site s'ouvre dans votre navigateur par défaut.

> Naviguez entre les pages via le menu de navigation intégré.

### Méthode recommandée (serveur local)

Pour éviter les restrictions de certains navigateurs sur les fichiers locaux (`file://`), utilisez un serveur local léger :

**Avec Python (intégré sur macOS et Linux) :**

```bash
cd porto-flow-site
python3 -m http.server 8080
```

Puis ouvrez [http://localhost:8080](http://localhost:8080) dans votre navigateur.

**Avec Node.js (`npx serve`) :**

```bash
cd porto-flow-site
npx serve .
```

Puis ouvrez l'URL indiquée dans le terminal.

**Avec l'extension VS Code Live Server :**

1. Installez l'extension **Live Server** dans VS Code.
2. Ouvrez le dossier `porto-flow-site/` dans VS Code.
3. Clic droit sur `index.html` → **Open with Live Server**.

---

## Publier via GitHub Pages

GitHub Pages permet d'héberger ce site gratuitement depuis un dépôt GitHub public ou privé.

### Étapes

1. **Créez un dépôt GitHub** (public ou privé avec GitHub Pro).

2. **Poussez le contenu du dossier `porto-flow-site/`** à la racine du dépôt ou dans une branche dédiée :

```bash
git init
git add .
git commit -m "Initial commit — Porto Flow site"
git branch -M main
git remote add origin https://github.com/votre-utilisateur/porto-flow-site.git
git push -u origin main
```

3. **Activez GitHub Pages** :
   - Allez dans **Settings** → **Pages**.
   - Sous **Source**, sélectionnez la branche `main` et le dossier `/ (root)`.
   - Cliquez sur **Save**.

4. **Votre site est en ligne** à l'adresse :
   ```
   https://votre-utilisateur.github.io/porto-flow-site/
   ```

> Le déploiement prend généralement 1 à 3 minutes après chaque push.

### Notes importantes pour GitHub Pages

- Tous les chemins sont **relatifs** (`./styles.css`, `./script.js`, `territoire.html`).
- Aucune configuration serveur n'est nécessaire.
- Le fichier `index.html` est automatiquement servi comme page d'accueil.
- Aucun fichier `_config.yml` Jekyll n'est requis (le site est en HTML pur).

---

## Responsive et accessibilité

### Responsive

Le site est conçu en **mobile-first** et s'adapte à toutes les tailles d'écran :

- **Mobile** : < 768px — navigation hamburger, mise en page colonne unique
- **Tablette** : 768px – 1024px — grilles adaptées, navigation compacte
- **Desktop** : > 1024px — mise en page complète, effets visuels enrichis

Testé sur les résolutions courantes : 375px (iPhone SE), 390px (iPhone 14), 768px (iPad), 1280px, 1440px, 1920px.

### Accessibilité

- Balises HTML5 sémantiques (`header`, `nav`, `main`, `section`, `article`, `footer`, `h1`–`h6`)
- Attributs `alt` sur toutes les images et éléments visuels
- Contraste des couleurs conforme aux recommandations WCAG AA
- Navigation au clavier fonctionnelle
- États `focus-visible` définis pour tous les éléments interactifs
- Attributs `aria-label` sur les éléments de navigation et boutons iconiques
- Pas de contenu exclusivement dépendant de la couleur ou du mouvement

---

## Direction artistique

| Élément | Valeur |
|---|---|
| Style | Ultra moderne, premium, territorial, glassmorphism sobre |
| Palette principale | `#0B1F33` · `#1F6F8B` · `#8FC7DA` · `#D86F3C` · `#F4E8D0` |
| Palette secondaire | `#FAF6EC` · `#263238` · `#FFFFFF` |
| Typographie | Sans-serif moderne, hiérarchie claire, lisibilité maximale |
| Motifs visuels | Lignes topographiques, flux lumineux, cartes stylisées, interfaces mobiles, halos lumineux |
| Ambiance | Innovant · Fluide · Lumineux · Méditerranéen · Technologique · Authentique · Premium |

---

## Contributions futures

Ce site est conçu pour évoluer. Voici les recommandations pour les contributions :

### Ajouter une page

1. Créez un nouveau fichier `.html` dans `porto-flow-site/`.
2. Copiez la structure de base d'une page existante (doctype, head, nav, footer).
3. Ajoutez le lien vers la nouvelle page dans la navigation de **toutes les pages existantes**.
4. Ajoutez le lien dans `script.js` si la navigation active doit être gérée.

### Modifier les styles

- Toutes les variables de couleur, typographie et espacement sont définies dans `:root` au début de `styles.css`.
- Modifiez les variables pour un changement global cohérent.
- Les sections sont clairement commentées dans `styles.css`.

### Modifier les interactions

- `script.js` est organisé par fonctionnalité (menu mobile, scroll, navigation active).
- Chaque fonction vérifie l'existence des éléments DOM avant de s'exécuter.
- Ajoutez de nouvelles interactions en suivant le même pattern défensif.

### Bonnes pratiques

- Conservez l'absence de dépendances externes.
- Testez sur mobile avant de valider une modification.
- Vérifiez la navigation au clavier après tout ajout d'élément interactif.
- Maintenez la cohérence de la direction artistique définie ci-dessus.

---

## Licence et usage

Ce site est la propriété de l'équipe Porto Flow. Tous droits réservés.

---

*Porto Flow — Rendre le territoire lisible, fluide et accessible.*