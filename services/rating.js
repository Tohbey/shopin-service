const { MSG_TYPES } = require('../constant/types');
const Rating = require("../models/rating");
const Product = require("../models/product");

class RatingService{
    
    static create(body){
        return new Promise(async (resolve, reject) => {
            try {
                const rating = await Rating.findOne({
                   user: body.user,
                   product: body.product,
                   comment: body.comment,
                   rating: body.rating
                })
                if(rating){
                    return reject({statusCode:404, msg:MSG_TYPES.RATING_EXIST})
                }
                
                const createRating = await Rating.create(body)

                //getting the average rating
                let averageRating = await this.accumulateRating(body.product)

                resolve({createRating, averageRating})
            } catch (error) {
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})              
            }
        }) 
    }

    static get(ratingId){
        return new Promise(async (resolve, reject) => {
            try {
                const rating = await Rating.findById(ratingId)
                if(!rating) return reject({statusCode:404, msg:MSG_TYPES.NOT_FOUND})

                resolve(rating)
            } catch (error) {
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})   
            }
        }) 
    }

    static getProductRatings(productId){
        return new Promise(async (resolve, reject) => {
            try {
                const ratings = await Rating.find({
                    product: productId
                }).populate("User")

                const total = await Rating.find({
                    product: productId
                }).countDocuments()

                resolve({ratings, total})
            } catch (error) {
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})   
            }
        }) 
    }

    static accumulateRating(productId){
        return new Promise(async (resolve, reject) => {
            try {
                const ratings = await Rating.find({
                    product: productId
                })
                const total = await Rating.find({
                    product: productId
                }).countDocuments()
                const product = await Product.findById(productId)

                let i = 0;
                let averageRating = 0
                let ratingSum = 0;
                while(i<ratings.length){
                    ratingSum += ratings[i].rating
                    i++
                }
                averageRating = ratingSum/total

                product.rating = averageRating;
                await product.save()

                resolve(averageRating)
            } catch (error) {
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})
            }
        })
    }

    static delete(ratingId, userId){
        return new Promise(async (resolve, reject) => {
            try {
                const rating = await Rating.findOne({
                    _id: ratingId,
                    user: userId
                })
                if (!rating){
                    return reject({statusCode:404, msg:MSG_TYPES.NOT_FOUND})
                }

                rating.delete();

                resolve(rating)
            } catch (error) {
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})   
            }
        })
    }
}

module.exports = RatingService