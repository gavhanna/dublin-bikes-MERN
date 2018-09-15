const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    requried: true
  },
  favourites: {
    type: [Number],
    required: false
  }
});

module.exports = User = mongoose.model("users", UserSchema);