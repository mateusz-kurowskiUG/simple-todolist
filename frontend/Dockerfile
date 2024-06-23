FROM node:latest

WORKDIR /app
COPY package.json ./
RUN npm install

COPY .env /app/



COPY . .

CMD [ "npm","run","dev" ]

EXPOSE 3000