const {ApolloServer, gql} = require('apollo-server');
const fs = require('fs');
const md5File = require('md5-file');

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
let customers = [];
let latestFileSize = 0;
let latestMd5 = '';

const isLatestMd5 = async () => {
  const currentMd5 = await md5File(customerDataFilePath);
  const isCurrentMd5 = currentMd5 === latestMd5;

  latestMd5 = currentMd5;

  return isCurrentMd5;
};

const isCustomerDataCurrent = async () => {
  const stats = fs.statSync(customerDataFilePath);
  const currentFileSize = stats['size'];

  if (latestFileSize === 0) {
    const msg = 'Checking for the first time. ' +
      `File has ${currentFileSize} bytes`;
    console.log(msg);
    latestFileSize = currentFileSize;

    return false;
  }
  const isCurrentFileSize = currentFileSize === latestFileSize;

  if (isCurrentFileSize) {
    console.log('File size has not changed. Checking MD5');

    return isLatestMd5();
  }
  latestFileSize = currentFileSize;

  return false;
};

const readCustomerData = () => {
  try {
    const customerData = fs.readFileSync(customerDataFilePath, 'utf-8');

    return JSON.parse(customerData);
  } catch {
    const errMsg = `Error reading customer data: ${err}. ` +
    'Customer data will be empty.';
    console.log(errMsg);

    return [];
  }
};

const loadMostUpToDateCustomerData = async () => {
  if (await isCustomerDataCurrent()) {
    console.log('Customer data is up to date. Skipping data loading');

    return;
  }
  console.log('Loading most recent data');
  customers = readCustomerData();
  console.log(`Loaded ${customers.length} customers in memory`);
};

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
    async customers() {
      await loadMostUpToDateCustomerData();
      console.log('Sending customer details without delay');

      return customers;
    },
    async customersDelay(_, args) {
      await loadMostUpToDateCustomerData();
      await sleepWithArgs(args);

      return customers;
    },
    async findByName(_, args) {
      await loadMostUpToDateCustomerData();
      const msg = `Sending customer details for name ${args.name}` +
        'without delay';
      console.log(msg);

      return customers.find((customer) => customer.name === args.name);
    },
    async findByNameDelay(_, args) {
      await loadMostUpToDateCustomerData();
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
