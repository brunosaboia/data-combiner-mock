const express = require('express');
const {DataLoader} = require('../common-lib/dist/data-loader');
const {Sleeper} = require('../common-lib/dist/sleeper');

const app = express();
app.use(express.json());

const balances = new DataLoader('./balances.json');

app.get('/api/balances-delay', async (req, res) => {
  await balances.loadMostUpToDateData();

  const min = req.header('X-Min-Delay') || 3000;
  const max = req.header('X-Max-Delay') || 10000;

  Sleeper.sleepWithArgs(min, max).then(() => {
    res.send(balances.data);
  });
});

app.get('/api/balances', async (_req, res) => {
  await balances.loadMostUpToDateData();

  console.log('Sending balances without delay');

  res.send(balances.data);
});

const port = process.env.BALANCE_SERVER_PORT || 7801;
app.listen(
    port,
    () => console.log(`Balance Mock Server started on port ${port}`),
);
