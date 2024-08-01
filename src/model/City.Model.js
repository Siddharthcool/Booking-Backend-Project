const mongoose = require("mongoose");

// schema is the blueprint of model
const CitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cuisines: {
    type: [String],
    required: true,
  },
});


var CityModel = mongoose.model("cities", CitySchema);


module.exports = CityModel;
