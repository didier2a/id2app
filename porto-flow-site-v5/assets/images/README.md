# Images — PortoFlow Site V5

## Inventaire des fichiers

| Fichier | Dimensions | Alt recommandé | Usage |
|---|---|---|---|
| hero-bg.webp | 1440×800 | Vue aérienne de Porto-Vecchio | Hero section, toutes pages |
| hero-map.webp | 720×600 | Carte interactive du territoire | Hero split côté droit, index |
| territoire-saisons.webp | 800×500 | Flux haute et hors saison | Page Territoire, bento card |
| ecosysteme-network.webp | 800×500 | Réseau acteurs locaux connectés | Page Écosystème, bento card |
| dashboard-preview.webp | 960×600 | Tableau de bord territorial | Page Dashboard, rail |
| ingenierie-loop.webp | 800×500 | Boucle de création continue IA | Page Ingénierie, bento card |
| og-portoflow.webp | 1200×630 | PortoFlow copilote intelligent | Open Graph / partage social |

## Règles éditeurs

- Format **WebP** obligatoire ; fallback JPG toléré si WebP indisponible.
- Poids max : **200 Ko** par image (hero : **400 Ko** max).
- Attribut `alt` obligatoire, descriptif, en français.
- Image décorative : `alt=""` + `aria-hidden="true"`.
- Lazy-loading : `loading="lazy"` sur toutes les images sauf hero (`loading="eager"`).

## Nommage

- Kebab-case strict : `nom-page-sujet.webp`
- Pas d'espaces, pas de majuscules, pas de caractères spéciaux.
- Suffixe `@2x` pour les variantes haute densité si nécessaire.

## Optimisation

- Compression cible : qualité **80–85** (WebP).
- Dimensions exactes respectées ; pas d'upscaling.
- Fournir `width` et `height` dans le HTML pour éviter le layout shift (CLS).

## Open Graph

- `og-portoflow.webp` : 1200×630 px, < 300 Ko.
- Utilisé dans `<meta property="og:image">` sur toutes les pages.