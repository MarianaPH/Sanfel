const express = require("express");
const router = express.Router();
const {auth, authAdmin} = require ('../middleware/auth');
const {validationAdmin} = require('../middleware/admin');


//@route      POST api/admin
//@desc       Load Admin 
//access      Private
router.get('/', auth, authAdmin);

//@route      POST api/admin
//@desc       Authenticate user & get token
//access      Public
router.post('/', validationAdmin);


module.exports = router;