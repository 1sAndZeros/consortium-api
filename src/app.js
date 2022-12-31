const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const authMiddlewares = require('./auth/middlewares')
const api = require('./api');
const auth = require('./auth');

const app = express();

app.use(morgan('common'));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  }),
);
app.use(express.json());
app.use(authMiddlewares.checkTokenSetUser);

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
    user: req.user,
  });
});

app.use('/api/v1/', api);
app.use('/auth', auth);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
