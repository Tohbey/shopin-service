const Joi = require("joi");

function validateProduct(body){
    const productSchema = Joi.object({
        admin: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        brand: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        name:Joi.string().max(100).required(),
        description:Joi.string().max(100).required(),
        sizes: Joi.array()
            .items(
                Joi.string().required()
            ),
        status: Joi.string().valid("available", "out-of-sales").required(),
        quantity: Joi.number().min(0).required(),
        condition: Joi.string().valid("new", "good", "fair").required(),
        price: Joi.number().min(0).required(),
        assets: Joi.array().items(
            Joi.string()
                .base64({paddingRequired: false})
                .optional()
        )
        .max(4)
        .optional(),
    });

    return productSchema.validate(body)
}

module.exports = {
    validateProduct
}