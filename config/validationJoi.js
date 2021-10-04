const Joi = require("joi");

const registerSchemaAdmin = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const loginSchemaAdmin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const registerSchemaStudent = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  sex: Joi.string(),
  age: Joi.number().required(),
  workshops: Joi.array().required()
})

module.exports = {
  registerSchemaAdmin,
  loginSchemaAdmin,
  registerSchemaStudent
};      