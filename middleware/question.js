const Question = require('../models/Question');
const { registerSchemaQuestion } = require('../config/validationJoi');

async function registerQuestion(req, res) {
  try {

    const result = await registerSchemaQuestion.validateAsync(req.body);
    var question = await Question.findOne(
      { text: result.text }
    );

    if (question){
      return res.status(400).json(
        { errors: 
          [
            { msg: "Question already exists" }
          ]
        }
      );
    }

    question = new Question({
      text: result.text,
      subarea: result.subarea,
      area: result.area,
      factorResiliente: result.factorResiliente,
      competenciasAsociadas: result.competenciasAsociadas,
      dominiosInteligencias: result.dominiosInteligencias
    });

    await question.save();

    res.send(question);
  } catch (error) {
    if (error.isJoi) {
      console.log(error.message);
      return res.status(400).send(error.message);
    }
    console.log(error.message);
    res.status(500).send("Server error");
  }
}

module.exports = {
  registerQuestion
}