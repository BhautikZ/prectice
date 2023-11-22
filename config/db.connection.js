const mongoose = require("mongoose");
require('dotenv').config();
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("successfuly");
  })
  .catch((error) => {
    console.log(error);
  });
module.exports = mongoose;
