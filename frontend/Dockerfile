FROM oven/bun:latest

COPY .env /app/

WORKDIR /app

COPY package.json ./

RUN bun install

COPY . .

CMD [ "bun","dev" ]
