const axios = require('axios');

const { Router } = require('express');

const router = Router();

router.get('/', async (req, res, next) => {
  const activeleagueIDs = [
    1, 2, 3, 39, 40, 41, 42, 43, 45, 48, 50, 51, 61, 78, 88, 94, 135, 140, 144,
    179, 180, 183, 184, 253,
  ];

  try {
    const options = {
      method: 'GET',
      url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures?season=2022&league=39',
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
