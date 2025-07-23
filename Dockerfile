# Etapa de build
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/
COPY src ./src/

RUN npm install

# Gera o cliente Prisma
RUN npx prisma generate

# Compila TypeScript para JavaScript
RUN npm run build

# Etapa de produção
FROM node:18-alpine

WORKDIR /app

COPY --from=build /app /app

# Instala só as dependências de produção
RUN npm install --omit=dev

EXPOSE 3000

CMD ["node", "dist/index.js"]
