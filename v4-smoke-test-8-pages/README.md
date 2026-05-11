# V4 Smoke Test — Micro-site 8 pages

## Objectif

Ce projet est un micro-site léger de 8 pages conçu pour valider rapidement le workflow complet **ID2App V4** : génération de fichiers, structure HTML/CSS/JS, navigation inter-pages, responsive design et compatibilité GitHub Pages.

---

## Fichiers générés

```
v4-smoke-test-8-pages/
├── index.html        → Accueil
├── page-1.html       → Présentation
├── page-2.html       → Services
├── page-3.html       → Méthode
├── page-4.html       → Équipe
├── page-5.html       → Références
├── page-6.html       → FAQ
├── page-7.html       → Contact
├── styles.css        → Feuille de styles globale
├── app.js            → Script JavaScript vanilla
└── README.md         → Ce fichier
```

---

## Ouvrir le site en local

1. Cloner ou télécharger le dossier `v4-smoke-test-8-pages/`
2. Ouvrir directement `index.html` dans un navigateur :
   - Double-clic sur le fichier, **ou**
   - Via un serveur local léger :
     ```bash
     cd v4-smoke-test-8-pages
     npx serve .
     # ou
     python3 -m http.server 8080
     ```
3. Accéder à `http://localhost:8080` dans le navigateur

---

## Tester la navigation

- Vérifier que chaque lien du menu principal mène à la bonne page
- Vérifier que le lien actif est mis en évidence dans la navigation
- Tester le menu mobile (hamburger) en dessous de 768px
- Vérifier que chaque CTA de page pointe vers la page suivante attendue
- Vérifier le lien de retour à l'accueil depuis `page-7.html`

**Parcours complet attendu :**
`index` → `page-1` → `page-2` → `page-3` → `page-4` → `page-5` → `page-6` → `page-7` → `index`

---

## Déploiement sur GitHub Pages

1. Pousser le contenu du dossier `v4-smoke-test-8-pages/` à la **racine** d'un dépôt GitHub public
2. Dans les **Settings** du dépôt → **Pages**
3. Sélectionner la branche `main` (ou `master`) et le dossier `/ (root)`
4. Cliquer sur **Save**
5. Attendre 1 à 2 minutes, puis accéder à l'URL générée :
   ```
   https://<votre-utilisateur>.github.io/<nom-du-depot>/
   ```
6. Valider que `index.html` s'affiche et que toutes les pages sont accessibles

---

## Critères de validation du smoke test

- [ ] Les 8 pages s'affichent sans erreur
- [ ] La navigation fonctionne sur desktop et mobile
- [ ] Le CSS est chargé (`styles.css`)
- [ ] Le JS est chargé sans erreur console (`app.js`)
- [ ] Le site est accessible sur GitHub Pages
- [ ] Aucun lien cassé (404)

---

*Généré par ID2App V4 — Micro-site smoke test*