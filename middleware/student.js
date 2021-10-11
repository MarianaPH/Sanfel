const { error } = require('npmlog');
const {registerSchemaStudent, editSchemaStudent} = require('../config/validationJoi');
const Question = require('../models/Question');
const Student = require('../models/Student');
const Area = require('../models/Area');

async function validateStudent(req, res){
  try {
    
    const result = await registerSchemaStudent.validateAsync(req.body);


    const questions = result.questions;

    const averages = await Averages(questions);

    var student = new Student({
      name: result.name,
      email: result.email,
      age: result.age,
      sex: result.sex,
      workshops: result.workshops,
      questions: result.questions,
      averages: averages
    });

    await student.save();
    
    res.send(student);

  } catch (error) {
    if (error.isJoi) {
      console.log(error.message);
      return res.status(400).send(error.message);
    }
    console.log(error.message);
    console.log(error);
    res.status(500).send("Server error");
  }
}

async function Averages(questions) {
  try {
    
    let areas = await Area.find();
    var averages = [];
    
    for (let index = 0; index < areas.length; index++) {
      const questionsByArea = await identifyAreas(questions, areas[index]);
      if (questionsByArea.length){
        var average ={};
        average.area = areas[index].description;
        average.average = await calculateAverages(questionsByArea);

        averages.push(average);
      }
    }

    return averages;
  
  } catch (error) {
    console.log(error.message);
    console.log(error);
    res.status(500).send("Server error");
  }
}

async function identifyAreas(studentQuestions, area) {
  try {
    let questions = await Question.find({area: area._id}); 
    const questionsByArea = studentQuestions.filter((question) => {
      for (let index = 0; index < questions.length; index++) {
        if (question.question_id.toString() === questions[index]._id.toString()) {
          return question
        }        
      }
    });
    return questionsByArea;
  }catch (error) {
    console.log(error.message);
    console.log(error);
    res.status(500).send("Server error");
  }
}

async function calculateAverages(questionByArea) {
  const califications = questionByArea.map(cal => { return cal.calification });
  const score = califications.reduce((total, calification) => { return total + calification });
  const calification = score / califications.length;
  return calification;

}

async function getStudentsNames(req, res){
  try {

    var age1 = req.params.student_age1; 
    var age2 = req.params.student_age2; 

    const students = await Student.find({age: {$gt : age1, $lt: age2}}, {name : 1});

    res.json(students);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
}

async function getStudentById(req, res){
  try {
    const student = await Student.findById(req.params.student_id, {questions: 0});

    if(!student) return res.status(404).send('Student not found');

    res.json(student);

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
}

async function editStudent(req, res) {
  result = await editSchemaStudent.validateAsync(req.body);
  const {
    name,
    email,
    sex,
    age,
    workshops = []
  } = result;

  //Build profile object
  const studentFields = {};
  if (name) studentFields.name = result.name;
  if (email) studentFields.email = result.email;
  if (sex) studentFields.sex = result.sex;
  if (age) studentFields.age = result.age;
  if(workshops){
    studentFields.workshops = result.workshops;
  }

  try {
    let student = await Student.findById(req.params.student_id);

    if (student){
      //Update
      student = await Student.findByIdAndUpdate(req.params.student_id, {$set: studentFields}, {new: true});
    }

    res.json(student);

  } catch (error) {
    if (error.isJoi) {
      console.log(error.message);
      return res.status(400).send(error.message);
    }
    console.error(error.message);
    res.status(500).send('Server Error');
  }
}

module.exports = {
  validateStudent,
  getStudentsNames,
  getStudentById,
  editStudent
}