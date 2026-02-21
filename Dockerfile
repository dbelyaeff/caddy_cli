FROM oven/bun:1-alpine AS builder

WORKDIR /app

COPY package.json bun.lock* ./
COPY tsconfig.json ./

RUN bun install --frozen-lockfile

COPY src ./src

RUN bun build --target=bun ./src/main.ts --outdir=dist --minify

FROM alpine:3.19

RUN apk add --no-cache docker-cli

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

RUN addgroup -g 1000 -S appgroup && \
    adduser -u 1000 -S appuser -G appgroup

USER appuser

ENTRYPOINT ["bun", "run", "dist/main.js"]
