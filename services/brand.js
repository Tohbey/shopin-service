const { MSG_TYPES } = require('../constant/types');
const Brand = require("../models/brand")

class BrandService{

    static create(body){
        return new Promise(async (resolve, reject) => {
            try {
                const brand = await Brand.findOne({
                    name: body.name,
                    admin: body.admin
                })
                if(brand){
                    return reject({statusCode:404, msg:MSG_TYPES.BRAND_EXIST})
                }

                const createBrand = await Brand.create(body)
                resolve(createBrand)
            } catch (error) {
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})
            }
        })
    }

    static getBrands(skip,pageSize,filter){
        return new Promise(async (resolve, reject) => {
            try {
                const brands = await Brand.find(filter)
                .skip(skip).limit(pageSize)

                const total = await Brand.find(filter).countDocuments();
                if(total < 0) return reject({statusCode:200, msg:"No Brand yet"})

                resolve({brands, total})
            } catch (error) {
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})
            }
        })
    }

    static update(brandId, brandObject, userId){
        return new Promise(async (resolve, reject) => {
            try {
                const brand = await Brand.findOne({
                    _id: brandId,
                    admin: userId
                })
                if(!brand){
                    return reject({statusCode:404, msg:MSG_TYPES.NOT_FOUND})
                }

                await brand.updateOne(
                    {
                        $set: brandObject
                    }
                )
                resolve(brand)
            } catch (error) {
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})
            }
        })
    }

    static getBrand(brandId){
        return new Promise(async (resolve, reject) => {
            try {
                const brand = await Brand.findById(brandId)
                if(!brand){
                    return reject({statusCode:404, msg:MSG_TYPES.NOT_FOUND})
                }

                resolve(brand)
            } catch (error) {
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})
            }
        })
    }

    static delete(brandId, userId){
        return new Promise(async (resolve, reject) => {
            try {
                const brand = await Brand.findOne({
                   _id: brandId,
                   admin: userId
                })
                if(!brand){
                    return reject({statusCode:404, msg:MSG_TYPES.NOT_FOUND})
                }

                await brand.delete();
                resolve(brand)
            } catch (error) {
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})
            }
        })
    }
}

module.exports = BrandService