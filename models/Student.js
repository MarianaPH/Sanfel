const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  sex:{
    type: String,
    required: true
  },
  workshops:{
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'workshops'
   },
  questions: [
    {
      question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'questions'
      },
      value: {
        type: Number,
        min: 1,
        max: 5,
      }
    }
  ],
  averages: [
    {
      area: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      value: {
        type: Number,
        required: true
      }
    }
  ]
});

module.exports = Student = mongoose.model('student', StudentSchema);