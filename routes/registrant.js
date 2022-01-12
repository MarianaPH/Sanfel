const express = require("express");
const {auth} = require ('../middleware/auth');
const { validateRegister, registration, getInfo  } = require("../middleware/registrant");
const router = express.Router();

// @route          POST api/registered
// @description    Register user
// @access         Public
router.post('/register', auth,registration );


// @route          POST api/isRegistered
// @description    Validate if exist registrant
// @access         Public
router.post('/isRegistered/:area_id', validateRegister);

// @route          GET api/records
// @description    Render form intelMulti
// @access         Public
router.get("/records", (req, res) => {
  res.render('records.ejs');
});

// @route         Get records
// @description   Get all students
// @access        Private

// router.get('/info', getRegistrants);
router.get('/info', (req, res) => {
  getInfo();
  res.json('info');
  console.log('info');
});



module.exports = router;