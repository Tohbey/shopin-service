const { MSG_TYPES } = require('../constant/types');
const { deleteMany } = require('../models/basket');
const Basket = require("../models/basket")

class BasketService{

    static create(body){
        return new Promise(async (resolve, reject) => {
            try {
                const basket = await Basket.findOne({
                    user: body.namr,
                    product: body.product
                })
                if(basket){
                    return reject({statusCode:404, msg:MSG_TYPES.BRAND_EXIST})
                }
                const createBasket = await Basket.create(body)
                resolve(createBasket)
            } catch (error) {
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})   
            }
        })
    }

    static get(userId){
        return new Promise(async (resolve, reject) => {
            try {
                const basket = await Basket.find({
                    user: userId
                }).populate("Product")
                if(!basket){
                    return reject({statusCode: 404, msg: MSG_TYPES.NOT_FOUND})
                }

                resolve(basket)
            } catch (error) {
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})   
            }
        })
    }

    static removeBasket(userId, basketId){
        return new Promise(async (resolve, reject) => {
            try {
                const basket = await Basket.findOneAndDelete({
                    _id: basketId,
                    user: userId
                })
                if(!basket){
                    return reject({statusCode: 404, msg: MSG_TYPES.NOT_FOUND})
                }
                resolve(basket)
            } catch (error) {
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})   
            }
        })
    }

    static checkout(userId){
        return new Promise(async (resolve, reject) => {
            try {
                
            } catch (error) {
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})   
            }
        })
    }

    static update(basketObject, basketId, userId){
        return new Promise(async (resolve, reject) => {
            try {
                const basket = await Basket.findOne({
                    _id: basketId,
                    user: userId
                })
                if(!basket) return reject({statusCode:404, msg:MSG_TYPES.NOT_FOUND})

                await basket.updateOne(
                    {
                        $set: basketObject
                    }
                )
            } catch (error) {
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})   
            }
        })
    }

    static clearBasket(userId){
        return new Promise(async (resolve, reject) => {
            try {
                const baskets = await Basket.findOne({
                    user: userId
                })
                if(!baskets) return reject({statusCode:404, msg:MSG_TYPES.NOT_FOUND})
                
                let i = 0;
                while(i<baskets.length){
                    let basketId = baskets[i]._id;
                    await this.removeBasket(userId, basketId);
                    i++;
                }
                resolve(baskets)
            } catch (error) {
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})   
            }
        })
    }
}

module.exports = BasketService