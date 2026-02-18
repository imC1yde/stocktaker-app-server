FROM node:22-alpine AS base
RUN npm install -g pnpm
WORKDIR /usr/app/server

FROM base AS builder
COPY ./server/package.json ./server/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY ./server .
RUN pnpm exec prisma generate
RUN pnpm run build
RUN pnpm prune --prod

FROM node:22-alpine AS runner
RUN apk add --no-cache openssl dos2unix libc6-compat
WORKDIR /usr/app/server

COPY --from=builder /usr/app/server/dist ./dist
COPY --from=builder /usr/app/server/node_modules ./node_modules
COPY --from=builder /usr/app/server/prisma ./prisma
COPY --from=builder /usr/app/server/pnpm-lock.yaml /usr/app/server/package.json /usr/app/server/external-api.yml ./

EXPOSE ${NEST_PORT}

CMD npx prisma migrate deploy && node dist/main.js