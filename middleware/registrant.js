const {registerSchemaRegistrant, editSchemaStudent} = require('../config/validationJoi');
const xlsx = require('xlsx');
const path = require('path');
const Workshop = require('../models/Workshop');
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
    // console.log(req.body);
    const result = await registerSchemaRegistrant.validateAsync(req.body);

    var registrant = await Registrant.findOne(
      { email: result.email }
    );

    if (registrant) return res.status(400).json(
      { errors: 
        [
          { msg: "El usuario ya existe" }
        ]
      }
    );

    const values = validateLivingPlace(result);
    console.log(result);

    var registrant = new Registrant({
      nombre: result.nombre,
      apellidos: result.apellidos,
      fechaNacimiento: result.fechaNacimiento,
      edad: result.edad,
      sexo: result.sexo,
      curp: result.curp,
      escolaridad: result.escolaridad,
      nombreTutor: result.nombreTutor,
      parentesco: result.parentesco,
      email:result.email,
      numeroTelefonico: result.numeroTelefonico,
      pais: values.pais,
      colonia: values.colonia,
      alcaldia: values.alcaldia,
      estado: values.estado,
      talleres: values.talleres,
      alcance: result.alcance,
      serviciosBasicos: values.serviciosBasicos,
      situacionesRiesgo: values.situacionesRiesgo,
      nivelRiesgoVivienda: result.nivelRiesgoVivienda,
      tipoVivienda: result.tipoVivienda
    });

    await registrant.save();

    res.json({
      msg: 'Usuario: ' + registrant.nombre + '' + registrant.apellidos + ', registrado correctamente.'
    })

  } catch (error) {
    if (error.isJoi) {
      console.log(error.message);
      return res.status(400).json({
        msg: error.message
      })
    }
    console.log(error.message);
    res.status(500).json({
      msg: 'Error en el servidor'
    })
  }
}

function validateLivingPlace(result) {
  (result.talleres) ? talleres = result.talleres : talleres = null;

  (result.serviciosBasicos) ? serviciosBasicos = result.serviciosBasicos : serviciosBasicos = null;

  (result.situacionesRiesgo) ? situacionesRiesgo = result.situacionesRiesgo : situacionesRiesgo = null;

  if (result.pais[0] == 'México') {
    pais = result.pais[0];
    colonia = result.colonia;
    alcaldia = result.alcaldia;
    estado = result.estado[0]
  }else{
    pais = result.pais[1];
    estado = result.estado[1]
    colonia = '';
    alcaldia = '';
  }
  
  return {
    talleres: talleres,
    serviciosBasicos: serviciosBasicos,
    situacionesRiesgo: situacionesRiesgo,
    pais: pais,
    colonia: colonia,
    alcaldia: alcaldia,
    estado: estado
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
  const registrants = [
    [],
    [],
    [],
    []
  ]
  try {
    const registrant = await Registrant.find({},
      {
        nombre : 1, apellidos: 1,  email: 1, sexo: 1, edad: 1, talleres: 1
      }
    );

    registrant.map(user => {
      if (user.edad <= 7) {
        registrants[0].push(user);
      }
      else if (user.edad > 7 && user.edad < 13 ) {
        registrants[1].push(user);
      }
      else if (user.edad > 12 && user.edad < 18 ) {
        registrants[2].push(user);
      }
      else {
        registrants[3].push(user);
      }
    });


    return registrants;

  } catch (error) {
    console.error(error.message);
    let status = 500;
    return status;
  }
}

async function getInfo(req, res) {
  var status;

  const workshops = await Workshop.find();

  const workSheetColumnName = [
    "Id",
    "Name",
    "Email",
    "Edad",
    "Sexo",
    "Talleres"
  ]
  const users = await getRegistrants();
  const workSheetNames =['5 a 7', '8 a 12', '13 a 17', '18+']
  const date = new Date();
  const filePath = './Files/excel-from-' + date + '.xlsx';

  status = exportUsersToExcel(users, workSheetColumnName, workSheetNames, filePath, workshops);

  if (status === 200) {
    return res.json(
      {
        msg: 'Descarga exitosa'
      }
    )
  }
  else {
    return res.status(500).send(
      {
        msg: "Error al descargar"
      }
    );
  }
}

function exportUsersToExcel(users, workSheetColumnNames, workSheetNames, filePath, workshops) {
  var status;
  const allData = []
  for (let index = 0; index < users.length; index++) {
    const data = users[index].map(registrant =>{  

      talleres = [];

      for (let i = 0; registrant.talleres && i < registrant.talleres.length; i++) {
        workshops.forEach(workshop => {
          if (registrant.talleres[i].toString() === workshop._id.toString()) {
            if (workshop.online) {
              talleres.push(workshop.description + ' (' + 'online' + ')');
            }
            else{
              talleres.push(workshop.description + ' (' + 'presencial' + ')');
            }
          } 
        });
      }

      return [
        registrant.id, 
        registrant.nombre + ' ' +registrant.apellidos, 
        registrant.email, 
        registrant.edad, 
        registrant.sexo, 
        [talleres]
      ];
    });
    allData.push(data);
  }
  status = exportExcel(allData, workSheetColumnNames, workSheetNames, filePath);

  return status;
}

function exportExcel(allData, workSheetColumnNames, workSheetNames, filePath) {
  var status;
  const workBook = xlsx.utils.book_new();

  try {
    for (let index = 0; index < allData.length; index++) {
      const workSheetData = [
        workSheetColumnNames,
        ... allData[index]
      ];
      const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
      xlsx.utils.book_append_sheet(workBook, workSheet, workSheetNames[index]);
    }
    xlsx.writeFile(workBook, path.resolve(filePath));
    return status = 200;

  } catch (error) {
    console.log(error);
    return status = 500;
  }
}




module.exports = {
  validateRegister,
  registration,
  getRegistrants,
  getInfo
}