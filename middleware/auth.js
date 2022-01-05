const jwt = require('jsonwebtoken');
const config = require('config');
const User = require("../models/User");
const res = require('express/lib/response');

function auth (req, res, next) {
  // var status={};
  //Get token from header
  const token = req.header('x-auth-token');

  //Check if not token 
  if (!token) {
    // status.status = 401;
    return res.status(401).send('Token is not valid');
    // return status;
  }
  //Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // status.status = 200;
    req.user = decoded.user;
    // return status;
    next();
  } catch (error) {
    // status.status = 401;
    console.log(error);
    // return status;
    res.status(401).send('Token is not valid');
  }
}

async function authUser(req, res){
  // var status = {}
  try{
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  }catch (error){
    console.error(error.message);
    // return status.status = 500;
    res.status(500).send('Server Error');
  }
}

const authPage = permissions => {
  return async (req, res, next) =>{
    const userRole = await User.findById(req.user.id);
    if (permissions.includes(userRole.role)) {
      next();
    }
    else {
      res.status(401).send('Authorization denied');
    }
  }
}

 

module.exports = {
  auth,
  authUser,
  authPage
}