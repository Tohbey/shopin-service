const Joi = require("joi");

function validateRating(body){
    const ratingSchema = Joi.object({
        user: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        product: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        rating: Joi.string().required()
    })

    return ratingSchema.validate(body)
}

function validateComment(body){
    const ratingSchema = Joi.object({
        user: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        product: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        Comment: Joi.string().required()
    })

    return ratingSchema.validate(body)
}

module.exports = {
    validateRating,
    validateComment
}