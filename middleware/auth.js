const jwt = require('jsonwebtoken');
const config = require('config');
const User = require("../models/User");

function auth (req, res, next) {
    //Get token from header
    const token = req.header('x-auth-token');

    //Check if not token 
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied'});
    }
    //Verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid'});
    }
}

async function authUser(req, res){
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
        return true;
      }catch (error){
        console.error(error.message);
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