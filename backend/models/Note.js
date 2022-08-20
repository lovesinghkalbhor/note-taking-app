const mongoose = require('mongoose')

const Noteschema = new mongoose.Schema({
    user:mongoose.Schema.Types.ObjectId,
    title:  String, 
    discreption: String,
  });

  const Notesch = mongoose.model('notedata',Noteschema)
  module.exports = Notesch