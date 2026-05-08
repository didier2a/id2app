# PortoFlow Landing Page

## Vision du projet

PortoFlow est l'application territoriale intelligente conçue pour Porto-Vecchio. Cette landing page a pour objectif de présenter clairement PortoFlow à tous ses publics cibles, de valoriser ses bénéfices et fonctionnalités, et de refléter une ambiance méditerranéenne moderne et professionnelle.

La page est entièrement autonome (fichier HTML statique unique) et ne nécessite aucun serveur, aucun backend, ni aucune dépendance externe.

---

## Publics cibles

- **Habitants de Porto-Vecchio** : accès simplifié aux services et informations locales
- **Visiteurs et touristes** : découverte du territoire et des ressources disponibles
- **Commerçants locaux** : visibilité et connexion avec l'écosystème territorial
- **Acteurs et partenaires territoriaux** : coordination et valorisation des initiatives locales

---

## Fonctionnalités présentées sur la landing page

- Section de présentation de PortoFlow et de sa mission
- Section dédiée aux publics cibles
- Cartes visuelles des fonctionnalités principales (minimum 3 cartes distinctes)
- Bloc Vision Future mettant en valeur les ambitions du projet
- Appel à l'action final (bouton CTA) invitant à découvrir l'application

---

## Stack technique

| Couche | Technologie |
|---|---|
| Frontend | HTML5 sémantique valide |
| Style | CSS3 intégré dans `<style>` (design méditerranéen) |
| Interactivité | JavaScript minimal intégré (accessibilité CTA, animations légères) |
| Backend | Aucun (page statique autonome) |
| Dépendances externes | Aucune (pas de CDN, pas de framework) |

---

## Structure des fichiers

```
portoflow-landing/
├── index.html       # Page principale autonome (HTML + CSS + JS intégrés)
└── README.md        # Documentation du projet
```

---

## Critères d'acceptation

- [ ] La page `index.html` s'ouvre dans un navigateur moderne sans erreur ni avertissement
- [ ] La page contient les sections : Présentation, Publics cibles, Fonctionnalités (≥3 cartes), Vision future, Appel à l'action
- [ ] Aucune dépendance externe (pas de React, Node.js, CDN)
- [ ] Design visuellement clair, professionnel, avec ambiance méditerranéenne perceptible
- [ ] Bouton CTA visible, accessible au clavier, avec libellé incitatif
- [ ] Code propre, HTML5 sémantique, CSS documenté, JS minimal et commenté

---

## Instructions pour ouvrir la page

### Ouverture locale

1. Télécharger ou cloner le projet
2. Naviguer dans le dossier du projet
3. Double-cliquer sur le fichier `index.html` **ou** ouvrir un terminal et lancer :

```bash
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

4. La page s'ouvre directement dans votre navigateur par défaut

### Déploiement statique

La page étant entièrement statique, elle peut être déployée sur n'importe quel hébergeur de fichiers statiques :

- **GitHub Pages** : pousser le fichier `index.html` sur une branche `gh-pages`
- **Netlify** : glisser-déposer le dossier dans l'interface Netlify Drop
- **Vercel** : déployer via `vercel --prod` depuis le dossier
- **Serveur web classique** : copier `index.html` dans le répertoire racine public (`/var/www/html/` ou équivalent)

---

## Risques identifiés

| Risque | Mitigation |
|---|---|
| Limitation fonctionnelle due à l'absence de backend | Scope limité à la présentation statique, cohérent avec les objectifs |
| Design non conforme aux attentes méditerranéennes | Palette de couleurs et typographie documentées dans le CSS |
| Accessibilité insuffisante | Attributs ARIA sur le CTA, navigation clavier testée |
| Performance impactée | CSS et JS minimalistes, aucune ressource externe |

---

## Auteur et contexte

Projet généré dans le cadre du workflow **ID2App** pour la création de la landing page de **PortoFlow**, application territoriale intelligente de Porto-Vecchio.
