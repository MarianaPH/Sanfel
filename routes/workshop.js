const express = require("express");
const router = express.Router();
const {registerWorkshop} = require("../middleware/workshop");
const {auth} = require ('../middleware/auth');

//@route      POST api/workshop
//@desc       Register workshop
//access      Private
router.post('/', auth, registerWorkshop);

module.exports = router;