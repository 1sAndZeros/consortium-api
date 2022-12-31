const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredString = { type: String, required: true };

const betEntrySchema = new Schema(
  {
    user: [
      {
        type: Schema.Types.ObjectID,
        ref: 'User',
        required: false,
      },
    ],
    week: {
      type: Number,
      min: 0,
      max: 52,
      required: true,
    },
    gameTime: {
      type: Date,
      required: true,
    },
    match: requiredString,
    prediction: requiredString,
    typeOfBet: requiredString,
    result: requiredString,
  },
  {
    timestamps: true,
  },
);

const BetEntry = mongoose.model('BetEntry', betEntrySchema);

module.exports = BetEntry;
