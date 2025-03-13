
FROM node:20 AS base
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS test
COPY . .
RUN npm run test

FROM base AS build
COPY --from=test /usr/src/app .
RUN npm run build
