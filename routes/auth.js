const express = require("express");
const router = express.Router();
const {validationAdmin} = require("../middleware/admin");
const {auth, authAdmin} = require ('../middleware/auth');

//@route      POST api/admin
//@desc       Register admin
//access      Private
router.post("/register-admin", auth, validationAdmin);

//@route      POST api/admin
//@desc       Load Admin 
//access      Public
router.get('/', auth, authAdmin);

//@route      POST api/admin
//@desc       Authenticate user & get token
//access      Public
router.post('/', validationAdmin);


module.exports = router;