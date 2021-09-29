const mongoose = require('mongoose');

const AreaSchems = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  averages: [
    {
      avarage_5_to_7: {
        type: Number,
        required: true
      },
      avarage_8_to_12: {
        type: Number,
        required: true
      },
      avarage_teenager: {
        type: Number,
        required: true
      },
    }
  ],

});