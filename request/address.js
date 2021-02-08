const Joi = require("joi");


function validateAddress(body){
  const addressSchema = Joi.object({
    user: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    address: Joi.string().max(600).required(),
  });

  return addressSchema.validate(body);
}

module.exports = {
    validateAddress
}