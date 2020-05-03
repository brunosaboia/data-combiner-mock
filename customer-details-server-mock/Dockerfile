FROM node:12.16.2-alpine3.11

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ARG http_server_port=7802
ENV BALANCE_SERVER_PORT=$http_server_port

EXPOSE $http_server_port

CMD ["node", "server.js"]