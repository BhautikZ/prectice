const mongoose = require('../config/db.connection');

const addressSchema = new mongoose.Schema({
  userfullAddress: {
    type: String,
    required: true,
  },
  userId:{
    type:Number,
    require:true
  }
});

const Address = mongoose.model("address", addressSchema);

module.exports = Address;