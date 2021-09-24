const express = require("express");
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const router = express.Router();
const {registrationAdmin} = require("../middleware/admin");
const {auth, authAdmin} = require ('../middleware/auth');

//@route      POST api/admin
//@desc       Register admin
//access      Private
router.post("/register-admin", registrationAdmin);

//@route      POST api/admin
//@desc       Load Admin 
//access      Public
router.get('/', auth, authAdmin);

//@route      POST api/admin
//@desc       Authenticate user & get token
//access      Public
router.post('/', registrationAdmin);


module.exports = router;