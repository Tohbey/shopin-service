const { MSG_TYPES } = require("../constant/types");
const { JsonResponse } = require("../lib/apiResponse");
const { paginate } = require("../utils/index");
const { validateUser } = require("../request/user");
const UserService = require("../services/user");
const User = require("../models/user");
const bcrypt = require('bcrypt');


exports.createUser =  async(req, res) => {
    try{
        req.body.role = "User";
        console.log(req.body)

        const { error } = validateUser(req.body)
        if(error) return JsonResponse(res, 400, error.details[0].message)
        
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password,salt)

        let createUser = await UserService.create(req.body)
        
        JsonResponse(res,201,MSG_TYPES.CREATED,createUser)
    }catch(error){
        JsonResponse(res,400,MSG_TYPES.SERVER_ERROR,error)
    }
}


exports.getAllUser =  async(req, res) => {
    try{
        const { page, pageSize, skip } = paginate(req);

        const {users, total} = await UserService.getAllUser(skip,pageSize)

        const meta ={ 
            total,
            pagination: {pageSize, page}
        }

        JsonResponse(res, 200, MSG_TYPES.FETCHED,users, meta)
    }catch(error){
        JsonResponse(res,400,MSG_TYPES.SERVER_ERROR,error)
    }
}


exports.getUser =  async(req, res) => {
    try{
        const userId = req.user.id;

        const user = await UserService.getUser(userId)

        JsonResponse(res,200,MSG_TYPES.FETCHED,user)
    }catch(error){
        JsonResponse(res,400,MSG_TYPES.SERVER_ERROR,error)
    }
}

exports.updateUser =  async(req, res) => {
    try{
        const userId = req.user.userId
    
        const { error } = validateUser(req.body)
        if(error) return JsonResponse(res, 400, error.details[0].message)
    
        await UserService.update(userId, req.body);
    
        return JsonResponse(res, 200, MSG_TYPES.UPDATED);
    }catch(error){
        JsonResponse(res,400,MSG_TYPES.SERVER_ERROR,error)
    }
}

exports.suspendUser =  async(req, res) => {
    try{
        const userId = req.user.userId

        await UserService.suspendUser(userId);

        return JsonResponse(res,200,MSG_TYPES.DELETED);
    }catch(error){
        JsonResponse(res,400,MSG_TYPES.SERVER_ERROR,error)
    }
}