# KwataBall 🏀

Application mobile de suivi du basketball local au Cameroun — calendriers, résultats, classements, fiches équipes et joueurs. Pensée comme une version SofaScore centrée sur le basketball camerounais.

## Stack

- **Mobile** : Flutter (Dart), gestion d'état Riverpod, routing go_router
- **Backend** : NestJS (Node.js / TypeScript), API REST, PostgreSQL
- **Design** : Figma (wireframes et maquettes)

## Structure du dépôt

```
KwataBall/
├── docs/        # cahier des charges, architecture backend/frontend, plan d'action
├── mobile/       # application Flutter
├── backend/      # API NestJS
└── README.md
```

La documentation complète de conception (cahier des charges, schéma de base de données, spécification des endpoints, architecture Flutter, plan d'action) se trouve dans [`docs/`](./docs).

## Démarrage rapide

### Backend

```bash
cd backend
npm install
cp .env.example .env   # à compléter avec les identifiants PostgreSQL locaux
npm run start:dev
```

L'API est servie sur `http://localhost:3000/api/v1`. Documentation Swagger disponible sur `http://localhost:3000/api/docs` (une fois mise en place).

### Mobile

```bash
cd mobile
flutter pub get
flutter run
```

Par défaut, l'application pointe vers l'API locale. Voir `mobile/lib/core/network/` pour la configuration de l'URL de base.

## Organisation du travail

- Branche `main` : toujours déployable, protégée.
- Branche `develop` : intégration du travail en cours.
- Branches `feature/nom-de-la-feature` : une par fonctionnalité, fusionnées via pull request.

## Équipe

| Rôle | Responsabilités |
|---|---|
| Développeur principal | Développement mobile, participation au backend, tests et maintenance |
| Superviseur / Lead technique | Validation des choix techniques, revue de code, architecture |
| Partenaire fournisseur de données | Fourniture et mise à jour des données (équipes, joueurs, compétitions, calendrier) |

## État du projet

🚧 En cours de cadrage — voir [`docs/organisation-developpement.md`](./docs/organisation-developpement.md) pour le détail des décisions d'architecture et le plan d'action MVP.
