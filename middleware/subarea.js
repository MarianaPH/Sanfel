const Subarea = require('../models/Subarea');
const { registerSchemaSubarea } = require('../config/validationJoi');

async function registerSubarea(req, res) {
  try {

    const result = await registerSchemaSubarea.validateAsync(req.body);
    var subarea = await Subarea.findOne(
      { description: result.description }
    );

    if (subarea){
      return res.status(400).json(
        { errors: 
          [
            { msg: "Subarea already exists" }
          ]
        }
      );
    }

    subarea = new Subarea({
      description: result.description
    });
    await subarea.save();

    res.send(subarea);
    
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
  registerSubarea
}