# Stackable Feature Tracker

for [Stackable](https://github.com/stackabletech).

# Development

Hosted dev version available [here](stackablefeaturetracker.netlify.app)

Install dependencies

```
npm i
```

Export the Postgres password (needed for the container and psql below)

```
export PGPASSWORD=...
```

Create .env file from .env.example

```
cp .env.example .env
```

Edit the `.env` file with the Postgres connection string and the app password. The connection string should look like `postgres://postgres:<password>@localhost:5432` where `<password>` should match the `PGPASSWORD` env var from above.

Start Postgres in a container

```
# create a volume to persist data between restarts
docker volume create feature-tracker

# start Postgres
docker run --rm --name postgres -e PGDATA=/var/lib/postgresql/data/pgdata -e POSTGRES_PASSWORD=${PGPASSWORD} -d -p 5432:5432 -v feature-tracker:/var/lib/postgresql/data postgres:alpine
```

Create and populate the database

```
npx prisma migrate dev --name init
psql -h localhost -U postgres -f sample/data.sql
```

Run the app

```
npm run dev -- --open
```

## Committing

Feature-tracker uses husky & lint-staged to format files and lint staged changes before each commit.

# Migrating the DB

## Create baseline migration

Only needed once

```
git switch main
mkdir -p prisma/migrations/0_init
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script
npx prisma migrate resolve --applied 0_init
```

## Migrate the life cycle DB schema

```
git switch feat/lifecycle
npx prisma migrate dev --name lifecycle
```
