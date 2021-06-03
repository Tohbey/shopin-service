const Joi = require("joi");

function validateSaveItem(body) {
    const saveItemSchema = Joi.object({
        user: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        product: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    })

    return saveItemSchema.validate(body)
}

module.exports = {
    validateSaveItem
}