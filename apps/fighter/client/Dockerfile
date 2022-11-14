FROM node:16 as builder

WORKDIR /build/

COPY package.json pnpm-lock.yaml ./

RUN corepack enable
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build fighter-client



FROM nginx:1.22.0

WORKDIR /build/

COPY --from=builder /build/apps/client/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /build/dist/apps/fighter-client/ .

ENV NGINX_PORT=3333

EXPOSE 3333
