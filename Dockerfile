FROM node:24.21.0-alpine@sha256:ebfe2f90462722a7a4de65e91990e97fe0d401c70e0e762c5b53302f905ec1c1 AS builder

WORKDIR /app

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl

# Copy Prisma schema
COPY prisma ./prisma

# Install dependencies
COPY package*.json ./
RUN npm ci

COPY . .

ENV USE_NODE_ADAPTER=true
RUN npm run build

# Separate stage so the builder target keeps the dev dependencies (e.g. the Prisma CLI for migrations)
FROM builder AS prod-deps
# --omit=optional as well: prisma and typescript are optional peers of @prisma/client, so npm marks them
# (and their dependencies) devOptional, which --omit=dev alone keeps
RUN npm prune --omit=dev --omit=optional

FROM node:24.21.0-alpine@sha256:ebfe2f90462722a7a4de65e91990e97fe0d401c70e0e762c5b53302f905ec1c1

WORKDIR /app

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl

COPY --from=builder /app/build build/
COPY --from=prod-deps /app/node_modules node_modules/

COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
ENV DOTENV_QUIET=true
ENV USE_NODE_ADAPTER=true
CMD [ "node", "build" ]
