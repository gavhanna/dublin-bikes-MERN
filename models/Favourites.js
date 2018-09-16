const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const FavouritesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  locations: {
    type: [Number]
  }
});

module.exports = Favourites = mongoose.model("favourites", FavouritesSchema);