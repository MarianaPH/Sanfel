const express = require('express');
const router = express.Router();

const {registerArea} = require("../middleware/area");
const {auth} = require ('../middleware/auth');

//@route      POST api/workshop
//@desc       Register workshop
//access      Private
router.post('/', auth, registerArea);

module.exports = router;