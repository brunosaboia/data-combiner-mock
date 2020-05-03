# Balance Server Mock #

## General information ##

This project is a very simple [Express](https://expressjs.com/) server, which exposes a REST API. The purpose is to return mock balance information.

The fields returned are `account`, `balance` and `currency`.

## API definition ##

The table below explains the REST API definition. For details on the difference between ASAP and delayed calls, please read the Data Combiner mock project's [README](../README.md).

The default root for the project is `http://localhost:7801`. You can change that behavior either by changing the `BALANCE_SERVER_PORT` environment variable. If running as a [Docker](https://docker.com) container, please remember to set the variable in the `Dockerfile`.


| Endpoint                                                          | HTTP Verb                                                             | Data Return Mode  |
|-------------------------------------------------------------------|-----------------------------------------------------------------------|-------------------|
| [/api/balances/](http://localhost:7801/api/balances/)             | [GET](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET)  | ASAP              |
| [/api/balances-delay/](http://localhost:7801/api/balances-delay/) | [GET](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET)  | Delayed           |

### Reverse Proxy URL rewrite ###

If running with [reverse-proxy](../reverse-proxy/README.md), the project root will be `http://localhost:8080`, and the endpoints will be accessible on the routes shown below:


| Endpoint                                                           | HTTP Verb                                                             | Data Return Mode  |
|--------------------------------------------------------------------|-----------------------------------------------------------------------|-------------------|
| [/rest/balances/](http://localhost:8080/rest/balances/)            | [GET](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET)  | ASAP              |
| [/rest/balances-delay/](http://localhost:8080/rest/balances-delay/)| [GET](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET)  | Delayed           |

## Delayed call ##

If using the delayed endpoint, your HTTP call must use additional request headers. If those are not provided, default values will be used instead.

The API will wait a random time between the minimum and maximum values, and then return the mock data.

Please see the table below:

| Request Header    | Type      | Time unit                                                     | Default value |
|-------------------|-----------|---------------------------------------------------------------|---------------|
| X-Min-Delay       | Integer   | [Millisseconds](https://en.wikipedia.org/wiki/Millisecond)    | 3000          |
| X-Max-Delay       | Integer   | [Millisseconds](https://en.wikipedia.org/wiki/Millisecond)    | 10000         |

