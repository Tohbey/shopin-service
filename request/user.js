const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const complexityOption = {
    min:6,
    max:600,
    lowerCase:1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2,
}

function validateUser(body) {
    const userSchema = Joi.object({
        email: Joi.string().email().max(100).required(),
        password: passwordComplexity(complexityOption).required(),
        name: Joi.string().required(),
        newUser: Joi.boolean().required(),
        status: Joi.string().valid("active", "suspended","pending").required()
    });

    return userSchema.validate(body)
}

module.exports = {
    validateUser
}