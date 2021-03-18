const Joi = require("joi");

function validateBrand(body){
    const brandSchema = Joi.object({
        admin: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        name:Joi.string().required(),
        description: Joi.string().required()
    });

    return brandSchema.validate(body)
}

module.exports = {
    validateBrand   
}