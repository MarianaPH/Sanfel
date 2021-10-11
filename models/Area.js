const mongoose = require('mongoose');

const AreaSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  averages: [
    {
      range: {
        type: String,
        required: true
      },
      average: {
        type: Number
      }
    }
  ] 
});

module.exports = Area = mongoose.model('area', AreaSchema)