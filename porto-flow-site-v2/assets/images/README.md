# assets/images — Répertoire des ressources visuelles

## Rôle

Ce dossier contient toutes les images statiques du site PortoFlow V2.
Chaque fichier doit être référencé dans `media-manifest.json` avant usage.

---

## Structure attendue

| Fichier / Dossier | Usage |
|---|---|
| `logo-porto-flow.svg` | Logo principal — header & footer |
| `hero/` | Visuels hero (1 par page, format 16:9 min 1200px) |
| `bento/` | Illustrations cartes Bento (format carré ou 4:3) |
| `icons/` | Icônes SVG des BentoCard et RailCallout |
| `og/` | Images Open Graph (1200×630 px, 1 par page) |

---

## Règles d'ajout

- Format préféré : **SVG** pour logos/icônes, **WebP** pour photos.
- Nommage : `kebab-case`, sans espaces ni accents.
- Toute image ajoutée **doit** avoir une entrée dans `media-manifest.json`.
- Fournir un `alt` text descriptif dans le HTML correspondant.

---

## Slots media-manifest.json

```json
{
  "slot": "hero-territoire",
  "file": "hero/territoire.webp",
  "alt": "Vue aérienne du territoire Porto Flow",
  "pages": ["territoire.html"]
}
```

Chaque slot déclare : `slot`, `file`, `alt`, `pages[]`.

---

## Contributeurs

Ajouter une image = 1 fichier + 1 entrée manifest + 1 alt text. Pas d'exception.