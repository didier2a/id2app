# Porto Flow – Landing Page

## Présentation du projet

**Porto Flow** est un copilote intelligent et assistant territorial dédié à Porto-Vecchio. Cette landing page HTML premium présente ses fonctionnalités, ses publics cibles et sa vision, avec un design professionnel, moderne et entièrement responsive.

Le projet est développé en HTML, CSS et JavaScript vanilla, sans aucune dépendance externe ni framework.

---

## Objectifs

- Offrir une vitrine claire et engageante pour Porto Flow
- Présenter les fonctionnalités et publics cibles (habitants, visiteurs, professionnels locaux)
- Garantir une expérience utilisateur premium sur mobile et desktop
- Démontrer la valeur d'un assistant IA territorial intelligent

---

## Stack technique

| Technologie | Usage |
|---|---|
| HTML5 | Structure sémantique de la page |
| CSS3 | Styles, responsive design, animations CSS |
| JavaScript (vanilla) | Interactions, animations légères, header sticky |

> Aucune bibliothèque externe, aucun framework, aucun backend requis.

---

## Fonctionnalités clés

- **Header sticky** : navigation fixe au scroll avec effet visuel
- **Section Hero** : accroche principale avec appel à l'action
- **Sections territoriales** : mise en valeur du contexte Porto-Vecchio
- **Fonctionnalités** : présentation des capacités de l'assistant IA
- **Publics cibles** : blocs dédiés aux habitants, visiteurs et professionnels
- **Assistant IA** : démonstration visuelle de l'interface conversationnelle
- **Exemples de questions** : cas d'usage concrets et interactifs
- **Vision évolutive** : roadmap et ambitions du projet
- **Footer** : informations de contact et liens utiles
- **Animations légères** : transitions fluides en JavaScript vanilla
- **Design responsive** : optimisé mobile, tablette et desktop

---

## Structure des fichiers

```
porto-flow/
├── index.html       # Page unique principale
├── README.md        # Documentation du projet
```

---

## Exigences de design

- Palette de couleurs cohérente avec l'identité de Porto-Vecchio (tons méditerranéens)
- Typographie moderne et lisible
- Espacements généreux pour un rendu premium
- Animations légères et non intrusives
- Contraste suffisant pour l'accessibilité
- Rendu identique sur Chrome, Firefox, Safari et Edge

---

## Critères d'acceptation

- [ ] Toutes les sections de la landing page sont présentes et rendues correctement
- [ ] Le header est sticky et réagit au scroll
- [ ] Les animations sont fluides et fonctionnelles sans librairie externe
- [ ] La page est responsive sur mobile et desktop
- [ ] Le design respecte la palette de couleurs et le style définis
- [ ] La page fonctionne en ouvrant simplement `index.html` localement
- [ ] Aucune dépendance externe n'est requise

---

## Instructions pour ouvrir et tester localement

### Méthode 1 – Ouverture directe (recommandée)

1. Cloner ou télécharger le projet :
   ```bash
   git clone https://github.com/votre-organisation/porto-flow.git
   cd porto-flow
   ```

2. Ouvrir le fichier `index.html` directement dans votre navigateur :
   - Double-cliquer sur `index.html`
   - Ou faire glisser le fichier dans une fenêtre de navigateur

3. La landing page s'affiche immédiatement, sans serveur requis.

### Méthode 2 – Serveur local (optionnel)

Si vous souhaitez utiliser un serveur local pour éviter les restrictions CORS :

**Avec Python :**
```bash
# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```
Puis ouvrir : [http://localhost:8080](http://localhost:8080)

**Avec Node.js (npx) :**
```bash
npx serve .
```
Puis ouvrir l'URL indiquée dans le terminal.

**Avec l'extension VS Code Live Server :**
1. Installer l'extension [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Clic droit sur `index.html` → *Open with Live Server*

---

## Tests recommandés

- **Responsive** : Tester via les DevTools du navigateur (F12 → mode responsive) sur les tailles 375px, 768px et 1280px
- **Header sticky** : Faire défiler la page et vérifier que le header reste visible
- **Animations** : Vérifier que les sections apparaissent avec des transitions fluides au scroll
- **Compatibilité navigateurs** : Tester sur Chrome, Firefox et Safari
- **Performance** : Vérifier l'absence d'erreurs dans la console JavaScript

---

## Publics cibles

- 🏠 **Habitants de Porto-Vecchio** : accès rapide aux services municipaux et informations locales
- 🧳 **Visiteurs de Porto-Vecchio** : guide intelligent pour découvrir la ville et ses activités
- 💼 **Professionnels locaux** : ressources et outils adaptés au tissu économique local

---

## Licence

Ce projet est développé dans le cadre du workflow ID2App. Tous droits réservés.
