const express = require("express");
const {auth} = require ('../middleware/auth');
const { validateRegister, registration, getInfo } = require("../middleware/registrant");
const router = express.Router();

// @route          POST api/registered
// @description    Register user
// @access         Public
router.post('/registerUser', (req, res) =>{
  registration(req, res);
  // console.log(req.body);
});


// @route          POST api/isRegistered
// @description    Validate if exist registrant
// @access         Public
router.post('/isRegistered/:area_id', validateRegister);

// @route          GET api/records
// @description    Render child registration form
// @access         Public
router.get("/childRegistration", (req, res) => {
  res.render('childRegistration.ejs');
});

// @route          GET api/records
// @description    Render adult registration form
// @access         Public
router.get("/adultRegistration", (req, res) => {
  res.render('adultRegistration.ejs');
});


// @route         Get records
// @description   Get all students
// @access        Private
// router.get('/info', getRegistrants);
router.get('/info', getInfo);







module.exports = router;