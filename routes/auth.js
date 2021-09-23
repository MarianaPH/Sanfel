const express = require("express");
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const router = express.Router();
const {validateAdmin} = require("../middleware/admin");
const {auth, authAdmin} = require ('../middleware/auth');

//@route      POST api/admin
//@desc       Register admin
//access      Private
router.post("/register-admin", validateAdmin);

//@route      POST api/admin
//@desc       Load Admin 
//access      Public
router.get('/', auth, authAdmin);

//@route      POST api/admin
//@desc       Authenticate user & get token
//access      Public


module.exports = router;