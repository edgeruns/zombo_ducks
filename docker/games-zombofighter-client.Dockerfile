FROM nginx:1.22.0
WORKDIR /build/

COPY nginx/games-zombofighter-client.conf /etc/nginx/conf.d/default.conf
COPY dist/apps/games/zombofighter/client/ .

ENV NGINX_PORT=3333

EXPOSE 3333
