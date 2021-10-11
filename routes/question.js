const express = require('express');
const router = express.Router();

const {registerQuestion} = require("../middleware/question");
const {auth} = require ('../middleware/auth');

//@route      POST api/workshop
//@desc       Register workshop
//access      Private
router.post('/', auth, registerQuestion);

module.exports = router;