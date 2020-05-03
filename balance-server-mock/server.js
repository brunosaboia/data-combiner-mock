const express = require('express');

const app = express();
app.use(express.json());

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const generateRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const balances = [
  {
    account: 'DK2750511545499816',
    balance: 100.43,
    currency: 'DKK',
  },
  {
    account: 'DK2750511545499816',
    balance: 4000.44,
    currency: 'DKK',
  },
  {
    account: 'DK0550514428749649',
    balance: 100000.00,
    currency: 'DKK',
  },
];

app.get('/api/balances-delay', (req, res) => {
  const min = req.header('X-Min-Delay') || 3000;
  const max = req.header('X-Max-Delay') || 10000;

  const sleepTime = generateRandomInteger(min, max);
  console.log(`Sleeping for ${sleepTime} before returning balance`);

  sleep(sleepTime).then(() => {
    res.send(balances);
  });
});

app.get('/api/balances', (_req, res) => {
  console.log('Sending balances without delay');

  res.send(balances);
});

const port = process.env.BALANCE_SERVER_PORT || 7801;
app.listen(
    port,
    () => console.log(`Balance Mock Server started on port ${port}`),
);
