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
    // required: true
  },
  workshops:{
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'workshops'
   },
  questions: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'questions'
      },
      calification: {
        type: Number,
        min: 1,
        max: 5,
      }
    }
  ]
});

module.exports = Student = mongoose.model('student', StudentSchema);