const { JsonResponse } = require("../lib/apiResponse");
const {MSG_TYPES} = require("../constant/types")
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET

const ROLES = {
  SUPER_ADMIN: "superAdmin",
  ADMIN: "admin",
  USER:"user"
}

const Auth  = (req,res,next)  => {
    const token = req.header('x-auth-token');
    if(!token) return JsonResponse(res, 401, MSG_TYPES.ACCESS_DENIED);

    try{
        const decoded = jwt.verify(token,jwtSecret)
        req.user = decoded
        next()
    }catch(ex){
        if(ex.name === "TokenExpiredError"){
            return JsonResponse(res, 403, MSG_TYPES.SESSION_EXPIRED)
        }
        res.status(400).send('Invalid token.')
    }
}

const hasRole = (role) => {
    return async( req, res, next) => {
        const userRole = req.user.role
        if(role != userRole){
            return JsonResponse(res, 400, MSG_TYPES.PERMISSION)
        }
        next()
    }
}

module.exports = {
    Auth,
    hasRole
}