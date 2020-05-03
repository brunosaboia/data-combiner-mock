require('dotenv').config();

const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const app = express();

const restProxy = createProxyMiddleware({
  target: process.env.BALANCE_SERVER_URL,
  pathRewrite: {
    '^/rest': '/api',
  },
  changeOrigin: true,
});

const graphQLProxy = createProxyMiddleware({
  target: process.env.CUSTOMER_DETAILS_SERVER_URL,
  pathRewrite: {
    '^/graphql': '/',
  },
  changeOrigin: true,
});

// Rest API proxy request
app.use('/rest', restProxy);

// GraphQL proxy request
app.use('/graphql', graphQLProxy);

const port = process.env.REVERSE_PROXY_PORT || 8080;

app.listen(
    port,
    () => console.log(`Reverse proxy started on port ${port}`),
);
