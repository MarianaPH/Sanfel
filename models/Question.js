const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  }
});

module.exports = Question = mongoose.model('question', QuestionSchema);