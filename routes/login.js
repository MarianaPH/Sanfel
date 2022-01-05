const express = require("express");
const router = express.Router();

// @route          POST /home
// @description    Render login
// @access         Public
router.get("/", (req, res) => {
  res.render('login.ejs');
});

// @route          GET forms/isRegistered
// @description    Render view to validate users registration
// @access         Public
router.get("/isRegistered", (req, res) => {
  res.render('isRegister.ejs');
});

// @route          POST forms/isRegistered
// @description    Validate users registration
// @access         Public
router.post('/isRegistered', (req, res) => {
  console.log(req.body.email);
  res.json({status:'500'});
})

module.exports = router;