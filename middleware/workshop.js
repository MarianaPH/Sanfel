
const Workshop = require('../models/Workshop');

async function registerWorkshop(req, res) {
  try {
    const {description} = req.body;
    workshop = new Workshop({
      description
    });
    await workshop.save();
    res.send(workshop);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
}

module.exports = {
  registerWorkshop
}