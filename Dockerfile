FROM node:latest

RUN mkdir /app

COPY ./webapp/. /app

WORKDIR /app

RUN npm install

EXPOSE 80

CMD [ "node", "server.js" ]