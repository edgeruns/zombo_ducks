FROM node:16.14-alpine

WORKDIR app

COPY node_modules ./node_modules
COPY dist/apps/games/zombofighter/api .

ENV PORT=3333

EXPOSE 3334
EXPOSE 3333

ENV NODE_ENV=production

CMD ["node", "main.js"]
