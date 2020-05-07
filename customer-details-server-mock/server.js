const {ApolloServer, gql} = require('apollo-server');
const {DataLoader} = require('../common-lib/data-loader');


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


const customerDataFilePath = './customers.json';
const customers = new DataLoader(customerDataFilePath);

const resolvers = {
  Query: {
    async customers() {
      await customers.loadMostUpToDateData();

      console.log('Sending customer details without delay');

      return customers.data;
    },
    async customersDelay(_, args) {
      await customers.loadMostUpToDateData();

      await sleepWithArgs(args);

      return customers.data;
    },
    async findByName(_, args) {
      await customers.loadMostUpToDateData();

      const msg = `Sending customer details for name ${args.name}` +
        'without delay';
      console.log(msg);

      return customers.data.find((customer) => customer.name === args.name);
    },
    async findByNameDelay(_, args) {
      await customers.loadMostUpToDateData();

      await sleepWithArgs(args);

      return customers.data.find((customer) => customer.name === args.name);
    },
  },
  CustomerDetails: {
    async __resolveReference(object) {
      await customers.loadMostUpToDateData();

      return customers.data.find((customer) => customer.id === object.id);
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
