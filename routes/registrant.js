const express = require("express");
const {auth} = require ('../middleware/auth');
const { validateRegister, registration  } = require("../middleware/registrant");
const router = express.Router();

// @route          POST api/registered
// @description    Register user
// @access         Public
router.post('/register', auth,registration );


// @route          POST api/registered
// @description    Validate if exist registrant
// @access         Public
router.post('/isRegistered/:area_id', validateRegister);

module.exports = router;