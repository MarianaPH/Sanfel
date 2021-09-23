const jwt = require('jsonwebtoken');
const config = require('config');
const Admin = require("../models/Admin");

function auth (req, res, next) {
    //Get token from header
    const token = req.header('x-auth-token');

    //Check if not token 
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied'});
    }
1 
    //Verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.admin = decoded.admin;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid'});
    }
}

async function authAdmin(req, res){
    try{
        const admin = await Admin.findById(req.admin.id).select('-password');
        res.json(admin);
        return true;
      }catch (error){
        console.error(error.message);
        res.status(500).send('Server Error');
      }
}

module.exports = {
    auth,
    authAdmin
}