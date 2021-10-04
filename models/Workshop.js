const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema({
  description :{
    type: String,
    required: true
  }
});

module.exports = Workshop = mongoose.model('workshop', workshopSchema);