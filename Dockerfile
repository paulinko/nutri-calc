FROM node:16-alpine as builder

WORKDIR /app

COPY public ./public
COPY src/ ./src
COPY .env.de .env.en babel.config.js vue.config.js package.json package-lock.json switch_to_lc.sh build_for_lc.sh ./
COPY docs/ ./docs

RUN npm install -g npm@8.3.2 && npm install && npm audit fix --only=prod && npm run build

FROM nginx:alpine

COPY --from=builder /app/docs /usr/share/nginx/html/
