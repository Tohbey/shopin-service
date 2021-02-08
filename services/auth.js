const User = require("../models/user")
const { MSG_TYPES } = require('../constant/types');
const bcrypt = require('bcrypt')


class AuthService{

    static login(body){
        return new Promise(async (resolve, reject) => {
            try{
                const user = await User.findOne({email:body.email})
                if(!user){
                    return reject({statusCode:400,msg:MSG_TYPES.ACCOUNT_INVALID})
                }

                const validPassword = await bcrypt.compare(body.password,user.password)
                if(!validPassword){
                    return reject({statusCode:400,msg:MSG_TYPES.INVALID_PASSWORD})
                }

                const token = user.generateAuthToken();
                resolve(token)
            }catch(error){
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})
            }
        })
    }
}

module.exports = AuthService