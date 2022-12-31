const axios = require('axios');

const { Router } = require('express');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://api-football-v1.p.rapidapi.com/v3/countries',
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
      },
    };
    const { data } = await axios.request(options);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
