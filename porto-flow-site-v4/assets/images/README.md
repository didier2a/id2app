# assets/images — Guide d'utilisation

## Rôle du dossier

Contient toutes les images statiques du site PortoFlow V4.
Aucune image externe ne doit être référencée en production.

---

## Slots d'images à remplacer

| Slot / Fichier attendu         | Usage                        | Dimensions recommandées |
|-------------------------------|------------------------------|-------------------------|
| `hero-bg.jpg`                 | Fond hero page Accueil       | 1440 × 800 px           |
| `territoire-hero.jpg`         | Hero page Territoire         | 1440 × 800 px           |
| `experience-hero.jpg`         | Hero page Expérience         | 1440 × 800 px           |
| `ecosysteme-hero.jpg`         | Hero page Écosystème         | 1440 × 800 px           |
| `ingenierie-hero.jpg`         | Hero page Ingénierie         | 1440 × 800 px           |
| `logo.svg`                    | Logo principal (header)      | 160 × 48 px             |
| `og-cover.jpg`                | Partage réseaux sociaux      | 1200 × 630 px           |
| `icon-*.svg`                  | Icônes bento-cards           | 48 × 48 px              |

---

## Conventions de nommage

- Minuscules, tirets uniquement : `nom-du-fichier.ext`
- Préfixe par contexte : `hero-`, `card-`, `icon-`, `bg-`
- Format photo : `.jpg` (qualité 80 %)
- Format icône / logo : `.svg`
- Format illustration : `.png` si transparence requise

---

## Bonnes pratiques

- Compresser toute image avant intégration (ex. Squoosh, TinyPNG).
- Ne jamais dépasser **300 Ko** par image raster.
- Toujours fournir un attribut `alt` descriptif dans le HTML.
- Les images responsives utilisent `width: 100%` via CSS canonique.

---

## Maintenance

Supprimer les images non référencées à chaque livraison.
Versionner les remplacements avec un suffixe de date si nécessaire : `hero-bg-2025-07.jpg`.