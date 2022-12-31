const express = require('express');

const bets = require('./bets');
const countries = require('./countries');
const fixtures = require('./fixtures');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/bets', bets);
router.use('/countries', countries);
router.use('/fixtures', fixtures);

module.exports = router;
