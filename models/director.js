const mongoose = require("mongoose");

const directorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
  // You can add more fields for directors, such as birthdate, bio, etc.
});

module.exports = mongoose.model("Director", directorSchema);
