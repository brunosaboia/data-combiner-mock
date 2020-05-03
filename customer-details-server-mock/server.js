const {ApolloServer, gql} = require('apollo-server');

const typeDefs = gql`
    type Query {
      customers: [CustomerDetails]
      customersDelay(min: Int = 3000, max: Int = 10000): [CustomerDetails]
      findByName(name: String!): CustomerDetails
      findByNameDelay(name: String!, min: Int = 3000, max: Int = 10000):
        CustomerDetails
    }

    type CustomerDetails {
      iban: ID!
      name: String!
      address: String
    }
`;

const customers = [
  {
    iban: 'DK0550514428749649',
    name: 'Hamlet of Denmark',
    address: 'Castle of Helsingør',
  },
  {
    iban: 'DK2750511545499816',
    name: 'Giovanna Câmara Wiebbeling 💓', // testing UTF-8 return
  },
];

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const generateRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const sleepWithArgs = async (args) => {
  const min = args.min || 3000;
  const max = args.max || 10000;

  const sleepTime = generateRandomInteger(min, max);
  console.log(`Sleeping for ${sleepTime} before returning details`);
  await sleep(sleepTime);
};

const resolvers = {
  Query: {
    customers() {
      console.log('Sending customer details without delay');

      return customers;
    },
    async customersDelay(_, args) {
      await sleepWithArgs(args);

      return customers;
    },
    findByName(_, args) {
      return customers.find((customer) => customer.name === args.name);
    },
    async findByNameDelay(_, args) {
      await sleepWithArgs(args);

      return customers.find((customer) => customer.name === args.name);
    },
  },
  CustomerDetails: {
    __resolveReference(object) {
      return customers.find((customer) => customer.id === object.id);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(7802).then(({url}) => {
  console.log(`Customer details server started at URL ${url}`);
});
