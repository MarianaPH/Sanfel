const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require("config");

const { registerSchemaUser, loginSchemaUser } = require("../config/validationJoi");

const User = require('../models/User');

async function validationUser(req, res){
  const { password } = req.body;
  const validate = req.header('Req-Type');
  try {
    
    if (validate === 'login') {
      const result = await loginSchemaUser.validateAsync(req.body);
      //See if user exists
      var user = await User.findOne(
        { email: result.email }
      );

      if (user){
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(404).json(
            { 
              msg: "Datos invalidos. Por favor, inténtelo de nuevo" 
            }
          );
        }
      }
      else{
        return res.status(404).json(
          {
             msg: "Datos invalidos. Por favor, inténtelo de nuevo" 
          }
        );
      }      
    }
    else{
      const result = await registerSchemaUser.validateAsync(req.body);
      //See if user exists
      var user = await User.findOne(
        { email: result.email }
      );
      if(!user){
        user = new User({
        name: result.name,
        email: result.email,
        password: result.password,
        role: result.role
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
      }
      else{
        return res.status(400).json(
          { 
            errors: [
              { 
                msg: "User already exists" 
              }
            ] 
          }
        );
      }
    }
    
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 3600 },
      (error, token) => {
        if (error) throw error;
        return res.json(
          {
            token : token
          }
        );
      }
    );
  } catch (error) {
    if (error.isJoi) {
      console.log(error.message);
      return res.status(404).send(error.message);
    }
    console.log(error.message);
    console.log(error);
    res.status(500).send("Server error");
  }
}

module.exports = {
  validationUser
}