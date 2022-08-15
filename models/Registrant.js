const mongoose = require('mongoose');

const RegistrantSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  apellidos: {
    type:String,
    required: true
  },
  fechaNacimiento: {
    type: Date,
    required: true
  },
  edad: {
    type: Number,
    required: true
  },
  sexo:{
    type: String,
    required: true
  },
  escolaridad: {
    type: String,
    required: true
  },
  nombreTutor: {
    type: String
  },
  parentesco: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  numeroTelefonico: {
    type: String,
    required: true
  },
  pais: {
    type: String,
    required: true
  },
  colonia: {
    type: String,
  },
  alcaldia: {
    type: String,
  },
  estado: {
    type: String,
    required: true
  },
  serviciosBasicos: {
    type: [String],
  },
  situacionesRiesgo: {
    type: [String],
  },
  nivelRiesgoVivienda: {
    type: String,
    required: true
  },
  tipoVivienda: {
    type: String,
    required: true
  },
  alcance: {
    type: String,
    required: true
  },
  talleres:{
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