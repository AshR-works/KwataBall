# Organisation du développement — App basketball Cameroun

> Document de référence technique. Récapitule les décisions d'architecture, de conception et de planification prises avant le démarrage du développement. À mettre à jour au fil du projet plutôt qu'à relire comme figé.

---

## 1. Stack technique retenue

| Couche | Choix | Justification |
|---|---|---|
| Application mobile | Flutter (Dart), Android prioritaire | Multi-plateforme, écosystème mature |
| Gestion d'état | Riverpod | Moins de boilerplate que Bloc, plus simple à tester pour un développeur seul |
| Routing | go_router | Gère bien les routes nommées partagées (`/team/:id`, etc.) et les deep links |
| Backend | NestJS (Node.js / TypeScript) | Structure modulaire, écosystème robuste |
| API | REST (pas GraphQL au MVP) | Plus simple à documenter (Swagger), besoins pas assez complexes pour justifier GraphQL |
| Base de données | PostgreSQL | Relationnel, adapté au modèle équipes/joueurs/matchs |
| Cache local mobile | Hive (ou Drift selon préférence) | Pattern stale-while-revalidate |
| Design | Figma | Wireframes puis maquettes hi-fi |

---

## 2. Schéma de base de données (PostgreSQL)

### `competitions`
id (uuid, PK) · name · season · type (`national`/`regional`/`jeunes`/`feminin`) · country · logo_url · status (`a_venir`/`en_cours`/`terminee`) · external_id (unique) · created_at · updated_at

### `teams`
id (uuid, PK) · name · short_name · logo_url · city · founded_year · external_id (unique) · created_at · updated_at

### `competition_teams` (liaison)
id · competition_id (FK) · team_id (FK) · group_name · created_at — index unique `(competition_id, team_id)`

### `players`
id (uuid, PK) · first_name · last_name · photo_url · birth_date · height_cm · position (`meneur`/`arriere`/`ailier`/`ailier_fort`/`pivot`) · jersey_number · team_id (FK, nullable) · external_id (unique) · created_at · updated_at

### `matches`
id (uuid, PK) · competition_id (FK) · home_team_id (FK) · away_team_id (FK) · scheduled_at · venue · status (`a_venir`/`termine`/`reporte`/`annule`) · home_score · away_score · period_scores (jsonb) · external_id (unique) · created_at · updated_at
— index sur `(competition_id, scheduled_at)`, `(home_team_id)`, `(away_team_id)`

### `player_stats`
id · player_id (FK) · match_id (FK) · points · rebounds · assists · minutes_played · external_id — index unique `(player_id, match_id)`

### `news_articles`
id · title · content · image_url · source · published_at · related_team_id (FK, nullable) · related_competition_id (FK, nullable)

### `favorites`
id · device_id · favoritable_type (`team`/`player`/`competition`) · favoritable_id · created_at — index unique `(device_id, favoritable_type, favoritable_id)`

### `data_sync_logs`
id · source · entity_type · records_processed · records_failed · started_at · finished_at · status (`succes`/`echec`/`partiel`)

**Choix structurants :**
- `uuid` plutôt qu'auto-incrément, pour éviter les collisions entre sources d'import.
- Classements (`standings`) **non stockés** : calculés à la volée par agrégation sur `matches`. Bascule possible vers une table matérialisée plus tard sans changer le contrat API.
- `favorites` en pattern polymorphe (type + id) plutôt que trois tables séparées — flexible mais sans FK stricte (cohérence gérée côté application).
- `period_scores` en jsonb plutôt qu'une table relationnelle séparée, pour rester simple tant que la donnée n'est pas interrogée indépendamment.

---

## 3. Structure des modules NestJS

```
src/
├── common/              # filters, interceptors, pipes, pagination partagés
├── database/            # config TypeORM/Prisma + migrations
├── competitions/
├── teams/
├── players/
├── matches/
├── standings/           # pas d'entity propre, calcule depuis matches
├── search/               # orchestre teams/players/competitions
├── favorites/
├── news/
└── data-sync/
    ├── importers/        # un par entité, manipulent des objets normalisés
    └── sources/          # adaptateurs : csv, api, manuel
```

Principe clé : `data-sync` isole toute la logique dépendante du format des données partenaire derrière des adaptateurs, pour qu'un changement de source n'impacte jamais les contrôleurs consommés par l'app.

---

## 4. Endpoints API (préfixe `/api/v1`)

Convention commune : réponses enveloppées `{ data, meta }`, pagination `page`/`limit` (défaut 20), dates ISO 8601.

| Endpoint | Usage |
|---|---|
| `GET /competitions` | Liste paginée, filtrable par status/type |
| `GET /competitions/:id` | Détail + équipes inscrites |
| `GET /teams/:id` | Fiche équipe |
| `GET /teams/:id/roster` | Effectif |
| `GET /teams/:id/matches` | Calendrier d'une équipe |
| `GET /teams/:id/form` | 5 derniers résultats condensés |
| `GET /players/:id` | Fiche joueur |
| `GET /players/:id/stats` | Statistiques agrégées |
| `GET /players/:id/matches` | Derniers matchs joués |
| `GET /matches` | Endpoint central (Accueil + Calendrier), filtres date/competition/team/status |
| `GET /matches/:id` | Détail complet, period_scores, top_scorers |
| `GET /standings?competition_id=` | Classement calculé à la volée |
| `GET /search?q=` | Résultats groupés teams/players/competitions |
| `GET /favorites` · `POST /favorites` · `DELETE /favorites` | Gestion des favoris via `device_id` |
| `GET /news` · `GET /news/:id` | Actualités |
| `POST /data-sync/import` · `GET /data-sync/logs` | Admin, protégé par clé API |

**Format `MatchSummary`** (réutilisé sur 5 endpoints, mappe directement sur le widget `MatchCard`) :
```json
{
  "id": "...",
  "scheduled_at": "2026-07-04T18:30:00Z",
  "status": "termine",
  "venue": "...",
  "home_team": { "id": "...", "name": "...", "short_name": "...", "logo_url": "..." },
  "away_team": { "id": "...", "name": "...", "short_name": "...", "logo_url": "..." },
  "home_score": 78,
  "away_score": 71,
  "is_favorite": false
}
```

Pas d'authentification complexe au MVP : `device_id` en header pour les favoris, clé API simple pour `data-sync`.

---

## 5. Stratégie d'import des données partenaire

Trois scénarios possibles, à clarifier avec le partenaire avant de coder :
- **A. Fichiers structurés** (CSV/Excel) envoyés régulièrement.
- **B. Accès API/base existante** chez le partenaire, sync périodique via cron.
- **C. Saisie manuelle** via back-office, à construire en premier comme filet de sécurité.

Logique d'import : idempotente (upsert sur `external_id`), résiliente (chaque ligne traitée indépendamment, échecs partiels loggés sans bloquer tout l'import).

**Questions à poser au partenaire avant le premier développement de `data-sync` :**
1. Format actuel des données chez eux ?
2. Fréquence de mise à jour ?
3. Contact dédié pour la transmission ?
4. Identifiants uniques disponibles ou réconciliation par nom nécessaire ?

---

## 6. Architecture Flutter

### Arborescence (feature-first)
```
lib/
├── app/                  # MaterialApp, thème, router
├── core/
│   ├── network/          # ApiClient unique, gestion d'erreur typée (ApiException)
│   ├── cache/             # LocalCacheService (Hive), stale-while-revalidate
│   ├── widgets/           # composants partagés (ErrorStateView, etc.)
│   └── utils/
└── features/
    ├── teams/      (data/domain/presentation)
    ├── players/
    ├── matches/     ← MatchCard vit ici, réutilisé partout
    ├── competitions/
    ├── search/
    ├── favorites/    ← transverse, dépend des autres features
    ├── news/
    └── home/
```

Chaque feature suit `data → domain → presentation`. Le `domain` contient des modèles Dart indépendants du JSON brut.

### Principes de gestion d'état
- Un provider Riverpod par requête (`FutureProvider.family`), pas d'état global monolithique.
- Modèles Dart calqués un-à-un sur les DTOs de l'API (ex. `MatchSummary.fromJson`).
- Repositories qui mappent une méthode = un endpoint (`MatchesRepository.getMatches({...})` ↔ `GET /matches`).

### Ordre de mise en place recommandé
1. `core/network/api_client.dart` + exception typée.
2. Modèles Dart (copie du contrat API).
3. `MatchCard` connecté à un repository mocké (développement UI sans dépendre du backend).
4. Repository + provider réels pour `matches`.
5. Réplication du pattern pour les autres features.

### Tests minimaux à prévoir
- Tests unitaires sur le parsing des modèles (`fromJson`).
- Tests de widget sur `MatchCard` pour chaque variant de statut.

---

## 7. Composants UI transverses (Figma + Flutter)

À construire une seule fois, réutilisés dans plusieurs écrans :

| Composant | Variants principaux |
|---|---|
| `MatchCard` | statut (a_venir/termine/reporte/annule), favori, compact |
| Badge de statut | couleur par statut |
| Pastille forme V/D | victoire/défaite |
| Bouton favori (étoile) | actif/inactif, zone de tap 44dp |
| Pill de date (sélecteur horizontal) | actif/inactif |
| `CompetitionCard` | favori, statut-saison |
| État vide générique | texte/icône paramétrables |
| État de chargement (skeleton) | un par type de carte |

---

## 8. Arborescence de navigation (rappel)

```
App
├── Accueil          → Détail match, Fiche équipe
├── Compétitions      → Liste comp. → Calendrier / Classement → Fiche équipe → Fiche joueur
├── Recherche          → Fiche équipe / Fiche joueur / Liste comp.
├── Favoris            → (mêmes écrans de détail, partagés)
└── Actualités          → Vue article → Fiche équipe / Liste comp.
```

Les écrans de détail (Fiche équipe, Fiche joueur, Détail match) sont des destinations **partagées** atteignables depuis n'importe quel onglet — routes nommées indépendantes côté `go_router`.

---

## 9. Plan d'action MVP (rappel synthétique)

| Étape | Semaines | Contenu |
|---|---|---|
| 1. Cadrage | 1-2 | Validation périmètre, échanges partenaire data, modélisation BDD, wireframes |
| 2. Mise en place technique | 3-4 | Init Flutter + NestJS, Git, maquettes hi-fi |
| 3. Backend | 5-7 | Endpoints API, import/sync, calcul classements, doc Swagger |
| 4. Mobile | 6-10 | Écrans, recherche, favoris, connexion API (en parallèle du backend) |
| 5. Tests | 11-12 | Tests fonctionnels, multi-appareils, revue de code |
| 6. Lancement | 13 | Bêta fermée, retours, correctifs |

Durée indicative totale : ~13 semaines, ajustable selon la disponibilité réelle des données partenaire (facteur de risque n°1).

---

## 10. Points encore ouverts / à valider avec le superviseur

- Gestion d'état Flutter : confirmer Riverpod (vs Bloc).
- Mode de stockage local exact (Hive vs Drift).
- Scénario d'import data-sync à prioriser (A/B/C) — dépend de la session de cadrage avec le partenaire.
- Choix définitif `device_id` vs compte utilisateur pour les favoris (MVP = device_id).
- Validation finale des propositions complémentaires du cahier des charges (notifications push, mode hors-ligne, bilinguisme FR/EN).

---

*Document vivant — à mettre à jour à chaque décision structurante prise en cours de projet.*
