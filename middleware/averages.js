const Area = require('../models/Area');

async function getAveragesByArea(req) {
 
  const averages = [];
  const areasNames = [];
  const label = `Promedios alumnos de ${req.params.age_1} a ${req.params.age_2} años.`;

  try {
    var areas = await Area.find();
    areas.forEach(area => {
      area.averages.forEach(async average => {
        if (String(average.age1) === req.params.age_1) {
          averages.push(average.value);
        }
      });
      areasNames.push(area.description);
    });
  
    return{label, averages, areasNames};
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
}

module.exports = {
  getAveragesByArea
};