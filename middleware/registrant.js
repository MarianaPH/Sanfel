const {registerSchemaRegistrant, editSchemaStudent} = require('../config/validationJoi');
const xlsx = require('xlsx');
const path = require('path');
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

async function getRegistrants(){
  try {

    const registrant = await Registrant.find({}, {name : 1, email: 1});

    console.log(registrant)
    return registrant;

  } catch (error) {
    console.error(error.message);
    let status = 500;
    return status;
  }
}

async function getInfo() {
  const workSheetColumnName = [
    "Id",
    "Name",
    "Email"
  ]
  const users = await getRegistrants();
  const workSheetName = 'Users';
  const date = new Date();
  const filePath = './Files/excel-from-' + date + '.xlsx';


  exportUsersToExcel(users, workSheetColumnName, workSheetName, filePath);
}

function exportUsersToExcel(users, workSheetColumnNames, workSheetName, filePath) {
  const data = users.map(user => {
    return [user.id, user.name, user.email];
  });
  exportExcel(data, workSheetColumnNames, workSheetName, filePath);
}

function exportExcel(data, workSheetColumnNames, workSheetName, filePath) {
  const workBook = xlsx.utils.book_new();
    const workSheetData = [
        workSheetColumnNames,
        ... data
    ];
    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
    xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
    xlsx.writeFile(workBook, path.resolve(filePath));
}


module.exports = {
  validateRegister,
  registration,
  getRegistrants,
  getInfo
}