const { MSG_TYPES } = require("../constant/types");
const { JsonResponse } = require("../lib/apiResponse");
const { paginate } = require("../utils/index");
const { validateAddress } = require("../request/address");
const AddressService = require("../services/address");


exports.createAddress =  async(req, res, next) => {
    try{
        req.body.user = req.user._id

        const { error } = validateAddress(req.body)
        if(error) return JsonResponse(res, 400, error.details[0].message)

        let createAddress = await AddressService.create(req.body)
        
        JsonResponse(res, 201, MSG_TYPES.CREATED, createAddress)
    }catch(error){
        next(error)
    }
}


exports.getAllAddress =  async(req, res, next) => {
    try{
        const user = req.user._id
        const { page, pageSize, skip } = paginate(req);

        const {addresses, total} = await AddressService.getAlladdress(skip,pageSize,user)

        const meta ={ 
            total,
            pagination: {pageSize, page}
        }
        
        JsonResponse(res, 200, MSG_TYPES.FETCHED, addresses, meta)
    }catch(error){
        next(error)
    }
}


exports.getAddress =  async(req, res, next) => {
    try{
        const addressId = req.params.address;
        const filter = {
            _id: addressId
        }

        const address = await AddressService.getaddress(filter)

        JsonResponse(res, 200, MSG_TYPES.FETCHED, address)
    }catch(error){
        next(error)
    }
}


exports.getDefault =  async(req, res, next) => {
    try{
        const filter = {
            user: req.user._id,
            default: true
        }

        const address = await AddressService.getaddress(filter)

        JsonResponse(res, 200, MSG_TYPES.FETCHED, address)
    }catch(error){
        next(error)
    }
}

exports.setDefault =  async(req, res, next) => {
    try{
        const addressId = req.params.addressId
        const user = req.user._id

        const address = await AddressService.setDefault(user, addressId)

        return JsonResponse(res, 200, MSG_TYPES.UPDATED, address);
    }catch(error){
        next(error)
    }
}

exports.updateAddress =  async(req, res, next) => {
    try{
        const addressId = req.params.addressId
        const user = req.user._id
    
        const { error } = validateAddress(req.body)
        if(error) return JsonResponse(res, 400, error.details[0].message)
    
        await AddressService.update(addressId, req.body,user);
    
        return JsonResponse(res, 200, MSG_TYPES.UPDATED);
    }catch(error){
        next(error)
    }
}

exports.deleteAddress =  async(req, res, next) => {
    try{
        const addressId = req.params.addressId
        const user = req.user._id

        await AddressService.delete(addressId, user);

        return JsonResponse(res, 200, MSG_TYPES.DELETED);
    }catch(error){
        next(error)
    }
}