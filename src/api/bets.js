const { Router } = require('express');

const BetEntry = require('../models/betEntry');

const router = Router();

// READ ALL
router.get('/', async (req, res, next) => {
  try {
    const betEntries = await BetEntry.find();
    res.json(betEntries);
  } catch (error) {
    next(error);
  }
});

// READ ONE
router.get('/:id', async (req, res, next) => {
  try {
    const betEntry = await BetEntry.findOne({ _id: req.params.id });
    res.json(betEntry);
  } catch (error) {
    next(error);
  }
});

// CREATE ONE
router.post('/', async (req, res, next) => {
  try {
    const betEntry = new BetEntry(req.body);
    const createdEntry = await betEntry.save();
    res.json(createdEntry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

// UPDATE ONE
router.put('/:id', async (req, res, next) => {
  try {
    const betEntry = await BetEntry.updateOne({ _id: req.params.id }, req.body);
    res.json(betEntry);
  } catch (error) {
    next(error);
  }
});

// DELETE ONE
router.delete('/:id', async (req, res, next) => {
  try {
    const betEntry = await BetEntry.deleteOne({ _id: req.params.id });
    res.json(betEntry);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
