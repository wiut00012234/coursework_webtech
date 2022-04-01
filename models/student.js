const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  level:{
      type:Number,
      required: true
  },
  major:{
      type: String,
      required: true
  },
  hobby:{
      type: String,
      required: true
  },
  viewAboutUniversity:{
      type: String,
      required: true
  },
  contractStatus:{
      type: Boolean,
      required: true
  }
});



module.exports = mongoose.model('Student', userSchema);
