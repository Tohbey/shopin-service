const Product = require('../models/product')
const { MSG_TYPES } = require('../constant/types');
const {ROLES} = require("../middlewares/auth")
const { AsyncForEach, uploadFilesFromBase64 } = require("../utils/index")
const mongoose = require('mongoose');

class ProductService{

    static create(body){
        return new Promise(async (resolve, reject) => {
            try {
                const product = await Product.findOne({
                    name: body.name,
                    admin: body.admin
                })
                if(product){
                    return reject({statusCode:404, msg:MSG_TYPES.PRODUCT_EXIST})
                }
                
                const createProduct = await Product.create(body)
                resolve(createProduct)
            } catch (error) {
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})   
            }
        }
    )}

    static getById(productId){
        return new Promise(async (resolve, reject) => {
            try {
                const product = await Product.findById(productId)
                if(!product) return reject({statusCode:404, msg:MSG_TYPES.NOT_FOUND})

                resolve(product)
            } catch (error) {
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})
            }
        }
    )}

    static getProducts(skip, pageSize, filter){
        return new Promise(async (resolve, reject) => {
            try {
                console.log(filter)
                const products = await Product.find(filter)
                .skip(skip).limit(pageSize)

                const total = await Product.find(filter).countDocuments();
                if(total < 0) return reject({statusCode: 200, msg:"No Product is available"})
                
                resolve({products, total})
            } catch (error) {
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})
            }
        }
    )}


    static deleteProduct(productId, userId){
        return new Promise(async (resolve, reject) => {
            try {
                const product = await Product.findOne({
                    _id: productId,
                    admin: userId
                })
                if(!product) return reject({statusCode:404, msg:MSG_TYPES.NOT_FOUND})

                product.deleted = true;
                product.deletedAt = new Date.now();
                product.deletedBy = userId;
                
                product.save();
                resolve(product)
            } catch (error) {
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})
            }
        }
    )}


    static updateProduct(productObject, productId, adminId){
        return new Promise(async (resolve, reject) => {
            try {
                const product = await Product.findOne({
                    _id: productId,
                    admin: adminId
                })
                if(!product) return reject({statusCode:404, msg:MSG_TYPES.NOT_FOUND})

                await product.updateOne(
                    {
                        $set: productObject
                    }
                )

                resolve(product)
            } catch (error) {
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})
            }
        }
    )}

    static getAssets(files){
        const img = []
        for(let i =0;i<files.length; i++){
            const assest = {
                type: "img",
                URL: files[i].location,
                key: files[i].key,
                default: false
            }
            img.push(assest)
        }
        return img
    }
}

module.exports = ProductService