const User = require('../models/user')
const { MSG_TYPES } = require('../constant/types');
const { GenerateOTP, GenerateToken, mailSender} = require("../utils/index")
const moment = require("moment");
const bcrypt = require("bcrypt")

class AdminService{

    static create(body){
        return new Promise(async (resolve, reject) => {
            try {
                const admin = User.findOne({
                    email:body.email,
                    name:body.name,
                    role: body.role
                })
                if(!admin) {
                    return reject({statusCode:400, msg:MSG_TYPES.ACCOUNT_EXIST})
                }

                const otp = GenerateOTP(4);
                
                const newAdmin = new User(body);
                newAdmin.email.toLowerCase();
                newAdmin.rememberToken.token = otp;
                newAdmin.rememberToken.expiredDate = moment().add(20, "minutes");
                await newAdmin.save();

                //email notification
                // const subject = "User Verification Code";
                // const text = "Plsease use the OTP code: "+otp+" to verify your account";
                // await mailSender(newAdmin.email,subject,text)

                resolve({newAdmin, otp})
            } catch (error) {
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})
            }
        })
    }

    static getAllAdmin(skip, pageSize){
        return new Promise(async (resolve, reject) => {
            try {
                const admins = await User.find({role: "Admin"})
                .skip(skip).limit(pageSize)

                const total = await User.find().countDocuments()
                if(total < 0) return reject({statusCode:200, msg:"No Admin yet"})

                resolve({ admins, total })
            } catch (error) {
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})
            }
        })
    }

    static suspendAdmin(adminId, superAdminId){
        return new Promise(async (resolve, reject) => {
            try {
                const superAdmin = await User.findOne({
                    role:"SuperAdmin",
                    _id: superAdminId,
                    status:"active"
                })
                if(!superAdmin){
                    return reject({statusCode:400, msg:MSG_TYPES.NOT_ALLOWED})
                }

                const admin = await User.findOneAndUpdate({
                    role:"Admin",
                    _id:adminId,
                    status:"active"
                }, {status:"suspended"})

                if(!admin) return reject({statusCode:400, msg:MSG_TYPES.NOT_FOUND})
                
                resolve({admin})
            } catch (error) {
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})
            }
        })
    }

    static getAdmin(userId){
        return new Promise(async (resolve, reject) => {
            try {
                const admin = await User.findOne({
                    _id: userId,
                    status:"active",
                    role:"Admin"
                })

                if(!admin) return reject({statusCode:400, msg:MSG_TYPES.NOT_FOUND})
                
                resolve(admin)
            } catch (error) {
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})
            }
        })
    }

    static update(userId, adminObject){
        return new Promise(async (resolve, reject) => {
            try {
                const admin = await User.findById(userId)
                if(!admin){
                    return reject({statusCode:400,msg:MSG_TYPES.NOT_FOUND})
                }

                await admin.updateOne(
                    {
                        $set:adminObject
                    }
                )
                resolve(admin)
            } catch (error) {
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})
            }
        })
    }

    static terminateMe(user){
        return new Promise(async (resolve, reject) => {
            try {
                const currentAdmin = await User.findOne({
                    _id: user._id,
                    status: "active"
                })
                if(!currentAdmin){
                    return reject({statusCode:400,msg:MSG_TYPES.NOT_FOUND})
                }

                await currentAdmin.delete()

                resolve({msg: MSG_TYPES.DELETED})
            } catch (error) {
                return reject({ statusCode: 500, msg:MSG_TYPES.SERVER_ERROR, error});
            }
        })
    }
}

module.exports = AdminService