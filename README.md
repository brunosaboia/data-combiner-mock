# Data Combiner Mock Servers #

## General information ##

The purpose of this project is to provide mock data for [Danske Bank's](https://danskebank.dk) data combiner project. Currently, it provides two mock microservices: REST-based [balance-server-mock](./balance-server-mock/README.md) and GraphQL-based [customer-details-server-mock](./customer-details-server-mock/README.md).

## Getting started ##

If you want to use this project with [Docker](https://docker.com), you need to use [docker compose](https://docs.docker.com/compose/).

To spin-off the project for the first time, just run:

```
$ docker-compose up --build
```

After the first run, it is not necessary to build the docker images anymore, unless they are changed. If they are unchanged, just type:

```
$ docker-compose up
```

By default, this will start the `reverse-proxy` on http://localhost:8080. Please refer to [reverse-proxy documentation](./reverse-proxy/README.md) for information on URL routes and how to change the default behavior, if you wish.

## ASAP and delayed calls ##

Since an important goal of this project is to emulate heavy-loaded APIs, there are mechanisms to control the delay in the response time for each provided API. Each API provides a way to send data as soon as possible (ASAP), or in a delayed fashion. The strategy to invoke the endpoints and receive the response with a delay is different for each API.

## Delay call parameters ##

The delayed call is invoked by using different strategies. The details of each strategy can be seen on the respective `README.md` file of the project.

| API               | Service name                  | Strategy                      | Details from `README.md`                                              |
|-------------------|-------------------------------|-------------------------------|-----------------------------------------------------------------------|
| REST API          | `balance-server-mock`         | GraphQL query call parameters | [Click here](./balance-server-mock/README.md#Delayed-call)            |
| GraphQL           | `customer-details-server-mock`| HTTP Headers & custom route   | [Click here](./customer-details-server-mock/README.md#Delayed-call)   |

## Author information ##

If you have any questions or comments, please contact:

* Bruno Saboia de Albuquerque
* brunosaboia@mail.com