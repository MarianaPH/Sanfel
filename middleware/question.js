const Question = require('../models/Question');
const { registerSchemaQuestion } = require('../config/validationJoi');

async function registerQuestion(req, res) {
  try {

    const result = await registerSchemaQuestion.validateAsync(req.body);

    question = new Question({
      text: result.text,
      area: result.area
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