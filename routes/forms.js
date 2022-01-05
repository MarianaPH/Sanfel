const express = require("express");
const router = express.Router();
const { saveAnswers } = require("../middleware/forms");

// @route          GET form/intelMulti
// @description    Show form intelMulti
// @access         Public
router.get("/intelMulti", (req, res) => {
  res.render('forms/intelMulti.ejs');
});

// @route          GET form/ninosResilientes
// @description    Show form niños resilientes
// @access         Public
router.get("/ninosResilientes", (req, res) => {
  res.render('forms/NiñosResilientes.ejs');
});

// @route          GET form/lideresComunitarios
// @description    Show form lideres comunitarios
// @access         Public
router.get("/lideresComunitarios", (req, res) => {
  res.render('forms/lideresComunitarios.ejs');
});

// @route          GET form/lideresComunitarios
// @description    Show form lideres comunitarios
// @access         Public
router.get("/crianzaPositiva", (req, res) => {
  res.render('forms/crianzaPositiva.ejs');
});


// @route          POST api/registrant/:area_id
// @description    Save answers 
// @access         Public
router.post('/:area_id', saveAnswers);

module.exports = router;