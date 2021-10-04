const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require("config");

const { registerSchemaAdmin, loginSchemaAdmin } = require("../config/validationJoi");

const Admin = require('../models/Admin');


async function validationAdmin(req, res){
  try {
    const { password } = req.body;
    const validate = req.header('Req-Type');
    if (validate === 'login') {
      const result = await loginSchemaAdmin.validateAsync(req.body);
    
      //See if user exists
      var admin = await Admin.findOne({ email: result.email });
      if (admin){
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
          return res.status(400).json({ errors: [{ msg: "Invalid Credential" }] });
        }
      }
      else{
        return res.status(400).json({ errors: [{ msg: "Invalid Credential" }] });
      }      
    }
    else{
      const result = await registerSchemaAdmin.validateAsync(req.body);
      //See if user exists
      var admin = await Admin.findOne({ email: result.email });
      if(!admin){
        admin = new Admin({
        name: result.name,
        email: result.email,
        password: result.password,
        });

        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(password, salt);
        await admin.save();
      }
      else{
        return res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }
    }
    
    const payload = {
      admin: {
        id: admin.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 3600 },
      (error, token) => {
        if (error) throw error;
        return res.json({token});
      }
    );
  } catch (error) {
    if (error.isJoi) {
      console.log(error.message);
      return res.status(400).send(error.message);
    }
    console.log(error.message);
    res.status(500).send("Server error");
  }
}

module.exports = {
  validationAdmin
}