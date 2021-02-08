const AuthService = require('../services/auth');
const { MSG_TYPES } = require('../constant/types');
const { validateVerifyAccount } = require('../request/auth');
const { JsonResponse } = require('../lib/apiResponse');

exports.login = async(req, res) => {
    try{   
        const { error } = validateVerifyAccount(req.body)
        if(error) return JsonResponse(res, 400, error.details[0].message)

        let token = await AuthService.login(req.body)
        res.header('x-auth-token', token)
        JsonResponse(res,200,MSG_TYPES.LOGGED_IN,token)
    }catch(error){
        JsonResponse(res,400,MSG_TYPES.SERVER_ERROR,error)
    }
}