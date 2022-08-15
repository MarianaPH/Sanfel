const Area = require('../models/Area');
const { registerSchemaArea } = require('../config/validationJoi');

async function registerArea(req, res) {
  try {

    const result = await registerSchemaArea.validateAsync(req.body);
    var area = await Area.findOne(
      { description: result.description }
    );

    if (area){
      return res.status(400).json(
        { errors: 
          [
            { msg: "Area already exists" }
          ]
        }
      );
    }

    area = new Area({
      description: result.description
    });
    await area.save();

    res.send(area);
    
  } catch (error) {
    if (error.isJoi) {
      console.log(error.message);
      return res.status(400).send(error.message);
    }
    console.log(error.message);
    res.status(500).send("Server error");
  }
}

async function getInfoForms(req, res) {
  
  const forms = await Area.find({}, {description: 1, timesAnswered: 1});
  res.json({
    forms: forms,
    status: 200
  });
  console.log(forms);
}

module.exports = {
  registerArea,
  getInfoForms
}