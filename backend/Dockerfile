FROM oven/bun:latest

WORKDIR /backend
COPY ./package.json ./
COPY ./bun.lockb ./
COPY ./.env ./
COPY ./keycloak.json ./
RUN bun install

COPY ./src ./src

CMD [ "bun","dev" ]