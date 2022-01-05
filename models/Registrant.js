const mongoose = require('mongoose');

const RegistrantSchema = new mongoose.Schema({
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
    // required: true
  },
  sex:{
    type: String,
    // required: true
  },
  workshops:{
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'workshops'
   },
  questionsByArea: [
    {
      areaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'areas'
      },
      date : {
        type: Date
      },
      questions: [
        {
          questionId: {
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
    }
  ],
  averagesByArea: [
    {
      areaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'areas'
      },
      averages: [
        {
          subareaId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subareas'
          },
          value: {
            type: Number,
            required: true
          }
        }
      ]
    }
  ]
});

module.exports = Registrant = mongoose.model('registrant', RegistrantSchema);