const {registerSchemaStudent} = require('../config/validationJoi');
const Student = require('../models/Student');

async function validateStudent(req, res){
  try {
    
    const result = await registerSchemaStudent.validateAsync(req.body);

    var student = new Student({
      name: result.name,
      email: result.email,
      age: result.age,
    });

    await student.save();
    
    res.send(student);

  } catch (error) {
    if (error.isJoi) {
      console.log(error.message);
      return res.status(400).send(error.message);
    }
    console.log(error.message);
    res.status(500).send("Server error");
  }
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
    const students = await Student.findById(req.params.student_id);
    res.json(students);

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
}

async function editStudent(req, res) {
  result = await registerSchemaStudent.validateAsync(req.body);
  const {
    name,
    email,
    sex,
    age,
    workshops = []
  } = req.body;

  console.log(req.body );

  //Build profile object
  const studentFields = {};
  if (name) studentFields.name = name;
  if (email) studentFields.email = email;
  if (sex) studentFields.sex = sex;
  if (age) studentFields.age = age;


  if(workshops){
    studentFields.workshops = workshops;
  }

  try {
    let student = await Student.findById(req.params.student_id);

    if (student){
      //Update
      student = await Student.findOneAndUpdate(req.params.student_id, {$set: studentFields}, {new: true});
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