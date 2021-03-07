const AuthService = require('../services/auth');
const { MSG_TYPES } = require('../constant/types');
const { validateVerifyUser, validateLogin, validateResendOTP, validatePasswordChange } = require('../request/user');
const { JsonResponse } = require('../lib/apiResponse');

exports.login = async(req, res, next) => {
    try{   
        const { error } = validateLogin(req.body)
        if(error) return JsonResponse(res, 400, error.details[0].message)

        let token = await AuthService.login(req.body)
        res.header('x-auth-token', token)
        JsonResponse(res,200,MSG_TYPES.LOGGED_IN,token)
    }catch(error){
        next(error)
    }
}


exports.verify = async (req, res, next) => {
    try {
        const { error } = validateVerifyUser(req.body)
        if(error) return JsonResponse(res, 400, error.details[0].message)
        console.log(req.body)

        const {user, token}  = await AuthService.verifyUser(req.body)
        res.header("x-auth-token",token)

        JsonResponse(res, 200, MSG_TYPES.ACCOUNT_VERIFIED,token)
    } catch (error) {
        next(error)
    }
}

exports.resendOtp = async (req, res, next) => {
    try {
        const { error } = validateResendOTP(req.body)
        if(error) return JsonResponse(res, 400, error.details[0].message)

        const {user, otp} = await AuthService.resendOtp(req.body.email)
        JsonResponse(res, 200, MSG_TYPES.UPDATED,user,otp)
    } catch (error) {
        next(error)
    }
}

exports.passwordChange = async (req, res, next) => {
    try {
        const { error } = validatePasswordChange(req.body)
        if(error) return JsonResponse(res, 400, error.details[0].message)

        const { user } = await AuthService.updatedPassword(req.user,req.body)
        JsonResponse(res, 200, MSG_TYPES.UPDATED, user)
    } catch (error) {
        next(error)
    }
}