const User = require("../models/user")
const { MSG_TYPES } = require('../constant/types');

class UserService{


    static create(body){
        return new Promise(async (resolve, reject) => {
            try{
                const user = User.findOne({
                    email:body.email,
                    name:body.name
                })
                if(user){
                    reject({statusCode:400, msg:MSG_TYPES.ACCOUNT_EXIST})
                }
                
                const createUser = await User.create(body)
                resolve(createUser)
            }catch(error){
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})
            }
        })
    }

    static getAllUser(skip,pageSize){
        return new Promise(async (resolve, reject) => {
            try{
                const users = await User.find()

                const total = await User.find().countDocuments()

                resolve({ users, total })
            }catch(error){
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})
            }
        })
    }


    static getUser(userId){
        return new Promise(async (resolve, reject) => {
            try{
                const user = await User.findById(userId)

                if(!user){
                    return reject({code:400,msg:MSG_TYPES.NOT_FOUND})
                }
                resolve(user)
            }catch(error){
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})
            }
        })
    }

    static update(userId,userObject){
        return new Promise(async (resolve, reject) => {
            try{
                const user = await User.findById(userId)
                if(!user){
                    return reject({statusCode:400,msg:MSG_TYPES.NOT_FOUND})
                }

                await user.updateOne(
                    {
                        $set:userObject
                    }
                )
                resolve(user)
            }catch(error){
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})
            }
        })
    }

    static delete(userId){
        return new Promise(async (resolve, reject) => {
            try{
                const user = await User.findById(userId)
                if(!user){
                    return reject({statusCode:400,msg:MSG_TYPES.NOT_FOUND})
                }

                await user.delete()
                resolve(user)
            }catch(error){
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})
            }
        })
    }
}

module.exports = UserService