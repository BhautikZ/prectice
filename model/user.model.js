const mongoose = require('../config/db.connection');
const validator=require('validator');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate:[{
      validator:(value)=>validator.isAlpha(value),
      message:'do not enter number in name filed'
    },
    {
      validator: (value) => value.length <= 10,
      message: 'Username should not exceed 10 characters',
    },
  ]
    
  },
  email:{
     type:String,
     require:true,
     unique:true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Email is not valid',
    },
  },
  age: {
    type: Number,
    default: 0,
  },
  AddressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'address', // Reference to the Movie collection
    required: true,
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
  },
  password:{
    type:String,
    require:true
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;