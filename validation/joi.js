const Joi = require("joi");
const validateRequest = require("../_middlewares/validate-request");

// validation for registeration :

exports.registerSchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(12).required(),
    phone: Joi.string()
      .regex(/^[0-9]{10}$/)
      .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
      .required(),
    role: Joi.string(),
  });
  validateRequest(req, res, next, schema);
};
