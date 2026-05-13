# Images — PortoFlow Site V4.3 DesignOps

Dossier de gestion des ressources images du site institutionnel PortoFlow.
Chaque slot image est documenté, nommé et remplaçable sans toucher au code.
Le site fonctionne sans images grâce à des fallbacks CSS intégrés dans `styles.css`.
Dès qu'une image est déposée avec le nom exact attendu, elle s'affiche automatiquement.

---

## Principe de fonctionnement

Le fichier `media-manifest.json` (à la racine du projet) centralise la déclaration
de tous les slots images : identifiant, chemin, dimensions, fallback, pages d'usage.

`styles.css` utilise ces chemins comme `background-image` sur les composants concernés.
Les balises `<img>` dans les pages HTML utilisent les mêmes chemins avec un attribut `alt`.

Aucune modification de code n'est nécessaire pour remplacer une image.
Il suffit de déposer le fichier avec le bon nom dans ce dossier.

---

## Remplacer une image — Procédure

1. Préparez votre photo au format JPG, WebP ou PNG.
2. Redimensionnez-la aux dimensions recommandées indiquées dans le tableau du slot.
3. Compressez-la (objectif : moins de 300 Ko par fichier).
4. Renommez le fichier exactement comme indiqué dans la colonne "Nom de fichier".
5. Déposez le fichier dans ce dossier : `porto-flow-site/assets/images/`.
6. Commitez et poussez sur GitHub Pages. L'image s'affiche immédiatement.

> Ne modifiez pas `styles.css`, les pages HTML ou `media-manifest.json` pour remplacer une image.
> Le nom de fichier est la seule clé d'activation.

---

## Slots images — Référence complète

### Slot 1 — Hero Porto-Vecchio

| Propriété            | Valeur                                              |
|----------------------|-----------------------------------------------------|
| Identifiant slot     | `hero_portovecchio`                                 |
| Nom de fichier       | `porto-vecchio-hero.jpg`                            |
| Dimensions           | 1600 × 900 px minimum                               |
| Formats acceptés     | JPG, WebP, PNG                                      |
| Fallback CSS         | Dégradé deep navy `#0B1F33` → ocean `#1F6F8B`       |
| Utilisé dans         | `index.html`, `styles.css`                          |
| Rôle                 | Image principale du site, hero split section accueil |
| Description          | Vue panoramique de Porto-Vecchio : citadelle, golfe, littoral ou vue aérienne. Photo locale authentique, lumière méditerranéenne. Image la plus visible du site. |

---

### Slot 2 — Port et Marina

| Propriété            | Valeur                                              |
|----------------------|-----------------------------------------------------|
| Identifiant slot     | `port_marina`                                       |
| Nom de fichier       | `port-marina.jpg`                                   |
| Dimensions           | 1400 × 900 px minimum                               |
| Formats acceptés     | JPG, WebP, PNG                                      |
| Fallback CSS         | Panneau ocean blue `#1F6F8B`                        |
| Utilisé dans         | `index.html`, `ecosysteme.html`                     |
| Rôle                 | Panneau image section écosystème et accueil         |
| Description          | Port de Porto-Vecchio, marina, front de mer, bateaux. Ambiance méditerranéenne, lumière naturelle, cadrage horizontal. |

---

### Slot 3 — Plage et Littoral

| Propriété            | Valeur                                              |
|----------------------|-----------------------------------------------------|
| Identifiant slot     | `plage_littoral`                                    |
| Nom de fichier       | `plage-littoral.jpg`                                |
| Dimensions           | 1400 × 900 px minimum                               |
| Formats acceptés     | JPG, WebP, PNG                                      |
| Fallback CSS         | Dégradé sky `#8FC7DA` → sand `#F4E8D0`              |
| Utilisé dans         | `territoire.html`, `experience.html`                |
| Rôle                 | Panneau image section territoire et expérience      |
| Description          | Plage emblématique, littoral ou paysage côtier autour de Porto-Vecchio. Eau turquoise, sable blanc, pins parasols. Photo locale, pas de banque d'images générique. |

---

### Slot 4 — Dashboard Territorial

| Propriété            | Valeur                                              |
|----------------------|-----------------------------------------------------|
| Identifiant slot     | `dashboard_local`                                   |
| Nom de fichier       | `dashboard-local.jpg`                               |
| Dimensions           | 1400 × 900 px minimum                               |
| Formats acceptés     | JPG, WebP, PNG                                      |
| Fallback CSS         | Panneau deep navy `#0B1F33`                         |
| Utilisé dans         | `dashboard.html`, `ingenierie.html`                 |
| Rôle                 | Panneau visuel dashboard et ingénierie IA           |
| Description          | Capture ou mockup du dashboard territorial PortoFlow. Interface de données, carte interactive, visualisation de flux ou indicateurs. Ambiance sobre et technique. |

---

### Slot 5 — Acteurs Locaux

| Propriété            | Valeur                                              |
|----------------------|-----------------------------------------------------|
| Identifiant slot     | `acteurs_locaux`                                    |
| Nom de fichier       | `acteurs-locaux.jpg`                                |
| Dimensions           | 1400 × 900 px minimum                               |
| Formats acceptés     | JPG, WebP, PNG                                      |
| Fallback CSS         | Panneau terra `#D86F3C`                             |
| Utilisé dans         | `ecosysteme.html`, `contact.html`                   |
| Rôle                 | Panneau image section écosystème et contact         |
| Description          | Commerce, artisan, restaurant, producteur ou partenaire économique local. Ambiance humaine, professionnelle, ancrée dans le territoire de Corse-du-Sud. |

---

## Relation avec media-manifest.json

Le fichier `media-manifest.json` à la racine du projet déclare chaque slot avec :

- `slot_id` : identifiant unique du slot (ex. `hero_portovecchio`)
- `current_path` : chemin relatif depuis la racine (ex. `assets/images/porto-vecchio-hero.jpg`)
- `used_in` : liste des pages HTML qui utilisent ce slot
- `alt` : texte alternatif pour l'accessibilité
- `fallback_type` : type de fallback CSS activé si l'image est absente
- `recommended_dimensions` : dimensions cibles pour l'optimisation
- `expected_format` : formats acceptés

En cas de modification d'un nom de fichier, mettre à jour `media-manifest.json`
ET renommer le fichier image en conséquence. Les deux doivent rester synchronisés.

---

## Recommandations qualité

- Privilégiez le format **WebP** pour de meilleures performances sur GitHub Pages.
- Compressez systématiquement avant dépôt : objectif **moins de 300 Ko** par image.
- Utilisez exclusivement des photos **locales authentiques** de Porto-Vecchio et Corse-du-Sud.
- Évitez les images de banques génériques : elles nuisent à la crédibilité institutionnelle.
- Respectez les dimensions recommandées pour éviter les distorsions dans les composants CSS.
- Vérifiez que vous détenez les droits d'utilisation de chaque photo déposée.
- En cas de doute sur le format, **JPG** reste le choix le plus universel et compatible.

---

## Structure du dossier

    porto-flow-site/
    └── assets/
        └── images/
            ├── README.md               ← ce fichier de documentation
            ├── porto-vecchio-hero.jpg  ← slot hero_portovecchio (index)
            ├── port-marina.jpg         ← slot port_marina (index, ecosysteme)
            ├── plage-littoral.jpg      ← slot plage_littoral (territoire, experience)
            ├── dashboard-local.jpg     ← slot dashboard_local (dashboard, ingenierie)
            └── acteurs-locaux.jpg      ← slot acteurs_locaux (ecosysteme, contact)

---

## Compatibilité GitHub Pages

Ce site est conçu pour fonctionner directement sur GitHub Pages, sans serveur ni build.
Les images sont référencées en chemins relatifs depuis la racine du projet.
Aucune configuration supplémentaire n'est nécessaire pour l'affichage des images.
Le fallback CSS dans `styles.css` garantit un rendu correct même si une image est absente.

---

*PortoFlow — Copilote intelligent du territoire — Porto-Vecchio / Corse-du-Sud*
*Documentation images — DesignOps V4.3*