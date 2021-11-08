const express = require("express");
const router = express.Router();
const {validationUser} = require("../middleware/admin");
const {auth, authPage} = require ('../middleware/auth');

//@route      POST api/admin
//@desc       Register admin
//access      Private
router.post("/", auth, authPage(["admin"]), validationUser);


module.exports = router;

