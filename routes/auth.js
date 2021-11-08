const express = require("express");
const router = express.Router();
const {auth, authUser} = require ('../middleware/auth');
const {validationUser} = require('../middleware/admin');


//@route      POST api/admin
//@desc       Load Admin 
//access      Private
router.get('/', auth, authUser);

//@route      POST api/admin
//@desc       Authenticate user & get token
//access      Public
router.post('/', validationUser);


module.exports = router;