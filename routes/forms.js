const express = require("express");
const { auth } = require("../middleware/auth");
const router = express.Router();
const { saveAnswers } = require("../middleware/forms");

// @route          POST api/registrant/:area_id
// @description    Save answers 
// @access         Public
router.post('/:area_id', saveAnswers);

//functional forms

// @route          GET form/intelMulti
// @description    Render form intelMulti
// @access         Public
router.get("/intelMulti", (req, res) => {
  res.render('forms/intelMulti.ejs');
});

// @route          GET form/ninosResilientes
// @description    Render form niños resilientes
// @access         Public
router.get("/ninosResilientes", (req, res) => {
  res.render('forms/NiñosResilientes.ejs');
});

// @route          GET form/lideresComunitarios
// @description    Render form lideres comunitarios
// @access         Public
router.get("/lideresComunitarios", (req, res) => {
  res.render('forms/lideresComunitarios.ejs');
});

// @route          GET form/crianzaPositiva
// @description    Render form crianzaPositiva
// @access         Public
router.get("/crianzaPositiva", (req, res) => {
  res.render('forms/crianzaPositiva.ejs');
});

//////////////////////
//non functional forms
/////////////////////}/

// @route          GET non-functional-form/intelMulti
// @description    Render form intelMult
// @access         Public
router.get("/nonfunctional-intelMulti", (req, res) => {
  res.render('intelMultiN.ejs');
});

// @route          GET form/ninosResilientes
// @description    Render form niños resilientes
// @access         Public
router.get("/nonfunctional-ninosResilientes", (req, res) => {
  res.render('NiñosResilientesN.ejs');
});

// @route          GET form/lideresComunitarios
// @description    Render form lideres comunitarios
// @access         Public
router.get("/nonfunctional-lideresComunitarios", (req, res) => {
  res.render('lideresComunitariosN.ejs');
});

// @route          GET form/crianzaPositiva
// @description    Render form crianzaPositiva
// @access         Public
router.get("/nonfunctional-crianzaPositiva", (req, res) => {
  res.render('crianzaPositivaN.ejs');
});

module.exports = router;