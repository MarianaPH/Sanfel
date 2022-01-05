const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  subarea: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subareas'
  },
  area: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'areas',
    required: true
  },
  factorResiliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'subareas',
  },
  competenciasAsociadas: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'subareas',
  },
  dominiosInteligencias: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'subareas',
  }
});

module.exports = Question = mongoose.model('question', QuestionSchema);