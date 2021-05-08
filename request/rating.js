const Joi = require("joi");

function validateRating(body){
    const ratingSchema = Joi.object({
        user: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        product: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        rating: Joi.number().required().max(10).min(0)
    })

    return ratingSchema.validate(body)
}

function validateComment(body){
    const ratingSchema = Joi.object({
        user: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        product: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        comment: Joi.string().required()
    })

    return ratingSchema.validate(body)
}

module.exports = {
    validateRating,
    validateComment
}