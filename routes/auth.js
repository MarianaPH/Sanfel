const express = require("express");
const router = express.Router();
const {auth, authUser} = require ('../middleware/auth');
const {validationUser} = require('../middleware/admin');

//@route      POST api/admin
//@desc       Load Admin 
//access      Private
router.get('/auth', auth, authUser,);

//@route      GET api/admin
//@desc       Render index 
//access      Private
router.get("/dashboard", (req, res) => {
  res.render('index.ejs');
});


//@route      POST api/admin
//@desc       Authenticate user & get token
//access      Public
router.post('/validate', validationUser);


module.exports = router;