const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const complexityOptions = {
  min: 6,
  max: 600,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2,
};

function validateVerifyAccount(body){
  const accountSchema = Joi.object({
    email: Joi.string().email().max(100).required(),
    password: passwordComplexity(complexityOptions).required(),
  });

  return accountSchema.validate(body);
}

module.exports = {
  validateVerifyAccount
}