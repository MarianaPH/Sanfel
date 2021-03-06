const Registrant = require('../models/Registrant');
const Area = require('../models/Area');
const Question = require('../models/Question');
const mongoose = require('mongoose');
const { findById } = require('../models/Area');

async function saveAnswers(req, res) {
  const answer = {};
  answer.areaId = mongoose.Types.ObjectId(req.params.area_id);
  answer.questions = req.body.data;
  answer.date = new Date();

  try {
    let isRegistered = await Registrant.findOne(
      {email: req.body.email}
    );
    
    isRegistered.questionsByArea.forEach( async form =>  {
      //search for previous answered form  
      if (form.areaId.toString() === req.params.area_id) {
        //delete previous form
        await Registrant.findOneAndUpdate(
          {email: req.body.email}, 
          {$pull: {questionsByArea :{areaId : answer.areaId}}}, 
          {new: true}
        );
      }
    });
    
    let registrant = await Registrant.findOneAndUpdate(
      {email: req.body.email}, 
      {
        $push: {
          questionsByArea :{
            areaId : answer.areaId, questions: answer.questions, date: answer.date
          }
        }
      },
      {new: true}
    );
    
    sumTimesAnswered(answer.areaId);
    
    res.json({ msg : 'Cuestionario contestado exitosamente.' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
}

async function sumTimesAnswered(areaId) {
  let area = await Area.findById( areaId );
  
  sumTA = area.timesAnswered + 1;
  console.log(sumTA);
  let areaTA = await Area.findOneAndUpdate(
    {_id: areaId},
    {timesAnswered: sumTA },
    {new: true}
  )
  console.log(areaTA);
}

module.exports ={
  saveAnswers
}
