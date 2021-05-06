const Joi = require("joi");

function validateBasket(body){
    const basketSchema = Joi.object({
        user: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        product: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        quantity: Joi.number().min(0),
        amount: Joi.number().min(0),
        color: Joi.string().required()
    })

    return basketSchema.validate(body)
}

module.exports = {
    validateBasket
}