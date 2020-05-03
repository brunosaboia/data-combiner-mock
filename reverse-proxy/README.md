# Reverse proxy for Danske Bank's Data Combiner #

## General information ##

The purpose of the `reverse-proxy` project is to provide access to the underlying API's (`balance-server` and `customer-details-server`) from the same host/port, since they run on different containers (if runing with [Docker](https://docker.com/)) or different web servers (if running as a standalone [Node.js](https://nodejs.org/) project).

## Getting started ##

The preferred way of starting this is by using `docker-compose`, as described in the main [README](../README.md#Getting-started) file.

If running as a Docker container, first build the image with:

```
$ docker build . --tag dc-reverse-proxy-server
```

And then run it with:

```
$ docker run -p 8080:8080 dc-reverse-proxy-server
```

If running as a standalone project, you need to create a `.env` file, or just use the `.env-sample` as a starting point.

There are two variables that needs to be set: `BALANCE_SERVER_URL` and `CUSTOMER_DETAILS_SERVER_URL`. They of course refer to the respective [balance-server-mock](../balance-server-mock/README.md) and [customer-details-server-mock](../balance-server-mock/README.md) addresses. If you did not change it in the original projects, then it should be enough to use the defaults provided on `.env-sample`.

*Please note that there are no default values for these set on code, so you must set them before running the proxy!*

You can also set the `REVERSE_PROXY_PORT` env variable if you want to change the port where the proxy is served. It defaults on `8080`.

## URL rewrite

The URL rewrites the root URL for both mock servers.

`balance-server` will be served at the `/rest/` instead of `/api`

`customer-details-server` will be served at `/graphql/` instead of `/`
