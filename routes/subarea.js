const express = require('express');
const router = express.Router();

const {registerSubarea} = require("../middleware/subarea");
const {auth} = require ('../middleware/auth');

//@route      POST api/subarea
//@desc       Register subarea
//access      Private
router.post('/', auth, registerSubarea);

module.exports = router;