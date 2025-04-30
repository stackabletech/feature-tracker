FROM node:23.11.0-bookworm-slim@sha256:c868bda4c3b687b50ae1e5fb8b4f6815a37729bd60a1e3c90349132b03bef65c AS builder

WORKDIR /app

# Install OpenSSL for Prisma
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy Prisma schema
COPY prisma ./prisma

# Install dependencies
COPY package*.json ./
RUN npm ci

COPY . .

ENV USE_NODE_ADAPTER=true
RUN npm run build
RUN npm prune --production

FROM node:23.11.0-bookworm-slim@sha256:c868bda4c3b687b50ae1e5fb8b4f6815a37729bd60a1e3c90349132b03bef65c

WORKDIR /app

# Install OpenSSL for Prisma
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/

COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
ENV USE_NODE_ADAPTER=true
CMD [ "node", "build" ]
