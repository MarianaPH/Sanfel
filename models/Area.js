const mongoose = require('mongoose');

const AreaSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  averages: [
    {
      age1: {
        type: Number,
        required: true
      },
      age2: {
        type: Number,
        required: true
      },
      value: {
        type: Number
      }
    }
  ] 
});

module.exports = Area = mongoose.model('area', AreaSchema)