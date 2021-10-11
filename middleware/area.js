const Area = require('../models/Area');
const { registerSchemaArea } = require('../config/validationJoi');

async function registerArea(req, res) {
  try {

    const result = await registerSchemaArea.validateAsync(req.body);
    

    area = new Area({
      description: result.description,
      averages: result.averages
    });
    console.log(area);
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

module.exports = {
  registerArea
}