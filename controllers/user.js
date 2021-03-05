const { MSG_TYPES } = require("../constant/types");
const { JsonResponse } = require("../lib/apiResponse");
const { paginate } = require("../utils/index");
const { validateUser } = require("../request/user");
const UserService = require("../services/user");
const bcrypt = require('bcrypt');

/** 
 * Create User
 * @param {*} req
 * @param {*} res
*/
exports.createUser =  async(req, res, next) => {
    try{
        req.body.role = "User";
        console.log(req.body)

        const { error } = validateUser(req.body)
        if(error) return JsonResponse(res, 400, error.details[0].message)
        
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password,salt)

        let createUser = await UserService.create(req.body)
        
        JsonResponse(res, 201, MSG_TYPES.CREATED, createUser)
    }catch(error){
        next(error)
    }
}

/** 
 * get all Users
 * @param {*} req
 * @param {*} res
*/
exports.getAllUser =  async(req, res, next) => {
    try{
        const { page, pageSize, skip } = paginate(req);

        const {users, total} = await UserService.getAllUser(skip,pageSize)

        const meta ={ 
            total,
            pagination: {pageSize, page}
        }

        JsonResponse(res, 200, MSG_TYPES.FETCHED,users, meta)
    }catch(error){
        next(error)
    }
}

/** 
 * get current user
 * @param {*} req
 * @param {*} res
*/
exports.getMe =  async(req, res, next) => {
    try{
        const userId = req.user._id;

        const user = await UserService.getUser(userId)

        JsonResponse(res, 200, MSG_TYPES.FETCHED, user)
    }catch(error){
        next(error)
    }
}

/** 
 * get user
 * @param {*} req
 * @param {*} res
*/
exports.getUser =  async(req, res, next) => {
    try{
        const userId = req.params.id;

        const user = await UserService.getUser(userId)

        JsonResponse(res, 200, MSG_TYPES.FETCHED, user)
    }catch(error){
        next(error)
    }
}

/** 
 * get update user
 * @param {*} req
 * @param {*} res
*/
exports.updateUser =  async(req, res, next) => {
    try{
        const userId = req.user._id
    
        await UserService.update(userId, req.body);
    
        return JsonResponse(res, 200, MSG_TYPES.UPDATED);
    }catch(error){
        next(error)
    }
}

/** 
 * get suspend user
 * @param {*} req
 * @param {*} res
*/
exports.suspendUser =  async(req, res, next) => {
    try{
        const userId = req.userId

        await UserService.suspendUser(userId);

        return JsonResponse(res, 200, MSG_TYPES.SUSPENDED);
    }catch(error){
        next(error)
    }
}

/** 
 * get teminate current user
 * @param {*} req
 * @param {*} res
*/
exports.teminateMe = async(req, res, next) => {
    try {
        const user = await UserService.terminateMe(req.user)

        return JsonResponse(res, 200, MSG_TYPES.DELETED)
    } catch (error) {
        next(error)    
    }
}