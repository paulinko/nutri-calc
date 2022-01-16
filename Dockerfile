FROM node:14-alpine as builder

WORKDIR /app

COPY public ./public
COPY src/ ./src
COPY babel.config.js package.json package-lock.json switch_to_lc.sh build_for_lc.sh ./
COPY docs/ ./docs

RUN npm install && npm audit fix && npm run build

FROM nginx:alpine

COPY --from=builder /app/docs /usr/share/nginx/html/
