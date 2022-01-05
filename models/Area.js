const mongoose = require('mongoose');

const AreaSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  timesAnswered: {
    type: Number
  }
});

module.exports = Area = mongoose.model('area', AreaSchema)