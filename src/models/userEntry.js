const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredString = { type: String, required: true };

const userEntrySchema = new Schema(
  {
    email: requiredString,
    password: requiredString,
    name: requiredString,
    favouriteTeam: String,
    avatar: String,
    currentLeague: String,
    bets: [
      {
        type: Schema.Types.ObjectID,
        ref: 'Bet',
      },
    ],
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', userEntrySchema);

module.exports = User;
