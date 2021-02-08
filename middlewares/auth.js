const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET

module.exports  = function (req,res,next) {
    
    const token = req.header('x-auth-token')
    if(!token) return res.status(401).send('Access denied. No token provided')

    try{
        const decoded = jwt.verify(token,jwtSecret)
        req.user = decoded
        next()
    }catch(ex){
        res.status(400).send('Invalid token.')
    }
}

