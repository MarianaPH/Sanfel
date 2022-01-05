const {registerSchemaRegistrant, editSchemaStudent} = require('../config/validationJoi');
const Question = require('../models/Question');
const Registrant = require('../models/Registrant');
const Area = require('../models/Area');

async function validateRegister(req, res) {
  try {
    let registrant = await Registrant.findOne(
      { email: req.body.email}
    );

    if (!registrant){
      return res.status(404).json(
        {
          msg: 'Favor de comunicarse con recepción.'
        }
      );
    } 
    var monthDifference = -1;
    for (let index = 0; index < registrant.questionsByArea.length && monthDifference === -1; index++) {
      
      if (req.params.area_id === registrant.questionsByArea[index].areaId.toString()){
        var date1 = registrant.questionsByArea[index].date;
        var date2 = new Date();
        monthDifference = monthDiff(date1, date2)
      }
      
    }
    if (monthDifference === -1) 
      monthDifference = 6;
    
    if (monthDifference >= 6) {
      
      return res.status(200).json(
        {
          msg : 'Succesful validation.'
        }
      );
    }
    else {
      return res.status(403).json(
        {
          msg : 'No puedes contestar dos veces el mismo cuestionario en tan poco tiempo.'
        }
      );
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
}

async function registration(req, res) {
  try {
    const result = await registerSchemaRegistrant.validateAsync(req.body);

    var registrant = await Registrant.findOne(
      { email: result.email }
    );

    if (registrant) return res.status(400).json(
      { errors: 
        [
          { msg: "El registrante ya existe" }
        ]
      }
    );

    var registrant = new Registrant({
      name: result.name,
      email: result.email,
      // age: result.age,
      // sex: result.sex,
      // workshops: result.workshops,
      // questions: result.questions,
      // averages: averages
    });

    await registrant.save();

    res.send(registrant);
  } catch (error) {
    if (error.isJoi) {
      console.log(error.message);
      return res.status(400).send(error.message);
    }
    console.log(error.message);
    res.status(500).send("Server error");
  }
}

function monthDiff(d1, d2) {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}

module.exports = {
  validateRegister,
  registration
}