const User = require("../models/user")
const { MSG_TYPES } = require('../constant/types');
const bcrypt = require('bcrypt')
const moment = require("moment");


class AuthService{

    static login(body){
        return new Promise(async (resolve, reject) => {
            try{
                const user = await User.findOne({email:body.email})
                if(!user){
                    return reject({statusCode:404,msg:MSG_TYPES.ACCOUNT_INVALID})
                }

                const validPassword = await bcrypt.compare(body.password,user.password)
                if(!validPassword){
                    return reject({statusCode:404,msg:MSG_TYPES.INVALID_PASSWORD})
                }

                const token = user.generateAuthToken();
                resolve(token)
            }catch(error){
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})
            }
        })
    }

   /**
     * Verify user account by OTP code
     * @param {Object} body request body object
     * working
   */
    static verifyUser(body){
        return new Promise(async (resolve, reject) => {
            try {
                const currentDate = new Date();

                const user = await User.findOne({
                    email:body.email,
                    status:"inactive",
                    "rememberToken.token": body.OTPCode,
                    "rememberToken.expiredDate": { $gte: currentDate },
                })
                if(!user){
                    return reject({statusCode:404,msg:MSG_TYPES.NOT_FOUND})
                }
                
                await user.updateOne({
                    rememberToken: null,
                    status: "active",
                    emailVerified: true
                })

                let token = user.generateAuthToken();
                
                resolve({ user, token })
            } catch (error) {
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})
            }
        })
    }

    static resendOtp(userEmail){
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOne({
                    email:userEmail,
                    status:"inactive"
                })
                if(!user){
                    reject({statusCode:404, msg:MSG_TYPES.NOT_FOUND})
                }

                const otp = GenerateOTP(4)
                const expiredDate = moment().add(20,"minutes");
                const newToken = {
                    token:otp,
                    expiredDate
                }
                const updateUser = await User.updateOne(
                    {email:userEmail},
                    {
                        $set:{
                            rememberToken: newToken
                        }
                    }
                )

                //email notification
                // const subject = "User Verification Code";
                // const text = "Plsease use the OTP code: "+otp+" to verify your account";
                // await mailSender(updateUser.email,subject,text)
                
                resolve({ updateUser, otp })
            } catch (error) {
                return reject({ statusCode: 500, msg:MSG_TYPES.SERVER_ERROR, error});
            }
        })
    }

    static updatedPassword(user,body){
        return new Promise(async (resolve, reject) => {
            try {
                console.log(user,body)
                const currentUser = await User.findOne({
                    _id:user._id,
                    status:"active"
                })
                if(!currentUser){
                    reject({statusCode:404, msg:MSG_TYPES.ACCOUNT_EXIST})
                }

                const validPassword = await bcrypt.compare(
                    body.oldPassword,
                    currentUser.password
                )
                if(!validPassword){
                    return reject({statusCode: 404, msg: MSG_TYPES.ACCOUNT_INVALID});
                }

                const salt = await bcrypt.genSalt(10);
                const updatedPassword = await bcrypt.hash(body.newPassword,salt);
        
                const updateUser = await User.updateOne(
                    {_id:user._id},
                    {
                        $set:{
                            password: updatedPassword,
                        },
                    }
                );
                resolve({ updateUser })
            } catch (error) {
                return reject({ statusCode: 500, msg:MSG_TYPES.SERVER_ERROR, error});
            }
        })
    }
}

module.exports = AuthService