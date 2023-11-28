const mongoose = require('../config/db.connection');

const imageSchema = new mongoose.Schema({
  image1: {
    type: String,
  },
  image2: {
    type: String,
  },
  image3: {
    type: String,
  },
  image4: {
    type: String,
  },
  image5: {
    type: String,
  }
});

const Images = mongoose.model("images", imageSchema);

module.exports = Images;