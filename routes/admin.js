const express = require("express");
const router = express.Router();
const {validationAdmin} = require("../middleware/admin");
const {auth} = require ('../middleware/auth');

//@route      POST api/admin
//@desc       Register admin
//access      Private
router.post("/", auth, validationAdmin);


module.exports = router;

