# Images — PortoFlow V4 Institutionnel

Ce dossier contient les images utilisées dans le site institutionnel PortoFlow V4.
Chaque image correspond à un slot défini dans la stratégie média du projet.

---

## Slots d'images définis

### 1. `hero-portovecchio.jpg`
- **Slot ID** : `hero_portovecchio`
- **Dimensions recommandées** : 1600 × 900 px
- **Format accepté** : JPG, WebP, PNG
- **Texte alternatif** : Vue locale de Porto-Vecchio et de son territoire
- **Utilisé dans** : `index.html`, `styles.css`
- **Fallback** : dégradé CSS si le fichier est absent

### 2. `dashboard-territorial.jpg`
- **Slot ID** : `dashboard_territorial`
- **Dimensions recommandées** : 1400 × 900 px
- **Format accepté** : JPG, WebP, PNG
- **Texte alternatif** : Interface conceptuelle de dashboard territorial PortoFlow
- **Utilisé dans** : `dashboard.html`, `styles.css`
- **Fallback** : panneau CSS si le fichier est absent

### 3. `acteurs-locaux.jpg`
- **Slot ID** : `acteurs_locaux`
- **Dimensions recommandées** : 1400 × 900 px
- **Format accepté** : JPG, WebP, PNG
- **Texte alternatif** : Acteurs économiques et services locaux du territoire
- **Utilisé dans** : `ecosysteme.html`, `contact.html`
- **Fallback** : panneau CSS si le fichier est absent

---

## Instructions de remplacement

Pour remplacer une image par une photo locale réelle :

1. Préparer l'image aux dimensions recommandées (voir tableau ci-dessus).
2. Exporter en JPG ou WebP pour optimiser le poids (qualité 80–90 % recommandée).
3. **Conserver exactement le même nom de fichier** que le slot correspondant.
4. Déposer le fichier dans ce dossier `assets/images/` en écrasant l'éventuel fichier existant.
5. Aucune modification du code HTML ou CSS n'est nécessaire si le nom est identique.

> Attention : ne pas renommer les fichiers. Le code source référence les noms de fichiers définis dans les slots. Tout changement de nom nécessiterait une mise à jour manuelle dans chaque fichier HTML et CSS concerné.

---

## Bonnes pratiques

- **Format** : préférer WebP pour les navigateurs modernes, avec JPG en fallback si nécessaire.
- **Poids** : viser moins de 300 Ko par image pour garantir des performances optimales sur mobile et en zone à débit limité.
- **Ratio** : respecter les ratios 16/9 définis pour éviter tout recadrage non souhaité par le CSS.
- **Accessibilité** : les attributs `alt` sont définis dans le code HTML ; ne pas les supprimer lors d'une mise à jour.
- **Nommage** : utiliser des noms en minuscules, sans espaces, avec des tirets comme séparateurs (convention déjà appliquée).
- **Optimisation** : utiliser un outil comme Squoosh, ImageOptim ou TinyPNG avant dépôt.

---

## Fallbacks CSS

Si une image est absente, le site affiche automatiquement un fallback visuel défini en CSS :

- `hero-portovecchio.jpg` → dégradé CSS dans les tons bleu marine et terracotta (`#0E2A3B` → `#C96F43`)
- `dashboard-territorial.jpg` → panneau CSS neutre avec fond `#E9E3D5`
- `acteurs-locaux.jpg` → panneau CSS neutre avec fond `#E9E3D5`

Ces fallbacks garantissent que le site reste fonctionnel et présentable même sans photos locales.

---

## Structure du dossier

assets/
└── images/
    ├── README.md                  ← ce fichier
    ├── hero-portovecchio.jpg      ← slot hero_portovecchio
    ├── dashboard-territorial.jpg  ← slot dashboard_territorial
    └── acteurs-locaux.jpg         ← slot acteurs_locaux

---

*Documentation générée par ID2App V4.2 Résiliente — PortoFlow V4 Institutionnel*