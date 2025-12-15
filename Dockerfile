FROM node:24-alpine AS builder

WORKDIR /app

COPY . ./

RUN npm ci --only=production

EXPOSE 3000

CMD ["node", "src/server.ts"]