const mongoose = require('mongoose')

const Userschema = new mongoose.Schema({
    name:  String, 
    email: {
        required:true,
        type :String,
        unique:true
    },
    password: {
        required:true,
        type :String
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }

    }]
    
  });

  const USchema = mongoose.model('user',Userschema)
  module.exports = USchema