const mongoose = require('../config/db.connection');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: 0,
  },
  gender:{
    type:String,
    require:true
  },
  hobbies:{
    type:Array,
    require:true
  },
  score:{
    type:Array,
    require:true
  },
  userImage:{
    type:String,
    require:true
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;