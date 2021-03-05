const AuthService = require('../services/auth');
const { MSG_TYPES } = require('../constant/types');
const { validateVerifyUser, validateLogin, validateResendOTP, validatePasswordChange } = require('../request/user');
const { JsonResponse } = require('../lib/apiResponse');
const User = require('../models/user');

exports.login = async(req, res) => {
    try{   
        const { error } = validateLogin(req.body)
        if(error) return JsonResponse(res, 400, error.details[0].message)

        let token = await AuthService.login(req.body)
        res.header('x-auth-token', token)
        JsonResponse(res,200,MSG_TYPES.LOGGED_IN,token)
    }catch(error){
        JsonResponse(res,400,MSG_TYPES.SERVER_ERROR,error)
    }
}


exports.verify = async (req, res) => {
    try {
        const { error } = validateVerifyUser(req.body)
        if(error) return JsonResponse(res, 400, error.details[0].message)
        console.log(req.body)

        const {user, token}  = await AuthService.verifyUser(req.body)
        res.header("x-auth-token",token)

        JsonResponse(res, 200, MSG_TYPES.ACCOUNT_VERIFIED,token)
    } catch (error) {
        JsonResponse(res,400,MSG_TYPES.SERVER_ERROR,error)
    }
}

exports.resendOtp = async (req, res) => {
    try {
        const { error } = validateResendOTP(req.body)
        if(error) return JsonResponse(res, 400, error.details[0].message)

        const {user, otp} = await AuthService.resendOtp(req.body.email)
        JsonResponse(res, 200, MSG_TYPES.UPDATED,user,otp)
    } catch (error) {
        JsonResponse(res,400,MSG_TYPES.SERVER_ERROR,error)
    }
}

exports.passwordChange = async (req, res) => {
    try {
        const { error } = validatePasswordChange(req.body)
        if(error) return JsonResponse(res, 400, error.details[0].message)

        const { user } = await AuthService.updatedPassword(req.user,req.body)
        JsonResponse(res, 200, MSG_TYPES.UPDATED, user)
    } catch (error) {
        JsonResponse(res,400,MSG_TYPES.SERVER_ERROR,error)
    }
}