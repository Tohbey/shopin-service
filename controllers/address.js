const { MSG_TYPES } = require("../constant/types");
const { JsonResponse } = require("../lib/apiResponse");
const { paginate } = require("../utils/index");
const { validateAddress } = require("../request/address");
const AddressService = require("../services/address");


exports.createAddress =  async(req, res) => {
    try{
        req.body.address = req.address.id

        const { error } = validateAddress(req.body)
        if(error) return JsonResponse(res, 400, error.details[0].message)

        let createAddress = await AddressService.create(req.body)
        
        JsonResponse(res,201,MSG_TYPES.CREATED,createAddress)
    }catch(error){
        JsonResponse(res,400,MSG_TYPES.SERVER_ERROR,error)
    }
}


exports.getAllAddress =  async(req, res) => {
    try{
        const user = req.user.id
        const { page, pageSize, skip } = paginate(req);

        const {addresses, total} = await AddressService.getAlladdress(skip,pageSize,user)

        const meta ={ 
            total,
            pagination: {pageSize, page}
        }
        
        JsonResponse(res, 200, MSG_TYPES.FETCHED,addresses, meta)
    }catch(error){
        JsonResponse(res,400,MSG_TYPES.SERVER_ERROR,error)
    }
}


exports.getAddress =  async(req, res) => {
    try{
        const addressId = req.params.address;

        const address = await AddressService.getaddress(addressId)

        JsonResponse(res,200,MSG_TYPES.FETCHED,address)
    }catch(error){
        JsonResponse(res,400,MSG_TYPES.SERVER_ERROR,error)
    }
}

exports.updateAddress =  async(req, res) => {
    try{
        const addressId = req.params.addressId
    
        const { error } = validateAddress(req.body)
        if(error) return JsonResponse(res, 400, error.details[0].message)
    
        await AddressService.update(addressId, req.body);
    
        return JsonResponse(res, 200, MSG_TYPES.UPDATED);
    }catch(error){
        JsonResponse(res,400,MSG_TYPES.SERVER_ERROR,error)
    }
}

exports.deleteAddress =  async(req, res) => {
    try{
        const addressId = req.params.addressId

        await AddressService.delete(addressId);

        return JsonResponse(res,200,MSG_TYPES.DELETED);
    }catch(error){
        JsonResponse(res,400,MSG_TYPES.SERVER_ERROR,error)
    }
}