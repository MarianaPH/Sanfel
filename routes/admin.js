const express = require("express");
const router = express.Router();
const {validationUser, getDashboardInfo} = require("../middleware/admin");
const {auth, authPage} = require ('../middleware/auth');

//@route      POST api/admin
//@desc       Register admin
//access      Private
router.post("/", auth, authPage(["admin"]), validationUser);

//@route      GET api/admin/records
//@desc       Render records
//access      Private
router.get("/dashboard", (req, res) => {
  res.render('index.ejs');
})

//@route      GET api/admin/records
//@desc       Render records
//access      Private
router.get("/dashboardInfo", (req, res) => {
  console.log("infoDashboard");
  var data = getDashboardInfo();
  res.send(data);
})





module.exports = router;

