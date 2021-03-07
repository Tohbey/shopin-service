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
                const address = await Address.find({user:user._id})
                .skip(skip).limit(pageSize)

                const total = await Address.find().countDocuments()

                resolve({address, total})
            }catch(error){
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})
            }
        })
    }


    static getaddress(filter){
        return new Promise(async (resolve, reject) => {
            try{
                const address = await Address.find({filter})

                if(!address){
                    return reject({code:400,msg:MSG_TYPES.NOT_FOUND})
                }
                resolve(address)
            }catch(error){
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})
            }
        })
    }

    static update(addressId,addressObject,userId){
        return new Promise(async (resolve, reject) => {
            try{
                const address = await Address.findById({
                    _id: addressId,
                    user: userId
                })

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

    static delete(addressId, userId){
        return new Promise(async (resolve, reject) => {
            try{
                const address = await Address.findById({
                    _id: addressId,
                    user: userId
                })

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


    static setDefault(userId,addressId){
        return new Promise(async (resolve, reject) => {
            try {
                const address = await Address.findOne({
                    _id: addressId,
                    user: userId,
                    default: false
                });

                if(!address){
                    return reject({statusCode:400,msg:MSG_TYPES.NOT_FOUND})
                }

                await Address.updateOne(
                    {user: userId, default: true},
                    {
                        $set:{
                            default: false
                        }
                    }
                );

                address.default = true;
                address = await address.save();

                resolve(address)
            } catch (error) {
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})
            }
        })
    }
}

module.exports = AddressService