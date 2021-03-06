const {registerSchemaWorkshop} = require('../config/validationJoi');
const Workshop = require('../models/Workshop');

async function registerWorkshop(req, res) {
  try {

    const result = await registerSchemaWorkshop.validateAsync(req.body);
    var workshop;
    
    workshop = new Workshop({
      description: result.description,
      online: result.online
    });

    await workshop.save();

    res.send(workshop);
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
  registerWorkshop
}