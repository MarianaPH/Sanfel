const express = require('express');
const router = express.Router();
const { getInfoForms  } = require("../middleware/area");


const {registerArea} = require("../middleware/area");
const {auth} = require ('../middleware/auth');

//@route      POST api/workshop
//@desc       Register workshop
//access      Private
router.post('/', auth, registerArea);

// @route         Get infoForms
// @description   Get info form
// @access        Private
router.get('/infoForms', getInfoForms);

module.exports = router;