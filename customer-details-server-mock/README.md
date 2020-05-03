# Customer Details Server Mock #

## General information ##

This project is a very simple [GraphQL](https://graphql.com) server, using the [Apollo](https://www.apollographql.com/) variant. The purpose is to return mock customer details.

The fields returned are `iban`, `name` and `address`, in an entity called `CustomerDetails`.

## API definition ##

The GraphQL definition can be found in the `server.js` file. The documentation for it can be found in the table below:

| Query             | Return Type                   | Parameters                            | Data Return Mode  |
|-------------------|-------------------------------|---------------------------------------|-------------------|
| `customers`       | Array of `CustomerDetails`    | _None_                                | ASAP              |
| `customersDelay`  | Array of `CustomerDetails`    | `min: Int = 3000, max: Int = 10000`   | Delayed           |
| `findByName`      | Instance of `CustomerDetails` | _None_                                | ASAP              |
| `findByNameDelay` | Instance of `CustomerDetails` | `min: Int = 3000, max: Int = 10000`   | Delayed           |

## Delayed call ##

The way to perform delayed calls for this project is by invoking the `*Delay` queries with a `min` and `max` argument. If none are specified, it uses the default values of 3000 for `min` and 10000 for `max`.

A sample GraphQL that will return a random delay between 5000 and 6000 can be found below:

```
{
  customersDelay(min: 5000, max: 6000){
    iban
  }
}
```

It will return only the `iban` field, as expected:

```
{
  "data": {
    "customersDelay": [
      {
        "iban": "DK0550514428749649"
      },
      {
        "iban": "DK2750511545499816"
      }
    ]
  }
}
```