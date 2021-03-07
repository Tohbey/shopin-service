const Joi = require("joi");


function validateAddress(body){
  const addressSchema = Joi.object({
    user: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    country: Joi.string().max(150).required(),
    state: Joi.string().required(),
    LGA: Joi.string().required(),
    address: Joi.string().max(600).required(),
    default: Joi.boolean().required()
  });

  return addressSchema.validate(body);
}

module.exports = {
    validateAddress
}