require('dotenv').config();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const pubKey = fs.readFileSync('public.pem');

module.exports = (req, res, next) => {

    try {
        const token =  req.headers['authorization']?.split(' ')[1];
        
        req.authUser = jwt.verify(token, pubKey);
        console.log('Token authorized!');

    } catch (error) {
        console.log(error.message);
        return res.status(401).json({
            msg: 'You are not authorized',
            error: error.message
        });
    }

    next();
}