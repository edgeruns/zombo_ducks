FROM node:16 as builder

WORKDIR /build/

COPY package.json pnpm-lock.yaml ./

RUN corepack enable
RUN pnpm install --frozen-lockfile
COPY . .

RUN pnpm run build fighter-api


FROM node:16
WORKDIR /build/

COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/dist/apps/fighter-api .

ENV PORT=3333

EXPOSE 3333

ENV NODE_ENV=production

CMD ["node", "main.js"]
