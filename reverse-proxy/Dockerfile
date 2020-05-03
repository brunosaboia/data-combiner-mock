FROM node:12.16.2-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

ARG balance_server_url=http://balance:7801
ARG customer_details_server_url=http://customer-details:7802
ARG reverse_proxy_port=8080

ENV BALANCE_SERVER_URL=$balance_server_url
ENV CUSTOMER_DETAILS_SERVER_URL=$customer_details_server_url
ENV REVERSE_PROXY_PORT=$reverse_proxy_port

COPY . .

USER node

EXPOSE $reverse_proxy_port

CMD ["node", "proxy.js"]