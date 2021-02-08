const Address = require("../models/address")
const { MSG_TYPES } = require('../constant/types');

class AddressService{


    static create(body){
        return new Promise(async (resolve, reject) => {
            try{
                const address = Address.findOne({
                    address:body.address,
                    user: body.user
                })
                if(address){
                    return reject({statusCode:400, msg:MSG_TYPES.ACCOUNT_EXIST})
                }
                
                const createaddress = await Address.create(body)
                resolve(createaddress)
            }catch(error){
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})
            }
        })
    }

    static getAlladdress(skip,pageSize,user){
        return new Promise(async (resolve, reject) => {
            try{
                const address = await Address.find({user:user})
                .skip(skip).
                limit(pageSize)

                const total = await Address.find().countDocuments()

                resolve({address, total})
            }catch(error){
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})
            }
        })
    }


    static getaddress(addressId){
        return new Promise(async (resolve, reject) => {
            try{
                const address = await Address.findById(addressId)

                if(!address){
                    return reject({code:400,msg:MSG_TYPES.NOT_FOUND})
                }
                resolve(address)
            }catch(error){
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})
            }
        })
    }

    static update(addressId,addressObject){
        return new Promise(async (resolve, reject) => {
            try{
                const address = await Address.findById(addressId)
                if(!address){
                    return reject({statusCode:400,msg:MSG_TYPES.NOT_FOUND})
                }

                await address.updateOne(
                    {
                        $set:addressObject
                    }
                )
                resolve(address)
            }catch(error){
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})
            }
        })
    }

    static delete(addressId){
        return new Promise(async (resolve, reject) => {
            try{
                const address = await Address.findById(addressId)
                if(!address){
                    return reject({statusCode:400,msg:MSG_TYPES.NOT_FOUND})
                }

                await address.delete()
                resolve(address)
            }catch(error){
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})
            }
        })
    }
}

module.exports = AddressService