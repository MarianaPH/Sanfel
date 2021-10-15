const {registerSchemaStudent, editSchemaStudent} = require('../config/validationJoi');
const Question = require('../models/Question');
const Student = require('../models/Student');
const Area = require('../models/Area');

async function validateStudent(req, res){
  try {
    
    const result = await registerSchemaStudent.validateAsync(req.body);
    var student = await Student.findOne({ email: result.email });
    if (student){
      return res.status(400).json({ errors: [{ msg: "Student already exists" }] });
    }

    const questions = result.questions;
    
    const averages = await studentQuestionsAverages(questions);
    if (!averages) return res.status(501).json({ errors: [{ msg: "Por el momento no es posible realizar el registro, intentelo más tarde" }] });

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

    const areasAverage = await areasAverages();
    if (!areasAverage) return res.status(501).json({ errors: [{ msg: "Por el momento no es posible realizar el registro, intentelo más tarde" }] });


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

async function studentQuestionsAverages(questions) {
  try {
    let areas = await Area.find();

    if(!areas.length) return false;

    const averages = [];

    for (let index = 0; index < areas.length; index++) {
      const valuesByArea = await identifyAreas(questions, areas[index]);
      if (valuesByArea) {
        var average ={};
        average.area = areas[index]._id;
        average.value = calculateAverages(valuesByArea);
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
    
    if (!questions.length) return false;
    
    const questionsByArea = studentQuestions.filter((question) => {
      for (let index = 0; index < questions.length; index++) {
        if (question.question_id.toString() === questions[index]._id.toString()) {
          return question
        }        
      }
    });
    const values = questionsByArea.map(val => { return val.value });
    
    return values;
  }catch (error) {
    console.log(error.message);
    console.log(error);
    res.status(500).send("Server error");
  }
}

function calculateAverages(values) {
  if (!values.length) {
    return 0;
  }
  const score = values.reduce((total, value) => { return total + value });
  const totalValue = score / values.length;
  return totalValue;
}

async function areasAverages() {
  let areas = await Area.find();
  
  if(!areas.length) return false;
  areas.forEach(area => {
    area.averages.forEach(async average => {
      
      let students = await Student.find({age: {$gt: average.age1-1, $lt: average.age2+1}});
      var value;
      
      if (students.length) {
        const valuesByStudent = await getStudentsAverages(area._id, students);
        value = calculateAverages(valuesByStudent);
      }
      else
        value = 0;
      
      await Area.updateOne({'averages._id': average._id}, {$set: {'averages.$.value': value}});
    });
  });
  return true;
}


async function getStudentsAverages(idArea, students) {
  
  const averagesStudents = [];
  for (let index = 0; index < students.length; index++) {
    students[index].averages.forEach(average => {
      if(average.area.toString() === idArea.toString()){
        averagesStudents.push(average.value);
      }
    });
  }
  return averagesStudents;
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