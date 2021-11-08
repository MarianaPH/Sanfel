const mongoose = require('mongoose');

const SubareaSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  averages: [
    {
      range1: {
        type: Number
      },
      range2: {
        type: Number
      },
      value: {
        type: Number
      }
    }
  ]
});

module.exports = Subarea = mongoose.model('subarea', SubareaSchema)