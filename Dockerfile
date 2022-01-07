FROM node:14-alpine as builder

WORKDIR /app

COPY public ./public
COPY src/ ./src
COPY babel.config.js package.json package-lock.json ./

RUN npm install && npm audit fix && npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html/
