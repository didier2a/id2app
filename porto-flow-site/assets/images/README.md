# Dossier Images — PortoFlow Site

Ce dossier contient les emplacements images du site PortoFlow.
Chaque image est remplaçable manuellement en conservant exactement le nom de fichier indiqué.
Le site fonctionne sans images grâce à des dégradés CSS de secours (fallback).
Dès qu'une image est déposée avec le bon nom, elle s'affiche automatiquement.

---

## Comment remplacer une image

1. Préparez votre photo locale au format JPG, WebP ou PNG.
2. Redimensionnez-la aux dimensions recommandées indiquées ci-dessous.
3. Renommez le fichier exactement comme indiqué dans la colonne "Nom de fichier".
4. Déposez le fichier dans ce dossier `assets/images/`.
5. Commitez et poussez sur GitHub. La page se met à jour automatiquement.

> Ne modifiez pas le code HTML ou CSS pour remplacer une image.
> Le nom de fichier suffit.

---

## Slots images disponibles

### 1. Hero Porto-Vecchio

| Propriété | Valeur |
|---|---|
| Nom de fichier | `porto-vecchio-hero.jpg` |
| Dimensions recommandées | 1600 × 900 px |
| Formats acceptés | JPG, WebP, PNG |
| Fallback CSS | Dégradé deep navy vers ocean blue |
| Utilisé dans | `index.html`, `styles.css` |
| Description | Vue panoramique locale de Porto-Vecchio et de son territoire. Photo aérienne, vue sur la citadelle, le golfe ou le littoral. Image principale du site, visible en premier. |

---

### 2. Port et Marina

| Propriété | Valeur |
|---|---|
| Nom de fichier | `port-marina.jpg` |
| Dimensions recommandées | 1400 × 900 px |
| Formats acceptés | JPG, WebP, PNG |
| Fallback CSS | Panneau ocean blue |
| Utilisé dans | `index.html`, `ecosysteme.html` |
| Description | Photo locale du port de Porto-Vecchio, des bateaux, du front de mer ou de la marina. Ambiance méditerranéenne, lumière naturelle. |

---

### 3. Plage et Littoral

| Propriété | Valeur |
|---|---|
| Nom de fichier | `plage-palombaggia.jpg` |
| Dimensions recommandées | 1400 × 900 px |
| Formats acceptés | JPG, WebP, PNG |
| Fallback CSS | Panneau sky vers sand |
| Utilisé dans | `territoire.html`, `experience.html` |
| Description | Photo locale d'une plage emblématique, du littoral ou d'un paysage méditerranéen autour de Porto-Vecchio. Eau turquoise, sable blanc, pins parasols. |

---

### 4. Dashboard Territorial

| Propriété | Valeur |
|---|---|
| Nom de fichier | `dashboard-local.jpg` |
| Dimensions recommandées | 1400 × 900 px |
| Formats acceptés | JPG, WebP, PNG |
| Fallback CSS | Panneau deep navy |
| Utilisé dans | `dashboard.html`, `ingenierie.html` |
| Description | Capture d'écran ou mockup du dashboard territorial PortoFlow. Peut représenter une interface de données, une carte interactive ou une visualisation de flux. |

---

### 5. Maquis et Relief

| Propriété | Valeur |
|---|---|
| Nom de fichier | `maquis-relief.jpg` |
| Dimensions recommandées | 1400 × 900 px |
| Formats acceptés | JPG, WebP, PNG |
| Fallback CSS | Dégradé maquis vert vers deep navy |
| Utilisé dans | `territoire.html`, `ingenierie.html` |
| Description | Photo locale du maquis corse, du relief, d'une route de l'arrière-pays ou d'un paysage naturel de Corse-du-Sud. Ambiance nature, sobriété, authenticité. |

---

### 6. Acteurs Locaux

| Propriété | Valeur |
|---|---|
| Nom de fichier | `acteurs-locaux.jpg` |
| Dimensions recommandées | 1400 × 900 px |
| Formats acceptés | JPG, WebP, PNG |
| Fallback CSS | Panneau terra |
| Utilisé dans | `ecosysteme.html`, `contact.html` |
| Description | Photo locale d'un commerce, artisan, restaurant, producteur ou partenaire économique du territoire. Ambiance humaine, locale, professionnelle. |

---

## Recommandations générales

- Privilégiez le format **WebP** pour de meilleures performances sur GitHub Pages.
- Compressez vos images avant dépôt (objectif : moins de 300 Ko par image).
- Utilisez des photos libres de droits ou dont vous détenez les droits.
- Évitez les images génériques ou de banque d'images non locales.
- Les photos locales authentiques renforcent la crédibilité institutionnelle du site.
- Respectez les dimensions recommandées pour éviter les distorsions d'affichage.
- En cas de doute sur le format, JPG reste le choix le plus universel.

---

## Structure du dossier

assets/
└── images/
    ├── README.md               ← ce fichier
    ├── porto-vecchio-hero.jpg  ← hero principal (index)
    ├── port-marina.jpg         ← port et marina
    ├── plage-palombaggia.jpg   ← plage et littoral
    ├── dashboard-local.jpg     ← dashboard territorial
    ├── maquis-relief.jpg       ← maquis et relief
    └── acteurs-locaux.jpg      ← acteurs économiques locaux

---

## Compatibilité GitHub Pages

Ce site est conçu pour fonctionner directement sur GitHub Pages sans serveur.
Les images sont référencées en chemins relatifs depuis la racine du projet.
Aucune configuration supplémentaire n'est nécessaire pour l'affichage des images.
Le fallback CSS garantit un rendu correct même si une image est absente.

---

*PortoFlow — Le copilote intelligent du territoire — Porto-Vecchio / Corse-du-Sud*