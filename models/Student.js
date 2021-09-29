const { string } = require('joi');
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
  workshops:[
    {
      workshop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'workshops'
      },
      description:{
        type: String,
        required: true
      } 
    }
  ],
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
        required: true
      }
    }
  ]
});

module.exports = Student = mongoose.model('student', StudentSchema);