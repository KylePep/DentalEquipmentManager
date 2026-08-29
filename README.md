# Dental Equipment Manager

Monorepo scaffold. Next.js frontend + .NET API + PostgreSQL.

```
apps/
  web/   Next.js 16 (App Router) + TypeScript          -> http://localhost:3000
  api/   .NET 10 minimal API + EF Core (Npgsql)         -> http://localhost:5080
docker-compose.yml   PostgreSQL 17                      -> localhost:5433
```

The web app calls the API over HTTP (`NEXT_PUBLIC_API_URL`). The API owns the
database via EF Core migrations.

## Prerequisites

- Node.js 20+
- .NET SDK 10
- Docker (for PostgreSQL and the backend integration tests)

## First-time setup

```bash
# 1. Database
docker compose up -d

# 2. API
cd apps/api
dotnet restore
dotnet dotnet-ef database update --project DentalEquipmentManager.Api

# 3. Web
cd ../web
npm install
cp .env.local.example .env.local
npx playwright install chromium   # only needed to run e2e tests
```

## Running

```bash
# Terminal 1 - database
docker compose up

# Terminal 2 - API (http://localhost:5080, OpenAPI at /openapi/v1.json)
cd apps/api && dotnet run --project DentalEquipmentManager.Api

# Terminal 3 - web (http://localhost:3000)
cd apps/web && npm run dev
```

## Tests

| Scope | Command | Notes |
|-------|---------|-------|
| Backend (unit + integration) | `cd apps/api && dotnet test` | Integration tests spin a throwaway Postgres via Testcontainers; Docker must be running |
| Frontend units | `cd apps/web && npm test` | Vitest + React Testing Library |
| Frontend e2e | `cd apps/web && npm run test:e2e` | Playwright; starts the web dev server automatically |

## Database migrations

```bash
cd apps/api
dotnet dotnet-ef migrations add <Name> --project DentalEquipmentManager.Api --output-dir Data/Migrations
dotnet dotnet-ef database update --project DentalEquipmentManager.Api
```
