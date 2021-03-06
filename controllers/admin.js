const { MSG_TYPES } = require("../constant/types");
const { JsonResponse } = require("../lib/apiResponse");
const { paginate } = require("../utils/index");
const { validateUser } = require("../request/user");
const AdminService = require("../services/admin");
const bcrypt = require('bcrypt');


exports.createAdmin = async(req, res, next) => {
    try {
        const { error } = validateUser(req.body)
        if(error) return JsonResponse(ress, 400, error.details[0].message)

        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
        
        let createAdmin = await AdminService.create(req.body)
        JsonResponse(res, 201, MSG_TYPES.CREATED, createAdmin)
    } catch (error) {
        next(error)
    }   
}

exports.getAllAdmin = async(req, res, next) => {
    try {
        const { page, pageSize, skip } = paginate(req);
        
        const {admins, total } = await AdminService.getAllAdmin(skip,pageSize)

        const meta ={
            total,
            pagination:{ pageSize, page }
        }

        JsonResponse(res, 200, MSG_TYPES.FETCHED, admins, meta)
    } catch (error) {
        next(error)
    }   
}

exports.suspendAdmin = async(req, res, next) => {
    try {
        const superAdmin = req.user._id
        
        const adminId = req.params.id

        const admin = await AdminService.suspendAdmin(adminId, superAdmin)
        
        JsonResponse(res, 200, MSG_TYPES.SUSPENDED, admin)
    } catch (error) {
        next(error)
    }   
}

exports.getAdmin = async(req, res, next) => {
    try {
        const adminId = req.params.id;

        const admin = await AdminService.getAdmin(adminId)

        JsonResponse(res, 200, MSG_TYPES.FETCHED, admin)
    } catch (error) {
        next(error)
    }   
}

exports.getMe = async(req, res, next) => {
    try {
        const adminId = req.user._id

        const admin = await AdminService.getAdmin(adminId)

        JsonResponse(res, 200, MSG_TYPES.FETCHED, admin)
    } catch (error) {
        next(error)
    }   
}

exports.update = async(req, res, next) => {
    try {
        const adminId = req.user._id
        
        await AdminService.update(adminId, req.body);

        return JsonResponse(res, 200, MSG_TYPES.UPDATED)
    } catch (error) {
        next(error)
    }   
}

exports.teminateMe = async(req, res, next) => {
    try {
        const user = await AdminService.terminateMe(req.user)

        return JsonResponse(res, 200, MSG_TYPES.DELETED)
    } catch (error) {
        next(error)    
    }
}