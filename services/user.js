const User = require("../models/user")
const { MSG_TYPES } = require('../constant/types');
const { GenerateOTP, GenerateToken, mailSender} = require("../utils/index")
const moment = require("moment");

class UserService{

    static create(body){
        return new Promise(async (resolve, reject) => {
            try{
                const user = await User.findOne({
                    email:body.email,
                    name:body.name,
                    role:"User"
                })
                if(user){
                   return reject({statusCode:404, msg: MSG_TYPES.ACCOUNT_EXIST})
                }
                
                const otp = GenerateOTP(4);
                
                const newUser = new User(body);
                newUser.email.toLowerCase();
                newUser.rememberToken.token = otp;
                newUser.rememberToken.expiredDate = moment().add(20, "minutes");

                // email notification
                const subject = "User Verification Code";
                const text = "Please use the OTP code: "+otp+" to verify your account";
                await mailSender(newUser.email,subject,text)
                
                await newUser.save();

                resolve({newUser, otp})
            }catch(error){
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})
            }
        })
    }

    static getAllUser(skip,pageSize){
        return new Promise(async (resolve, reject) => {
            try{
                const users = await User.find({role: "User"})
                .skip(skip).limit(pageSize)

                const total = await User.find({role: "User"}).countDocuments()

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
                    return reject({code:404,msg:MSG_TYPES.NOT_FOUND})
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
                    return reject({statusCode:404,msg:MSG_TYPES.NOT_FOUND})
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

    static terminateMe(user){
        return new Promise(async (resolve, reject) => {
            try {
                const currentUser = await User.findOne({
                    _id: user._id,
                    status: "active"
                })
                if(!currentUser){
                    return reject({statusCode:404,msg:MSG_TYPES.NOT_FOUND})
                }

                await currentUser.delete()

                resolve({msg: MSG_TYPES.DELETED})
            } catch (error) {
                return reject({ statusCode: 500, msg:MSG_TYPES.SERVER_ERROR, error});
            }
        })
    }
}

module.exports = UserService