# syntax=docker/dockerfile:1
# Multi-arch: linux/amd64 (x64) + linux/arm64 (Apple Silicon, Raspberry Pi 4 / ARMv8)
#
# Build once on $BUILDPLATFORM (pnpm + Vite, Solid 2 start mode), then copy dist into the
# per-arch runtime. The build prerenders every page to static HTML in dist/client; the Node
# server (dist/server/node.js) serves those files and renders anything else. The server build
# bundles its dependencies, so the runtime image needs no node_modules.
#
# Layer order (cache-friendly):
#   1) pnpm install (package manifests + lockfile)
#   2) build web → apps/web/dist
#
#   docker build -f docker/web/Dockerfile -t solidx-web .

ARG NODE_IMAGE=node:24-alpine

FROM --platform=$BUILDPLATFORM ${NODE_IMAGE} AS build
WORKDIR /workspace

ENV CI=true

RUN corepack enable && corepack prepare pnpm@12.16.1 --activate

# --- 1. Install deps (invalidates when manifests / lockfile change) ---
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY --parents apps/*/package.json ./
COPY --parents packages/*/package.json ./
RUN pnpm install --frozen-lockfile --filter web...

# --- 2. Build web (invalidates when sources change) ---
COPY packages/kit ./packages/kit
COPY packages/excalidraw ./packages/excalidraw
COPY apps/web ./apps/web
RUN pnpm --filter web build

FROM ${NODE_IMAGE} AS runtime
WORKDIR /app

RUN addgroup -S solidx && adduser -S -G solidx -H -s /sbin/nologin solidx

COPY --from=build --chown=solidx:solidx /workspace/apps/web/dist ./dist

USER solidx
EXPOSE 8080

ENV NODE_ENV=production \
  PORT=8080 \
  HOST=0.0.0.0

ENTRYPOINT ["node", "dist/server/node.js"]
