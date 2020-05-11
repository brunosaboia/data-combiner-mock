FROM node:12.16.2-alpine3.11 AS tsc-build-env
WORKDIR /usr/src/common-lib

COPY ./common-lib/package*.json ./
RUN npm install

COPY ./common-lib/ ./

RUN npm run tsc

FROM node:12.16.2-alpine3.11

WORKDIR /usr/src/app/customer-details-server-mock

COPY ./customer-details-server-mock/package*.json ./

RUN npm install

COPY ./customer-details-server-mock .

COPY --from=tsc-build-env /usr/src/common-lib ../common-lib

ARG http_server_port=7802
ENV CUSTOMER_DETAILS_SERVER_PORT=$http_server_port

EXPOSE $http_server_port

CMD ["node", "server.js"]